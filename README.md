
# Cerdiq Food - Frontend Web
>>>>>>> d7f10b989624e184d28e2e65efe101d11e7afb6d

E-commerce web application for **CerDiQ Food**, a platform inspired by Sayurbox to sell fresh vegetables and homemade frozen food from our own garden and kitchen.

## Features

- 🛒 Simple e-commerce storefront
- 🚀 Server-side rendering (SSR) with React Router v7
- ⚡️ Fast development with HMR (Hot Module Replacement)
- 📦 Bundling and optimization via Vite
- 🔄 Dynamic data loading and form handling
- 🔒 Built with TypeScript for safety and scalability
- 🎨 Tailwind CSS for responsive modern design
- 🧭 React Router v7 for routing
- 🧪 Devtools for debugging

## Product Highlights

- 🥬 Fresh organic vegetables
- 🍢 Homemade frozen food (bakso, dimsum, dll.)
- 🧊 Fast delivery system (planned integration)
- 📦 Future features: cart system, checkout, payment gateway

## Getting Started

### Installation

Install the dependencies:

```bash
bun install
```

### Development

Start the development server with HMR:

```bash
bun dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
bun run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
