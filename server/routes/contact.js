import express from 'express'
import nodemailer from 'nodemailer'
import Contact from '../models/Contact.js'

const router = express.Router()

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body || {}

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Please fill in all fields.' })
    }
    if (!validEmail(email)) return res.status(400).json({ message: 'Please enter a valid email address.' })
    if (name.trim().length < 2 || subject.trim().length < 3 || message.trim().length < 10) {
      return res.status(400).json({ message: 'Please provide a little more detail in your message.' })
    }

    const saved = await Contact.create({ name, email, subject, message })

    if (!process.env.MAIL_USER || !process.env.MAIL_PASS || !process.env.CONTACT_TO) {
      return res.status(500).json({ message: 'The message was saved, but email delivery is not configured yet.' })
    }

    const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
})

    await transporter.sendMail({
      from: `Portfolio Contact <${process.env.MAIL_USER}>`,
      to: process.env.CONTACT_TO,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `New portfolio contact\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#202020">
          <h2>New Portfolio Contact</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
          <hr />
          <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
        </div>
      `,
    })

    return res.status(201).json({ message: 'Message sent successfully.', id: saved._id })
  } catch (error) {
    console.error('Contact error:', error)
    return res.status(500).json({ message: 'Unable to send the message right now. Please try again later.' })
  }
})

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export default router
