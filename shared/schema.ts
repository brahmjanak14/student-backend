import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("user"),
});

export const submissions = pgTable("submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  city: text("city").notNull(),
  education: text("education"),
  educationGrade: text("education_grade"),
  gradeType: text("grade_type"),
  hasLanguageTest: text("has_language_test"),
  languageTest: text("language_test"),
  ieltsScore: text("ielts_score"),
  hasWorkExperience: text("has_work_experience"),
  workExperienceYears: text("work_experience_years"),
  financialCapacity: text("financial_capacity"),
  preferredIntake: text("preferred_intake"),
  preferredProvince: text("preferred_province"),
  otpCode: text("otp_code"),
  otpVerified: integer("otp_verified").default(0),
  eligibilityScore: integer("eligibility_score"),
  status: text("status").notNull().default("pending"),
  submittedAt: timestamp("submitted_at").defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
});

export const insertSubmissionSchema = createInsertSchema(submissions).omit({
  id: true,
  submittedAt: true,
}).partial({
  education: true,
  educationGrade: true,
  gradeType: true,
  hasLanguageTest: true,
  languageTest: true,
  ieltsScore: true,
  hasWorkExperience: true,
  workExperienceYears: true,
  financialCapacity: true,
  preferredIntake: true,
  preferredProvince: true,
  otpCode: true,
  otpVerified: true,
  eligibilityScore: true,
  status: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  submittedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertSubmission = z.infer<typeof insertSubmissionSchema>;
export type Submission = typeof submissions.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
