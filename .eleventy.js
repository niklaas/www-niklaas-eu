const production = process.env.NODE_ENV === "production";

const Image = require("@11ty/eleventy-img");
const htmlmin = require("html-minifier");

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
      .getFilteredByGlob("./src/blog/posts/**/*")
      .filter((post) => post.data.draft != true);
  });

  eleventyConfig.addFilter("keys", (obj) => Object.keys(obj));
  eleventyConfig.addFilter("exclude", (list, exclusion) =>
    list.filter((l) => !exclusion.includes(l))
  );
  eleventyConfig.addFilter("shuf", (list) =>
    list.sort(() => Math.random() - 0.5)
  );

  production &&
    eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
      if (outputPath && outputPath.endsWith(".html")) {
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true,
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
    markdownTemplateEngine: "njk",
  };
};
