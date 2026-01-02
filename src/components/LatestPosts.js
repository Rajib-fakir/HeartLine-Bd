"use client";

import Image from "next/image";

export default function LatestPosts({ posts }) {
  // যদি কোনো পোস্ট না থাকে
  if (!posts || posts.length === 0) return null;

  return (
    <section
      className="py-5"
      style={{
        background: "linear-gradient(135deg,#EEF2FF,#FFFFFF)",
      }}
      aria-labelledby="latest-posts-heading"
    >
      <div className="container">
        {/* Section Title */}
        <h2
          id="latest-posts-heading"
          className="fw-bold text-center mb-5"
          style={{
            fontSize: "2.2rem",
            color: "#2C3E50",
            textShadow: "1px 1px 4px rgba(0,0,0,0.15)",
          }}
        >
          Latest Posts
        </h2>
        <hr className="bg-danger text-primary" />
        
        <div className="row g-4">
          {posts.map((post) => (
            <article className="col-md-4" key={post.id}>
              <div
                className="card border-0 h-100"
                style={{
                  borderRadius: "18px",
                  overflow: "hidden",
                  background: "white",
                  boxShadow: "0 12px 28px rgba(0,0,0,0.10)",
                  transition: "all .3s ease",
                }}
              >
                {/* Post Image */}
                {post.full_picture && (
                  <div
                    style={{
                      height: "230px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <Image
                      src={post.full_picture}
                      alt={post.message ? post.message.substring(0, 60) : "Latest Update"}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{
                        objectFit: "cover",
                        transition: "transform .4s ease",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.transform = "scale(1.07)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    />
                  </div>
                )}

                {/* Post Content */}
                <div className="p-3 d-flex flex-column">
                  <p
                    className="text-muted flex-grow-1"
                    style={{ fontSize: "0.95rem", lineHeight: "1.6" }}
                  >
                    {post.message
                      ? post.message.length > 110
                        ? post.message.substring(0, 110) + "..."
                        : post.message
                      : "View this post on Facebook for more details."}
                  </p>

                  {/* Likes & Comments */}
                  <div className="d-flex justify-content-between mt-3">
                    <div className="d-flex align-items-center gap-2 text-primary">
                      <i className="bi bi-hand-thumbs-up-fill" aria-hidden="true"></i>
                      <span style={{ fontSize: ".9rem" }}>
                        {post.likes?.summary?.total_count || 0} Likes
                      </span>
                    </div>

                    <div className="d-flex align-items-center gap-2 text-success">
                      <i className="bi bi-chat-fill" aria-hidden="true"></i>
                      <span style={{ fontSize: ".9rem" }}>
                        {post.comments?.summary?.total_count || 0} Comments
                      </span>
                    </div>
                  </div>

                  {/* View Post Button */}
                  <a
                    href={post.permalink_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn mt-3"
                    style={{
                      background: "linear-gradient(135deg,#6A5AF9,#836BFE)",
                      border: "none",
                      color: "white",
                      borderRadius: "12px",
                      padding: "10px",
                      boxShadow: "0 8px 18px rgba(106,90,249,0.35)",
                      transition: "all .3s ease",
                    }}
                  >
                    View on Facebook →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
