export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    // Case for adding an item to the cart
    case "ADD_TO_CART":
      // Check if the item already exists in the cart
      const alreadyExists = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      // If the item already exists, update its quantity
      if (alreadyExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === action.payload._id ? action.payload : item
          ),
        };
      } else { // If the item is new, add it to the cart
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }
    // Case for deleting an item from the cart
    case "DELETE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload._id
        ),
      };
    // Case for clearing the entire cart
    case "CLEAR_CART":
      return {
        ...state,
        cartItems: []
      };
    default:
      return state;
  }
};
