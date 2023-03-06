const natural = require('natural')
const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 3000

const app = express()
app.use(cors({origin: true}))

const {response} = require('express')

const language = "EN"
const defaultCategory = 'N';
const defaultCategoryCapitalized = 'NNP';

var lexicon = new natural.Lexicon(language, defaultCategory, defaultCategoryCapitalized);
var ruleSet = new natural.RuleSet('EN');
var tagger = new natural.BrillPOSTagger(lexicon, ruleSet);

app.get('/:sentence', (req, res) => {
    let sentence = req.params.sentence.split(" ")
    res.send(JSON.stringify(tagger.tag(sentence)))
})

app.listen(port, () => {console.log("listening on port" + port)})