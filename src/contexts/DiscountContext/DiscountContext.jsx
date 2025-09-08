import { createContext, useState } from "react";
import { useAuthContext } from "../AuthContext/useAuthContext";

const DiscountContext = createContext();

function DiscountProvider({ children }) {
  const { user } = useAuthContext();
  const [discountsList, setDiscountsList] = useState([]); // array of codes user applied
  const [discoutnLoading, setDiscountLoading] = useState(false);
  const [discountError, setDiscountError] = useState("");

  async function applyDiscount(code, totalPrice) {
    try {
      setDiscountLoading(true);
      setDiscountError("");
      const resp = await fetch(`http://localhost:3000/discounts?code=${code}`);
      const data = await resp.json(); // return an array

      // check code exist or not
      if (!data.length) {
        setDiscountError("Discount Code Is Not Valid.");
        return;
      }

      const d = data[0];
      const now = new Date();

      // check code don't expired
      if (new Date(d.expiresAt) < now) {
        setDiscountError("Discount Code is Expired");
        return;
      }

      // check code usage limit no reach
      if (d.usageLimit > 0 && d.usedCount >= d.usageLimit) {
        setDiscountError("The code usage limit has been reached.");
        return;
      }

      // check code minum purchase condition be true
      if (totalPrice < d.minPurchase) {
        setDiscountError(`The minimum purchase must be $${d.minPurchase.toLocaleString()}`);
        return;
      }

      // check code is public or not( for special user )
      if (d.userId) {
        if (d.userId !== user.id) {
          setDiscountError("This code belongs to another user");
          return;
        }
      }

      // check user use this code before or not
      if (!d.allowMultipleUse && user.usedDiscounts.includes(d.code)) {
        setDiscountError("You have already used this code");
        return;
      }

      if (d.stackable) {
        setDiscountsList(prev => [...prev, d]);
      } else {
        setDiscountsList(d);
      }
    } catch (err) {
      console.log("faild apply discount");
      throw err;
    } finally {
      setDiscountLoading(false);
    }
  }

  return <DiscountContext.Provider value={{ discountsList, discoutnLoading, discountError, applyDiscount }}>{children}</DiscountContext.Provider>;
}

export { DiscountContext, DiscountProvider };
