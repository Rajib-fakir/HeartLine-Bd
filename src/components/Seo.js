export function generateMetadata({
  title,
  description,
  path = "",
  verification = {
    google: 'gJdyRwtpdgK6Z0cJciF_J7TWitSxbCGe66T4XNwBaxk',
  },
  image = "/images/favicon.ico",
  icon = "/images/favicon.ico",
  keywords = [],
  author = "Rajib",
  sameAs = ["https://www.facebook.com/profile.php?id=100092192364083"],
  email = "mailto:rajib01943075658@gmail.com",
  jobTitle = "Web Developer",
}) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://rajib-fakir.netlify.app";
  const fullUrl = `${baseUrl}${path}`;
  const imageUrl = `${baseUrl}${image}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author,
    url: fullUrl,
    image: imageUrl,
    sameAs,
    jobTitle,
    worksFor: {
      "@type": "Organization",
      name: "RajibDev",
    },
    email,
    ...(description && { description }), // শুধুমাত্র থাকলে description অ্যাড হবে
  };

  return {
    title,
    description,
    keywords,
    authors: [{ name: author, url: fullUrl, email }],
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: "RajibDev",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    other: {
      "application/ld+json": JSON.stringify(jsonLd),
    },
    verification, // এখন এটা external object হিসাবে আছে
  };
}