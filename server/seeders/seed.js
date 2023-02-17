const mongoose = require("mongoose")

const db = require("../models")

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/board-of-the-rings',
{
  useNewUrlParser: true, 
  useUnifiedTopology: true,
});

const questionSeed = [
    {
        quizQ: "Who says “Nine companions. So be it. You shall be the fellowship of the ring.",
        answers: [
            {
                option: "Elrond",
                isCorrect: true
            },
            {
                option: "Gandalf",
                isCorrect: false
            },
            {
                option: "Aragorn",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "What are exactly the Two Watchers",
        answers: [
            {
                option: "Carved statues on the entrance to the Cirith Ungol Tower",
                isCorrect: true
            },
            {
                option: "Massive statues of Anarion and Isildur standing on the River Anduin",
                isCorrect: false
            },
            {
                option: "Two rivers flowing through and creating the borders in the Gap of Rohan",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "What are Palantiri",
        answers: [
            {
                option: "3 powerful given to the Elves",
                isCorrect: false
            },
            {
                option: "7 seeing stones",
                isCorrect: true
            },
            {
                option: "3 jewels made by Fëanor",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "What is the Front Porch",
        answers: [
            {
                option: "The plains in the East of Mordor",
                isCorrect: false
            },
            {
                option: "The tavern where Aragorn first met the hobbits",
                isCorrect: false
            },
            {
                option: "The hidden entrance in the Misty Mountains to the goblin town",
                isCorrect: true
            },
        ]
    },
    {
        quizQ: "How does Farmer Maggot protect his farm, also known as the Bamfurlong, from people",
        answers: [
            {
                option: "Three trained dogs",
                isCorrect: true
            },
            {
                option: "A shape-shifting bear/man",
                isCorrect: false
            },
            {
                option: "A swarm of bees",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "Which of these is not the Elvish language",
        answers: [
            {
                option: "Taliska",
                isCorrect: true
            },
            {
                option: "Telerin",
                isCorrect: false
            },
            {
                option: "Sindarin",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "Who is Snaga",
        answers: [
            {
                option: "The Great Goblin which is the leader of the goblins in the Misty Mountains",
                isCorrect: false
            },
            {
                option: "A fire drake lived in the Lonely Mountain to protect his gold",
                isCorrect: false
            },
            {
                option: "An orc died in the Cirith Ungol Tower",
                isCorrect: true
            },
        ]
    },
    {
        quizQ: "What occurs in the Wellinghall",
        answers: [
            {
                option: "It is the place where Treebeard invites Pippin and Merry to stay prior to the Entmoot",
                isCorrect: true
            },
            {
                option: "It is an Entish castle holding the Entmoot",
                isCorrect: false
            },
            {
                option: "It is the tower where Saruman commands his forces",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "What marks the beginning of the Third Age",
        answers: [
            {
                option: "The elimination of Beleriand after the Wrath War",
                isCorrect: false
            },
            {
                option: "The death of Sauron when the One Ring is destroyed",
                isCorrect: false
            },
            {
                option: "The victory of the Last Alliance of Men and Elves over Sauron",
                isCorrect: true
            },
        ]
    },
    {
        quizQ: "Which name do the Elves use to call the Hobbits",
        answers: [
            {
                option: "The Periannath",
                isCorrect: true
            },
            {
                option: "The Mellon",
                isCorrect: false
            },
            {
                option: "The Onodrim",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "What happens to Lobelth Sackville-Baggins after the War of the Rings",
        answers: [
            {
                option: "She becomes corrupted and transforms into a Ringwraith by Saruman",
                isCorrect: false
            },
            {
                option: "She is imprisoned in a lock hole",
                isCorrect: false
            },
            {
                option: "She dies and donates her money to help the Hobbits",
                isCorrect: true
            },
        ]
    },
    {
        quizQ: "What are exactly Morgul-wounds",
        answers: [
            {
                option: "The name of an Elf who gives up immortality",
                isCorrect: false
            },
            {
                option: "Wounds caused by the Nazgul",
                isCorrect: true
            },
            {
                option: "Siege towers used for attacking the Minas Tirith by Orcs",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "What Sindarin word was Aragorn known by when he was a child",
        answers: [
            {
                option: "Estel, which means trust or hope",
                isCorrect: true
            },
            {
                option: "Amdir, which means looking up",
                isCorrect: false
            },
            {
                option: "Aeluin, which means blue lake",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "What do Imrahil, Aragorn, Eomer, Gandalf, Elrohir, and Elladan decide in the Last Debate",
        answers: [
            {
                option: "The number of people to fight Sauron in the Morannon Battle",
                isCorrect: true
            },
            {
                option: "Who to annihilate the Ring of Power",
                isCorrect: false
            },
            {
                option: "How to punish Uruk-hai",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "Who is Elanor the Fair, also known as Elanor Gardner",
        answers: [
            {
                option: "The daughter of Rosie Cotton and Samwise Gamgee",
                isCorrect: true
            },
            {
                option: "The mother of Legolas and Queen of Mirkwood",
                isCorrect: false
            },
            {
                option: "One of the 9 humans who is given the Ring of Power",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "Which of these weapons is not found in the Troll's Cave",
        answers: [
            {
                option: "Orcrist the Goblin-cleaver",
                isCorrect: false
            },
            {
                option: "Sting",
                isCorrect: false
            },
            {
                option: "Angrist",
                isCorrect: true
            },
        ]
    },
    {
        quizQ: "Who participates in the Battle of Isengard",
        answers: [
            {
                option: "The Galadhrim of Lothlórien versus Orcs of Dol Guldur",
                isCorrect: false
            },
            {
                option: "King Théoden's Rohirrim versus Sauron's forces",
                isCorrect: false
            },
            {
                option: "The Ents versus Sauron's forces",
                isCorrect: true
            },
        ]
    },
    {
        quizQ: "Which of those isn't a public inn in the Middle Earth",
        answers: [
            {
                option: "The Prancing Pony",
                isCorrect: false
            },
            {
                option: "The Green Dragon",
                isCorrect: false
            },
            {
                option: "The Southern Star",
                isCorrect: true
            },
        ]
    },
    {
        quizQ: "Which type of creature is the Spawn of Ungoliant",
        answers: [
            {
                option: "Hill Giants",
                isCorrect: false
            },
            {
                option: "Uruk-hai",
                isCorrect: false
            },
            {
                option: "Giant Spiders",
                isCorrect: true
            },
        ]
    },
    {
        quizQ: "What is the Khazad-dum Bridge",
        answers: [
            {
                option: "The bridge on the Brandywine River that marks the end of Shire",
                isCorrect: false
            },
            {
                option: "The mythical gateway between Valinor and Middle-Earth",
                isCorrect: false
            },
            {
                option: "The bridge in the Great Gates of Moria in which Gandalf faces the Balrog",
                isCorrect: true
            },
        ]
    },
    {
        quizQ: "What is Durin's Fold often known as",
        answers: [
            {
                option: "Dwarves",
                isCorrect: true
            },
            {
                option: "Great Eagles",
                isCorrect: false
            },
            {
                option: "Forrest Elves",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "Who is not affected by the Ring",
        answers: [
            {
                option: "Galadriel",
                isCorrect: false
            },
            {
                option: "Bilbo",
                isCorrect: false
            },
            {
                option: "Sam",
                isCorrect: true
            },
        ]
    },
    {
        quizQ: "Which metal is the armoured shirt of Frodo made out of",
        answers: [
            {
                option: "Steel",
                isCorrect: false
            },
            {
                option: "Mithril",
                isCorrect: true
            },
            {
                option: "Silver",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "What is Bilbo's home called",
        answers: [
            {
                option: "Overhill",
                isCorrect: false
            },
            {
                option: "Bag Shot",
                isCorrect: false
            },
            {
                option: "Bag End",
                isCorrect: true
            },
        ]
    },
    {
        quizQ: "In the movies, how many times does Frodo put on the Ring",
        answers: [
            {
                option: "3",
                isCorrect: false
            },
            {
                option: "4",
                isCorrect: true
            },
            {
                option: "5",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "Where is Legolas's home",
        answers: [
            {
                option: "Eastfold",
                isCorrect: false
            },
            {
                option: "Mirkwood",
                isCorrect: true
            },
            {
                option: "Fangorn Forest",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "Which fake name does Frodo choose for himself after departing from the Shire",
        answers: [
            {
                option: "Mr. Underfoot",
                isCorrect: false
            },
            {
                option: "Mr. Underhill",
                isCorrect: true
            },
            {
                option: "Proudfoot",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "What is the exact number of Ringwraiths",
        answers: [
            {
                option: "5",
                isCorrect: false
            },
            {
                option: "7",
                isCorrect: false
            },
            {
                option: "9",
                isCorrect: true
            },
        ]
    },
    {
        quizQ: "Which race of beings did Sauron use to be a member of",
        answers: [
            {
                option: "Maiar",
                isCorrect: true
            },
            {
                option: "Elves",
                isCorrect: false
            },
            {
                option: "Men",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "What gift does Frodo get from Galadriel",
        answers: [
            {
                option: "The Elven Rope",
                isCorrect: false
            },
            {
                option: "The Phial of Galadriel",
                isCorrect: true
            },
            {
                option: "A silver belt",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "What do the hobbits actually smoke",
        answers: [
            {
                option: "Pipe-weed",
                isCorrect: true
            },
            {
                option: "Cloves",
                isCorrect: false
            },
            {
                option: "Peote",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "Who is the author of the Lord of the Rings",
        answers: [
            {
                option: "J. R. R. Tolkien",
                isCorrect: true
            },
            {
                option: "Peter Jackson",
                isCorrect: false
            },
            {
                option: "J. K. Rowling",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "How many members of the Fellowship die during the trilogy",
        answers: [
            {
                option: "1",
                isCorrect: false
            },
            {
                option: "2",
                isCorrect: true
            },
            {
                option: "3",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "How many Rings of Power were forged at the beginning",
        answers: [
            {
                option: "10",
                isCorrect: false
            },
            {
                option: "20",
                isCorrect: true
            },
            {
                option: "25",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "Where does Frodo go at the end of the Return of the King",
        answers: [
            {
                option: "Undying Lands",
                isCorrect: true
            },
            {
                option: "Eriador",
                isCorrect: false
            },
            {
                option: "Misty Mountains",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "What is the first of the three volumes of the Lord of the Rings",
        answers: [
            {
                option: "The Return of the King",
                isCorrect: false
            },
            {
                option: "The Two Towers",
                isCorrect: false
            },
            {
                option: "The Fellowship of the Ring",
                isCorrect: true
            },
        ]
    },
    {
        quizQ: "Each wizard in the Lord of the Rings is distinguished by the colour of their cloak. What are the two colours of Gandalf's cloak",
        answers: [
            {
                option: "Red and blue",
                isCorrect: false
            },
            {
                option: "Grey and white",
                isCorrect: true
            },
            {
                option: "Green and brown",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "Which race is Legolas",
        answers: [
            {
                option: "Elf",
                isCorrect: true
            },
            {
                option: "Dwarf",
                isCorrect: false
            },
            {
                option: "Man",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "What are Ents",
        answers: [
            {
                option: "An army of dead soldiers",
                isCorrect: false
            },
            {
                option: "Talking trees",
                isCorrect: true
            },
            {
                option: "A group of legendary kings of men",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "Two wizards were sent to help the people of Middle Earth",
        answers: [
            {
                option: "True",
                isCorrect: false
            },
            {
                option: "False",
                isCorrect: true
            },
        ]
    },
    {
        quizQ: "Who wields the sword Orcrist in The Hobbit",
        answers: [
            {
                option: "Thorin",
                isCorrect: true
            },
            {
                option: "Gandalf",
                isCorrect: false
            },
            {
                option: "Florin",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "What gift does Lady Galadriel give Gimli before the fellowship leaves Lothlorien",
        answers: [
            {
                option: "A dagger",
                isCorrect: false
            },
            {
                option: "Three strands of hair",
                isCorrect: true
            },
            {
                option: "An elvish bow and arrow",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "What was Gollum's hobbit name",
        answers: [
            {
                option: "Lancer",
                isCorrect: false
            },
            {
                option: "Smeagol",
                isCorrect: true
            },
            {
                option: "Precious",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "How many times does Gollum say precious in The Two Towers",
        answers: [
            {
                option: "16",
                isCorrect: true
            },
            {
                option: "12",
                isCorrect: false
            },
            {
                option: "11",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "The sword Sting would glow blue when who were nearby",
        answers: [
            {
                option: "Dark Elves",
                isCorrect: true
            },
            {
                option: "Orcs",
                isCorrect: false
            },
            {
                option: "Giant Spiders",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "The shards of the sword Narsil were taken to Rivendell and reforged into what new sword",
        answers: [
            {
                option: "Orcrist",
                isCorrect: false
            },
            {
                option: "Anduril",
                isCorrect: true
            },
            {
                option: "Glamdring",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "Which of the Three Rings of Power did Galadriel wear",
        answers: [
            {
                option: "Narya, the Ring of Fire",
                isCorrect: false
            },
            {
                option: "Nenya, the Ring of Water",
                isCorrect: true
            },
            {
                option: "Vilya, the Ring of Air",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "Who is the last keeper of the elven ring Narya, the Ring of Fire",
        answers: [
            {
                option: "Gandalf",
                isCorrect: true
            },
            {
                option: "Arwen",
                isCorrect: false
            },
            {
                option: "Cirdan",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "After his resurrection, Gandalf is known as The Grey",
        answers: [
            {
                option: "True",
                isCorrect: false
            },
            {
                option: "False",
                isCorrect: true
            },
        ]
    },
    {
        quizQ: "Who rescues Gandalf atop the Tower Orthanc",
        answers: [
            {
                option: "Gwaihir",
                isCorrect: true
            },
            {
                option: "Frodo and Sam",
                isCorrect: false
            },
            {
                option: "Merry and Pippin",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "Hobbits eat seven meals a day. What comes directly after elevensies",
        answers: [
            {
                option: "Afternoon tea",
                isCorrect: false
            },
            {
                option: "Luncheon",
                isCorrect: true
            },
            {
                option: "Brunch",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "In The Two Towers what is the name of the treelike species Merry and Pippin befriend in Fangorn Forest",
        answers: [
            {
                option: "Ent",
                isCorrect: true
            },
            {
                option: "Treebeard",
                isCorrect: false
            },
            {
                option: "Leaflong",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "When did Isildur lose the One Ring",
        answers: [
            {
                option: "In a battle with Saruman",
                isCorrect: true
            },
            {
                option: "As he swam across a river",
                isCorrect: false
            },
            {
                option: "While defending his brother Aratan",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "What did Aragorn, Imrahil, Gandalf, Elladan, Eomer and Elrohir decide during the Last Debate",
        answers: [
            {
                option: "To fight Sauronn",
                isCorrect: true
            },
            {
                option: "How to destroy the Ring of Power",
                isCorrect: false
            },
            {
                option: "How to save Frodo Baggins",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "When Frodo is attacked by the Witch-king, who attempts to hit his heart with a Morgul blade, what is he almost turned into",
        answers: [
            {
                option: "A wraith",
                isCorrect: true
            },
            {
                option: "A Balrog",
                isCorrect: false
            },
            {
                option: "An Orc",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "Who was the elf responsible for abandoning Dol Guldur, before Sauron moved in",
        answers: [
            {
                option: "Oropher",
                isCorrect: true
            },
            {
                option: "Legolas",
                isCorrect: false
            },
            {
                option: "Mirkwood",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "Who created the three Elven Rings",
        answers: [
            {
                option: "Earendil",
                isCorrect: false
            },
            {
                option: "Feanor",
                isCorrect: false
            },
            {
                option: "Celebrimbor",
                isCorrect: true
            },
        ]
    },
    {
        quizQ: "What was the name of the book that Bilbo was writing about his adventures",
        answers: [
            {
                option: "There and Back Again",
                isCorrect: true
            },
            {
                option: "The Hobbit",
                isCorrect: false
            },
            {
                option: "My Adventures at the Shire",
                isCorrect: false
            },
        ]
    },
    {
        quizQ: "What was the name of the book that Bilbo was writing about his adventures",
        answers: [
            {
                option: "There and Back Again",
                isCorrect: true
            },
            {
                option: "The Hobbit",
                isCorrect: false
            },
            {
                option: "My Adventures at the Shire",
                isCorrect: false
            },
        ]
    },

]