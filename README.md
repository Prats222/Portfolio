# Portfolio

Live at https://portfolio-prateek.vercel.app/

## Contact Email

The contact form posts to the Vercel serverless function at `/api/contact`. The function validates input, uses a honeypot and basic rate limit, and sends the message through Brevo without exposing credentials to the browser.

Configure these Vercel environment variables:

```text
BREVO_API_KEY=<portfolio-specific Brevo API key>
BREVO_SENDER_EMAIL=<verified Brevo sender>
BREVO_SENDER_NAME=Prateek Mishra Portfolio
CONTACT_RECEIVER_EMAIL=<your inbox>
```
 
