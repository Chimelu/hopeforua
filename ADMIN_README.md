# Admin Panel Documentation

## Overview

The admin panel is located at `/admin` and provides full CRUD (Create, Read, Update, Delete) operations for donation projects, as well as the ability to view donors for each project.

## Features

1. **Create Projects** - Add new donation projects with images, descriptions, and funding goals
2. **Edit Projects** - Update existing project details
3. **Delete Projects** - Remove projects (also removes associated donations)
4. **View Donors** - See all users who have donated to a specific project
5. **Image Upload** - Upload images using cloud storage services

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create a new project
- `GET /api/projects/[id]` - Get a single project
- `PUT /api/projects/[id]` - Update a project
- `DELETE /api/projects/[id]` - Delete a project

### Donations
- `GET /api/donations` - Get all donations
- `POST /api/donations` - Create a new donation
- `GET /api/projects/[id]/donations` - Get donations for a specific project

### Upload
- `POST /api/upload` - Upload an image file

## Project Data Structure

When creating or editing a project, the following fields are required:

```typescript
{
  title: string;              // Project title
  category: string;           // Category (Emergency Relief, Medical Aid, etc.)
  description: string;        // Project description
  imageUrl: string;          // Image URL (from upload or direct URL)
  targetAmount: number;      // Funding goal in USD
  currentAmount: number;     // Current amount raised (defaults to 0)
  status: 'active' | 'completed';  // Project status
}
```

## Image Upload Setup

The image upload functionality supports multiple cloud storage services. Configure your preferred service using environment variables in `.env.local`:

### Cloudinary Setup

1. Sign up at [Cloudinary](https://cloudinary.com)
2. Get your credentials from the dashboard
3. Add to `.env.local`:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### AWS S3 Setup

1. Create an S3 bucket in AWS
2. Set up IAM user with S3 permissions
3. Add to `.env.local`:

```env
AWS_S3_BUCKET=your_bucket_name
AWS_S3_REGION=your_region
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
```

**Note:** For AWS S3, you'll need to install the AWS SDK:
```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

Then uncomment and implement the S3 upload code in `app/api/upload/route.ts`.

### Fallback

If no cloud storage is configured, the system will use a placeholder URL. For production, always configure a cloud storage service.

## Donation Data Structure

When a donation is made, the following data is stored:

```typescript
{
  id: string;
  projectId: string | null;  // null for general donations
  name: string;
  email: string;
  phone: string;
  amount: number;
  paymentMethod: 'card' | 'bank' | 'crypto';
  message: string;
  createdAt: string;
}
```

## Current Implementation

The current implementation uses in-memory storage (`app/api/data-store.ts`). This means:
- Data is lost when the server restarts
- Data is not shared across multiple server instances
- Suitable for development and testing only

## Production Setup

For production, replace the in-memory storage with a database:

1. **Recommended Databases:**
   - PostgreSQL (with Prisma ORM)
   - MongoDB (with Mongoose)
   - Supabase
   - Firebase

2. **Update API Routes:**
   - Replace `app/api/data-store.ts` with database queries
   - Update all API routes to use database instead of in-memory arrays

3. **Example with Prisma:**
```typescript
// Install: npm install @prisma/client prisma
// Initialize: npx prisma init

// schema.prisma
model Project {
  id            String    @id @default(cuid())
  title         String
  category      String
  description   String
  imageUrl      String
  targetAmount  Float
  currentAmount Float     @default(0)
  status        String
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  donations     Donation[]
}

model Donation {
  id            String    @id @default(cuid())
  projectId     String?
  name          String
  email         String
  phone         String
  amount        Float
  paymentMethod String
  message       String
  createdAt     DateTime  @default(now())
  project       Project?  @relation(fields: [projectId], references: [id])
}
```

## Security Considerations

1. **Authentication:** Add authentication to the admin panel (e.g., NextAuth.js)
2. **Authorization:** Restrict admin access to authorized users only
3. **Input Validation:** Validate all inputs on both client and server
4. **Rate Limiting:** Implement rate limiting for API endpoints
5. **CORS:** Configure CORS properly for production
6. **Environment Variables:** Never commit `.env.local` to version control

## Usage

1. Navigate to `/admin` in your browser
2. Click "Create Project" to add a new project
3. Fill in the form and upload an image
4. Click "Edit" on any project card to modify it
5. Click "View Donors" to see all donations for a project
6. Click "Delete" to remove a project (with confirmation)

## Styling

The admin panel uses the same dark blue theme (`bg-blue-900`) as the rest of the website, with:
- Yellow accents for buttons and highlights
- White text on dark backgrounds
- Card-based layout matching the donation page style

