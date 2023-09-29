const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

app.get('/employees', async (_, res) => {
   const users = await prisma.employee.findMany();
   res.json(users);
});

app.get('/employees/:employeeId/workshifts', async (req, res) => {
    const { startDate, endDate } = req.query;
    const { employeeId } = req.params;

    if (!startDate || !endDate || !employeeId) {
        return res.status(400).json({ error: "startDate, endDate, and employeeId are required." });
    }

    try {
        const workshifts = await prisma.workShift.findMany({
            where: {
                employeeId: parseInt(employeeId),
                start: {
                    gte: new Date(startDate),
                    lte: new Date(endDate)
                }
            }
        });

        res.json(workshifts);
    } catch (error) {
        res .status(500)
            .json({ error: "An error occurred fetching the work shifts." });
    }
});

app.post('/employees/:employeeId/punch', async (req, res) => {
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

const PORT = 4000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http:0.0.0.0:${PORT}`);//0.0.0.0:);
});
