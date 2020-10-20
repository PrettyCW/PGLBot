const game = require('./game')
const fs = require('fs')
const Discord = require('discord.js')
const path = require('path')
const Team = game.Team
const Player = game.Player

const client = new Discord.Client()

client.on('ready', () => {
  console.log('Bot intialized.')
})

client.on('message', (message) => {
  if (message.content == 'sim') {
    let t1 = new Team('Ghost Gaming', 'GG', [new Player('AlphaKep', 50, 0), new Player('Gimmick', 60, 1), new Player('SquishyMuffinz', 70, 2)])
    let t2 = new Team('Echo Fox', 'FOX', [new Player('Andy', 50, 0), new Player('hec', 60, 0), new Player('ClayX', 71, 0)])

    message.channel.send(game.simGame(t1, t2))
  }
})

fs.readFile(path.join(__dirname, '..', 'token.txt'), (err, data) => {
  if (err) return console.log(err)
  client.login(data.toString())
})
