const express = require('express');
const { getContacts ,getContact,createContact,updateContact,deleteContact} = require('../controllers/contactController')
const router = express.Router();

// can be done in router
// app.get('/api/contacts',(req,res)=>{
//     // res.send("Get all contacts");
//     // res.status() ::only work when status enter at first
//     res.status(200).send("Get all contacts")
// });
    
// router.route("/").get((req, res) => {
//     res.status(200).json({ message: "Get all contacts" });
// });
router.route("/").get(getContacts);
// router.route("/").post((req, res) => {
//     res.status(200).json({ message: "create contacts" });
// });
router.route("/").get(getContact);
// router.route("/:id").get((req, res) => {
//     res.status(200).json({ message: `get contacts for ${req.params.id}` });
// });
router.route("/").post(createContact);
// router.route("/:id").put((req, res) => {
//     res.status(200).json({ message: `update contacts for ${req.params.id}` });
// });
router.route("/").put(updateContact);
// router.route("/:id").delete((req, res) => {
//     res.status(200).json({ message: `delete contacts for ${req.params.id}` });
// });
router.route("/").delete(deleteContact);

module.exports = router;