"use strict";

const {watch, parallel, series} = require("gulp");

module.exports = function watching() {
    watch('src/**/*.scss', parallel('style'));
    watch('src/**/*.html', parallel('html'));
}
