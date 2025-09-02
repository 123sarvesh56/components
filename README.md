# React Component Library

A modern, production-ready React component library built with TypeScript, TailwindCSS, and Storybook. This library features two core components: InputField and DataTable, designed with accessibility, scalability, and modern design principles in mind.

## 🚀 Features

### InputField Component
- **Multiple Variants**: Outlined, filled, and ghost styles
- **Flexible Sizing**: Small, medium, and large sizes
- **State Management**: Normal, invalid, disabled, and loading states
- **Enhanced UX**: Optional clear button and password visibility toggle
- **Theme Support**: Light and dark theme compatibility
- **Accessibility**: Full ARIA support and keyboard navigation

### DataTable Component
- **Data Visualization**: Clean, responsive table layout
- **Interactive Features**: Column sorting and row selection
- **State Management**: Loading and empty states
- **Custom Rendering**: Flexible cell content with render functions
- **Selection Modes**: Single and multiple row selection
- **Theme Support**: Light and dark theme variants

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Full type safety and IntelliSense
- **TailwindCSS** - Utility-first CSS framework
- **Storybook** - Component documentation and testing
- **Vitest** - Fast unit testing framework
- **Testing Library** - React component testing utilities

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd react-component-library

# Install dependencies
npm install

# Start development server
npm run dev

# Run Storybook
npm run storybook

# Run tests
npm test
```

## 🎨 Components

### InputField

```tsx
import { InputField } from './components';

<InputField
  label="Email Address"
  type="email"
  placeholder="john@example.com"
  variant="outlined"
  size="md"
  showClearButton
  helperText="We'll never share your email"
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | Input value |
| `onChange` | `function` | - | Change handler |
| `label` | `string` | - | Input label |
| `placeholder` | `string` | - | Placeholder text |
| `helperText` | `string` | - | Helper text below input |
| `errorMessage` | `string` | - | Error message (shows when invalid) |
| `disabled` | `boolean` | `false` | Disabled state |
| `invalid` | `boolean` | `false` | Invalid state |
| `loading` | `boolean` | `false` | Loading state |
| `variant` | `'filled' \| 'outlined' \| 'ghost'` | `'outlined'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input size |
| `showClearButton` | `boolean` | `false` | Show clear button when has value |
| `type` | `'text' \| 'password' \| 'email' \| 'number'` | `'text'` | Input type |
| `theme` | `'light' \| 'dark'` | `'light'` | Theme variant |

### DataTable

```tsx
import { DataTable } from './components';

const columns = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email' },
];

<DataTable
  data={users}
  columns={columns}
  selectable
  onRowSelect={(selectedRows) => console.log(selectedRows)}
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `T[]` | - | Array of data objects |
| `columns` | `Column<T>[]` | - | Column configuration |
| `loading` | `boolean` | `false` | Loading state |
| `selectable` | `boolean` | `false` | Enable row selection |
| `onRowSelect` | `function` | - | Selection change handler |
| `rowKey` | `keyof T \| function` | `'id'` | Unique row identifier |
| `emptyMessage` | `string` | `'No data available'` | Empty state message |
| `theme` | `'light' \| 'dark'` | `'light'` | Theme variant |
| `striped` | `boolean` | `true` | Alternating row colors |
| `hover` | `boolean` | `true` | Row hover effects |

## 🧪 Testing

The components include comprehensive test coverage:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📚 Documentation

Explore the components interactively in Storybook:

```bash
npm run storybook
```

This will open Storybook at `http://localhost:6006` where you can:
- View all component variants and states
- Interact with components in real-time
- Read auto-generated documentation
- Test different props and configurations

## 🎯 Design Principles

### Accessibility First
- Full ARIA support and semantic HTML
- Keyboard navigation compatibility
- Screen reader friendly
- Proper focus management

### Modern Design
- Clean, minimalist aesthetics
- Consistent spacing and typography
- Smooth transitions and micro-interactions
- Responsive design for all screen sizes

### Developer Experience
- Full TypeScript support with proper generics
- Intuitive prop interfaces
- Comprehensive documentation
- Extensive test coverage

## 🏗️ Project Structure

```
src/
├── components/
│   ├── InputField/
│   │   ├── InputField.tsx
│   │   ├── InputField.stories.tsx
│   │   └── InputField.test.tsx
│   ├── DataTable/
│   │   ├── DataTable.tsx
│   │   ├── DataTable.stories.tsx
│   │   └── DataTable.test.tsx
│   └── index.ts
├── demo/
│   └── ComponentsDemo.tsx
├── test/
│   └── setup.ts
└── ...
```

## 🔮 Future Enhancements

- Additional input types and validation patterns
- Table pagination and virtual scrolling
- Advanced filtering and search capabilities
- More theme variants and customization options
- Additional accessibility features
- Performance optimizations for large datasets

## 📄 License

MIT License - feel free to use these components in your projects!