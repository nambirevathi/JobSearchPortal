# 🔗 API Documentation

## Overview

This application integrates with two public APIs:
1. **CCBP Login API** - For authentication
2. **Remotive Jobs API** - For job listings

## Authentication API

### Endpoint: CCBP Login

```
POST https://apis.ccbp.in/login
```

### Request

```json
{
  "username": "rahul",
  "password": "rahul@2021"
}
```

### Response (Success)

```json
{
  "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Response (Error)

```json
{
  "error_msg": "Invalid credentials"
}
```

### Implementation

The authentication is handled in `src/context/AuthContext.js`:

```javascript
const response = await fetch('https://apis.ccbp.in/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ username, password })
})
```

### Token Storage

- Token is stored in cookies using `js-cookie` library
- Cookie name: `jwtToken`
- Expiry: 7 days
- HTTP-only: No (can be accessed by JavaScript)

### Token Usage

For future authenticated API calls, include the token in headers:

```javascript
const token = Cookies.get('jwtToken')
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

---

## Jobs API

### Endpoint: Remotive Remote Jobs

```
GET https://remotive.com/api/remote-jobs
```

### Request

No authentication required. Optional query parameters:

```
GET https://remotive.com/api/remote-jobs?limit=50&offset=0
```

### Response

```json
{
  "jobs": [
    {
      "id": 123,
      "title": "Senior React Developer",
      "company_name": "Tech Company",
      "company_logo": "https://...",
      "candidate_required_location": "USA",
      "job_type": "Full-time",
      "description": "HTML description of the job...",
      "excerpt": "Brief summary...",
      "salary": "$80,000 - $120,000",
      "published_at": "2024-01-15T10:30:00Z",
      "url": "https://remotive.com/remote-jobs/..."
    },
    // ... more jobs
  ]
}
```

### Job Object Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | Number | Unique job identifier |
| `title` | String | Job title |
| `company_name` | String | Company name |
| `company_logo` | String | Company logo URL |
| `candidate_required_location` | String | Required location |
| `job_type` | String | Type of employment |
| `description` | String | Full job description (HTML) |
| `excerpt` | String | Brief job summary |
| `salary` | String | Salary information |
| `published_at` | String | Publication date (ISO 8601) |
| `url` | String | Job listing URL |

### Implementation

Fetching jobs in `src/pages/JobsList.js`:

```javascript
const response = await fetch('https://remotive.com/api/remote-jobs')
const data = await response.json()

if (data.jobs) {
  setJobs(data.jobs.slice(0, 50)) // Limit to 50 jobs
}
```

### Rate Limiting

- No official rate limit documented
- Recommended: Max 1-2 requests per second
- Cache results to reduce API calls

---

## Application API (Internal State)

The application manages job applications and saved jobs using React Context:

### Saving a Job

```javascript
// In JobContext
toggleSaveJob(job) {
  // Adds or removes job from savedJobs array
}
```

### Applying for a Job

```javascript
// In JobContext
applyForJob(job, applicationData) {
  // Stores application with:
  // - job details
  // - applicant information
  // - application timestamp
}
```

### Application Data Structure

```javascript
{
  id: jobId,                    // Job ID
  title: "Job Title",
  company_name: "Company",
  appliedAt: "2024-01-15T...",  // ISO timestamp
  applicantName: "John Doe",
  applicantEmail: "john@example.com",
  applicantPhone: "+1234567890",
  experience: "5",              // Years
  coverLetter: "...",
  // ... other job details
}
```

---

## Error Handling

### Login Errors

```javascript
try {
  const response = await fetch('https://apis.ccbp.in/login', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  })

  if (!response.ok) {
    const data = await response.json()
    setError(data.error_msg || 'Login failed')
    return false
  }
  
  const { jwt_token } = await response.json()
  return true
} catch (err) {
  setError('Network error. Please try again.')
  return false
}
```

### Jobs API Errors

```javascript
try {
  const response = await fetch('https://remotive.com/api/remote-jobs')
  const data = await response.json()
  
  if (data.jobs) {
    setJobs(data.jobs)
  }
} catch (err) {
  setError('Failed to fetch jobs. Please try again later.')
}
```

---

## CORS Considerations

### Remotive API

- ✅ CORS enabled
- No authentication required
- No API key needed
- Public access allowed

### CCBP API

- ✅ CORS enabled
- No authentication required for login endpoint
- POST method allowed
- JSON request/response

---

## Testing API Endpoints

### Using curl (Command Line)

**Test Login:**
```bash
curl -X POST https://apis.ccbp.in/login \
  -H "Content-Type: application/json" \
  -d '{"username":"rahul","password":"rahul@2021"}'
```

**Fetch Jobs:**
```bash
curl https://remotive.com/api/remote-jobs
```

### Using Postman

1. Create new request
2. Set method to GET for jobs, POST for login
3. Enter URL
4. For login, add JSON body with credentials
5. Send and view response

### Using JavaScript Console

```javascript
// Test login
fetch('https://apis.ccbp.in/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'rahul', password: 'rahul@2021' })
})
.then(res => res.json())
.then(data => console.log(data))

// Test jobs API
fetch('https://remotive.com/api/remote-jobs')
.then(res => res.json())
.then(data => console.log(data.jobs.slice(0, 3)))
```

---

## Future API Integration

When connecting to a backend, update these files:

1. **`src/context/AuthContext.js`**
   - Update login endpoint to your backend
   - Add token refresh logic
   - Implement logout endpoint

2. **`src/pages/JobsList.js`**
   - Update job fetching to your backend
   - Add search/filter on backend
   - Implement pagination

3. **`src/pages/ApplyJob.js`**
   - Send application to backend API
   - Implement resume upload
   - Return application status

4. **`src/pages/SavedJobs.js`**
   - Fetch saved jobs from backend
   - Persist to database
   - Sync across devices

### Backend API Structure (Example)

```
Authentication:
  POST   /api/auth/login              - Login user
  POST   /api/auth/logout             - Logout user
  POST   /api/auth/refresh            - Refresh token

Jobs:
  GET    /api/jobs                    - List all jobs
  GET    /api/jobs/:id                - Get job details
  POST   /api/jobs                    - Create job (employer)
  PUT    /api/jobs/:id                - Update job (employer)
  DELETE /api/jobs/:id                - Delete job (employer)

Applications:
  POST   /api/applications            - Submit application
  GET    /api/applications            - Get user applications
  GET    /api/applications/:id        - Get application details
  PUT    /api/applications/:id        - Update application

Saved Jobs:
  POST   /api/saved-jobs              - Save a job
  GET    /api/saved-jobs              - Get saved jobs
  DELETE /api/saved-jobs/:id          - Remove saved job
```

---

## Performance Tips

1. **Cache Job Data**
   - Store fetched jobs in localStorage
   - Reduce API calls
   - Improve page load speed

2. **Implement Pagination**
   - Fetch jobs in batches
   - Load more on scroll
   - Better performance

3. **Request Debouncing**
   - Debounce search input
   - Reduce API calls while typing
   - Better UX

4. **Error Retry Logic**
   - Retry failed requests
   - Exponential backoff
   - Better reliability

---

**Last Updated**: February 1, 2026
