# Merck Plant Continuity Platform

## Description
A Vue 3 web application built for Merck's maintenance platform. Provides real-time metrics and analytics on equipment maintenance costs and issue tracking at the manufacturing plant.

## Features
- **Issue Analytics**: Real-time cost-per-hour and accumulated cost metrics per issue type (NoOperation, SlowOperation, WrongOperation)
- **Next Service Order**: Displays the oldest pending high-priority maintenance order
- **New Issue Registration**: Form to register equipment issues with automatic service order generation
- **i18n Support**: Full English and Spanish language switching
- **Responsive Design**: Mobile-first layout using PrimeFlex grid system
- **Domain-Driven Design**: Layered architecture with shared, support, and maintenance bounded contexts

## Tech Stack
- Vue 3 with Composition API
- Vite build tool
- PrimeVue 3 (Material preset) + PrimeFlex + PrimeIcons
- Pinia for state management
- Vue Router 4 with child routes
- Vue i18n 9 for internationalization
- Axios for HTTP communication
- json-server for backend simulation

## Navigation
- `/` redirects to `/home`
- `/home` - Home view with analytics
- `/support/issues/new` - New Issue form

## Setup
```bash
npm install
npm run server
npm run dev
```

## Author
Student Developer - UPC 1ASI0730 Aplicaciones Web - 202520
