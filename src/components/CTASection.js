"use client";

import { FaFacebookF } from "react-icons/fa";

export default function CTASection() {
  const PAGE_ID = process.env.NEXT_PUBLIC_PAGE_ID;

  return (
    <section
      className="py-5"
      style={{
        background: "linear-gradient(135deg, #6A5AF9, #836BFE)",
        color: "white",
      }}
    >
      <div className="container text-center">
        <h2
          className="fw-bold mb-3 text-center  w-100"
          style={{ fontSize: "2rem", textShadow: "1px 1px 5px rgba(0,0,0,0.3)" }}
        >
          Join Our Community
        </h2>

        <p
          className="mb-4"
          style={{ fontSize: "1.1rem", lineHeight: "1.6", textShadow: "0px 1px 2px rgba(0,0,0,0.2)" }}
        >
          Don’t miss out on our latest posts, tips, tutorials, and motivational content.
          Follow our Facebook page now!
        </p>

        {/* Follow Button */}
        <a
          href={`https://facebook.com/${PAGE_ID}`}
          target="_blank"
          className="btn fw-bold px-5 py-3 d-flex align-items-center justify-content-center mx-auto"
          style={{
            borderRadius: "50px",
            color: "#6A5AF9",
            background: "white",
            fontSize: "1rem",
            boxShadow: "0 6px 15px rgba(0,0,0,0.25)",
            transition: "all 0.3s ease",
            gap: "10px",
          }}
        >
          <FaFacebookF size={20} />
          Follow Now
        </a>
      </div>

      {/* Hover animation for button */}
      <style>{`
        .btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        }
      `}</style>
    </section>
  );
}