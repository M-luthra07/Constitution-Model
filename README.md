# Constitution Model Suite

A legal-tech application with a **Flask** backend, a **Next.js** frontend, and an AI **Voice Bot**.

## Requirements

- Python 3.10 or newer
- Node.js and npm
- A Google Gemini API key for AI features

## Setup on Windows

Run these commands from the project root (the folder containing `start_app.py`).

### Create and activate the Flask environment

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

If PowerShell blocks environment activation, allow it for the current PowerShell window only:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\.venv\Scripts\Activate.ps1
```

In Command Prompt, activate it with:

```cmd
.venv\Scripts\activate.bat
```

In Git Bash, activate it with:

```bash
source .venv/Scripts/activate
```

When activation succeeds, `(.venv)` appears at the start of the terminal prompt. To leave the environment, run:

```text
deactivate
```

### Set up the Voice Bot environment

The suite launcher looks for a separate environment in `voice bot\.venv`. Create and install it once:

```powershell
py -m venv "voice bot\.venv"
& ".\voice bot\.venv\Scripts\python.exe" -m pip install -r "voice bot\requirements.txt"
```

### Configure the API key

Create a `.env` file in the project root and add your own key:

```env
GOOGLE_API_KEY=your_gemini_api_key_here
```

Do not commit `.env` or share your API key.

### Constitution PDF

Keep `95ef471035ee0b5e4e5b1cac3d3584c1.pdf` in the project root (the same folder as `start_app.py`). The backend resolves this path relative to the project, so it also works when the repository is cloned to a different folder.

### Install and start the frontend

```powershell
npm install
```

## Start the full suite

From the project root:

```powershell
.\.venv\Scripts\python.exe .\start_app.py
```

The launcher uses the root `.venv` for the Flask app and the `voice bot\.venv` environment for the Voice Bot.

- **Port 4000**: Next.js main UI
- **Port 5000**: Flask dashboard and API
- **Ports 8000/8001**: Voice Bot

Open `http://localhost:4000` for the main UI or `http://localhost:5000` for the Flask dashboard. Press `Ctrl+C` in the launcher terminal to stop the services.

To run only the Flask dashboard:

```powershell
.\.venv\Scripts\python.exe .\backend\app.py
```

## Upload changes to GitHub

Virtual environments contain machine-specific installed packages. They are excluded from Git; do not upload `.venv` or `voice bot/.venv`. Do not upload `.env` or API keys. Other contributors can recreate the environments using the setup commands above.

In Git Bash, first review **both staged and unstaged** changes. `git add .` stages everything under the current folder, including generated data and documents:

```bash
git status
git diff --cached --stat
```

Stage only files you want to publish. For example:

```bash
git add README.md requirements.txt
git add .gitignore .gitattributes
git add backend/app.py backend/analyze_pdf.py backend/pdf_config.py
# Add the PDF only if you intend to share it in this repository.
git add 95ef471035ee0b5e4e5b1cac3d3584c1.pdf
```

Then inspect the exact staged files and changes before committing:

```bash
git status
git diff --cached --stat
git diff --cached
```

If an unwanted file is already staged, unstage just that file (this keeps the file on disk):

```bash
git restore --staged -- "Github Project Link.docx"
```

Repeat with the path of each unwanted staged file. Do not commit `.env`, virtual environment folders, API keys, or generated files you do not intend to publish.

Once the staged changes are correct, commit and push the current branch:

```bash
git commit -m "Update setup documentation and project configuration"
git push origin main
```

If you see `LF will be replaced by CRLF`, Git is warning about Windows line endings; this usually does not prevent adding or pushing. The `.gitattributes` file sets consistent line endings for common source and documentation files. After adding it, you may see a one-time line-ending change in the staged diff; review that diff before committing.

If Git reports a merge conflict (for example, `<<<<<<<`, `=======`, or `>>>>>>>` in a file), resolve the conflict markers in that file and review the result before staging and committing.

## Project structure

- `src/`: Next.js main interface
- `backend/`: Flask application and API
- `voice bot/`: Voice assistant
- `backend/flashcards-project/`: Flashcard application
