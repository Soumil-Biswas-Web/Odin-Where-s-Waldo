import { Router } from "express";
import upload from "../middleware/multerUploader.js";
import prisma from "../middleware/prismaInit.js";

const route = Router();

// Fetch all scores that have been saved
route.get('/fetchScores', async (req, res) => {
  try {

    const scores = await prisma.oww_LeaderBoard.findMany()

    res.json(scores); // Respond with all saved scores
  } catch (error) {
    console.error('Error fetching Score:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Set score if player wins
route.post('/setScore', upload.none(), async (req, res) => {
  try {
    const {player, timeTaken} = req.body;

    await prisma.oww_LeaderBoard.create({
        data: {
            player,
            timeTaken
        }
    })

    res.status(201).json({message:'Score saved successfully'});
  } catch (error) {
    console.error('Error Setting Score:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default route;