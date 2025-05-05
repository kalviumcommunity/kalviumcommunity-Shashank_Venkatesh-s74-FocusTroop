const express = require('express');
const TimerModel = require('../Model/TimerModel'); 
const router = express.Router();

router.post('/time', async (req, res) => {
    try {
        const { user, focus, shortbreak, longbreak } = req.body;

        if (!user) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const timer = await TimerModel.create({
            user,
            focus,
            shortbreak,
            longbreak
        });

        return res.status(201).json({ message: "Timer created successfully", timer });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get('/timedata/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        const timerData = await TimerModel.findOne({ user: userId });

        if (!timerData) {
            return res.status(404).json({ message: "No timer data found for this user" });
        }

        return res.status(200).json(timerData);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.put('/edittime/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const { focus, shortbreak, longbreak } = req.body;

        const updatedTimer = await TimerModel.findOneAndUpdate(
            { user: userId },
            { focus, shortbreak, longbreak },
            { new: true } // returns the updated document
        );

        if (!updatedTimer) {
            return res.status(404).json({ message: "No timer found for this user" });
        }

        return res.status(200).json({ message: "Timer updated successfully", data: updatedTimer });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
