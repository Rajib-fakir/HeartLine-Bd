import Link from 'next/link';



export default function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center px-3">
      {/* SVG Illustration */}
      <svg
        width="150"
        height="150"
        viewBox="0 0 1024 1024"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-4"
      >
        <circle cx="512" cy="512" r="400" fill="#e0e7ff" />
        <path
          d="M320 512h64v-128h-64v128zm320 0h64v-128h-64v128zm-144 64a32 32 0 100-64 32 32 0 000 64z"
          fill="#0d6efd"
        />
      </svg>

      {/* Title */}
      <h1 className="display-1 fw-bold text-primary">404</h1>

      {/* Subtitle */}
      <p className="fs-4 text-secondary">Oops! Page not found.</p>

      {/* Description */}
      <p className="text-muted mb-4">
        The page you’re looking for doesn’t exist or was moved.
      </p>

      {/* Button */}
      <Link href="/" className="btn btn-primary px-4 py-2">
        Go back home
      </Link>
    </div>
  );
}