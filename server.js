// ============================================================
//  FITNESS CLUB - server.js
//  Run:  npm install express   then   node server.js
//  Open: http://localhost:3000
// ============================================================
 
const express = require("express");
const fs      = require("fs");
const path    = require("path");
 
const app  = express();
const PORT = 3000;
 
// ── Data file paths (created automatically if missing) ───────
const DATA_DIR       = path.join(__dirname, "data");
const BOOKINGS_FILE  = path.join(DATA_DIR, "bookings.json");
const MEMBERS_FILE   = path.join(DATA_DIR, "memberships.json");
const REVIEWS_FILE   = path.join(DATA_DIR, "reviews.json");
 
// Create /data folder and empty JSON files on first run
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
[BOOKINGS_FILE, MEMBERS_FILE, REVIEWS_FILE].forEach(file => {
    if (!fs.existsSync(file)) fs.writeFileSync(file, "[]");
});
 
// ── Helpers ──────────────────────────────────────────────────
function readJSON(file) {
    try { return JSON.parse(fs.readFileSync(file, "utf8")); }
    catch { return []; }
}
 
function writeJSON(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}
 
// ── Middleware ────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
// Serve ALL your website files (HTML, CSS, JS, images, video)
// Put server.js in the SAME folder as index.html
app.use(express.static(__dirname));
 
// ── API: BOOKINGS ─────────────────────────────────────────────
// POST /api/booking  →  save a new free-trial booking
app.post("/api/booking", (req, res) => {
    const { name, email, phone, service, date, message } = req.body;
 
    if (!name || !email || !phone || !service || !date) {
        return res.status(400).json({ success: false, message: "All required fields must be filled." });
    }
 
    const bookings = readJSON(BOOKINGS_FILE);
    const newBooking = {
        id:      Date.now(),
        name,
        email,
        phone,
        service,
        date,
        message: message || "",
        createdAt: new Date().toISOString()
    };
 
    bookings.push(newBooking);
    writeJSON(BOOKINGS_FILE, bookings);
 
    console.log("✅ New Booking:", newBooking.name, "-", newBooking.service);
    res.json({ success: true, message: "Booking Confirmed Successfully!" });
});
 
// GET /api/bookings  →  admin: list all bookings
app.get("/api/bookings", (req, res) => {
    res.json(readJSON(BOOKINGS_FILE));
});
 
// DELETE /api/booking/:id  →  admin: remove a booking
app.delete("/api/booking/:id", (req, res) => {
    let bookings = readJSON(BOOKINGS_FILE);
    bookings = bookings.filter(b => String(b.id) !== req.params.id);
    writeJSON(BOOKINGS_FILE, bookings);
    res.json({ success: true });
});
 
// ── API: MEMBERSHIPS ──────────────────────────────────────────
// POST /api/membership  →  save a new member registration
app.post("/api/membership", (req, res) => {
    const { name, email, phone, startDate, plan, price } = req.body;
 
    if (!name || !email || !phone || !startDate || !plan) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }
 
    const members = readJSON(MEMBERS_FILE);
    const newMember = {
        id:        Date.now(),
        name,
        email,
        phone,
        startDate,
        plan,
        price:     price || 0,
        status:    "Pending",
        createdAt: new Date().toISOString()
    };
 
    members.push(newMember);
    writeJSON(MEMBERS_FILE, members);
 
    console.log("✅ New Member:", newMember.name, "-", newMember.plan, "Plan");
    res.json({ success: true, message: "Membership Registered Successfully!" });
});
 
// GET /api/memberships  →  admin: list all members
app.get("/api/memberships", (req, res) => {
    res.json(readJSON(MEMBERS_FILE));
});
 
// PATCH /api/membership/:id/status  →  admin: update status
app.patch("/api/membership/:id/status", (req, res) => {
    const members = readJSON(MEMBERS_FILE);
    const idx = members.findIndex(m => String(m.id) === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false });
 
    members[idx].status = req.body.status || "Active";
    writeJSON(MEMBERS_FILE, members);
    res.json({ success: true, member: members[idx] });
});
 
// DELETE /api/membership/:id  →  admin: remove a member
app.delete("/api/membership/:id", (req, res) => {
    let members = readJSON(MEMBERS_FILE);
    members = members.filter(m => String(m.id) !== req.params.id);
    writeJSON(MEMBERS_FILE, members);
    res.json({ success: true });
});
 
// ── API: REVIEWS ──────────────────────────────────────────────
// POST /api/review  →  save a new member review
app.post("/api/review", (req, res) => {
    const { name, rating, msg } = req.body;
 
    if (!name || !msg) {
        return res.status(400).json({ success: false, message: "Name and review text are required." });
    }
 
    const reviews = readJSON(REVIEWS_FILE);
    const newReview = {
        id:        "rev-" + Date.now(),
        name,
        rating:    parseInt(rating) || 5,
        msg,
        createdAt: new Date().toISOString()
    };
 
    reviews.push(newReview);
    writeJSON(REVIEWS_FILE, reviews);
 
    console.log("✅ New Review from:", newReview.name);
    res.json({ success: true, message: "Review Posted Successfully!", review: newReview });
});
 
// GET /api/reviews  →  get all reviews (used on page load)
app.get("/api/reviews", (req, res) => {
    const reviews = readJSON(REVIEWS_FILE);
    res.json(reviews.slice().reverse()); // newest first
});
 
// DELETE /api/review/:id  →  admin: delete a review
app.delete("/api/review/:id", (req, res) => {
    let reviews = readJSON(REVIEWS_FILE);
    reviews = reviews.filter(r => r.id !== req.params.id);
    writeJSON(REVIEWS_FILE, reviews);
    res.json({ success: true });
});
 
// ── Start Server ──────────────────────────────────────────────
app.listen(PORT, () => {
    console.log("╔═══════════════════════════════════════╗");
    console.log("║   💪 FITNESS CLUB SERVER RUNNING      ║");
    console.log(`║   Open: http://localhost:${PORT}          ║`);
    console.log("╚═══════════════════════════════════════╝");
});
