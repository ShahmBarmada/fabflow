import { LoaderFunctionArgs, json, ActionFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData, useActionData, MetaFunction } from "@remix-run/react";
// import { prisma as orm } from "~/lib/prisma";

export const meta: MetaFunction = () => {
    return [{ title: "New Product" }];
  };

// export async function loader() {
//   const [prdsTypes, refCounter] = await Promise.all([
//     orm.variants.findMany({
//       select: { var_id: true, var_str: true, var_abb: true },
//       where: { varclasses: { vcs_ur: { equals: "prd_ctg" } } },
//     }),

//     orm.classes
//       .findMany({ select: { cls_ur: true } })
//       .then((res) => {
//         if (res.length > 0) {
//           const mappedRes = res.map((item) => Number(item.cls_ur.replaceAll(/\D/g, "")));
//           return Math.max(...mappedRes) +1;
//         } else {
//           return 1;
//         }
//       })

//       .catch((error) => {
//         console.log(error);
//       }),
//   ]);
//   return json({ prdsTypes, refCounter });
// }

export default function ProductsNew() {
    // const feed = useLoaderData<typeof loader>()
  return (
    <>
      {/* <p>{JSON.stringify(feed.prdsTypes)}</p> */}
      {/* <p>{feed.refCounter}</p> */}
    </>
  );
}
