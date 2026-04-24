const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= ADMIN ================= */
const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "1234";

/* ================= DATABASE (IN-MEMORY) ================= */
let memberships = [];
let bookings = [];

/* ================= HOME ================= */
app.get('/', (req, res) => {
    res.send("Backend is Running");
});

/* ================= ADMIN LOGIN ================= */
app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        return res.json({ success: true });
    }

    res.status(401).json({ success: false });
});

/* ================= MEMBERSHIP CREATE ================= */
app.post('/api/membership', (req, res) => {
    const { name, email, phone, startDate, plan, price } = req.body;

    if (!name || !email || !phone || !startDate || !plan || !price) {
        return res.status(400).json({ success: false, message: "All fields required" });
    }

    const membership = {
        _id: Date.now().toString(), // ✅ FIXED
        name,
        email,
        phone,
        startDate,
        plan,
        price,
        status: "Pending",
        createdAt: new Date().toISOString()
    };

    memberships.push(membership);

    res.json({ success: true, data: membership });
});

/* ================= GET MEMBERS ================= */
app.get('/api/memberships', (req, res) => {
    res.json({
    success: true,
    message: `Thank you ${name}! Membership created successfully ✅`,
    data: booking
});
});

/* ================= UPDATE STATUS ================= */
app.put('/api/memberships/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const member = memberships.find(m => m._id === id); // ✅ FIXED

    if (!member) {
        return res.status(404).json({ success: false, message: "Not found" });
    }

    member.status = status;

    res.json({ success: true, data: member });
});

/* ================= DELETE MEMBER ================= */
app.delete('/api/memberships/:id', (req, res) => {
    const { id } = req.params;

    const index = memberships.findIndex(m => m._id === id); // ✅ FIXED

    if (index === -1) {
        return res.status(404).json({ success: false, message: "Not found" });
    }

    memberships.splice(index, 1);

    res.json({ success: true });
});

/* ================= CREATE BOOKING ================= */
app.post('/api/booking', (req, res) => {
    const { name, email, phone, service, date } = req.body;

    if (!name || !email || !phone || !service || !date) {
        return res.status(400).json({ success: false });
    }

    const booking = {
        _id: Date.now().toString(), // ✅ FIXED
        name,
        email,
        phone,
        service,
        date,
        createdAt: new Date().toISOString()
    };

    bookings.push(booking);

    res.json({ success: true, data: booking });
});

/* ================= GET BOOKINGS ================= */
app.get('/api/bookings', (req, res) => {
    res.json({
    success: true,
    message:`Thank you ${name}! Booking created successfully ✅`,
    data: booking
});
});

/* ================= DELETE BOOKING ================= */
app.delete('/api/bookings/:id', (req, res) => {
    const { id } = req.params;

    const index = bookings.findIndex(b => b._id === id); // ✅ FIXED

    if (index === -1) {
        return res.status(404).json({ success: false });
    }

    bookings.splice(index, 1);

    res.json({ success: true });
});

/* ================= START ================= */
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
