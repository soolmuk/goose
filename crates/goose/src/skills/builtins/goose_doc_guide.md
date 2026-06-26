---
name: goose-doc-guide
description: Reference goose documentation to create, configure, or explain goose-specific features like recipes, extensions, sessions, and providers. You MUST read or fetch relevant goose docs before answering. You MUST NOT rely on training data or assumptions for any goose-specific fields, values, names, syntax, or commands.
---

Use this skill when working with **goose-specific features**:
- Creating or editing recipes
- Configuring extensions or providers
- Explaining how goose features work
- Any goose configuration or setup task

Do NOT use this skill for:
- General coding tasks unrelated to goose
- Running existing recipes (just run them directly)

## Steps (COMPLETE ALL BEFORE RESPONDING)
1. **Fetch official docs**
   - Resolve a docs root in this order:
      - If `GOOSE_DOCS_ROOT` is configured in goose `config.yaml` and the trimmed value is non-empty, use it as the docs root. It may be a local filesystem path or an HTTP(S) mirror root.
      - Otherwise use the online docs root: `https://goose-docs.ai`
   - Read or fetch the doc map from `<docs-root>/goose-docs-map.md`.
   - Resolve the docs source silently. Do not tell the user that `GOOSE_DOCS_ROOT` is not configured, local docs are missing, or online fallback was used unless they explicitly ask.
   - Search the doc map for pages relevant to the user's topic and get the paths for these pages.
   - Use the EXACT paths from the doc map. For example:
      - If doc map shows: `docs/guides/sessions/session-management.md`
      - For local docs, read: `<docs-root>/docs/guides/sessions/session-management.md`
      - For HTTP(S) docs roots, fetch: `<docs-root>/docs/guides/sessions/session-management.md`
   - Do NOT modify or guess paths.
   - **ONLY use paths that are explicitly listed in the doc map - do not guess or infer paths/URLs**
   - Read or fetch multiple relevant docs in parallel and save them to temp files when applicable.
   - Use the temp files for subsequent searches instead of re-reading or re-fetching.

2. **Create/modify content**
   - For goose configuration files:
      - Consult schema/field reference documentation first
      - **Search the fetched/read docs to extract the complete schema for each element you plan to use**
      - Extract example snippets to understand usage patterns
      - Create your configuration based on reference specs, following example patterns
      - **⚠️ STOP: Before showing the user, verify output content MUST match the schema and reference in the goose official documentation:**
         - [ ] Field names match exactly as shown in docs
         - [ ] Required fields/properties are present
         - [ ] Value formats match examples (YAML/JSON syntax, data types, etc.)
      - **If ANY verification fails, revise and repeat this step until ALL verifications pass**
      - **DO NOT present unverified output to the user**

3. **MANDATORY VERIFICATION - CHECK ALL THESE ITEMS BEFORE STEP 4**
   Before writing your final answer:
   - [ ] You MUST NOT rely on training data or assumptions for any goose-specific fields, values, names, syntax, or commands.
   - [ ] **Did you include "How to Use", CLI commands, or usage instructions?**
      - If YES and user didn't ask for it → **REMOVE IT NOW**
      - If YES and user asked for it → verify exact commands from fetched/read docs before including
   - [ ] List all goose-specific items in your answer (commands, fields, syntax, values, how to use, explanations, etc.)
   - [ ] For each item, verify it is correct according to the fetched/read docs. If not found, either fetch/read the relevant docs NOW and verify, or remove it (if user asked for it, state "I could not find documentation for [X]").

4. **Provide your answer and include a "Verification Completed" section**
   - For EACH goose-specific item in your response, cite the specific doc file where you verified it

5. **List documentation links**
   - Only include docs actually used
   - Never expose local filesystem paths in documentation links.
   - If docs came from a local docs root, convert doc map paths to canonical `https://goose-docs.ai/` URLs.
   - If docs came from an HTTP(S) docs root, use that HTTP(S) root for links.
   - Remove `.md` suffix from URLs
   - Example: If you read local `docs/guides/sessions/session-management.md`, list it as `https://goose-docs.ai/docs/guides/sessions/session-management`
   - Example: If you fetched `https://goose-docs.ai/docs/guides/sessions/session-management.md`, list it as `https://goose-docs.ai/docs/guides/sessions/session-management`
