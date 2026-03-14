# 🎨 Job Board - Tailwind CSS Edition

## Ready to Run - Tailwind CSS Version

Your Job Board application is now fully rebuilt with **Tailwind CSS**!

---

## ⚡ Quick Start (3 Steps)

### Step 1: Install Node.js (if not already installed)
- Visit: https://nodejs.org/
- Download **LTS version**
- Install and restart your terminal

### Step 2: Install Dependencies
```powershell
cd "C:\Users\NXTWAVE\OneDrive - NXTWAVE DISRUPTIVE TECHNOLOGIES PRIVATE LIMITED\Desktop\JobApplicationPortal"
npm install
```

### Step 3: Start the Application
```powershell
npm start
```

The app opens automatically at: **http://localhost:3000**

---

## 🔑 Login Credentials

```
Username: rahul
Password: rahul@2021
```

---

## ✨ What's New

### Tailwind CSS Integration
✅ Modern utility-first CSS framework
✅ Responsive design out-of-the-box
✅ Smaller bundle size
✅ Faster styling workflow
✅ Easy customization

### Tech Stack
- React.js 18
- React Router 6
- Tailwind CSS 3
- JWT Authentication
- Remotive API

---

## 📁 File Structure

```
JobApplicationPortal/
├── src/
│   ├── components/
│   │   ├── Header.js (Tailwind)
│   │   └── ProtectedRoute.js
│   ├── context/
│   │   ├── AuthContext.js
│   │   └── JobContext.js
│   ├── pages/
│   │   ├── Login.js (Tailwind)
│   │   ├── JobsList.js (Tailwind)
│   │   ├── JobDetails.js (Tailwind)
│   │   ├── ApplyJob.js (Tailwind)
│   │   └── SavedJobs.js (Tailwind)
│   ├── App.js
│   ├── index.js
│   ├── index.css (Tailwind directives)
│   └── App.css
├── tailwind.config.js (NEW)
├── postcss.config.js (NEW)
├── package.json (Updated)
└── public/
    └── index.html
```

---

## 🎯 Features

✅ **Browse Jobs** - Real jobs from Remotive API
✅ **Search & Filter** - Find jobs by title, company, location
✅ **View Details** - Complete job information
✅ **Apply** - Submit applications (protected)
✅ **Save** - Bookmark jobs (protected)
✅ **Authentication** - JWT-based login
✅ **Responsive** - Works on mobile, tablet, desktop

---

## 🧪 Test Workflow

1. **Login**
   - Use: rahul / rahul@2021
   - Verify JWT token is stored

2. **Browse Jobs**
   - View job listings
   - Search and filter

3. **View Details**
   - Click on any job
   - See full job information

4. **Save Job**
   - Click heart icon to bookmark
   - Go to "Saved Jobs" to view

5. **Apply**
   - Click "Apply Now"
   - Fill application form
   - Submit

6. **Logout**
   - Click Logout button
   - Redirected to login page

---

## 💻 Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

---

## 🎨 Tailwind Customization

Edit `tailwind.config.js` to customize:

```javascript
theme: {
  extend: {
    colors: {
      primary: "#YOUR_COLOR",
      success: "#YOUR_COLOR",
      // ... more customization
    },
  },
}
```

---

## 📱 Browser Support

✅ Chrome (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Edge (latest)
✅ Mobile browsers

---

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
npm start -- --port 3001
```

### Clear Cache & Reinstall
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
npm start
```

### Tailwind Styles Not Showing
- Check browser console for errors
- Ensure `tailwind.config.js` exists
- Restart `npm start`

---

## 📚 Documentation

- **TAILWIND_REBUILD.md** - Detailed Tailwind setup
- **README.md** - Complete user guide
- **API_DOCUMENTATION.md** - API endpoints

---

## ✅ Status

**Version**: 1.0.0 (Tailwind CSS Edition)
**Status**: ✅ Ready to Use
**Last Updated**: February 1, 2026

---

## 🚀 Let's Go!

```bash
# Copy and paste these commands:
cd "C:\Users\NXTWAVE\OneDrive - NXTWAVE DISRUPTIVE TECHNOLOGIES PRIVATE LIMITED\Desktop\JobApplicationPortal"
npm install
npm start
```

The application will open in your browser!

---

**Happy Job Hunting! 💼**
