import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createContactSchema } from "@/lib/schemas/contact";
import { z } from "zod";


export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
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
    
    const ip = req.headers.get("x-forwarded-for");
    const turnstileFormData = new URLSearchParams();
    turnstileFormData.append("secret", turnstileSecret);
    turnstileFormData.append("response", turnstileToken);
    if (ip) {
      turnstileFormData.append("remoteip", ip);
    }

    const turnstileResponse = await fetch(turnstileVerifyUrl, {
      method: "POST",
      body: turnstileFormData,
    });

    const turnstileResult = await turnstileResponse.json();

    if (!turnstileResult.success) {
      console.error("Turnstile verification failed:", turnstileResult);
      return NextResponse.json(
        { 
          success: false, 
          error: "Turnstile verification failed",
          details: turnstileResult 
        },
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
            details: error.issues 
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
        // TODO: Update 'from' to "Chacal Studio Contact <info@contact.chacalestudio.ar>" once domain verification is complete
        from: "Chacal Studio Contact <onboarding@resend.dev>",
        to: ["hola@chacalestudio.ar", "cuentas@chacalestudio.ar"],
        replyTo: email,
        subject: `¡Nuevo mensaje de contacto de ${name}!`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">¡Hola Chacal Estudio!</h1>
            <p style="font-size: 16px; color: #555;">
              <strong>${name}</strong> quiere ponerse en contacto con nosotros!
            </p>
            
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">Detalles del contacto:</h3>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Teléfono:</strong> ${phone || "No especificado"}</p>
              <p><strong>Organización:</strong> ${organization || "No especificada"}</p>
            </div>

            <div style="border-left: 4px solid #333; padding-left: 15px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">Mensaje:</h3>
              <p style="font-size: 16px; line-height: 1.6; color: #444;">
                ${message.replace(/\n/g, "<br>")}
              </p>
            </div>
            
            <p style="font-size: 12px; color: #888; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px;">
              Este mensaje fue enviado desde el formulario de contacto de chacalestudio.ar
            </p>
          </div>
        `,
      });

      if (emailResponse.error) {
        console.error("Resend error:", emailResponse.error);
        return NextResponse.json(
          { success: false, error: emailResponse.error.message || "Failed to send email", details: emailResponse.error },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, message: "Email sent successfully" });
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      return NextResponse.json(
        { 
          success: false, 
          error: emailError instanceof Error ? emailError.message : "Failed to send email", 
          details: emailError 
        },
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

