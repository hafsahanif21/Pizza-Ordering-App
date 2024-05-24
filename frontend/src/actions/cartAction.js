// Action creator to add a pizza to the cart
export const addToCart = (pizza, quantity, varient) => (dispatch, getState) => {
  // Create a cart item object with relevant information
  var cartItem = {
    name: pizza.name,
    _id: pizza._id,
    image: pizza.image,
    varient: varient,
    quantity: Number(quantity),
    prices: pizza.prices,
    price: pizza.prices[0][varient] * quantity,
  };

  // Check if quantity exceeds the limit
  if (cartItem.quantity > 10) {
    alert("you Can only add 10 pizzas");
  } else {
    // If quantity is valid, proceed
    if (cartItem.quantity < 1) {
      // If quantity is less than 1, delete the item from the cart
      dispatch({ type: "DELETE_FROM_CART", payload: pizza });
    } else {
      // Otherwise, add the item to the cart and update localStorage
      dispatch({ type: "ADD_TO_CART", payload: cartItem });
      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cartReducer.cartItems)
      );
    }
  }
};

// Action creator to delete a pizza from the cart
export const deleteFromCart = (pizza) => (dispatch, getState) => {
  // Dispatch action to delete item from the cart
  dispatch({ type: "DELETE_FROM_CART", payload: pizza });
  // Update localStorage with updated cart items
  const cartItems = getState().cartReducer.cartitems;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

// Action type constant to clear the cart
export const CLEAR_CART = 'CLEAR_CART';

// Action creator to clear the entire cart
export const clearCart = () => (dispatch) => {
  // Dispatch action to clear the cart
  dispatch({
    type: CLEAR_CART,
  });
  // Remove cartItems from localStorage
  localStorage.removeItem('cartItems');
};
