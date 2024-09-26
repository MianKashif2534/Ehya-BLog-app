// fileRemover
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileRemover = (filename) => {
  fs.unlink(path.join(__dirname, "../uploads", filename), function (err) {
    if (err && err.code == "ENOENT") {
      // file doesn't exit
      console.log(`File ${filename} doesn't exits, won't remove it.`);
    } else if (err) {
      console.log(`Error ocured while trying to remove ${filename} `);
    } else {
      console.log(`removed ${filename}`);
    }
  });
};

export { fileRemover };
