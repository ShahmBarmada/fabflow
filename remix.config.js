/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/*.css", "**/*.scss", "**/*.css.map"],
  serverModuleFormat: "esm",
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildPath: "build/index.js",
  dev: { port: 4000 },

  routes(defineRoutes) {
    return defineRoutes((route) => {
      route("/", "routes/landing.tsx", { index: true });
      route("login", "routes/login.tsx");
      route(undefined, "routes/layout.tsx", () => {
        route("dashboard", "routes/dashboard/main.tsx");
        route("accounts", "routes/accounts/main.tsx");
        route("inventory", "routes/inventory/inventory.tsx", () => {
          route("transactions", "routes/inventory/transactions.tsx");
          route("stock", "routes/inventory/stock.tsx");
          route("products", "routes/inventory/products.tsx", () => {
            route("", "routes/inventory/products.index.tsx", { index: true });
            route(":ref", "routes/inventory/products.view.tsx");
            route(':ref/edit', 'routes/inventory/products.edit.tsx')
            route('new', 'routes/inventory/products.new.tsx')
          });
          route("variants", "routes/inventory/variants.tsx");
          route("warehouses", "routes/inventory/warehouses.tsx");
          route("manufacturing", "routes/inventory/manufacturing.tsx");
        });
        route("operations", "routes/operations/main.tsx");
        route("partners", "routes/partners/main.tsx");
        route("settings", "routes/settings/main.tsx");
        route("tasks", "routes/tasks/main.tsx");
      });
    });
  },
};
