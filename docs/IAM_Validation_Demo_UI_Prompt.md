
# IAM Validation Assistant Demo UI – Cursor Agent Prompt

## **Project Goal**
Build a **visually rich, production-style demo UI** for an **IAM Evaluation Assistant** that automates **Non-Human Account (NHA) validation** based on service account ID. The application should simulate the architecture shown in the “Single Agent – Tool Use Pattern” and use **dummy data** for demo purposes.

---

## **Instructions for Cursor Agent**

### 1. UI Framework & Structure
- Use **React + Tailwind CSS**
- Structure the UI into:
  - **Prompt Input Area**
  - **Result Display Panel**
  - **Evidence Viewer**
- **Look & feel must be clean, premium, and enterprise-grade**

---

### 2. Input Panel (Top Section)
- Textbox with placeholder: `"Enter Service Account ID (e.g. svc-usr123)"`
- Button: `"Validate Account"`
- Simulate dropdown option for demo
- Styling like Chainlit with conversational left-aligned UI

---

### 3. Data Fetch Simulation
Simulate backend to fetch:

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

---

### 4. LLM Validation Response (Simulated)

Example JSON to simulate output:

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

### 5. Evidence Display Section
- Mock evidence list
- Modal preview (PDF/image/doc)
- Include:
  - Uploaded By
  - Date
  - Evidence Type

---

### 6. Feedback Box
- Feedback input: `"Was this validation correct?"` [Yes/No/Comment]
- Store to mock backend or console log

---

### 7. Architecture Representation
- Add `Help` or `About` section explaining architecture:
  - Chainlit UI
  - Agent Library (MCP/API)
  - Prompt Generation
  - Tachyon via Apigee
  - Evidence Sources (mocked)

---

### 8. Dummy Backend Services (Optional)
- Create `/mock-data` APIs:
  - Metadata
  - LLM validation response
  - Evidence

---

### 9. Visual Design Priority
- Use:
  - Gradient headers
  - Tabs/accordion for controls
  - Icons for status
  - Subtle animations
- Style: Like an **AI assistant inside a control portal**

---

### 10. Hosting & Demo
- Run via `npm start` or `yarn dev`
- Add `README` with note: _This is a demo UI for IAM Validation Assistant – Phase 1_

---

## **Final Notes**
- Use **mock data** – correctness not required
- Focus on **flow, UX, explainability**
- Simulate complete autonomous architecture in the demo

