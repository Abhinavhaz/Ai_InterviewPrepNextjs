const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => (`
You are an AI trained to generate technical interview questions and answers.

Task:
- Role: ${role}
- Candidate Experience: ${experience} years
- Focus: ${topicsToFocus}
- Write ${numberOfQuestions} interview questions.
- For each question, generate a detailed but beginner-friendly answer.
- If the answer needs a code example, add a small code block inside.
- Keep formatting very clean.
- Return a pure JSON array like:
[
   {
     "question":"Question here?",
     "answer":"Answer here"
   }
   ...
]
Important: do not add any extra text. Only return valid JSON.
`)

const conceptExplainationPrompt = (question) => (`
You are an AI trained to generate explanations for a given interview question.

Task:
- Explain the following interview question and its concept in depth as if you are teaching a beginner developer.
- Question: ${question}
- After the explanation, include a code example, provide a small code block.
- Keep the result as a valid JSON object with the following keys:
{
   "title":"Short title here?",
   "explanation":"Explanation here",
   "code":"Code here"
}
Important: do not add any extra text outside the JSON format. Only return valid JSON.
`)

module.exports = { questionAnswerPrompt, conceptExplainationPrompt }
