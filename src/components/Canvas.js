"use client";
import Link from 'next/link';
import React from "react";
import Image from 'next/image';
import styles from "../../public/styles/home.module.css";


const Canvas = () => {
  return (
    <div className={styles.appContainer}>
      {/* Hero Section */}
      <section className={`${styles.heroSection} text-white py-5`}>
        <div className="container">
          <div className="row align-items-center">
            {/* Text Section */}
            <div className="col-lg-6 text-center text-lg-start">

              
        <h1 className="display-4 fw-bold" data-aos="zoom-out">
  Hi, I&rsquo;m a Web Developer
</h1>      
              
              
              
              
              
              <p className="lead" data-aos="fade-left">
                I build high-performance, secure, and scalable web applications.
              </p>
              <div className={styles.techStack} data-aos="fade-right">
                <strong>Technologies:</strong>{" "}
                <span>HTML</span>, <span>CSS</span>, <span>JavaScript</span>,{" "}
                <span>React</span>, <span>Node.js</span>, <span>MongoDB</span>
              </div>

              <Link href="/about"
                
                className="btn btn-light btn-lg px-4 shadow-sm rounded-pill text-primary d-none d-md-block mt-5"
                data-aos="fade-up"
              >
                About Me <i className="bi bi-arrow-right-circle h5 ms-2 text-info"></i>
              </Link>

            </div>

            {/* Image Section */}
            <div className="col-lg-6 text-center mt-4 mt-lg-0 text-md-end ">
              <div className={styles.shadowGlow}>
                <Image
                  src="/images/favicon.ico"
                  alt="Developer"
                  className={styles.profileImage}
                  data-aos="fade-zoom-in"
                  width={250}
                  height={250}
                />
              </div>
              
                       <Link
                href="/about"
                className="btn btn-light btn-lg px-4 shadow-sm rounded-pill d-md-none mt-5 text-success"
                data-aos="fade-up"
              >
                About Me <i className="bi bi-arrow-right-circle h5 ms-2 text-info"></i>
              </Link>     
              
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Topics */}
      <section className="py-5 bg-light" id="advanced-topics">
        <div className="container">
          <h2 className="text-center text-success fw-bold" data-aos="zoom-out">
            Advanced Topics
          </h2>
          <hr  className="text-light"/>
          <div className="row g-4 mt-4">
            {topics.map((topic, index) => (
              <div className="col-md-6 col-lg-3" key={index}>
                <div
                  className={`card h-100 text-center p-3 ${styles.strip}`}
                  data-aos="slide-up"
                >
                  <i className={`bi ${topic.icon} text-success display-5`}></i>
                  <h5 className="mt-2 text-primary">{topic.title}</h5>
                  <p className="small">{topic.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const topics = [
  {
    icon: "bi-code-slash",
    title: "Performance Optimization",
    description:
      "Using lazy loading, code splitting, and caching for high-speed applications.",
  },
  {
    icon: "bi-shield-lock",
    title: "Security Best Practices",
    description:
      "Implementing JWT, HTTPS, and encryption for secure data flow.",
  },
  {
    icon: "bi-hdd-network",
    title: "API Development",
    description:
      "Building scalable REST/GraphQL APIs with Node.js and Express.",
  },
  {
    icon: "bi-database-fill-gear",
    title: "Database Optimization",
    description:
      "Optimizing queries and indexing for performance and reliability.",
  },
];

export default Canvas;