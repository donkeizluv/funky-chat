const express = require("express");

module.exports = function(distPath) {
  return express.static(distPath);
};
