const UserModel = require("../model/userModel");
const { upperCase, lowerCase } = require("../utils/processString");
const { v4: uuidv4 } = require("uuid");
class UserController {
  async getAll(req, res, next) {
    const user = [
      {
        address: "nam dinh",
        birth: 1706167164453,
        email: "dung@gmail.com",
        hometown: "",
        id: "f811722f-9159-4f8b-a6fc-bc5ffbb7b6ab",
        name: "dung",
        phoneNumber: "",
        studentId: "20391902",
      },
      {
        address: "nam dinh",
        birth: 1706167164453,
        email: "dung@gmail.com",
        hometown: "",
        id: "f811722f-9159-4f8b-a6fc-bc5ffbb7b6ab",
        name: "dung",
        phoneNumber: "",
        studentId: "20391902",
      },
      {
        address: "nam dinh",
        birth: 1706167164453,
        email: "dung@gmail.com",
        hometown: "",
        id: "f811722f-9159-4f8b-a6fc-bc5ffbb7b6ab",
        name: "dung",
        phoneNumber: "",
        studentId: "20391902",
      },
      {
        address: "nam dinh",
        birth: 1706167164453,
        email: "dung@gmail.com",
        hometown: "",
        id: "f811722f-9159-4f8b-a6fc-bc5ffbb7b6ab",
        name: "dung",
        phoneNumber: "",
        studentId: "20391902",
      },
    ];

    console.log("get all");
    // await UserModel.getAllData()
    //   .then((data) => {
    //     res.json(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     return res.status(404).json("failed to get user data");
    //   });
    res.json(user);
  }

  async getById(req, res, next) {
    var id = req.params.id;
    if (id) {
      await UserModel.getById(id)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          console.log(err);
          res.status(404).json("get by id failed");
        });
    } else {
      res.status(400).json("Input id");
    }
  }

  async update(req, res) {
    const user = req.body;
    if (user.id && user.name && user.email) {
      await UserModel.checkIdExists(user.id)
        .then(async (data) => {
          if (data[0]["COUNT(*)"] > 0) {
            await UserModel.updateUserById(user)
              .then(() => {
                return res.json("update successfully");
              })
              .catch((err) => {
                return res.status(400).json("failed to get user data");
              });
          } else {
            return res.status(404).json("wrong user id");
          }
        })
        .catch((error) => {
          console.log(error);
          return res.status(404).json("nothing user");
        });
    } else {
      return res.status(404).json("input all required fields: id, name, email");
    }
  }

  async deleteById(req, res, next) {
    var id = req.params.id;

    if (id) {
      await UserModel.removeUserByIdById(id)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          console.log(err);
          res.status(404).json("delete by id failed");
        });
    } else {
      res.status(400).json("Input id");
    }
  }

  async addUser(req, res) {
    const user = req.body;
    if (user.name && user.email && user.studentId) {
      user.id = uuidv4();
      await UserModel.addUser(user)
        .then((data) => {
          return res.json(data);
        })
        .catch((err) => {
          console.log(err);
          return res.status(400).json("add user failed");
        });
    } else {
      return res
        .status(404)
        .json("input all required fields: password, name, email, studentId");
    }
  }
}

module.exports = new UserController();
