"use client";
import Image from "next/image";

export default function AboutClient({ page, posts }) {
  return (
    <main>
      {/* ================= HERO SECTION ================= */}
      <section className="position-relative text-center text-white">
        {page.cover?.source && (
          <div style={{ position: "relative", width: "100%", height: "420px" }}>
            <Image
              src={page.cover.source}
              alt={`${page.name} Cover`}
              fill
              priority
              style={{
                objectFit: "container",
                filter: "brightness(50%)",
              }}
            />
          </div>
        )}

        <div className="position-absolute top-50 start-50 translate-middle w-100" >
          <Image
            src={page.picture.data.url}
            width={150}
            height={150}
            className="rounded-circle border border-4 border-white  mx-auto"
            alt={`${page.name} Profile`}
            style={{
                objectFit: "cover",
                filter: "brightness(100%)",
              }}
          />
          <h1 className="mt-4 fw-bold">{page.name}</h1>
          <p className="opacity-75">
            Sad • Motivational • Islamic Thoughts
          </p>
        </div>
        
        
        
      </section>

      {/* ================= STATS ================= */}
      <section className="container py-5 text-center">
        <div className="row g-4">
          <div className="col">
            <h2 className="fw-bold">{page.fan_count?.toLocaleString()}+</h2>
            <p className="text-muted">Followers</p>
          </div>
          <div className="col">
            <h2 className="fw-bold">Daily</h2>
            <p className="text-muted">Content</p>
          </div>
          <div className="col">
            <h2 className="fw-bold">100%</h2>
            <p className="text-muted">Original</p>
          </div>
        </div>
      </section>

      {/* ================= ABOUT STORY ================= */}
      <section className="container py-5">
        <h2 className="text-center fw-bold mb-4">আমাদের গল্প</h2>
        <article className="lead text-center text-muted mx-auto" style={{ maxWidth: "800px" }}>
          {page.about ||
            "এই পেজটি তৈরি হয়েছে তাদের জন্য — যারা জীবনের কোনো এক সময় ভেঙে পড়েছে। আমরা বিশ্বাস করি, একটি বাক্যও কারো জীবনে আলো হতে পারে।"}
        </article>
      </section>

      {/* ================= CONTENT TYPES ================= */}
      <section className="container py-5">
        <h2 className="text-center fw-bold mb-4">আমরা যা শেয়ার করি</h2>
        <div className="row g-4 text-center">
          {[
            { icon: "😢", title: "Sad Quotes" },
            { icon: "💡", title: "Motivational" },
            { icon: "🕌", title: "Islamic Reminders" },
            { icon: "❤️", title: "Life Reality" },
          ].map((item, i) => (
            <div key={i} className="col-6 col-md-3">
              <div className="p-4 rounded shadow-sm h-100 bg-white">
                <div style={{ fontSize: 34 }} aria-hidden="true">{item.icon}</div>
                <h3 className="mt-3 fw-semibold h6">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= RECENT POSTS ================= */}
      <section className="container py-5">
        <h2 className="text-center fw-bold mb-4">সাম্প্রতিক পোস্ট</h2>
        <div className="row g-4">
          {posts.map((post) => (
            <article key={post.id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm border-0">
                {post.full_picture && (
                  <div style={{ position: "relative", height: "240px", width: "100%" }}>
                    <Image
                      src={post.full_picture}
                      alt={post.message ? post.message.substring(0, 60) : "Post Image"}
                      fill
                      style={{ objectFit: "cover" }}
                      className="card-img-top"
                    />
                  </div>
                )}
                <div className="card-body d-flex flex-column">
                  <div className="d-flex align-items-center mb-3">
                    <Image
                      src={page.picture.data.url}
                      width={40}
                      height={40}
                      className="rounded-circle me-2"
                      alt="Profile"
                    />
                    <strong>{page.name}</strong>
                  </div>
                  <p className="flex-grow-1 text-muted">
                    {post.message ? post.message.slice(0, 120) + "..." : "No text content"}
                  </p>
                  <div className="d-flex justify-content-between text-muted mb-3 small">
                    <span>👍 {post.likes?.summary?.total_count || 0} Likes</span>
                    <span>💬 {post.comments?.summary?.total_count || 0} Comments</span>
                  </div>
                  <a
                    href={`https://www.facebook.com/${post.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary mt-auto"
                  >
                    View on Facebook
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================= AUDIENCE & MISSION (DESIGN KEPT AS IS) ================= */}
      <section className="container py-5">
        <h2 className="text-center fw-bold mb-4">এই পেজটি কাদের জন্য</h2>
        <div className="row g-4 text-center">
          {[
            "যারা নীরবে কষ্ট সহ্য করেন",
            "যারা জীবনে অনুপ্রেরণা খোঁজেন",
            "যারা ইসলামী মূল্যবোধ ভালোবাসেন",
            "যারা ইতিবাচক চিন্তায় বিশ্বাসী",
          ].map((text, i) => (
            <div key={i} className="col-md-3 col-6">
              <div className="p-3 rounded shadow-sm h-100 bg-white">
                <p className="mb-0 fw-semibold small">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= MISSION ================= */}
      <section className="container py-5">
        <h2 className="text-center fw-bold mb-4">আমাদের উদ্দেশ্য</h2>
        <p className="lead text-center text-muted mx-auto" style={{ maxWidth: "800px" }}>
          আমাদের লক্ষ্য হলো— বাস্তব জীবনের কিছু কথা তুলে ধরা, হতাশাকে আশায় রূপ দেওয়া এবং ইসলামী শিক্ষার আলো ছড়িয়ে দেওয়া।
        </p>
      </section>

      {/* ================= CTA ================= */}
      <section className="text-center py-5 bg-dark text-white mt-4">
        <h2 className="fw-bold mb-3">প্রতিদিন নতুন অনুপ্রেরণা পেতে</h2>
        <a
          href={`https://facebook.com/${process.env.NEXT_PUBLIC_PAGE_ID}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-lg rounded-pill px-5"
        >
          Follow on Facebook
        </a>
      </section>
    </main>
  );
}
