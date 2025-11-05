CREATE TABLE "contact_messages" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"subject" text NOT NULL,
	"message" text NOT NULL,
	"submitted_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "submissions" ADD COLUMN "education" text;--> statement-breakpoint
ALTER TABLE "submissions" ADD COLUMN "education_grade" text;--> statement-breakpoint
ALTER TABLE "submissions" ADD COLUMN "grade_type" text;--> statement-breakpoint
ALTER TABLE "submissions" ADD COLUMN "has_language_test" text;--> statement-breakpoint
ALTER TABLE "submissions" ADD COLUMN "language_test" text;--> statement-breakpoint
ALTER TABLE "submissions" ADD COLUMN "ielts_score" text;--> statement-breakpoint
ALTER TABLE "submissions" ADD COLUMN "has_work_experience" text;--> statement-breakpoint
ALTER TABLE "submissions" ADD COLUMN "work_experience_years" text;--> statement-breakpoint
ALTER TABLE "submissions" ADD COLUMN "financial_capacity" text;--> statement-breakpoint
ALTER TABLE "submissions" ADD COLUMN "preferred_intake" text;--> statement-breakpoint
ALTER TABLE "submissions" ADD COLUMN "preferred_province" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" text DEFAULT 'user' NOT NULL;