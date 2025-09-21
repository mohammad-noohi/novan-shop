import { Eye, Pencil, Trash, EllipsisVertical, Star, ChevronLeft, ChevronRight } from "lucide-react";

export default function Products() {
  return (
    <div className="min-h-screen bg-slate-100 p-5">
      <h2 className="text-2xl font-bold">Products</h2>
      <p className="text-slate-500">Manage your products as you wish!</p>
      {/* table and header and footer */}
      <div className="mt-10">
        {/* toolbar */}
        <div className="bg-white p-3 rounded-lg">
          {/* --------------- Filtering Section ------------------- */}
          <h4 className="text-xl font-semibold capitalize">filter actions</h4>
          <input className="border" type="text" placeholder="search" />
          {/* category filter */}
          <select className="border" name="" id="">
            <option value="-1">filter by category</option>
            <option value="cat1">cat1</option>
            <option value="cat2">cat2</option>
            <option value="cat3">cat3</option>
            <option value="cat4">cat4</option>
            <option value="cat5">cat5</option>
          </select>
          {/* brand filter */}
          <select className="border" name="" id="">
            <option value="-1">filtery by brand</option>
            <option value="brand1">brand1</option>
            <option value="brand2">brand2</option>
            <option value="brand3">brand3</option>
            <option value="brand4">brand4</option>
            <option value="brand5">brand5</option>
          </select>
          {/* stock filter */}
          <select className="border" name="" id="">
            <option value="-1">filter by stock status</option>
            <option value="all">all</option>
            <option value="instock">in stock</option>
            <option value="outofstock">out of stock</option>
            <option value="lowstock">low stock</option>
          </select>
          {/* discount filter */}
          <select className="border" name="" id="">
            <option value="-1">filter by discount</option>
            <option value="all">all</option>
            <option value="nodiscount">no discount</option>
            <option value="midrate">1%-10%</option>
            <option value="highrate">10%-100%</option>
          </select>
          {/* rate filter */}
          <select className="border" name="" id="">
            <option value="-1">filter by rate</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          {/* price filter */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <label htmlFor="min-price">min price: </label>
              <input type="range" min={0} />
            </div>

            <div className="flex items-center gap-1">
              <label htmlFor="min-price">max price: </label>
              <input type="range" min={0} />
            </div>
          </div>

          {/* --------------- Sortign Section ------------------- */}
          <h4 className="text-xl font-semibold capitalize">filter actions</h4>
          <select name="" id="">
            <option value="-1">sort by price</option>
          </select>

          <select name="" id="">
            <option value="-1">sort by discount</option>
          </select>

          <select name="" id="">
            <option value="-1">sort by rate</option>
          </select>

          <select name="" id="">
            <option value="-1">sort by stock</option>
          </select>

          <select name="" id="">
            <option value="-1">sort alphabetical</option>
          </select>
        </div>

        {/* header */}
        <div className="flex items-center justify-between">
          <span className="capitalize text-xl text-slate-400">total products : 200</span>

          <div>
            <label htmlFor="rows-per-page">rows per page</label>
            <select className="border" name="rows-per-page" id="rows-per-page">
              <option value="1">5</option>
              <option value="1">10</option>
              <option value="1">15</option>
              <option value="1">20</option>
              <option value="1">25</option>
              <option value="1">30</option>
            </select>
          </div>
        </div>

        {/* body */}
        <div className="overflow-x-auto">
          {/* toolbar */}

          {/* products table */}
          <table className="w-full bg-white mt-5 text-center border-separate border-spacing-0 rounded-lg overflow-hidden">
            <thead>
              <tr className="*:border *:border-slate-200 *:uppercase *:p-3 bg-slate-50">
                <th>thumbnail</th>
                <th>title</th>
                <th>category</th>
                <th>brand</th>
                <th>price</th>
                <th>discount</th>
                <th>stock</th>
                <th>rate</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody className="*:even:bg-slate-50 *:transition-colors *:hover:bg-slate-100">
              <tr className="*:border *:p-2 *:border-slate-200 ">
                <td>img</td>
                <td>iPhone 15 Pro</td>
                <td>mobile</td>
                <td>apple</td>
                <td>$384,000</td>
                <td>20%</td>
                <td>320</td>
                <td>⭐⭐⭐⭐⭐</td>
                <td className="flex items-center gap-2 justify-center">
                  <button className="text-lg capitalize rounded-lg bg-slate-300 py-1 px-4 cursor-pointer">view</button>
                  <button className="text-lg capitalize rounded-lg bg-slate-300 py-1 px-4 cursor-pointer">edit</button>
                  <button className="text-lg capitalize rounded-lg bg-slate-300 py-1 px-4 cursor-pointer">delete</button>
                </td>
              </tr>
              <tr className="*:border *:p-2 *:border-slate-200 ">
                <td>img</td>
                <td>iPhone 15 Pro</td>
                <td>mobile</td>
                <td>apple</td>
                <td>$384,000</td>
                <td>20%</td>
                <td>320</td>
                <td>⭐⭐⭐⭐⭐</td>
                <td className="flex items-center gap-2 justify-center">
                  <button className="text-lg capitalize rounded-lg bg-slate-300 py-1 px-4 cursor-pointer">view</button>
                  <button className="text-lg capitalize rounded-lg bg-slate-300 py-1 px-4 cursor-pointer">edit</button>
                  <button className="text-lg capitalize rounded-lg bg-slate-300 py-1 px-4 cursor-pointer">delete</button>
                </td>
              </tr>
              <tr className="*:border *:p-2 *:border-slate-200 ">
                <td>img</td>
                <td>iPhone 15 Pro</td>
                <td>mobile</td>
                <td>apple</td>
                <td>$384,000</td>
                <td>20%</td>
                <td>320</td>
                <td>⭐⭐⭐⭐⭐</td>
                <td className="flex items-center gap-2 justify-center">
                  <button className="text-lg capitalize rounded-lg bg-slate-300 py-1 px-4 cursor-pointer">view</button>
                  <button className="text-lg capitalize rounded-lg bg-slate-300 py-1 px-4 cursor-pointer">edit</button>
                  <button className="text-lg capitalize rounded-lg bg-slate-300 py-1 px-4 cursor-pointer">delete</button>
                </td>
              </tr>
              <tr className="*:border *:p-2 *:border-slate-200 ">
                <td>img</td>
                <td>iPhone 15 Pro</td>
                <td>mobile</td>
                <td>apple</td>
                <td>$384,000</td>
                <td>20%</td>
                <td>320</td>
                <td>⭐⭐⭐⭐⭐</td>
                <td className="flex items-center gap-2 justify-center">
                  <button className="text-lg capitalize rounded-lg bg-slate-300 py-1 px-4 cursor-pointer">view</button>
                  <button className="text-lg capitalize rounded-lg bg-slate-300 py-1 px-4 cursor-pointer">edit</button>
                  <button className="text-lg capitalize rounded-lg bg-slate-300 py-1 px-4 cursor-pointer">delete</button>
                </td>
              </tr>
              <tr className="*:border *:p-2 *:border-slate-200 ">
                <td>img</td>
                <td>iPhone 15 Pro</td>
                <td>mobile</td>
                <td>apple</td>
                <td>$384,000</td>
                <td>20%</td>
                <td>320</td>
                <td>⭐⭐⭐⭐⭐</td>
                <td className="flex items-center gap-2 justify-center">
                  <button className="text-lg capitalize rounded-lg bg-slate-300 py-1 px-4 cursor-pointer">view</button>
                  <button className="text-lg capitalize rounded-lg bg-slate-300 py-1 px-4 cursor-pointer">edit</button>
                  <button className="text-lg capitalize rounded-lg bg-slate-300 py-1 px-4 cursor-pointer">delete</button>
                </td>
              </tr>
            </tbody>
          </table>

          <div></div>
        </div>

        {/* footer */}
        <div>
          {/* pagination */}
          <div className="flex items-center gap-3 mt-5">
            <button className="size-9 font-bold flex justify-center items-center rounded-lg border border-slate-200 bg-slate-50 cursor-pointer dark:bg-suface-dark dark:border-slate-800 dark:text-white disabled:opacity-30 disabled:cursor-not-allowed">
              <ChevronLeft className="size-4" />
            </button>
            <button
              className={`size-9 font-bold flex justify-center items-center rounded-lg border border-slate-200 bg-slate-50 cursor-pointer dark:bg-suface-dark dark:border-slate-800 dark:text-white `}>
              1
            </button>
            <button
              className={` size-9 font-bold flex justify-center items-center rounded-lg border border-slate-200 bg-slate-300 cursor-pointer dark:bg-suface-dark dark:border-slate-800 dark:text-white `}>
              2
            </button>
            <button
              className={`size-9 font-bold flex justify-center items-center rounded-lg border border-slate-200 bg-slate-50 cursor-pointer dark:bg-suface-dark dark:border-slate-800 dark:text-white `}>
              3
            </button>
            <button className="size-9 font-bold flex justify-center items-center rounded-lg border border-slate-200 bg-slate-50 cursor-pointer dark:bg-suface-dark dark:border-slate-800 dark:text-white disabled:opacity-30 disabled:cursor-not-allowed">
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 

فیلترهای پرکاربرد توی داشبورد محصول



وضعیت انتشار (Publish Status)

فعال (نمایش در سایت)

پیش‌نویس

آرشیو






تاریخ ایجاد / آخرین تغییر (Date Created / Updated)

امروز، این هفته، این ماه

🔽 مرتب‌سازی‌های پرکاربرد

جدیدترین محصولات (Newest First)

بر اساس تاریخ ایجاد

قدیمی‌ترین محصولات (Oldest First)

گران‌ترین به ارزان‌ترین (Price High → Low)

ارزان‌ترین به گران‌ترین (Price Low → High)

بیشترین موجودی (Stock High → Low)

کمترین موجودی (Stock Low → High)

بیشترین فروش (Most Sold)

💡 نکته:
این فیلترها رو معمولاً بالای جدول محصولات (Table) می‌ذارن، به صورت Select یا Dropdown، و مرتب‌سازی رو به شکل Sort by منوی جدا یا روی ستون جدول (sortable columns) پیاده می‌کنن
*/
