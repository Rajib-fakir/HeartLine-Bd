import Link from "next/link";
import Image from "next/image";


const accessToken = process.env.NEXT_PUBLIC_PAGE_ACCESS_TOKEN;
const pageId = process.env.NEXT_PUBLIC_PAGE_ID;
const domain = process.env.NEXT_DOMAIN_URL;
const postsPerPage = 20;

// ১. ডাইনামিক মেটাডাটা (SEO এর জন্য - searchParams await করা হয়েছে)
export async function generateMetadata({ searchParams }) {
  const params = await searchParams; // Next.js 15 update
  const page = parseInt(params.page) || 1;
  
  return {
    title: `Photo Gallery - Page ${page} | Latest Facebook Photos`,
    description: "আমাদের ফেসবুক পেজের সাম্প্রতিক সব ফটো কালেকশন দেখুন। প্রতিটি ছবির বিস্তারিত এবং আপডেট পেতে ভিজিট করুন।",
    alternates: {
      canonical: `${domain}/gallery/photos?page=${page}`,
    },
  };
}

// ২. ডাটা ফেচিং ফাংশন (ISR - প্রতি ১ ঘণ্টায় আপডেট হবে)
async function getFacebookPosts() {
  const url = `https://graph.facebook.com/v21.0/${pageId}/posts?fields=id,message,full_picture,attachments,created_time,reactions.summary(total_count)&limit=100&access_token=${accessToken}`;
  
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const data = await res.json();
    
    if (!data.data) return [];

    // শুধু ফটোগুলো ফিল্টার করা (ভিডিও বাদ দিয়ে)
    return data.data.filter(post => {
      const type = post.attachments?.data?.[0]?.type;
      const isPhoto = type === "photo" || type === "profile_media" || type === "added_photos";
      return post.full_picture && isPhoto;
    });
  } catch (error) {
    console.error("Error fetching Facebook posts:", error);
    return [];
  }
}

export default async function FacebookPhotos({ searchParams }) {
  // searchParams await করা হয়েছে
  const params = await searchParams; 
  const allPosts = await getFacebookPosts();
  const pageName = "HeartLine BD"; 
  
  // ৩. পেজিনেশন লজিক
  const currentPage = parseInt(params.page) || 1;
  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      
      <header className="text-center mb-5">
        <h1 className="fw-bold">Photo Gallery</h1>
        <p className="text-muted">Explore high-quality photos from our official page</p>
      </header>

      <div className="row g-2 g-md-4 mx-auto" style={{ maxWidth: "1250px" }}>
        {currentPosts.map((post) => {
          const postTitle = post.message ? post.message.substring(0, 100) : `Facebook photo from ${pageName}`;
          
          const jsonLd = {
            "@context": "https://schema.org/",
            "@type": "ImageObject",
            "name": postTitle,
            "description": post.message || "Facebook Post Image",
            "contentUrl": post.full_picture,
            "author": { "@type": "Organization", "name": pageName }
          };

          return (
            <div key={post.id} className="col-6 col-md-4 col-lg-3 mb-4">
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
              />
              
              <article className="card h-100 border-0 shadow-sm" style={{ borderRadius: "15px", overflow: "hidden" }}>
                
                <div className="position-relative bg-black" style={{ aspectRatio: "9/16", overflow: "hidden" }}>


<div style={{ position: 'relative', width: '100%', height: '300px' }}> 
  <Image 
    src={post.full_picture} 
    alt={post.message || `Photo by ${pageName}`}
    title={postTitle}
    fill // এটি ইমেজকে তার প্যারেন্ট কন্টেইনারের পুরোটা জুড়ে রাখবে
    style={{ objectFit: "cover" }} 
    loading="lazy" 
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
</div>

                  
                  <div className="position-absolute bottom-0 start-0 p-2 w-100">
                    <span className="badge rounded-pill bg-dark bg-opacity-50" style={{ fontSize: "10px" }}>
                      👍 {post.reactions?.summary?.total_count || 0} Likes
                    </span>
                  </div>
                </div>

                <div className="card-body p-2 p-md-3 d-flex flex-column">
                  <h2 className="card-text text-dark mb-2" style={{ 
                    fontSize: "12px", 
                    height: "35px", 
                    overflow: "hidden", 
                    display: "-webkit-box", 
                    WebkitLineClamp: 2, 
                    WebkitBoxOrient: "vertical",
                    fontWeight: "600"
                  }}>
                    {post.message || "View full details on Facebook"}
                  </h2>

                  <a 
                    href={`https://www.facebook.com/${post.id}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm fw-bold w-100 mt-auto"
                    style={{ backgroundColor: "#1877f2", border: "none", fontSize: "12px" }}
                  >
                    View on Facebook
                  </a>
                </div>
              </article>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <nav className="mt-5">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <Link className="page-link" href={`?page=${currentPage - 1}`}>Previous</Link>
            </li>
            
            <li className="page-item active">
              <span className="page-link px-4">{currentPage} / {totalPages}</span>
            </li>

            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <Link className="page-link" href={`?page=${currentPage + 1}`}>Next</Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
