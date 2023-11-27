import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import helmet from "helmet";
import { CustomerRouter } from "./http/routes/CustomerRouter";
import { CustomerController } from "./http/controllers/CustomerController";
import { ICustomerService } from "./services/ICustomerService";
import { TYPES } from "./IoC/types";
import container from "./IoC/inversify.config";

const app = express();
app.use(morgan("tiny"));
app.use(helmet());
app.use(express.json());

const handleJSONSyntaxError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof SyntaxError && err.message.includes("JSON")) {
    res.status(400).json({ message: "Invalid JSON in request body" });
  } else {
    next(err); // Pass the error to the default error handler
  }
};

const customerController = new CustomerController(
  container.get<ICustomerService>(TYPES.CustomerService)
);

const customerRouter = new CustomerRouter(customerController);

app.use("/customer", customerRouter.getRouter());

app.use(handleJSONSyntaxError);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

export default app;
