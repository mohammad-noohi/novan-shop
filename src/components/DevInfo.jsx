import { Link } from "react-router";

// icons
import { Instagram } from "lucide-react";
import { Send } from "lucide-react";
import { Github } from "lucide-react";

export default function DevInfo() {
  return (
    <div className=" py-3 border-t text-slate-600 border-slate-200 bg-white dark:bg-app-dark dark:border-slate-800 dark:text-muted-dark">
      <div className="container">
        <div className="flex items-center justify-between text-sm">
          <p>Developed & Designed by Mohammad Noohi — Frontend Developer</p>
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com/noohi1998 "
              className="size-10 flex items-center justify-center bg-white border border-slate-200 rounded-full dark:bg-suface-dark dark:border-slate-800 dark:text-white cursor-pointer">
              <Instagram className="size-4" />
            </a>

            <a
              href="https://t.me/noohi1998"
              className="size-10 flex items-center justify-center bg-white border border-slate-200 rounded-full dark:bg-suface-dark dark:border-slate-800 dark:text-white cursor-pointer">
              <Send className="size-4" />
            </a>

            <a
              href="https://github.com/mohammad-noohi"
              className="size-10 flex items-center justify-center bg-white border border-slate-200 rounded-full dark:bg-suface-dark dark:border-slate-800 dark:text-white cursor-pointer">
              <Github className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
