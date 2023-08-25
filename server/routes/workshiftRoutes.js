const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

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


