import { Router } from "express";
import { GetMessageController } from "./controllers/GetMessageController";
import { CreateLooseDataController } from "./controllers/CreateLooseDataController";
import { GetLooseDataController } from "./controllers/GetLooseDataController";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { CreatePostController } from "./controllers/CreatePostController";

const router = Router();

const getMessage = new GetMessageController();
const createLooseDataController = new CreateLooseDataController();
const getLooseDataController = new GetLooseDataController();
const authenticateUserController = new AuthenticateUserController();
const createUserController = new CreateUserController();
const createPostController = new CreatePostController();

// Routes

router.get("/api/v1/message", getMessage.handle);
router.post("/api/v1/data", ensureAuthenticated, createLooseDataController.handle);
router.get("/api/v1/data?:type", getLooseDataController.handle);
router.post("/api/v1/session", authenticateUserController.handle);
router.post("/api/v1/user", createUserController.handle);
router.post("/api/v1/post", createPostController.handle);

export { router };