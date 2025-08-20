import express, { request, response, Router } from "express";
import mongoose from "mongoose";
import { User } from "./schemas/user.js";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.error(`Error: ${err}`);
  });

app.use(cors());

app.post("/api/users", async (request, response) => {
  let newUser = new User(request.body);
  try {
    const savedUser = await newUser.save();
    return response.status(201).send(savedUser);
  } catch (error) {
    if (error.code === 11000) {
      console.log(`Error: ${error.message}`);
      return response.status(400).send({ error: "❌ Email already exists" });
    }

    return response.status(500);
  }
});

app.post("/api/login", async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(404).send({ error: "❌ User not found" });
    }

    if (user.password !== password) {
      return response
        .status(401)
        .send({ error: "❌ Wrong password. Try again" });
    }

    return response.status(200).send({
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    return response.status(500).send({ error: "❌ Server error" });
  }
});

// app.listen(PORT, () => {
//   console.log(`Running on Port ${PORT}`);
// });
