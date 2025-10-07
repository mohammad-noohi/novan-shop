import { BASE_API_URL } from "../../../../constants";
import { useCartContext } from "@/contexts/CartContext/useCartContext";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AddProductForm() {
  const { products, getAllProducts } = useCartContext();

  const [form, setForm] = useState({
    loading: false,
    title: "",
    category: "",
    brand: "",
    price: "",
    discount: "",
    stock: "",
    caption: "",
    file: null,
    preview: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    category: "",
    brand: "",
    price: "",
    discount: "",
    stock: "",
    caption: "",
    file: "",
  });

  // Derived States
  const categoryItems = Array.from(new Set(products.map(p => p.category.toLowerCase())));
  const brandItems = Array.from(new Set(products.map(p => p.brand.toLowerCase())));
  // Refs
  const fileInputRef = useRef(null);

  /*---------------------------------- Functions ----------------------------------*/

  function validateForm() {
    let newErrors = {};

    // title check
    if (!form.title.trim()) {
      errors.title = "title can't be empty";
    } else if (products.some(p => p.title.toLowerCase() === form.title.toLowerCase())) {
      errors.title = "this product already exists";
    }
    // category check
    if (!form.category.trim()) newErrors.category = "category can't be empty";
    // brand check
    if (!form.brand.trim()) newErrors.brand = "brand can't be empty";
    // price check
    if (!form.price) newErrors.price = "price can't be empty";
    if (Number(form.price) < 0) newErrors.price = "price must be a posetive number";
    if (isNaN(Number(form.price))) newErrors.price = "price must be a number";
    // discount check
    if (form.discount === "") newErrors.discount = "discount can't be empty if you don't have discount set 0";
    if (Number(form.discount) < 0 || Number(form.discount) > 100) errors.discount = "discount must be from 0 to 100";
    // stock check
    if (!form.stock) newErrors.stock = "stock can't be empty";
    if (Number(form.stock) <= 0) newErrors.stock = "stock must be atleast 1";
    // caption check
    if (!form.caption) newErrors.caption = "caption can't be empty";
    if (form.caption.split(" ").length < 5) newErrors.caption = "caption must at least 10 words";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function resetForm() {
    setForm({
      loading: false,
      title: "",
      category: "",
      brand: "",
      price: "",
      discount: "",
      stock: "",
      rate: "",
      caption: "",
      file: null,
      preview: "",
    });

    setErrors({
      title: "",
      category: "",
      brand: "",
      price: "",
      discount: "",
      stock: "",
      file: "",
    });
  }

  function handleImageChange(e) {
    e.preventDefault();
    const f = e.target.files[0];
    if (!f) return;

    setErrors(prev => ({ ...prev, file: "" }));

    // validate file type before convert to base64
    const validTypes = ["image/jpg", "image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(f.type)) {
      setErrors(prev => ({ ...prev, file: "file must be JPG or PNG" }));
      return;
    }

    // validiate file size
    if (f.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, file: "file must be less than 5MB" }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, file: reader.result, preview: reader.result }));
    };
    reader.readAsDataURL(f);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid) {
      addNewProduct();
    } else {
      toast.error("check form errors");
    }
  }

  function handleRemoveImage() {
    setForm(prev => ({ ...prev, file: null, preview: "" }));
    setErrors(prev => ({ ...prev, file: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function addNewProduct() {
    // In real API use FormData Object to send data
    const newProduct = {
      title: form.title.trim(),
      category: form.category.trim(),
      brand: form.brand.trim(),
      price: form.price,
      discount: form.discount,
      stock: form.stock,
      rate: 5,
      caption: form.caption.trim(),
      createdAt: new Date().toISOString(),
      mainImage: form.file,
      // این قسمت فعلا خالی گذاشته شده چون موقع ساخت یک محصول جدید باید این مقادیر رو هم بگیریم اما فعلا برای سادگی کار این کارو نکردیم و بعد توسعه میدیم
      colors: [],
      specs: [],
      gallery: [],
    };

    try {
      setForm(prev => ({ ...prev, loading: true }));
      const resp = await fetch(`${BASE_API_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      // status ==> 201 ==> create status
      if (resp.status === 201) {
        toast.success("product add successfully");
        resetForm();
        await getAllProducts();
      }
    } catch (err) {
      toast.error("Something went wrong , Please try again");
      throw err;
    } finally {
      setForm(prev => ({ ...prev, loading: false }));
    }
  }

  /*---------------------------------- JSX ----------------------------------*/

  return (
    <div className="bg-white dark:bg-suface-dark border border-slate-200 dark:border-slate-800 p-5 rounded-lg">
      <h4 className="text-xl font-semibold capitalize">add product</h4>
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div>
            <span>Title</span>
            <Input
              value={form.title}
              onChange={e => {
                setForm(prev => ({ ...prev, title: e.target.value }));
              }}
              type="text"
            />
            {errors.title ? <span className="text-red-500 text-sm">{errors.title}</span> : null}
          </div>
          <div>
            <span>Category</span>
            <Input
              value={form.category}
              onChange={e => {
                setForm(prev => ({ ...prev, category: e.target.value }));
              }}
              type="text"
              list="cateogries"
            />
            {errors.category ? <span className="text-red-500 text-sm">{errors.category}</span> : null}

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
              value={form.brand}
              onChange={e => {
                setForm(prev => ({ ...prev, brand: e.target.value }));
              }}
              type="text"
              list="brands"
            />
            {errors.brand ? <span className="text-red-500 text-sm">{errors.brand}</span> : null}

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
              value={form.price}
              onChange={e => {
                setForm(prev => ({ ...prev, price: e.target.value }));
              }}
              type="number"
              min={1}
            />
            {errors.price ? <span className="text-red-500 text-sm">{errors.price}</span> : null}
          </div>
          <div>
            <span>Discount</span>
            <Input
              value={form.discount}
              onChange={e => {
                setForm(prev => ({ ...prev, discount: e.target.value }));
              }}
              type="number"
              min={0}
              max={100}
              placeholder="from 0 to 100 percent"
            />
            {errors.discount ? <span className="text-red-500 text-sm">{errors.discount}</span> : null}
          </div>
          <div>
            <span>Stock</span>
            <Input
              value={form.stock}
              onChange={e => {
                setForm(prev => ({ ...prev, stock: e.target.value }));
              }}
              type="number"
              min={1}
              placeholder="minimum 1 unit"
            />
            {errors.stock ? <span className="text-red-500 text-sm">{errors.stock}</span> : null}
          </div>
          <div className="lg:col-span-2">
            <span>Caption</span>
            <Textarea value={form.caption} onChange={e => setForm(prev => ({ ...prev, caption: e.target.value }))} rows={8} placeholder="Type your caption here." />
            {errors.caption ? <span className="text-red-500 text-sm">{errors.caption}</span> : null}
          </div>
          <div>
            <span>file</span>
            <Input ref={fileInputRef} onChange={handleImageChange} type="file" />
            {errors.file ? <span className="text-red-500 text-sm">{errors.file}</span> : null}
            {form.file && (
              <>
                <div className="mt-5 border size-50 overflow-hidden p-3 rounded-lg">
                  <img src={form.preview} alt="" className=" block w-full h-full object-cover rounded-lg" />
                </div>
                <button
                  onClick={handleRemoveImage}
                  type="button"
                  className="py-1 px-4 mt-5 bg-slate-500 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg text-lg capitalize cursor-pointer hover:bg-slate-600 text-white transition-colors">
                  remove image
                </button>
              </>
            )}
          </div>
        </div>

        <button
          disabled={form.loading}
          className="py-1 px-4 mt-5 bg-slate-500 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg text-lg capitalize cursor-pointer hover:bg-slate-600 text-white transition-colors disabled:opacity-50 disabled:pointer-none:">
          {form.loading ? "adding..." : "add product"}
        </button>
      </form>
    </div>
  );
}
