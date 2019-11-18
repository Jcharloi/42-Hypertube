module.exports = (api) => {
  const isTest = api.env('test');
  api.cache(true);

  return {
    plugins: ['react-hot-loader/babel', "@babel/transform-runtime", "@babel/plugin-proposal-optional-chaining"],
    presets: [
      '@babel/preset-react',
      '@babel/preset-typescript',
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['last 2 versions'],
            "node": "current"
          },
          modules: isTest ? 'commonjs' : false,
        },
      ],
    ],
  };
};
