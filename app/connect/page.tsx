import type { Metadata } from "next";
import { CitizenConnect } from "../components/CitizenConnect";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Contact Us | Connect with Makarand Narwekar',
  description: 'Get in touch with Makarand Narwekar\'s office. Office locations, timings, contact numbers, and online form to submit your queries, suggestions, or requests for assistance.',
  keywords: ['Contact', 'Office Location', 'Phone Number', 'Contact Form', 'Office Timings', 'Citizen Services'],
  openGraph: {
    title: 'Contact Us | Makarand Narwekar',
    description: 'Get in touch with our office for assistance and queries.',
    url: 'https://makarandnarwekar.com/connect',
  },
  alternates: {
    canonical: 'https://makarandnarwekar.com/connect',
  },
};

export default function ConnectPage() {
  return <CitizenConnect />;
}
