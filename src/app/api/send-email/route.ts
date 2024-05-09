import { EmailTemplate } from '@/components/Contact/email-template';
import { Resend } from 'resend';
import * as React from 'react';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);


export async function POST(  req: Request, res: Response ) {

  try {

    //const body = await req.json(); 

    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['hectorzerrillo85@gmail.com'],
      subject:  'New message from contact form',
      react: EmailTemplate({ firstName: "John", message: "xds", email: "pepito@sds.com" }) as React.ReactElement,
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