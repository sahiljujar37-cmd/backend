const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= ADMIN LOGIN ================= */
const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "1234";

/* ================= DATABASE (IN MEMORY) ================= */
const memberships = [];
const bookings = [];

/* ================= HOME ================= */
app.get("/", (req, res) => {
    res.send("Backend is Running");
});

/* ================= ADMIN LOGIN ================= */
app.post("/api/admin/login", (req, res) => {
    const { email, password } = req.body;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        return res.json({ success: true, message: "Login successful" });
    }

    res.status(401).json({ success: false, message: "Invalid credentials" });
});

/* ================= MEMBERSHIP REGISTER ================= */
app.post("/api/membership", (req, res) => {
    const { name, email, phone, startDate, plan, price } = req.body;

    if (!name || !email || !phone || !startDate || !plan || !price) {
        return res.status(400).json({ success: false, message: "All fields required" });
    }

    const existing = memberships.find(m => m.email === email);
    if (existing) {
        return res.status(400).json({ success: false, message: "Already exists" });
    }

    const member = {
        id: Date.now().toString(),
        name,
        email,
        phone,
        startDate,
        plan,
        price,
        status: "Pending",
        createdAt: new Date()
    };

    memberships.push(member);

    res.json({ success: true, data: member });
});

/* ================= GET MEMBERSHIPS ================= */
app.get("/api/memberships", (req, res) => {
    res.json({ success: true, data: memberships });
});

/* ================= UPDATE MEMBER (PAY STATUS) ================= */
app.put("/api/memberships/:id", (req, res) => {
    const id = req.params.id;
    const { status } = req.body;

    const member = memberships.find(m => m.id === id);

    if (!member) {
        return res.status(404).json({ success: false, message: "Member not found" });
    }

    member.status = status;

    res.json({ success: true, data: member });
});

/* ================= DELETE MEMBER ================= */
app.delete("/api/memberships/:id", (req, res) => {
    const id = req.params.id;

    const index = memberships.findIndex(m => m.id === id);

    if (index === -1) {
        return res.status(404).json({ success: false, message: "Not found" });
    }

    memberships.splice(index, 1);

    res.json({ success: true, message: "Member deleted" });
});

/* ================= BOOKING CREATE ================= */
app.post("/api/booking", (req, res) => {
    const { name, email, phone, service, date, message } = req.body;

    const booking = {
        id: Date.now().toString(),
        name,
        email,
        phone,
        service,
        date,
        message: message || "",
        status: "pending",
        createdAt: new Date()
    };

    bookings.push(booking);

    res.json({ success: true, data: booking });
});

/* ================= GET BOOKINGS ================= */
app.get("/api/bookings", (req, res) => {
    res.json({ success: true, data: bookings });
});

/* ================= DELETE BOOKING ================= */
app.delete("/api/bookings/:id", (req, res) => {
    const id = req.params.id;

    const index = bookings.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({ success: false, message: "Not found" });
    }

    bookings.splice(index, 1);

    res.json({ success: true, message: "Booking deleted" });
});

/* ================= HEALTH ================= */
app.get("/api/health", (req, res) => {
    res.json({ success: true, message: "Server running" });
});

/* ================= START SERVER ================= */
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



