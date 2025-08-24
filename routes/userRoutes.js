const router = require('express').Router()
const {addUser,getUser,getUserByEmail,isAdmin,result} = require("../controllers/userController")
router.route("/").post(addUser).get(getUser)
router.route("/:email").get(getUserByEmail)
router.route("/admin/:email").get(isAdmin,result)
// router.route("/test").get(isAdmin,result)
module.exports = router;
