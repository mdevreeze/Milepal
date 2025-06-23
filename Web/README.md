## Usage

Those templates dependencies are maintained via [pnpm](https://pnpm.io) via `pnpm up -Lri`.

This is the reason you see a `pnpm-lock.yaml`. That being said, any package manager will work. This file can be safely be removed once you clone a template.

```bash
$ npm install # or pnpm install or yarn install
```

### Learn more on the [Solid Website](https://solidjs.com) and come chat with us on our [Discord](https://discord.com/invite/solidjs)

## Available Scripts

In the project directory, you can run:

### `npm run dev` or `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment
# RunScheduler App

A modern running schedule application built with SolidJS and Tailwind CSS. This app helps runners create and follow training plans to achieve their running goals.

## Features

- Three default running schedule options for different skill levels
- Weekly workout view with detailed descriptions
- Mobile-first responsive design
- User preference settings for units and rest days
- Modern UI built with Tailwind CSS and Ark UI components

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production

```bash
npm run build
npm run serve
```

## Technologies Used

- SolidJS 1.9.5 - Reactive JavaScript UI library
- TypeScript 5.7.2 - Type-safe JavaScript
- Tailwind CSS 4.0.7 - Utility-first CSS framework
- Ark UI for SolidJS 5.11.0 - Accessible UI components
- Vite 6.0.0 - Next-generation frontend tooling

## License

MIT
You can deploy the `dist` folder to any static host provider (netlify, surge, now, etc.)

## This project was created with the [Solid CLI](https://github.com/solidjs-community/solid-cli)
