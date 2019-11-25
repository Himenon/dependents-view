import * as webpack from "webpack";
import { generateConfig, generatePublicPath } from "./webpack.config";
import * as webpackDevServer from "webpack-dev-server";
import * as url from "native-url";

const main = async () => {
  const isProduction = process.env.NODE_ENV === "production";
  const publicPath = generatePublicPath(isProduction);
  const { port } = url.parse(publicPath);

  const config = generateConfig(isProduction);
  const compiler = webpack(config);
  const server = new webpackDevServer(compiler, {
    hot: true,
    open: true,
    historyApiFallback: true,
    publicPath: publicPath,
  });
  server.listen(parseInt(port || "9000", 10));
};

main().catch(e => {
  if (e && e.message) {
    console.error(e.message);
  }
});
