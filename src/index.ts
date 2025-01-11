import app from "./app";
import dotenv from "dotenv";
dotenv.config();
const { PORT } = process.env;

const port = PORT || 8000;

app.listen(port, () => {
    console.info(`Server connected on ${port}`);
});
