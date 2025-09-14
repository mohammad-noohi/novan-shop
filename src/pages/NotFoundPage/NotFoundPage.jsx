import { Link } from "react-router";
// icons
import { ArrowRight } from "lucide-react";

export default function NotFoundPage() {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-6 py-10 bg-white dark:bg-app-dark">
        <img src="/images/404-Error.png" alt="404 error" className="max-w-1/4" />
        <p className="text-2xl text-slate-600 dark:text-muted-dark">Sorry, the page you’re looking for doesn’t exist.</p>
        <Link to="/" className="flex items-center gap-2 hover:gap-3 transition-all capitalize py-3 px-6 rounded-lg bg-brand cursor-pointer text-white">
          <span> Go Home</span>
          <ArrowRight className="size-6" />
        </Link>
      </div>
    </>
  );
}
