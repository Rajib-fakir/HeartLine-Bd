"use client";

import Link from "next/link";
// Bootstrap Icons ব্যবহার করার জন্য এগুলো ইমপোর্ট করতে হবে
// নিশ্চিত করুন আপনি 'npm install bootstrap-icons' করেছেন
import "bootstrap-icons/font/bootstrap-icons.css";

export default function FooterSection() {
  return (
    <footer
      className="py-5"
      style={{
        background: "linear-gradient(135deg, #2C3E50, #4A6FA5)",
        color: "white",
      }}
    >
      <div className="container">
        <div className="row g-4 text-center text-md-start">
          
          {/* Branding */}
          <div className="col-12 col-md-4">
            <h3 className="fw-bold" style={{ textShadow: "1px 1px 5px rgba(0,0,0,0.4)" }}>
              HeartLine BD
            </h3>
            <p className="mb-0" style={{ fontSize: "0.95rem", lineHeight: "1.6", opacity: 0.85 }}>
              Facebook growth tips, motivational & Islamic content.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="col-12 col-md-4">
            <h5 className="fw-bold mb-3" style={{ textShadow: "0px 1px 3px rgba(0,0,0,0.3)" }}>
              Quick Links
            </h5>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link href="/" className="text-white text-decoration-none custom-link">Home</Link>
              </li>
              <li className="mb-2">
                <Link href="#services" className="text-white text-decoration-none custom-link">Services</Link>
              </li>
              <li className="mb-2">
                <Link href="#about" className="text-white text-decoration-none custom-link">About</Link>
              </li>
              <li>
                <Link href="#contact" className="text-white text-decoration-none custom-link">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-12 col-md-4">
            <h5 className="fw-bold mb-3" style={{ textShadow: "0px 1px 3px rgba(0,0,0,0.3)" }}>
              Follow Me
            </h5>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <a href="https://facebook.com/yourpage" target="_blank" className="text-white fs-4 social-icon">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://instagram.com" target="_blank" className="text-white fs-4 social-icon">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" className="text-white fs-4 social-icon">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="https://youtube.com" target="_blank" className="text-white fs-4 social-icon">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="text-center mt-5 pt-3 border-top" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
          <p className="mb-0" style={{ fontSize: "0.85rem", opacity: 0.8 }}>
            © {new Date().getFullYear()} HeartLine BD. All rights reserved.
          </p>
        </div>
      </div>

      {/* Hover Effects */}
      <style>{`
        .social-icon {
          display: inline-block;
          transition: all 0.3s ease;
        }
        .social-icon:hover {
          transform: translateY(-3px);
          color: #6A5AF9 !important;
        }
        .custom-link:hover {
          opacity: 0.7;
          padding-left: 5px;
          transition: all 0.3s ease;
        }
      `}</style>
    </footer>
  );
}
