import sharp from "sharp";
import { readdir } from "fs/promises";
import { join } from "path";

const folders = [
  { src: "public/pcframes", dest: "public/pcframes-jpg" },
  { src: "public/mobileframes", dest: "public/mobileframes-jpg" },
];

const QUALITY = 82;
const MAX_WIDTH = 1920;

async function convertFolder(src, dest) {
  const { mkdir } = await import("fs/promises");
  await mkdir(dest, { recursive: true });

  const files = (await readdir(src))
    .filter((f) => f.endsWith(".png"))
    .sort();

  console.log(`Converting ${files.length} files in ${src}...`);

  let done = 0;
  for (const file of files) {
    const srcPath = join(src, file);
    const destFile = file.replace(".png", ".jpg");
    const destPath = join(dest, destFile);

    await sharp(srcPath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toFile(destPath);

    done++;
    if (done % 25 === 0) process.stdout.write(`  ${done}/${files.length}\r`);
  }
  console.log(`\n  Done: ${dest}`);
}

for (const { src, dest } of folders) {
  await convertFolder(src, dest);
}
console.log("All conversions complete.");
