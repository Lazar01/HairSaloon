const { db } = require("./appController.js");
const { userVerification } = require("./appController.js");

const editUserProfile = async (req, res) => {
  console.log("nesto");
  const token = req.headers["access-token"];
  const verify = await userVerification(token);
  if (!verify.bool) {
    return res.send("NotAuthenticated");
  } else {
    const query =
      "UPDATE customer SET Name = ?, EmailAddress = ?, ContactNumber = ? WHERE CustomerID = ? ";
    const values = [
      req.body.name,
      req.body.email,
      req.body.contactNumber,
      req.body.customerID,
    ];
    db.query(query, values, (err, result) => {
      console.log("jej");
      if (err) {
        console.log(err);
        return res.status(500).send("Cant update profile!");
      } else {
        console.log("Successfuly updated profile!");
        return res.status(200).send("successful");
      }
    });
  }
};

module.exports = {
  editUserProfile,
};
