const bcrypt = require("bcrypt");

const prisma = require("../../config/db");
const { deleteFile } = require("../../util/removeFile");
const path = require("path");
const validate = require("../../util/validate.util");

exports.postUser = async (req, res, next) => {
  try {
    const { firstName, lastName, userName, email, password } = req.body;

    const existingFields = validate(req);

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { userName }],
      },
    });

    if (user) {
      if (!existingFields.email && user.email === email) {
        existingFields.email = "Email already exists";
      }

      if (!existingFields.userName && user.userName === userName) {
        existingFields.userName = "Username already exists";
      }
    }

    if (Object.keys(existingFields).length > 0) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: existingFields,
      });
      return deleteFile(path.join(require.main.path, req.file.path));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const profilePicturePath = req.file ? req.file.path : null;
    const newUser = await prisma.user.create({
      data: {
        userName,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        profilePicture: profilePicturePath,
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
    const { firstName, lastName, userName, password } = req.body;

    const existingFields = validate(req);

    const user = await prisma.user.findUnique({ where: { id: userId } });
    const isUserNameExists = await prisma.user.findUnique({
      where: {
        userName,
      },
      select: {
        userName: true,
        id: true,
      },
    });

    if (!user) {
      return res.status(400).json({
        success: "false",
        message: "user with this id does not exists",
        errors: existingFields,
      });
    }
    if (
      !existingFields.userName &&
      isUserNameExists &&
      user.id !== isUserNameExists.id
    ) {
      existingFields.userName = "Username already exists";
    }
    const isFileUpoaded = req.file;

    if (Object.keys(existingFields).length > 0) {
      res.status(400).json({
        success: "false",
        message: "Validation failed",
        errors: existingFields,
      });
      if (isFileUpoaded)
        deleteFile(path.join(require.main.path, req.file.path));
      return;
    }

    const profilePicturePath = isFileUpoaded
      ? req.file.path
      : user.profilePicture;
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        userName,
        password: hashedPassword,
        profilePicture: profilePicturePath,
      },
    });

    res.status(200).json({
      success: true,
      message: "User updated successfully.",
      user: updatedUser,
    });

    if (user.profilePicture)
      deleteFile(path.join(require.main.path, user.profilePicture));
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
        userName: true,
        lastName: true,
        firstName: true,
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
    if (user.profilePicture)
      deleteFile(path.join(require.main.path, user.profilePicture));
  } catch (error) {
    next(error);
  }
};
