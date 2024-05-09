import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  message: string;
  email: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName, message, email
}) => (
  <div>
    <h1>Name: {firstName}</h1>
    <h1>Email: {email}</h1>
    <p>{message}</p>
  </div>
);
