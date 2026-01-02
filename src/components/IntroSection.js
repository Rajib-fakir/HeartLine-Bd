"use client";

import Image from "next/image";

export default function IntroSection() {
  return (
    <section
      className="py-5 intro-section"
      style={{
        background: "linear-gradient(135deg, #EEF2F3 0%, #DDE0FF 100%)",
        overflow: "hidden"
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          
          {/* Left Content */}
          <div className="col-lg-6 col-md-12 mb-5 mb-lg-0 text-center text-lg-start">
            <h2
              className="fw-bold mb-4 fade-in-left"
              style={{
                fontSize: "calc(1.8rem + 1vw)",
                color: "#2C3E50",
                lineHeight: "1.3",
              }}
            >
              Welcome to My <span style={{color: "#6A5AF9"}}>Official Page</span>
            </h2>

            <div className="content-box mb-3 fade-in-left">
              <p className="text-dark m-0">
                আমি মোটিভেশনাল, ইসলামিক, লাইফস্টাইল, এবং বিভিন্ন অনুপ্রেরণামূলক
                কনটেন্ট নিয়মিত শেয়ার করে থাকি। ইতিবাচক চিন্তা – সুন্দর জীবন, সেই লক্ষ্যেই আমার এই কনটেন্টগুলো।
              </p>
            </div>

            <div className="content-box mb-4 fade-in-left shadow-sm">
              <p className="text-dark m-0">
                নিয়মিত সুন্দর ক্যাপশন, পোস্ট, ভিডিও এবং স্ট্যাটাস পেতে আমার পেজটি অবশ্যই ফলো করুন।
              </p>
            </div>

            <div className="fade-in-left">
              <a
                href="#services"
                className="btn btn-explore px-5 py-3 shadow-lg"
              >
                Explore More
              </a>
            </div>
          </div>

          {/* Right Side Illustration */}
          <div className="col-lg-6 col-md-12 text-center">
            <div className="illustration-wrapper p-4 fade-in-right">
              <div className="img-container">
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png"
                  alt="Content Illustration"
                  width={400}
                  height={400}
                  priority
                  className="img-fluid floating-img"
                />
              </div>
              <p className="mt-4 fw-bold text-muted text-uppercase tracking-wider" style={{fontSize: "0.85rem", letterSpacing: "2px"}}>
                Positive • Islamic • Motivational
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .intro-section {
          min-height: 80vh;
          display: flex;
          align-items: center;
        }

        .content-box {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 20px 25px;
          border-radius: 16px;
          font-size: 1.05rem;
          line-height: 1.8;
          transition: transform 0.3s ease;
        }

        .content-box:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.8);
        }

        .btn-explore {
          background: linear-gradient(135deg, #6A5AF9 0%, #836BFE 100%);
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          font-size: 1.1rem;
          transition: all 0.3s ease;
        }

        .btn-explore:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 20px rgba(106,90,249,0.4) !important;
          color: white;
        }

        .illustration-wrapper {
          background: rgba(255, 255, 255, 0.4);
          border-radius: 30px;
          border: 2px solid white;
          display: inline-block;
        }

        .floating-img {
          filter: drop-shadow(0px 15px 30px rgba(0,0,0,0.15));
          animation: float 4s ease-in-out infinite;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }

        /* Responsive adjustments */
        @media (max-width: 991px) {
          .intro-section { padding: 80px 0; }
          .content-box { margin-left: auto; margin-right: auto; max-width: 90%; }
        }

        /* Simple Animations */
        .fade-in-left { animation: fadeInLeft 1s ease-out; }
        .fade-in-right { animation: fadeInRight 1s ease-out; }

        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
