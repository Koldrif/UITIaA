const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors')

const authRouter = require("./src/auth");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(authRouter);
const corsOptions = {
    origin: 'http://localhost:3000',
    allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Methods", "Access-Control-Request-Headers", "Access-Control-Allow-Origin"],
    credentials: true,
    enablePreflight: true
}

app.use(cors(corsOptions));
app.options('*', cors(corsOptions))

const port = 3001;
app.listen(port, () => console.log(`Server listens port: ${port}`));