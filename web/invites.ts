import { createTransport } from "nodemailer"
import { getSettings } from "./database/settings"

export async function sendInvite(email: string, key: string) {
  const settings = getSettings()
  const {
    libraryName,
    webUrl,
    smtpFrom,
    smtpHost,
    smtpPassword,
    smtpPort,
    smtpUsername,
    smtpSsl,
    smtpRejectUnauthorized,
  } = settings

  const message = {
    from: smtpFrom,
    to: email,
    subject: `Invited to the "${libraryName}" Storyteller library`,
    text: `
Hello!

You've been invited to the "${libraryName}" Storyteller library.

You can accept your invite by following this link:

${webUrl}/invites/${key}
`,
  }

  if (!smtpHost) {
    console.log("No SMTP client configured. Printing message to log:")
    console.log(JSON.stringify(message, null, 2))
  }

  const transporter = createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSsl ?? true,
    tls: {
      rejectUnauthorized: smtpRejectUnauthorized ?? true,
    },
    auth: {
      user: smtpUsername,
      pass: smtpPassword,
    },
  })

  await transporter.sendMail(message)
}
