import axios from "axios";
import swal from "sweetalert";

// Action creator to register a new user
export const registerUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_REGISTER_REQUEST" });
  try {
    await axios.post("/api/users/register", user);
    dispatch({ type: "USER_REGISTER_SUCCESS" });
  } catch (error) {
    dispatch({ type: "USER_REGISTER_FAIL", payload: error });
  }
};

// Action creator to log in a user
export const loginUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });
  try {
    const response = await axios.post("/api/users/login", user);
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data });
    localStorage.setItem("currentUser", JSON.stringify(response.data));
    window.location.href = "/";
  } catch (error) {
    dispatch({ type: "USER_LOGIN_FAIL", payload: error });
  }
};

// Action creator to log out a user
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("currentUser");
  window.location.href = "/login";
};

// Action creator to send forgot password request
export const forgotPassword = (email) => async (dispatch) => {
  dispatch({ type: "FORGOT_PASSWORD_REQUEST" });
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(`/api/users/forgotpassword`, email, config);
    dispatch({ type: "FORGOT_PASSWORD_SUCCESS", payload: data.message });
  } catch (err) {
    dispatch({ type: "FORGOT_PASSWORD_FAIL", payload: err.response.data.message });
  }
};

// Action creator to reset user's password
export const resetPassword = (token,password) => async (dispatch) => {
  dispatch({ type: "RESET_PASSWORD_REQUEST" });
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(`/api/users/resetpassword/${token}`, password, config);
    dispatch({ type: "RESET_PASSWORD_SUCCESS", payload: data.success });
  } catch (err) {
    dispatch({ type: "RESET_PASSWORD_FAIL", payload: err.response.data.message });
  }
};

// Action creator to update user role (admin)
export const updateUserRole= (id, userData) => async (dispatch) => {
  dispatch({ type: "UPDATE_ROLE_REQUEST" });
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(`/api/users/admin/${id}`, userData, config);
    dispatch({ type: "UPDATE_ROLE_SUCCESS", payload: data.success });
  } catch (err) {
    dispatch({ type: "UPDATE_ROLE_FAIL", payload: err.response.data.message });
  }
};

// Action creator to get details of a single user
export const getSingleUser = (id) => async (dispatch) => {
  dispatch({ type: "GET_SINGLE_USER_REQUEST" });
  try {
    const { data } = await axios.delete(`/api/v1/admin/user/${id}`);
    dispatch({ type: "GET_SINGLE_USER_SUCCESS", payload: data });
  } catch (err) {
    dispatch({ type: "GET_SINGLE_USER_FAIL", payload: err.response.data.message });
  }
};

// Action creator to get all users
export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: "GET_USERS_REQUEST" });
  try {
    const response = await axios.get("/api/users/getallusers");
    dispatch({ type: "GET_USERS_SUCCESS", payload: response.data });
  } catch (err) {
    dispatch({ type: "GET_USERS_FAIL", payload: err });
  }
};

// Action creator to delete a user
export const deleteUser = (userid) => async (dispatch) => {
  try {
    await axios.post("/api/users/deleteuser", { userid });
    swal("User Deleted Successfully!", "success");
    window.location.reload();
  } catch (error) {
    swal("Error While Deleting User");
  }
};
