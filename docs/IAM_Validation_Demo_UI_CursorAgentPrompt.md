
# IAM Validation Assistant Demo UI – Cursor Agent Prompt

## Project Goal
Build a **visually rich, production-style demo UI** for an **IAM Evaluation Assistant** that automates **Non-Human Account (NHA) validation** based on service account ID. The application should simulate the architecture shown in the “Single Agent – Tool Use Pattern” and use **dummy data** for demo purposes.

---

## Instructions for Cursor Agent (Developer-Focused with Front-End Guidelines)

### 1. UI Framework & Structure
- Use **Next.js** with **TypeScript** and **Tailwind CSS**
- Component-based architecture adhering to **DRY principles**
- Key UI areas:
  - Prompt Input Section
  - Validation Results Display
  - Evidence Viewer Modal
  - Feedback Submission Panel
  - Help/About Drawer
- Design priority: **Clean, intuitive, enterprise-grade experience**

---

### 2. Input Panel (Service Account Prompt)
```pseudocode
Component: InputPanel
- Render an accessible text input field for entering Service Account ID
- Render a primary CTA button labeled "Validate Account"
- On click, simulate API call and trigger mock backend flow
```

---

### 3. Agent Execution Simulation Flow
```pseudocode
Component: AgentProcessor
- Accept serviceAccountId as prop
- Simulate:
    1. Map Service Account to Application
    2. Fetch metadata (last used, owner, app)
    3. Fetch dummy evidence files
    4. Simulate LLM validation and generate output
```

---

### 4. Result Display Panel
```pseudocode
Component: ResultDisplay
- Display mock metadata (JSON to object rendering)
- Show compliance score visually (progress bar or badge)
- Display result (Pass / Partial / Fail)
- Show reasoning in structured format
```

---

### 5. Evidence Viewer
```pseudocode
Component: EvidenceViewer
- Render list of files with type tags (PDF, Screenshot)
- On click, open modal with preview
- Include file name, type, upload date, and simulated content viewer
```

---

### 6. Feedback Section
```pseudocode
Component: FeedbackPanel
- Render Yes/No buttons for validation feedback
- Textarea for optional comment
- On submit, simulate saving feedback (console log)
```

---

### 7. About / Architecture Info
```pseudocode
Component: HelpDrawer
- Toggle drawer or modal describing:
    - Architecture
    - Data flow
    - Agentic behavior
    - Tools involved (Tachyon, MCP, Apigee, ES, etc.)
```

---

### 8. Visual Design Guidelines
- Use Tailwind CSS exclusively
- Responsive layouts
- Accessible interactive elements
- Transitions and hover states
- Icons from **Font Awesome**

---

### 9. Dummy Data (Simulated Backend)
#### ServiceAccount JSON
```json
{
  "account_id": "svc-usr123",
  "application": "CustomerDataPipeline",
  "owner": "John Doe",
  "last_used": "2025-01-10",
  "evidence": ["JIRA-1182", "Email Approval Screenshot"],
  "metadata": {
    "ticket_id": "JIRA-1182",
    "last_activity_days": 125,
    "account_type": "Privileged Service Account"
  }
}
```

#### LLM Response
```json
{
  "compliance": "Partially Compliant",
  "score": "72%",
  "violations": ["Inactive > 90 days", "Stale ticket"],
  "recommendation": "Get owner reconfirmation via updated approval ticket",
  "explanation": "The service account has not been used for 125 days. Approval ticket found but older than 90 days."
}
```

---

### 10. Hosting and Final Presentation
- App should run via `npm run dev`
- Provide README explaining architecture
- Ensure visually impressive for stakeholder demo

---

## Final Notes
- Use **mock data only** for this demo
- Prioritize **UI/UX polish, responsiveness, and interactivity**
- Emulate complete autonomous workflow logic visually
- Leave no placeholders or TODOs
- Ensure code is **production-ready in structure and design**
