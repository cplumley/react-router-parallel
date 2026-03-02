import { Link } from "react-router";

export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-lg text-center">
        <h1 className="text-5xl font-bold mb-4">About</h1>
        <p className="text-lg text-stone mb-8">
          If you got here without a full page reload, client-side routing works.
        </p>
        <Link
          to="/"
          className="inline-block border-2 border-navy text-navy px-6 py-3 rounded-lg font-semibold hover:bg-navy hover:text-cream transition-colors"
        >
          Back to SPA Home
        </Link>
      </div>
    </div>
  );
}
