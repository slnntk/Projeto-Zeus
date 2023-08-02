const database = require("../database/db");
const dotenv = require("dotenv");

const User = require("../modules/entities/User");

module.exports = {
  async getUser(req, res) {
    try {
      const user = await database.query(
        `SELECT * FROM users WHERE id = ${req.params.userId}`
      );

      console.log(user);

      if (user && user.length > 0) {
        let userData = user[0];

        return res.status(200).json({
          id: userData[0].id,
          name: userData[0].name,
          email: userData[0].email,
          password: userData[0].password,
        });
      } else {
        console.log("User not found");
      }
    } catch (err) {
      console.log(err);
      console.log(user[0]);
      return res.status(400).json({ msg: "Error! " });
    }
  },
};
