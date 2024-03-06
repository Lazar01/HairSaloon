const { db } = require("./appController.js");

const getAllBlogs = (req, res) => {
  const query = "SELECT * FROM blogs";
  db.query(query, (err, result) => {
    if (err) res.status(500).send(err);
    else {
      res.status(200).send(result);
    }
  });
};
const makeBlog = (req, res) => {
  const query =
    "INSERT INTO blogs (Title, Description, Image, Date) VALUES (?, ?, ?, ?)";
  const imageFileName = req.file ? req.file.filename : null;
  const values = [
    req.body.title,
    req.body.description,
    imageFileName,
    req.body.date,
  ];

  values.forEach((element) => {
    if (element == "")
      return res.status(400).send("Please provide all neccessery data");
  });

  db.query(query, values, (error, results) => {
    if (error) {
      console.error(error.message);
      return res.status(500).send("Error inserting blog");
    } else {
      console.log("Blog inserted successfully");
      return res.status(200).send("success");
    }
  });
};
const editBlog = (req, res) => {
  let query = "";
  let values = [];

  const imageFileName = req.file ? req.file.filename : null;
  if (req.file) {
    query =
      "UPDATE blogs SET Title = ?, Description = ?, Image = ? WHERE BlogID=?";
    const values = [
      req.body.title,
      req.body.description,
      imageFileName,
      req.body.id,
    ];
  } else {
    query = "UPDATE blogs SET Title = ?, Description = ? WHERE BlogID=?";
    values = [req.body.title, req.body.description, req.body.id];
  }
  console.log(req.file);

  values.forEach((element) => {
    if (element == "")
      return res.status(400).send("Please provide all neccessery data");
  });

  db.query(query, values, (error, results) => {
    if (error) {
      console.error(error.message);
      return res.status(500).send("Error inserting blog");
    } else {
      console.log("Blog updated successfully");
      return res.status(200).send("success");
    }
  });
};
const deleteBlog = (req, res) => {
  const id = req.body.id;
  const query = "DELETE FROM blogs WHERE BlogID = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.log("Error deleting blog:", err);
      return res.status(500).send("Error deleting blog");
    } else {
      console.log("Successfully deleted blog");
      return res.status(200).send("success");
    }
  });
};

module.exports = {
  getAllBlogs,
  makeBlog,
  editBlog,
  deleteBlog,
};
