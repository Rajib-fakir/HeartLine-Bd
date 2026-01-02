"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Contact() {
  const PAGE_ID = process.env.NEXT_PUBLIC_PAGE_ID;
  const PAGE_TOKEN = process.env.NEXT_PUBLIC_PAGE_ACCESS_TOKEN;

  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPageData() {
      try {
        const res = await fetch(
          `https://graph.facebook.com/v20.0/${PAGE_ID}?fields=name,username,cover,picture,fan_count,about,category,website&access_token=${PAGE_TOKEN}`
        );
        const data = await res.json();
        setPageData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching page data:", error);
        setLoading(false);
      }
    }
    fetchPageData();
  }, [PAGE_ID, PAGE_TOKEN]);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border text-primary" role="status"></div>
    </div>
  );

  const fbPageUrl = pageData?.username
    ? `https://www.facebook.com/${pageData.username}`
    : `https://www.facebook.com/${PAGE_ID}`;
  const fbInboxUrl = fbPageUrl + "/messages";

  return (
    <main className="contact-section py-5 bg-light min-vh-100">
      <div className="container">
        
        {/* Title Section */}
        <div className="text-center mb-5 fade-in">
          <h1 className="display-5 fw-bold text-dark">যোগাযোগ</h1>
          <div className="underline mx-auto"></div>
          <p className="text-muted mt-3">আপনার মতামত বা জিজ্ঞাসার জন্য আমরা সবসময় প্রস্তুত</p>
        </div>

        <div className="row g-4 justify-content-center align-items-stretch">
          
          {/* প্রোফাইল কার্ড - Desktop এ বামে থাকবে */}
          <div className="col-lg-5 col-md-11">
            <div className="card h-100 border-0 shadow-sm overflow-hidden hover-card">
              {pageData?.cover?.source && (
                <div 
                  className="cover-img" 
                  style={{ backgroundImage: `url(${pageData.cover.source})` }}
                ></div>
              )}
              
              <div className="card-body text-center position-relative pt-5">
                <div className="profile-img-container">
                  <Image
                    src={pageData?.picture?.data?.url || "/Images/favicon.ico"}
                    alt="Profile"
                    width={130}
                    height={130}
                    className="rounded-circle border border-4 border-white shadow"
                  />
                </div>
                
                <h2 className="h4 fw-bold mt-2 mb-1">{pageData?.name}</h2>
                <p className="badge bg-primary-soft text-primary px-3 py-2">{pageData?.category}</p>
                
                <div className="stats-box d-flex justify-content-center gap-4 my-3">
                  <div>
                    <p className="mb-0 fw-bold">{pageData?.fan_count?.toLocaleString()}</p>
                    <small className="text-muted small">Followers</small>
                  </div>
                </div>

                <p className="bio-text px-3 mb-4">
                  {pageData?.about || "আমরা শেয়ার করি জীবনের নানা অনুভূতি, প্রেরণা এবং ইসলামী শিক্ষা।"}
                </p>

                <a href={fbPageUrl} target="_blank" className="btn btn-outline-primary rounded-pill px-4 w-100">
                  Visit Facebook Page
                </a>
              </div>
            </div>
          </div>

          {/* মেসেজ সেকশন - Desktop এ ডানে থাকবে */}
          <div className="col-lg-4 col-md-11">
            <div className="card h-100 border-0 shadow-sm p-4 d-flex flex-column justify-content-center text-center message-card">
              <div className="mb-4">
                <div className="icon-circle mx-auto">
                  <i className="bi bi-chat-dots-fill text-white h2"></i>
                </div>
              </div>
              <h3 className="fw-bold mb-3">সরাসরি মেসেজ দিন</h3>
              <p className="text-muted mb-4">
                আমাদের সাথে সরাসরি কথা বলতে নিচের বাটনে ক্লিক করে মেসেঞ্জারে মেসেজ দিন।
              </p>
              
              <a href={fbInboxUrl} target="_blank" className="btn btn-success btn-lg shadow-sm rounded-pill py-3">
                Message on Messenger
              </a>

              {pageData?.website && (
                <div className="mt-4 pt-3 border-top">
                  <small className="text-uppercase text-muted d-block mb-1">Our Website</small>
                  <a href={pageData.website} target="_blank" className="text-decoration-none fw-bold">
                    {pageData.website}
                  </a>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .contact-section { font-family: 'Inter', 'Hind Siliguri', sans-serif; }
        .underline { width: 60px; height: 4px; background: #0d6efd; border-radius: 2px; }
        
        .cover-img { height: 160px; background-size: cover; background-position: center; }
        
        .profile-img-container {
          position: absolute;
          top: -65px;
          left: 50%;
          transform: translateX(-50%);
        }

        .bg-primary-soft { background: #e7f3ff; }
        
        .hover-card { transition: transform 0.3s ease, shadow 0.3s ease; border-radius: 15px; }
        .hover-card:hover { transform: translateY(-10px); }

        .message-card { border-radius: 15px; border-bottom: 5px solid #198754 !important; }

        .icon-circle {
          width: 80px;
          height: 80px;
          background: #198754;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bio-text { font-size: 0.95rem; line-height: 1.6; color: #4b5563; }

        /* Animation */
        .fade-in { animation: fadeIn 1s ease-in; }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Desktop Adjustment */
        @media (min-width: 992px) {
          .row { gap: 2rem; }
        }
      `}</style>
    </main>
  );
}