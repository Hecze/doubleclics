
import { EmailTemplate } from '@/components/Contact/email-template';
import { Resend } from 'resend';
import * as React from 'react';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

const GET = async (request: any) => {
  return new Response(JSON.stringify({ message: 'GET method is not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' },
  });
}


const POST = async (request: any) => {



  try {

    const body = await request.json();
    console.log(body)


    const { data, error } = await resend.emails.send({
      from: 'DoubleClics.com <onboarding@resend.dev>',
      to: ['hectorzerrillo85@gmail.com'],
      subject: 'New message from contact form',
      react: EmailTemplate({ firstName: body.name, message: body.message, email: body.email }) as React.ReactElement,
    });


    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });


  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });

  }
  
}

const PUT = async (request: any) => {
  return new Response(JSON.stringify({ message: 'PUT method is not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' },
  });
}

const DELETE = async (request: any) => {
  return new Response(JSON.stringify({ message: 'DELETE method is not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' },
  });
}

const PATCH = async (request: any) => {
  return new Response(JSON.stringify({ message: 'PATCH method is not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' },
  });
}

export { GET, POST, PUT, DELETE, PATCH}