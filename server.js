// ============================================================
//  FITNESS CLUB - server.js  (FIXED: CORS added)
// ============================================================
 
const express = require("express");
const cors    = require("cors");        // ✅ ADDED
const fs      = require("fs");
const path    = require("path");
 
const app  = express();
const PORT = process.env.PORT || 3000;  // ✅ Render uses process.env.PORT
 
// ── Data file paths ───────────────────────────────────────────
const DATA_DIR      = path.join(__dirname, "data");
const BOOKINGS_FILE = path.join(DATA_DIR, "bookings.json");
const MEMBERS_FILE  = path.join(DATA_DIR, "memberships.json");
const REVIEWS_FILE  = path.join(DATA_DIR, "reviews.json");
 
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
[BOOKINGS_FILE, MEMBERS_FILE, REVIEWS_FILE].forEach(file => {
    if (!fs.existsSync(file)) fs.writeFileSync(file, "[]");
});
 
// ── Helpers ───────────────────────────────────────────────────
function readJSON(file) {
    try { return JSON.parse(fs.readFileSync(file, "utf8")); }
    catch { return []; }
}
function writeJSON(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}
 
// ── Middleware ────────────────────────────────────────────────
app.use(cors());                         // ✅ Allow all origins (fixes browser block)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
 
// ── Home check ────────────────────────────────────────────────
app.get("/", (req, res) => {
    res.send("Backend is Running");
});
 
// ── BOOKINGS ──────────────────────────────────────────────────
app.post("/api/booking", (req, res) => {
    const { name, email, phone, service, date, message } = req.body;
    if (!name || !email || !phone || !service || !date)
        return res.status(400).json({ success: false, message: "All required fields must be filled." });
 
    const bookings   = readJSON(BOOKINGS_FILE);
    const newBooking = { id: Date.now(), name, email, phone, service, date, message: message || "", createdAt: new Date().toISOString() };
    bookings.push(newBooking);
    writeJSON(BOOKINGS_FILE, bookings);
 
    console.log("✅ New Booking:", name, "-", service);
    res.json({ success: true, message: "Booking Confirmed Successfully!" });
});
 
app.get("/api/bookings", (req, res) => {
    res.json(readJSON(BOOKINGS_FILE));
});
 
app.delete("/api/booking/:id", (req, res) => {
    let bookings = readJSON(BOOKINGS_FILE).filter(b => String(b.id) !== req.params.id);
    writeJSON(BOOKINGS_FILE, bookings);
    res.json({ success: true });
});
 
// ── MEMBERSHIPS ───────────────────────────────────────────────
app.post("/api/membership", (req, res) => {
    const { name, email, phone, startDate, plan, price } = req.body;
    if (!name || !email || !phone || !startDate || !plan)
        return res.status(400).json({ success: false, message: "All fields are required." });
 
    const members   = readJSON(MEMBERS_FILE);
    const newMember = { id: Date.now(), name, email, phone, startDate, plan, price: price || 0, status: "Pending", createdAt: new Date().toISOString() };
    members.push(newMember);
    writeJSON(MEMBERS_FILE, members);
 
    console.log("✅ New Member:", name, "-", plan);
    res.json({ success: true, message: "Membership Registered Successfully!" });
});
 
app.get("/api/memberships", (req, res) => {
    res.json(readJSON(MEMBERS_FILE));
});
 
app.patch("/api/membership/:id/status", (req, res) => {
    const members = readJSON(MEMBERS_FILE);
    const idx     = members.findIndex(m => String(m.id) === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false });
    members[idx].status = req.body.status || "Active";
    writeJSON(MEMBERS_FILE, members);
    res.json({ success: true, member: members[idx] });
});
 
app.delete("/api/membership/:id", (req, res) => {
    let members = readJSON(MEMBERS_FILE).filter(m => String(m.id) !== req.params.id);
    writeJSON(MEMBERS_FILE, members);
    res.json({ success: true });
});
 
// ── REVIEWS ───────────────────────────────────────────────────
app.post("/api/review", (req, res) => {
    const { name, rating, msg } = req.body;
    if (!name || !msg)
        return res.status(400).json({ success: false, message: "Name and review are required." });
 
    const reviews   = readJSON(REVIEWS_FILE);
    const newReview = { id: "rev-" + Date.now(), name, rating: parseInt(rating) || 5, msg, createdAt: new Date().toISOString() };
    reviews.push(newReview);
    writeJSON(REVIEWS_FILE, reviews);
 
    console.log("✅ New Review from:", name);
    res.json({ success: true, message: "Review Posted Successfully!", review: newReview });
});
 
app.get("/api/reviews", (req, res) => {
    res.json(readJSON(REVIEWS_FILE).slice().reverse());
});
 
app.delete("/api/review/:id", (req, res) => {
    let reviews = readJSON(REVIEWS_FILE).filter(r => r.id !== req.params.id);
    writeJSON(REVIEWS_FILE, reviews);
    res.json({ success: true });
});
 
// ── Start ─────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log("╔════════════════════════════════════════╗");
    console.log("║   💪 FITNESS CLUB SERVER RUNNING       ║");
    console.log(`║   Port: ${PORT}                             ║`);
    console.log("╚════════════════════════════════════════╝");
});
