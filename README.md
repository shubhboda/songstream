# React

A modern React-based project utilizing the latest frontend technologies and tools for building responsive web applications.

## Desktop App (Electron)

This project can be packaged as a desktop application for Windows, macOS, and Linux using Electron, or run as a standard web application in a browser.

### Easy Launch Options (Windows)

Use our convenient batch scripts to install, run, build, or add songs to the project:

- **Quick Install**: Execute `quick-install.bat` for one-click desktop application installation
- **Custom Install**: Execute `install-songstream.bat` for guided installation options
- **Run the application**: Execute `start-project.bat` and choose whether to run as a website or desktop application
- **Build for distribution**: Execute `build-project.bat` and choose whether to build the website or desktop application
- **Add songs**: Execute `add-song.bat` or select "Add Songs to Library" option in `start-project.bat` to quickly add songs to your library

For detailed installation instructions, see [INSTALLATION.md](./INSTALLATION.md)

### Running in Development Mode

To run the application in development mode with hot reloading:

```bash
# For web application
npm run dev

# For desktop application
npm run dev:electron
```

The web version will be available at http://localhost:4028, while the desktop version will launch as an Electron application.

### Building for Distribution

To create distributable packages:

```bash
# For web deployment
npm run build

# For desktop application
npm run build:electron
```

This will build the application for your target platform. The output will be in the `dist` folder.

### Desktop Application Features

- **System Tray Integration**: The application minimizes to the system tray and can be restored by clicking the tray icon.
- **Application Menu**: Standard application menu with File, Edit, View, and Help options.
- **Settings Persistence**: User settings are saved between sessions.
- **Cross-Platform**: Works on Windows, macOS, and Linux.

## 🚀 Features

- **React 18** - React version with improved rendering and concurrent features
- **Vite** - Lightning-fast build tool and development server
- **Redux Toolkit** - State management with simplified Redux setup
- **TailwindCSS** - Utility-first CSS framework with extensive customization
- **React Router v6** - Declarative routing for React applications
- **Data Visualization** - Integrated D3.js and Recharts for powerful data visualization
- **Form Management** - React Hook Form for efficient form handling
- **Animation** - Framer Motion for smooth UI animations
- **Testing** - Jest and React Testing Library setup

## 📋 Prerequisites

- Node.js (v14.x or higher)
- npm or yarn

## 🛠️ Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

2. Easy Launch Options (Windows):
   - Run `start-project.bat` and choose whether to run as a website or desktop application
   - Run `build-project.bat` to build either the website or desktop application
   - See `APP_GUIDE.md` for detailed instructions on both web and desktop modes

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

## 📁 Project Structure

```
react_app/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── styles/         # Global styles and Tailwind configuration
│   ├── App.jsx         # Main application component
│   ├── Routes.jsx      # Application routes
│   └── index.jsx       # Application entry point
├── .env                # Environment variables
├── index.html          # HTML template
├── package.json        # Project dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
└── vite.config.js      # Vite configuration
```

## 🧩 Adding Routes

To add new routes to the application, update the `Routes.jsx` file:

```jsx
import { useRoutes } from "react-router-dom";
import HomePage from "pages/HomePage";
import AboutPage from "pages/AboutPage";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/about", element: <AboutPage /> },
    // Add more routes as needed
  ]);

  return element;
};
```

## 🎨 Styling

This project uses Tailwind CSS for styling. The configuration includes:

- Forms plugin for form styling
- Typography plugin for text styling
- Aspect ratio plugin for responsive elements
- Container queries for component-specific responsive design
- Fluid typography for responsive text
- Animation utilities

## 📱 Responsive Design

The app is built with responsive design using Tailwind CSS breakpoints.


## 📦 Deployment

Build the application for production:

```bash
npm run build
```

## 🙏 Acknowledgments

- Built with [Rocket.new](https://rocket.new)
- Powered by React and Vite
- Styled with Tailwind CSS

Built with ❤️ on Rocket.new
