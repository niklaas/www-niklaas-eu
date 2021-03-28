module.exports = function(eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false)
  eleventyConfig.addWatchTarget("./src/css")

  eleventyConfig.addPassthroughCopy("./src/images")
  eleventyConfig.addPassthroughCopy("./src/css")

  return {
    dir: {
      input: "src",
      output: "dist"
    }
  }
}
