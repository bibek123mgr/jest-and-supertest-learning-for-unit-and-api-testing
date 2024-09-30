const express = require('express')
const app = express()

app.use(express.json())

app.post('/users', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.sendStatus(400);
        return;
    }
    res.status(200).json({ userId: 0 });
    return
});

const authConroller = require('./route/auth/authRoute')
const adminProductRoute = require('./route/admin/productRoute')

app.use('/api/v1/auth', authConroller)
app.use('/api/v1/admin', adminProductRoute)

module.exports = app