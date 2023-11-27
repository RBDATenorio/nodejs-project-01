import { Request, Response } from "express";
import container from "../../IoC/inversify.config";
import { ICustomerService } from "../../services/ICustomerService";
import { TYPES } from "../../IoC/types";
import Customer from "../../models/Customer";
import { inject } from "inversify/lib/annotation/inject";

export class CustomerController {
  private _customerService: ICustomerService;

  constructor(
    @inject(TYPES.CustomerService) private customerService: ICustomerService
  ) {
    this._customerService = container.get<ICustomerService>(
      TYPES.CustomerService
    );
  }

  getCustomers = async (req: Request, res: Response) => {
    try {
      const customers = await this._customerService.getCustomers();
      res.json(customers);
    } catch (error: Error | any) {
      res.status(500).json({ message: error?.message });
    }
  };

  getCustomerById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const customer = await this._customerService.getCustomer(parseInt(id));
      if (!customer) {
        res.status(404).json({ message: "Customer not found" });
      }
      res.json(customer);
    } catch (error: Error | any) {
      res.status(500).json({ message: error?.message });
    }
  };

  createCustomer = async (req: Request, res: Response) => {
    try {
      const { name, cpf } = req.body;
      const customer = new Customer(name, cpf);
      const createdCustomer = await this._customerService.createCustomer(
        customer
      );
      res.json(createdCustomer);
    } catch (error: Error | any) {
      res.status(500).send({ message: error?.message });
    }
  };
}
