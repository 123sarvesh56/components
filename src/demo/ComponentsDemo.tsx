import React, { useState } from 'react';
import { InputField, DataTable } from '../components';
import type { Column } from '../components';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

const sampleUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'active',
    joinDate: '2023-01-15'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Editor',
    status: 'active',
    joinDate: '2023-03-22'
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'Viewer',
    status: 'inactive',
    joinDate: '2023-02-10'
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    role: 'Editor',
    status: 'active',
    joinDate: '2023-04-05'
  },
  {
    id: 5,
    name: 'Charlie Davis',
    email: 'charlie.davis@example.com',
    role: 'Admin',
    status: 'active',
    joinDate: '2023-01-30'
  }
];

const userColumns: Column<User>[] = [
  {
    key: 'name',
    title: 'Full Name',
    dataIndex: 'name',
    sortable: true,
    render: (name: string, record: User) => (
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
          {name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <div className="font-medium text-gray-900">{name}</div>
          <div className="text-sm text-gray-500">{record.email}</div>
        </div>
      </div>
    ),
  },
  {
    key: 'role',
    title: 'Role',
    dataIndex: 'role',
    sortable: true,
    render: (role: string) => (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
        role === 'Admin' ? 'bg-purple-100 text-purple-800' :
        role === 'Editor' ? 'bg-blue-100 text-blue-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {role}
      </span>
    ),
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    sortable: true,
    render: (status: string) => (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        status === 'active' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
          status === 'active' ? 'bg-green-400' : 'bg-red-400'
        }`}></span>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    ),
  },
  {
    key: 'joinDate',
    title: 'Join Date',
    dataIndex: 'joinDate',
    sortable: true,
    render: (date: string) => new Date(date).toLocaleDateString(),
  },
];

function ComponentsDemo() {
  const [inputValue, setInputValue] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [isTableLoading, setIsTableLoading] = useState(false);

  const handleLoadData = () => {
    setIsTableLoading(true);
    setTimeout(() => {
      setIsTableLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            React Component Library
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive collection of modern React components built with TypeScript, 
            TailwindCSS, and designed for scalability and accessibility.
          </p>
        </div>

        {/* InputField Section */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">InputField Component</h2>
              <p className="text-gray-600">
                A flexible input component with validation states, multiple variants, and optional features.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Basic Examples */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Basic Examples</h3>
                
                <InputField
                  label="Standard Input"
                  placeholder="Enter your name"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  helperText="This is a standard outlined input"
                  showClearButton
                  onClear={() => setInputValue('')}
                />
                
                <InputField
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="filled"
                  helperText="We'll never share your email"
                />
                
                <InputField
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="ghost"
                  helperText="Password must be at least 8 characters"
                />
              </div>
              
              {/* States and Variants */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">States & Variants</h3>
                
                <InputField
                  label="Error State"
                  placeholder="Invalid input"
                  invalid
                  errorMessage="This field is required"
                />
                
                <InputField
                  label="Disabled Input"
                  placeholder="Cannot edit this"
                  disabled
                  value="Read-only value"
                />
                
                <InputField
                  label="Loading State"
                  placeholder="Processing..."
                  loading
                />
                
                <div className="flex space-x-4">
                  <InputField
                    label="Small"
                    size="sm"
                    placeholder="Small input"
                  />
                  <InputField
                    label="Large"
                    size="lg"
                    placeholder="Large input"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DataTable Section */}
        <section>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">DataTable Component</h2>
                <p className="text-gray-600">
                  A feature-rich data table with sorting, selection, and custom rendering capabilities.
                </p>
              </div>
              <button
                onClick={handleLoadData}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Simulate Loading
              </button>
            </div>
            
            {/* Selected Items Display */}
            {selectedUsers.length > 0 && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">
                  Selected Users ({selectedUsers.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedUsers.map(user => (
                    <span
                      key={user.id}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {user.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <DataTable
              data={sampleUsers}
              columns={userColumns}
              loading={isTableLoading}
              selectable
              onRowSelect={setSelectedUsers}
              emptyMessage="No users found. Try adding some users first."
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default ComponentsDemo;