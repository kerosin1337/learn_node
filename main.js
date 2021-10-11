const express = require('express'),
    app = express(),
    userRouter = require('./routes/user.route.js'),
    authRouter = require('./routes/auth.route.js'),
    port = 7000;

app.use(express.json());
app.use('/', userRouter);
app.use('/auth', authRouter);


app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
