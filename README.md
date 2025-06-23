# RunScheduler MAUI + SolidJS App

This project combines a .NET MAUI native application with a SolidJS web interface running in a WebView.

## Development Setup

### Prerequisites

- .NET 9.0 SDK or later
- Node.js 18 or later
- npm or yarn

### First-time Setup

1. Clone the repository
2. Install SolidJS app dependencies:
   ```
   cd Web
   npm install
   ```

### Development Workflow

To enable hot reload during development:

1. Start the SolidJS development server:
   ```
   cd Web
   npm run dev
   ```
   This will start a development server at http://localhost:3000

2. In another terminal, run the MAUI app in debug mode:
   ```
   dotnet build
   dotnet run
   ```

3. The app will automatically connect to the development server and enable hot reload

### Android Emulator Notes

The Android emulator maps the host machine's localhost to 10.0.2.2, which is configured automatically in the app.

### Physical Device Testing

When testing on a physical device, make sure:

1. Your device is on the same network as your development machine
2. The app will try to detect your development machine's IP automatically
3. If connection fails, update the IP address in `Utilities/WebViewHelper.cs`

### Building for Production

Before building for production:

1. Build the SolidJS app:
   ```
   cd Web
   npm run build
   ```

2. The built files will be placed in the correct location for MAUI to package them

3. Build the MAUI app in Release mode:
   ```
   dotnet build -c Release
   ```
