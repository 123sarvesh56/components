import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import DataTable from './DataTable';
import type { Column } from './DataTable';

interface TestData {
  id: number;
  name: string;
  age: number;
  email: string;
}

const testData: TestData[] = [
  { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', age: 35, email: 'bob@example.com' },
];

const testColumns: Column<TestData>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: false },
];

describe('DataTable', () => {
  it('renders table with data and columns', () => {
    render(
      <DataTable
        data={testData}
        columns={testColumns}
      />
    );
    
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(
      <DataTable
        data={[]}
        columns={testColumns}
        loading
      />
    );
    
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });

  it('shows empty state when no data', () => {
    render(
      <DataTable
        data={[]}
        columns={testColumns}
        emptyMessage="No users found"
      />
    );
    
    expect(screen.getByText('No users found')).toBeInTheDocument();
  });

  it('handles row selection', async () => {
    const user = userEvent.setup();
    const handleRowSelect = vi.fn();
    
    render(
      <DataTable
        data={testData}
        columns={testColumns}
        selectable
        onRowSelect={handleRowSelect}
      />
    );
    
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[1]); // First row checkbox (index 0 is select all)
    
    expect(handleRowSelect).toHaveBeenCalledWith([testData[0]]);
  });

  it('handles select all functionality', async () => {
    const user = userEvent.setup();
    const handleRowSelect = vi.fn();
    
    render(
      <DataTable
        data={testData}
        columns={testColumns}
        selectable
        onRowSelect={handleRowSelect}
      />
    );
    
    const selectAllCheckbox = screen.getAllByRole('checkbox')[0];
    await user.click(selectAllCheckbox);
    
    expect(handleRowSelect).toHaveBeenCalledWith(testData);
  });

  it('sorts data when sortable column header is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <DataTable
        data={testData}
        columns={testColumns}
      />
    );
    
    const nameHeader = screen.getByText('Name');
    await user.click(nameHeader);
    
    const rows = screen.getAllByRole('row');
    // Check if first data row contains "Bob Johnson" (alphabetically first)
    expect(rows[1]).toHaveTextContent('Bob Johnson');
  });

  it('renders custom content with render function', () => {
    const customColumns: Column<TestData>[] = [
      {
        key: 'name',
        title: 'Name',
        dataIndex: 'name',
        render: (value, record) => (
          <div className="font-bold">{value} ({record.age})</div>
        ),
      },
    ];
    
    render(
      <DataTable
        data={testData}
        columns={customColumns}
      />
    );
    
    expect(screen.getByText('John Doe (30)')).toBeInTheDocument();
  });

  it('applies dark theme correctly', () => {
    const { container } = render(
      <DataTable
        data={testData}
        columns={testColumns}
        theme="dark"
      />
    );
    
    const table = container.querySelector('table');
    expect(table).toHaveClass('bg-gray-900');
  });
});