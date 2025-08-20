"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    // Basic validation
    if (!data.name || !data.email || !data.subject || !data.message) {
      return {
        success: false,
        error: "All fields are required",
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        error: "Please enter a valid email address",
      };
    }

    // Send email
    const { error } = await resend.emails.send({
      from: "Evertwine <onboarding@resend.dev>", // Using Resend's default verified domain
      to: ["support@evertwine.social"],
      replyTo: data.email, // Fixed: changed from reply_to to replyTo
      subject: `Contact Form: ${data.subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <h3 style="color: #555; margin-top: 20px;">Message:</h3>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${data.message.replace(/\n/g, "<br />")}
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${data.name}
        Email: ${data.email}
        Subject: ${data.subject}
        
        Message:
        ${data.message}
      `,
    });

    if (error) {
      console.error("Error sending email:", error);
      return {
        success: false,
        error: "Failed to send email. Please try again later.",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error in sendContactEmail:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}
