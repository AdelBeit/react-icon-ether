import { defineConfig } from "tsup";
import path from "path";
import { readFile } from "node:fs/promises";
import http from "node:http";
import postcss from "postcss";

export default defineConfig({
  entry: ["index.ts"],
  sourcemap: true,
  clean: true,
  splitting: false,
  tsconfig: path.resolve(__dirname, "./tsconfig.json"),
  bundle: false,
  format: ["esm", "cjs"],
  outDir: "dist/",
  async onSuccess() {
    const server = http.createServer((req, res) => {
      res.end("Hello World!");
    });
    server.listen(9090);
    return () => {
      server.close();
    };
  },
  // esbuildPlugins: [
  //   {
  //     name: "css-module",
  //     setup(build): void {
  //       build.onResolve(
  //         { filter: /\.module\.css$/, namespace: "file" },
  //         (args) => ({
  //           path: `${args.path}#css-module`,
  //           namespace: "css-module",
  //           pluginData: {
  //             pathDir: path.join(args.resolveDir, args.path),
  //           },
  //         })
  //       );
  //       build.onLoad(
  //         { filter: /#css-module$/, namespace: "css-module" },
  //         async (args) => {
  //           const { pluginData } = args as {
  //             pluginData: { pathDir: string };
  //           };

  //           const source = await readFile(pluginData.pathDir, "utf8");

  //           let cssModule = {};
  //           const result = await postcss([
  //             require("postcss-modules")({
  //               getJSON(_, json) {
  //                 cssModule = json;
  //               },
  //             }),
  //           ]).process(source, { from: pluginData.pathDir });

  //           return {
  //             pluginData: { css: result.css },
  //             contents: `import "${
  //               pluginData.pathDir
  //             }"; export default ${JSON.stringify(cssModule)}`,
  //           };
  //         }
  //       );
  //       build.onResolve(
  //         { filter: /\.module\.css$/, namespace: "css-module" },
  //         (args) => ({
  //           path: path.join(args.resolveDir, args.path, "#css-module-data"),
  //           namespace: "css-module",
  //           pluginData: args.pluginData as { css: string },
  //         })
  //       );
  //       build.onLoad(
  //         { filter: /#css-module-data$/, namespace: "css-module" },
  //         (args) => ({
  //           contents: (args.pluginData as { css: string }).css,
  //           loader: "css",
  //         })
  //       );
  //     },
  //   },
  // ],
});
