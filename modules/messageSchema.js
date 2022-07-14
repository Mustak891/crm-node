import mongoose from "mongoose";

const msgSchema = new mongoose.Schema({
    cname: {
        type: String
    },
    cemail: {
        type: String
    },
    cmessage: {
        type: String
    }
}, { timestamps: true });

const Messages = mongoose.model("Messages", msgSchema);

export default Messages;

