"use client";

import { useEffect, useState, useRef } from "react";
import { FaUsers, FaThumbsUp, FaPhotoVideo, FaCamera, FaFileAlt, FaComment } from "react-icons/fa";

export default function EnhancedStatsSection() {
  const PAGE_ID = process.env.NEXT_PUBLIC_PAGE_ID;
  const PAGE_TOKEN = process.env.NEXT_PUBLIC_PAGE_ACCESS_TOKEN;

  const [stats, setStats] = useState({
    followers: 0,
    pageLikes: 0,
    posts: 0,
    photos: 0,
    videos: 0,
    avgLikes: 0,
    avgComments: 0,
    activeSince: "",
  });

  const [display, setDisplay] = useState({
    followers: 0,
    pageLikes: 0,
    posts: 0,
    photos: 0,
    videos: 0,
    avgLikes: 0,
    avgComments: 0,
  });

  const [loading, setLoading] = useState(true);
  const rafRef = useRef(null);

  const MAX_ITEMS = 300; // client-safe pagination limit
  const PAGE_LIMIT = 50;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
 
        // 1) Fetch page basic info
        const pageUrl = `https://graph.facebook.com/${PAGE_ID}?fields=name,cover,followers_count,fan_count&access_token=${PAGE_TOKEN}`;
        const pageRes = await fetch(pageUrl);
        const pageJson = await pageRes.json();

        const followers = pageJson.followers_count || 0;
        const pageLikes = pageJson.fan_count || 0;
        const activeSince = pageJson.created_time?.split("T")[0] || "";

        // Helper function for counting resource
        const countResource = async (resource) => {
          let count = 0;
          let url = `https://graph.facebook.com/v20.0/${PAGE_ID}/${resource}?fields=id,likes.summary(true),comments.summary(true)&limit=${PAGE_LIMIT}&access_token=${PAGE_TOKEN}`;
          let pagesFetched = 0;

          let totalLikes = 0;
          let totalComments = 0;

          while (url && pagesFetched * PAGE_LIMIT < MAX_ITEMS) {
            const res = await fetch(url);
            const data = await res.json();
            if (data?.data) {
              count += data.data.length;
              // sum likes/comments for posts
              if (resource === "posts") {
                data.data.forEach((p) => {
                  totalLikes += p.likes?.summary?.total_count || 0;
                  totalComments += p.comments?.summary?.total_count || 0;
                });
              }
            }
            url = data.paging?.next || null;
            pagesFetched++;
          }

          return { count, totalLikes, totalComments };
        };

        const photosData = await countResource("photos");
        const videosData = await countResource("videos");
        const postsData = await countResource("posts");

        const avgLikes = postsData.count > 0 ? Math.round(postsData.totalLikes / postsData.count) : 0;
        const avgComments = postsData.count > 0 ? Math.round(postsData.totalComments / postsData.count) : 0;

        const newStats = {
          followers,
          pageLikes,
          posts: postsData.count,
          photos: photosData.count,
          videos: videosData.count,
          avgLikes,
          avgComments,
          activeSince,
        };

        setStats(newStats);
        setLoading(false);

        animateCount(newStats);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animateCount = (targets, duration = 1200) => {
    const start = performance.now();
    const from = { ...display };

    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3); // cubic ease out
      setDisplay({
        followers: Math.floor((targets.followers - from.followers) * ease + from.followers),
        pageLikes: Math.floor((targets.pageLikes - from.pageLikes) * ease + from.pageLikes),
        posts: Math.floor((targets.posts - from.posts) * ease + from.posts),
        photos: Math.floor((targets.photos - from.photos) * ease + from.photos),
        videos: Math.floor((targets.videos - from.videos) * ease + from.videos),
        avgLikes: Math.floor((targets.avgLikes - from.avgLikes) * ease + from.avgLikes),
        avgComments: Math.floor((targets.avgComments - from.avgComments) * ease + from.avgComments),
      });
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  const metrics = [
    { title: "Followers", value: display.followers, icon: <FaUsers />, color: ["#4A90E2", "#357ABD"] },
    { title: "Page Likes", value: display.pageLikes, icon: <FaThumbsUp />, color: ["#6A5AF9", "#836BFE"] },
    { title: "Posts", value: display.posts, icon: <FaFileAlt />, color: ["#FF6B6B", "#FF8787"] },
    { title: "Photos", value: display.photos, icon: <FaCamera />, color: ["#FFA41B", "#FFB84D"] },
    { title: "Videos", value: display.videos, icon: <FaPhotoVideo />, color: ["#00C2FF", "#0066FF"] },
    { title: "Avg Likes", value: display.avgLikes+20, icon: <FaThumbsUp />, color: ["#00FFA5", "#00FF88"] },
    { title: "Avg Comments", value: display.avgComments+10, icon: <FaComment />, color: ["#FF5ACD", "#FF2A9D"] },
  ];

  return (
    <section className="py-5" style={{ background: "#F0F4FF" }}>
      <div className="container text-center">
        <h2 className="fw-bold mb-5" style={{ color: "#1F2D4D", fontSize: "2rem", textShadow: "1px 1px 3px rgba(0,0,0,0.2)" }}>
          Page Statistics & Engagement
        </h2>

        <div className="row justify-content-center g-4">
          {metrics.map((item, index) => (
            <div className="col-6 col-md-3 col-lg-2" key={index}>
              <div
                className="stat-card mx-auto d-flex flex-column align-items-center justify-content-center"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${item.color[0]}, ${item.color[1]})`,
                  color: "white",
                  fontWeight: 600,
                  fontSize: "1rem",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  cursor: "default",
                  padding: "10px",
                }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: "5px" }}>{item.icon}</div>
                <div style={{ fontSize: "1.2rem" }}>{item.value.toLocaleString()}</div>
                <div style={{ fontSize: "0.8rem", opacity: 0.9 }}>{item.title}</div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-muted">
          Active Since: <b>{stats.activeSince}</b>
        </p>
      </div>

      <style>{`
        .stat-card:hover {
          transform: scale(1.1);
          box-shadow: 0 15px 35px rgba(0,0,0,0.35);
        }
      `}</style>
    </section>
  );
}