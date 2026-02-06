
import { GoogleGenAI } from "@google/genai";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


export const calcheck = async (req, res) => {
  try {
    const { food } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Tell me approximate calories of ${food} and what exercises (max 2) is required and for how much time
       to burn this calorie.
      Respond in this format and dont put *:
      Food:
      Calories (kcal):
      Serving size:
      Exercises Required:`,
    });

    res.json({ result: response.text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gemini API error" });
  }
};

// app.listen(5000, () => {
//   console.log("Backend running on http://localhost:5000");
// });