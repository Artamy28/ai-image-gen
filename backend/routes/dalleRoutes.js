import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const router = express.Router();

const openai = new OpenAI({
	apiKey: process.env.OPEN_API_KEY,
});

router.get("/", (req, res) => {
	res.send("Hello!!!");
});

// POST prompt, DALL-E returns generated image to us
router.post("/", async (req, res) => {
	try {
		const { prompt } = req.body;
		const response = await openai.images.generate({
			prompt: prompt,
			n: 1,
			size: "1024x1024",
			response_format: "b64_json",
		});

		// Get the image from data
		const image = response.data[0].b64_json;

		res.status(200).json({ photo: image });
	} catch (error) {
		// Error message from the response
		res.status(500).send(error?.response.data.error.message);
	}
});

export default router;
