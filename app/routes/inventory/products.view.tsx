import { useCallback, useRef, useState } from "react";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import { prisma as orm } from "~/lib/prisma";
import { Form, Layer, TextInput, Tile } from "@carbon/react";
import { Scales, FitToHeight, FitToWidth } from "@carbon/icons-react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

export const meta: MetaFunction = ({ params }) => {
  return [{ title: params.ref }];
};

interface gridInterface {
  prd_id: number;
  prd_ur: string;
  prd_sku: string;
  prd_unit: string;
  prd_price: number;
  prd_type: string;
  prd_state: string;
  prd_color: string;
  prd_desc: string;
  prd_qtb: boolean;
}

export async function loader({ params }: LoaderFunctionArgs) {
  const prdData = await orm.classes.findUnique({ where: { cls_ur: params.ref } });
  const prdVariants = await orm.products.findMany({ where: { prd_cls: prdData?.cls_id } });
  return json({ prdData, prdVariants });
}

export default function ProductsView() {
  const feed = useLoaderData<typeof loader>();
  const gridRef = useRef<AgGridReact<gridInterface>>(null);

  const [colDefs] = useState<ColDef[]>([
    {
      headerName: "ID",
      field: "prd_id",
      cellDataType: "number",
      maxWidth: 96,
      cellClass: "font-medium",
      suppressMovable: true,
    },
    {
      headerName: "Reference",
      field: "prd_ur",
      cellDataType: "text",
    },
    {
      headerName: "SKU",
      field: "prd_sku",
      cellDataType: "text",
    },
    {
      headerName: "Unit",
      field: "prd_unit",
      cellDataType: "text",
    },
    {
      headerName: "Price",
      field: "prd_price",
      cellDataType: "number",
    },
    {
      headerName: "Type",
      field: "prd_type",
      cellDataType: "text",
    },
    {
      headerName: "State",
      field: "prd_state",
      cellDataType: "text",
    },
    {
      headerName: "Color",
      field: "prd_color",
      cellDataType: "text",
    },
    {
      headerName: "Description",
      field: "prd_desc",
      cellDataType: "text",
    },
    {
      headerName: "Quantifiable",
      field: "prd_qty",
      cellDataType: "text",
    },
  ]);

  const onGridRendered = useCallback(() => {
    gridRef.current?.api.sizeColumnsToFit();
  }, []);

  return (
    <Layer>
      <h3>{`Product - ${feed.prdData?.cls_ur}`}</h3>
      <Tile>
        <h4 className="font-medium">Meta Data:</h4>
        <Tile>
          <Form>
            <div className="grid grid-cols-2 gap-4">
              <TextInput id="cls_id" labelText="ID" defaultValue={feed.prdData?.cls_id} readOnly />
              <TextInput id="cls_ur" labelText="Reference" defaultValue={feed.prdData?.cls_ur} readOnly />
              <TextInput id="cls_sku" labelText="SKU" defaultValue={feed.prdData?.cls_sku} readOnly />
              <TextInput id="cls_type" labelText="Type" defaultValue={feed.prdData?.cls_type} readOnly />
              <TextInput id="cls_desc" labelText="Description" defaultValue={feed.prdData?.cls_desc} readOnly />
              <TextInput id="cls_tags" labelText="Tags" defaultValue={feed.prdData?.cls_tags.toString()} readOnly />
              <TextInput id="cls_mft" labelText="Manufacturing Template" defaultValue={feed.prdData?.cls_mft?.toString()} readOnly />
            </div>
          </Form>
        </Tile>
      </Tile>
      <Tile>
        <h4 className="font-medium">Variants:</h4>
        <Tile>
          <div className="ag-theme-quartz h-[35vh]">
            <AgGridReact ref={gridRef} columnDefs={colDefs} rowData={feed.prdVariants} onFirstDataRendered={onGridRendered} />
          </div>
        </Tile>
      </Tile>
    </Layer>
  );
}
