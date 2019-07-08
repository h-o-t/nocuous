#!/usr/bin/env node

require("ts-node").register({
  project: "./tsconfig.json"
});

module.exports = require("./src/index");
