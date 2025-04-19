import { Router } from "express";
import upload from "../middleware/multerUploader.js";
import prisma from "../middleware/prismaInit.js";

const route = Router();

let itemCoords;

// Game start (server wakeup call)
route.get('/start', async (req, res) => {
  try {    
    // fetch databse coords
    const coords = await prisma.oww_Coords.findMany();
    itemCoords = coords;

    // console.log(itemCoords);
    res.json({message: "Okite! Okite!"}); // Respond with user details
  } catch (error) {
    console.error('Error Starting server??:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Match Coordinates (see if clicked object is right or not)
route.get('/matchCoords', async (req, res) => {
  try {
    // Recieve coords
    const x = parseInt(req.query.coords.x);
    const y = parseInt(req.query.coords.y);

    console.log(req.query.coords);
    console.log({x, y});

    // check if it matches with any
    for (let coord of itemCoords) {
      // console.log(coord);
      console.log("Checking item:", coord.character);
      if (x > coord.xMin && x < coord.xMax && y > coord.yMin && y < coord.yMax){
        console.log(`item ${coord.character} matched. Sending response.`);
        res.status(200).json({
            message: "Success! You found: ",
            item: coord.character
        })
        return;
      }
    }
    res.status(200).json({message: "No item identified."});
  } catch (error) {
    console.error('Error Checking coordinates:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Create Entries (Becoz i dont wanna write raw sql to enter it)
route.post('/createItems', upload.none(), async(req,res) => {
    try {
        // Recieve coords
        // console.log(req.body);
        const {xMin, xMax, yMin, yMax, item} = req.body;

        const parsedData = {
          xMin: parseInt(xMin),
          xMax: parseInt(xMax),
          yMin: parseInt(yMin),
          yMax: parseInt(yMax),
          character: item
        };
        console.log(parsedData);

        if (Object.values(parsedData).some(val => isNaN(val) && typeof val !== 'string')) {
          return res.status(400).json({ message: 'Invalid input. Coordinates must be numbers.' });
        }
    
        await prisma.oww_Coords.create({
            data: parsedData
        })

        res.status(200).json({message: (`Added item ${item}`)})

      } catch (error) {
        console.error('Error Adding Item:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }    
})

// Delete Entries (Becoz i dont wanna write raw sql to enter it)
route.post('/deleteItems', upload.none(), async(req,res) => {
  try {
      // console.log(req.body);
      const {itemId} = req.body;
  
      await prisma.oww_Coords.delete({
          where: {
            id: itemId
          }
      })

      res.status(200).json({message: (`Deleted item ${itemId}`)})

    } catch (error) {
      console.error('Error Deleting Item:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }    
})

export default route;