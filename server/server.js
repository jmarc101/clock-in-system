const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

app.get('/employees', async (_, res) => {
    console.log('🚨🔥 get employees was called!');
   const users = await prisma.employee.findMany();
   res.json(users);
});


app.get('/workshifts', async (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ error: "startDate and endDate are required." });
    }

    try {
        const workShifts = await prisma.workShift.findMany({
            where: {
                start: {
                    gte: new Date(startDate),
                    lte: new Date(endDate)
                }
            }
        });

        res.json(workShifts);
    } catch (error) {
        res.status(500).json({ error: "An error occurred fetching the work shifts." });
    }
});

app.get('/admins', async (_, res) => {

    try {
        const admins = await prisma.admin.findMany();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ error: "An error occurred fetching the admins." });
    }

});

// get employee last work shift
app.get('/employees/:employeeid/workshift', async (req, res) => {
    const { employeeid } = req.params;

    if (!employeeid) {
        return res.status(400).json({ error: "employeeid is required." });
    }

    try {
        const workshift = await prisma.workshift.findfirst({
            where: {
                employeeid: parseint(employeeid),
            },
            orderby: {
                start: 'desc',
            },
        });

        res.json(workshift);
    } catch (error) {
        res.status(500).json({ error: "an error occurred fetching the work shift." });
    }
});

app.get('/employees/:employeeId/workshifts', async (req, res) => {
    const { startDate, endDate } = req.query;
    const { employeeId } = req.params;

    if (startDate || !endDate || !employeeId) {
        return res.status(400).json({ error: "startDate, endDate, and employeeId are required." });
    }

    try {
        const workShifts = await prisma.workShift.findMany({
            where: {
                employeeId: parseInt(employeeId),
                start: {
                    gte: new Date(startDate),
                    lte: new Date(endDate)
                }
            }
        });

        res.json(workShifts);
    } catch (error) {
        res .status(500)
            .json({ error: "An error occurred fetching the work shifts." });
    }
});

app.post('/employee', async (req, res) => {
    const { name, code } = req.body;
    const user = await prisma.employee.create({ data: { name, code } });
    res.json(user);
});

app.post('/employee/:employeeId/workshift', async (req, res) => {
    const { employeeId } = req.params;

    if (!employeeId) {
        return res.status(400).json({ error: "employeeId and date are required." });
    }

    try {
        // Puts an end date on the last work shift if it doesn't have one
        const workshiftWithoutEndDate = await prisma.workShift
            .findFirst({where: {employeeId: parseInt(employeeId), end: null}});

        if (workshiftWithoutEndDate) {
            const endedShift = await prisma.workShift
                .update({where: {id: workshiftWithoutEndDate.id}, data: {end: new Date()}});

            return res.status(200).json(endedShift);
        }

        // Creates a new work shift if the last one has an end date
        const workshift = await prisma.workShift
            .create({data: {employeeId: parseInt(employeeId), start: new Date()}});

        res.status(200).json(workshift);
    } catch (error) {
        res.status(500).json({ error: "An error occurred creating the work shift." });
    }
});

app.post('/workshift', async (req, res) => {
    const { employeeId, startDate, endDate } = req.body;

    try {
        const workshift = await prisma.workShift
            .create({data: {
                employeeId: parseInt(employeeId),
                startDate: new Date(startDate),
                endDate: new Date(endDate)}
            });

        res.status(200).json(workshift);
    } catch (error) {
        res.status(500).json({ error: "An error occurred creating the work shift." });
    }
});

app.put('/employee/:employeeId', async (req, res) => {
    const { employeeId, code, name } = req.params;
   try {
        const employee = await prisma.employee
           .update({where: {id: parseInt(employeeId)}, data: {code, name}});

       res.status(200).json(employee);
   } catch (error) {
       res.status(500).json({error: "An error occurred updating the employee."});
   }
});
app.put('/workshift/:workshiftId', async (req, res) => {
    const { workshiftId } = req.params;
    const { startDate, endDate } = req.body;

    if (!employeeId || !workshiftId || !startDate || !endDate) {
        return res
            .status(400)
            .json({ error: "employeeId, workshiftId, startDate, and endDate are required." });
    };

    try {
        const workshift = await prisma.workShift
            .update({ where: {
                id: parseInt(workshiftId)},
                data: {
                    employeeId: parseInt(employeeId),
                    startDate: new Date(startDate),
                    endDate: new Date(endDate),
                }});

        res.status(200).json(workshift);
    } catch (error) {

        res.status(500).json({error: "An error occurred updating the work shift."});
    }
});

app.delete('/workshift/:workshiftId', async (req, res) => {
    const { workshiftId } = req.params;
    try {
        const workshift = await prisma.workShift.delete({where: {id: parseInt(workshiftId)}});
        res.status(200).json(workshift);
    } catch (error) {
        res.status(500).json({error: "An error occurred deleting the work shift."});
    }
});


const PORT = 4000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http:0.0.0.0:${PORT}`);//0.0.0.0:);
});
