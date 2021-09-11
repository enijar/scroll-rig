#!/usr/bin/env node
const { execSync } = require("child_process");
const { version } = require("../package.json");

execSync(`tsc -p tsconfig.lib.json`);
execSync(`git tag -a ${version} -m "release: ${version}"`, {
  stdio: "inherit",
});
execSync(`git push origin ${version}`);
