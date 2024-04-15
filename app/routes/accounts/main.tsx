import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
      { title: "Accounts" }
    ];
  };

export default function Accounts() {
  return (
    <div>
      <h1>Accounts Page</h1>
    </div>
  );
}
