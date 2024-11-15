
# Contact Management System Frontend

A modern, responsive contact management application built with React, TypeScript, and Material-UI. This application provides a user-friendly interface for managing contacts with features like adding, editing, and deleting contact information.

## Live Demo
Visit the live application: https://contact-management-frontend-tau.vercel.app/

## Features
- Add new contacts through a modal form
- View all contacts in a responsive table
- Edit existing contact information
- Delete contacts
- Form validation for all inputs
- Responsive design for all screen sizes
- Clean and intuitive user interface

## Tech Stack
- **Framework**: React
- **Language**: TypeScript
- **UI Library**: Material-UI (MUI)
- **Form Management**: Formik
- **Validation**: Yup
- **HTTP Client**: Axios
- **Styling**: Emotion

## Project Structure
```
src/
├── components/        # Reusable UI components
│   ├── Layout/       # App layout components
│   └── ContactForm/  # Contact form modal
├── interfaces/       # TypeScript interfaces
├── pages/           # Page components
├── services/        # API service functions
├── theme/           # MUI theme configuration
└── utils/           # Utility functions
```

## Component Overview

### Layout Component
- Provides consistent page structure
- Implements MUI theming
- Handles responsive container sizing

### ContactForm Component
- Modal form for adding/editing contacts
- Form validation using Formik and Yup
- Responsive design for all screen sizes

### Home Page Component
- Displays contact table
- Handles contact management operations
- Implements loading states
- Provides user feedback for actions

## Local Development Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd contact-management-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=https://contact-mangement-backend-production.up.railway.app/api
```

4. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Available Scripts
- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App

## Usage Guide

### Adding a Contact
1. Click the '+' button in the top-right corner
2. Fill in the contact details in the modal form
3. Click 'Add Contact' to save

### Editing a Contact
1. Find the contact in the table
2. Click the edit (pencil) icon
3. Modify the details in the modal form
4. Click 'Save Changes'

### Deleting a Contact
1. Find the contact in the table
2. Click the delete (trash) icon
3. Confirm the deletion

## Form Validation
The application validates:
- Required fields (First Name, Last Name, Email, Phone)
- Email format
- Phone number format
- Field length restrictions

## Deployment
The application is deployed on Vercel and automatically deploys from the main branch.

## Environment Variables
Required environment variable:
- `REACT_APP_API_URL`: Backend API URL

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License
This project is licensed under the MIT License.
```

Would you like me to add or modify any section of the README?