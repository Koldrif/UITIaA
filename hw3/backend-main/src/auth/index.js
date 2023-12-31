const express = require("express");
const crypto = require("crypto");
const cookie = require("cookie");
const { passwordSecret, fakeUser } = require("./data");
const { getTokens, refreshTokenAge, verifyAuthorizationMiddleware, verifyRefreshTokenMiddleware } = require("./utils");
// const { cookie } = require("express/lib/response");

const authRouter = express.Router();



authRouter.post("/login", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    const {login, password} = req.body;

    const hash = crypto.createHmac("sha256", passwordSecret).update(password).digest("hex");
    const isVerifiedPassword = hash === fakeUser.passwordHash;

    if(login !== fakeUser.login || !isVerifiedPassword){
        return res.status(401).send("Login fail");
    }

    const {accessToken, refreshToken} = getTokens(login);

    res.setHeader(
        "set-Cookie",
        cookie.serialize("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: refreshTokenAge,
        })
    );
    res.send({accessToken});
});

authRouter.get("/refresh", verifyRefreshTokenMiddleware, (req, res) => {
    const {accessToken, refreshToken} = getTokens(req.user.login);
    res.header("Access-Control-Allow-Origin", "*")
    res.setHeader(
        "Set-Cookie",
        cookie.serialize("refreshToken", refreshToken, {
            httpOnly:true,
            maxAge: 1000*60*60,
        })
    );
    res.send({accessToken});
});

authRouter.get("/profile", verifyAuthorizationMiddleware, (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.send("admin");
});

authRouter.get("/logout", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.setHeader(
        "Set-Cookie",
        cookie.serialize("refreshToken", "", {
            httpOnly: true,
            maxAge: 0,
        })
    );
    res.sendStatus(200);
})

module.exports = authRouter;