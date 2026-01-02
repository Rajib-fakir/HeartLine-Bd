// app/about/page.js
import About from "@/components/About.js";

const domain = process.env.NEXT_DOMAIN_URL;

export const metadata = {
  title: "HeartLine BD সম্পর্কে জানুন ",
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



async function getAboutData() {
  const PAGE_ID = process.env.NEXT_PUBLIC_PAGE_ID;
  const PAGE_TOKEN = process.env.NEXT_PUBLIC_PAGE_ACCESS_TOKEN;

  try {
    // Page Data এবং Posts Data একসাথে ফেচ করা
    const [pageRes, postRes] = await Promise.all([
      fetch(`https://graph.facebook.com/v20.0/${PAGE_ID}?fields=name,about,fan_count,cover,picture&access_token=${PAGE_TOKEN}`, { next: { revalidate: 3600 } }),
      fetch(`https://graph.facebook.com/v20.0/${PAGE_ID}/posts?fields=id,message,full_picture,created_time,likes.summary(true),comments.summary(true)&limit=6&access_token=${PAGE_TOKEN}`, { next: { revalidate: 3600 } })
    ]);

    const pageData = await pageRes.json();
    const postData = await postRes.json();

    return {
      page: pageData,
      posts: postData.data || []
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}




export default async function AboutPage() {
  const data = await getAboutData();
  
  if (!data) return <div>Data loading failed...</div>;

  return <About page={data.page} posts={data.posts} />;
}