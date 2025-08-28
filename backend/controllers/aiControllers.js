const { GoogleGenerativeAI } = require("@google/generative-ai");
const { questionAnswerPrompt, conceptExplainationPrompt } = require("../Utils/prompts");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// get the model once, reuse it
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Generate interview questions
// Generate interview questions
const generateInterviewQuestions = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

        if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res
                .status(400)
                .json({ success: false, message: "Please provide all fields" });
        }

        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);
        const result = await model.generateContent(prompt);

        const rawText = result.response.text();

        // Clean unwanted code block formatting
        // Clean unwanted code block formatting
        let cleanedText = rawText
            .replace(/^```(?:json)?\s*/i, "")  // remove leading ```json or ```
            .replace(/```$/i, "")              // remove trailing ```
            .trim();

        // Extra: ensure no stray trailing characters after JSON
        const lastBrace = cleanedText.lastIndexOf("]");
        if (lastBrace !== -1) {
            cleanedText = cleanedText.substring(0, lastBrace + 1);
        }

        let data;
        try {
            data = JSON.parse(cleanedText);
        } catch (parseErr) {
            console.warn("Parse error, returning raw text:", parseErr.message);
            return res.status(200).json({
                success: true,
                data: cleanedText,
                warning: "Response was not valid JSON, returning plain text",
            });
        }


        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error("Error in API:", error);
        res
            .status(500)
            .json({ success: false, message: "Internal Server Error in generateInterviewQuestions", error: error.message });
    }
};



const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a question" });
    }

    const prompt = conceptExplainationPrompt(question);
    const result = await model.generateContent(prompt);

    let rawText = result.response.text();

    // Step 1: Remove code fences if present
    let cleanedText = rawText
      .replace(/```(json)?/gi, "") // remove ```json
      .replace(/```/g, "")        // remove ```
      .trim();

    // Step 2: Ensure we stop at the last closing curly brace
    const lastBrace = cleanedText.lastIndexOf("}");
    if (lastBrace !== -1) {
      cleanedText = cleanedText.substring(0, lastBrace + 1);
    }

    // Step 3: Extra cleanup — handle wrapped JSON and markdown junk
    if (cleanedText.startsWith('"') && cleanedText.endsWith('"')) {
      // JSON sometimes comes back as a giant quoted string
      cleanedText = cleanedText.slice(1, -1);
      cleanedText = cleanedText.replace(/\\"/g, '"'); // unescape inner quotes
    }

    cleanedText = cleanedText
      .replace(/```[a-z]*/gi, "") // remove ```js, ```jsx, etc.
      .replace(/```/g, "")
      .trim();

    // Step 4: Try to parse JSON
    let data;
    try {
      data = JSON.parse(cleanedText);
    } catch (err) {
      console.warn("Parse error, returning raw text:", err.message);
      return res.status(200).json({
        success: true,
        data: cleanedText,
        warning: "Response was not valid JSON, returning plain text",
      });
    }

    // Step 5: Return parsed JSON
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error in API:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error in generateConceptExplanation", error: error.message });
  }
};

module.exports = { generateInterviewQuestions, generateConceptExplanation };
