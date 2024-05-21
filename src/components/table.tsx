const Table = ({
  data,
  headerRow,
  headerColumn,
}: {
  data: any[][];
  headerRow?: boolean;
  headerColumn?: boolean;
}) => (
  <div className="overflow-scroll">
    <table className="border-separate border border-white rounded-default border-spacing-0 overflow-hidden">
      <tbody>
        {data.map((row, rowIndex) => (
          <TableRow
            data={row}
            headerRow={headerRow}
            headerColumn={headerColumn}
            index={rowIndex}
            key={rowIndex}
          />
        ))}
      </tbody>
    </table>
  </div>
);

const TableRow = ({
  data,
  headerRow,
  headerColumn,
  index,
}: {
  data: any[];
  headerRow?: boolean;
  headerColumn?: boolean;
  index: number;
}) => (
  <tr>
    {data.map((cell, columnIndex) => (
      <TableCell
        data={cell}
        headerRow={headerRow}
        headerColumn={headerColumn}
        rowIndex={index}
        columnIndex={columnIndex}
        key={columnIndex}
      />
    ))}
  </tr>
);

const TableCell = ({
  data,
  headerRow,
  headerColumn,
  rowIndex,
  columnIndex,
}: {
  data: any;
  headerRow?: boolean;
  headerColumn?: boolean;
  rowIndex: number;
  columnIndex: number;
}) =>
  (headerRow && rowIndex == 0) || (headerColumn && columnIndex == 0) ? (
    <TableHeaderCell
      data={data}
      columnIndex={columnIndex}
      rowIndex={rowIndex}
    />
  ) : (
    <TableNormalCell
      data={data}
      columnIndex={columnIndex}
      rowIndex={rowIndex}
    />
  );

const TableNormalCell = ({
  data,
  rowIndex,
  columnIndex,
}: {
  data: any;
  rowIndex: number;
  columnIndex: number;
}) => (
  <td
    className={`text-center py-2 px-4 border-white ${
      columnIndex != 0 ? "border-l" : ""
    } ${rowIndex != 0 ? "border-t" : ""}`}
  >
    {data}
  </td>
);

const TableHeaderCell = ({
  data,
  rowIndex,
  columnIndex,
}: {
  data: any;
  rowIndex: number;
  columnIndex: number;
}) => (
  <th
    className={`text-center py-2 px-4 bg-secondary border-white ${
      columnIndex != 0 ? "border-l" : ""
    } ${rowIndex != 0 ? "border-t" : ""}`}
  >
    {data}
  </th>
);

export default Table;
