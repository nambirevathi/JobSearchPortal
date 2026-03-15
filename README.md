# 💼 Job Board Application

A modern, responsive Job Board platform built with React that allows job seekers to browse remote jobs, view details, apply, and save jobs for later.

## Features

### ✅ Implemented Features

- **JWT Authentication**: Secure login/logout using the CCBP authentication API
- **Job Listings**: Browse remote jobs from the Remotive API
- **Search & Filter**: Search jobs by title/company and filter by location
- **Job Details**: View comprehensive job information
- **Apply for Jobs**: Submit job applications with cover letter (Protected)
- **Save/Bookmark Jobs**: Save jobs for later viewing (Protected)
- **Responsive Design**: Mobile-friendly interface
- **Protected Routes**: Authentication-based access control
- **Modern UI**: Clean, intuitive design with smooth animations

## Tech Stack

- **Frontend Framework**: React 18.2.0
- **Routing**: React Router 6
- **HTTP Client**: Axios (optional, can use fetch)
- **Authentication**: JWT with Cookies
- **Styling**: CSS with responsive design
- **Package Manager**: npm

## Project Structure

```
JobApplicationPortal/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Header.css
│   │   ├── ProtectedRoute.js
│   ├── context/
│   │   ├── AuthContext.js
│   │   └── JobContext.js
│   ├── pages/
│   │   ├── Login.js
│   │   ├── Login.css
│   │   ├── JobsList.js
│   │   ├── JobsList.css
│   │   ├── JobDetails.js
│   │   ├── JobDetails.css
│   │   ├── ApplyJob.js
│   │   ├── ApplyJob.css
│   │   ├── SavedJobs.js
│   │   └── SavedJobs.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
├── .gitignore
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps

1. **Clone/Download the project**
```bash
cd JobApplicationPortal
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

The application will open at `http://localhost:3000`

## Usage

### Demo Credentials

Use these credentials to test the application:

- **Username**: `rahul`
- **Password**: `rahul@2021`

### User Flow

1. **Login Page** (`/login`)
   - Enter demo credentials
   - JWT token is stored in cookies
   - Redirects to Jobs Dashboard

2. **Browse Jobs** (`/`)
   - View all remote jobs from Remotive API
   - Search by job title or company
   - Filter by location
   - Click on a job to view details

3. **Job Details** (`/job/:jobId`)
   - View full job description
   - Save/bookmark the job
   - Apply for the job (requires login)

4. **Apply for Job** (`/apply/:jobId`) - Protected
   - Fill application form with:
     - Full Name
     - Email
     - Phone Number
     - Years of Experience
     - Cover Letter
   - Submit application
   - Application status is stored locally

5. **Saved Jobs** (`/saved-jobs`) - Protected
   - View all bookmarked jobs
   - Remove from saved
   - Quick apply option

## API Endpoints Used

### Authentication
- **Endpoint**: `https://apis.ccbp.in/login`
- **Method**: POST
- **Body**: `{ username: string, password: string }`
- **Response**: `{ jwt_token: string }`

### Jobs Data
- **Endpoint**: `https://remotive.com/api/remote-jobs`
- **Method**: GET
- **Response**: Array of job objects with details

## Features Implemented as per Requirements

✅ **Authentication (Login & Logout)**
- JWT-based authentication with CCBP API
- Token stored in cookies
- Automatic logout functionality

✅ **Protected Pages**
- Apply Job page (requires authentication)
- Saved/Bookmarked Jobs page (requires authentication)

✅ **Public APIs for Job Data**
- Integrated Remotive API (no API key required)
- Clean, structured job listings

✅ **Core Features**
- View job listings
- Search jobs by title/location
- View job details
- Apply for jobs (protected)
- Save/bookmark jobs (protected)

✅ **Edge Cases Handled**
- No jobs available
- API failures with error messages
- Empty search results
- Unauthorized access redirects to login
- Loading states during API calls

## Future Enhancements

- [ ] Real employer job posting system
- [ ] Resume upload functionality
- [ ] Admin dashboard for employers
- [ ] Email notifications
- [ ] Pagination & infinite scroll
- [ ] Job recommendations based on profile
- [ ] Interview scheduling
- [ ] Application tracking system
- [ ] User profile management
- [ ] Dark mode support

## Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)
[https://job-search-portal-xi.vercel.app]
### `npm build`
Builds the app for production to the `build` folder

### `npm test`
Launches the test runner in interactive watch mode

### `npm eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Application won't start
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Start again
npm start
```

### Login not working
- Verify credentials: `rahul` / `rahul@2021`
- Check internet connection
- Verify CCBP API is accessible

### Jobs not loading
- Check network tab in browser DevTools
- Verify Remotive API is accessible
- Check browser console for errors

## License

This project is part of the NXTWAVE Learning Portal

## Support

For issues or questions, please contact support or create an issue in the repository.

---

**Happy Job Hunting! 🚀**
