import { Request, Response } from "express";
import container from "../../IoC/inversify.config";
import { ICustomerService } from "../../services/ICustomerService";
import { TYPES } from "../../IoC/types";
import Customer from "../../models/Customer";

const customerService = container.get<ICustomerService>(TYPES.CustomerService);

const getCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await customerService.getCustomers();
    res.json(customers);
  } catch (error: Error | any) {
    res.status(500).json({ message: error?.message });
  }
};

const getCustomerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const customer = await customerService.getCustomer(parseInt(id));
    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
    }
    res.json(customer);
  } catch (error: Error | any) {
    res.status(500).json({ message: error?.message });
  }
};

const createCustomer = async (req: Request, res: Response) => {
  try {
    const { name, cpf } = req.body;
    const customer = new Customer(name, cpf);
    const createdCustomer = await customerService.createCustomer(customer);
    res.json(createdCustomer);
  } catch (error: Error | any) {
    res.status(500).send({ message: error?.message });
  }
};

export { createCustomer, getCustomers, getCustomerById };
