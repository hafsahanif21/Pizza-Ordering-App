import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk"; // Corrected import statement
import { composeWithDevTools } from "redux-devtools-extension";
import { 
  getAllPizzaReducer, 
  addPizzaReducer, 
  getPizzaByIdReducer, 
  updatePizzaByIdReducer 
} from "./reducers/pizzaReducer";
import { cartReducer } from "./reducers/cartReducer";
import { 
  registerUserReducer, 
  loginUserReducer, 
  getAllUsersReducer,  
  forgotPasswordReducer,
  updateRoleReducer 
} from "./reducers/userReducer";
import { 
  placeOrderReducer, 
  getUserOrdersReducer, 
  allUserOrdersReducer 
} from "./reducers/orderReducer";

// Try to get cart items from local storage, or initialize as an empty array
let cartItems;
try {
  const cartItemsJson = localStorage.getItem("cartItems");
  cartItems = cartItemsJson ? JSON.parse(cartItemsJson) : [];
} catch (error) {
  console.error('Error parsing cart items from local storage:', error);
  cartItems = [];
}

// Try to get current user from local storage, or initialize as null
let currentUser;
try {
  const currentUserJson = localStorage.getItem("currentUser");
  currentUser = currentUserJson ? JSON.parse(currentUserJson) : null;
} catch (error) {
  console.error('Error parsing current user from local storage:', error);
  currentUser = null;
}

// Combine all reducers into a root reducer
const rootReducer = combineReducers({
  getAllPizzaReducer,
  cartReducer,
  registerUserReducer,
  loginUserReducer,
  placeOrderReducer,
  getUserOrdersReducer,
  addPizzaReducer,
  getPizzaByIdReducer,
  updatePizzaByIdReducer,
  allUserOrdersReducer,
  getAllUsersReducer,
  forgotPasswordReducer,
  updateRoleReducer,
});

// Set initial state for the store
const initialState = {
  cartReducer: { cartItems },
  loginUserReducer: { currentUser },
};

// Define middleware, including thunk middleware for handling asynchronous actions
const middleware = [thunk];

// Create the Redux store with the root reducer, initial state, and middleware
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// Export the Redux store
export default store;
