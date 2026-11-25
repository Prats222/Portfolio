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

Set the variables on the Vercel production environment and redeploy. Use a sender verified in Brevo and set the receiver to the inbox you monitor. The visitor's email is used as Reply-To. The site also provides a direct Gmail address and opens a prefilled email draft when the form cannot confirm a send.

For a failed send, check the Vercel function logs for missing configuration, the upstream status code, or a time-out. Credentials and visitor message text are not logged. A successful request includes a Brevo message ID; confirm actual inbox delivery with a test after deployment.
 
