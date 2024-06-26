const userModel = require("../Models/user.js");

const getUsers = async (req, res) => {
  try {
    const users = await userModel.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// post users
const addUsers = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validate name and email if necessary
    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required fields",
      });
    }

    const newUser = await userModel.addUsers(name, email);
    if (!newUser) {
      return res.status(500).json({
        message: "Failed to add user",
      });
    }

    // Respond with success message
    return res.status(201).json({
      message: "User Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// update users
const updateUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    // Validate name and email if necessary
    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required fields",
      });
    }

    const updateUser = await userModel.updateUsers(id, name, email);
    if (!updateUser) {
      res.status(404).json({
        message: "User Not Found",
      });
    }

    // Respond with success message
    return res.status(200).json({
      message: "User Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// delete users
const deleteUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await userModel.deleteUsers(id);
    if (!deleteUser) {
      res.status(404).json({
        message: "User Not Found",
      });
    }
    res.status(204).json({
      message: "User Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getUsers,
  addUsers,
  updateUsers,
  deleteUsers,
};
