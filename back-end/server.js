
// express: web 框架 / adonis也是
const express = require("express")
const app = express()

// 处理 post
const bodyParser = require("body-parser")
// 使用中间件
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//allow custom header and CORS
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.sendStatus(200); /让options请求快速返回/
    }
    else {
        next();
    }
});

// mongo
const mongoose = require("mongoose")
const db = require("./config/keys").mongoURI
mongoose.connect(db)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err))

// 路由
// const videos = require("./routes/videos")
// const images = require("./routes/images")
// const items = require("./routes/items")
const forms = require("./routes/forms")
// 相当于在这里是总路由 user.js 里是分路由
// app.use("/api/videos", videos)
// app.use("/api/images", images)
// app.use("/api/items", items)
app.use("/api/forms", forms)


// port
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

// 测试路由    
// app.get("/", (req, res) => {
//     res.send("Hello World!")
// })