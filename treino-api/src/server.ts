import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import exerciseRoutes from "./routes/exercise.routes";
import muscleRoutes from "./routes/muscle.routes";

dotenv.config();

const app = express();

let corsOptions = {
  origin: ["http://localhost:4200"],
};
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/exercises", exerciseRoutes);
app.use("/muscles", muscleRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
