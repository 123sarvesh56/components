import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import DataTable from './DataTable';
import type { Column } from './DataTable';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

const sampleData: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-01-15'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'active',
    lastLogin: '2024-01-14'
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Moderator',
    status: 'inactive',
    lastLogin: '2024-01-10'
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'User',
    status: 'active',
    lastLogin: '2024-01-16'
  },
  {
    id: 5,
    name: 'Charlie Davis',
    email: 'charlie@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-01-13'
  }
];

const columns: Column<User>[] = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    sortable: true,
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
    sortable: true,
  },
  {
    key: 'role',
    title: 'Role',
    dataIndex: 'role',
    sortable: true,
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    sortable: true,
    render: (value: string) => (
      <span
        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          value === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {value}
      </span>
    ),
  },
  {
    key: 'lastLogin',
    title: 'Last Login',
    dataIndex: 'lastLogin',
    sortable: true,
  },
];

const meta = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible data table component with sorting, row selection, loading states, and custom renderers.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: { type: 'radio' },
      options: ['light', 'dark'],
    },
  },
  args: {
    onRowSelect: fn(),
  },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: sampleData,
    columns: columns,
  },
};

export const WithSelection: Story = {
  args: {
    data: sampleData,
    columns: columns,
    selectable: true,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns: columns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns: columns,
    emptyMessage: 'No users found. Add some users to get started.',
  },
};

export const CustomRendering: Story = {
  args: {
    data: sampleData,
    columns: [
      {
        key: 'avatar',
        title: 'Avatar',
        dataIndex: 'name',
        render: (name: string) => (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              {name.charAt(0)}
            </div>
            <span>{name}</span>
          </div>
        ),
      },
      ...columns.slice(1),
      {
        key: 'actions',
        title: 'Actions',
        dataIndex: 'id',
        render: () => (
          <div className="flex space-x-2">
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Edit
            </button>
            <button className="text-red-600 hover:text-red-800 text-sm font-medium">
              Delete
            </button>
          </div>
        ),
      },
    ],
  },
};

export const DarkTheme: Story = {
  render: () => (
    <div className="bg-gray-900 p-6 rounded-lg">
      <DataTable
        data={sampleData}
        columns={columns}
        theme="dark"
        selectable
      />
    </div>
  ),
};

export const WithoutStriping: Story = {
  args: {
    data: sampleData,
    columns: columns,
    striped: false,
    hover: false,
  },
};

export const LargeDataset: Story = {
  args: {
    data: Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ['Admin', 'User', 'Moderator'][i % 3],
      status: i % 4 === 0 ? 'inactive' : 'active',
      lastLogin: `2024-01-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    })) as User[],
    columns: columns,
    selectable: true,
  },
};