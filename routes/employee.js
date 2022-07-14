import express from 'express';
import Employee from '../modules/EmployeeSchema.js';

const router = express.Router()

//add employee
router.post('/addemployee', async (req, res) => {
    try {
        const empname = req.body.empname;
        const empemail = req.body.empemail;
        const profilepic = req.body.profilepic;
        const empphone = req.body.empphone;
        const empwork = req.body.empwork;

        if (!empname || !empemail || !empphone || !empwork) {
            return res.status(400).send("Please enter all fields");
        }

        const empexist = await Employee.findOne({ empemail: empemail });

        if (empexist) {
            return res.status(400).send("Employee already exists");
        }

        const addEmployee = new Employee({
            empname: empname,
            empemail: empemail,
            profilepic: profilepic,
            empphone: empphone,
            empwork: empwork
        });

        await addEmployee.save();

        res.status(201).send("employee added successfully");

    } catch (err) {
        console.log(err);
    }
})

//get all employees
router.get('/getemployee', async (req, res) => {

    try {
        if (req.query.new) {
            const reqquery = await Employee.find().sort({ _id: -1 }).limit(5)
            res.status(200).send(reqquery)
        }
        const employees = await Employee.find();
        res.status(200).send(employees);
    }
    catch (err) {
        console.log(err);
    }
}
)

//get employee by id
router.get('/getoneemployee/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const employee = await Employee.findById(id);
        res.status(200).send(employee);
    }
    catch (err) {
        console.log(err);
    }
}
)

//update employee
router.put('/updateemployee/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const employee = await Employee.findByIdAndUpdate(id);
        employee.empname = req.body.empname;
        employee.empemail = req.body.empemail;
        employee.profilepic = req.body.profilepic;
        employee.empphone = req.body.empphone;
        employee.empwork = req.body.empwork;

        await employee.save();
        res.status(200).send("employee updated successfully");
    }
    catch (err) {
        console.log(err);
    }
}
)

//delete employee
router.delete('/deleteemployee/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const employee = await Employee.findByIdAndRemove(id);
        await employee.remove();
        res.status(200).send("employee deleted successfully");
    }
    catch (err) {
        console.log(err);
    }
}
)


//get employee by status
router.get("/employeestats", async (req, res) => {

    try {
        const data = await Employee.aggregate([
            {
                $project: {
                    month: { $month: "$createdAt" },
                }
            }, {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ]);
        res.status(200).send(data);

    } catch (err) {
        res.status(400).send(err);
    }
});

export const employeeRouter = router;