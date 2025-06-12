# Nexuva

A full-stack CRM app designed to help sales teams efficiently manage their lead pipeline — from acquisition to closure. Built using React for the frontend and Express with MongoDB on the backend.

## Live demo
[Run](https://nexuva.vercel.app)

---

## Login
> **Guest** <br>
> email: `john@example.com` <br>
> password: `John@123`

## Quick Start
```
git clone https://github.com/Jagdish-2023/Nexuva.git
cd Nexuva
npm install
npm run dev
```

## Technologies
- React, react-router
- Bootstrap
- MongoDB,Mongoose
- Node.js, Express.js
- JWT (JSON Web Token)

## Features
**Dashboard**
- Sidebar navigation (Leads, Agents, Reports).
- Display of leads categorized by status (New, Contacted, etc.).
- Quick filters to easily switch between lead statuses.
- Option to add new leads via a button.

**Leads**
- A list of leads with key details such as status and assigned sales agent.
- Filter options to filter by lead status or sales agent.
- Sorting options (by priority or time to close).
- Option to add new leads.
- URL filtering (e.g - `/leads?salesAgent=John`, `/leads?status=Qualified`)

**Sales Agents**
- A list of sales agents with their names and contact information.
- Option to add new agents using the "Add New Agent" button.

**Lead Management**
- Displays key details about the lead: assigned sales agent, source, status, time to close, and priority.
- A comments section where sales agents can add updates, including timestamps and authorship.
- Button for editing lead details (e.g., status or assigned sales agent).
- Input field and submit button for adding new comments.

**Reports**
- Various charts showing lead progress and performance.

**Authentication**
- JWT based authentication.
- SignUp and SignIn feature to easily access to the account.

## API Reference
**Leads**
- GET/leads - List of all Leads.
- GET/leads/:leadId - Fetch a specific Lead details (name, source, agent, status, tags etc.).
- POST/leads - Add new Lead.
- POST/leads/:leadId - Update Lead data to an existing Lead.
- POST/leads/:leadId/comments - Add comments to an existing Lead.

**Sales Agents**
- GET/agents - List of all Agents.
- POST/agents - Add a new Agent.

**User**
- GET/profile - User information details.

**Authentication**
- POST/register - Register a new user account.
- POST/login - Sign in an existing user with credentials.

---
## Contact
For bugs or feature requests, please reach out to jagdishjpradhan@gmail.com 
