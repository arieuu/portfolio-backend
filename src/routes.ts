import { Router } from "express";
import { GetMessageController } from "./controllers/GetMessageController";
import { CreateLooseDataController } from "./controllers/CreateLooseDataController";

const router = Router();

const getMessage = new GetMessageController();
const createLooseDataController = new CreateLooseDataController();


// Routes
router.get("/api/v1/message", getMessage.handle);
router.post("/api/v1/data", createLooseDataController.handle);

export { router };