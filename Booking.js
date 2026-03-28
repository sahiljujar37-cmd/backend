const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    serviceType: {
        type: String,
        required: [true, 'Please specify service type'],
        enum: ['personal-training', 'group-class', 'yoga', 'cardio', 'weight-training', 'boxing']
    },
    date: {
        type: Date,
        required: [true, 'Please provide booking date']
    },
    time: {
        type: String,
        required: [true, 'Please provide booking time']
    },
    duration: {
        type: Number,
        required: true,
        default: 60 // in minutes
    },
    trainer: {
        type: String,
        default: 'To be assigned'
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    notes: {
        type: String,
        trim: true
    },
    amount: {
        type: Number,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
bookingSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Booking', bookingSchema);