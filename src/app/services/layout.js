import Link from 'next/link';

import { generateMetadata } from "../../components/Seo.js";

export const metadata = generateMetadata({
  title: "Services | Rajib Fakir | Full-Stack Web Developer",
  description: "Rajib Fakir is a skilled full-stack web developer with expertise in HTML, CSS, JavaScript, React, Next.js, Node.js, MongoDB, and Bootstrap. Explore professional web development services including frontend, backend, and full-stack solutions.",
  path: "/services",
  image: "/images/favicon.ico",
  keywords: [
    "Rajib Fakir",
    "Web Developer",
    "Full-Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "MongoDB",
    "Frontend Developer",
    "Backend Developer",
    "HTML",
    "CSS",
    "JavaScript",
    "Bootstrap",
    "Freelance Web Developer",
    "Hire Web Developer",
    "Rajib Hasan",
    "Web Development Services"
  ],
  author: "Rajib Fakir",
  jobTitle: "Full-Stack Web Developer",
  email: "mailto:rajib01943075658@gmail.com",
  sameAs: [
    "https://www.facebook.com/profile.php?id=100092192364083"
  ],
});



export default function ServicesLayout({ children }) {
  
  
  
  
  
  
  return (

      <div className="body">

        
       
        {children}
      </div>

  );
}
