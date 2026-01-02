import Link from "next/link";

const PAGE_ID = process.env.NEXT_PUBLIC_PAGE_ID;
const PAGE_TOKEN = process.env.NEXT_PUBLIC_PAGE_ACCESS_TOKEN;
const POSTS_PER_PAGE = 10;

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const page = parseInt(params.page) || 1;
  return {
    title: `Daily Status - Page ${page} | HeartLine BD`,
    description: "HeartLine BD এর সব আবেগপূর্ণ উক্তি এবং স্ট্যাটাসগুলো পড়ুন খুব দ্রুত।",
  };
}

async function getStatusPosts(cursor = "") {
  const afterParam = cursor ? `&after=${cursor}` : "";
  const url = `https://graph.facebook.com/v20.0/${PAGE_ID}/posts?fields=message,created_time,permalink_url,likes.summary(true),comments.summary(true)&limit=${POSTS_PER_PAGE}${afterParam}&access_token=${PAGE_TOKEN}`;
  
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const data = await res.json();
    
    if (!data.data) return { posts: [], nextCursor: null };

    const textPosts = data.data.filter((post) => post.message);
    
    return {
      posts: textPosts,
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
    <main className="status-container py-5">
      <style>{`
        .status-container { background-color: #f0f2f5; min-height: 100vh; font-family: 'Segoe UI', Roboto, sans-serif; }
        .header-section { margin-bottom: 40px; }
        .status-card { border: none; border-radius: 15px; transition: transform 0.2s; background: #fff; }
        .status-card:hover { transform: translateY(-5px); }
        .message-text { font-size: 1.15rem; line-height: 1.6; color: #1c1e21; white-space: pre-line; }
        
        /* লোড মোর বাটন স্টাইল */
        .load-more-btn {
          display: inline-flex;
          align-items: center;
          background: linear-gradient(45deg, #1877f2, #0056b3);
          color: white;
          padding: 12px 35px;
          border-radius: 30px;
          text-decoration: none;
          font-weight: bold;
          transition: 0.3s;
          box-shadow: 0 4px 15px rgba(24, 119, 242, 0.3);
        }
        .load-more-btn:hover {
          background: linear-gradient(45deg, #0056b3, #004494);
          transform: scale(1.05);
          color: white;
        }
        .back-home {
          color: #65676b;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
        }
      `}</style>

      <div className="container">
        <header className="text-center header-section">
          <h1 className="display-6 fw-bold text-dark">HeartLine BD Status</h1>
          <p className="text-muted">প্রতিদিনের নতুন ভাবনা এবং অনুপ্রেরণা</p>
        </header>

        <section className="row g-4 justify-content-center">
          {posts.map((post) => (
            <div key={post.id} className="col-lg-8">
              <article className="card status-card shadow-sm p-4">
                <div className="message-text mb-4">{post.message}</div>
                <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                  <div className="text-muted small">
                    <i className="bi bi-calendar3"></i> {new Date(post.created_time).toLocaleDateString('bn-BD')}
                  </div>
                  <div className="d-flex gap-3 text-muted">
                    <span>👍 {post.likes?.summary?.total_count || 0}</span>
                    <span>💬 {post.comments?.summary?.total_count || 0}</span>
                  </div>
                  <a href={post.permalink_url} target="_blank" className="btn btn-light btn-sm rounded-pill px-3">
                    Facebook-এ দেখুন
                  </a>
                </div>
              </article>
            </div>
          ))}
        </section>

        {/* নেভিগেশন সেকশন */}
        <div className="text-center mt-5 d-flex flex-column align-items-center gap-3">
          {nextCursor ? (
            <Link 
              href={`?page=${pageNum + 1}&cursor=${nextCursor}`}
              className="load-more-btn"
            >
              আরও স্ট্যাটাস দেখুন 
              <svg className="ms-2" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 3a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 3zm4 8a4 4 0 0 1-8 0V5a4 4 0 1 1 8 0v6zM8 0a5 5 0 0 0-5 5v6a5 5 0 0 0 10 0V5a5 5 0 0 0-5-5z"/>
              </svg>
            </Link>
          ) : (
            <p className="text-muted">সব পোস্ট দেখা শেষ!</p>
          )}

          {pageNum > 1 && (
            <Link href="/status" className="back-home mt-2">
              ← প্রথম পেজে ফিরে যান
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
