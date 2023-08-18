import mongoose from "mongoose";
import { loadType } from "mongoose-currency";
// import { transactions } from "../server/data";

const Schema = mongoose.Schema;
loadType(mongoose);



const ProductSchema = new Schema(
  {
    price: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    expense: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    transaction: [{
      type: mongoose.Schema.Types.ObjectId , 
      ref :"Transactions"
    }],
 
   
  },
  { timestamps: true, toJSON: { getters: true } }
);

const Products = mongoose.model("Products", ProductSchema);

export default Products;
