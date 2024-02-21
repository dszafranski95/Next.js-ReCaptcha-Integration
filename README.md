# Next.js ReCaptcha Integration

This project demonstrates how to integrate Google ReCaptcha with a Next.js application. It covers setting up ReCaptcha in both client-side and server-side contexts to enhance security by protecting your forms from spam and abuse.

## Features

- **Next.js 14**: Utilizes the latest features of Next.js for fast and scalable applications.
- **Google ReCaptcha v3**: Integrates Google's ReCaptcha for intelligent risk analysis.
- **Tailwind CSS**: Uses Tailwind CSS for styling, providing a utility-first CSS framework for rapid UI development.
- **Responsive Registration and Login Forms**: Includes responsive forms for user registration and login, secured with ReCaptcha.

## Getting Started

To get started with this project, follow these steps:

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://your-repository-url.git
cd next14-recaptcha-tutorial

1.     Install the dependencies:

    npm install
    # or
    yarn install


2.     Set up environment variables:

Create a .env.local file in the root directory and add your ReCaptcha secret key and site key:
        NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
        RECAPTCHA_SECRET_KEY=your_secret_key_here

3.     Run the development server:
    npm run dev
    # or
    yarn dev

Navigate to http://localhost:3000 to view the application.
Usage

    To register a new user, navigate to /register and fill out the form. ReCaptcha will verify the request in the background.
    To log in, return to the homepage and use the login form. The login also integrates ReCaptcha for added security.

Project Structure

    app/: Contains the main application files, including pages and components.
        register/page.tsx: The registration page.
        page.tsx: The login page.
        api/recaptchaSubmit/route.ts: Server-side API route for ReCaptcha verification.
        GoogleCaptcha.tsx: A wrapper component for Google ReCaptcha.
        layout.tsx: The main layout component with global styles and metadata.
    globals.css: Global styles including Tailwind CSS directives.

Contributing

Contributions are welcome! Please open an issue or submit a pull request with any improvements or suggestions.
License

This project is open-source and available under the MIT License.


This README provides a comprehensive overview of your project, guiding users through setup, usage, and contribution. Feel free to customize it further to match your project's requirements or personal preferences.


```
