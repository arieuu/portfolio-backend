import { Router } from "express";
import { GetMessageController } from "./controllers/GetMessageController";

const router = Router();

const getMessage = new GetMessageController();

router.get("/message", getMessage.handle);

export { router };