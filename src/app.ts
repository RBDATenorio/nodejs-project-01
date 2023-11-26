import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import helmet from "helmet";
import { customerRouter } from "./http/routes/CustomerRouter";

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

app.use("/customer", customerRouter);

app.use(handleJSONSyntaxError);

app.use((err: Error, req: Request, res: Response) => {
  res.status(500).json({ message: err.message });
});

export default app;
