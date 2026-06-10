import express from "express";
import { loginUser, logoutUser, myProfile, refreshToken, register, verifyOtp, verifyuser, verifyRegisterOtp } from "../controllers/user.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/register", register)
router.post("/verify/:token", verifyuser)
router.post("/verifyRegisterOtp", verifyRegisterOtp)
router.post("/login", loginUser)
router.post("/verifyOtp", verifyOtp)
router.get("/user", isAuth, myProfile)
router.post("/refreshtoken", refreshToken)
router.post("/logout",isAuth,logoutUser)

export default router;