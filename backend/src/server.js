const express = require("express");
const cors = require("cors");
const expenseRoute = require("./routes/expense.route.js");
const userRoute = require("./routes/user.route.js");
require("dotenv").config();
require("../src/Db/db");
const path = require("path");

const _dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", userRoute);
app.use("/api", expenseRoute);

app.use(express.static(path.join(_dirname, "/client/dist")));
app.use((req, res) => {
    res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
