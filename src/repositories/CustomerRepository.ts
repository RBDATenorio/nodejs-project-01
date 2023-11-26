import Customer from "../models/Customer";
import { ICustomerRepository } from "./ICustomerRepository";
import { injectable } from "inversify";

@injectable()
export class CustomerRepository implements ICustomerRepository {
  private customers: Customer[] = [];

  async getCustomers(): Promise<Customer[]> {
    return new Promise((resolve, reject) => {
      resolve(this.customers);
    });
  }

  async getCustomer(id: number): Promise<Customer | undefined> {
    return new Promise((resolve, reject) => {
      return resolve(this.customers.find((customer) => customer.id === id));
    });
  }

  async createCustomer(customer: Customer): Promise<Customer> {
    return new Promise((resolve, reject) => {
      this.customers.push(customer);
      return resolve(customer);
    });
  }
}
