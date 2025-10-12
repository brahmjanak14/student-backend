import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSubmissionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all submissions
  app.get("/api/submissions", async (req, res) => {
    try {
      const submissions = await storage.getSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch submissions" });
    }
  });

  // Get single submission
  app.get("/api/submissions/:id", async (req, res) => {
    try {
      const submission = await storage.getSubmission(req.params.id);
      if (!submission) {
        return res.status(404).json({ error: "Submission not found" });
      }
      res.json(submission);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch submission" });
    }
  });

  // Create submission
  app.post("/api/submissions", async (req, res) => {
    try {
      const validatedData = insertSubmissionSchema.parse(req.body);
      const submission = await storage.createSubmission(validatedData);
      res.status(201).json(submission);
    } catch (error) {
      res.status(400).json({ error: "Invalid submission data" });
    }
  });

  // Update submission status
  app.patch("/api/submissions/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ error: "Status is required" });
      }
      const submission = await storage.updateSubmissionStatus(req.params.id, status);
      if (!submission) {
        return res.status(404).json({ error: "Submission not found" });
      }
      res.json(submission);
    } catch (error) {
      res.status(500).json({ error: "Failed to update submission" });
    }
  });

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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return success response
      res.json({ 
        success: true, 
        message: "Report sent successfully",
        email: email 
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
        res.json({ 
          success: true,
          token: "dummy-jwt-token-" + Date.now(),
          message: "Login successful"
        });
      } else {
        res.status(401).json({ error: "Invalid username or password" });
      }
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
