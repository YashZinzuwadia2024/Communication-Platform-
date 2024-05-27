const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const routers = require("./routers/routes");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/", routers);

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
})