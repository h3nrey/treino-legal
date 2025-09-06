import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import exerciseRoutes from "./routes/exercise.routes";
import muscleRoutes from "./routes/muscle.routes";
import equipamentRoutes from "./routes/equipament.routes";
import userRoutes from "./routes/user.routes";
import trainingRoutes from "./routes/training.routes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();

let corsOptions = {
  // origin: ["http://localhost:4200"],
  origin: "*",
};
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/exercises", exerciseRoutes);
app.use("/muscles", muscleRoutes);
app.use("/equipaments", equipamentRoutes);
app.use("/users", userRoutes);
app.use("/trainings", trainingRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
