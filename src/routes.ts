import { Router } from "express";
import { GetMessageController } from "./controllers/GetMessageController";
import { CreateLooseDataController } from "./controllers/CreateLooseDataController";
import { GetLooseDataController } from "./controllers/GetLooseDataController";

const router = Router();

const getMessage = new GetMessageController();
const createLooseDataController = new CreateLooseDataController();
const getLooseDataController = new GetLooseDataController();

// Routes
router.get("/api/v1/message", getMessage.handle);
router.post("/api/v1/data", createLooseDataController.handle);
router.get("/api/v1/data", getLooseDataController.handle);

export { router };