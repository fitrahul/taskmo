const express = require("express");
const User = require("../models/user.model");
// const upload = require("../utils/file-upload");

const router = express.Router();


// 1. Registeration of user using profilr-photo

router.post("", async (req, res) => {
    const user = await User.create(req.body);
    return res.status(400).send({ user })
})

// 2. get all ==>>  (a). pagination   (b). total number of page
router.get("", async (req, res) => {
    // (a). pagination => http://localhost:8000/user?page=3&limit=4
    var page = +req.query.page || 1;
    var size = +req.query.limit || 2;
    var offset = (page - 1) * size;
    const user = await User.find().skip(offset).limit(size).lean().exec();
    // (b). total number of page
    const totalPages = Math.ceil((await User.find().countDocuments().lean().exec()) / size);
    return res.status(201).send({ user, totalPages });
})

// 3. sort by name in assending order =>
router.get("/sort", async (req,res) => {
    let user = await User.find().sort({name:1}).lean().exec();
    return res.status(201).send({user});
});

// 4. filter by gender =>
router.get("/male", async (req, res) => {
    const user = await User.find({"gender":{$eq:"Male"}}).lean().exec();
    return res.status(201).send({ user });
})

router.get("/female", async (req, res) => {
    const user = await User.find({"gender":{$eq:"Female"}}).lean().exec();
    return res.status(201).send({ user });
})

// 5. search by name =>
router.get("/name", async (req,res) => {
    let user = await User.findOne(req.params.name).lean().exec();
    return res.status(201).send({user});
});

// 6. delete a user => 
router.delete("/:id", async (req,res) => {
    const user = await User.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(201).send({user});
})

module.exports = router;