import { Link } from "react-router";

export default function DevInfo() {
  return (
    <div className="py-3 border-t text-slate-600 border-slate-200 bg-white dark:bg-app-dark dark:border-slate-800 dark:text-muted-dark">
      <div className="container">
        <div className="flex items-center justify-between text-sm">
          <p>Developed & Designed by Mohammad Noohi — Frontend Developer</p>
          <div className="flex items-center gap-3">
            <Link className="size-10 flex items-center justify-center bg-white border border-slate-200 rounded-full dark:bg-suface-dark dark:border-slate-800 dark:text-white">ins</Link>

            <Link className="size-10 flex items-center justify-center bg-white border border-slate-200 rounded-full dark:bg-suface-dark dark:border-slate-800 dark:text-white">tel</Link>

            <Link className="size-10 flex items-center justify-center bg-white border border-slate-200 rounded-full dark:bg-suface-dark dark:border-slate-800 dark:text-white">git</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
