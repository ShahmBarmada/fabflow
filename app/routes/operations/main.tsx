import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
      { title: "Operations" }
    ];
  };


export default function Operations() {
  return (
    <div>
      <h1>Operations Page</h1>
    </div>
  );
}
