const Table = ({ data, headerRow }: { data: any[][]; headerRow?: boolean }) => (
  <table className="border-separate border border-white rounded-default border-spacing-0 overflow-hidden">
    <tbody>
      {data.map((row, rowIndex) => (
        <TableRow
          data={row}
          headerRow={headerRow}
          index={rowIndex}
          key={rowIndex}
        />
      ))}
    </tbody>
  </table>
);

const TableRow = ({
  data,
  headerRow,
  index,
}: {
  data: any[];
  headerRow?: boolean;
  index: number;
}) => (
  <tr>
    {data.map((cell, cellIndex) => (
      <TableCell
        data={cell}
        headerRow={headerRow}
        rowIndex={index}
        index={cellIndex}
        key={cellIndex}
      />
    ))}
  </tr>
);

const TableCell = ({
  data,
  headerRow,
  rowIndex,
  index,
}: {
  data: any;
  headerRow?: boolean;
  rowIndex: number;
  index: number;
}) =>
  headerRow && rowIndex == 0 ? (
    <TableHeaderCell data={data} index={index} rowIndex={rowIndex} />
  ) : (
    <TableNormalCell data={data} index={index} rowIndex={rowIndex} />
  );

const TableNormalCell = ({
  data,
  rowIndex,
  index,
}: {
  data: any;
  rowIndex: number;
  index: number;
}) => (
  <td
    className={`text-center py-2 px-4 border-white ${
      index != 0 ? "border-l" : ""
    } ${rowIndex != 0 ? "border-t" : ""}`}
  >
    {data}
  </td>
);

const TableHeaderCell = ({
  data,
  rowIndex,
  index,
}: {
  data: any;
  rowIndex: number;
  index: number;
}) => (
  <th
    className={`text-center py-2 px-4 bg-secondary border-white ${
      index != 0 ? "border-l" : ""
    } ${rowIndex != 0 ? "border-t" : ""}`}
  >
    {data}
  </th>
);

export default Table;
