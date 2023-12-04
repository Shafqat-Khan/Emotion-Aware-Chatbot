import express, { response } from "express";
import { config } from "dotenv";
import axios from "axios";
import { Configuration, OpenAIApi } from "openai"
import cors from "cors"; 
config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); 

const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
)

const makePostRequest = async (input) => {

  try {
    const response = await openAi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input },{ role: "system", content: "only tell the emotion nothing else" },],
    }
    
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    throw new Error(`Error making the request: ${error.message}`);
  }
};

app.post("/chat", async (req, res) => {

  try {

    const input = req.body.text;

    if (!input) {
      return res.status(400).json({ error: "Input is required" });
    }

    const result = await makePostRequest(input);

    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
