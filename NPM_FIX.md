# Troubleshooting NPM "Missing script: 'dev'"

If you encounter the error `npm error Missing script: "dev"` while running the application, it means your `package.json` file in the root directory is missing the necessary Next.js configuration.

## 🛠️ Step-by-Step Fix

### 1. Restore `package.json`
Ensure the `package.json` file (in the project root) has at least these contents:

```json
{
  "name": "constitution-model-main",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev -p 4000",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.2.3",
    "react": "^18",
    "react-dom": "^18",
    "framer-motion": "^11.0.8",
    "lucide-react": "^0.344.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.1"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "autoprefixer": "^10.0.1",
    "eslint": "^8",
    "eslint-config-next": "14.2.3"
  }
}
```

### 2. Install Dependencies
Open your terminal in the root directory and run:
```bash
npm install
```

### 3. Run the App
Restart the entire suite using the provided Python script:
```bash
python start_app.py
```

---

## Why did this happen?
This error usually occurs if `npm init` was accidentally run in the root directory, overwriting the original Next.js configuration. By restoring the scripts and dependencies, you re-enable the dev server on port 4000.
