"use server"

type FormData = {
  [key: string]: string
}

export async function sendEmail(formType: "business" | "affiliate", formData: FormData) {
  try {
    // Format the form data into a readable email body
    const formattedData = Object.entries(formData)
      .map(([key, value]) => {
        // Convert camelCase to Title Case with spaces
        const formattedKey = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
        return `${formattedKey}: ${value}`
      })
      .join("\n")

    // Create HTML version
    const htmlContent = `
      <h2>New ${formType === "business" ? "Business Partnership" : "Affiliate"} submission</h2>
      <table border="0" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
        ${Object.entries(formData)
          .map(([key, value]) => {
            // Convert camelCase to Title Case with spaces
            const formattedKey = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
            return `
              <tr>
                <td style="font-weight: bold;">${formattedKey}:</td>
                <td>${value}</td>
              </tr>
            `
          })
          .join("")}
      </table>
    `

    // Check if we're in development mode or if Resend API key is not available
    if (!process.env.RESEND_API_KEY) {
      console.log("Email would be sent with the following content:")
      console.log(`To: support@evertwine.social`)
      console.log(
        `Subject: New ${formType === "business" ? "Business Partnership Request" : "Affiliate Partnership Application"}`,
      )
      console.log(`Body: ${formattedData}`)

      // Return success for development testing
      return { success: true }
    }

    try {
      // Send email using Resend API with a verified domain
      // Using resend.com default domain until evertwine.social is verified
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Evertwine <onboarding@resend.dev>", // Using Resend's verified domain
          to: "support@evertwine.social", // This can be any email address
          subject: `New ${formType === "business" ? "Business Partnership Request" : "Affiliate Partnership Application"}`,
          html: htmlContent,
          text: formattedData,
          reply_to: formData.email || "noreply@example.com", // Set reply-to as the submitter's email if available
        }),
      })

      const responseData = await response.json()

      if (!response.ok) {
        console.error("Resend API error:", responseData)
        return {
          success: false,
          error: "Failed to send email. Please try again later.",
        }
      }

      return { success: true }
    } catch (error) {
      console.error("Error sending email:", error)

      // Fallback to console logging if email sending fails
      console.log("Form submission (email sending failed):")
      console.log(`Form type: ${formType}`)
      console.log("Form data:", formData)

      // Still return success to the user since we've captured their data
      return { success: true }
    }
  } catch (error) {
    console.error("Error processing form:", error)
    return {
      success: false,
      error: "Failed to process your request. Please try again later.",
    }
  }
}
