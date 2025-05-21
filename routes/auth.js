const express = require('express');
const bcrypt = require('bcrypt');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const fs = require('fs');
const path = require('path');
const router = express.Router();


// Middleware to protect routes
const { isAuthenticated, is2FAAuthenticated } = require('../middlewares/authMiddleware');

// Login Page
router.get('/login', (req, res) => {
    res.render('login');
});

// Login POST
/*router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username: username });
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.username = username;
            if (!user.twoFactorEnabled) {
                return res.redirect('/setup-2fa');
            } else {
                req.session.is2FAAuthenticated = false; // Reset 2FA status
                return res.redirect('/2fa');
            }
        } else {
            return res.render('login', { error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.render('login', { error: 'Something went wrong, please try again' });
    }
});

// 2FA Setup Page
router.get('/setup-2fa', isAuthenticated, async (req, res) => {
    try {
        const user = await User.findOne({ username: req.session.username });

        if (user.twoFactorEnabled) {
            return res.redirect('/home');
        }

        const secret = speakeasy.generateSecret({ name: `MyApp (${req.session.username})` });
        req.session.tempSecret = secret.base32;

        qrcode.toDataURL(secret.otpauth_url, (err, dataURL) => {
            res.render('setup-2fa', { qrCodeURL: dataURL });
        });
    } catch (error) {
        console.error('Error during 2FA setup:', error);
        res.render('setup-2fa', { error: 'Something went wrong, please try again' });
    }
});

// 2FA Setup POST
router.post('/setup-2fa', isAuthenticated, async (req, res) => {
    const { token } = req.body;
    
    try {
        const user = await User.findOne({ username: req.session.username });
        const verified = speakeasy.totp.verify({
            secret: req.session.tempSecret,
            encoding: 'base32',
            token
        });

        if (verified) {
            user.twoFactorEnabled = true;
            user.twoFactorSecret = req.session.tempSecret;
            await user.save();
            res.redirect('/home');
        } else {
            res.render('setup-2fa', { error: 'Invalid token, please try again' });
        }
    } catch (error) {
        console.error('Error during 2FA setup:', error);
        res.render('setup-2fa', { error: 'Something went wrong, please try again' });
    }
});

// 2FA Page
router.get('/2fa', isAuthenticated, (req, res) => {
    res.render('2fa');
});

// 2FA POST
router.post('/2fa', isAuthenticated, async (req, res) => {
    const { token } = req.body;

    try {
        const user = await User.findOne({ username: req.session.username });
        const verified = speakeasy.totp.verify({
            secret: user.twoFactorSecret,
            encoding: 'base32',
            token
        });

        if (verified) {
            req.session.is2FAAuthenticated = true;
            res.redirect('/home');
        } else {
            res.render('2fa', { error: 'Invalid token, please try again' });
        }
    } catch (error) {
        console.error('Error during 2FA verification:', error);
        res.render('2fa', { error: 'Something went wrong, please try again' });
    }
});

// Home Page
router.get('/home', isAuthenticated, is2FAAuthenticated, (req, res) => {
    res.render('home', { username: req.session.username });
});
*/
module.exports = router;
