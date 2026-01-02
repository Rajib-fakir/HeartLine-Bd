'use client';



export default function Error({ error, reset }) {
 

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center px-3">
      {/* Icon or SVG */}
      <svg
        width="100"
        height="100"
        fill="currentColor"
        className="mb-4 text-danger"
        viewBox="0 0 16 16"
      >
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.964 0L.165 13.233c-.457.778.091 1.767.982 1.767h13.707c.89 0 1.438-.99.982-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1-2.002 0 1 1 0 0 1 2.002 0z" />
      </svg>

      {/* Title */}
      <h1 className="display-5 fw-bold text-danger">Something went wrong</h1>

      {/* Error message (optional for dev only) */}
      {/* <p className="text-muted">{error?.message}</p> */}

<p className="mt-3 text-secondary">
  We&rsquo;re sorry, but an unexpected error has occurred.
</p>

      {/* Retry button */}
      <button
        onClick={() => reset()}
        className="btn btn-danger mt-4 px-4 py-2"
      >
        Try again
      </button>
    </div>
  );
}