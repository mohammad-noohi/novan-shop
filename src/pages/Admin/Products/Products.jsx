import { Eye, Pencil, Trash, EllipsisVertical, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Products() {
  return (
    <div className="min-h-screen bg-slate-100 p-5">
      <h2 className="text-2xl font-bold">Products</h2>
      <p className="text-slate-500">Manage your products as you wish!</p>

      <div className="mt-10">
        {/* Product Form */}
        <div className="bg-white p-5 rounded-lg">
          <h4 className="text-xl font-semibold capitalize">add product</h4>
          <form className="mt-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div>
                <Input type="text" placeholder="title" />
              </div>
              <div>
                <Input type="text" list="cateogries" placeholder="category" />
                <datalist id="cateogries">
                  <option value="laptop">laptop</option>
                  <option value="smartphone">smartphone</option>
                </datalist>
              </div>
              <div>
                <Input type="text" list="brands" placeholder="brand" />
                <datalist id="brands">
                  <option value="asus">asus</option>
                  <option value="lenovo">lenovo</option>
                </datalist>
              </div>
              <div>
                <Input type="number" min={1} placeholder="price" />
              </div>
              <div>
                <Input type="number" min={0} max={100} placeholder="discount percent" />
              </div>
              <div>
                <Input type="number" min={1} placeholder="stock" />
              </div>
              <div>
                <Input type="number" min={1} max={5} placeholder="rate" />
              </div>
            </div>

            <button className="py-1 px-4 mt-5 bg-slate-200 rounded-lg text-lg capitalize cursor-pointer hover:bg-slate-300  transition-colors">add product</button>
          </form>
        </div>

        {/* Toolbar Section*/}
        <div className="bg-white mt-10 p-5 rounded-lg">
          {/* --------------- Filtering Section ------------------- */}
          <h4 className="text-xl font-semibold capitalize">filtering</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
            {/* category filter */}
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="laptop">laptop</SelectItem>
                  <SelectItem value="smartphone">smartphone</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {/* brand filter */}
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Brand</SelectLabel>
                  <SelectItem value="laptop">laptop</SelectItem>
                  <SelectItem value="smartphone">smartphone</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {/* stock filter */}
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a stock status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Brand</SelectLabel>
                  <SelectItem value="all">all</SelectItem>
                  <SelectItem value="instock">in stock</SelectItem>
                  <SelectItem value="outofstock">out of stock</SelectItem>
                  <SelectItem value="lowstock">low stock</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {/* discount filter */}
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a discount" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Discount</SelectLabel>
                  <SelectItem value="all">all</SelectItem>
                  <SelectItem value="nodiscount">no discount</SelectItem>
                  <SelectItem value="midrate">1%-10%</SelectItem>
                  <SelectItem value="highrate">10%-100%</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {/* rate filter */}
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a rate" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Rate</SelectLabel>
                  <SelectItem value="1">
                    <Star className="size-4 text-yellow-500 fill-yellow-500" />
                  </SelectItem>
                  <SelectItem value="2">
                    <div className="flex items-center">
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                    </div>
                  </SelectItem>
                  <SelectItem value="3">
                    <div className="flex items-center">
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                    </div>
                  </SelectItem>
                  <SelectItem value="4">
                    <div className="flex items-center">
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                    </div>
                  </SelectItem>
                  <SelectItem value="5">
                    <div className="flex items-center">
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                    </div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* --------------- Sortign Section ------------------- */}
          <h4 className="text-xl font-semibold capitalize mt-5">Sorting</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="sort by name" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">A - Z</SelectItem>
                <SelectItem value="name-desc">Z - A</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="sort by price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">cheap to expense</SelectItem>
                <SelectItem value="price-desc">expense to cheap</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="sort by created at" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-asc">oldest first</SelectItem>
                <SelectItem value="date-desc">newest first</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="sort by stock" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stock-asc">low to high</SelectItem>
                <SelectItem value="stock-desc">hight to low</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="sort by discount" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="discount-asc">lowest discount</SelectItem>
                <SelectItem value="discount-desc">highest discount</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="sort by rate" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rate-asc">lowest rated</SelectItem>
                <SelectItem value="rate-desc">highest rated</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="sort by sale" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sale-asc">least selling</SelectItem>
                <SelectItem value="sale-desc">best selling</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table Section*/}
        <div className="bg-white mt-10 p-5 rounded-lg">
          <div className="flex items-center gap-3 flex-wrap justify-between">
            <Input className="max-w-100" type="search" placeholder="search product by title , des" />

            <div className="flex items-center gap-3">
              <p>rows per page :</p>
              <Select id="rows-per-page">
                <SelectTrigger className="w-auto">
                  <SelectValue placeholder="8" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>rows</SelectLabel>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="30">30</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* table */}
          <div className="overflow-x-auto">
            {/* products table */}
            <table className="w-full text-nowrap bg-white mt-5 text-center border-separate border-spacing-0 rounded-lg overflow-hidden">
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
                  <th></th>
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
                  <td>
                    <div className="flex items-center justify-center">
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                    </div>
                  </td>
                  <td className="flex items-center gap-2 justify-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        {/* <Button variant="outline">Open</Button> */}
                        <button>
                          <EllipsisVertical />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="start">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>

                        <DropdownMenuItem>
                          <Eye className="size-4" />
                          <span>view</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="size-4" />
                          <span>edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-red-100! text-red-500 hover:text-red-500!">
                          <Trash className="size-4" />
                          <span>delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
                  <td>
                    <div className="flex items-center justify-center">
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                    </div>
                  </td>
                  <td className="flex items-center gap-2 justify-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        {/* <Button variant="outline">Open</Button> */}
                        <button>
                          <EllipsisVertical />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="start">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>

                        <DropdownMenuItem>
                          <Eye className="size-4" />
                          <span>view</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="size-4" />
                          <span>edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-red-100! text-red-500 hover:text-red-500!">
                          <Trash className="size-4" />
                          <span>delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
                  <td>
                    <div className="flex items-center justify-center">
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                    </div>
                  </td>
                  <td className="flex items-center gap-2 justify-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        {/* <Button variant="outline">Open</Button> */}
                        <button>
                          <EllipsisVertical />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="start">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>

                        <DropdownMenuItem>
                          <Eye className="size-4" />
                          <span>view</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="size-4" />
                          <span>edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-red-100! text-red-500 hover:text-red-500!">
                          <Trash className="size-4" />
                          <span>delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
                  <td>
                    <div className="flex items-center justify-center">
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                    </div>
                  </td>
                  <td className="flex items-center gap-2 justify-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        {/* <Button variant="outline">Open</Button> */}
                        <button>
                          <EllipsisVertical />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="start">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>

                        <DropdownMenuItem>
                          <Eye className="size-4" />
                          <span>view</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="size-4" />
                          <span>edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-red-100! text-red-500 hover:text-red-500!">
                          <Trash className="size-4" />
                          <span>delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
                  <td>
                    <div className="flex items-center justify-center">
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                      <Star className="size-4 text-yellow-500 fill-yellow-500" />
                    </div>
                  </td>
                  <td className="flex items-center gap-2 justify-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        {/* <Button variant="outline">Open</Button> */}
                        <button>
                          <EllipsisVertical />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="start">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>

                        <DropdownMenuItem>
                          <Eye className="size-4" />
                          <span>view</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="size-4" />
                          <span>edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-red-100! text-red-500 hover:text-red-500!">
                          <Trash className="size-4" />
                          <span>delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex items-end justify-between flex-wrap-reverse mt-5 gap-5">
            {/* pagination */}
            <div className="flex items-center gap-3">
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

            <span className="capitalize text-lg text-slate-400">total products : 200</span>
          </div>
        </div>
      </div>
    </div>
  );
}
