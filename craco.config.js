const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@Core': path.resolve(__dirname, 'src/Components/'),
      '@Components': path.resolve(__dirname, 'src/Components'),
      '@Modules': path.resolve(__dirname, 'src/Modules'),
      '@Utils': path.resolve(__dirname, 'src/Utils'),
      '@Contexts': path.resolve(__dirname, 'src/Contexts'),
      '@Assets': path.resolve(__dirname, 'src/Assets'),
      '@I18n': path.resolve(__dirname, 'src/I18n'),
      '@Services': path.resolve(__dirname, 'src/Services'),
      '@Redux': path.resolve(__dirname, 'src/Redux'),
      '@Routes': path.resolve(__dirname, 'src/Routes'),
      '@Themes': path.resolve(__dirname, 'src/Themes'),
      '@Hooks': path.resolve(__dirname, 'src/Hooks'),
    }
  },
};