"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

const accessToken = process.env.NEXT_PUBLIC_PAGE_ACCESS_TOKEN;
const pageId = process.env.NEXT_PUBLIC_PAGE_ID;

export default function FacebookReels() {
  const [reels, setReels] = useState([]);
  const [pageInfo, setPageInfo] = useState({ name: "", picture: "" });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const reelsPerPage = 12;

  const fetchAllReels = useCallback(async () => {
    let allReels = [];
    let nextUrl = `https://graph.facebook.com/v21.0/${pageId}/video_reels?fields=id,description,thumbnails,statistics,updated_time&limit=100&access_token=${accessToken}`;

    try {
      const pageRes = await fetch(`https://graph.facebook.com/v21.0/${pageId}?fields=name,picture&access_token=${accessToken}`);
      const pageData = await pageRes.json();
      if (pageData) setPageInfo({ name: pageData.name, picture: pageData.picture?.data?.url });

      while (nextUrl) {
        const res = await fetch(nextUrl);
        const data = await res.json();
        if (data.data) allReels = [...allReels, ...data.data];
        nextUrl = data.paging?.next || null;
      }
      setReels(allReels);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllReels();
  }, [fetchAllReels]);

  const getThumbnail = (thumbnails) => {
    if (!thumbnails?.data) return "https://via.placeholder.com/300x533?text=No+Thumbnail";
    const thumbList = thumbnails.data;
    const middleIndex = Math.floor(thumbList.length / 2);
    return thumbList[middleIndex].uri;
  };

  const indexOfLastReel = currentPage * reelsPerPage;
  const indexOfFirstReel = indexOfLastReel - reelsPerPage;
  const currentReels = reels.slice(indexOfFirstReel, indexOfLastReel);
  const totalPages = Math.ceil(reels.length / reelsPerPage);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="spinner-grow text-primary" role="status"></div>
    </div>
  );

  return (
    <div className="reels-container py-5">
      {/* 100% SEO - Google Video Search Schema */}
      {currentReels.map((reel) => (
        <script
          key={`schema-${reel.id}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              "name": reel.description?.substring(0, 60) || "Facebook Reel Video",
              "description": reel.description || "Watch this amazing reel on our platform.",
              "thumbnailUrl": getThumbnail(reel.thumbnails),
              "uploadDate": reel.updated_time || new Date().toISOString(),
              "contentUrl": `https://www.facebook.com/reels/${reel.id}`,
              "embedUrl": `https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/reels/${reel.id}`,
              "interactionStatistic": {
                "@type": "InteractionCounter",
                "interactionType": { "@type": "LikeAction" },
                "userInteractionCount": reel.statistics?.like_count || 0
              }
            })
          }}
        />
      ))}

      <div className="container">
        <header className="text-center mb-5">
          <h2 className="fw-bold h1">আমাদের ভিডিও গ্যালারি</h2>
          <p className="text-muted">ফেসবুকের সেরা রিলসগুলো দেখুন এক জায়গায়</p>
        </header>

        <div className="row g-3 g-md-4">
          {currentReels.map((reel) => (
            <div key={reel.id} className="col-6 col-md-4 col-lg-3">
              <article className="reel-card shadow-sm h-100">
                {/* থাম্বনেইল অংশ - Image / Next ব্যবহার */}
                <div className="reel-thumb-wrapper">
                  <Image 
                    src={getThumbnail(reel.thumbnails)} 
                    alt={reel.description || "Facebook Reel"}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    className="reel-img"
                    style={{ objectFit: "cover" }}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+ZNPQAIXwM4li87oAAAAABJRU5ErkJggg=="
                  />
                  


                  <div className="stats-badge">
                    <span>❤️ {reel.statistics?.like_count || 0}</span>
                    <span className="ms-2">💬 {reel.statistics?.comment_count || 0}</span>
                  </div>
                </div>

                {/* ইনফো অংশ */}
                <div className="p-3 card-content">
                  <div className="d-flex align-items-center mb-2">
                    <div className="page-avatar">
                      <Image 
                        src={pageInfo.picture} 
                        alt={pageInfo.name} 
                        width={24} 
                        height={24} 
                        className="rounded-circle"
                      />
                    </div>
                    <span className="small fw-bold text-truncate ms-2">{pageInfo.name}</span>
                  </div>
                  
                  <p className="description-text mb-3">
                    {reel.description || "কোনো বর্ণনা নেই"}
                  </p>

                  <a 
                    href={`https://www.facebook.com/reels/${reel.id}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-fb-link"
                  >
                    Facebook-এ দেখুন
                  </a>
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* উন্নত পেজিনেশন */}
        {reels.length > reelsPerPage && (
          <nav className="mt-5 pt-4">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => {setCurrentPage(currentPage - 1); window.scrollTo(0,0);}}>আগেরটি</button>
              </li>
              <li className="page-item active">
                <span className="page-link px-4">{currentPage} / {totalPages}</span>
              </li>
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => {setCurrentPage(currentPage + 1); window.scrollTo(0,0);}}>পরেরটি</button>
              </li>
            </ul>
          </nav>
        )}
      </div>

      <style jsx>{`
        .reels-container { background-color: #f8f9fa; min-height: 100vh; }
        
        .reel-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
          border: 1px solid rgba(0,0,0,0.05);
        }
        .reel-card:hover { transform: translateY(-8px); box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important; }

        .reel-thumb-wrapper {
          position: relative;
          aspect-ratio: 9/16;
          background: #000;
          overflow: hidden;
        }

        .play-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: 0.3s;
        }
        .reel-thumb-wrapper:hover .play-overlay { opacity: 1; }

        .play-icon {
          width: 50px;
          height: 50px;
          background: rgba(255,255,255,0.3);
          backdrop-filter: blur(5px);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid white;
        }

        .stats-badge {
          position: absolute;
          bottom: 10px;
          left: 10px;
          background: rgba(0,0,0,0.6);
          color: white;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 11px;
          backdrop-filter: blur(4px);
        }

        .description-text {
          font-size: 13px;
          color: #4b5563;
          height: 38px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          line-height: 1.5;
        }

        .btn-fb-link {
          display: block;
          text-align: center;
          background: #1877f2;
          color: white;
          text-decoration: none;
          padding: 8px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          transition: 0.3s;
        }
        .btn-fb-link:hover { background: #145dbf; color: white; }

        .pagination .page-link {
          border: none;
          color: #1877f2;
          border-radius: 8px;
          margin: 0 5px;
          font-weight: 600;
        }
        .pagination .active .page-link { background-color: #1877f2; color: white; }

        @media (max-width: 576px) {
          .p-3 { padding: 10px !important; }
          .description-text { font-size: 11px; height: 32px; }
          .btn-fb-link { font-size: 11px; }
        }
      `}</style>
    </div>
  );
}
