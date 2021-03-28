const express = require('express');
const axios = require('axios');
const app = express();
const FormData = require('form-data');
const port = process.env.PORT || 3000;
const bot_url = 'https://api.telegram.org/bot1612092899:AAEs6FYohEX0BB1pUGt_At727prgpFXpmOY/'

function parseText(text) {
    let appendM = ['a', 'e', 'i', 'o', 'u']
    let exclude = [[/my/g, 'y'], [/ml/g, 'l'], [/ma/g, 'a'], [/mu/g, 'u']]
    let replace = [/n/g]
    let textSplit = text.replace(/\\n/g, '\n').split('')

    let res = textSplit
        .map(char => {
            return appendM.indexOf(char) !== -1 ? char + 'm' : char
        })
        .join('')
        .split('')

    const removeDuplicate = (char, i) => !((res[i - 1] === 'm') && (char === 'm'))

    res = res
        .filter(removeDuplicate)
        .join('')

    replace.forEach(regex => {
        res = res.replace(regex, 'm')
    })
    res = res
        .split('')
        .filter(removeDuplicate)
        .join('')

    exclude.forEach(regex => {
        res = res.replace(regex[0], regex[1])
    })

    return res
}
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.send('corriendo..');
})
app.post('/', (req, res) => {
    res.send(req.body)
    console.log(req.body)
    let message = req.body;
    let data = new FormData();
    data.append('text', parseText(message.message.text));
    data.append('chat_id', message.message.chat.id);

    axios.post(bot_url + 'sendMessage', data)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.error(err);
        })
})
app.listen(port, () => {
    console.log(`server is running in port [${port}]...`);
})