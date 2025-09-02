import React, { useState, useCallback } from 'react';
import { ChevronUp, ChevronDown, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  width?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  rowKey?: keyof T | ((record: T) => string | number);
  emptyMessage?: string;
  theme?: 'light' | 'dark';
  striped?: boolean;
  hover?: boolean;
  className?: string;
}

type SortOrder = 'asc' | 'desc' | null;

interface SortState {
  column: string | null;
  order: SortOrder;
}

function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  rowKey = 'id',
  emptyMessage = 'No data available',
  theme = 'light',
  striped = true,
  hover = true,
  className
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());
  const [sortState, setSortState] = useState<SortState>({ column: null, order: null });
  
  const getRowKey = useCallback((record: T, index: number): string | number => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return record[rowKey] ?? index;
  }, [rowKey]);
  
  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;
    
    setSortState(prev => {
      if (prev.column === column.key) {
        const newOrder = prev.order === 'asc' ? 'desc' : prev.order === 'desc' ? null : 'asc';
        return { column: newOrder ? column.key : null, order: newOrder };
      }
      return { column: column.key, order: 'asc' };
    });
  };
  
  const sortedData = React.useMemo(() => {
    if (!sortState.column || !sortState.order) return data;
    
    const column = columns.find(col => col.key === sortState.column);
    if (!column) return data;
    
    return [...data].sort((a, b) => {
      const aValue = a[column.dataIndex];
      const bValue = b[column.dataIndex];
      
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortState.order === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortState.order === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      const aStr = String(aValue);
      const bStr = String(bValue);
      return sortState.order === 'asc' 
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
  }, [data, sortState, columns]);
  
  const handleRowSelection = (rowKey: string | number, selected: boolean) => {
    const newSelectedRows = new Set(selectedRows);
    
    if (selected) {
      newSelectedRows.add(rowKey);
    } else {
      newSelectedRows.delete(rowKey);
    }
    
    setSelectedRows(newSelectedRows);
    
    if (onRowSelect) {
      const selectedData = data.filter((record, index) => 
        newSelectedRows.has(getRowKey(record, index))
      );
      onRowSelect(selectedData);
    }
  };
  
  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      const allKeys = new Set(data.map((record, index) => getRowKey(record, index)));
      setSelectedRows(allKeys);
      if (onRowSelect) {
        onRowSelect(data);
      }
    } else {
      setSelectedRows(new Set());
      if (onRowSelect) {
        onRowSelect([]);
      }
    }
  };
  
  const isAllSelected = selectedRows.size > 0 && selectedRows.size === data.length;
  const isPartiallySelected = selectedRows.size > 0 && selectedRows.size < data.length;
  
  const tableClasses = clsx(
    'w-full border-collapse',
    theme === 'dark' ? 'bg-gray-900' : 'bg-white',
    className
  );
  
  const headerClasses = clsx(
    'border-b text-left text-sm font-semibold',
    theme === 'dark' 
      ? 'bg-gray-800 text-gray-200 border-gray-700' 
      : 'bg-gray-50 text-gray-900 border-gray-200'
  );
  
  const cellClasses = clsx(
    'px-4 py-3 text-sm border-b',
    theme === 'dark' 
      ? 'border-gray-700 text-gray-300' 
      : 'border-gray-200 text-gray-900'
  );
  
  const getRowClasses = (index: number) => clsx(
    striped && index % 2 === 1 && (theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'),
    hover && (theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'),
    'transition-colors duration-150'
  );
  
  if (loading) {
    return (
      <div className={clsx(
        'flex items-center justify-center p-8 border rounded-lg',
        theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      )}>
        <div className="flex items-center space-x-2">
          <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
          <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
            Loading data...
          </span>
        </div>
      </div>
    );
  }
  
  if (data.length === 0) {
    return (
      <div className={clsx(
        'flex items-center justify-center p-8 border rounded-lg',
        theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      )}>
        <div className="text-center">
          <div className={clsx(
            'text-4xl mb-2',
            theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
          )}>
            📋
          </div>
          <p className={clsx(
            'text-lg font-medium',
            theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
          )}>
            {emptyMessage}
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={clsx(
      'overflow-hidden rounded-lg border',
      theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
    )}>
      <div className="overflow-x-auto">
        <table className={tableClasses}>
          <thead>
            <tr>
              {selectable && (
                <th className={clsx(headerClasses, 'w-12 px-4 py-3')}>
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={input => {
                      if (input) input.indeterminate = isPartiallySelected;
                    }}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
              )}
              
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={clsx(
                    headerClasses,
                    'px-4 py-3',
                    column.sortable && 'cursor-pointer select-none hover:bg-opacity-80',
                    column.width && `w-${column.width}`
                  )}
                  onClick={() => handleSort(column)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.title}</span>
                    {column.sortable && (
                      <div className="flex flex-col">
                        <ChevronUp 
                          className={clsx(
                            'h-3 w-3 -mb-1',
                            sortState.column === column.key && sortState.order === 'asc'
                              ? 'text-blue-500' 
                              : 'text-gray-400'
                          )} 
                        />
                        <ChevronDown 
                          className={clsx(
                            'h-3 w-3',
                            sortState.column === column.key && sortState.order === 'desc'
                              ? 'text-blue-500' 
                              : 'text-gray-400'
                          )} 
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody>
            {sortedData.map((record, index) => {
              const key = getRowKey(record, index);
              const isSelected = selectedRows.has(key);
              
              return (
                <tr
                  key={key}
                  className={clsx(
                    getRowClasses(index),
                    isSelected && (theme === 'dark' ? 'bg-blue-900/50' : 'bg-blue-50')
                  )}
                >
                  {selectable && (
                    <td className={cellClasses}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => handleRowSelection(key, e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                  )}
                  
                  {columns.map((column) => (
                    <td key={column.key} className={cellClasses}>
                      {column.render 
                        ? column.render(record[column.dataIndex], record, index)
                        : String(record[column.dataIndex] ?? '')
                      }
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;