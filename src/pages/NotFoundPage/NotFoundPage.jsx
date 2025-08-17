import { Link } from "react-router";
import DevInfo from "../../components/DevInfo";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="grow flex flex-col justify-center items-center gap-6 py-10">
        <img src="images/404-Error.png" alt="404 error" className="max-w-1/4" />
        <p>Sorry, the page you’re looking for doesn’t exist.</p>
        <Link to="/" className="capitalize py-3 px-6 rounded-lg bg-brand cursor-pointer text-white">
          Go Home
        </Link>
      </div>

      <img src="/404-Error.png" alt="" />
      <Footer />
      <DevInfo />
    </div>
  );
}
