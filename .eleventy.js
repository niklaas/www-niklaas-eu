module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addWatchTarget("./src/css");

  eleventyConfig.addPassthroughCopy("./src/images");
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy({
    "./src/robots.disallow.txt": "robots.txt",
  });

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
