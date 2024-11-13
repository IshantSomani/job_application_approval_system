const express = require('express');
const connectDb = require("./config/db");
const cors = require('cors');
const path = require("path");
const applicationsRoutes = require("./routes/JobApplication");
const userRoutes = require("./routes/user");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
connectDb();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/", userRoutes);
app.use("/", applicationsRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// http://localhost:3000/applications