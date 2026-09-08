# DARC Design Team Workspace

A unified project operations dashboard for the DARC Design Team, built with Vanilla Node.js and Vanilla JS.

## Prerequisites
- **Node.js**: version 20.6.0 or higher is **required** (relies on native `--env-file` support).

## Setup & Running

1. **Configure Environment Variables**
   Create a `.env` file in the root directory (optional, but recommended for production):
   ```env
   PORT=5555
   COOKIE_SECRET=your_secure_random_string_here
   # Email functionality (for invites & notifications)
   RESEND_API_KEY=re_your_resend_api_key
   EMAIL_FROM=DARC <hello@darc.com>
   ```

2. **Start the Server**
   ```bash
   node --env-file=.env server.js
   ```
   *(If you don't have a `.env` file, simply run `node server.js`)*

3. **Access the Dashboard**
   Open your browser and navigate to `http://localhost:5555`

   **Demo Account:**
   - Email: `admin@darc.local`
   - Password: `DARC-Admin-2026!`

## Data Storage
- Data is stored in `data/db.json` (created automatically on first run).
- Uploaded files/documents are saved to `data/uploads/`.

## Running Tests
An automated integration test suite is included:
```bash
node tests/api.test.js
```
The test suite spans a temporary test server and database (`data/test-db.json`) ensuring no disruption to real data.
