import express from 'express';
import Messages from "../modules/messageSchema.js";


const router = express.Router();


router.post('/message', async (req, res) => {
    try{
        const cname = req.body.cname;
        const cemail = req.body.cemail;
        const cmessage = req.body.cmessage; 

        const sendMsg = new Messages({
            cname: cname,
            cemail: cemail,
            cmessage: cmessage
        });

        await sendMsg.save();

        res.status(201).send("message sent successfully");  

    }catch(err){
        console.log(err);
    }
});

export const messageRouter = router;