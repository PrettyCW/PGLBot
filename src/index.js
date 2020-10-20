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
    let t1 = new Team('Ghost Gaming', 'GG')
    let t2 = new Team('Echo Fox', 'FOX')
    t1.addPlayer(new Player('AlphaKep', 50))
    t1.addPlayer(new Player('Gimmick', 60))
    t1.addPlayer(new Player('SquishyMuffinz', 70))

    t2.addPlayer(new Player('Andy', 50))
    t2.addPlayer(new Player('hec', 60))
    t2.addPlayer(new Player('ClayX', 71))

    game.simGame(t1, t2)
    console.log(game.matchEvents)
    message.channel.send(game.matchEvents)
  }
})

fs.readFile(path.join(__dirname, '..', 'token.txt'), (err, data) => {
  if (err) return console.log(err)
  client.login(data.toString())
})
