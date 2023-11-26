import express, { Request, Response } from "express";
import {
  createCustomer,
  getCustomers,
  getCustomerById,
} from "../controllers/CustomerController";

const customerRouter = express.Router();

customerRouter.get("/", getCustomers);

customerRouter.post("/cadastrar", createCustomer);

customerRouter.get("/:id", getCustomerById);

export { customerRouter };
