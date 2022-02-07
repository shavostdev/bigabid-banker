import { FC, useMemo, useCallback } from "react";
import { Props } from "./interfaces";
import { useTable, useBlockLayout } from "react-table";
import { FixedSizeList } from "react-window";
import moment from "moment";

const Table: FC<Props | any> = ({ data }): JSX.Element => {
  const columns = useMemo(
    () => [
      {
        Header: "Row",
        columns: [
          {
            accessor: (row, i) => i + 1,
            id: String(Math.random()),
          },
        ],
      },
      {
        Header: "Bid Id",
        columns: [
          {
            accessor: "id",
          },
        ],
      },
      {
        Header: "Bid Time",
        columns: [
          {
            accessor: (row) => {
              return row.time
                ? moment.unix(row.time).format("YYYY MM DD hh:mm:ss")
                : "";
            },
            id: String(Math.random()),
          },
        ],
      },
      {
        Header: "Price",
        columns: [
          {
            accessor: "price",
          },
        ],
      },
    ],
    []
  );

  const defaultColumn = 200;

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        defaultColumn,
      },
      useBlockLayout
    );

  const RenderRow = useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <div
          {...row.getRowProps({
            style,
          })}
          className="tr"
        >
          {row.cells.map((cell) => {
            return (
              <div {...cell.getCellProps()} className="td">
                {cell.render("Cell")}
              </div>
            );
          })}
        </div>
      );
    },
    [prepareRow, rows]
  );

  return (
    <div {...getTableProps()} className="table">
      <div>
        {headerGroups.map((headerGroup) => (
          <div {...headerGroup.getHeaderGroupProps()} className="tr">
            {headerGroup.headers.map((column) => (
              <div {...column.getHeaderProps()} className="th">
                {column.render("Header")}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div {...getTableBodyProps()}>
        <FixedSizeList
          height={350}
          itemCount={rows.length}
          itemSize={60}
          width="100%"
        >
          {RenderRow}
        </FixedSizeList>
      </div>
    </div>
  );
};

export default Table;
