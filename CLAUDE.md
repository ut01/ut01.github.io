# Next Task: Fix Find Button Layout Issues

## Current Problems:
- Find input and Find button are appearing on separate lines instead of same line
- Need them to stick together like Google search box layout  
- User says "commit even worse, revert to last commit"
- Need fast way to preview site locally (current Jekyll setup not working)

## Previous attempts failed:
- Absolute positioning caused layer separation issues
- Moving to right nav area didn't work as expected

## User Requirements:
- Find input and Find button should be on SAME LINE sticking together
- Similar to how Google search input and button work together
- Need working local preview to test changes before commit

## Local Deploy Methods:

### Option 1: GitHub Pages Preview
- Push to dev branch and check https://ut01.github.io (if GitHub Pages is enabled)
- Fastest for testing but requires commit

### Option 2: Simple HTTP Server (limited)
```bash
python3 -m http.server 8000
# Visit http://localhost:8000
# Note: Jekyll templating won't work, only static HTML/CSS/JS
```

### Option 3: Jekyll Local Setup
```bash
# Install Ruby dependencies (requires sudo)
bundle install
bundle exec jekyll serve --port 4000
# Visit http://localhost:4000
```

### Option 4: VS Code Live Server
- Install Live Server extension in VS Code
- Right-click index.html -> "Open with Live Server"
- Note: Jekyll templating won't work

# Next Task: improve SEO:

Minified CSS
False
Minified JavaScript
False
