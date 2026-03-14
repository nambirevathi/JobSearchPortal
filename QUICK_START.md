# 🚀 Quick Start Guide

## Setup & Run in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm start
```

### Step 3: Login & Test
Open `http://localhost:3000` and use these demo credentials:

```
Username: rahul
Password: rahul@2021
```

## What You Can Do

### 👤 Job Seeker (After Login)
1. **Browse Jobs** - View all remote job listings
2. **Search** - Find jobs by title or company name
3. **Filter** - Filter jobs by location
4. **Details** - Click any job to see full details
5. **Save** - Click heart icon to bookmark jobs
6. **Apply** - Submit job applications with cover letter
7. **Track** - See which jobs you've already applied for
8. **Review** - Check all saved jobs in one place

### 🔐 Authentication
- Secure JWT-based login
- Automatic logout
- Protected apply & saved jobs pages

## Project Features

✅ Real job data from Remotive API  
✅ Responsive mobile design  
✅ Search & filtering  
✅ Job applications with validation  
✅ Bookmark/Save functionality  
✅ Modern UI with smooth animations  
✅ Error handling & loading states  

## Folder Structure

```
src/
├── components/          # Reusable components
├── context/            # State management (Auth, Jobs)
├── pages/              # Page components
├── App.js              # Main app routing
└── index.js            # React entry point
```

## Available Commands

```bash
npm start              # Run development server
npm build              # Create production build
npm test               # Run tests
```

## Demo Workflows

### Workflow 1: Browse & Apply
1. Login with demo credentials
2. Go to "Browse Jobs"
3. Search for "React" or "JavaScript"
4. Click on a job
5. Click "Apply Now"
6. Fill the application form
7. Submit

### Workflow 2: Save & Review
1. Login with demo credentials
2. Browse jobs and click heart icon to save
3. Go to "Saved Jobs" (top right)
4. View all your bookmarked jobs
5. Click "Apply" or "View Details"

### Workflow 3: Logout & Security
1. Click "Logout" button (top right)
2. You'll be redirected to login
3. Try accessing `/saved-jobs` directly - redirects to login
4. Try accessing `/apply/123` directly - redirects to login

## Troubleshooting

### Port 3000 Already in Use?
```bash
npm start -- --port 3001
```

### Dependencies Not Installing?
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Blank Page After Login?
- Check browser console (F12) for errors
- Make sure you're using correct credentials: rahul / rahul@2021
- Clear browser cache and reload

### Jobs Not Loading?
- Check internet connection
- Verify Remotive API is accessible
- Check network tab in DevTools (F12)

## File Highlights

### Key Files
- `src/App.js` - Main routing setup
- `src/context/AuthContext.js` - Login/authentication logic
- `src/context/JobContext.js` - Save/apply functionality
- `src/pages/JobsList.js` - Jobs browsing page
- `src/pages/ApplyJob.js` - Application form

### Styling
- `src/index.css` - Global styles
- `src/pages/*.css` - Page-specific styles
- `src/components/Header.css` - Header styling

## Browser DevTools Tips

1. **Check Login**: Open DevTools → Application → Cookies → Look for `jwtToken`
2. **View Jobs Data**: DevTools → Network → Filter "remotive" → View response
3. **Debug Routes**: DevTools → Console → No errors should appear
4. **Test Protection**: Try accessing protected routes without login

## Next Steps

1. ✅ Explore the application
2. ✅ Test all features
3. ✅ Review the code
4. ✅ Customize styling (change colors in CSS files)
5. ✅ Deploy to Vercel/Netlify (optional)

## Important Notes

- Job applications are stored in browser memory (not persistent)
- Demo credentials are provided by CCBP API
- Real job data comes from Remotive API (free, no API key needed)
- For production, integrate with a backend database

---

**Happy Exploring! 🎉**

For more details, see [README.md](README.md) or [BUILD_SUMMARY.md](BUILD_SUMMARY.md)
