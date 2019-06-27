const express = require("express");
const router = express.Router();
const celebrityModel = require("../models/celebrity");

/* GET All Celebrities */
router.get("/celebrities", (req, res, next) => {
  celebrityModel
    .find()
    .then(dbRes => {
      res.render("celebrities/index", { celebrities: dbRes });
    })
    .catch(err => {
      console.log(err);
    });
});

/* GET One Celebrity by its Id */
router.get("/celebrities/:id/show", (req, res) => {
  celebrityModel
    .findById(req.params.id)
    .then(dbRes => {
      res.render("celebrities/show", { celebrity: dbRes });
    })
    .catch(dbErr => next(dbErr));
});

/* GET the celebrity create form */
router.get("/celebrities/new", (req, res) => {
  res.render("celebrities/new");
});

/* POST create a celebrity */
router.post("/celebrities/new", (req, res) => {
  celebrityModel
    .create(req.body)
    .then(dbRes => {
      res.redirect("/celebrities");
    })
    .catch(dbErr => {
      res.render("celebrities/new", { errorMsg: "Incorrect input values" });
    });
});

router.get("/celebrities/:id/delete", (req, res) => {
  celebrityModel
    .findByIdAndDelete(req.params.id)
    .then(dbRes => {
      res.redirect("/celebrities");
    })
    .catch(dbErr => res.render("celebrities/index", { errorMsg: dbErr }));
});

router.get("/celebrities/:id/edit", (req, res) => {
  celebrityModel
    .findById(req.params.id)
    .then(dbRes => {
      res.render("celebrities/edit", { celebrity: dbRes });
    })
    .catch(dbErr => {
      res.redirect("/celebrities");
    });
});

router.post("/celebrities/:id/edit", (req, res) => {
  celebrityModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then(dbRes => {
      res.redirect("/celebrities");
    })
    .catch(dbErr => {
      res.render("celebrities/edit", { errorMsg: "Invalid Value" });
    });
});

module.exports = router;
