const express = require('express')
const axios = require('axios')
const app = express()
const body_parser = require('body-parser');
const port = process.env.PORT || 3000
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
app.use(body_parser.json())

app.get('/', (req, res) => {
    res.send('corriendo..')
})
app.post('/', (req, res) => {
    res.send(req.body)
    console.log(req.body)
})
app.listen(port, () => {
    // console.log(`Example app listening at http://localhost:${port}`)
    // console.log('montado');
    // let bot_uri = "https://api.telegram.org/bot1612092899:AAEs6FYohEX0BB1pUGt_At727prgpFXpmOY/"
    // let last_id = ""
    // axios.get(bot_uri + 'getUpdates', '')
    //     .then(res => {
    //         first_message = res.data.result.pop();
    //         last_id = first_message.update_id;
    //         setInterval(() => {
    //             axios.get(bot_uri + 'getUpdates', '')
    //                 .then(res => {
    //                     if (res.data.result.length > 0) {
    //                         let current_message = res.data.result.pop()
    //                         if (current_message.update_id > last_id) {
    //                             let { chat, text } = current_message.message;
    //                             console.log(current_message.update_id);
    //                             let data = {
    //                                 chat_id: chat.id,
    //                                 text: parseText(text)
    //                             }
    //                             axios.post(bot_uri + "sendMessage", data)
    //                                 .then(res => {
    //                                     console.log(res.data)
    //                                 })
    //                                 .catch(err => {
    //                                     console.error(err);
    //                                 })
    //                             last_id = current_message.update_id
    //                             console.log(last_id);
    //                         }
    //                     }
    //                 })
    //                 .catch(err => {
    //                     console.error(err);
    //                 })
    //         }, 3000);
    //     })
    //     .catch(err => {
    //         console.error(err);
    //     })
    console.log(`server is running in port [${port}]...`);
})