




const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory


// In-memory storage (replace with database in production)
const memberships = [];
const bookings = [];

// Routes

// Home route
app.get('/', (req, res) => {
    res.send("Backend is Running");
});

// Membership registration endpoint
app.post('/api/membership', (req, res) => {
    try {
        const { name, email, phone, startDate, plan, price } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !startDate || !plan || !price) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        // Check if email already exists
        const existingMember = memberships.find(m => m.email === email);
        if (existingMember) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }

        // Create membership object
        const membership = {
            id: Date.now().toString(),
            name,
            email,
            phone,
            startDate,
            plan,
            price,
            status: 'active',
            createdAt: new Date().toISOString()
        };

        // Save to memory (use database in production)
        memberships.push(membership);

        console.log('New membership registered:', membership);

        res.status(201).json({
            success: true,
            message: `Thank you ${name}! Your ${plan} membership has been registered successfully. We'll contact you soon.`,
            data: {
                id: membership.id,
                plan: membership.plan,
                startDate: membership.startDate
            }
        });
    } catch (error) {
        console.error('Membership registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
});

// Booking endpoint
app.post('/api/booking', (req, res) => {
    try {
        const { name, email, phone, service, date, message } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !service || !date) {
            return res.status(400).json({
                success: false,
                message: 'All required fields must be filled'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        // Create booking object
        const booking = {
            id: Date.now().toString(),
            name,
            email,
            phone,
            service,
            date,
            message: message || '',
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        // Save to memory (use database in production)
        bookings.push(booking);

        console.log('New booking received:', booking);

        res.status(201).json({
            success: true,
            message: `Thank you ${name}! Your booking for ${service} on ${date} has been received. We'll confirm shortly.`,
            data: {
                id: booking.id,
                service: booking.service,
                date: booking.date
            }
        });
    } catch (error) {
        console.error('Booking error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
});

// Get all memberships (admin endpoint)
app.get('/api/memberships', (req, res) => {
    res.json({
        success: true,
        count: memberships.length,
        data: memberships
    });
});

// Get all bookings (admin endpoint)
app.get('/api/bookings', (req, res) => {
    res.json({
        success: true,
        count: bookings.length,
        data: bookings
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`\n==============================================`);
    console.log(`🏋️  Fitness Club Server Started`);
    console.log(`==============================================`);
    console.log(`🚀 Server running on: http://localhost:${PORT}`);
    console.log(`📱 Frontend: http://localhost:${PORT}`);
    console.log(`🔌 API: http://localhost:${PORT}/api`);
    console.log(`💪 Status: Ready to accept requests`);
    console.log(`==============================================\n`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('\n👋 SIGTERM received. Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('\n👋 SIGINT received. Shutting down gracefully...');
    process.exit(0);
});

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "1234";













