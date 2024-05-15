"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Solo se ejecuta en el navegador
    const locale = localStorage.getItem('locale');
    if (locale) {
      router.push('/' + locale + '/contact');
    }
    else {
      router.push('/en/contact');
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Contact</title>
      </head>
      <body>

        <Loading />
      </body>
    </html>
  )
}
