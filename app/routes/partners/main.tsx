import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
      { title: "Partners" }
    ];
  };

export default function Partners() {
  return (
    <div>
      <h1>Partners Page</h1>
    </div>
  );
}
