import express from "express";
import { getAllUsers, registerNewAdmin } from "../controller/userController.js";
import {
    isAuthenticated,
    isAuthorized,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/all", isAuthenticated, isAuthorized("Admin"), getAllUsers);
// Modify the route in userRouter.js to allow bypass if count === 0
router.post("/add/new-admin", async (req, res, next) => {
    const adminCount = await User.countDocuments({ role: "Admin" });
    if (adminCount === 0) {
        // Bypass auth checks for the very first Admin
        return next();
    }
    // Otherwise, enforce regular checks
    isAuthenticated(req, res, () => isAuthorized("Admin")(req, res, next));
}, registerNewAdmin);


export default router;