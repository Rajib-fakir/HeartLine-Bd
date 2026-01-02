import Image from "next/image";
import styles from "./page.module.css";
import Canvas from "../components/Canvas.js"
import FacebookHero from "@/components/FacebookHero"
import IntroSection from "@/components/IntroSection"
import LatestPosts from "@/components/LatestPosts"
import StatsSection from "@/components/StatsSection"
import CTASection from "@/components/CTASection"

const domain = process.env.NEXT_DOMAIN_URL;

export const metadata = {
  title: "HeartLine BD",
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





async function getFacebookData() {
  const PAGE_ID = process.env.NEXT_PUBLIC_PAGE_ID;
  const PAGE_TOKEN = process.env.NEXT_PUBLIC_PAGE_ACCESS_TOKEN;

  const res = await fetch(
    `https://graph.facebook.com/${PAGE_ID}?fields=name,cover,followers_count,fan_count,picture.type(large)&access_token=${PAGE_TOKEN}`,
    { next: { revalidate: 3600 } } // প্রতি ১ ঘণ্টায় ডাটা আপডেট হবে (SEO & Performance)
  );

  if (!res.ok) return null;
  return res.json();
}




async function getFacebookPosts() {
  const PAGE_ID = process.env.NEXT_PUBLIC_PAGE_ID;
  const PAGE_TOKEN = process.env.NEXT_PUBLIC_PAGE_ACCESS_TOKEN;

  try {
    const url = `https://graph.facebook.com/v20.0/${PAGE_ID}/posts?fields=id,message,created_time,full_picture,picture,likes.summary(true),comments.summary(true),permalink_url&access_token=${PAGE_TOKEN}&limit=6`;

    const res = await fetch(url, { next: { revalidate: 3600 } }); // ১ ঘণ্টা পর পর ডাটা আপডেট হবে
    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}






export default async function Home() {
  const data = await getFacebookData();
  const postsData = await getFacebookPosts();

  return (
    <main>
 <FacebookHero fbData={data} />
      {/* অন্যান্য সেকশন */}
      <IntroSection />
<LatestPosts posts={postsData} />
{/*<StatsSection />*/}
<CTASection />
    </main>
  );
}







