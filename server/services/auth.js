import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$/;
export class AuthService {
  async register(data, res) {
    try {
      const { name, email, password } = data.body;
      if (!name || !email || !password) {
        return res.status(401).json({ error: "Data requried not found" });
      }
      if (!emailRegex.test(email)) {
        return res.status(401).json({ error: "valid email id" });
      }
      if (email.include("nancy")) {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Nancy tried to register",
          html: `<h1>Nancy tried to register</h1>`,
        };

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error: ", error);
            return res.status(500).json({ error: "Failed to send email" });
          } else {
            console.log("Sent successfully:", info.response);
          }
        });
        return res.status(401).json({ error: "you are not allowed" });
      }

      const existingUser = User.findOne({ email: email });
      if (existingUser) {
        return res
          .status(401)
          .json({ message: "user already exits try to login" });
      }
      const hashedPassword = bcrypt.hash(password, 10);
      const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
      });
      await newUser.save();

      const token = jwt.sign(
        { id: newUser._id, email: email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
      );
      res
        .status(201)
        .json({ message: "created successfully", data: newUser, token });
    } catch (error) {
      return res.status(501).json({ error });
    }
  }
  async login(data, res) {
    try {
      const { email, password } = data.body;
      if (!email || !password) {
        return res.status(401).json({ error: "required data not found" });
      }
      if (!emailRegex.test(email)) {
        return res.status(401).json({ error: "valid email format" });
      }
      const existingUser = User.findOne({ email: email });
      if (!existingUser) {
        return res
          .status(404)
          .json({ message: "user doesnot exit ,try to register" });
      }

      const token = jwt.sign(
        { id: existingUser._id, email: existingUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
      );
      res
        .status(201)
        .json({
          message: "user logged in successfully",
          token,
          data: existingUser,
        });
    } catch (error) {
      return res.status(501).json({ error });
    }
  }
  async edit(data, res) {
    try {
    } catch (error) {
      return res.status(501).json({ error });
    }
  }
  async delete(data, res) {
    try {
    } catch (error) {
      return res.status(501).json({ error });
    }
  }
}
