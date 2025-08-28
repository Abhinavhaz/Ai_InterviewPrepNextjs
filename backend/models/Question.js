const mongoose = require('mongoose');

const questionSchema=new mongoose.Schema({
  session:{type:mongoose.Schema.Types.ObjectId,ref:"session"},
  question:String,
  answer:String,
  note:String,
  isPinned :{type:Boolean, default:false},  
},
{timestamps:true}
);
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;



// USER COLLECTIONS
// {
//   _id: ObjectId("user123"),
//   name: "Riya",
//   email: "riya@example.com"
// }


// Question Collection
// {
//   _id: ObjectId("ques001"),
//   question: "What is Node.js?",
//   answer: "A JavaScript runtime."
// }
// {
//   _id: ObjectId("ques002"),
//   question: "What is MongoDB?",
//   answer: "A NoSQL database."
// }


//  Session collection (linking User + Questions):
// {
//   _id: ObjectId("sess001"),
//   user: ObjectId("user123"), // links to Riya in User collection
//   role: "Interviewer",
//   experience: "5 years",
//   questions: [
//     ObjectId("ques001"), // links to Node.js question
//     ObjectId("ques002")  // links to MongoDB question
//   ]
// }
