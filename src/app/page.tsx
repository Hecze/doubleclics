import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "DoubleClics",
  description: "Software Automation, Web Development | DoubleClics Homepage",
  // other metadata
};


export default function RootPage() {
  redirect('/en');
}