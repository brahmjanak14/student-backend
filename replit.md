# Canada Study Visa Eligibility Checker

## Overview

This is a Canada Study Visa Eligibility Checker web application built to help prospective students assess their eligibility for Canadian study permits. The application provides an interactive multi-step form that evaluates academic credentials, language test scores, work experience, and financial capacity to generate personalized eligibility assessments with probability scores and recommendations.

The platform is designed with a focus on trust, professionalism, and Canadian identity, drawing inspiration from modern immigration and education portals. It features a complete user journey from initial assessment through lead capture and result sharing.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Custom component library built on Radix UI primitives with shadcn/ui styling
- **Styling**: Tailwind CSS with custom design system following Canadian branding (red/white color scheme)
- **State Management**: React Hook Form for form state, TanStack Query for server state
- **Responsive Design**: Mobile-first approach with dedicated bottom navigation for mobile devices

### Component Architecture
- **Design System**: Comprehensive component library including Button, Card, Hero, and Navbar components
- **Form Handling**: Multi-step form with validation using React Hook Form and Zod schemas
- **Layout System**: Consistent spacing and typography using Tailwind's design tokens
- **Glassmorphism Effects**: Modern UI elements with blur and transparency effects

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: Hot module replacement via Vite development server
- **API Structure**: RESTful API endpoints with /api prefix routing
- **Error Handling**: Centralized error handling middleware with structured error responses
- **Authentication**: JWT-based token authentication with role-based access control for admin routes

### Data Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Zod validation schemas for runtime type checking
- **Database**: PostgreSQL configured via environment variables
- **Storage Interface**: Abstracted storage layer with in-memory fallback for development

### Application Flow
- **Landing Page**: Hero section with feature highlights and call-to-action
- **Eligibility Form**: Multi-step assessment covering academics, language scores, and background
- **Results Page**: Probability scoring with strengths/weaknesses analysis
- **Lead Capture**: Mobile OTP verification and contact information collection
- **Download/Share**: PDF generation and social sharing capabilities

### UI/UX Design Patterns
- **Canadian Branding**: Red (#d32f2f) and white color scheme with soft gray accents
- **Typography**: Inter font family for clean, modern readability
- **Cards**: Rounded corners (rounded-2xl) with soft shadows and centered content
- **Buttons**: Gradient effects with hover animations and consistent border radius
- **Mobile Optimization**: Bottom navigation bar and responsive breakpoints

## External Dependencies

### UI and Styling
- **Radix UI**: Complete suite of accessible component primitives including Dialog, Select, Accordion, and form controls
- **Tailwind CSS**: Utility-first CSS framework with custom configuration for Canadian design theme
- **Lucide React**: Icon library for consistent iconography throughout the application
- **Class Variance Authority**: Type-safe styling variants for component customization

### Forms and Validation
- **React Hook Form**: Performant form library with built-in validation
- **Hookform Resolvers**: Integration layer for external validation libraries
- **Zod**: Schema validation library for runtime type checking and form validation

### Data Fetching and State
- **TanStack Query**: Server state management with caching, background updates, and error handling
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL support
- **Drizzle Zod**: Integration between Drizzle schemas and Zod validation

### Database and Infrastructure
- **Neon Database**: Serverless PostgreSQL database platform
- **Connect PG Simple**: Session store for PostgreSQL integration
- **Date-fns**: Modern date utility library for date manipulations

### Development Tools
- **TypeScript**: Static type checking and enhanced developer experience
- **ESBuild**: Fast JavaScript bundler for production builds
- **TSX**: TypeScript execution engine for development
- **Replit Integration**: Development environment plugins and error handling

### Authentication and Security
- **JWT Authentication**: Secure token-based authentication using jsonwebtoken library
- **Role-Based Access**: Admin role verification for protected routes
- **Token Management**: Automatic token injection in API requests via Authorization headers
- **Session Handling**: Support for both session storage and persistent local storage (remember me)
- **Auto-Logout**: Global 401/403 error handling that automatically clears tokens and redirects to login
- **Security Features**:
  - Cryptographically secure JWT secret generation if JWT_SECRET environment variable not set
  - Token expiration (24 hours)
  - Protected API endpoints require valid admin token
  - Client-side authentication guards on admin pages
  - Automatic token cleanup on logout

## Recent Changes

### October 31, 2025 - Admin Authentication Implementation
- Added role field to users table schema for user/admin distinction
- Implemented JWT-based authentication with proper token signing and verification
- Created authentication middleware (authenticateToken and requireAdmin) for route protection
- Protected all admin API endpoints (/api/submissions) with authentication middleware
- Updated admin panel sidebar with "Logout" button (replacing "Exit Admin")
- Implemented proper logout functionality that clears all tokens from storage
- Added authentication guards to admin pages (Dashboard and Users) to prevent unauthorized access
- Enhanced query client to automatically include JWT tokens in all API requests
- Added global error handling for 401/403 responses to auto-logout and redirect users