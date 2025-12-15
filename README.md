HSL Labs Command Center
Responsive healthcare lab operations dashboard built with React and Tailwind CSS, based on a Figma high‑fidelity design. It includes a desktop web layout (1440px) and a mobile layout with a slide‑in sidebar.​

Features
Desktop dashboard with:

Left sidebar navigation (Dashboard, Patient Intake, Disclosures, Inventory, Packaging, Billing, Training, Operations).

Top app bar with logo, global search, and filter pills.

Command Center KPI cards for Patients, Inventory, Billing, and Training.

Patients Overview line chart section.

Action Tracker table with Approve / Mark Done actions.

Mobile layout with:

Compact header card and hamburger menu.

Vertical KPI cards and Patients list.

Floating “+” action button.

Slide‑in sidebar overlay.

Built purely with Tailwind utility classes and small @apply helpers.

Ready to extend with real data and API integration.​

Tech Stack
Framework: React (Vite or Create React App, depending on your setup).​

Styling: Tailwind CSS.

Charts: Placeholder SVG / custom components (can be replaced with chart libraries).

Tooling: Node.js, npm or yarn.​

Getting Started
1. Clone the repository
bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
2. Install dependencies
bash
npm install
# or
yarn
3. Run the development server or npm run server
bash
npm run dev
# or
yarn dev
Open the URL printed in the terminal (usually http://localhost:5173 for Vite or http://localhost:3000 for CRA) to see the dashboard.​

Project Structure
bash
.
├── src/
│   ├── components/        # Layout pieces (sidebar, top bar, cards, tables, charts)
│   ├── pages/             # Dashboard page
│   ├── App.jsx            # App shell and routing
│   └── main.jsx           # React entry point
├── index.html
├── package.json
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js
└── src/index.css          # Global styles & Tailwind @apply helpers
Folder names may differ slightly based on your setup; update this section if needed.​

Tailwind Setup
The project uses Tailwind via @import "tailwindcss"; in src/index.css. To modify global styling (card radius, shadows, spacing), update the utility classes or @apply rules in index.css.​

If Tailwind classes are not applied, make sure:

tailwind.config.js has the correct content paths:

js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
The dev server has been restarted after config changes.​

Figma Design
The layout is based on a Figma high‑fidelity design of the HSL Labs Command Center:

Desktop: 1440px frame, 12‑column grid, card‑based dashboard.

Mobile: 4‑column grid, stacked cards, floating action button, and drawer navigation.​

You can tweak spacing, typography, and colors directly in Tailwind classes to keep the implementation in sync with the design.​

Scripts
Common npm scripts:

bash
npm run dev     # Start development server
npm run build   # Create production build
npm run preview # Preview production build locally
(If your package.json uses different scripts, update this section.)

License
This project is for personal/learning use. Add a license here (MIT, Apache‑2.0, etc.) if you plan to open‑source it.​
