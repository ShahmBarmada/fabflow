import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
      { title: "Settings" }
    ];
  };

export default function Settings() {
  return (
    <div>
      <h1>Settings Page</h1>
    </div>
  );
}
