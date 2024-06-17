# adminkaBlo

## Description

This project is a web-based administrative dashboard application built with
React and TypeScript. It includes various features such as user management,
role-based access control, and integration with several modern libraries and
tools.

## Features

- User authentication and authorization
- Role-based access control (Admin, Manager, Editor)
- Responsive design
- Interactive charts and graphs
- Form management and validation
- Notifications and alerts

## Technologies Used

### Main Libraries and Frameworks

- **React**: Library for building user interfaces.
- **Redux Toolkit**: For state management.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **Axios**: For making HTTP requests.
- **Formik**: For form management.
- **Yup**: For form validation.

### Development Tools

- **TypeScript**: For type-safe code.
- **ESLint**: For code linting.
- **Prettier**: For code formatting.
- **Vite**: For project building and development.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AleksandrSherehkov/adminkaBlo.git
   ```

2. Navigate to the project directory:

   ```bash
   cd adminkaBlo
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Run the project:
   ```bash
   npm start
   ```

## Usage

This application includes role-based access control with the following roles:

- **Admin**: Has full access to all features and settings.
- **Manager**: Can manage users and view detailed reports.
- **Editor**: Can edit content and manage data entries.

### Managing Roles

To manage user roles, navigate to the "User Management" section in the admin
dashboard. Here you can assign roles to users, edit existing roles, and set
permissions for each role.

### Adding New Users

Admins can add new users by filling out the user registration form in the "User
Management" section. Make sure to assign the appropriate role to each user to
ensure proper access control.

## License

This project is licensed under the MIT License.
