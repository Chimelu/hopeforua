# Email Service Setup Guide

This guide explains how to configure the email service for HopeForUA to send automated emails for donations, newsletter subscriptions, and contact form submissions.

## Prerequisites

1. A Gmail account (or any SMTP-compatible email service)
2. Gmail App Password (required for Gmail accounts)

## Gmail Setup Instructions

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to **Security**
3. Enable **2-Step Verification** if not already enabled

### Step 2: Generate App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Select **Mail** as the app
3. Select **Other (Custom name)** as the device
4. Enter "HopeForUA" as the name
5. Click **Generate**
6. Copy the 16-character password (you'll need this for your `.env.local` file)

## Environment Variables

Add the following variables to your `.env.local` file:

```env
# Email Service Configuration
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-16-character-app-password

# Admin Email (optional - defaults to hopeeforua@gmail.com)
ADMIN_EMAIL=hopeeforua@gmail.com
```

### Example `.env.local`:
```env
SMTP_EMAIL=hopeeforua@gmail.com
SMTP_PASSWORD=abcd efgh ijkl mnop
ADMIN_EMAIL=hopeeforua@gmail.com
```

**Important Notes:**
- Use your Gmail address for `SMTP_EMAIL`
- Use the 16-character App Password (not your regular Gmail password)
- Remove spaces from the App Password when adding to `.env.local`
- The `ADMIN_EMAIL` is where contact form notifications will be sent

## Email Templates

The service includes three email templates:

### 1. Donation Confirmation Email
- **Triggered:** When a user completes a donation
- **Recipient:** The donor
- **Content:** Thank you message, donation amount, payment method

### 2. Newsletter Subscription Confirmation
- **Triggered:** When a user subscribes to the newsletter
- **Recipient:** The subscriber
- **Content:** Welcome message and information about what to expect

### 3. Contact Form Emails
- **Triggered:** When a user submits the contact form
- **Recipients:** 
  - User (confirmation email)
  - Admin (notification email with form details)
- **Content:** 
  - User: Confirmation that their message was received
  - Admin: Full form submission details

## Testing the Email Service

After setting up your environment variables:

1. Restart your Next.js development server:
   ```bash
   npm run dev
   ```

2. Test the email service by:
   - Making a test donation
   - Subscribing to the newsletter
   - Submitting the contact form

3. Check your email inbox (and spam folder) for the emails

## Troubleshooting

### Emails not sending?
1. **Check environment variables:** Ensure `SMTP_EMAIL` and `SMTP_PASSWORD` are correctly set in `.env.local`
2. **Verify App Password:** Make sure you're using the App Password, not your regular Gmail password
3. **Check server logs:** Look for error messages in your terminal/console
4. **Gmail security:** Ensure "Less secure app access" is not required (App Passwords should work)

### "Invalid login" error?
- Double-check your App Password
- Ensure 2-Factor Authentication is enabled
- Try generating a new App Password

### Emails going to spam?
- This is normal for automated emails
- Consider setting up SPF, DKIM, and DMARC records for your domain (advanced)

## API Endpoint

The email service is accessible via the API route:

**POST** `/api/send-email`

**Request Body:**
```json
{
  "type": "donation" | "newsletter" | "contact",
  // For donation:
  "donorEmail": "user@example.com",
  "donorName": "John Doe",
  "amount": 100,
  "paymentMethod": "bank",
  
  // For newsletter:
  "subscriberEmail": "user@example.com",
  
  // For contact:
  "name": "John Doe",
  "email": "user@example.com",
  "subject": "Inquiry",
  "message": "Hello..."
}
```

## Customization

Email templates can be customized in `lib/email.ts`:
- Modify HTML templates in the `emailTemplates` object
- Update styling, colors, and branding
- Add or remove content sections

## Support

For issues or questions, contact: hopeeforua@gmail.com

