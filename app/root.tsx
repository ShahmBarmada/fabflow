import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { GlobalTheme } from "@carbon/react";

import stylesCarbon from "./styles/carbon.css";
import stylesGlobal from "./styles/global.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesCarbon },
  { rel: "stylesheet", href: stylesGlobal },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <GlobalTheme theme="g10">
          <Outlet />
        </GlobalTheme>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
