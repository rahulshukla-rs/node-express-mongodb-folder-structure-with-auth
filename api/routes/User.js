const express = require("express");
const router = express.Router();

const UserController = require("../controllers/User");
const checkAuth = require('../middleware/check-auth');

router.get("/test", (req, res) => {
  res.json({ msg: "test User" });
});


/* 
Name: Register
Method: POST
Des: Register
Route: Public
*/
router.post("/register", UserController.register);

/* 
Name: Login
Method: POST
Des: Login
Route: Public
*/
router.post("/login", UserController.login);



/* 
Name: Add User
Method: POST
Des: Add user
Route: Private
*/
router.post("/add", checkAuth, UserController.add);

/* 
Name: Edit User
Method: POST
Des: Update Single user
Route: Private
*/
router.post("/edit/:id", checkAuth, UserController.edit);

/* 
Name: Delete User
Method: DELETE
Des: Delete Single user
Route: Private
*/
router.delete("/delete/:id", checkAuth, UserController.delete);


module.exports = router;
