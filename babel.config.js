module.exports = (api): any => {
  const isTest = api.env('test');
  api.cache(true);

  return {
    plugins: ['react-hot-loader/babel'],
    presets: [
      '@babel/preset-react',
      '@babel/preset-typescript',
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['last 2 versions'],
          },
          modules: isTest ? 'commonjs' : false,
        },
      ],
    ],
  };
};
