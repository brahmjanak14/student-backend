import type {
  Express,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertSubmissionSchema,
  insertContactMessageSchema,
} from "./../shared/schema";
import { z } from "zod";
import React from "react";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { calculateEligibilityScore } from "./../shared/eligibilityCalculator";
import PDFDocument from "pdfkit";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "f1e47d68b5c54b9187d9d7a49a32b287b6c8e91e58b50e3d58d9024a4d6a44dcae6ac8e821db66b3f5d3c899cb4e88a3";

interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
    role: string;
  };
}

const authenticateToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Access token required" });
    return; // ✅ ensure consistent return type
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      username: string;
      role: string;
    };

    // Attach the decoded token to req.user
    (req as AuthRequest).user = decoded;

    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
};
const requireAdmin: RequestHandler = (req, res, next) => {
  const user = (req as AuthRequest).user;

  if (!user || user.role !== "admin") {
    res.status(403).json({ error: "Admin access required" });
    return; // ✅ ensure consistent return type (void)
  }

  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all submissions (admin only)
  app.get(
    "/api/submissions",
    authenticateToken,
    requireAdmin,
    async (req, res) => {
      try {
        const submissions = await storage.getSubmissions();
        res.json(submissions);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch submissions" });
      }
    }
  );

  // Get single submission (admin only)
  app.get(
    "/api/submissions/:id",
    authenticateToken,
    requireAdmin,
    async (req, res) => {
      try {
        const submission = await storage.getSubmission(req.params.id);
        if (!submission) {
          return res.status(404).json({ error: "Submission not found" });
        }
        res.json(submission);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch submission" });
      }
    }
  );

  // Get single submission (public - no auth required for users to view their own results)
  // Only returns non-sensitive eligibility data, not PII
  app.get("/api/submissions/public/:id", async (req, res) => {
    try {
      const submission = await storage.getSubmission(req.params.id);
      if (!submission) {
        return res.status(404).json({ error: "Submission not found" });
      }

      // Calculate eligibility details
      const eligibilityResult = calculateEligibilityScore(submission);

      // Only return non-sensitive eligibility data, exclude PII
      res.json({
        id: submission.id,
        eligibilityScore: submission.eligibilityScore,
        status: submission.status,
        submittedAt: submission.submittedAt,
        eligibilityDetails: eligibilityResult,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch submission" });
    }
  });

  // Create submission
  app.post("/api/submissions", async (req, res) => {
    try {
      const validatedData = insertSubmissionSchema.parse(req.body);

      // Calculate eligibility score before creating submission
      const eligibilityResult = calculateEligibilityScore(validatedData);

      const submission = await storage.createSubmission({
        ...validatedData,
        eligibilityScore: eligibilityResult.score,
        status: eligibilityResult.isEligible ? "approved" : "pending",
      });

      if (!submission) {
        return res.status(500).json({ error: "Failed to create submission" });
      }

      res.status(201).json(submission);
    } catch (error) {
      console.error("Error creating submission:", error);
      // Return 400 for validation errors (Zod parse errors), 500 for database errors
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid submission data" });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // Update submission status (admin only)
  app.patch(
    "/api/submissions/:id/status",
    authenticateToken,
    requireAdmin,
    async (req, res) => {
      try {
        const { status } = req.body;
        if (!status) {
          return res.status(400).json({ error: "Status is required" });
        }
        const submission = await storage.updateSubmissionStatus(
          req.params.id,
          status
        );
        if (!submission) {
          return res.status(404).json({ error: "Submission not found" });
        }
        res.json(submission);
      } catch (error) {
        res.status(500).json({ error: "Failed to update submission" });
      }
    }
  );

  // NEW ELIGIBILITY FLOW ENDPOINTS

  // Submit contact information and send OTP
  app.post("/api/eligibility/submit", async (req, res) => {
    try {
      const contactSchema = z.object({
        fullName: z.string().min(1),
        email: z.string().email(),
        phone: z.string().min(10),
        city: z.string().min(1),
      });

      const data = contactSchema.parse(req.body);

      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      // Create submission in database
      const submission = await storage.createSubmission({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        city: data.city,
        otpCode: otp,
        otpVerified: 0,
        status: "pending",
      });

      if (!submission) {
        return res.status(500).json({ error: "Failed to create submission" });
      }

      // Store OTP in submission
      await storage.updateSubmissionOtp(submission.id, otp);

      // TODO: Send OTP via WhatsApp using Twilio
      // For now, just log it and return it in development mode
      console.log(`📱 WhatsApp OTP for ${data.phone}: ${otp}`);
      console.log(`Submission ID: ${submission.id}`);

      // In development mode, return OTP in response for testing
      const isDevelopment = process.env.NODE_ENV === "development";

      res.json({
        id: submission.id,
        message: "OTP sent to WhatsApp",
        // Only send OTP in development for testing
        ...(isDevelopment && { otpCode: otp }),
      });
    } catch (error) {
      console.error("Error submitting contact:", error);
      // Return 400 for validation errors, 500 for database errors
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid contact information" });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // Verify OTP and calculate eligibility
  app.post("/api/eligibility/verify-otp", async (req, res) => {
    try {
      const verifySchema = z.object({
        submissionId: z.string(),
        otp: z.string().length(6),
      });

      const { submissionId, otp } = verifySchema.parse(req.body);

      // Verify OTP
      const isValid = await storage.verifyOtp(submissionId, otp);

      if (!isValid) {
        return res.status(400).json({ error: "Invalid OTP code" });
      }

      // Get the submission to calculate score based on actual data
      const submission = await storage.getSubmission(submissionId);
      if (!submission) {
        return res.status(404).json({ error: "Submission not found" });
      }

      // Calculate eligibility score based on actual user data
      const eligibilityResult = calculateEligibilityScore(submission);

      // Update submission with calculated score
      const updated = await storage.updateEligibilityScore(
        submissionId,
        eligibilityResult.score
      );

      if (!updated) {
        return res
          .status(500)
          .json({ error: "Failed to update eligibility score" });
      }

      res.json({
        score: eligibilityResult.score,
        message: eligibilityResult.suggestion,
        isEligible: eligibilityResult.isEligible,
      });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      // Return 400 for validation errors, 500 for database errors
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid OTP format" });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // // Download PDF report
  // app.get("/api/eligibility/download-pdf/:id", async (req, res: Response) => {
  //   const submission = await storage.getSubmission(req.params.id);
  //   if (!submission) return res.status(404).json({ error: "Not found" });

  //   const doc = new PDFDocument();
  //   const chunks: Buffer[] = [];

  //   doc.on("data", (chunk: Buffer<ArrayBufferLike>) => chunks.push(chunk));
  //   doc.on("end", () => {
  //     const pdfBuffer = Buffer.concat(chunks);
  //     res.setHeader("Content-Type", "application/pdf");
  //     res.setHeader(
  //       "Content-Disposition",
  //       `attachment; filename=eligibility-report-${submission.id}.pdf`
  //     );
  //     res.send(pdfBuffer);
  //   });

  //   doc
  //     .fontSize(20)
  //     .text("Canada Study Visa Eligibility Report", { align: "center" });
  //   doc.moveDown();
  //   doc.fontSize(12).text(`Name: ${submission.fullName}`);
  //   doc.text(`Email: ${submission.email}`);
  //   doc.text(`Phone: ${submission.phone}`);
  //   doc.text(`City: ${submission.city}`);
  //   doc.moveDown();
  //   doc.text(`Eligibility Score: ${submission.eligibilityScore}%`);
  //   doc.text(
  //     `Status: ${
  //       submission.eligibilityScore >= 70 ? "Eligible" : "Not Eligible"
  //     }`
  //   );
  //   doc.end();
  // });
  // Send eligibility report via email
  app.post("/api/send-report-email", async (req, res) => {
    try {
      const { email, score, isEligible } = req.body;

      if (!email) {
        return res.status(400).json({ error: "Email address is required" });
      }

      // Log the email request (in production, this would send actual email)
      console.log(`Sending eligibility report to ${email}`);
      console.log(`Score: ${score}%, Eligible: ${isEligible}`);

      // Simulate email sending delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Return success response
      res.json({
        success: true,
        message: "Report sent successfully",
        email: email,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Admin login
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      if (username === "admin" && password === "admin123") {
        const token = jwt.sign(
          {
            id: "admin-id",
            username: "admin",
            role: "admin",
          },
          JWT_SECRET,
          { expiresIn: "24h" }
        );

        res.json({
          success: true,
          token: token,
          message: "Login successful",
        });
      } else {
        res.status(401).json({ error: "Invalid username or password" });
      }
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  // Contact messages endpoints
  app.get(
    "/api/contact-messages",
    authenticateToken,
    requireAdmin,
    async (req, res) => {
      try {
        const messages = await storage.getContactMessages();
        res.json(messages);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch contact messages" });
      }
    }
  );

  app.post("/api/contact-messages", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);

      if (!message) {
        return res
          .status(500)
          .json({ error: "Failed to create contact message" });
      }

      res.status(201).json(message);
    } catch (error) {
      console.error("Error creating contact message:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid contact message data" });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // Define your PDF styles (not using StyleSheet)
  const pdfStyles = {
    colors: {
      primary: "#dc2626",
      textDark: "#1f2937",
      textGray: "#374151",
      success: "#059669",
      border: "#e5e7eb",
    },
    fonts: {
      base: "Helvetica",
      bold: "Helvetica-Bold",
    },
    spacing: {
      section: 25,
      line: 6,
    },
  };

  // Route to generate PDF
  app.get("/api/eligibility/download-pdf/:id", async (req, res: Response) => {
    const submission = await storage.getSubmission(req.params.id);
    if (!submission) return res.status(404).json({ error: "Not found" });

    const doc = new PDFDocument({ margin: 40 });
    const chunks: Buffer[] = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(chunks);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=eligibility-report-${submission.id}.pdf`
      );
      res.send(pdfBuffer);
    });

    // ===== Header =====
    doc
      .font(pdfStyles.fonts.bold)
      .fontSize(28)
      .fillColor(pdfStyles.colors.primary)
      .text("Canada Study Visa Eligibility Report", { align: "center" })
      .moveDown(0.5);

    doc
      .font(pdfStyles.fonts.base)
      .fontSize(16)
      .fillColor(pdfStyles.colors.textGray)
      .text("Assessment Summary", { align: "center" })
      .moveDown(2);

    // ===== User Info Section =====
    doc
      .font(pdfStyles.fonts.bold)
      .fontSize(16)
      .fillColor(pdfStyles.colors.textDark)
      .text("Applicant Details", { underline: true })
      .moveDown(1);

    doc
      .font(pdfStyles.fonts.base)
      .fontSize(12)
      .fillColor(pdfStyles.colors.textGray)
      .text(`Name: ${submission.fullName}`)
      .text(`Email: ${submission.email}`)
      .text(`Phone: ${submission.phone}`)
      .text(`City: ${submission.city}`)
      .moveDown(2);

    // ===== Eligibility Section =====
    doc
      .font(pdfStyles.fonts.bold)
      .fontSize(16)
      .fillColor(pdfStyles.colors.textDark)
      .text("Eligibility Results", { underline: true })
      .moveDown(1);

    doc
      .font(pdfStyles.fonts.base)
      .fontSize(12)
      .fillColor(pdfStyles.colors.textGray)
      .text(`Eligibility Score: ${submission.eligibilityScore}%`)
      .moveDown(0.5);

    const isEligible = submission.eligibilityScore! >= 70;
    doc
      .font(pdfStyles.fonts.bold)
      .fontSize(20)
      .fillColor(
        isEligible ? pdfStyles.colors.success : pdfStyles.colors.primary
      )
      .text(isEligible ? "Eligible" : "Not Eligible");

    // ===== Footer =====
    doc
      .moveDown(3)
      .font(pdfStyles.fonts.base)
      .fontSize(10)
      .fillColor(pdfStyles.colors.textGray)
      .text("Generated by Canada Study Visa Eligibility System", {
        align: "center",
      })
      .text("© 2025 All rights reserved.", { align: "center" });

    doc.end();
  });

  const httpServer = createServer(app);

  return httpServer;
}
