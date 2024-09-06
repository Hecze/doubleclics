import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import './globals.css';
import { Providers } from './providers';
import ChatBot from '@/components/Chatbot';

export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
 
  return (
    <html lang={locale}>
      <body>
        <Providers>
        <NextIntlClientProvider messages={messages}>
        <Header locale={locale} />
          {children}
          <ChatBot />
          <Footer />
        </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}