const router = require("express").Router();
const User = require("../models/user.model");

router.post("/createUser", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const user = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        });

        const newUser = await user.save();

        res.json({
            message: "register endpoint",
            user: newUser,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
    
        const user = await User.findOne({ email: email });
    
        //  If the user doesn't exist then throw an error and exit the function
        if (!user) {
            throw new Error("User does not exist");
        }
    
        const isPasswordAMatch = user.password === password;
        
        
        if (isPasswordAMatch === false) {
            throw new Error("Passwords do not match");
        }
        
        res.json({ 
            message: "signin endpoint", 
            user: user,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;