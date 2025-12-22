import express from "express";
import "dotenv/config";
const app = express();
const PORT = process.env.PORT || 7000;
app.get("/", (req, res) => {
    res.send("Hey its working🤓");
});
app.listen(PORT, () => console.log(`server is Running on ${PORT}`));
