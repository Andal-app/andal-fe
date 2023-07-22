import User from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: [
        "uuid",
        "name",
        "position",
        "nip",
        "address",
        "email",
        "role",
        "quota",
        "restCuti",
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      attributes: [
        "uuid",
        "name",
        "position",
        "nip",
        "address",
        "email",
        "role",
        "quota",
        "restCuti",
      ],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  const {
    name,
    position,
    nip,
    address,
    email,
    password,
    confPassword,
    role,
    quota,
    restCuti,
  } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password harus sama" });
  const hashPassword = await argon2.hash(password);
  try {
    await User.create({
      name: name,
      position: position,
      nip: nip,
      address: address,
      email: email,
      password: hashPassword,
      role: role,
      quota: quota,
      restCuti: restCuti,
    });
    res.status(201).json({ msg: "Register berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan " });
  const {
    name,
    position,
    nip,
    address,
    email,
    password,
    confPassword,
    role,
    quota,
    restCuti,
  } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password harus sama" });
  try {
    await User.update(
      {
        name: name,
        position: position,
        nip: nip,
        address: address,
        email: email,
        password: hashPassword,
        role: role,
        quota: quota,
        restCuti: restCuti,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "User updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan " });
  try {
    await User.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "User deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
