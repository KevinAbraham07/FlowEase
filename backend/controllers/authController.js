import {oauth2Client, SCOPES} from "../config/googleConfig.js";
import {google} from "googleapis";
import User from "../models/user.js";

const login = (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
    });
    res.redirect(url);
};


const callback = async(req, res)=>{
    const code = req.query.code;
    try{
        const {tokens} = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        
        const oauth2 = google.oauth2({
            auth: oauth2Client,
            version: "v2"
        });

        const {data} = await oauth2.userinfo.get();
        const updateData ={
            googleId: data.id,
            name: data.name,
            email: data.email, 
            profilePic: data.picture, 
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token
         };
            if (tokens.refresh_token){
                updateData.refreshToken = tokens.refresh_token;
            }
            let user = await User.findOneAndUpdate(
                {email : data.email},
                {
                    upsert : true, 
                    new: true
                }
            );
        req.session.user = user;
       
        // res.status(202).json({
        //     message : "Login successful", 
        //     user 
        // });

        res.redirect("http://localhost:5173/tasks");
    }
    catch(error) {
        console.error("Google auth error:", error);
        res.status(500).json({
            message : "Authentication failed"
        });
    }
};


const me = (req, res) => {
    if (!req.session.user){
        return res.status(401).json({
            success : false,
            message : "Not logged in"
        });
    }
    
    res.status(200).json({
        success : true,
        user : req.session.user
    });
};


const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ 
        success: false, 
        message: "Logout failed"
    });
    res.clearCookie("connect.sid");
    res.redirect("http://localhost:5173");
    // res.json({ 
    //     success: true, 
    //     message: "Logged out" 
    // });
  });
};

export default { login, callback, me, logout };
