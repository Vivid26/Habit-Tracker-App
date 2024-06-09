import dotenv from "dotenv"
dotenv.config();

import express from "express";
import expressLayouts from 'express-ejs-layouts';
import session from "express-session";
import cookieParser from "cookie-parser";

// used for session cookies
import passport from "passport";
import "./middlewares/passport_local.js"
import { setAuthenticatedUser } from "./middlewares/passport_local.js";

import flash from "connect-flash"
import { setFlash } from "./middlewares/flashMiddleware.js";

import path from "path";
import MongoStore from "connect-mongo";


import habitRouter from "./src/routes/habit.routes.js"
import homeRouter from "./src/routes/home.routes.js";
import userRouter from "./src/routes/user.routes.js";

import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

// set up the view engine
app.set('view engine', 'ejs');
app.set("views", path.join(path.resolve(),"src", "views"));
app.use(express.static(path.join(path.resolve(),"assets")));

// layouts for ejs
app.use(expressLayouts);
app.use(express.urlencoded({extended:false}));

//mongo store is used to store the session cookie
app.use(session({
    name: 'Habit-Tracker',
    secret: process.env.SECRET_KEY,
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: false,
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {mongoUrl: process.env.MONGO_URI},
        function(err){
            console.log("Error in the mongo-store");
        }
    ),
}));

// Using passport
app.use(passport.initialize());
app.use(passport.session());
app.use(setAuthenticatedUser);

// flash middleware
app.use(flash());
app.use(setFlash);

// use express router

app.use('/api/home',homeRouter);
app.use('/api/user',userRouter);
app.use('/api/habits',habitRouter);

app.use(errorHandlerMiddleware);

export default app;