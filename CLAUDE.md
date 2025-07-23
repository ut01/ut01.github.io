# Claude Development Requirements

## Current Task: Find-in-Page Search Feature Refinement

### User Requirements:
1. **Branch Management**: Move recent search feature commit from `main` to `dev` branch
2. **Visual Consistency**: `dev` branch display should be **identical** to `main` branch, only adding search functionality
3. **Search Input Styling**: The page search input should match the existing Google search styling exactly
4. **No Layout Changes**: The search feature should not alter the existing page layout or appearance

### Implementation Details:
- Search functionality has been moved to `dev` branch (commit: 7731f81)
- `main` branch has been reset to previous state (commit: d744052)  
- Search input now integrated into existing navigation bar structure
- Uses same styling classes as existing Google search (`u_nav-input`, `u_nav-btn`)
- No additional CSS modifications that would change the original layout
- Maintains original `block-grid` structure with added `searchable-item` class and `data-keywords`

### Key Files Modified:
- `index.html`: Added find functionality integrated into nav bar
- `_includes/block-grid.html`: Added search attributes while preserving original structure
- `_sass/main.scss`: Removed custom search styling to maintain original appearance
- `_data/links.yml`: Structured data source for dynamic rendering with keywords

### Search Feature Specifications:
- Real-time filtering as user types
- Support for English titles, Chinese keywords, and full names
- "No results found" message when search yields no matches
- Empty search box shows all items (fixed the original bug)
- Integrated into existing navigation bar layout