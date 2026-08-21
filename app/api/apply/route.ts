import { NextResponse } from "next/server";
import { Resend } from "resend";
import { buildRateLimitHeaders, checkApplyRateLimit, getClientIp } from "@/lib/rate-limit";
import { escapeHtml, escapeHtmlWithLineBreaks } from "@/lib/security";

const resend = new Resend(process.env.RESEND_API_KEY);

// Email template for applications
const ApplicationTemplate = ({ 
  displayName,
  email,
  studentId,
  academicYear,
  position,
  sectors,
  motivation,
  hasCV
}: { 
  displayName: string;
  email: string;
  studentId: string;
  academicYear: string;
  position: string;
  sectors?: string[];
  motivation: string;
  hasCV: boolean;
}) => {
  const safeDisplayName = escapeHtml(displayName);
  const safeEmail = escapeHtml(email);
  const safeStudentId = escapeHtml(studentId);
  const safeAcademicYear = escapeHtml(academicYear);
  const safePosition = escapeHtml(position);
  const safeMotivation = escapeHtmlWithLineBreaks(motivation);
  const safeSectors = sectors?.map((sector) => `<li>${escapeHtml(sector)}</li>`).join("") ?? "";

  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #333; text-align: center; border-bottom: 1px solid #eee; padding-bottom: 15px;">
        New NUIF Application
      </h1>
      
      <div style="background-color: #f5f5f5; border-radius: 5px; padding: 20px; margin-bottom: 20px;">
        <h2 style="color: #444; margin-top: 0;">Personal Information</h2>
        <p><strong>Full Name:</strong> ${safeDisplayName}</p>
        <p><strong>University Email:</strong> ${safeEmail}</p>
        <p><strong>University ID:</strong> ${safeStudentId}</p>
        <p><strong>Academic Year (2026/2027):</strong> ${safeAcademicYear}</p>
      </div>
      
      <div style="background-color: #f5f5f5; border-radius: 5px; padding: 20px; margin-bottom: 20px;">
        <h2 style="color: #444; margin-top: 0;">Position Details</h2>
        <p><strong>Position Applied For:</strong> ${safePosition}</p>
        
        <p><strong>Preferred Sectors:</strong></p>
        ${sectors && sectors.length > 0 ? `
          <ul>
            ${safeSectors}
          </ul>
        ` : '<p>None selected</p>'}
      </div>
      
      <div style="background-color: #f5f5f5; border-radius: 5px; padding: 20px; margin-bottom: 20px;">
        <h2 style="color: #444; margin-top: 0;">Motivation</h2>
        <div style="background-color: white; padding: 10px; border-radius: 3px;">
          ${safeMotivation}
        </div>
      </div>
      
      <div style="background-color: #f5f5f5; border-radius: 5px; padding: 20px; margin-bottom: 20px;">
        <h2 style="color: #444; margin-top: 0;">CV</h2>
        <p>${hasCV ? "CV attached to this email" : "No CV attached"}</p>
      </div>
      
      <p style="text-align: center; margin-top: 20px; color: #666; font-style: italic;">
        Submitted via the NUIF Application Form
      </p>
    </div>
  `;
};

// Email template for applicant confirmation
const ConfirmationTemplate = ({ 
  fullName,
  position
}: { 
  fullName: string;
  position: string;
}) => {
  const safeFullName = escapeHtml(fullName);
  const safePosition = escapeHtml(position);

  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #333;">NUIF Application Received</h1>
      <p>Dear ${safeFullName},</p>
      <p>Thank you for applying to the Newcastle University Investment Fund for the position of <strong>${safePosition}</strong>.</p>
      <p>We have received your application and will review it shortly. You will be contacted via this email address regarding the next steps.</p>
      <br/>
      <p>Kind regards,</p>
      <p><strong>NUIF Management Team</strong></p>
    </div>
  `;
};

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const rateLimitResult = await checkApplyRateLimit(clientIp);
    const rateLimitHeaders = buildRateLimitHeaders(rateLimitResult);

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: "Too many applications submitted. Please try again later." },
        { status: 429, headers: rateLimitHeaders }
      );
    }

    const formData = await request.formData();
    
    // Extract form fields
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const studentId = formData.get("studentId") as string;
    const academicYear = formData.get("academicYear") as string;
    const position = formData.get("position") as string;
    const sectorsJson = formData.get("sectors") as string | null;
    let sectors: string[] = [];

    if (sectorsJson) {
      try {
        const parsed = JSON.parse(sectorsJson);
        if (!Array.isArray(parsed) || !parsed.every((item) => typeof item === "string")) {
          return NextResponse.json(
            { error: "Invalid sectors format" },
            { status: 400, headers: rateLimitHeaders }
          );
        }
        sectors = parsed;
      } catch {
        return NextResponse.json(
          { error: "Invalid sectors format" },
          { status: 400, headers: rateLimitHeaders }
        );
      }
    }

    const motivation = formData.get("motivation") as string;
    const cv = formData.get("cv") as File;
    const applicationCount = parseInt(formData.get("applicationCount") as string || "1");
    
    // Format name with application count for 2nd+ applications
    const getOrdinalNumber = (num: number) => {
      const ordinals = ["", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"];
      return ordinals[num] || `${num}th`;
    };
    
    const formattedName = applicationCount > 1 
      ? `${fullName} - ${getOrdinalNumber(applicationCount)} Application`
      : fullName;
    
    // Check if position requires sector selection
    const requiresSectorSelection = position === "Head Analyst" || position === "Analyst";
    
    // Validate required fields
    if (!fullName || !email || !studentId || !academicYear || !position || 
        !motivation || !cv) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400, headers: rateLimitHeaders }
      );
    }
    
    if (!email.endsWith('@newcastle.ac.uk')) {
      return NextResponse.json(
        { error: "Please use your Newcastle University email address" },
        { status: 400, headers: rateLimitHeaders }
      );
    }
    
    // Only validate sectors for Analyst and Head Analyst positions
    if (requiresSectorSelection) {
      if (!Array.isArray(sectors) || sectors.length !== 3) {
        return NextResponse.json(
          { error: "Please select exactly 3 sectors" },
          { status: 400, headers: rateLimitHeaders }
        );
      }
    }

    const safeFileName = (cv.name || "cv").replace(/[\r\n\\/]+/g, "_");
    const safeFormattedName = formattedName.replace(/[\r\n]+/g, " ").trim();
    
    const fileArrayBuffer = await cv.arrayBuffer();
    const fileBuffer = Buffer.from(fileArrayBuffer);
    
    const { data, error } = await resend.emails.send({
      from: "NUIF Applications <applications@newcastleuniversityinvestmentfund.com>",
      to: ["newcastleinvestmentfund@gmail.com"],
      subject: `NUIF Application: ${safeFormattedName}`,
      html: ApplicationTemplate({
        displayName: formattedName,
        email,
        studentId,
        academicYear,
        position,
        sectors,
        motivation,
        hasCV: true
      }),
      text: [
        "New NUIF Application",
        "",
        `Full Name: ${safeFormattedName}`,
        `University Email: ${email}`,
        `University ID: ${studentId}`,
        `Academic Year (2026/2027): ${academicYear}`,
        "",
        `Position Applied For: ${position}`,
        "",
        `Preferred Sectors: ${sectors.length > 0 ? sectors.join(", ") : "None selected"}`,
        "",
        "Motivation:",
        motivation,
        "",
        `CV: ${cv ? "CV attached to this email" : "No CV attached"}`,
        "",
        "Submitted via the NUIF Application Form"
      ].join("\n"),
      attachments: [
        {
          filename: safeFileName,
          content: fileBuffer
        }
      ],
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json({ error: error.message }, { status: 500, headers: rateLimitHeaders });
    }

    // Send confirmation email to applicant
    try {
      await resend.emails.send({
        from: "NUIF Applications <applications@newcastleuniversityinvestmentfund.com>",
        to: [email],
        subject: "NUIF Application Received",
        html: ConfirmationTemplate({
          fullName,
          position
        }),
        text: `Dear ${fullName},\n\nThank you for applying to the Newcastle University Investment Fund for the position of ${position}.\n\nWe have received your application and will review it shortly. You will be contacted via this email address regarding the next steps.\n\nKind regards,\nNUIF Management Team`,
      });
    } catch (confirmError) {
      // Log the error but don't fail the whole request as the primary email was sent
      console.error("Confirmation email failed:", confirmError);
    }

    return NextResponse.json({ success: true, data }, { headers: rateLimitHeaders });
  } catch (error: any) {
    console.error("Application submission error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}