import { type User, type InsertUser, type Submission, type InsertSubmission } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getSubmissions(): Promise<Submission[]>;
  getSubmission(id: string): Promise<Submission | undefined>;
  createSubmission(submission: InsertSubmission): Promise<Submission>;
  updateSubmissionStatus(id: string, status: string): Promise<Submission | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private submissions: Map<string, Submission>;

  constructor() {
    this.users = new Map();
    this.submissions = new Map();
    
    this.seedSampleData();
  }

  private seedSampleData() {
    const sampleSubmissions: Submission[] = [
      {
        id: randomUUID(),
        fullName: "John Smith",
        email: "john.smith@example.com",
        phone: "+1 234 567 8901",
        country: "India",
        education: "Bachelor's Degree",
        englishTest: "IELTS",
        testScore: "7.5",
        workExperience: "3 years",
        financialCapacity: "$20,000+",
        eligibilityScore: 85,
        status: "approved",
        submittedAt: new Date("2024-01-15T10:30:00"),
      },
      {
        id: randomUUID(),
        fullName: "Sarah Johnson",
        email: "sarah.j@example.com",
        phone: "+1 234 567 8902",
        country: "Nigeria",
        education: "Master's Degree",
        englishTest: "TOEFL",
        testScore: "95",
        workExperience: "5 years",
        financialCapacity: "$30,000+",
        eligibilityScore: 92,
        status: "approved",
        submittedAt: new Date("2024-01-16T14:20:00"),
      },
      {
        id: randomUUID(),
        fullName: "Michael Chen",
        email: "m.chen@example.com",
        phone: "+1 234 567 8903",
        country: "China",
        education: "Bachelor's Degree",
        englishTest: "IELTS",
        testScore: "6.5",
        workExperience: "2 years",
        financialCapacity: "$15,000-$20,000",
        eligibilityScore: 70,
        status: "pending",
        submittedAt: new Date("2024-01-17T09:15:00"),
      },
      {
        id: randomUUID(),
        fullName: "Priya Patel",
        email: "priya.p@example.com",
        phone: "+1 234 567 8904",
        country: "India",
        education: "Master's Degree",
        englishTest: "IELTS",
        testScore: "8.0",
        workExperience: "4 years",
        financialCapacity: "$25,000+",
        eligibilityScore: 88,
        status: "approved",
        submittedAt: new Date("2024-01-18T11:45:00"),
      },
      {
        id: randomUUID(),
        fullName: "David Martinez",
        email: "d.martinez@example.com",
        phone: "+1 234 567 8905",
        country: "Mexico",
        education: "Bachelor's Degree",
        englishTest: "TOEFL",
        testScore: "85",
        workExperience: "1 year",
        financialCapacity: "$10,000-$15,000",
        eligibilityScore: 65,
        status: "pending",
        submittedAt: new Date("2024-01-19T16:30:00"),
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
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getSubmissions(): Promise<Submission[]> {
    return Array.from(this.submissions.values()).sort((a, b) => {
      return new Date(b.submittedAt!).getTime() - new Date(a.submittedAt!).getTime();
    });
  }

  async getSubmission(id: string): Promise<Submission | undefined> {
    return this.submissions.get(id);
  }

  async createSubmission(insertSubmission: InsertSubmission): Promise<Submission> {
    const id = randomUUID();
    const submission: Submission = {
      id,
      fullName: insertSubmission.fullName,
      email: insertSubmission.email,
      phone: insertSubmission.phone,
      country: insertSubmission.country,
      education: insertSubmission.education,
      englishTest: insertSubmission.englishTest ?? null,
      testScore: insertSubmission.testScore ?? null,
      workExperience: insertSubmission.workExperience ?? null,
      financialCapacity: insertSubmission.financialCapacity ?? null,
      eligibilityScore: insertSubmission.eligibilityScore ?? null,
      status: insertSubmission.status || "pending",
      submittedAt: new Date(),
    };
    this.submissions.set(id, submission);
    return submission;
  }

  async updateSubmissionStatus(id: string, status: string): Promise<Submission | undefined> {
    const submission = this.submissions.get(id);
    if (submission) {
      submission.status = status;
      this.submissions.set(id, submission);
    }
    return submission;
  }
}

export const storage = new MemStorage();
