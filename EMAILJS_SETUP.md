# EmailJS Setup Guide

To enable email functionality in your portfolio contact form, you need to set up EmailJS. Follow these steps:

## 1. Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Create Email Service

### Option A: Gmail Setup (Recommended)
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail"
4. **Important Gmail Setup Steps:**
   - Click "Connect Account" 
   - Sign in with your Gmail account
   - **Grant ALL requested permissions** (this is crucial)
   - If you see "insufficient authentication scopes" error:
     - Go to your Google Account settings
     - Navigate to Security → Third-party apps with account access
     - Find EmailJS and remove it
     - Go back to EmailJS and reconnect with full permissions
5. Note down your **Service ID** (e.g., `service_abc123`)

### Option B: Alternative Email Services (If Gmail fails)
If Gmail continues to have issues, try these alternatives:
- **Outlook/Hotmail**: Usually works without OAuth issues
- **Yahoo Mail**: Simple SMTP setup
- **Custom SMTP**: Use your hosting provider's SMTP settings

### Gmail Troubleshooting:
- Enable "Less secure app access" in Gmail (if available)
- Use an App Password instead of your regular password
- Check if 2FA is enabled (may require app-specific password)

## 3. Create Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

```
Subject: New Contact Form Message from {{from_name}}

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Save the template and note down your **Template ID** (e.g., `template_xyz789`)

## 4. Get Your Public Key

1. Go to "Account" → "General"
2. Find your **Public Key** (e.g., `user_abcdef123456`)

## 5. Update Your Portfolio

Replace these placeholders in your `index.html` file:

```javascript
// Line ~1375 - Replace with your actual public key
emailjs.init("YOUR_PUBLIC_KEY");

// Line ~1395 - Replace with your actual service and template IDs
emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
```

**Example:**
```javascript
emailjs.init("user_abcdef123456");
emailjs.sendForm('service_gmail', 'template_contact', form)
```

## 6. Test Your Form

1. Open your portfolio in a browser
2. Fill out the contact form
3. Submit the form
4. Check your email inbox for the message
5. Verify the form shows success/error messages properly

## 7. Email Template Variables

The form sends these variables to your email template:
- `{{from_name}}` - Visitor's name
- `{{from_email}}` - Visitor's email
- `{{subject}}` - Message subject (optional)
- `{{message}}` - The message content

## 8. Free Plan Limits

EmailJS free plan includes:
- 200 emails per month
- 2 email services
- 2 email templates
- Basic support

For higher volume, consider upgrading to a paid plan.

## Troubleshooting

**Form not sending emails:**
1. Check browser console for errors
2. Verify your Service ID, Template ID, and Public Key are correct
3. Make sure your email service is properly configured
4. Check EmailJS dashboard for failed requests

**Emails going to spam:**
1. Add your domain to EmailJS allowed origins
2. Consider using a custom domain email
3. Ask recipients to whitelist your email

**Need help?**
- Check EmailJS documentation: https://www.emailjs.com/docs/
- Contact EmailJS support through their dashboard