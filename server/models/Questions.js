const mongoose = require('mongoose');
const Schema = mongoose.Schema


const questionSchema = new Schema({
            quizQ: {
                type: String,
                trim: true,
            },
            answers: [
                {
                    option: {
                        type: String,
                        trim: true,
                    },
                    isCorrect: {
                        type: Boolean,
                    }
                }
            ]
})

const Questions = mongoose.model("Questions", questionSchema)

module.exports = Questions