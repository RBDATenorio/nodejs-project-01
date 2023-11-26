import Customer from "../models/Customer";
import { injectable, inject } from "inversify";
import { ICustomerService } from "./ICustomerService";
import { ICustomerRepository } from "../repositories/ICustomerRepository";
import { TYPES } from "../IoC/types";

@injectable()
export class CustomerService implements ICustomerService {
  private _customerRespository: ICustomerRepository;

  constructor(
    @inject(TYPES.CustomerRespository)
    private customerRespository: ICustomerRepository
  ) {
    this._customerRespository = customerRespository;
  }
  validateCustomer(customer: Customer): boolean {
    throw new Error("Method not implemented.");
  }

  async getCustomers(): Promise<Customer[]> {
    return await this._customerRespository.getCustomers();
  }

  async getCustomer(id: number): Promise<Customer | undefined> {
    const customer = await this._customerRespository.getCustomer(id);
    return customer;
  }

  async createCustomer(customer: Customer): Promise<Customer> {
    if (!customer.name || !customer.cpf) {
      throw new Error("Name and CPF are required");
    }

    return await this._customerRespository.createCustomer(customer);
  }
}
