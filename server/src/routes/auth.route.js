import { Router } from "express";
import { createAccount, getUser, login, logout } from "../controller/authController.js";
import validateToken from "../middleware/validateToken.js";

const route = Router();

route.post("/signup", createAccount);
route.post("/login", login);
route.get("/get", validateToken, getUser);
route.get("/logout", validateToken, logout);


export default route;