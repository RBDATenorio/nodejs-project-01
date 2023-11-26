export default class Customer {
  id: number;
  name: string;
  cpf: string;

  private static idCounter = 1;

  constructor(name: string, cpf: string) {
    this.id = Customer.idCounter++;
    this.name = name;
    this.cpf = cpf;
  }
}
