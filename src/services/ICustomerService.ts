import Customer from "src/models/Customer";

export interface ICustomerService {
  validateCustomer(customer: Customer): boolean;
  getCustomers(): Promise<Customer[]>;
  getCustomer(id: number): Promise<Customer | undefined>;
  createCustomer(customer: Customer): Promise<Customer>;
}
