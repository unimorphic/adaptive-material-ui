const fs = require("fs");

let packageFileContent = fs
  .readFileSync(__dirname + "/../package.json")
  .toString("utf-8");

packageFileContent = packageFileContent.replaceAll("./dist/", "./");

const packageInfo = JSON.parse(packageFileContent);
packageInfo.devDependencies = undefined;
packageInfo.private = false;
packageInfo.scripts = undefined;

fs.writeFileSync(
  __dirname + "/../dist/package.json",
  JSON.stringify(packageInfo, null, 2),
  "utf-8",
);

fs.copyFileSync(
  __dirname + "/esm-package.json",
  __dirname + "/../dist/esm/package.json",
);

fs.copyFileSync(__dirname + "/../README.md", __dirname + "/../dist/README.md");
