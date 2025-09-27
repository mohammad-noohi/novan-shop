import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CustomPagination({ pages, currentPage, onPrevPage, onNextPage, onChangePage }) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onPrevPage}
        disabled={currentPage === 1}
        className="size-9 font-bold flex justify-center items-center rounded-lg border border-slate-200 bg-slate-50 cursor-pointer dark:bg-suface-dark dark:border-slate-800 dark:text-white disabled:opacity-30 disabled:cursor-not-allowed">
        <ChevronLeft className="size-4" />
      </button>
      {Array.from({ length: pages }, (_, i) => (
        <button
          key={i}
          onClick={() => onChangePage(i + 1)}
          className={`size-9 font-bold flex justify-center items-center rounded-lg border border-slate-200 dark:border-slate-800  ${
            i + 1 === currentPage ? "bg-slate-500 text-white dark:bg-slate-700" : "bg-slate-50 dark:bg-suface-dark"
          } cursor-pointer dark:text-white `}>
          {i + 1}
        </button>
      ))}

      <button
        onClick={onNextPage}
        disabled={currentPage === pages}
        className="size-9 font-bold flex justify-center items-center rounded-lg border border-slate-200 bg-slate-50 cursor-pointer dark:bg-suface-dark dark:border-slate-800 dark:text-white disabled:opacity-30 disabled:cursor-not-allowed">
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}

/* 
pages : number ,
currenPage : number ,
other : function
*/
