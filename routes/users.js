import User from "../modules/UserSchema.js";
import express from 'express';
import bcrypt from 'bcrypt';
import auth from "../modules/authentication.js"; 

const router = express.Router();

router.post('/register', async (req, res) => {
    try{
        const username = req.body.username;
        const email = req.body.email;
        const industry = req.body.industry;
        const password = req.body.password;

        if (!username || !email || !industry || !password) {
            return res.status(400).send("Please enter all fields");
        }

        const isuserexists = await User.findOne({ username: username });
        const isemailexists = await User.findOne({ email: email });

        if(isuserexists || isemailexists){
            return res.status(400).send("User already exists please login");
        }

        const createdUser = new User({
            username: username,
            email: email,
            industry: industry,
            password: password,
        });

        await createdUser.save();

        res.status(201).send("User created successfully");

    }catch(err){
        console.log(err);
    }
});

//login user 
router.post('/login', async (req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;

        //find if user exists
        const user = await User.findOne({email: email});

        if(!user){
            return res.status(400).send("User does not exist");
        }

        if(user){
            const isMatch = await bcrypt.compare(password, user.password);

            if(isMatch){
                //generate auth token if user is found
                const token = await user.generateAuthToken();
                res.cookie("token", token, {
                    expires: new Date(Date.now() + 8600000),
                    httpOnly: false,
                    maxAge: 8600000,
                    sameSite: "none",
                    secure: true,
                    domain: "https://mondaycrm.netlify.app",
                });
                res.status(200).send("User logged in successfully" );
            }else{
                res.status(400).send("Invalid credentials");
            }
        }else{
            res.status(400).send("Invalid credentials");
        }
    }catch(err){
        res.status(400).send(err);
    }
})

//user logout
router.get('/logout', async (req, res) => {
    res.clearCookie('token', {path: '/'});
    res.status(200).send("User logged out successfully");
})


//Authenticate user
router.get('/auth', auth, async (req, res) => {

})


export const usersRouter = router;
