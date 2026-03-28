# Gym Website Project

A complete, modern gym website with frontend (HTML/CSS/JavaScript) and backend (Node.js/Express).

## 💻 Features

### Frontend
- ✅ Responsive design for all devices
- ✅ Hero section with call-to-action
- ✅ Services showcase
- ✅ Trainer profiles
- ✅ Membership plans with pricing
- ✅ BMI Calculator
- ✅ Contact/Booking form
- ✅ Smooth scroll navigation
- ✅ Mobile-friendly menu

### Backend
- ✅ REST API with Express.js
- ✅ Membership registration endpoint
- ✅ Booking system endpoint
- ✅ Form validation
- ✅ CORS enabled
- ✅ Error handling

## 💾 Folder Structure

```
Gym-Website/
├── public/
│   ├── index.html      # Main HTML file
│   ├── style.css       # Styles
│   └── script.js       # Frontend JavaScript
├── server/
│   └── server.js       # Express backend
├── package.json        # Dependencies
└── README.md           # This file
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)
- Visual Studio Code (recommended)

### Step 1: Install Node.js
Download and install from: https://nodejs.org/

### Step 2: Open Project in VS Code
1. Open Visual Studio Code
2. Click `File` > `Open Folder`
3. Select the `Gym-Website` folder

### Step 3: Install Dependencies
Open the integrated terminal in VS Code:
- **Windows/Linux**: `Ctrl + `` ` `` (backtick)
- **Mac**: `Cmd + `` ` ``

Then run:
```bash
npm install
```

This will install:
- `express` - Web framework
- `cors` - Cross-origin resource sharing
- `nodemon` - Auto-restart server (dev only)

### Step 4: Start the Server

**Option A: Production Mode**
```bash
npm start
```

**Option B: Development Mode** (auto-restart on changes)
```bash
npm run dev
```

You should see:
```
==============================================
🏋️  Fitness Club Server Started
==============================================
🚀 Server running on: http://localhost:3000
📱 Frontend: http://localhost:3000
🔌 API: http://localhost:3000/api
💪 Status: Ready to accept requests
==============================================
```

### Step 5: Open in Browser
Open your browser and go to:
```
http://localhost:3000
```

## 🛠️ Usage

### Frontend Features

1. **Navigation**: Click menu items to scroll to sections
2. **Membership Plans**: Click "SELECT PLAN" to open registration form
3. **BMI Calculator**: Enter height and weight to calculate BMI
4. **Booking Form**: Fill out the form to book a trial session

### Backend API Endpoints

#### 1. Membership Registration
```http
POST http://localhost:3000/api/membership
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "startDate": "2024-03-15",
  "plan": "Premium",
  "price": 59
}
```

#### 2. Booking
```http
POST http://localhost:3000/api/booking
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "0987654321",
  "service": "personal",
  "date": "2024-03-20",
  "message": "I want to focus on weight loss"
}
```

#### 3. View All Memberships (Admin)
```http
GET http://localhost:3000/api/memberships
```

#### 4. View All Bookings (Admin)
```http
GET http://localhost:3000/api/bookings
```

#### 5. Health Check
```http
GET http://localhost:3000/api/health
```

## 🎨 Customization

### Change Colors
Edit `public/style.css` - look for CSS variables:
```css
:root {
    --primary-color: #0ea5e9;  /* Change this */
    --primary-dark: #0284c7;
    --dark-bg: #0f172a;
}
```

### Change Content
Edit `public/index.html` to update:
- Gym name
- Services offered
- Trainer information
- Membership prices
- Contact details

### Change Port
Edit `server/server.js`:
```javascript
const PORT = process.env.PORT || 3000; // Change 3000 to your port
```

## 📝 Testing

### Test Frontend
1. Navigate through all sections
2. Test mobile menu (resize browser)
3. Fill out forms
4. Calculate BMI

### Test Backend
Use Postman, Thunder Client, or curl:

```bash
# Test membership registration
curl -X POST http://localhost:3000/api/membership \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","phone":"1234567890","startDate":"2024-03-15","plan":"Basic","price":29}'

# Test booking
curl -X POST http://localhost:3000/api/booking \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","phone":"1234567890","service":"yoga","date":"2024-03-20","message":"Test booking"}'

# Check server health
curl http://localhost:3000/api/health
```

## 🛡️ Troubleshooting

### Port Already in Use
If you get "Port 3000 is already in use":

**Option 1**: Kill the process
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

**Option 2**: Change the port in `server/server.js`

### Cannot GET /
Make sure you're accessing `http://localhost:3000` (with the port number)

### Form Submission Not Working
1. Check if server is running
2. Open browser console (F12) to see errors
3. Check API URL in `script.js` matches your server

### Module Not Found
Run `npm install` again to install dependencies

## 🚀 Deployment

### Deploy to Heroku
1. Create `Procfile`:
```
web: node server/server.js
```

2. Deploy:
```bash
heroku create your-gym-name
git push heroku main
```

### Deploy to Vercel
1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

## 📚 Next Steps

### Add Database
Replace in-memory storage with:
- MongoDB (recommended)
- PostgreSQL
- MySQL
- SQLite

### Add Authentication
- JWT tokens
- User login/signup
- Admin dashboard

### Add Payment
- Stripe integration
- PayPal
- Credit card processing

### Add Email
- Nodemailer for confirmation emails
- Welcome emails
- Booking reminders

## 👥 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the code comments
3. Check browser console for errors
4. Check server terminal for errors

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

---

Made with 💪 by Fitness Club# Gym Website Project

A complete, modern gym website with frontend (HTML/CSS/JavaScript) and backend (Node.js/Express).

## 💻 Features

### Frontend
- ✅ Responsive design for all devices
- ✅ Hero section with call-to-action
- ✅ Services showcase
- ✅ Trainer profiles
- ✅ Membership plans with pricing
- ✅ BMI Calculator
- ✅ Contact/Booking form
- ✅ Smooth scroll navigation
- ✅ Mobile-friendly menu

### Backend
- ✅ REST API with Express.js
- ✅ Membership registration endpoint
- ✅ Booking system endpoint
- ✅ Form validation
- ✅ CORS enabled
- ✅ Error handling

## 💾 Folder Structure

```
Gym-Website/
├── public/
│   ├── index.html      # Main HTML file
│   ├── style.css       # Styles
│   └── script.js       # Frontend JavaScript
├── server/
│   └── server.js       # Express backend
├── package.json        # Dependencies
└── README.md           # This file
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)
- Visual Studio Code (recommended)

### Step 1: Install Node.js
Download and install from: https://nodejs.org/

### Step 2: Open Project in VS Code
1. Open Visual Studio Code
2. Click `File` > `Open Folder`
3. Select the `Gym-Website` folder

### Step 3: Install Dependencies
Open the integrated terminal in VS Code:
- **Windows/Linux**: `Ctrl + `` ` `` (backtick)
- **Mac**: `Cmd + `` ` ``

Then run:
```bash
npm install
```

This will install:
- `express` - Web framework
- `cors` - Cross-origin resource sharing
- `nodemon` - Auto-restart server (dev only)

### Step 4: Start the Server

**Option A: Production Mode**
```bash
npm start
```

**Option B: Development Mode** (auto-restart on changes)
```bash
npm run dev
```

You should see:
```
==============================================
🏋️  Fitness Club Server Started
==============================================
🚀 Server running on: http://localhost:3000
📱 Frontend: http://localhost:3000
🔌 API: http://localhost:3000/api
💪 Status: Ready to accept requests
==============================================
```

### Step 5: Open in Browser
Open your browser and go to:
```
http://localhost:3000
```

## 🛠️ Usage

### Frontend Features

1. **Navigation**: Click menu items to scroll to sections
2. **Membership Plans**: Click "SELECT PLAN" to open registration form
3. **BMI Calculator**: Enter height and weight to calculate BMI
4. **Booking Form**: Fill out the form to book a trial session

### Backend API Endpoints

#### 1. Membership Registration
```http
POST http://localhost:3000/api/membership
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "startDate": "2024-03-15",
  "plan": "Premium",
  "price": 59
}
```

#### 2. Booking
```http
POST http://localhost:3000/api/booking
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "0987654321",
  "service": "personal",
  "date": "2024-03-20",
  "message": "I want to focus on weight loss"
}
```

#### 3. View All Memberships (Admin)
```http
GET http://localhost:3000/api/memberships
```

#### 4. View All Bookings (Admin)
```http
GET http://localhost:3000/api/bookings
```

#### 5. Health Check
```http
GET http://localhost:3000/api/health
```

## 🎨 Customization

### Change Colors
Edit `public/style.css` - look for CSS variables:
```css
:root {
    --primary-color: #0ea5e9;  /* Change this */
    --primary-dark: #0284c7;
    --dark-bg: #0f172a;
}
```

### Change Content
Edit `public/index.html` to update:
- Gym name
- Services offered
- Trainer information
- Membership prices
- Contact details

### Change Port
Edit `server/server.js`:
```javascript
const PORT = process.env.PORT || 3000; // Change 3000 to your port
```

## 📝 Testing

### Test Frontend
1. Navigate through all sections
2. Test mobile menu (resize browser)
3. Fill out forms
4. Calculate BMI

### Test Backend
Use Postman, Thunder Client, or curl:

```bash
# Test membership registration
curl -X POST http://localhost:3000/api/membership \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","phone":"1234567890","startDate":"2024-03-15","plan":"Basic","price":29}'

# Test booking
curl -X POST http://localhost:3000/api/booking \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","phone":"1234567890","service":"yoga","date":"2024-03-20","message":"Test booking"}'

# Check server health
curl http://localhost:3000/api/health
```

## 🛡️ Troubleshooting

### Port Already in Use
If you get "Port 3000 is already in use":

**Option 1**: Kill the process
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

**Option 2**: Change the port in `server/server.js`

### Cannot GET /
Make sure you're accessing `http://localhost:3000` (with the port number)

### Form Submission Not Working
1. Check if server is running
2. Open browser console (F12) to see errors
3. Check API URL in `script.js` matches your server

### Module Not Found
Run `npm install` again to install dependencies

## 🚀 Deployment

### Deploy to Heroku
1. Create `Procfile`:
```
web: node server/server.js
```

2. Deploy:
```bash
heroku create your-gym-name
git push heroku main
```

### Deploy to Vercel
1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

## 📚 Next Steps

### Add Database
Replace in-memory storage with:
- MongoDB (recommended)
- PostgreSQL
- MySQL
- SQLite

### Add Authentication
- JWT tokens
- User login/signup
- Admin dashboard

### Add Payment
- Stripe integration
- PayPal
- Credit card processing

### Add Email
- Nodemailer for confirmation emails
- Welcome emails
- Booking reminders

## 👥 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the code comments
3. Check browser console for errors
4. Check server terminal for errors

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

---

Made with 💪 by Fitness Club