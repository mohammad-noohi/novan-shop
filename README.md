example of useReducer function to handle cartContext :

```js
function cartReducer(state, action) {
  switch (action.type) {
    case "SET_CART":
      return { ...state, cart: action.payload.items, cartId: action.payload.id };
    case "ADD_ITEM":
      return {
        ...state,
        cart: [...state.cart, { productId: action.payload, count: 1 }],
      };
    case "INCREMENT_ITEM":
      return {
        ...state,
        cart: state.cart.map(item => (item.productId === action.payload ? { ...item, count: item.count + 1 } : item)),
      };
    case "DECREMENT_ITEM":
      return {
        ...state,
        cart: state.cart.map(item => (item.productId === action.payload ? { ...item, count: item.count - 1 } : item)),
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        cart: state.cart.filter(item => item.productId !== action.payload),
      };
    case "CLEAR_CART":
      return { ...state, cart: [], cartId: null };
    default:
      return state;
  }
}
```

in Provider :

```js
const [state, dispatch] = useReducer(cartReducer, {
  cart: [],
  cartId: null,
});

function addToCart(id) {
  dispatch({ type: "ADD_ITEM", payload: id });
}
```
