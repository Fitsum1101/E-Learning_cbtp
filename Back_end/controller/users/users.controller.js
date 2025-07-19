const bcrypt = require("bcrypt");

const prisma = require("../../config/db");

exports.postUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const profilePicturePath = req.file ? req.file.path : null;

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        // profilePicture: profilePicturePath,
        profilePicture: profilePicturePath,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    res.status(201).json({
      sucess: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};

exports.putUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { name, email } = req.body;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (email && email !== user.email) {
      const existingEmailUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingEmailUser) {
        return res
          .status(409)
          .json({ message: "Another user with this email already exists." });
      }
    }

    const profilePicturePath = req.file ? req.file.path : undefined;

    const updateData = {
      ...(name && { name }),
      ...(email && { email }),
      ...(profilePicturePath && { profilePicture: profilePicturePath }),
    };

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        profilePicture: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "User updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        profilePicture: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    await prisma.user.delete({ where: { id } });

    res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};
