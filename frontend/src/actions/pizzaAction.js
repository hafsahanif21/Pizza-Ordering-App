import axios from "axios";
import swal from "sweetalert";

// Action creator to get all pizzas
export const getAllPizzas = () => async (dispatch) => {
  dispatch({ type: "GET_PIZZAS_REQUEST" });
  try {
    const response = await axios.get("/api/pizzas/getAllPizzas");
    dispatch({ type: "GET_PIZZAS_SUCCESS", payload: response.data });
  } catch (err) {
    dispatch({ type: "GET_PIZZAS_FAIL", payload: err });
  }
};

// Action creator to add a new pizza
export const addPizza = (pizza) => async (dispatch) => {
  dispatch({ type: "ADD_PIZZAS_REQUEST" });
  try {
    await axios.post("/api/pizzas/addpizza", { pizza });
    dispatch({ type: "ADD_PIZZAS_SUCCESS" });
  } catch (err) {
    dispatch({ type: "ADD_PIZZAS_FAIL", payload: err });
  }
};

// Action creator to get a pizza by ID
export const getPizzaById = (pizzaId) => async (dispatch) => {
  dispatch({ type: "GET_PIZZABYID_REQUEST" });
  try {
    const response = await axios.post("/api/pizzas/getpizzabyid", { pizzaId });
    dispatch({ type: "GET_PIZZABYID_SUCCESS", payload: response.data });
  } catch (err) {
    dispatch({ type: "GET_PIZZABYID_FAIL", payload: err });
  }
};

// Action creator to update a pizza
export const updatePizza = (updatedPizza) => async (dispatch) => {
  dispatch({ type: "UPDATE_PIZZABYID_REQUEST" });
  try {
    const response = await axios.post("/api/pizzas/updatepizza", {
      updatedPizza,
    });
    dispatch({ type: "UPDATE_PIZZABYID_SUCCESS", payload: response.data });
    window.location.href = "/admin/pizzalist"; // Redirect to pizza list page
  } catch (err) {
    dispatch({ type: "UPDATE_PIZZABYID_FAIL", payload: err });
  }
};

// Action creator to delete a pizza
export const deletePizza = (pizzaId) => async (dispatch) => {
  try {
    await axios.post("/api/pizzas/deletepizza", { pizzaId });
    swal("Pizza Deleted Successfully!", "success"); // Show success alert
    window.location.href = "/admin/pizzalist"; // Redirect to pizza list page
  } catch (error) {
    swal("Error While Deleting Pizza"); // Show error alert
  }
};

// Action creator to filter pizzas based on search key and category
export const filterPizza = (searchkey, category) => async (dispatch) => {
  let filteredPizza;
  dispatch({ type: "GET_PIZZAS_REQUEST" });
  try {
    const res = await axios.get("/api/pizzas/getAllPizzas");
    filteredPizza = res.data.filter((pizza) =>
      pizza.name.toLowerCase().includes(searchkey)
    );
    if (category !== "all") {
      filteredPizza = res.data.filter(
        (pizza) => pizza.category.toLowerCase() === category
      );
    }
    dispatch({ type: "GET_PIZZAS_SUCCESS", payload: filteredPizza });
  } catch (error) {
    dispatch({ type: "GET_PIZZAS_FAIL", payload: error });
  }
};
