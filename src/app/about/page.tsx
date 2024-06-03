"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About | DoubleClics",
  description: "Software Automation, Web Development | DoubleClics",
  // other metadata
};


export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Solo se ejecuta en el navegador
    const locale = localStorage.getItem('locale');
    if (locale) {
      router.push('/' + locale + '/about');
    }
    else {
      router.push('/en/about');
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>About</title>
      </head>
      <body>

        <Loading />
      </body>
    </html>
  )
}
