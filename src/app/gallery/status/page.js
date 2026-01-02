import Link from "next/link";

const PAGE_ID = process.env.NEXT_PUBLIC_PAGE_ID;
const PAGE_TOKEN = process.env.NEXT_PUBLIC_PAGE_ACCESS_TOKEN;
const POSTS_PER_PAGE = 20; // ইউজার দেখবে ১০টি
const API_LIMIT = 60; // ফিল্টারিংয়ের জন্য এপিআই থেকে বেশি ডাটা আনা হচ্ছে
const DOMAIN = process.env.NEXT_DOMAIN_URL || "https://yourdomain.com";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const page = parseInt(params.page) || 1;
  const cursor = params.cursor || "";

  return {
    title: `Daily Status & Quotes - Page ${page} | HeartLine BD`,
    description: "HeartLine BD এর সব সেরা টেক্সট স্ট্যাটাস এবং উক্তিগুলো পড়ুন। প্রতিদিনের নতুন আপডেট পেতে আমাদের সাথেই থাকুন।",
    alternates: {
      canonical: `${DOMAIN}/status${page > 1 ? `?page=${page}&cursor=${cursor}` : ""}`,
    },
  };
}

// ২. ডাটা ফেচিং ও নিখুঁত ফিল্টারিং (ফটো ও ভিডিও বাদ দেওয়া হয়েছে)
async function getStatusPosts(cursor = "") {
  const afterParam = cursor ? `&after=${cursor}` : "";
  // attachments ফিল্ড যোগ করা হয়েছে মিডিয়া চেক করার জন্য
  const url = `https://graph.facebook.com/v20.0/${PAGE_ID}/posts?fields=message,attachments,created_time,permalink_url,likes.summary(true),comments.summary(true)&limit=${API_LIMIT}${afterParam}&access_token=${PAGE_TOKEN}`;
  
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const data = await res.json();
    
    if (!data || !data.data) return { posts: [], nextCursor: null };

    // ফটো, ভিডিও এবং লিংক পোস্ট বাদ দিয়ে শুধু পিওর টেক্সট ফিল্টার
    const pureTextPosts = data.data.filter((post) => {
      const hasMessage = post.message && post.message.trim().length > 0;
      const hasMedia = post.attachments && post.attachments.data && post.attachments.data.length > 0;
      return hasMessage && !hasMedia;
    }).slice(0, POSTS_PER_PAGE); // ফিল্টার করা ডাটা থেকে ১০টি নেওয়া হচ্ছে
    
    return {
      posts: pureTextPosts,
      nextCursor: data.paging?.cursors?.after || null,
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return { posts: [], nextCursor: null };
  }
}

export default async function StatusPage({ searchParams }) {
  const params = await searchParams;
  const cursor = params.cursor || "";
  const pageNum = parseInt(params.page) || 1;

  const { posts, nextCursor } = await getStatusPosts(cursor);

  return (
    <main className="status-container py-4 py-md-5">
      <style>{`
        .status-container { background-color: #f0f2f5; min-height: 100vh; font-family: 'Inter', sans-serif; }
        .status-card { border: none; border-radius: 16px; background: #fff; box-shadow: 0 4px 15px rgba(0,0,0,0.05); overflow: hidden; }
        .message-text { 
          font-size: 1.1rem; 
          line-height: 1.7; 
          color: #1c1e21; 
          white-space: pre-line; 
          word-wrap: break-word;
        }
        @media (min-width: 768px) {
          .message-text { font-size: 1.3rem; }
        }
        .view-fb-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #e7f3ff;
          color: #1877f2;
          padding: 10px 20px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          transition: 0.2s;
          border: none;
          width: 100%;
        }
        .post-card{
          margin-bottom:40px;
          
        }
        .post-status{
          height:180px;
          overflow:scroll;
        }
        .view-fb-btn:hover { background: #dbeafe; color: #166fe5; }
        .load-more-btn {
          background: #1877f2;
          color: white;
          padding: 14px 40px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(24, 119, 242, 0.3);
          transition: 0.3s;
        }
        .load-more-btn:hover { background: #166fe5; color: white; transform: translateY(-2px); }
        .stat-badge { font-size: 0.85rem; color: #65676b; background: #f2f3f5; padding: 4px 12px; border-radius: 20px; }
      `}</style>

      <div className="container">
        <header className="text-center mb-5">
          <h1 className="fw-bold text-dark display-6">Pure Text Status</h1>
          <p className="text-muted">HeartLine BD এর সেরা সব স্ট্যাটাস কালেকশন</p>
        </header>

        <section className="row g-5">
          {posts.map((post) => {
            const schemaData = {
              "@context": "https://schema.org",
              "@type": "SocialMediaPosting",
              "headline": post.message.substring(0, 100),
              "articleBody": post.message,
              "datePublished": post.created_time,
              "author": { "@type": "Organization", "name": "HeartLine BD" }
            };

            return (

              

              <div key={post.id} className="col-lg-4 col-md-6 post-card mb-5 mt-5">
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
                <article className="card status-card p-4 ">
                  <div className="message-text mb-4  post-status">{post.message}</div>
                  
                  <div className="pt-3 border-top">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="text-muted small fw-medium">
                        📅 {new Date(post.created_time).toLocaleDateString('bn-BD')}
                      </span>
                      <div className="d-flex gap-2">
                        <span className="stat-badge">👍 {post.likes?.summary?.total_count || 0}</span>
                        <span className="stat-badge">💬 {post.comments?.summary?.total_count || 0}</span>
                      </div>
                    </div>
                    
                    {/* View on Facebook বাটন */}
                    <a 
                      href={post.permalink_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="view-fb-btn"
                    >
                      <svg className="me-2" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                      </svg>
                      View on Facebook
                    </a>
                  </div>
                </article>
              </div>
            );
          })}
        </section>

        <div className="text-center mt-5 d-flex flex-column align-items-center gap-4">
          {nextCursor ? (
            <Link href={`?page=${pageNum + 1}&cursor=${nextCursor}`} className="load-more-btn">
              আরও স্ট্যাটাস দেখুন
            </Link>
          ) : (
            <p className="text-muted fw-bold">সব স্ট্যাটাস দেখা শেষ!</p>
          )}

          {pageNum > 1 && (
            <Link href="/status" className="text-primary text-decoration-none small fw-bold">
              ← শুরুতে ফিরে যান
            </Link>              
          )}
        </div>
      </div>
    </main>
  );
}
