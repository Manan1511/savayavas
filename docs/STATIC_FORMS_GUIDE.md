# Complete Guide: Implementing StaticForms (staticforms.dev)

A practical, step-by-step developer guide for integrating [StaticForms](https://staticforms.dev) into any static or single-page web application (React, Next.js, Vue, Astro, or plain HTML).

---

## 1. How StaticForms Works

StaticForms provides a serverless REST endpoint that receives form submissions from client-side websites and forwards them directly to your email address.

* **Submit Endpoint**: `https://api.staticforms.dev/submit`
* **HTTP Method**: `POST`
* **Content Types Supported**: `application/json` (recommended for JS/React) or `application/x-www-form-urlencoded` / `multipart/form-data` (HTML forms).

---

## 2. Setting Up Your Account & Access Key

1. **Sign Up**: Go to [staticforms.dev](https://staticforms.dev) and register an account.
2. **Create a Form**:
   - In the dashboard, click **Forms** &rarr; **New Form**.
   - Give it a recognizable name (e.g., `Client Portfolio Contact`).
3. **Copy Your Key**:
   - Copy the generated key (looks like `sf_5aa8b890fa7809231009a207` or a UUID).
   - This key is an identifier that routes submissions to your account.
4. **Configure Email Notifications**:
   - In the dashboard, open your form's settings.
   - Ensure **Email Notifications** is turned **ON** and set to the email address you want to receive inquiries at.

---

## 3. Payload Parameters Reference

| Field | Type | Description |
|---|---|---|
| `apiKey` / `accessKey` | `string` (**Required**) | Your StaticForms key. Pass both keys to support modern and legacy versions. |
| `name` | `string` | The visitor's full name. |
| `email` | `string` (**Required**) | The visitor's email address. |
| `phone` | `string` *(Optional)* | The visitor's phone number. |
| `subject` | `string` *(Optional)* | The subject line of the notification email you receive. |
| `replyTo` | `string` *(Optional)* | Set to `"@"` so clicking "Reply" in your email client replies directly to the visitor's email. |
| `honeypot` | `string` *(Optional)* | Anti-spam honeypot field. Leave empty (`""`); bots that fill it are automatically blocked. |
| `message` | `string` (**Required**) | The main message content. You can format custom form fields into this string. |

---

## 4. Implementation Methods

### Option A: Modern React / TypeScript (Recommended)

This is the robust, typed pattern using `fetch` with JSON.

#### 1. Environment Variable Configuration
Store your key in an environment file and ignore it from Git.

```bash
# .env.example
VITE_STATIC_FORMS_KEY=
```

```bash
# .env.local (git-ignored)
VITE_STATIC_FORMS_KEY=sf_your_key_here
```

#### 2. Submission Adapter (`submitLead.ts`)

```typescript
interface SubmissionData {
  name: string
  email: string
  phone?: string
  company?: string
  message?: string
  customField?: string
}

interface StaticFormsResponse {
  success: boolean
  message?: string
  id?: string
}

export async function submitContactForm(data: SubmissionData) {
  const apiKey = import.meta.env.VITE_STATIC_FORMS_KEY?.trim()

  if (!apiKey) {
    console.warn('StaticForms key missing. Logged submission:', data)
    return { status: 'unconfigured' }
  }

  // Format multi-field metadata cleanly into the email body
  const messageBody = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    data.company ? `Company: ${data.company}` : null,
    data.customField ? `Custom Field: ${data.customField}` : null,
    '\n--- Message ---',
    data.message || '(No message provided)',
  ]
    .filter(Boolean)
    .join('\n')

  const payload = {
    apiKey,
    accessKey: apiKey, // Dual inclusion for full API compatibility
    name: data.name,
    email: data.email,
    phone: data.phone || '',
    subject: `[New Inquiry] ${data.name}`,
    replyTo: '@',      // Makes "Reply" hit the sender's email
    honeypot: '',      // Anti-spam field
    message: messageBody,
  }

  try {
    const response = await fetch('https://api.staticforms.dev/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const result: StaticFormsResponse = await response.json()

    if (response.ok && result.success) {
      return { status: 'success', id: result.id }
    }

    return { status: 'error', reason: result.message || 'Submission failed' }
  } catch (err) {
    return { status: 'error', reason: 'Network error occurred' }
  }
}
```

#### 3. React Form Component

```tsx
import { useState } from 'react'
import { submitContactForm } from './submitLead'

export function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    const res = await submitContactForm(formData)
    if (res.status === 'success') {
      setStatus('success')
    } else {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return <p>Thank you! Your message has been sent.</p>
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your Name"
        required
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Your Email"
        required
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <textarea
        placeholder="Your Message"
        required
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
      />
      <button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending...' : 'Submit'}
      </button>
      {status === 'error' && <p style={{ color: 'red' }}>Failed to send message. Please try again.</p>}
    </form>
  )
}
```

---

### Option B: Plain HTML Form (Zero JavaScript)

If you have a plain HTML page with no client-side JavaScript:

```html
<form action="https://api.staticforms.dev/submit" method="POST">
  <!-- Required: Your Key -->
  <input type="hidden" name="apiKey" value="sf_your_key_here" />
  <input type="hidden" name="accessKey" value="sf_your_key_here" />

  <!-- Set Dynamic Reply-To -->
  <input type="hidden" name="replyTo" value="@" />

  <!-- Custom Subject -->
  <input type="hidden" name="subject" value="New Contact Form Submission" />

  <!-- Anti-Bot Honeypot (Hidden from users) -->
  <input type="text" name="honeypot" style="display: none;" />

  <!-- Optional Redirect after submission -->
  <input type="hidden" name="redirectTo" value="https://yourwebsite.com/thank-you" />

  <!-- Inputs -->
  <input type="text" name="name" placeholder="Full Name" required />
  <input type="email" name="email" placeholder="Email Address" required />
  <textarea name="message" placeholder="Your Message" required></textarea>

  <button type="submit">Send Message</button>
</form>
```

---

## 5. Critical Gotchas & Troubleshooting

### 1. "I tested the form, but no email arrived in my inbox!"
* **The `test@example.com` trap**:
  StaticForms runs spam analysis on all submissions. If you test with dummy emails like `test@example.com`, `admin@test.com`, or placeholder text, StaticForms flags it as spam and marks delivery as **`Filtered`**.
* When filtered as spam, the submission appears only in your dashboard's **Spam** tab and **is NOT forwarded to your email** to protect your inbox.
* **Fix**: Always test with a genuine, valid email address.

### 2. Check Spam / Junk Folder First Time
* The first notification from StaticForms might land in your Gmail **Spam** or **Updates** tab.
* Open the email and click **"Report not spam"** so future submissions land directly in Primary.

### 3. Securing Your Key (Domain Allowlisting)
* The `apiKey` / `accessKey` will be visible in client-side network traffic. This is normal for static forms.
* To prevent unauthorized third parties from using your key:
  1. Open your form in the [staticforms.dev](https://staticforms.dev) dashboard.
  2. Go to **Settings** &rarr; **Allowed Domains**.
  3. Add your production domain (e.g. `yourdomain.com`). Submissions from unauthorized domains will be rejected.
