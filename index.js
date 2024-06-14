const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");

// For documentation generation
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerOptions = require("./swagger");

const jsDoc = swaggerJsDoc(swaggerOptions);

const app = express();
// Dot env files
dotenv.config();
// Mongo Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected Successfully"))
  .catch((err) => console.log(err));

// Middlewares
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(jsDoc));
// Port for listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
