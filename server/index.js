import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import KpisRouts from "./routes/kpi.js";
import ProductRoutes from './routes/product.js'
import TransactionRoutes from  './routes/transaction.js'
import Products from "./models/productModel.js";
import Transactions from "./models/transactionModel.js";

import  { kpis  , products , transactions} from "./server/data.js";
import KPI from "./models/kpiModel.js";


// CONFIGRATION

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//Routes

app.use("/kpi", KpisRouts);
app.use("/product", ProductRoutes);
app.use("/transaction", TransactionRoutes);

// MONGOOSE

const port = process.env.PORT || 9000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    // useUnifiedTolopy: true,
  })
  .then(async () => {
    app.listen(port, () => console.log(`listening to port : ${port}`));
    // To load the data only once in  the database
    // await mongoose.connection.db.dropDatabase();
    // KPI.insertMany(kpis);
    // Products.insertMany(products);
    // Transactions.insertMany(transactions);
  })
  .catch((error) => console.log(`eroor appen in the port ${error.message}`));
