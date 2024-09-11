import express, { urlencoded } from "express";
import cors from "cors";

import mainRouter from "./routes/index.js";

const app = express();

const PORT  = 3001
// used to handle the middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



app.use("/api/v1", mainRouter );  

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});