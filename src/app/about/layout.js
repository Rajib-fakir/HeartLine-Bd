
import Link from 'next/link';



// app/about/page.tsx
import { generateMetadata } from "../../components/Seo.js";

export const metadata = generateMetadata({
  title: "About Me | Rajib fakir | Web Developer",
  description: "Rajib is a passionate web developer skilled in HTML, CSS, JS, React, Next.js, Node.js, MongoDB & Bootstrap.",
  path: "/about",
  image: "/images/favicon.ico",
  keywords: ["Rajib", "Web Developer", "Next.js", "React", "MongoDB","Html","Css","Nodejs","Bootstrap","Rajib fakir","Rajib hasan"],
  author: "Rajib",
  jobTitle: "Full-Stack Web Developer",
  email: "mailto:rajib01943075658@gmail.com",
  sameAs: [
"https://www.facebook.com/profile.php?id=100092192364083"
  ],
});






export default function AboutLayout({ children }) {
  
  
  
  
  
  
  return (

      <div className="body">

        
       
        {children}
      </div>

  );
}
