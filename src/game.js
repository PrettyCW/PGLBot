// Game Simulation Code below.
let scoringOdds = 0.007
let minimumOdds = 0.001
let triplePlaystylePenalty = 30
let doublePlaystylePenalty = 10

function Player(name, rating, playstyle) {
  this.name = name
  this.rating = rating
  this.playstyle = playstyle // 0: striker, 1: guardian, 2: playmaker, 3: all-around
  this.goals = 0
}

function Team(name, abbrev, players) {
  this.name = name
  this.abbrev = abbrev
  this.players = players
  this.goals = 0

  // Calculate team overall rating
  let total = 0
  for (let i = 0; i < this.players.length; ++i) {
    total += this.players[i].rating
  }

  if (
    this.players[0].playstyle != 3 &&
    this.players[0].playstyle == this.players[1].playstyle &&
    this.players[0].playstyle == this.players[2].playstyle
  ) {
    total -= triplePlaystylePenalty
  } else if (
    this.players[0].playstyle != 3 &&
    (this.players[0].playstyle == this.players[1].playstyle || this.players[0].playstyle == this.players[2].playstyle)
  ) {
    total -= doublePlaystylePenalty
  } else if (this.players[1].playstyle != 3 && this.players[1].playstyle == this.players[2].playstyle) {
    total -= doublePlaystylePenalty
  }

  this.rating = total

  this.playerScoreChance = (playerIndex) => {
    let player = this.players[playerIndex]
    if (player.playstyle == 0) {
      return player.rating + this.rating / 10
    } else if (player.playstyle == 1) {
      return player.rating - this.rating / 10
    } else {
      return player.rating
    }
  }
}

function scoreEvent(team, player, time) {
  let formattedTime = ''
  if (time < 0) {
    formattedTime += '+'
    time = Math.abs(time)
  }
  formattedTime += Math.floor(time / 60)
  formattedTime += ':'
  if (time % 60 < 10) formattedTime += '0'
  formattedTime += time % 60
  return formattedTime + ' - ' + player + ' has scored for ' + team
}

function score(team, time) {
  team.goals++
  let ratingAmount = team.playerScoreChance(0) + team.playerScoreChance(1) + team.playerScoreChance(2)
  let rand = Math.floor(Math.random() * ratingAmount)
  if (rand < team.playerScoreChance(0)) {
    team.players[0].goals++
    return scoreEvent(team.abbrev, team.players[0].name, time)
  } else if (rand < team.playerScoreChance(0) + team.playerScoreChance(1)) {
    team.players[1].goals++
    return scoreEvent(team.abbrev, team.players[1].name, time)
  } else {
    team.players[2].goals++
    return scoreEvent(team.abbrev, team.players[2].name, time)
  }
}

function simGame(t1, t2) {
  let time = 299
  let t1Odds = scoringOdds + (t1.rating - t2.rating) * 0.00005
  let t2Odds = scoringOdds + (t2.rating - t1.rating) * 0.00005
  let matchEvents = []

  if (t1Odds < minimumOdds) t1Odds = minimumOdds
  if (t2Odds < minimumOdds) t2Odds = minimumOdds

  while (time > -1) {
    let rand = Math.random()
    if (rand < t1Odds) {
      matchEvents.push(score(t1, time))
    } else if (rand < t1Odds + t2Odds) {
      matchEvents.push(score(t2, time))
    }

    --time
  }

  if (t1.goals == t2.goals) {
    let overtime = 0
    while (true) {
      let rand = Math.random()
      if (rand < t1Odds) {
        matchEvents.push(score(t1, -overtime))
        break
      } else if (rand < t1Odds + t2Odds) {
        matchEvents.push(score(t2, -overtime))
        break
      }
      ++overtime
    }
  }

  matchEvents.push(t1.abbrev + ': ' + t1.goals + ' ' + t2.abbrev + ': ' + t2.goals)
  return matchEvents
}

exports.Team = Team
exports.Player = Player
exports.simGame = simGame
