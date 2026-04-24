import React, { useMemo, useState, useCallback } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type SortingState,
  type ColumnFiltersState,
  type CellContext,
} from '@tanstack/react-table';
import type { Booking } from '../types/booking';
import '../styles/BookingTable.css';

const ROW_HEIGHT = 40;
const VIEWPORT_HEIGHT = 500;
const OVERSCAN = 3;

// Simple virtualization hook
const useVirtualizer = (
  rowCount: number,
  rowHeight: number = ROW_HEIGHT,
  viewportHeight: number = VIEWPORT_HEIGHT,
  overscan: number = OVERSCAN
) => {
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
  const endIndex = Math.min(
    rowCount,
    Math.ceil((scrollTop + viewportHeight) / rowHeight) + overscan
  );

  const virtualRows = Array.from(
    { length: Math.max(0, endIndex - startIndex) },
    (_, i) => startIndex + i
  );

  const totalSize = rowCount * rowHeight;

  return { virtualRows, totalSize, setScrollTop };
};

export const BookingTable: React.FC<{ data: Booking[] }> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 80,
      },
      {
        accessorKey: 'dateFrom',
        header: 'Date From',
        cell: (info: CellContext<Booking, unknown>) =>
          new Date(info.getValue() as string).toLocaleDateString(),
        size: 120,
      },
      {
        accessorKey: 'dateTo',
        header: 'Date To',
        cell: (info: CellContext<Booking, unknown>) =>
          new Date(info.getValue() as string).toLocaleDateString(),
        size: 120,
      },
      {
        accessorKey: 'city',
        header: 'City',
        size: 120,
      },
      {
        accessorKey: 'country',
        header: 'Country',
        size: 120,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 150,
      },
      {
        accessorKey: 'confirmationState',
        header: 'Status',
        cell: (info: CellContext<Booking, unknown>) => {
          const state = info.getValue() as string;
          return (
            <span className={`status-badge status-${state}`}>{state}</span>
          );
        },
        size: 100,
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, _columnId, filterValue) => {
      const search = String(filterValue ?? '').trim().toLowerCase();

      if (!search) return true;

      return (
        String(row.original.name ?? '').toLowerCase().includes(search) ||
        String(row.original.city ?? '').toLowerCase().includes(search) ||
        String(row.original.country ?? '').toLowerCase().includes(search)
      );
    },
  });

  const { rows } = table.getRowModel();
  const { virtualRows, totalSize, setScrollTop } = useVirtualizer(rows.length);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  const handleFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setGlobalFilter(e.target.value);
    },
    []
  );

  return (
    <div className="booking-table-container">
      <div className="table-controls">
        <input
          type="text"
          placeholder="Search by name, city, country..."
          value={globalFilter}
          onChange={handleFilterChange}
          className="search-input"
        />

        {sorting.length > 0 && (
          <div className="sort-info">
            <span>
              Sorting by:{' '}
              {sorting
                .map((s) => `${s.id} (${s.desc ? 'desc' : 'asc'})`)
                .join(', ')}
            </span>
          </div>
        )}
      </div>

      <div
        className="table-wrapper"
        onScroll={handleScroll}
        style={{ height: VIEWPORT_HEIGHT, overflow: 'auto' }}
      >
        <table className="booking-table">
          <thead className="table-header">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                style={{
                  display: 'table',
                  width: '100%',
                  tableLayout: 'fixed',
                }}
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{ width: header.getSize() }}
                    onClick={header.column.getToggleSortingHandler()}
                    className={`header-cell ${
                      header.column.getIsSorted()
                        ? header.column.getIsSorted() === 'desc'
                          ? 'sorted-desc'
                          : 'sorted-asc'
                        : ''
                    }`}
                  >
                    <div className="header-content">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() && (
                        <span className="sort-indicator">
                          {header.column.getIsSorted() === 'desc' ? ' ▼' : ' ▲'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody
            className="table-body"
            style={{
              position: 'relative',
              height: totalSize,
              display: 'block',
            }}
          >
            {virtualRows.map((virtualIndex) => {
              const row = rows[virtualIndex];
              if (!row) return null;

              return (
                <tr
                  key={row.id}
                  style={{
                    position: 'absolute',
                    transform: `translateY(${virtualIndex * ROW_HEIGHT}px)`,
                    width: '100%',
                    height: `${ROW_HEIGHT}px`,
                    display: 'table',
                    tableLayout: 'fixed',
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                      className="table-cell"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <p>Showing {rows.length} bookings</p>
      </div>
    </div>
  );
};

export default BookingTable;