import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
      { title: "Tasks" }
    ];
  };

export default function Tasks() {
  return (
    <div>
      <h1>Tasks Page</h1>
    </div>
  );
}
