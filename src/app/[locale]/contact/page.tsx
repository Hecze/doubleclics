import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Page | DoubleClics",
  description: "Software Automation, Web Development | DoubleClics",
  // other metadata
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact Page"
      />

      <Contact />
    </>
  );
};

export default ContactPage;
