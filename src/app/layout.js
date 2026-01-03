
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
  title: "HeartLine BD ",
  description: "welcome to heartline BD ",
  path: "/",
  image: "/images/favicon.ico",
  keywords: [
    "sad","motivational","Islamic"
  ],
  author: "Orovindo dev",
  jobTitle: "Full-Stack Web Developer",
  email: "mailto:r.a.j.i.b.0.1.9.4.3.0.7.5.6.5.8.@gmail.com",
  sameAs: [
    "https://www.facebook.com/profile.php?id=61583884526652"
  ],
});





export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <meta name="google-site-verification" content="G2EekyPtjqfmT1H48y4fHvoCwCVUtEqr-z4lPs57i0I" />
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
