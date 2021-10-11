const express = require('express'),
    app = express(),
    port = 7000,
    authController = require('./routes/auth.route.js'),
    userController = require('./routes/user.route.js'),
    postController = require('./routes/post.route.js')
;
app.use(express.json());

app.use('/auth', authController);
app.use('/user', userController);
app.use('/post', postController);


app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
