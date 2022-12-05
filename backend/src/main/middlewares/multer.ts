import { Options, diskStorage } from "multer";
import { resolve } from "path";

export const MulterConfig = {
  dest: resolve(__dirname, "public"),
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, "public"));
    },
    filename: (req, file, cb) => {
      cb(null, file.filename + "-" + Date.now() + ".jpg" || ".png" || ".webp");
    },
  }),
  
} as Options;
