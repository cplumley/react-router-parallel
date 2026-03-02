import { Link } from "react-router";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-lg text-center">
        <h1 className="text-5xl font-bold mb-4">SPA Home</h1>
        <p className="text-lg text-stone mb-8">
          This is the React Router v7 Framework Mode SPA, served by Rails.
        </p>
        <Link
          to="/about"
          className="inline-block bg-terracotta text-white px-6 py-3 rounded-lg font-semibold hover:bg-terracotta-dark transition-colors"
        >
          Go to About (client-side nav)
        </Link>
      </div>
    </div>
  );
}
