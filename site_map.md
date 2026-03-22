# Constitution Model Suite - Site Map

This document outlines all the pages and key functions across the different components of the project.

## 📱 React Frontend (Next.js)
**Port:** 4000
- **Pages**:
    - `/` (Home): Modern landing page using Framer Motion and Next.js.
- **Key Functions**:
    - Central hub for accessing all legal tools.
    - **Look and Feel**:
        - **Aesthetics**: Premium, modern "Legal-Tech" interface.
        - **Design Elements**: Glassmorphism (backdrop blur), smooth Framer Motion animations.
        - **Palette**: 
            - Navy: `#0f172a` (Slate 900)
            - Gold: `#d4af37` (Classic Gold)
            - Light: `#f8fafc` (Slate 50)
            - Accents: `amber-400`
        - **Typography**: Sans-serif (Inter/Tailwind default).

## ⚖️ Flask Backend
**Port:** 5000
- **Pages**:
    - `/` (Dashboard): Main menu with links to tools (`templates/index.html`).
    - `/ocr` (Document Analysis Interface): View for document analysis (`templates/ocr.html`).
    - `/read` (Constitution Reader): Interactive viewer for the Indian Constitution (`templates/constitution.html`).
    - `/flashcards/`: Serves the Flashcards learning tool (`flashcards-project/index.html`).
- **Key Functions**:
    - `/chat` (POST): AI-powered legal consultation using Gemini.
    - `/analyze-doc` (POST): Analyzes PDFs/Images to explain or help fill legal forms.
    - `/constitution-pdf`: Serves the primary reference Indian Constitution PDF.
    - **Look and Feel**:
        - **Aesthetics**: Trustworthy and authoritative government portal style.
        - **Design Elements**: Structured service cards, information ticker, and official emblem.
        - **Palette**: 
            - Deep Navy: `#002147`
            - Medium Blue: `#003366`
            - Accent Blue: `#0056b3`
            - Official Gold: `#D4AF37`
        - **Typography**: `Merriweather` (Serif - Headings), `Roboto` (Sans-serif - Body).

## 🎤 Voice Bot
**Ports:** 8000 (API) / 8001 (UI)
- **Pages**:
    - `http://localhost:8001/`: Simple interface for voice interaction.
- **Key Functions**:
    - `ws://localhost:8000/ws`: Real-time WebSocket connection for AI-driven legal voice assistance using FastAPI.

## 🃏 Flashcards (Sub-project)
**Path:** `flashcards-project/` (Served via Flask at `/flashcards/`)
- **Pages**:
    - `index.html`: Interactive flashcards for learning Indian Law.
- **Key Functions**:
    - Client-side logic for randomized deck and card flipping.
    - **Look and Feel**:
        - **Aesthetics**: Highly engaging, gamified learning environment.
        - **Design Elements**: Immersive 3D card flip animations, unique "shutter" transitions.
        - **Palette**: 
            - Shutter Blue: `#0d2c4f`
            - Shutter Green: `#0e3b23`
            - Card Gradients: Blue, Green, and Orange/Amber flows.
        - **Typography**: System Sans-serif (-apple-system, BlinkMacSystemFont).

## 📂 Project Structure Overview
- `/src/app`: React/Next.js routes (Page, Layout, Globals).
- `/backend`: Flask application (`app.py`), templates, and static files.
- `/voice bot`: Independent FastAPI backend and HTML frontend for voice features.
- `/flashcards-project`: HTML/CSS/JS learning tool.
- `app.py`: Root Flask application with core logic.
- `start_app.py`: Script to launch the application components.

---

## 🎨 Global Design System
The project follows a unified "Legal-Trust" design language, blending modern tech with traditional legal authority.

- **Primary Motif**: Deep Navy paired with Rich Gold.
- **Accents**: Vibrant Amber for interactions and blue-hued information cards.
- **Visual Heirarchy**: serif titles for authority, sans-serif body for readability.
- **Interactive States**: Transitions (0.2s-0.7s) for hover, focus, and modal overlays.
