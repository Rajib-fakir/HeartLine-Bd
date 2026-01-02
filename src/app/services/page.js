
"use client"
// pages/services/index.jsx
import Head from "next/head";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./services.module.css";
import Link from 'next/link';




const services = [
  {
    title: "Web Development",
    icon: "bi-code-slash",
    desc: "Custom websites and web apps built with modern frameworks. Fast, secure, and scalable digital experiences.",
  },
  {
    title: "UI/UX Design",
    icon: "bi-palette",
    desc: "Intuitive user interfaces and seamless user experiences that make your brand stand out.",
  },
  {
    title: "SEO Optimization",
    icon: "bi-graph-up-arrow",
    desc: "Drive traffic and improve search rankings with proven SEO strategies tailored to your business.",
  },
  {
    title: "E-Commerce Solutions",
    icon: "bi-cart4",
    desc: "Launch your online store with powerful e-commerce tools and a sleek shopping experience.",
  },
  {
    title: "Mobile App Development",
    icon: "bi-phone",
    desc: "Cross-platform mobile apps with beautiful interfaces and great performance.",
  },
  {
    title: "Cloud Integration",
    icon: "bi-cloud-upload",
    desc: "Seamlessly migrate and manage your infrastructure with modern cloud services.",
  },
];

const Services = () => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  return (
    <>

      <main className={`text-success ${styles.serviceMain}`}>
        <section className="container py-5">
          <div className="text-center mb-5 w-100">
            <h1 data-aos="zoom-in" className="fw-bold display-5">Our Services</h1>
            <p data-aos="fade-up" className="text-muted fs-5">
              High-impact solutions to grow your business digitally.
            </p>
          </div>

          <div className="row g-4">
            {services.map((service, index) => (
              <div className="col-md-6 col-lg-4" key={index}>
                <div data-aos="fade-up" className={`card h-100 border-0 shadow-lg ${styles.serviceCard}`}>
                  <div className="card-body text-center p-4">
                    <i className={`bi ${service.icon} fs-1 text-primary mb-3`} title={service.title}></i>
                    <h5 className="card-title fw-semibold">{service.title}</h5>
                    <p className="card-text text-muted">{service.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

                <section className="bg-primary text-white text-center py-5">
          <div className="container text-center ">
            <h2 className="fw-bold text-center w-100">Let’s Work Together</h2>
            <hr  className="text-light"/>
            <p className="fs-5 mb-4">
              Transform your ideas into digital reality. Let’s discuss your project today.
            </p>
            <Link href="/contact" className="btn btn-light btn-lg px-4 shadow-sm rounded-pill m-auto">
              Contact
               <i className="bi bi-arrow-right-circle h5 ms-2 text-info"></i>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default Services;