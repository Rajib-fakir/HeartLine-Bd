"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false); // mobile drawer
  const [openDropdown, setOpenDropdown] = useState(null); // desktop dropdown key

  // disable body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [drawerOpen]);

  const toggleDrawer = () => setDrawerOpen((p) => !p);

  const handleNavClick = () => {
    // close drawer when clicking a nav link (mobile)
    if (drawerOpen) setDrawerOpen(false);
  };

  const toggleDropdown = (key) => {
    // toggle a dropdown on desktop (click)
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  return (
    <>
      <header className="site-header">
        <div className="nav-container">
          <div className="brand">
            {/* Link without inner <a> */}
            <Link href="/" aria-label="Home" className="brand-link">
              <Image
                src="/images/favicon.ico"
                alt="logo"
                width={80}
                height={50}
                priority
              />
            </Link>
          </div>

          {/* Desktop horizontal nav */}
          <nav className="main-nav" aria-label="Primary">
            <ul className="nav-list">
              <li className="nav-item">
                <Link href="/" className="nav-link">Home</Link>
              </li>

              <li className="nav-item">
                <Link href="/about" className="nav-link">About</Link>
              </li>


              {/* Gallery dropdown - desktop */}
              <li
                className={`nav-item dropdown ${
                  openDropdown === "gallery" ? "open" : ""
                }`}
              >
                <button
                  className="nav-link dropdown-btn"
                  onClick={() => toggleDropdown("gallery")}
                  aria-haspopup="true"
                  aria-expanded={openDropdown === "gallery"}
                >
                  Gallery
                </button>

                <div className="dropdown-menu" role="menu">

                  <Link href="/gallery/reels" className="dropdown-item">Reels</Link>
                  <Link href="/gallery/status" className="dropdown-item">Status</Link>
                  <Link href="/gallery/photos" className="dropdown-item">Photos</Link>

                </div>
              </li>

              <li className="nav-item">
                <Link href="/contact" className="nav-link">Contact</Link>
              </li>


            </ul>
          </nav>

          {/* Mobile menu button */}
          <button
            className="mobile-menu-btn"
            onClick={toggleDrawer}
            aria-label="Open menu"
            aria-expanded={drawerOpen}
          >
            <span className="hamburger" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`drawer ${drawerOpen ? "show" : ""}`} role="dialog" aria-modal="true">
        <div className="drawer-header">
          <div className="drawer-brand">
            <Link href="/" className="drawer-brand-link" onClick={handleNavClick}>
              <Image src="/images/favicon.ico" alt="logo" width={60} height={38} />
            </Link>
          </div>
          <button className="drawer-close" onClick={toggleDrawer} aria-label="Close menu">
            &times;
          </button>
        </div>

        <nav className="drawer-nav" aria-label="Mobile Primary">
          <ul>
            <li>
              <Link href="/" onClick={handleNavClick} className="drawer-link">Home</Link>
            </li>
            <li>
              <Link href="/about" onClick={handleNavClick} className="drawer-link">About</Link>
            </li>
            {/* Expandable sections inside drawer for Gallery */}
            <li className="drawer-group">
              <button
                className="drawer-group-btn"
                onClick={() => setOpenDropdown((p) => (p === "gallery-drawer" ? null : "gallery-drawer"))}
                aria-expanded={openDropdown === "gallery-drawer"}
              >
                Gallery
              </button>

              {openDropdown === "gallery-drawer" && (
                <ul className="drawer-sublist text-center">

                  <li><Link href="/gallery/reels" onClick={handleNavClick} className="drawer-link">Reels</Link></li>
                  <li><Link href="/gallery/status" onClick={handleNavClick} className="drawer-link">Status</Link></li>
                  <li><Link href="/gallery/photos" onClick={handleNavClick} className="drawer-link">Photos</Link></li>

                </ul>
              )}
            </li>

            <li><Link href="/contact" onClick={handleNavClick} className="drawer-link">Contact</Link></li>
          </ul>
        </nav>
      </div>

      {/* Overlay for drawer */}
      {drawerOpen && <div className="drawer-overlay" onClick={toggleDrawer} aria-hidden="true"></div>}
    </>
  );
}