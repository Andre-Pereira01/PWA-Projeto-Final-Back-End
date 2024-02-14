const User = require('../models/user.model');
const bcrypt = require('bcryptjs'); 
const CONFIG = require('../config/config');
const createInitialUsers = async () => {
    try {
        const adminUser = await User.findOne({ 'username': 'admin' });

        if (!adminUser) {
            const admin = new User({
                firstname: 'Admin',
                lastname: 'User',
                name: 'Admin User',
                email: 'admin@example.com',
                nif: '12345678',
                morada: 'Rua do Admin',
                codigopostal: '1234-567',
                freguesia: "Dsae",
                accepted: true, 
                notifications: true,
                level: 'admin',
                username: 'admin',
                password: 'admin',
            });

            await admin.save();
            console.log('Admin user created successfully.');
        }

    } catch (error) {
        console.error('Error creating initial users:', error);
    }
};

module.exports = (app, callback) => {
    const mongoose = require('mongoose');
    
    mongoose.connect(CONFIG.mongodb.uri).then(() => {
        console.log('---Connected to DB');
        createInitialUsers();
        if (callback) callback();
    }).catch((error) => {
        console.error('Error connecting to DB:', error);
    });
};

