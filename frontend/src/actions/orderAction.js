import axios from "axios";
import { clearCart } from './cartAction';

// Action creator to place an order
export const placeOrder = (token, subTotal) => async (dispatch, getState) => {
  // Dispatch an action to indicate that placing an order is requested
  dispatch({ type: "PLACE_ORDER_REQUEST" });

  // Get current user and cart items from the Redux store
  const currentUser = getState().loginUserReducer.currentUser;
  const cartItems = getState().cartReducer.cartItems;

  try {
    // Send a POST request to the server to place the order
    const response = await axios.post("/api/orders/placeorder", {
      token,
      subTotal,
      currentUser,
      cartItems,
    });

    // Dispatch an action to indicate that placing the order was successful
    dispatch({ type: "PLACE_ORDER_SUCCESS" });

    // Clear the cart and remove cartItems from localStorage
    dispatch(clearCart());
    localStorage.removeItem('cartItems');
  } catch (error) {
    // Dispatch an action to indicate that placing the order failed
    dispatch({ type: "PLACE_ORDER_FAIL", payload: error.message });
    console.log(error);
  }
};

// Action creator to get orders for the current user
export const getUserOrders = () => async (dispatch, getState) => {
  dispatch({ type: "USER_ORDER_REQUEST" });

  try {
    const currentUser = getState().loginUserReducer.currentUser;
    if (!currentUser) {
      throw new Error("User not found. Please log in again.");
    }

    const response = await axios.post("/api/orders/getuserorder", {
      userid: currentUser._id,
    });
    dispatch({ type: "USER_ORDER_SUCCESS", payload: response.data });
  } catch (error) {
    console.error("getUserOrders error:", error);
    dispatch({ type: "USER_ORDER_FAIL", payload: error.message });
  }
};

// Action creator to get all orders
export const getAllOrders = () => async (dispatch, getState) => {
  dispatch({ type: "ALL_ORDER_REQUEST" });
  try {
    const response = await axios.get("/api/orders/alluserorder");
    dispatch({ type: "ALL_ORDER_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "ALL_ORDER_FAIL", payload: error });
  }
};

// Action creator to mark an order as delivered
export const deliverOrder = (orderid) => async (dispatch, getState) => {
  dispatch({ type: "GET_ALL_ORDER_REQUEST" });
  try {
    // Send a POST request to mark the order as delivered
    await axios.post("/api/orders/deliverorder", { orderid });
    alert("Delivered successfully");

    // Get updated orders
    const orders = await axios.get("/api/orders/alluserorder");
    dispatch({ type: "GET_ALL_ORDER_SUCCESS", payload: orders.data });

    // Redirect to the order list page
    window.location.href = "/admin/orderlist";
  } catch (error) {
    dispatch({ type: "GET_ALL_ORDER_FAIL", payload: error });
  }
};
