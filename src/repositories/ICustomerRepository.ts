import Customer from "../models/Customer";

export interface ICustomerRepository {
  getCustomers(): Promise<Customer[]>;
  getCustomer(id: number): Promise<Customer | undefined>;
  createCustomer(customer: Customer): Promise<Customer>;
}
