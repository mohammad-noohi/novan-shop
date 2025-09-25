import { useCartContext } from "@/contexts/CartContext/useCartContext";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function EditProductForm({ selectedProduct, setShowEditModal }) {
  const { products, getAllProducts } = useCartContext();

  const [form, setForm] = useState({
    loading: false,
    title: selectedProduct.title,
    category: selectedProduct.category,
    brand: selectedProduct.brand,
    price: selectedProduct.price,
    discount: selectedProduct.discount,
    stock: selectedProduct.stock,
    caption: selectedProduct.caption,
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

  const fileInputRef = useRef(null);

  function validateForm() {
    let newErrors = {};

    // title check
    if (!form.title.trim()) newErrors.title = "title can't be empty";
    // category check
    if (!form.category.trim()) newErrors.category = "category can't be empty";
    // brand check
    if (!form.brand.trim()) newErrors.brand = "brand can't be empty";
    if (!form.price) newErrors.price = "price can't be empty";
    if (Number(form.price) < 0) newErrors.price = "price must be positive number";
    if (isNaN(Number(form.price))) newErrors.price = "price must be a number";
    // discount check
    if (form.discount === "") newErrors.discount = "discount can't be empty if you don't have discount set 0";
    if (Number(form.discount) < 0 || Number(form.discount) > 100) newErrors.discount = "discount must be from 0 to 100";
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

  function handleSubmit(e) {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid) {
      editProduct();
    } else {
      toast.error("check form errors");
    }
  }

  function handleImageChange(e) {
    e.preventDefault();
    const f = e.target.files[0];
    if (!f) return;

    // validate file type before convert
    const validTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (!validTypes.includes(f.type)) {
      setErrors(prev => ({ ...prev, file: "file must be JPG/JPEG or PNG" }));
      return;
    }

    // validate file size
    if (f.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, file: "file must be less thant 5MB" }));
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, file: reader.result, preview: reader.result }));
    };
    reader.readAsDataURL(f);
  }

  function handleRemoveImage() {
    setForm(prev => ({ ...prev, file: null, preview: "" }));
    setErrors(prev => ({ ...prev, file: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function editProduct() {
    const productInfo = {};

    if (form.title !== selectedProduct.title) productInfo.title = form.title.trim();

    if (form.category !== selectedProduct.category) productInfo.category = form.category.trim();

    if (form.brand !== selectedProduct.brand) productInfo.brand = form.brand.trim();

    if (form.price !== selectedProduct.price) productInfo.price = Number(form.price);

    if (form.discount !== selectedProduct.discount) productInfo.discount = Number(form.discount);

    if (form.stock !== selectedProduct.stock) productInfo.stock = Number(form.stock);

    if (form.caption !== selectedProduct.caption) productInfo.caption = form.caption.trim();

    if (form.file) productInfo.mainImage = form.file;

    if (Object.keys(productInfo).length === 0) {
      toast.info("There are no changes, everything is the same as before.");
      return;
    }

    try {
      setForm(prev => ({ ...prev, loading: true }));
      const resp = await fetch(`http://localhost:3000/products/${selectedProduct.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productInfo),
      });

      if (!resp.ok) throw new Error("Failed to change product information");

      await getAllProducts();
      resetForm();
      toast.success("product edit successfully");
      setShowEditModal(false);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setForm(prev => ({ ...prev, loading: false }));
    }
  }

  return (
    <div className="bg-white dark:bg-suface-dark border border-slate-200 dark:border-slate-800 p-5 rounded-lg">
      <h4 className="text-xl font-semibold capitalize">edit product</h4>
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <span>Title</span>
            <Input type="text" value={form.title} onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))} />
            {errors.title ? <span className="text-red-500 text-sm">{errors.title}</span> : null}
          </div>
          <div>
            <span>Category</span>
            <Input type="text" value={form.category} onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))} list="cateogries" />
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
            <Input type="text" value={form.brand} onChange={e => setForm(prev => ({ ...prev, brand: e.target.value }))} list="brands" />
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
            <Input type="number" value={form.price} onChange={e => setForm(prev => ({ ...prev, price: e.target.value }))} min={1} />
            {errors.price ? <span className="text-red-500 text-sm">{errors.price}</span> : null}
          </div>
          <div>
            <span>Discount</span>
            <Input type="number" value={form.discount} onChange={e => setForm(prev => ({ ...prev, discount: e.target.value }))} min={0} max={100} placeholder="from 0 to 100 percent" />
            {errors.discount ? <span className="text-red-500 text-sm">{errors.discount}</span> : null}
          </div>
          <div>
            <span>Stock</span>
            <Input type="number" value={form.stock} onChange={e => setForm(prev => ({ ...prev, stock: e.target.value }))} min={1} placeholder="minimum 1 unit" />
            {errors.stock ? <span className="text-red-500 text-sm">{errors.stock}</span> : null}
          </div>
          <div className="lg:col-span-2">
            <span>Caption</span>
            <Textarea value={form.caption} onChange={e => setForm(prev => ({ ...prev, caption: e.target.value }))} rows={8} placeholder="Type your caption here." />
            {errors.caption ? <span className="text-red-500 text-sm">{errors.caption}</span> : null}
          </div>
          <div>
            <span>file</span>
            <Input ref={fileInputRef} type="file" onChange={handleImageChange} />
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
          {form.loading ? "editing..." : "edit"}
        </button>
      </form>
    </div>
  );
}
