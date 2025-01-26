"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../middlewares/verifyToken");
const router = (0, express_1.Router)();
router.get("/profile", verifyToken_1.verifyToken, (req, res) => {
    res.json({ message: "User profile", user: req.body.user });
});
exports.default = router;
