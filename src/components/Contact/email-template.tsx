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
    <h4>I am {firstName}!</h4>
    <h6>my email is: {email}</h6>
    <p>{message}</p>
  </div>
);
