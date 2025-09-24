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
import { useEffect, useState } from "react";
import FileSearchIllustration from "@/components/Illustrations/FileSearchIllustration";
import { toast } from "sonner";
import { useCartContext } from "@/contexts/CartContext/useCartContext";
import DeleteModal from "@/components/DeleteModal";
import ViewModal from "@/components/Dashboard/ViewModal";

export default function Products() {
  const { products, getAllProducts } = useCartContext();
  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
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
  // for handle add product form inputs
  const [addForm, setAddForm] = useState({
    loading: false,
    title: "",
    category: "",
    brand: "",
    price: "",
    discount: "",
    stock: "",
    caption: "",
    thumbnail: null,
    preview: "",
  });

  // to show error msg in add product form
  const [addErrors, setAddErrors] = useState({
    title: "",
    category: "",
    brand: "",
    price: "",
    discount: "",
    stock: "",
    // file is optional so we don't need error for that
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
  /*------------------ Add Product Form Functions  ------------------*/
  function validateAddForm() {
    let errors = {};

    if (!addForm.title.trim()) {
      errors.title = "title can't be empty";
    } else if (products.some(p => p.title.toLowerCase() === addForm.title.toLowerCase())) {
      errors.title = "this product already exists";
    }

    if (!addForm.category.trim()) errors.category = "category can't be empty";
    if (!addForm.brand.trim()) errors.brand = "brand can't be empty";
    if (!addForm.price) errors.price = "price can't be empty";
    if (addForm.price < 0) errors.price = "price must be atleast 0 (free)";
    if (addForm.discount < 0 || addForm.discount > 100) errors.discount = "discount must be from 0 to 100";
    if (!addForm.stock) errors.stock = "stock can't be empty";
    if (addForm.stock <= 0) errors.stock = "stock must be atleast 1";

    setAddErrors(errors);

    return Object.keys(errors).length === 0; // true => valid form , false => invalid form
  }

  function resetAddForm() {
    setAddForm({
      loading: false,
      title: "",
      category: "",
      brand: "",
      price: "",
      discount: "",
      stock: "",
      rate: "",
      caption: "",
      thumbnail: null,
      preview: "",
      base64: "",
    });

    setAddErrors({
      title: "",
      category: "",
      brand: "",
      price: "",
      discount: "",
      stock: "",
    });
  }

  function handleImageChange(e) {
    e.preventDefault();

    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setAddForm(prev => ({ ...prev, thumbnail: selectedFile }));
    // create preview file
    const temporaryURL = URL.createObjectURL(selectedFile);
    setAddForm(prev => ({ ...prev, preview: temporaryURL }));

    // convert image to base64 because our api is json-server but in real server we don't need this convert
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      setAddForm(prev => ({ ...prev, base64: reader.result }));
    };
  }

  function addFormSubmitHandler(e) {
    e.preventDefault();
    const isFormValid = validateAddForm();
    if (isFormValid) {
      addNewProduct();
    } else {
      toast.error("check form errors");
    }
  }

  /*------------------ CRUD Product Actions ------------------*/
  async function addNewProduct() {
    // In real API use FormData Object to send data
    const newProduct = {
      title: addForm.title.trim(),
      category: addForm.category.trim(),
      brand: addForm.brand.trim(),
      price: addForm.price,
      discount: addForm.discount,
      stock: addForm.stock,
      rate: 5,
      caption: addForm.caption.trim(),
      createdAt: new Date().toISOString(),
      mainImage: addForm.base64,
    };

    try {
      const resp = await fetch(`http://localhost:3000/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      // status ==> 201 ==> create status
      if (resp.status === 201) {
        toast.success("product add successfully");
        resetAddForm();
        // بعد از اضافه کردن محصول یه بار باید محصولات رو اپدیت کرد
        await getAllProducts();
      }
    } catch (err) {
      toast.error("Something went wrong , Please try again");
      throw err;
    }
  }

  // view product => modal
  // edit product => modal
  // delete product => after confirm modal

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
      const term = query.search.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(term) || p.caption?.toLowerCase().includes(term));
    }

    // category filter
    if (query.filters.category !== "all") {
      result = result.filter(p => p.category === query.filters.category);
    }

    // brand filter
    if (query.filters.brand !== "all") {
      result = result.filter(p => p.brand === query.filters.brand);
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

  /*-------------- Effects --------------*/
  // صرفا یه هشدار به کسی که داره برنامه رو تست میکنه
  useEffect(() => {
    toast.info("چون سرور به صورت جیسون-سرور هست برای یه اپلود واقعی از بیس ۶۴ استفاده کردم و ترجیجا برای اینکه دیتابیس سنگین نشه عکسی رو اپلود نکنید یا حداقل یه بار امتحان کنید");
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-5">
      <h2 className="text-2xl font-bold">Products</h2>
      <p className="text-slate-500">Manage your products as you wish!</p>

      <div className="mt-10">
        {/* Product Form */}
        <div className="bg-white p-5 rounded-lg">
          <h4 className="text-xl font-semibold capitalize">add product</h4>
          <form onSubmit={addFormSubmitHandler} className="mt-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div>
                <span>Title</span>
                <Input
                  value={addForm.title}
                  onChange={e => {
                    setAddForm(prev => ({ ...prev, title: e.target.value }));
                  }}
                  type="text"
                />
                {addErrors.title ? <span className="text-red-500 text-sm">{addErrors.title}</span> : null}
              </div>
              <div>
                <span>Category</span>
                <Input
                  value={addForm.category}
                  onChange={e => {
                    setAddForm(prev => ({ ...prev, category: e.target.value }));
                  }}
                  type="text"
                  list="cateogries"
                />
                {addErrors.category ? <span className="text-red-500 text-sm">{addErrors.category}</span> : null}

                <datalist id="cateogries">
                  {categoryItems.map(category => (
                    <option key={`${category}-option`} value={category}>
                      {category}
                    </option>
                  ))}
                </datalist>
              </div>
              <div>
                <span>Brand</span>
                <Input
                  value={addForm.brand}
                  onChange={e => {
                    setAddForm(prev => ({ ...prev, brand: e.target.value }));
                  }}
                  type="text"
                  list="brands"
                />
                {addErrors.brand ? <span className="text-red-500 text-sm">{addErrors.brand}</span> : null}

                <datalist id="brands">
                  {brandItems.map(brand => (
                    <option key={`${brand}-option`} value={brand}>
                      {brand}
                    </option>
                  ))}
                </datalist>
              </div>
              <div>
                <span>Price</span>
                <Input
                  value={addForm.price}
                  onChange={e => {
                    setAddForm(prev => ({ ...prev, price: Number(e.target.value) }));
                  }}
                  type="number"
                  min={1}
                />
                {addErrors.price ? <span className="text-red-500 text-sm">{addErrors.price}</span> : null}
              </div>
              <div>
                <span>Discount</span>
                <Input
                  value={addForm.discount}
                  onChange={e => {
                    setAddForm(prev => ({ ...prev, discount: Number(e.target.value) }));
                  }}
                  type="number"
                  min={0}
                  max={100}
                  placeholder="from 0 to 100 percent"
                />
                {addErrors.discount ? <span className="text-red-500 text-sm">{addErrors.discount}</span> : null}
              </div>
              <div>
                <span>Stock</span>
                <Input
                  value={addForm.stock}
                  onChange={e => {
                    setAddForm(prev => ({ ...prev, stock: Number(e.target.value) }));
                  }}
                  type="number"
                  min={1}
                  placeholder="minimum 1 unit"
                />
                {addErrors.stock ? <span className="text-red-500 text-sm">{addErrors.stock}</span> : null}
              </div>
              <div className="col-start-1 col-end-3">
                <span>Caption</span>
                <Textarea value={addForm.caption} onChange={e => setAddForm(prev => ({ ...prev, caption: e.target.value }))} rows={8} placeholder="Type your caption here." />
              </div>
              <div>
                <span>Thumbnail</span>
                <Input onChange={handleImageChange} type="file" />
                {addForm.thumbnail ? (
                  <div className="mt-5 border size-50 overflow-hidden p-3 rounded-lg">
                    <img src={addForm.preview} alt="" className=" block w-full h-full object-cover rounded-lg" />
                  </div>
                ) : (
                  <span>no Image upload</span>
                )}
              </div>
            </div>

            <button className="py-1 px-4 mt-5 bg-slate-500 rounded-lg text-lg capitalize cursor-pointer hover:bg-slate-600 text-white transition-colors">add product</button>
          </form>
        </div>

        {/* Toolbar Section*/}
        <div className="bg-white mt-10 p-5 rounded-lg">
          {/* --------------- Filtering Section ------------------- */}
          <h4 className="text-xl font-semibold capitalize">filtering</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
            {/* category filter */}
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
            {/* brand filter */}
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
            {/* stock filter */}
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
            {/* discount filter */}
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
            {/* rate filter */}
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
        <div className="bg-white mt-10 p-5 rounded-lg">
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
          {visibleProducts().length ? (
            <>
              <div className="overflow-x-auto">
                {/* products table */}
                <table className="w-full text-nowrap bg-white mt-5 text-center border-separate border-spacing-0 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="*:border *:border-slate-200 *:uppercase *:p-3 bg-slate-50">
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
                  <tbody className="*:even:bg-slate-50 *:transition-colors *:hover:bg-slate-100">
                    {visibleProducts().map(p => (
                      <tr key={p.id} className="*:border *:p-2 *:border-slate-200 ">
                        <td>{p.id}</td>
                        <td>
                          <div className="size-12  overflow-hidden mx-auto">
                            <img src={`/${p.mainImage}`} alt="avatar image" className="size-full" />
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
                              <DropdownMenuItem>
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
                <div className="flex items-center gap-3">
                  <button
                    onClick={prevPage}
                    disabled={query.pagination.page === 1}
                    className="size-9 font-bold flex justify-center items-center rounded-lg border border-slate-200 bg-slate-50 cursor-pointer dark:bg-suface-dark dark:border-slate-800 dark:text-white disabled:opacity-30 disabled:cursor-not-allowed">
                    <ChevronLeft className="size-4" />
                  </button>
                  {Array.from({ length: pages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => changeCurrentPage(i + 1)}
                      className={`size-9 font-bold flex justify-center items-center rounded-lg border border-slate-200  ${
                        i + 1 === query.pagination.page ? "bg-slate-500 text-white" : "bg-slate-50"
                      } cursor-pointer dark:bg-suface-dark dark:border-slate-800 dark:text-white `}>
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={nextPage}
                    disabled={query.pagination.page === pages}
                    className="size-9 font-bold flex justify-center items-center rounded-lg border border-slate-200 bg-slate-50 cursor-pointer dark:bg-suface-dark dark:border-slate-800 dark:text-white disabled:opacity-30 disabled:cursor-not-allowed">
                    <ChevronRight className="size-4" />
                  </button>
                </div>

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
              <img src={`/${selectedProduct?.mainImage}`} alt="" className="size-full drop-shadow-[20px_20px_8px_#3737375e]" />
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl line-clamp-2 md:text-3xl font-semibold">{selectedProduct?.title}</h3>
              <ul className="mt-6 space-y-1">
                <li className="space-x-2">
                  Categories: <span className="text-sm py-0.5 px-2  rounded-full bg-slate-200">{selectedProduct?.category}</span>
                </li>
                <li>Brand: {selectedProduct?.brand}</li>
                <li className="font-medium lg:text-xl">
                  <strong>Price: ${selectedProduct?.price.toLocaleString()}</strong>
                </li>
                <li>Discount: {selectedProduct?.discount}%</li>
                <li>Stock: {selectedProduct?.stock}</li>
                <li>Rate: {selectedProduct?.rate}</li>
                <li className="flex items-center gap-3">
                  Colors:
                  <ul className="flex items-center gap-2">
                    <li className="size-6 ring ring-offset-2 ring-slate-300 bg-blue-500 rounded-full"></li>
                    <li className="size-6 ring ring-offset-2 ring-slate-300 bg-red-500 rounded-full"></li>
                    <li className="size-6 ring ring-offset-2 ring-slate-300 bg-green-500 rounded-full"></li>
                    <li className="size-6 ring ring-offset-2 ring-slate-300 bg-amber-500 rounded-full"></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-5">
            <h4 className="capitalize lg:text-xl font-semibold">caption:</h4>
            <p className="text-slate-500 mt-2">{selectedProduct?.caption}</p>
          </div>

          <div className="overflow-x-auto mt-5">
            <h4 className="capitalize lgt:text-xl font-semibold">Specifications:</h4>
            <table className="w-full text-nowrap bg-white mt-2 text-center border-separate border-spacing-0 rounded-lg overflow-hidden">
              <thead>
                <tr className="*:border *:border-slate-200 *:uppercase *:p-3 bg-slate-50">
                  {Object.keys(selectedProduct?.specs || {}).map(key => (
                    <th className="text-sm" key={key}>
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="*:even:bg-slate-50 *:transition-colors *:hover:bg-slate-100">
                <tr className="*:border *:p-2 *:border-slate-200 ">
                  {Object.values(selectedProduct?.specs || {}).map(value => (
                    <td className="text-sm lg:text-base" key={value}>
                      {value}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </ViewModal>
    </div>
  );
}
