const mongoose = require("mongoose")

const db = require("../models")

mongoose.connect('mongodb://localhost/board-of-the-rings');

const questionSeed = [

    {
        quizQ: "Test Question",
        answers: [
            {
                option: "answer one",
                isCorrect: true
            },
            {
                option: "answer two",
                isCorrect: false
            },
            {
                option: "answer three",
                isCorrect: false
            },
            {
                option: "answer four",
                isCorrect: false
            }
        ]
    },
    {
        quizQ: "Test Question Two",
        answers: [
            {
                option: "answer one.2",
                isCorrect: false
            },
            {
                option: "answer two.2",
                isCorrect: true
            },
            {
                option: "answer three.2",
                isCorrect: false
            },
            {
                option: "answer four.2",
                isCorrect: false
            }
        ]
    }
]



    db.Questions.deleteMany({})

  .then(() => 
    db.Questions.collection.insertMany(questionSeed))

    .then((data) => {

        console.log(data.result + ' records inserted!');

        process.exit(0);

    })

    .catch((err) => {

        console.error(err);

        process.exit(1);

    });