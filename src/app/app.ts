import { error, log } from "console";
import express, { NextFunction, Request, Response } from "express";
const app = express();
export const port = process.env.PORT || 3000;

// Parser
app.use(express.json());

// Midleware
const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.url, req.method, req.hostname, req.path, req.ip, req.route);
  next();
};

// Routes
const userRouter = express.Router();
const courseRouter = express.Router();

app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);

// User routes
userRouter.post("/create-user", (req: Request, res: Response) => {
  const user = req.body;
  console.log(user);

  res.json({
    success: true,
    message: "User created successfully.",
    user,
  });
});

// Course routes
courseRouter.post("/add-course", (req: Request, res: Response) => {
  const course = req.body;
  console.log(course);

  res.json({
    success: true,
    message: "Course added successfully.",
    course,
  });
});

//* Extra routes

// Default route
app.get(
  "/",
  logger,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // res.send("Hello from EXPRESS server.");
      res.send(HellloWorld!);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

// UserId route
app.get("/users/:userId", (req: Request, res: Response) => {    
  console.log(req.params.userId);
});

// Post route
app.post("/", logger, (req: Request, res: Response) => {
  console.log(req.body);
  res.json({
    status: res.statusCode,
    message: "Data received successfully.",
  });
});

// New route
const newRouter = express.Router();
app.use("/api/v1/new", newRouter);
newRouter.get("/new", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "New route accessed successfully.",
  });
});

//* Global routiting error
app.all("/*", (req: Request, res: Response) => {
  res.status(404).send({
    success: false,
    message: "Page not found.",
  });
});

//* Global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(400).send({
      success: false,
      message: "An error occurred.",
    });
  }
});

export default app;
