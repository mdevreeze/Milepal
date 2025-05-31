# RunPlan - MAUI Hybrid App

A modern run schedule planning app built with:
- .NET MAUI for cross-platform native functionality
- Vite.js for fast development and building
- SolidJS for reactive UI components
- Ark UI for accessible UI components
- TailwindCSS for styling

## Development

### Prerequisites

- .NET 9 SDK
- Node.js and npm

### Running the project

1. Install dependencies:
   ```
   cd Resources/Raw/wwwroot
   npm install
   ```

2. Start the Vite development server:
   ```
   npm run dev
   ```

3. Run the MAUI application from your IDE or using the .NET CLI

### Building for production

```
npm run build
```

This will generate optimized files in the `dist` folder which will be included in the MAUI application bundle.

## Architecture

This app uses a hybrid approach:
- MAUI for native device features
- Web technologies for the UI
- Communication between native and web layers via the HybridWebView bridge
