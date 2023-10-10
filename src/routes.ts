import { Router } from "express";
import { CreateLooseDataController } from "./controllers/CreateLooseDataController";
import { GetLooseDataController } from "./controllers/GetLooseDataController";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { CreatePostController } from "./controllers/CreatePostController";
import { EditPostController } from "./controllers/EditPostController";
import { DeletePostController } from "./controllers/DeletePostController";
import { GetPostController } from "./controllers/GetPostController";
import multer from "multer";

/**
 * Set up a more intrinsicate binary storage config instead of just passing the "dest" propriety
 * to our upload constant
 * 
 * Here we can set the filename the destination and so on
 */

const storage = multer.diskStorage({
    destination: function(request, file, callback) {
        callback(null, "./uploads");
    },

    filename: function(request, file, callback) {
        callback(null, new Date().toISOString() + "-" + file.originalname);
    }
});

const upload = multer({storage: storage});

const router = Router();

const createLooseDataController = new CreateLooseDataController();
const getLooseDataController = new GetLooseDataController();
const authenticateUserController = new AuthenticateUserController();
const createUserController = new CreateUserController();
const createPostController = new CreatePostController();
const editPostController = new EditPostController();
const deletePostController = new DeletePostController();
const getPostController = new GetPostController();

// Routes

router.post("/api/v1/data", ensureAuthenticated, createLooseDataController.handle);
router.post("/api/v1/session", authenticateUserController.handle);
router.post("/api/v1/user", createUserController.handle);
router.post("/api/v1/post", ensureAuthenticated, upload.single("projectImage"), createPostController.handle);
router.put("/api/v1/post", ensureAuthenticated, upload.single("projectImage"), editPostController.handle);
router.delete("/api/v1/post:postId", ensureAuthenticated, deletePostController.handle);
router.get("/api/v1/data?:type", getLooseDataController.handle);
router.get("/api/v1/post?:postId", getPostController.handle);

export { router };