import { Link } from "react-router";

// icons
import { FiInstagram } from "react-icons/fi";
import { FiSend } from "react-icons/fi";
import { FiTwitter } from "react-icons/fi";
import { FiThumbsUp } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="mt-auto py-10.5 border-t border-slate-200 bg-white dark:bg-app-dark dark:border-slate-800">
      <div className="container">
        <div className="grid grid-cols-4 gap-20">
          <div>
            <h3 className="text-2xl font-semibold dark:text-white">Shop Categories</h3>

            <ul className="mt-5 flex flex-col gap-y-2">
              <li>
                <Link className="text-slate-600 dark:text-muted-dark">Electronics</Link>
              </li>
              <li>
                <Link className="text-slate-600 dark:text-muted-dark">Fashion</Link>
              </li>
              <li>
                <Link className="text-slate-600 dark:text-muted-dark">Home & Kitchen</Link>
              </li>
              <li>
                <Link className="text-slate-600 dark:text-muted-dark">Beauty</Link>
              </li>
              <li>
                <Link className="text-slate-600 dark:text-muted-dark">Sports</Link>
              </li>
              <li>
                <Link className="text-slate-600 dark:text-muted-dark">Toys</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold dark:text-white">Quick Links</h3>

            <ul className="mt-5 flex flex-col gap-y-2">
              <li>
                <Link className="text-slate-600 dark:text-muted-dark">About Us</Link>
              </li>
              <li>
                <Link className="text-slate-600 dark:text-muted-dark">Contact</Link>
              </li>
              <li>
                <Link className="text-slate-600 dark:text-muted-dark">Privacy Policy</Link>
              </li>
              <li>
                <Link className="text-slate-600 dark:text-muted-dark">Terms & Conditions</Link>
              </li>
              <li>
                <Link className="text-slate-600 dark:text-muted-dark">FAQ</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold dark:text-white">Newsletter</h3>

            <form className="mt-5">
              <div className="flex gap-2 flex-wrap">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="p-3 bg-white rounded-lg border border-slate-200 outline-none w-full dark:text-white dark:bg-suface-dark dark:border-slate-800"
                />
                <button type="submit" className="flex items-center gap-3 bg-brand text-white py-3 px-6.5  rounded-lg cursor-pointer dark:bg-indigo-500">
                  <span> Subscribe</span>
                  <FiThumbsUp className="size-4" />
                </button>
              </div>
            </form>
          </div>
          <div>
            <h3 className="text-2xl font-semibold dark:text-white">Follow Us</h3>

            <ul className="mt-5 flex items-center gap-3">
              <li>
                <Link className="flex size-10 rounded-full bg-brand text-white justify-center items-center">
                  <FiInstagram />
                </Link>
              </li>
              <li>
                <Link className="flex size-10 rounded-full bg-brand text-white justify-center items-center">
                  <FiSend />
                </Link>
              </li>
              <li>
                <Link className="flex size-10 rounded-full bg-brand text-white justify-center items-center">
                  <FiTwitter />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
