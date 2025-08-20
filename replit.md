# Overview

This is a full-stack web application built as a portfolio/gallery site for showcasing artwork and design projects. The application features a React frontend with TypeScript, an Express.js backend, and integrates with Airtable as a content management system. The project uses modern web development tools and follows a clean architectural pattern with shared types between frontend and backend.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with multiple nested routes for work sections
- **Styling**: Tailwind CSS with custom theme system and shadcn/ui component library
- **UI Components**: Radix UI primitives wrapped in custom components for consistency
- **State Management**: Zustand for theme management, React Query for server state
- **Animations**: Framer Motion for page transitions and interactive elements

## Backend Architecture  
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful endpoints for artwork and collection management
- **Database Layer**: Drizzle ORM configured for PostgreSQL (though currently using Airtable)
- **Error Handling**: Centralized error handling with structured error responses
- **Development**: Hot reload with Vite middleware integration

## Data Storage Solutions
- **Primary Storage**: Airtable serves as the content management system
- **Database Configuration**: PostgreSQL setup via Drizzle ORM (prepared for future migration)
- **Schema Management**: Shared TypeScript types using Zod for validation
- **Connection**: Neon Database serverless PostgreSQL connection configured

## Authentication and Authorization
- No authentication system currently implemented
- Session management infrastructure present via connect-pg-simple
- Ready for future authentication implementation

## Design System
- **Theme Management**: Custom theme system with light/dark/sunset modes
- **Color Scheme**: Professional variant with customizable primary colors
- **Component Library**: Comprehensive UI component system based on shadcn/ui
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints
- **Visual Effects**: Custom wave animations and interactive elements

# External Dependencies

## Third-party Services
- **Airtable**: Content management system for storing artwork metadata and images
- **Neon Database**: Serverless PostgreSQL provider (configured but not actively used)

## Key Development Dependencies  
- **Build System**: Vite with React plugin for fast development and building
- **UI Framework**: Extensive Radix UI component collection for accessible components
- **Styling**: Tailwind CSS with PostCSS for utility-first CSS
- **Type Safety**: Zod for runtime type validation and schema definition
- **Data Fetching**: TanStack Query for server state management
- **Animation**: Framer Motion for smooth animations and transitions
- **Form Handling**: React Hook Form with Hookform Resolvers

## Development Tools
- **Package Management**: npm with lock file for consistent dependencies
- **TypeScript**: Strict mode enabled with path mapping for clean imports  
- **Code Quality**: ESLint and TypeScript compiler checks
- **Development Server**: Express with Vite middleware for SSR-like development experience

## Database and ORM
- **ORM**: Drizzle Kit for database schema management and migrations
- **Connection**: PostgreSQL via Neon's serverless driver with WebSocket support
- **Migration**: Drizzle migrations system configured for schema changes