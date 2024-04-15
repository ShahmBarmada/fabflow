import { useCallback, useRef, useState } from "react";
import { MetaFunction, useLoaderData, useNavigate } from "@remix-run/react";
import { prisma as orm } from "~/lib/prisma";
import { Button, Layer, Search, Tile } from "@carbon/react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

export const meta: MetaFunction = () => {
  return [{ title: "Products" }];
};

export async function loader() {
  const feed = await orm.classes.findMany();
  return feed;
}

interface gridInterface {
  cls_id: number;
  cls_ur: string;
  cls_type: string;
  cls_sku: string;
  cls_desc: string;
  cls_tags: string;
  cls_height: number;
  cls_width: number;
  cls_weight: number;
  cls_mft: string;
}

export default function ProductsIndex() {
  const feed = useLoaderData<typeof loader>();
  const gridRef = useRef<AgGridReact<gridInterface>>(null);
  const navigate = useNavigate();

  const [colDefs] = useState<ColDef[]>([
    {
      headerName: "ID",
      field: "cls_id",
      cellDataType: "number",
      maxWidth: 96,
      cellClass: "font-semibold",
      suppressMovable: true,
    },
    {
      headerName: "Reference",
      field: "cls_ur",
      cellDataType: "text",
      maxWidth: 112,
      cellStyle: { color: "var(--cds-link-primary)", cursor: "pointer" },
      onCellClicked: (e) => {
        navigate(`/inventory/products/${e.value}`);
      },
    },
    {
      headerName: "Type",
      field: "cls_type",
      cellDataType: "text",
      maxWidth: 112,
      filter: "agTextColumnFilter",
      filterParams: { buttons: ["apply", "reset"] },
    },
    {
      headerName: "SKU",
      field: "cls_sku",
      cellDataType: "text",
      maxWidth: 112,
      filter: "agTextColumnFilter",
      filterParams: { buttons: ["apply", "reset"] },
    },
    {
      headerName: "Description",
      field: "cls_desc",
      cellDataType: "text",
      filter: "agTextColumnFilter",
      filterParams: { buttons: ["apply", "reset"] },
    },
    {
      headerName: "Tags",
      field: "cls_tags",
      cellDataType: "text",
      filter: "agTextColumnFilter",
      filterParams: { buttons: ["apply", "reset"] },
    },
    { headerName: "Height", field: "cls_height", cellDataType: "number", maxWidth: 96, cellClass: "text-center" },
    { headerName: "Width", field: "cls_width", cellDataType: "number", maxWidth: 96, cellClass: "text-center" },
    { headerName: "Weight", field: "cls_weight", cellDataType: "number", maxWidth: 96, cellClass: "text-center" },
    { headerName: "MFT", field: "cls_mft", cellDataType: "text" },
  ]);

  const onGridRendered = useCallback(() => {
    gridRef.current?.api.sizeColumnsToFit();
  }, []);

  return (
    <Layer>
      <h3>Products List</h3>
      <Tile>
        <div className="flex flex-nowrap">
          <Search size="lg" placeholder="search products" labelText="label text" closeButtonLabelText="clear" id="search-prds" />
          <Button onClick={() => navigate('/inventory/products/new')}>Add New</Button>
        </div>
        <div className="ag-theme-quartz h-[50vh]">
          <AgGridReact ref={gridRef} columnDefs={colDefs} rowData={feed} onFirstDataRendered={onGridRendered} />
        </div>
      </Tile>
    </Layer>
  );
}
