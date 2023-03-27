import { config } from "@/configurations/config";
import { authHeader } from "../helpers/authHeader";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const userService = {
  login,
  logout,
  getAll,
  hasPermission,
};

function login(email, password) {
  return axios
    .post(`${config.apiUrl}/Authentication/LogIn`, { email, password })
    .then((response) => {
      const user = response.data;
      if (user.token) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      return user;
    })
    .catch((error) => {
      let errorText;
      errorText = "something went wrong...";
      if (error.response) {
        errorText = error.response.data;

        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
      return Promise.reject(errorText);
    });
}

function logout() {
  localStorage.removeItem("user");
}

function getAll() {
  axios
    .get(`${config.apiUrl}/Authentication`, {
      headers: authHeader(),
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
      // if 401
      // logout();
      // location.reload(true);
    });
}

function hasPermission(permission) {
  var user = localStorage.getItem("user");
  if (user) {
    var parsedUser = JSON.parse(user);
    var decodedToken = jwt_decode(parsedUser.token);
    return decodedToken.Permission.includes(permission);
  } else {
    return false;
  }
}
