/* eslint-disable */
const rewireLess = require('react-app-rewire-less-modules');
// const rewireSVGR = require('react-app-rewire-svgr');

module.exports = {
  webpack: (config, env) => {
    config = rewireLess.withLoaderOptions({
      // javascriptEnabled: true,
      // modifyVars: { "@primary-color": "#1DA57A" },
    })(config, env);

    // config = rewireSVGR(config, env, {
    //   babel: false,
    //   icon: true,
    // });

    return config;
  },
  // devServer: configFunction => {
  //   return (proxy, allowedHost) => {
  //     const config = configFunction(proxy, allowedHost);
  //     config.historyApiFallback.rewrites = [
  //       { from: /^\/login\.html/, to: '/build/login.html' },
  //       { from: /^\/admin\.html/, to: '/build/admin.html' },
  //       { from: /^\/auth\.html/, to: '/build/auth.html' },
  //     ];
  //     return config;
  //   };
  // },
};
