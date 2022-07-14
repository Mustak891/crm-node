import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
    empname: {
        type: String,
        required: true
    },
    empemail: {
        type: String,
        required: true
    },
    profilepic: {
        type: String,
        default: "",
        required: true
    },
    empphone: {
        type: String,
        required: true
    },
    empwork: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Employee = mongoose.model('Employee', EmployeeSchema);

export default Employee;

