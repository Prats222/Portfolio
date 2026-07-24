import React from 'react'
import styled from 'styled-components'
import { useRef } from 'react';
import { Alert, Snackbar } from '@mui/material';

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
position: relative;
z-index: 1;
align-items: center;
@media (max-width: 960px) {
    padding: 0px;
}
`

const Wrapper = styled.div`
position: relative;
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: column;
width: 100%;
max-width: 1350px;
padding: 0px 0px 80px 0px;
gap: 12px;
@media (max-width: 960px) {
    flex-direction: column;
}
`

const Title = styled.div`
font-size: 42px;
text-align: center;
font-weight: 600;
margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
      margin-top: 12px;
      font-size: 32px;
  }
`;

const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 16px;
    }
`;


const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`

const ContactTitle = styled.div`
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`

const ContactButton = styled.button`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  background: -moz-linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  background: -webkit-linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  &:disabled {
    cursor: wait;
    opacity: 0.65;
  }
`



const Contact = () => {

  //hooks
  const [notification, setNotification] = React.useState(null);
  const [sending, setSending] = React.useState(false);
  const form = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setNotification(null);
    const formData = new FormData(form.current);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.get('from_email'),
          name: formData.get('from_name'),
          subject: formData.get('subject'),
          message: formData.get('message'),
          website: formData.get('website'),
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Message could not be sent.');
      form.current.reset();
      setNotification({ severity: 'success', message: result.message });
    } catch (error) {
      setNotification({ severity: 'error', message: error.message || 'Message could not be sent.' });
    } finally {
      setSending(false);
    }
  }



  return (
    <Container>
      <Wrapper>
        <Title>Contact</Title>
        <Desc>Let's connect about software engineering, SDET, test automation, or AI engineering opportunities.</Desc>
        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactTitle>Email Prateek</ContactTitle>
          <ContactInput placeholder="Your Email" name="from_email" type="email" required />
          <ContactInput placeholder="Your Name" name="from_name" minLength="2" maxLength="100" required />
          <ContactInput placeholder="Subject" name="subject" maxLength="140" />
          <ContactInputMessage placeholder="Tell me about the role, project, or opportunity" rows="4" name="message" minLength="10" maxLength="4000" required />
          <input name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-10000px' }} />
          <ContactButton type="submit" disabled={sending}>{sending ? 'Sending...' : 'Send'}</ContactButton>
        </ContactForm>
        <Snackbar
          open={Boolean(notification)}
          autoHideDuration={6000}
          onClose={()=>setNotification(null)}
          style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'translateY(-50%)', 
  }}
        >
          {notification ? <Alert severity={notification.severity} onClose={() => setNotification(null)}>{notification.message}</Alert> : undefined}
        </Snackbar>
      </Wrapper>
    </Container>
  )
}

export default Contact
