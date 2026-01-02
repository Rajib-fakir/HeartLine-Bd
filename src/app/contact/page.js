// app/contact/page.js

import ContactClient from "@/components/Contact.js";
const domain = process.env.NEXT_DOMAIN_URL;

export const metadata = {
  title: "HeartLine BD-যোগাযোগ করুন ",
  description: "আমি নিয়মিত মোটিভেশনাল, ইসলামিক এবং জীবনমুখী অনুপ্রেরণামূলক কন্টেন্ট শেয়ার করি। ইতিবাচক চিন্তা ও সুন্দর জীবনের জন্য আমাদের সাথে থাকুন।",
  keywords: ["Islamic content", "Motivational status", "Bangla Motivation", "Islamic Education"],
  openGraph: {
    title: "HeartLine BD অফিশিয়াল ওয়েবসাইট",
    description: "অনুপ্রেরণামূলক ভিডিও, পোস্ট এবং ইসলামী শিক্ষা পেতে ভিজিট করুন।",
    url: domain,
    siteName: "HeartLine BD",
    images: [
      {
        url: `${domain}/images/favicon.ico`, // শেয়ার করলে যে ছবি দেখাবে
        width: 1200,
        height: 630,
      },
    ],
    locale: "bn_BD",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};



export default function Page() {
  return <ContactClient />;
}
