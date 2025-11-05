import {
  type User,
  type InsertUser,
  type Submission,
  type InsertSubmission,
  type ContactMessage,
  type InsertContactMessage,
  users,
  submissions,
  contactMessages,
} from "./../shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getSubmissions(): Promise<Submission[]>;
  getSubmission(id: string): Promise<Submission | undefined>;
  getSubmissionByPhone(phone: string): Promise<Submission | undefined>;
  createSubmission(submission: InsertSubmission): Promise<Submission>;
  updateSubmissionOtp(
    id: string,
    otpCode: string
  ): Promise<Submission | undefined>;
  verifyOtp(id: string, otpCode: string): Promise<boolean>;
  updateEligibilityScore(
    id: string,
    score: number
  ): Promise<Submission | undefined>;
  updateSubmissionStatus(
    id: string,
    status: string
  ): Promise<Submission | undefined>;

  getContactMessages(): Promise<ContactMessage[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private submissions: Map<string, Submission>;
  private contactMessages: Map<string, ContactMessage>;

  constructor() {
    this.users = new Map();
    this.submissions = new Map();
    this.contactMessages = new Map();

    this.seedSampleData();
  }

  private seedSampleData() {
    const sampleSubmissions: Submission[] = [
      {
        id: randomUUID(),
        fullName: "John Smith",
        email: "john.smith@example.com",
        phone: "+1 234 567 8901",
        city: "Mumbai",
        education: "bachelor",
        educationGrade: "8.5",
        gradeType: "cgpa",
        hasLanguageTest: "yes",
        languageTest: "ielts",
        ieltsScore: "7.5",
        hasWorkExperience: "yes",
        workExperienceYears: "3",
        financialCapacity: "40-60",
        preferredIntake: "september",
        preferredProvince: "ontario",
        otpCode: null,
        otpVerified: 1,
        eligibilityScore: 85,
        status: "approved",
        submittedAt: new Date("2024-01-15T10:30:00"),
      },
      {
        id: randomUUID(),
        fullName: "Sarah Johnson",
        email: "sarah.j@example.com",
        phone: "+1 234 567 8902",
        city: "Lagos",
        education: "master",
        educationGrade: "9.0",
        gradeType: "cgpa",
        hasLanguageTest: "yes",
        languageTest: "ielts",
        ieltsScore: "8.0",
        hasWorkExperience: "yes",
        workExperienceYears: "5",
        financialCapacity: "above-60",
        preferredIntake: "january",
        preferredProvince: "british-columbia",
        otpCode: null,
        otpVerified: 1,
        eligibilityScore: 92,
        status: "approved",
        submittedAt: new Date("2024-01-16T14:20:00"),
      },
      {
        id: randomUUID(),
        fullName: "Michael Chen",
        email: "m.chen@example.com",
        phone: "+1 234 567 8903",
        city: "Beijing",
        education: "12th",
        educationGrade: "75",
        gradeType: null,
        hasLanguageTest: "no",
        languageTest: null,
        ieltsScore: null,
        hasWorkExperience: "no",
        workExperienceYears: null,
        financialCapacity: "20-40",
        preferredIntake: "may",
        preferredProvince: "alberta",
        otpCode: null,
        otpVerified: 1,
        eligibilityScore: 70,
        status: "pending",
        submittedAt: new Date("2024-01-17T09:15:00"),
      },
    ];

    sampleSubmissions.forEach((submission) => {
      this.submissions.set(submission.id, submission);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id, role: insertUser.role ?? "user" };
    this.users.set(id, user);
    return user;
  }

  async getSubmissions(): Promise<Submission[]> {
    return Array.from(this.submissions.values()).sort((a, b) => {
      return (
        new Date(b.submittedAt!).getTime() - new Date(a.submittedAt!).getTime()
      );
    });
  }

  async getSubmission(id: string): Promise<Submission | undefined> {
    return this.submissions.get(id);
  }

  async getSubmissionByPhone(phone: string): Promise<Submission | undefined> {
    return Array.from(this.submissions.values()).find(
      (submission) => submission.phone === phone
    );
  }

  async createSubmission(
    insertSubmission: InsertSubmission
  ): Promise<Submission> {
    const id = randomUUID();
    const submission: Submission = {
      id,
      fullName: insertSubmission.fullName,
      email: insertSubmission.email,
      phone: insertSubmission.phone,
      city: insertSubmission.city,
      education: insertSubmission.education ?? null,
      educationGrade: insertSubmission.educationGrade ?? null,
      gradeType: insertSubmission.gradeType ?? null,
      hasLanguageTest: insertSubmission.hasLanguageTest ?? null,
      languageTest: insertSubmission.languageTest ?? null,
      ieltsScore: insertSubmission.ieltsScore ?? null,
      hasWorkExperience: insertSubmission.hasWorkExperience ?? null,
      workExperienceYears: insertSubmission.workExperienceYears ?? null,
      financialCapacity: insertSubmission.financialCapacity ?? null,
      preferredIntake: insertSubmission.preferredIntake ?? null,
      preferredProvince: insertSubmission.preferredProvince ?? null,
      otpCode: insertSubmission.otpCode ?? null,
      otpVerified: insertSubmission.otpVerified ?? 0,
      eligibilityScore: insertSubmission.eligibilityScore ?? null,
      status: insertSubmission.status || "pending",
      submittedAt: new Date(),
    };
    this.submissions.set(id, submission);
    return submission;
  }

  async updateSubmissionOtp(
    id: string,
    otpCode: string
  ): Promise<Submission | undefined> {
    const submission = this.submissions.get(id);
    if (submission) {
      submission.otpCode = otpCode;
      submission.otpVerified = 0;
      this.submissions.set(id, submission);
    }
    return submission;
  }

  async verifyOtp(id: string, otpCode: string): Promise<boolean> {
    const submission = this.submissions.get(id);
    if (submission && submission.otpCode === otpCode) {
      submission.otpVerified = 1;
      this.submissions.set(id, submission);
      return true;
    }
    return false;
  }

  async updateEligibilityScore(
    id: string,
    score: number
  ): Promise<Submission | undefined> {
    const submission = this.submissions.get(id);
    if (submission) {
      submission.eligibilityScore = score;
      this.submissions.set(id, submission);
    }
    return submission;
  }

  async updateSubmissionStatus(
    id: string,
    status: string
  ): Promise<Submission | undefined> {
    const submission = this.submissions.get(id);
    if (submission) {
      submission.status = status;
      this.submissions.set(id, submission);
    }
    return submission;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values()).sort((a, b) => {
      return (
        new Date(b.submittedAt!).getTime() - new Date(a.submittedAt!).getTime()
      );
    });
  }

  async createContactMessage(
    insertMessage: InsertContactMessage
  ): Promise<ContactMessage> {
    const id = randomUUID();
    const contactMessage: ContactMessage = {
      id,
      name: insertMessage.name,
      email: insertMessage.email,
      phone: insertMessage.phone,
      subject: insertMessage.subject,
      message: insertMessage.message,
      submittedAt: new Date(),
    };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }
}

class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    // NOTE: Using same workaround as createSubmission - see comment there
    const id = randomUUID();
    const userData = {
      ...insertUser,
      id,
    };
    await db.insert(users).values(userData);
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getSubmissions(): Promise<Submission[]> {
    return await db
      .select()
      .from(submissions)
      .orderBy(desc(submissions.submittedAt));
  }

  async getSubmission(id: string): Promise<Submission | undefined> {
    const result = await db
      .select()
      .from(submissions)
      .where(eq(submissions.id, id));
    return result[0];
  }

  async getSubmissionByPhone(phone: string): Promise<Submission | undefined> {
    const result = await db
      .select()
      .from(submissions)
      .where(eq(submissions.phone, phone))
      .orderBy(desc(submissions.submittedAt));
    return result[0];
  }

  async createSubmission(
    insertSubmission: InsertSubmission
  ): Promise<Submission> {
    // NOTE: The neon-http driver doesn't support .returning() properly (returns empty array).
    // Workaround: Generate UUID before insert, then query the inserted record.
    // This is safe for single-row inserts and avoids race conditions in this context.
    const id = randomUUID();
    const submissionData = {
      ...insertSubmission,
      id,
      submittedAt: new Date(),
    };

    await db.insert(submissions).values(submissionData);

    // Query the inserted record to return it
    const result = await db
      .select()
      .from(submissions)
      .where(eq(submissions.id, id));
    return result[0];
  }

  async updateSubmissionOtp(
    id: string,
    otpCode: string
  ): Promise<Submission | undefined> {
    await db
      .update(submissions)
      .set({ otpCode, otpVerified: 0 })
      .where(eq(submissions.id, id));
    const result = await db
      .select()
      .from(submissions)
      .where(eq(submissions.id, id));
    return result[0];
  }

  async verifyOtp(id: string, otpCode: string): Promise<boolean> {
    const submission = await this.getSubmission(id);
    if (submission && submission.otpCode === otpCode) {
      await db
        .update(submissions)
        .set({ otpVerified: 1 })
        .where(eq(submissions.id, id));
      return true;
    }
    return false;
  }

  async updateEligibilityScore(
    id: string,
    score: number
  ): Promise<Submission | undefined> {
    await db
      .update(submissions)
      .set({ eligibilityScore: score })
      .where(eq(submissions.id, id));
    const result = await db
      .select()
      .from(submissions)
      .where(eq(submissions.id, id));
    return result[0];
  }

  async updateSubmissionStatus(
    id: string,
    status: string
  ): Promise<Submission | undefined> {
    await db.update(submissions).set({ status }).where(eq(submissions.id, id));
    const result = await db
      .select()
      .from(submissions)
      .where(eq(submissions.id, id));
    return result[0];
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return await db
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.submittedAt));
  }

  async createContactMessage(
    insertMessage: InsertContactMessage
  ): Promise<ContactMessage> {
    const id = randomUUID();
    const messageData = {
      ...insertMessage,
      id,
      submittedAt: new Date(),
    };

    await db.insert(contactMessages).values(messageData);

    const result = await db
      .select()
      .from(contactMessages)
      .where(eq(contactMessages.id, id));
    return result[0];
  }
}

export const storage = new DbStorage();
