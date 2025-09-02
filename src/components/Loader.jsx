// صرفا نوشتم شاید نیاز بشه شایدم نشه البته دلم میخواد پیج ترنزیشن درست کنم

// import { createPortal } from "react-dom";

// export default function Loader() {
//   return createPortal(
//     <div className="fixed z-30 inset-0 w-screen h-screen bg-white/50 backdrop-blur-sm flex justify-center items-center dark:bg-black/50">
//       <div className="flex items-center gap-3">
//         <div className="size-8 border-4 border-indigo-300 border-t-brand rounded-full animate-spin dark:border-brand dark:border-t-indigo-300"></div>
//         <span className="dark:text-white">Loading...</span>
//       </div>
//     </div>,
//     document.querySelector("#loader-root")
//   );
// }

export default function Loader() {
  return (
    <div className="fixed z-30 inset-0 w-screen h-screen bg-white/50 backdrop-blur-sm flex justify-center items-center dark:bg-black/50">
      <div className="flex items-center gap-3">
        <div className="size-8 border-4 border-indigo-300 border-t-brand rounded-full animate-spin dark:border-brand dark:border-t-indigo-300"></div>
        <span className="dark:text-white">Loading...</span>
      </div>
    </div>
  );
}
