const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes) {
  const metadata = await Image(src, {
    outputDir: "./dist/images",
    urlPath: "/images/",
    widths: [640, 768, 1024, 1280, 1536],
    formats: ["webp", "jpeg", "svg"],
  });
  const imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {
  // scss processing
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addWatchTarget("./src/css");
  eleventyConfig.addPassthroughCopy("./src/css");

  // image processing
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

  eleventyConfig.addPassthroughCopy({
    "./src/robots.disallow.txt": "robots.txt",
  });

  // collections
  eleventyConfig.addCollection("blog", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("./src/blog/**/*")
      .filter(
        (post) =>
          typeof post.data.draft === "undefined" || post.data.draft === false
      );
  });

  return {
    dir: {
      input: "src",
      output: "dist",
    },
    markdownTemplateEngine: "njk",
  };
};
