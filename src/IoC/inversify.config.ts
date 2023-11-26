import { Container } from "inversify";
import "reflect-metadata";
import { TYPES } from "./types";
import { ICustomerRepository } from "../repositories/ICustomerRepository";
import { CustomerRepository } from "../repositories/CustomerRepository";
import { ICustomerService } from "../services/ICustomerService";
import { CustomerService } from "../services/CustomerService";

const container = new Container();

container
  .bind<ICustomerRepository>(TYPES.CustomerRespository)
  .to(CustomerRepository);

container.bind<ICustomerService>(TYPES.CustomerService).to(CustomerService);

export default container;
