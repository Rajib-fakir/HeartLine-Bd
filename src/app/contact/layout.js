
import Link from 'next/link';
import { generateMetadata } from "../../components/Seo.js";

export const metadata = generateMetadata({
  title: "Contact Rajib Fakir | Full-Stack Web Developer",
  description: "Get in touch with Rajib Fakir, a skilled full-stack web developer specializing in HTML, CSS, JavaScript, React, Next.js, Node.js, MongoDB, and Bootstrap. Reach out for freelance opportunities, collaborations, or tech inquiries.",
  path: "/contact",
  image: "/images/favicon.ico",
  keywords: [
    "Rajib Fakir", 
    "Contact Rajib", 
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
    "Hire Web Developer", 
    "Rajib Hasan"
  ],
  author: "Rajib Fakir",
  jobTitle: "Full-Stack Web Developer",
  email: "mailto:rajib01943075658@gmail.com",
  sameAs: [
    "https://www.facebook.com/profile.php?id=100092192364083"
  ],
});




export default function ContactLayout({ children }) {
  
  
  
  
  
  
  return (

      <div className="body">

        
       
        {children}
      </div>

  );
}
