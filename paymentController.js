const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/Payment');
const Booking = require('../models/Booking');

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'your_key_id',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'your_key_secret'
});

// @desc    Create Razorpay order
// @route   POST /api/payments/create-order
// @access  Private
exports.createOrder = async (req, res) => {
    try {
        const { amount, bookingId } = req.body;

        if (!amount) {
            return res.status(400).json({
                success: false,
                message: 'Amount is required'
            });
        }

        // Create Razorpay order
        const options = {
            amount: amount * 100, // amount in paise
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            payment_capture: 1
        };

        const order = await razorpay.orders.create(options);

        // Save payment record
        const payment = await Payment.create({
            user: req.user.id,
            booking: bookingId || null,
            amount: amount,
            razorpayOrderId: order.id,
            status: 'created'
        });

        res.json({
            success: true,
            message: 'Order created successfully',
            data: {
                orderId: order.id,
                amount: order.amount,
                currency: order.currency,
                paymentId: payment._id
            }
        });
    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating order',
            error: error.message
        });
    }
};

// @desc    Verify payment
// @route   POST /api/payments/verify
// @access  Private
exports.verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            paymentId
        } = req.body;

        // Verify signature
        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'your_key_secret')
            .update(sign.toString())
            .digest('hex');

        if (razorpay_signature === expectedSign) {
            // Update payment record
            const payment = await Payment.findById(paymentId);
            
            if (!payment) {
                return res.status(404).json({
                    success: false,
                    message: 'Payment record not found'
                });
            }

            payment.razorpayPaymentId = razorpay_payment_id;
            payment.razorpaySignature = razorpay_signature;
            payment.status = 'success';
            payment.transactionDate = new Date();
            await payment.save();

            // Update booking if exists
            if (payment.booking) {
                await Booking.findByIdAndUpdate(payment.booking, {
                    isPaid: true,
                    paymentId: payment._id,
                    status: 'confirmed'
                });
            }

            res.json({
                success: true,
                message: 'Payment verified successfully',
                data: payment
            });
        } else {
            // Update payment as failed
            if (paymentId) {
                await Payment.findByIdAndUpdate(paymentId, {
                    status: 'failed'
                });
            }

            res.status(400).json({
                success: false,
                message: 'Invalid payment signature'
            });
        }
    } catch (error) {
        console.error('Verify payment error:', error);
        res.status(500).json({
            success: false,
            message: 'Error verifying payment',
            error: error.message
        });
    }
};

// @desc    Get payment details
// @route   GET /api/payments/:id
// @access  Private
exports.getPayment = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id)
            .populate('user', 'name email')
            .populate('booking');

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: 'Payment not found'
            });
        }

        // Check if payment belongs to user
        if (payment.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this payment'
            });
        }

        res.json({
            success: true,
            data: payment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching payment'
        });
    }
};

// @desc    Get all payments for user
// @route   GET /api/payments
// @access  Private
exports.getMyPayments = async (req, res) => {
    try {
        const payments = await Payment.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .populate('booking');

        res.json({
            success: true,
            count: payments.length,
            data: payments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching payments'
        });
    }
};