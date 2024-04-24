import React, {
  Fragment,
  // useEffect,
  // useMemo,
  // useState,
} from 'react';

// import PropTypes from 'prop-types';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

interface CatAssessment {
  catDateOfBirth: string;
  catName: string;
  instrumentType: string;
  riskLevel: string;
  score: number;
}

export const AssessmentTable = ({ catAssessments }: {catAssessments: CatAssessment[]}) => {
  const columnHelper = createColumnHelper<CatAssessment>();
  const assessmentsTsx: CatAssessment[] = [ ...catAssessments ];

  const data: CatAssessment[] = [ ...assessmentsTsx ];

  const columns = [
    columnHelper.accessor(`catName`, {
      cell: info => info.getValue(),
      footer: info => info.column.id,
      header: `Cat Name`,
    }),
    columnHelper.accessor(`catDateOfBirth`, {
      cell: info => info.getValue(),
      footer: info => info.column.id,
      header: `Date of Birth`,
    }),
    columnHelper.accessor(`score`, {
      cell: info => info.getValue(),
      footer: info => info.column.id,
      header: `Score`,
    }),
    columnHelper.accessor(`riskLevel`, {
      cell: info => info.getValue(),
      footer: info => info.column.id,
      header: `Risk Level`,
    }),
    columnHelper.accessor(`instrumentType`, {
      cell: info => info.getValue(),
      footer: info => info.column.id,
      header: `Instrument Type`,
    }),
  ];

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="p-2">
        <table className="table">
          <thead>
            {table.getHeaderGroups().map(headerGroup =>
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header =>
                  <th key={header.id}>
                    {header.isPlaceholder ?
                      null :
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  </th>)}
              </tr>)}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row =>
              <tr key={row.id}>
                {row.getVisibleCells().map(cell =>
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>)}
              </tr>)}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map(footerGroup =>
              <tr key={footerGroup.id}>
                {footerGroup.headers.map(header =>
                  <th key={header.id}>
                    {header.isPlaceholder ?
                      null :
                      flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
                      )}
                  </th>)}
              </tr>)}
          </tfoot>
        </table>
      </div>
    </>
  );
};
// { assessments }: { assessments: object }
// const assessment = assessments.map((assessmentI: object) => <span>{assessmentI.id}</span>);

// AssessmentTable.prototype = {
//   assessments: PropTypes.object.isRequired,
// };
