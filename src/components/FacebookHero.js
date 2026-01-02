"use client";
import Image from "next/image"; // এসইও এর জন্য ইমেজে পরিবর্তন
import { FaFacebook, FaUserPlus } from "react-icons/fa";

export default function FacebookHero({ fbData }) {
  // ডাটা লোড না হওয়া পর্যন্ত আগের মতই দেখাবে বা লোডিং স্টেট থাকবে
  const pageName = fbData?.name || "Loading...";
  const coverPhoto = fbData?.cover?.source || "";
  const profilePic = fbData?.picture?.data?.url || "";
  const followers = fbData?.followers_count || fbData?.fan_count || 0;
  const PAGE_ID = process.env.NEXT_PUBLIC_PAGE_ID;

  return (
    <section className="w-100 bg-dark text-light pb-4">
      {/* Cover Photo - ডিজাইন অপরিবর্তিত */}
      <div className="w-100 position-relative" style={{ height: "260px", overflow: "hidden" }}>
        {coverPhoto ? (
          <Image
            src={coverPhoto}
            alt={`${pageName} Cover`}
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        ) : (
          <div className="bg-secondary w-100 h-100"></div>
        )}
      </div>

      {/* Profile Section - ডিজাইন অপরিবর্তিত */}
      <div className="container text-center">
        {/* Profile Image */}
        <div
          className="rounded-circle border border-4 border-white shadow position-relative"
          style={{
            width: "150px",
            height: "150px",
            marginTop: "-75px",
            overflow: "hidden",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            zIndex: 10
          }}
        >
          {profilePic && (
            <Image
              src={profilePic}
              alt={`${pageName} Profile`}
              width={150}
              height={150}
              style={{ objectFit: "cover" }}
            />
          )}
        </div>

        {/* Name */}
        <h2 className="fw-bold mt-2">{pageName}</h2>

        {/* Followers */}
        <div className="d-flex justify-content-center gap-3 mt-1">
          <span className="fw-semibold">{followers.toLocaleString()} Followers</span>
          <span className="fw-semibold">0 Following</span>
        </div>

        {/* Buttons - ডিজাইন অপরিবর্তিত */}
        <div className="d-flex justify-content-center gap-3 mt-3 flex-wrap">
          <a
            href={`https://facebook.com/${PAGE_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary d-flex align-items-center gap-2 px-4 shadow"
          >
            <FaFacebook size={18} /> Visit Page
          </a>

          <a
            href={`https://facebook.com/${PAGE_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-success d-flex align-items-center gap-2 px-4 shadow"
          >
            <FaUserPlus size={18} /> Follow
          </a>
        </div>
      </div>
    </section>
  );
}
