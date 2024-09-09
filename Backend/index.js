import express from "express";
import {cors} from "cors";
app.use(cors());
app.use(express.json());
import {mainRouter} from "./routes/index.js";

const app = express();

app.use("/api/v1", mainRouter );   // used to handle the middlewares




app.listen(3000);