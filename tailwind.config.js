module.exports = {
  content: ["./**/*.tsx"],
  theme: {
    extend: {
      colors: {
        cyan: "#59c1cc",
        pink: "#eb6a7c",
        grayish: "#8c8c8e",
      },
    },
  },
  plugins: [],
  corePlugins: require("tailwind-rn/unsupported-core-plugins"),
};
