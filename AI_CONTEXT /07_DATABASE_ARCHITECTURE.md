# Database Architecture: NyayaSetu

This document outlines the complete MongoDB architecture for NyayaSetu Version 2.

---

## Database Overview
NyayaSetu utilizes **MongoDB Atlas**, a managed NoSQL cloud database. The architecture is designed around document-based storage, allowing for flexible schemas, especially useful for storing variable AI analysis outputs (like arbitrary clauses and risk factors).

---

## Collections & Schemas

### 1. users
**Purpose:** Stores registered user accounts and authentication credentials.
**Fields:**
- _id: ObjectId
- 
ame: String (Required)
- email: String (Required, Unique, Match regex)
- password: String (Required, selected: false)
- ole: String (Enum: ['user', 'admin'], Default: 'user')
- createdAt: Date (Default: Date.now)
**Validation:** Mongoose schema validates email format and password length pre-save.

### 2. documents
**Purpose:** Stores metadata and raw extracted text for uploaded files.
**Fields:**
- _id: ObjectId
- user: ObjectId (Ref: 'User', Required)
- ileName: String (Required)
- ileType: String (Required)
- ilePath: String (Required)
- ileSize: Number (Required)
- content: String (Raw text extracted from PDF/DOCX)
- processingError: String (Default: null)
- createdAt: Date (Default: Date.now)

### 3. summaries
**Purpose:** Stores the structured JSON output returned from the Gemini AI.
**Fields:**
- _id: ObjectId
- document: ObjectId (Ref: 'Document', Required, Unique)
- summaryText: String (Required)
- clauses: Array of Objects { title: String, description: String }
- isks: Array of Objects { title: String, severity: String, description: String }
- metadata: Object { parties: Array, effectiveDate: Date }
- createdAt: Date (Default: Date.now)

### 4. reetriallogs
**Purpose:** Rate limits unauthenticated users.
**Fields:**
- _id: ObjectId
- ipAddress: String (Required, Unique)
- uploadCount: Number (Default: 1)
- lastUpload: Date (Default: Date.now)

---

## Relationships (ER Concept)
- **User (1) to Documents (N):** A user can upload many documents. The documents collection stores the User._id.
- **Document (1) to Summary (1):** Each document has exactly one AI summary. The summaries collection stores the Document._id.

---

## Index Strategy
- **users:** Unique index on email.
- **documents:** Index on user for fast history retrieval (GET /api/documents).
- **summaries:** Unique index on document to prevent duplicate processing.
- **reetriallogs:** Unique index on ipAddress.

---

## Data Lifecycle & Soft Delete
**Current:** Documents are hard-deleted.
**Future Strategy:** Implement a deletedAt field on documents. Modify all queries to include { deletedAt: null }. This preserves the AI analysis data for future model tuning while hiding it from the user.

---

## Security & Atlas Configuration
- **Encryption:** MongoDB Atlas encrypts all data at rest by default.
- **Network Security:** Database access should be restricted to the static IP of the Render backend servers.
- **Backups:** Configure daily snapshots in Atlas with a 7-day retention period.

---

## Database Scaling Strategy
- **Vertical:** Increase Atlas cluster tier (M0 -> M10).
- **Performance Optimization:** Use .lean() in Mongoose queries when fetching document history to bypass Mongoose document instantiation overhead.
