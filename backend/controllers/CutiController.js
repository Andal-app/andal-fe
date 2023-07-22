import Cuti from "../models/CutiModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getCutiData = async (req, res) => {
  try {
    let response;
    if (req.role === "Kepegawaian" || req.role !== "Pegawai") {
      response = await Cuti.findAll({
        attributes: [
          "uuid",
          "type",
          "reason",
          "startDate",
          "endDate",
          "duration",
          "isVerifiedAtasan",
          "isVerifiedKadis",
          "isVerifiedKepegawaian",
          "atasanVerificationDate",
          "kadisVerificationDate",
          "kepegawaianVerificationDate",
          "updatedAt",
        ],
        include: [
          {
            model: User,
            attributes: ["uuid", "name", "email", "role", "quota", "restCuti"],
          },
        ],
      });
    } else {
      response = await Cuti.findAll({
        attributes: [
          "uuid",
          "type",
          "reason",
          "startDate",
          "endDate",
          "duration",
          "isVerifiedAtasan",
          "isVerifiedKadis",
          "isVerifiedKepegawaian",
          "atasanVerificationDate",
          "kadisVerificationDate",
          "kepegawaianVerificationDate",
          "updatedAt",
        ],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: User,
            attributes: ["uuid", "name", "email", "role", "quota", "restCuti"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getCutiById = async (req, res) => {
  try {
    const cuti = await Cuti.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!cuti) return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    if (req.role === "Kepegawaian" || req.role !== "Pegawai") {
      response = await Cuti.findOne({
        attributes: [
          "uuid",
          "type",
          "reason",
          "startDate",
          "endDate",
          "duration",
          "isVerifiedAtasan",
          "isVerifiedKadis",
          "isVerifiedKepegawaian",
          "atasanVerificationDate",
          "kadisVerificationDate",
          "kepegawaianVerificationDate",
          "updatedAt",
        ],
        where: {
          id: cuti.id,
        },
        include: [
          {
            model: User,
            attributes: ["uuid", "name", "email", "role", "quota", "restCuti"],
          },
        ],
      });
    } else {
      response = await Cuti.findOne({
        attributes: [
          "uuid",
          "type",
          "reason",
          "startDate",
          "endDate",
          "duration",
          "isVerifiedAtasan",
          "isVerifiedKadis",
          "isVerifiedKepegawaian",
          "atasanVerificationDate",
          "kadisVerificationDate",
          "kepegawaianVerificationDate",
          "updatedAt",
        ],
        where: {
          [Op.and]: [{ id: cuti.id }, { userId: req.userId }],
        },
        include: [
          {
            model: User,
            attributes: ["uuid", "name", "email", "role", "quota", "restCuti"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createCuti = async (req, res) => {
  const {
    type,
    reason,
    startDate,
    endDate,
    duration,
    isVerifiedAtasan,
    isVerifiedKadis,
    isVerifiedKepegawaian,
    atasanVerificationDate,
    kadisVerificationDate,
    kepegawaianVerificationDate,
  } = req.body;
  try {
    await Cuti.create({
      type: type,
      reason: reason,
      startDate: startDate,
      endDate: endDate,
      duration: duration,
      isVerifiedAtasan: isVerifiedAtasan,
      isVerifiedKadis: isVerifiedKadis,
      isVerifiedKepegawaian: isVerifiedKepegawaian,
      atasanVerificationDate: atasanVerificationDate,
      kadisVerificationDate: kadisVerificationDate,
      kepegawaianVerificationDate: kepegawaianVerificationDate,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Cuti Created" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateCuti = async (req, res) => {
  try {
    const cuti = await Cuti.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!cuti) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const {
      type,
      reason,
      startDate,
      endDate,
      duration,
      isVerifiedAtasan,
      isVerifiedKadis,
      isVerifiedKepegawaian,
      atasanVerificationDate,
      kadisVerificationDate,
      kepegawaianVerificationDate,
    } = req.body;
    if (req.role !== "Pegawai") {
      await Cuti.update(
        {
          type,
          reason,
          startDate,
          endDate,
          duration,
          isVerifiedAtasan,
          isVerifiedKadis,
          isVerifiedKepegawaian,
          atasanVerificationDate,
          kadisVerificationDate,
          kepegawaianVerificationDate,
        },
        {
          where: {
            id: cuti.id,
          },
        }
      );
    } else {
      if (req.userId !== cuti.userId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await Cuti.update(
        {
          type,
          reason,
          startDate,
          endDate,
          duration,
          isVerifiedAtasan,
          isVerifiedKadis,
          isVerifiedKepegawaian,
          atasanVerificationDate,
          kadisVerificationDate,
          kepegawaianVerificationDate,
        },
        {
          where: {
            [Op.and]: [{ id: cuti.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({ msg: "Cuti updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteCuti = async (req, res) => {
  try {
    const cuti = await Cuti.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!cuti) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const {
      type,
      reason,
      startDate,
      endDate,
      duration,
      isVerifiedAtasan,
      isVerifiedKadis,
      isVerifiedKepegawaian,
      atasanVerificationDate,
      kadisVerificationDate,
      kepegawaianVerificationDate,
    } = req.body;
    if (req.role === "Kepegawaian") {
      await Cuti.destroy({
        where: {
          id: cuti.id,
        },
      });
    } else {
      if (req.userId !== cuti.userId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await Cuti.destroy({
        where: {
          [Op.and]: [{ id: cuti.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Cuti deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
