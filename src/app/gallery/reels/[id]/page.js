import { Metadata } from 'next';

const accessToken = process.env.NEXT_PUBLIC_PAGE_ACCESS_TOKEN;

// ১. ডাইনামিক মেটাডাটা জেনারেট করা (গুগল সার্চে টাইটেল ও থাম্বনেইল দেখানোর জন্য)
export async function generateMetadata({ params }) {
  const { id } = params;
  
  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${id}?fields=description,thumbnails,updated_time&access_token=${accessToken}`
    );
    const data = await res.json();
    
    const title = data.description ? data.description.substring(0, 60) : "Exclusive Reel Video";
    const description = data.description || "Watch this amazing reel on our gallery.";
    const thumbnail = data.thumbnails?.data?.[0]?.uri || "";

    return {
      title: `${title} | My Gallery`,
      description: description,
      openGraph: {
        title: title,
        description: description,
        url: `https://yourdomain.com/reels/${id}`,
        type: 'video.other',
        images: [{ url: thumbnail }],
      },
      twitter: {
        card: 'player',
        title: title,
        description: description,
        images: [thumbnail],
      }
    };
  } catch (error) {
    return { title: "Video Player" };
  }
}

// ২. ভিডিও ডাটা ফেচিং ফাংশন
async function getVideoData(id) {
  const res = await fetch(
    `https://graph.facebook.com/v21.0/${id}?fields=source,description,thumbnails,created_time&access_token=${accessToken}`,
    { next: { revalidate: 3600 } } // ১ ঘণ্টা পর পর আপডেট হবে
  );
  return res.json();
}

export default async function CustomReelPlayer({ params }) {
  const { id } = params;
  const data = await getVideoData(id);

  if (!data || !data.source) {
    return <div className="text-white text-center p-5">ভিডিও খুঁজে পাওয়া যায়নি</div>;
  }

  // ৩. VideoObject Schema (গুগল ভিডিও সার্চে দেখানোর জন্য সবচেয়ে গুরুত্বপূর্ণ)
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": data.description || "Facebook Reel",
    "description": data.description || "Amazing reel video from our collection",
    "thumbnailUrl": data.thumbnails?.data?.[0]?.uri,
    "uploadDate": data.created_time,
    "contentUrl": data.source,
    "embedUrl": `https://yourdomain.com/reels/${id}`,
  };

  return (
    <div className="video-page-container">
      {/* গুগল স্কিমা স্ক্রিপ্ট */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />

      <style>{`
        .video-page-container { background-color: #000; height: 100vh; width: 100vw; display: flex; justify-content: center; align-items: center; position: relative; overflow: hidden; }
        .back-btn-link { position: absolute; top: 20px; left: 20px; z-index: 50; background: rgba(255, 255, 255, 0.15); border: none; color: #fff; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(8px); text-decoration: none; }
        .reel-frame { height: 100%; width: 100%; max-width: 450px; position: relative; background: #000; display: flex; flex-direction: column; align-items: center; }
        video { width: 100%; height: 80%; object-fit: contain; background: #000; }
        .video-info { padding: 15px; color: white; width: 100%; text-align: left; background: linear-gradient(transparent, rgba(0,0,0,0.8)); }
        h1 { fontSize: 16px; margin: 0; font-weight: 500; }
      `}</style>

      {/* ব্যাক বাটন (সার্ভার কম্পোনেন্টে router.back এর বদলে লিচ ব্যবহার করা ভালো) */}
      <a href="/gallery" className="back-btn-link">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </a>

      <div className="reel-frame shadow-lg">
        <video 
          src={data.source} 
          controls 
          autoPlay 
          loop 
          playsInline
          poster={data.thumbnails?.data?.[0]?.uri}
        />
        
        {/* ৪. ভিডিওর নিচে ডেসক্রিপশন রাখা যা গুগল ইনডেক্স করবে */}
        <div className="video-info">
          <h1>{data.description || "Video Reel"}</h1>
          <p style={{ fontSize: '12px', opacity: 0.7 }}>
            Published on: {new Date(data.created_time).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
