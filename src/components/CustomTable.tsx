import React from "react";

export const Table: React.FC<React.HTMLProps<HTMLTableElement>> = ({
  children,
  className,
  ...props
}) => (
  <table
    className={`w-full border-collapse rounded-lg overflow-hidden ${className || ""}`}
    {...props}
  >
    {children}
  </table>
);

export const TableHeader: React.FC<
  React.HTMLProps<HTMLTableSectionElement>
> = ({ children, ...props }) => (
  <thead className="bg-gray-50" {...props}>
    {children}
  </thead>
);

export const TableBody: React.FC<React.HTMLProps<HTMLTableSectionElement>> = ({
  children,
  ...props
}) => (
  <tbody className="bg-white divide-y divide-gray-200" {...props}>
    {children}
  </tbody>
);

export const TableRow: React.FC<React.HTMLProps<HTMLTableRowElement>> = ({
  children,
  ...props
}) => (
  <tr className="hover:bg-gray-50" {...props}>
    {children}
  </tr>
);

export const TableHead: React.FC<React.HTMLProps<HTMLTableCellElement>> = ({
  children,
  className,
  ...props
}) => (
  <th
    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className || ""}`}
    {...props}
  >
    {children}
  </th>
);

export const TableCell: React.FC<React.HTMLProps<HTMLTableCellElement>> = ({
  children,
  className,
  ...props
}) => (
  <td
    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${className || ""}`}
    {...props}
  >
    {children}
  </td>
);
