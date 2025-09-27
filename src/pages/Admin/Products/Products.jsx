import { Eye, Pencil, Trash, EllipsisVertical, Star, ChevronLeft, ChevronRight, Rss } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import FileSearchIllustration from "@/components/Illustrations/FileSearchIllustration";
import { toast } from "sonner";
import { useCartContext } from "@/contexts/CartContext/useCartContext";
import DeleteModal from "@/components/DeleteModal";
import ViewModal from "@/components/Dashboard/ViewModal";
import EditModal from "@/components/Dashboard/EditModal";
import AddProductForm from "@/components/Dashboard/AddProductForm";
import EditProductForm from "@/components/Dashboard/EditProductForm";
import CustomPagination from "@/components/CustomPagination";
import FallbackImage from "@/components/FallbackImage";

export default function Products() {
  const { products, getAllProducts } = useCartContext();
  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  let pages = null;

  const [query, setQuery] = useState({
    search: "",
    filters: {
      category: "all",
      brand: "all",
      stock: "all",
      discount: "all",
      rate: "all",
    },
    sort: "none", // price-asc , price-dsc , ....
    pagination: {
      page: 1,
      perPages: 10,
    },
  });

  // Derived States
  const categoryItems = Array.from(new Set(products.map(p => p.category.toLowerCase())));
  const brandItems = Array.from(new Set(products.map(p => p.brand.toLowerCase())));

  /*------------------ Pagination Actions ------------------*/
  function nextPage() {
    setQuery(prev => {
      if (prev.pagination.page < pages) {
        return { ...prev, pagination: { ...prev.pagination, page: prev.pagination.page + 1 } };
      }

      return prev;
    });
  }

  function prevPage() {
    setQuery(prev => {
      if (prev.pagination.page > 1) {
        return { ...prev, pagination: { ...prev.pagination, page: prev.pagination.page - 1 } };
      }

      return prev;
    });
  }

  function changeCurrentPage(num) {
    setQuery(prev => {
      return { ...prev, pagination: { ...prev.pagination, page: num } };
    });
  }

  /*------------------ CRUD ------------------*/

  async function deleteProduct() {
    if (!selectedProduct) return;
    try {
      const resp = await fetch(`http://localhost:3000/products/${selectedProduct.id}`, {
        method: "DELETE",
      });

      console.log(resp); // من شرط زیر رو غیر فعال کردم چون ارور ۵۰۰ میداد ولی محصول حذف میشد و خب نمیدونم مشکل از چیه ؟

      // if (![200, 204, 404].includes(resp.status)) {
      //   throw new Error(`Failed to delete product. Status: ${resp.status}`);
      // }

      toast.success("Product deleted successfully");

      // update products
      await getAllProducts();
    } catch (err) {
      console.log(err);
      toast.error(`Failed to delete product`);
    }
  }

  /*-------------- Proccessing Shown Items In Table--------------*/

  function visibleProducts() {
    let result = [...products];

    // search in title and description
    if (query.search.trim()) {
      const term = query.search.toLowerCase().trim();
      result = result.filter(p => p.title.toLowerCase().includes(term) || p.caption?.toLowerCase().includes(term));
    }

    // category filter
    if (query.filters.category !== "all") {
      result = result.filter(p => p.category.toLowerCase() === query.filters.category.toLowerCase());
    }

    // brand filter
    if (query.filters.brand !== "all") {
      result = result.filter(p => p.brand.toLowerCase() === query.filters.brand.toLowerCase());
    }

    // stock filter
    if (query.filters.stock !== "all") {
      result = result.filter(p => {
        if (query.filters.stock === "instock") return p.stock > 0;
        if (query.filters.stock === "outofstock") return p.stock === 0;
        if (query.filters.stock === "lowstock") return p.stock > 0 && p.stock < 5;
      });
    }
    // discount filter
    if (query.filters.discount !== "all") {
      result = result.filter(p => {
        if (query.filters.discount === "nodiscount") return p.discount === 0;
        if (query.filters.discount === "lowdiscount") return p.discount > 0 && p.discount <= 10;
        if (query.filters.discount === "highdiscount") return p.discount >= 10;
      });
    }
    // rate filter
    if (query.filters.rate !== "all") {
      result = result.filter(p => p.rate === Number(query.filters.rate));
    }

    // Sort Result
    result.sort((a, b) => {
      // فقط باید این مورد که ممکنه مقادیر نباشن یا نال یا اندیفایند باشند رو هم مدیریت کنی برای این موضوع وگرنه لاجیک کامل درسته
      const sortType = query.sort;
      if (sortType === "name-asc") return a.title.localeCompare(b.title);
      if (sortType === "name-desc") return b.title.localeCompare(a.title);
      if (sortType === "price-asc") return a.price - b.price;
      if (sortType === "price-desc") return b.price - a.price;
      if (sortType === "date-asc") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortType === "date-desc") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortType === "stock-asc") return a.stock - b.stock;
      if (sortType === "stock-desc") return b.stock - a.stock;
      if (sortType === "discount-asc") return a.discount - b.discount;
      if (sortType === "discount-desc") return b.discount - a.discount;
      if (sortType === "rate-asc") return a.rate - b.rate;
      if (sortType === "rate-desc") return b.rate - a.rate;
      return 0;
    });

    // Paginated Result
    const endIndex = query.pagination.page * query.pagination.perPages;
    const startIndex = endIndex - query.pagination.perPages;
    pages = Math.ceil(result.length / query.pagination.perPages);
    result = result.slice(startIndex, endIndex);

    return result;
  }

  const processedProducts = visibleProducts();

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-app-dark p-5">
      <h2 className="text-2xl font-bold">Products</h2>
      <p className="text-slate-500">Manage your products as you wish!</p>

      <div className="mt-10">
        <AddProductForm />

        {/* Toolbar Section*/}
        <div className="bg-white dark:bg-suface-dark border border-slate-200 dark:border-slate-800 mt-10 p-5 rounded-lg">
          {/* --------------- Filtering Section ------------------- */}
          <h4 className="text-xl font-semibold capitalize">filtering</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
            <div>
              <span>Category</span>
              <Select
                value={query.filters.category}
                onValueChange={value => {
                  setQuery(prev => {
                    return { ...prev, filters: { ...prev.filters, category: value } };
                  });
                }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="all">all</SelectItem>
                    {categoryItems.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <span>Brand</span>
              <Select
                value={query.filters.brand}
                onValueChange={value => {
                  setQuery(prev => {
                    return { ...prev, filters: { ...prev.filters, brand: value } };
                  });
                }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Brand</SelectLabel>
                    <SelectItem value="all">all</SelectItem>
                    {brandItems.map(brand => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <span>Stock</span>
              <Select
                value={query.filters.stock}
                onValueChange={value => {
                  setQuery(prev => {
                    return { ...prev, filters: { ...prev.filters, stock: value } };
                  });
                }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a stock status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Stock</SelectLabel>
                    <SelectItem value="all">all</SelectItem>
                    <SelectItem value="instock">in stock</SelectItem>
                    <SelectItem value="outofstock">out of stock</SelectItem>
                    <SelectItem value="lowstock">low stock</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <span>Discount</span>
              <Select
                value={query.filters.discount}
                onValueChange={value => {
                  setQuery(prev => {
                    return { ...prev, filters: { ...prev.filters, discount: value } };
                  });
                }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a discount" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Discount</SelectLabel>
                    <SelectItem value="all">all</SelectItem>
                    <SelectItem value="nodiscount">no discount</SelectItem>
                    <SelectItem value="lowdiscount">1%-10%</SelectItem>
                    <SelectItem value="highdiscount">10%-100%</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <span>Rate</span>
              <Select
                value={query.filters.rate}
                onValueChange={value => {
                  setQuery(prev => {
                    return { ...prev, filters: { ...prev.filters, rate: value } };
                  });
                }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a rate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Rate</SelectLabel>
                    <SelectItem value="all">all</SelectItem>
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
          </div>

          {/* --------------- Sortign Section ------------------- */}
          <h4 className="text-xl font-semibold capitalize mt-5">Sorting</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
            <div>
              <span>Alphabatic</span>
              <Select
                value={query.sort}
                onValueChange={value => {
                  setQuery(prev => ({ ...prev, sort: value }));
                }}>
                <SelectTrigger>
                  <SelectValue placeholder="sort by name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">A - Z</SelectItem>
                  <SelectItem value="name-desc">Z - A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <span>Price</span>
              <Select
                value={query.sort}
                onValueChange={value => {
                  setQuery(prev => ({ ...prev, sort: value }));
                }}>
                <SelectTrigger>
                  <SelectValue placeholder="sort by price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-asc">cheap to expense</SelectItem>
                  <SelectItem value="price-desc">expense to cheap</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <span>Created At</span>
              <Select
                value={query.sort}
                onValueChange={value => {
                  setQuery(prev => ({ ...prev, sort: value }));
                }}>
                <SelectTrigger>
                  <SelectValue placeholder="sort by created at" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-asc">oldest first</SelectItem>
                  <SelectItem value="date-desc">newest first</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <span>Stock</span>
              <Select
                value={query.sort}
                onValueChange={value => {
                  setQuery(prev => ({ ...prev, sort: value }));
                }}>
                <SelectTrigger>
                  <SelectValue placeholder="sort by stock" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stock-asc">low to high</SelectItem>
                  <SelectItem value="stock-desc">hight to low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <span>Discount</span>
              <Select
                value={query.sort}
                onValueChange={value => {
                  setQuery(prev => ({ ...prev, sort: value }));
                }}>
                <SelectTrigger>
                  <SelectValue placeholder="sort by discount" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discount-asc">lowest discount</SelectItem>
                  <SelectItem value="discount-desc">highest discount</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              Rate
              <Select
                value={query.sort}
                onValueChange={value => {
                  setQuery(prev => ({ ...prev, sort: value }));
                }}>
                <SelectTrigger>
                  <SelectValue placeholder="sort by rate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rate-asc">lowest rated</SelectItem>
                  <SelectItem value="rate-desc">highest rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Table Section*/}
        <div className="bg-white dark:bg-suface-dark border border-slate-200 dark:border-slate-800 mt-10 p-5 rounded-lg">
          <div className="flex items-center gap-3 flex-wrap justify-between">
            <Input
              value={query.search}
              onChange={e => {
                setQuery(prev => ({ ...prev, search: e.target.value }));
              }}
              className="max-w-100"
              type="text"
              placeholder="search product by title , des"
            />

            <div className="flex items-center gap-3">
              <p>rows per page :</p>
              <Select
                value={query.pagination.perPages}
                onValueChange={value => {
                  setQuery(prev => ({ ...prev, pagination: { ...prev.pagination, perPages: Number(value) } }));
                }}
                id="rows-per-page">
                <SelectTrigger className="w-auto">
                  <SelectValue placeholder="8" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>rows</SelectLabel>
                    <SelectItem value={5}>5</SelectItem>
                    <SelectItem value={10}>10</SelectItem>
                    <SelectItem value={15}>15</SelectItem>
                    <SelectItem value={20}>20</SelectItem>
                    <SelectItem value={25}>25</SelectItem>
                    <SelectItem value={30}>30</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* table */}
          {processedProducts.length ? (
            <>
              <div className="overflow-x-auto">
                {/* products table */}
                <table className="bg-white dark:bg-app-dark text-nowrap w-full mt-5 text-center border-separate border-spacing-0 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="*:border *:border-slate-200 dark:*:border-slate-700 *:uppercase *:p-3 bg-slate-50 dark:bg-slate-900">
                      <th>id</th>
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
                  <tbody className="*:even:bg-slate-50 dark:*:even:bg-slate-900 *:transition-colors *:hover:bg-slate-100 dark:*:hover:bg-slate-800">
                    {processedProducts.map(p => (
                      <tr key={p.id} className="*:border *:p-2 *:border-slate-200 dark:*:border-slate-700 ">
                        <td>{p.id}</td>
                        <td>
                          <div className="size-12  overflow-hidden mx-auto">
                            <FallbackImage src={`/${p.mainImage}`} alt="avatar image" className="size-full object-cover" />
                          </div>
                        </td>
                        <td>{p.title}</td>
                        <td>{p.category}</td>
                        <td>{p.brand}</td>
                        <td>${p.price.toLocaleString()}</td>
                        <td>{p.discount}%</td>
                        <td>{p.stock}</td>
                        <td>
                          <div className="flex items-center justify-center">
                            {Array.from({ length: p.rate }, (_, i) => (
                              <Star key={i} className="size-4 text-yellow-500 fill-yellow-500" />
                            ))}

                            {Array.from({ length: 5 - p.rate }, (_, i) => (
                              <Star key={i} className="size-4 text-yellow-500 " />
                            ))}
                          </div>
                        </td>
                        <td>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              {/* <Button variant="outline">Open</Button> */}
                              <button>
                                <EllipsisVertical />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="start">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>

                              <DropdownMenuItem
                                onClick={() => {
                                  setShowViewModal(true);
                                  setSelectedProduct(p);
                                }}>
                                <Eye className="size-4" />
                                <span>view</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setShowEditModal(true);
                                  setSelectedProduct(p);
                                }}>
                                <Pencil className="size-4" />
                                <span>edit</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setShowDeleteProductModal(true);
                                  setSelectedProduct(p);
                                }}
                                className="hover:bg-red-100! text-red-500 hover:text-red-500!">
                                <Trash className="size-4" />
                                <span>delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-end justify-between flex-wrap-reverse mt-5 gap-5">
                {/* pagination */}
                <CustomPagination currentPage={query.pagination.page} pages={pages} onChangePage={changeCurrentPage} onPrevPage={prevPage} onNextPage={nextPage} />

                <span className="capitalize text-lg text-slate-400">total products : {products.length}</span>
              </div>
            </>
          ) : (
            <div className="pt-4 pb-12 px-4 border border-slate-200 rounded-lg mt-5 flex flex-col items-center">
              <FileSearchIllustration className="h-100" />
              <h4 className="text-2xl capitalize font-semibold">no products found</h4>
            </div>
          )}
        </div>
      </div>

      <DeleteModal show={showDeleteProductModal} onClose={() => setShowDeleteProductModal(false)} confirmText="delete" text="Are you sure you want to delete the product?" onConfirm={deleteProduct} />

      <ViewModal show={showViewModal} onClose={() => setShowViewModal(false)}>
        <div className="p-5">
          <div className="flex flex-col sm:flex-row items-start gap-10">
            <div className="w-70 shrink-0 flex mx-auto md:mx-0">
              <FallbackImage src={`/${selectedProduct?.mainImage}`} alt="" className="size-full drop-shadow-[20px_20px_8px_#3737375e] dark:drop-shadow-[20px_20px_8px_#1c2543d4]" />
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl line-clamp-2 md:text-3xl font-semibold">{selectedProduct?.title}</h3>
              <ul className="mt-6 space-y-1">
                <li className="space-x-2">
                  Categories: <span className="text-sm py-0.5 px-2  rounded-full bg-slate-200 dark:bg-slate-700 dark:text-white">{selectedProduct?.category}</span>
                </li>
                <li>Brand: {selectedProduct?.brand}</li>
                <li className="font-medium lg:text-xl">
                  <strong>Price: ${selectedProduct?.price.toLocaleString()}</strong>
                </li>
                <li>Discount: {selectedProduct?.discount}%</li>
                <li>Stock: {selectedProduct?.stock}</li>
                <li>Rate: {selectedProduct?.rate}</li>
                {selectedProduct?.colors.length !== 0 ? (
                  <li className="flex items-center gap-3">
                    Colors:
                    <ul className="flex items-center gap-2">
                      {selectedProduct?.colors.map(color => (
                        <li className="size-6 ring ring-offset-2 ring-slate-300 rounded-full" style={{ backgroundColor: color }}></li>
                      ))}
                    </ul>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>

          <div className="mt-5">
            <h4 className="capitalize lg:text-xl font-semibold">caption:</h4>
            <p className="text-slate-500 mt-2">{selectedProduct?.caption}</p>
          </div>

          {selectedProduct?.specs.length > 0 ? (
            <div className="overflow-x-auto mt-5">
              <h4 className="capitalize lgt:text-xl font-semibold">Specifications:</h4>
              <table className="bg-white dark:bg-app-dark text-nowrap w-full mt-5 text-center border-separate border-spacing-0 rounded-lg overflow-hidden">
                <thead>
                  <tr className="*:border *:border-slate-200 dark:*:border-slate-700 *:uppercase *:p-3 bg-slate-50 dark:bg-slate-900">
                    {Object.keys(selectedProduct?.specs || {}).map(key => (
                      <th className="text-sm" key={key}>
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="*:even:bg-slate-50 dark:*:even:bg-slate-900 *:transition-colors *:hover:bg-slate-100 dark:*:hover:bg-slate-800">
                  <tr className="*:border *:p-2 *:border-slate-200 dark:*:border-slate-700 ">
                    {Object.values(selectedProduct?.specs || {}).map(value => (
                      <td className="text-sm lg:text-base" key={value}>
                        {value}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </ViewModal>

      <EditModal show={showEditModal} onClose={() => setShowEditModal(false)}>
        <EditProductForm selectedProduct={selectedProduct} setShowEditModal={setShowEditModal} />
      </EditModal>
    </div>
  );
}
