const htmlmin = require("html-minifier");

module.exports = function (eleventyConfig) {
  eleventyConfig.addTransform("htmlmin", function (content) {
    if (this.outputPath?.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        collapseWhitespace: true,
        minifyCSS: true,
        removeComments: true,
        useShortDoctype: true,
      });
      return minified;
    }

    return content;
  });

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
