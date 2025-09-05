import { Router } from "express";
import { upload } from "../../../middlewares/multer.middleware";
import { uploadFilesController } from "../uploadController/upload.controller";
import { DEFAULT_VALUES } from "../../../utils/constants";
const router = Router();

router.post("/upload", upload.array("files", DEFAULT_VALUES.FIVE), uploadFilesController);

export default router;