const { addMsg, getMsg } = require("../controllers/messageController");
const router = require("express").Router();

router.post("/addmsg/", addMsg);
router.post("/getmsg/", getMsg);

module.exports = router;