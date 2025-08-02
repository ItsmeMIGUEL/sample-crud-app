# Sample CRUD App

A responsive user management application built with React, TypeScript, and Axios using the JSONPlaceholder API.

## Features

- **Full CRUD Operations**: Create, Read, Update, and Delete users
- **Responsive Design**: Table view on desktop, card view on mobile/tablet
- **Form Validation**: Required fields and proper input types
- **Loading States**: Visual feedback during API operations
- **Error Handling**: Error messages
- **Confirmation Dialogs**: Safe delete operations
- **TypeScript**: Full type safety throughout the application

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **API**: JSONPlaceholder (https://jsonplaceholder.typicode.com)
- **Styling**: Plain CSS with responsive design
- **State Management**: React hooks (useState, useEffect)

## Prerequisites

Before running this project, make sure you have the following installed on your system:

- **Node.js** (version 16.0 or higher)
- **npm** (comes with Node.js)

### How to Check if Node.js is Installed

Open your terminal/command prompt and run:
\`\`\`bash
node --version
npm --version

If you see version numbers, you're good to go! If not, download Node.js from browser.

## Installation & Setup

Follow these steps to get the application running on your local machine:

### Installation

1. **Clone the repository**
   \`\`\`bash
   - git clone https://github.com/ItsmeMIGUEL/sample-crud-app.git
   - cd user-crud-app
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   - npm install
   \`\`\`

3. **Start development server**
   \`\`\`bash
   - npm run dev
   \`\`\`

4. **Open in browser**
   - Navigate to `http://localhost:..../`
   - The application should now be running!

Open your web browser and go to **http://localhost:..../** to view the application.

## How to Use the Application

### Viewing Users

- The application loads with a list of users from the JSONPlaceholder API
- On desktop: Users are displayed in a table format
- On mobile/tablet: Users are displayed as cards

### Adding a New User

1. Click the "Add New User" button
2. Fill in the required fields (Name, Username, Email)
3. Optionally fill in additional information
4. Click "Add User" to save

### Editing a User

1. Click the "Edit" button next to any user
2. Modify the information in the form
3. Click "Update User" to save changes

### Deleting a User

1. Click the "Delete" button next to any user
2. Confirm the deletion in the popup dialog
3. The user will be removed from the list

### Refreshing Data

- Click the "Refresh" button to reload users from the API

## Important Notes

- **API Limitations**: The JSONPlaceholder API is read-only, so all create, update, and delete operations are simulated locally
- **Data Persistence**: Changes are not permanently saved and will reset when you refresh the page

## Troubleshooting

### Common Issues

**Issue**: \`npm install\` fails
**Solution**:

- Make sure you have Node.js installed
- Try running \`npm cache clean --force\` then \`npm install\` again

**Issue**: Port 5173 is already in use
**Solution**:

- Close other applications using that port
- Or the application will automatically use a different port

**Issue**: Application doesn't load
**Solution**:

- Check that the development server is running
- Check your internet connection

**Issue**: Users don't load
**Solution**:

- Check your internet connection
- The JSONPlaceholder API might be temporarily unavailable
