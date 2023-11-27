import express, { Request, Response, Router } from "express";
import { CustomerController } from "../controllers/CustomerController";

export class CustomerRouter {
  private router: Router;
  private customerController: CustomerController;

  constructor(customerController: CustomerController) {
    this.router = express.Router();
    this.customerController = customerController;

    this.initializeRoutes();
  }

  getRouter(): Router {
    return this.router;
  }

  private initializeRoutes(): void {
    this.router.get("/", this.customerController.getCustomers);
    this.router.post("/cadastrar", this.customerController.createCustomer);
    this.router.get("/:id", this.customerController.getCustomerById);
  }
}
