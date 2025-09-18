# Uitify Console

A simple CRM application for managing leads and opportunities.

## Features

- View and manage leads
- Add new leads
- Edit lead information (email, status)
- Delete leads
- Convert leads to opportunities
- Filter and search leads
- Pagination for large datasets
- Dark mode support
- Data persistence with localStorage

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Managing Leads

- Click "Add Lead" to create new leads
- Click on any lead row to view details
- Use the "Edit" button to modify lead information
- Use the "Delete" button to remove leads
- Convert leads to opportunities from the detail panel

### Filtering and Search

- Use the search bar to find leads by name or company
- Filter by status (New, Contacted, Qualified, Converted)
- Sort by score, name, or company
- Navigate through pages using pagination controls

### Theme

Toggle between light and dark mode using the theme button in the header.

## Technologies Used

- React 19
- TypeScript
- Tailwind CSS
- Vite
- LocalStorage for data persistence

## Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom hooks
├── types/              # TypeScript type definitions
├── data/               # Static data files
└── assets/             # Images and other assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint