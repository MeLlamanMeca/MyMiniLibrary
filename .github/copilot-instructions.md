<!-- AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY. -->
<!-- Source: docs/ai-instructions.md -->

# Project: MyMiniLibrary API

A REST API built with Node.js and Express for managing a personal miniature library.

## Stack
- Node.js (ES Modules)
- Express 5
- PostgreSQL via `pg` pool
- Zod for validation
- Vitest for testing

## Project Structure
src/app/
├── config/       # DB connection
├── controllers/  # Request handling
├── middlewares/  # CORS etc.
├── models/       # DB queries
├── routes/       # Express routers
├── miniDB.js     # Express app factory
└── app.js        # Entry point

## Code Style

### General
- ES Modules only (`import/export`, never `require`)
- For Node.js built-in modules, use imports without the `node:` prefix
- Double quotes for strings
- Semicolons always
- 2 space indentation
- All code must be written in English
- No comments unless strictly necessary — code should be self-explanatory
- No commented-out code left in files

### Comments policy
- No JSDoc
- No inline comments explaining what the code does
- All comments must be written in English
- Only add a comment if there is a non-obvious WHY that cannot be expressed in code

### Classes and functions
- Controllers use class syntax with arrow function methods
- Dependency injection via constructor destructuring: `constructor({ miniModel })`
- Early returns for guard clauses
- Errors bubble up via `next(error)`, never swallowed

### Example of correct style
```javascript
export class MiniController {
  constructor({ miniModel }) {
    this.miniModel = miniModel;
  }

  getMini = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

      const mini = await this.miniModel.get({ id });
      if (!mini) return res.status(404).json({ error: "Mini not found" });

      res.json(mini);
    } catch (error) {
      next(error);
    }
  };
}
```

## Token Optimization
- Only read files relevant to the current task
- Do not index or read `node_modules/`, `generated/`, `.git/`
- Do not re-read files already in context
- When editing, show only the changed lines unless a full rewrite is needed
- Do not summarize files you have not been asked to read

## Model Usage

For queries that do not require direct code implementation (research, guidance, reviews, refactoring analysis, etc.), prefer free x0 models: GPT-5 mini or GPT-4.1. Reserve high-tier models for code generation and complex implementation tasks.

## Ignore
node_modules/
generated/
.git/
*.lock
package-lock.json
.env
