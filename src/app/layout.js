
import Link from 'next/link';
import "./globals.css";
import "./Font.css";
import "./Navbar.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../components/Navbar.js"
import { generateMetadata } from "../components/Seo.js";
import FooterSection from "@/components/FooterSection"
import ThemeProvider from "@/components/ThemeProvider"


export const metadata = generateMetadata({
  title: "Home | Rajib Fakir | Full-Stack Web Developer",
  description: "Welcome to the portfolio of Rajib Fakir, a passionate and skilled full-stack web developer specializing in building modern, responsive, and high-performance websites and web applications using HTML, CSS, JavaScript, React, Next.js, Node.js, MongoDB, and Bootstrap.",
  path: "/",
  image: "/images/favicon.ico",
  keywords: [
    "Rajib Fakir",
    "Home",
    "Web Developer",
    "Full-Stack Developer",
    "React Developer",
    "Next.js Developer",
    "JavaScript Developer",
    "Frontend Developer",
    "Backend Developer",
    "Node.js",
    "MongoDB",
    "Bootstrap",
    "HTML",
    "CSS",
    "Rajib Hasan",
    "Freelance Web Developer",
    "Modern Web Design",
    "Responsive Websites",
    "Personal Portfolio"
  ],
  author: "Rajib Fakir",
  jobTitle: "Full-Stack Web Developer",
  email: "mailto:rajib01943075658@gmail.com",
  sameAs: [
    "https://www.facebook.com/profile.php?id=100092192364083"
  ],
});





export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="body">
      <ThemeProvider />
      <Navbar />

        
       
        {children}
                <footer className=" bg-dark text-light text-center p-2 mt-2">
<FooterSection />
      </footer>
      </body>
    </html>
  );
}
