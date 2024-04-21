const express = require('express')
const app = express()
const dotenv = require('dotenv')
const adminAuthorization = require('./middleware/adminAuthorization')
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send('Hello there!')
})

const authController = require("./auth/auth.controller");
const userController = require("./user/user.controller");
const itemController = require("./item/item.controller");
const transactionController = require("./transaction/transaction.controller");

app.use("/auth", authController);
app.use("/users", adminAuthorization, userController);
app.use("/items", itemController);
app.use("/transactions", transactionController);

app.listen(PORT, () => {
  console.log(`App listening on port ` + PORT)
})