import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createContactSchema } from "@/lib/schemas/contact";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { turnstileToken, ...formData } = body;

    // 1. Verify Turnstile Token
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (!turnstileSecret) {
      console.error("TURNSTILE_SECRET_KEY is not defined");
      return NextResponse.json(
        { success: false, error: "Server configuration error" },
        { status: 500 }
      );
    }

    if (!turnstileToken) {
      return NextResponse.json(
        { success: false, error: "Turnstile token is required" },
        { status: 400 }
      );
    }

    const turnstileVerifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    const turnstileFormData = new FormData();
    turnstileFormData.append("secret", turnstileSecret);
    turnstileFormData.append("response", turnstileToken);

    const turnstileResponse = await fetch(turnstileVerifyUrl, {
      method: "POST",
      body: turnstileFormData,
    });

    const turnstileResult = await turnstileResponse.json();

    if (!turnstileResult.success) {
      console.error("Turnstile verification failed:", turnstileResult);
      return NextResponse.json(
        { success: false, error: "Turnstile verification failed" },
        { status: 400 }
      );
    }

    // 2. Validate Form Data
    // We use a simple identity function for translation keys as we just need the keys/codes
    // or English defaults if we wanted to provide them.
    const schema = createContactSchema((key) => key);
    
    try {
      schema.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { 
            success: false, 
            error: "Validation failed", 
            details: error.errors 
          },
          { status: 400 }
        );
      }
      throw error;
    }

    // 3. Send Email via Resend
    const { name, email, phone, organization, message } = formData;

    try {
      const emailResponse = await resend.emails.send({
        from: "Chacal Studio Contact <onboarding@resend.dev>", // Update this when domain is verified
        to: "hola@chacalestudio.ar",
        replyTo: email,
        subject: `New contact message from ${name}`,
        html: `
          <h1>New Contact Form Submission</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "N/A"}</p>
          <p><strong>Organization:</strong> ${organization || "N/A"}</p>
          <hr />
          <h2>Message:</h2>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      });

      if (emailResponse.error) {
        console.error("Resend error:", emailResponse.error);
        return NextResponse.json(
          { success: false, error: "Failed to send email" },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, message: "Email sent successfully" });
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      return NextResponse.json(
        { success: false, error: "Failed to send email" },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

