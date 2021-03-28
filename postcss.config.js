module.exports = postcssConfig => {
  const production = process.env.NODE_ENV === "production"

  return {
    plugins: [
      require('tailwindcss')(),
      require('autoprefixer'), // use this via cssnano advanced preset
      production && require('cssnano')({ preset: 'default' }),
    ]
  }
}
