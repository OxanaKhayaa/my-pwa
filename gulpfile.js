const gulp = require("gulp");
const requireDir = require("require-dir");
const tasks = requireDir("./gulp/tasks");

exports.style = tasks.style;
exports.html = tasks.html;
exports.watch = tasks.watch;


exports.default = gulp.parallel(
  exports.style,
  exports.html,
  exports.watch
);
