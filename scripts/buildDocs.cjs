const fs = require("fs");
const { execSync } = require("child_process");

fs.renameSync(
  __dirname + "/../docs/pages/docs/playground.mdx",
  __dirname + "/playground.mdx",
);

execSync("rspress build", { cwd: __dirname + "/../docs", stdio: "inherit" });

fs.renameSync(
  __dirname + "/playground.mdx",
  __dirname + "/../docs/pages/docs/playground.mdx",
);
