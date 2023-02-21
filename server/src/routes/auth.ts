import express from "express";
import * as jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { findUserByUsername, validatePassword, getAllUsers } from "../db";

const router = express.Router();

router.get("/users", async (req, res) => {
  const users = await getAllUsers();

  res.json(users);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await findUserByUsername(username);

  if (!user) {
    return res.sendStatus(403);
  }

  try {
    const isPasswordValidated = await validatePassword(
      password,
      user.hashedPassword
    );

    if (!isPasswordValidated) {
      return res.sendStatus(403);
    } else {
      const accessToken = jwt.sign(
        { username, email: user.email },
        process.env.JWT_SECRET as string,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRATION as string,
        }
      );

      const refreshToken = jwt.sign(
        { username },
        process.env.REFRESH_SECRET as string,
        {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRATION as string,
        }
      );

      res
        .cookie("access_token", accessToken, {
          httpOnly: true,
          sameSite: "strict",
          secure: true,
          maxAge: 15 * 60 * 1000, // 15 minutes
        })
        .cookie("refresh_token", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
          secure: true,
          maxAge: 60 * 60 * 1000, // 1 hour
        })
        .status(200)
        .json({ username });
    }
  } catch {
    res.sendStatus(500);
  }
});

router.get("/logout", async (req, res) => {
  res.clearCookie("access_token").clearCookie("refresh_token").sendStatus(200);
});

router.get("/refresh", (req: express.Request, res: express.Response) => {
  const refreshToken = req.cookies?.refresh_token;

  if (!refreshToken) {
    return res.sendStatus(406);
  }
});

export default router;
