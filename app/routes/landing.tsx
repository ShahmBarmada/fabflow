import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "FabricFlow" }, { name: "FabricFlow App", content: "Welcome to FabricFlow" }];
};

export default function Index() {
  return (
    <div>
      <h1>Welcome to FabricFlow</h1>
    </div>
  );
}
