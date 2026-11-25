# Portfolio

Live at https://portfolio-prateek.vercel.app/

## Contact

The contact form submits to the Vercel function at /api/contact. The function validates input, checks a honeypot, applies a per-instance rate limit, and forwards accepted requests to Formspree. Configure the inbox in the Formspree dashboard.

The public form ID is set in api/contact.js. To use a separate form for a deployment, set FORMSPREE_FORM_ID to the ID from https://formspree.io/f/<id>, then redeploy.

When a send fails, visitors can keep their message and open a prefilled email draft. For delivery issues, check the Vercel function status, the Formspree submissions dashboard, and the recipient inbox.
