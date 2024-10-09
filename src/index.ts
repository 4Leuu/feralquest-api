import express from "express";
import { config } from "dotenv";
import { userRouter } from "./routes/userRoutes";
import { productRouter } from "./routes/productRoutes";

config();

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/products", productRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`listening on port ${port}`));
