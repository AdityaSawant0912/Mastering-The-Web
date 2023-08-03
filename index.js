const express = require("express");
var cookieParser = require("cookie-parser");
var session = require("express-session");
const path = require("path");

const indexRoutes = require("./routes/indexRoutes");
const productRoutes = require("./routes/productRoutes");
const sessionRoutes = require("./routes/sessionRoutes");



// Decalring App
const app = express();
const port = process.env.PORT || 3000;

// Set view engine to ejs
app.set("view engine", "ejs");

// Make app use /public folder as static folder. Where all the static files will be stored, like css, js, images etc.
app.use(express.static(path.join(__dirname, "public")));

// For parsing url body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Sessions
app.use(cookieParser());
app.use(
    session({
        // https://randomkeygen.com/
        secret: "OdY,aaxi&NFiuO(f74]|At?g{<Ux5L", 
        resave: false,
        saveUninitialized: false,
    })
);



// app.get("/", (req, res) => {
//     res.sendFile('templates/home.html', { root: __dirname });
// })

app.use("/", indexRoutes);
app.use("/", sessionRoutes);
app.use("/product", productRoutes);

// Start Server
app.listen(port, () => console.log(`Listening on port ${port} \n goto http://localhost:${port}/`));