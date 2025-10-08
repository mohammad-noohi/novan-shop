import { useEffect, useState, useCallback, useRef } from "react";
import { useCartContext } from "@/contexts/CartContext/useCartContext";
import { TriangleAlert, CircleCheckBig } from "lucide-react";
import { BASE_API_URL } from "../../constants";
import { useAuthContext } from "@/contexts/AuthContext/useAuthContext";

export default function CartSummarySideBar() {
  const { user } = useAuthContext();
  const { cartProducts, purchase, totalPrice } = useCartContext();

  const [coupon, setCoupon] = useState(null);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [isApplied, setIsApplied] = useState(false);
  const [finalPrice, setFinalPrice] = useState(totalPrice);

  // Derived States
  const uniqeItems = cartProducts.length;
  const totalItems = cartProducts.reduce((acc, p) => acc + p.count, 0);
  const isCartValid = cartProducts.every(p => p.count <= p.stock);
  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";

  // Refs
  const inputRef = useRef(null);

  // Helper for failed validation
  const fail = msg => {
    setMessage(msg);
    setStatus("error");
    setCoupon(null);
  };

  const validateCoupon = useCallback(
    async code => {
      if (!code?.trim()) {
        fail("There is no code for validation.");
        return;
      }

      setStatus("loading");
      setMessage("");

      try {
        const resp = await fetch(`${BASE_API_URL}/discounts?code=${code}`);
        const data = await resp.json();

        if (!data.length) {
          fail("Code does not exist anymore");
          return;
        }

        const codeInfo = data[0];
        const now = new Date();

        if (new Date(codeInfo.expiresAt) < now) {
          fail("Code expired");
          return;
        }

        if (codeInfo.usageLimit > 0 && codeInfo.usedCount >= codeInfo.usageLimit) {
          fail("The code usage limit has been reached.");
          return;
        }

        if (totalPrice < codeInfo.minPurchase) {
          fail(`The minimum purchase must be $${codeInfo.minPurchase.toLocaleString()}`);
          return;
        }

        if (codeInfo.userId && codeInfo.userId !== user.id) {
          fail("This code belongs to another user");
          return;
        }

        if (!codeInfo.allowMultipleUse && user.usedDiscounts.includes(code)) {
          fail("You have already used this code");
          return;
        }

        // Validation success
        setCoupon(codeInfo);
        setMessage("Code is valid");
        setStatus("success");
      } catch (err) {
        fail("Failed to validate code");
        console.log(err);
      }
    },
    [totalPrice, user.id, user.usedDiscounts]
  );

  function handleInput(e) {
    setInput(e.target.value);
  }

  function handleApplyCode() {
    if (!coupon) return;

    let discountedPrice = totalPrice;

    if (coupon.type === "fixed") {
      discountedPrice = totalPrice - coupon.value;
    } else if (coupon.type === "percent") {
      discountedPrice = totalPrice - (totalPrice * coupon.value) / 100;
    }

    setFinalPrice(discountedPrice);
    setIsApplied(true);
  }

  function handleRemoveCode() {
    setInput("");
    setMessage("");
    setStatus("idle");
    setIsApplied(false);
    setCoupon(null);
    setFinalPrice(totalPrice);
  }

  async function handlePurchase() {
    await purchase({ appliedDiscounts: coupon ? [coupon] : [], finalPrice });
    setFinalPrice(totalPrice);
    setIsApplied(false);
  }

  // Debounced validation on input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (input.trim()) validateCoupon(input.trim());
    }, 600);

    return () => clearTimeout(timer);
  }, [input, validateCoupon]);

  // Recalculate finalPrice if totalPrice changes or code removed
  useEffect(() => {
    if (!isApplied || !coupon) {
      setFinalPrice(totalPrice);
    } else {
      if (coupon.type === "fixed") {
        setFinalPrice(totalPrice - coupon.value);
      } else if (coupon.type === "percent") {
        setFinalPrice(totalPrice - (totalPrice * coupon.value) / 100);
      }
    }
  }, [totalPrice, coupon, isApplied]);

  useEffect(() => {
    if (!isApplied && inputRef.current) {
      inputRef.current.focus();
    }
  }, [status, isApplied]);

  return (
    <aside className="w-full lg:w-1/2 bg-slate-50 border border-slate-200 rounded-lg p-3 lg:p-5 dark:bg-suface-dark dark:border-slate-800">
      <h3 className="text-xl font-bold dark:text-white">Order Summary</h3>

      <div className="mt-3">
        <p className="text-slate-600 dark:text-muted-dark">
          <span>uniqe items: </span>
          <span>{uniqeItems}</span>
        </p>
        <p className="text-slate-600 dark:text-muted-dark">
          <span>total items: </span>
          <span>{totalItems}</span>
        </p>
      </div>

      <div className="flex gap-3 mt-2.5">
        <input
          ref={inputRef}
          disabled={isApplied || isLoading}
          type="text"
          value={input}
          onChange={handleInput}
          placeholder="discount code"
          className="border border-slate-200 rounded-lg p-3 w-full outline-none focus:ring focus:ring-brand caret-brand transition-all dark:bg-app-dark dark:border-slate-800 disabled:opacity-50 disabled:pointer-events-none "
        />

        {isSuccess && isApplied && (
          <button onClick={handleRemoveCode} className="capitalize bg-brand text-white py-3 px-6 rounded-lg cursor-pointer shrink-0 hover:bg-indigo-500 dark:bg-indigo-500">
            remove code
          </button>
        )}

        <button
          onClick={handleApplyCode}
          disabled={!isSuccess || isApplied || isLoading}
          className="capitalize bg-brand text-white py-3 px-6 rounded-lg cursor-pointer hover:bg-indigo-500 dark:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50">
          apply
        </button>
      </div>

      <p className={`mt-2 line-clamp-1 flex items-center gap-2 ${isSuccess ? "text-green-500" : isError ? "text-red-500" : "opacity-0"}`}>
        {isSuccess ? <CircleCheckBig className="size-4" /> : isError ? <TriangleAlert className="size-4" /> : null}
        <span>{message || "message"}</span>
      </p>

      <div className="flex flex-col gap-2.5 mt-10">
        <p className="flex items-center justify-between">
          <span className="text-lg font-bold dark:text-white">sub total:</span>
          <span className="text-lg font-bold text-brand dark:text-indigo-500">${totalPrice.toLocaleString()}</span>
        </p>
        <p className="flex items-center justify-between">
          <span className="text-lg font-bold dark:text-white">final price:</span>
          <span className="text-lg font-bold text-brand dark:text-indigo-500">${finalPrice.toLocaleString()}</span>
        </p>

        <button
          disabled={!isCartValid}
          onClick={handlePurchase}
          className="bg-brand text-white py-3 px-6 rounded-lg cursor-pointer w-full hover:bg-indigo-500 transition font-semibold dark:bg-indigo-500 disabled:grayscale-50 disabled:opacity-50 disabled:cursor-not-allowed">
          purchase
        </button>
      </div>
    </aside>
  );
}
