# GatherBH — Front-End Skeleton

COSC 485: Web Engineering — Prototype

This is the **front-end-only** React skeleton for the Smart Group Activity Planning and Deals Web Application. It is a standard Vite/React project.

## Technologies

- React, TypeScript, Vite
- Tailwind CSS and project CSS
- Sample business and group-deal data

## Run locally

Install Node.js, then run:

```bash
npm install
npm run dev
```

Open the local URL printed in the terminal (usually `http://localhost:5173`).

To check the production build:

```bash
npm run build
```

## Screens

- Public homepage, activity browsing and filters
- Deal details and group deal claim flow
- Customer claim history with sample statuses
- Login/registration form mock-up
- Business demo dashboard, offers, customer claims and profile screens

The business demo is available through **Business Demo** in the top navigation or **Preview the Business Dashboard** on the login screen.

## Scope and limitations

This milestone is a **coded front-end skeleton**, not the final system. All business-side data is sample data held in browser memory, and customer claims are simulated in browser local storage. Registration/authentication screens do **not** create real accounts; there is no Supabase integration, protected role access, payment processing, or deployed backend. Those are planned for the later implementation milestone.

## Team workflow

This code belongs in the team's shared GitHub repository. Both team members should review the screens, verify responsiveness, and document their contributions.
