// Game Simulation Code below.
function Player (name, rating, playstyle) {
  this.name = name;
  this.rating = rating;
  this.playstyle = playstyle; // 0: striker, 1: guardian, 2: anything else
  this.goals = 0;
}

function Team (name, abbrev) {
  this.name = name;
  this.abbrev = abbrev;
  this.players = [];
  this.goals = 0;

  this.addPlayer = (player) => {
    this.players.push(player);
  }

  this.rating = () => {
    let total = 0;
    for (let i = 0; i < this.players.length; ++i) {
      total += this.players[i].rating;
    }
    return total;
  }

  this.playerScoreChance = (playerIndex) => {
    let player = this.players[playerIndex];
    if (player.playstyle == 0) {
      return player.rating + (this.rating() / 10);
    } else if (player.playstyle == 1) {
      return player.rating - (this.rating() / 10);
    } else {
      return player.rating;
    }
  }
}

let scoringOdds = 0.007
let minimumOdds = 0.001

let matchEvents = []

function scoreEvent (team, player, time) {
  let formattedTime = ""
  if (time < 0) {
    formattedTime += "+"
    time = Math.abs(time);
  }
  formattedTime += Math.floor(time / 60);
  formattedTime += ":";
  if (time % 60 < 10) formattedTime += "0";
  formattedTime += (time % 60);
  matchEvents.push(formattedTime + " - " + player + " has scored for " + team);
}

function score (team, time) {
  team.goals++;
  let ratingAmount = team.playerScoreChance(0) + team.playerScoreChance(1) + team.playerScoreChance(2);
  let rand = Math.floor(Math.random() * ratingAmount);
  if (rand < team.playerScoreChance(0)) {
    team.players[0].goals++;
    scoreEvent(team.abbrev, team.players[0].name, time);
  } else if (rand < team.playerScoreChance(0) + team.playerScoreChance(1)) {
    team.players[1].goals++;
    scoreEvent(team.abbrev, team.players[1].name, time);
  } else {
    team.players[2].goals++;
    scoreEvent(team.abbrev, team.players[2].name, time);
  }
}

function printEvents () {
  for (let i = 0; i < matchEvents.length; ++i) {
    console.log(matchEvents[i]);
  }
}

function simGame (t1, t2) {
  let time = 299;
  let t1Odds = scoringOdds + ((t1.rating() - t2.rating()) * 0.00005);
  let t2Odds = scoringOdds + ((t2.rating() - t1.rating()) * 0.00005);

  if (t1Odds < minimumOdds) t1Odds = minimumOdds;
  if (t2Odds < minimumOdds) t2Odds = minimumOdds;

  while (time > -1) {
    let rand = Math.random();
    if (rand < t1Odds) {
      score(t1, time);
    } else if (rand < t1Odds + t2Odds) {
      score(t2, time);
    }

    --time;
  }

  if (t1.goals == t2.goals) {
    let overtime = 0;
    while (true) {
      let rand = Math.random();
      if (rand < t1Odds) {
        score(t1, -overtime);
        break;
      } else if (rand < t1Odds + t2Odds) {
        score(t2, -overtime);
        break;
      }
      ++overtime;
    }
  }

  matchEvents.push(t1.abbrev + ": " + t1.goals + " " + t2.abbrev + ": " + t2.goals);
  printEvents();
}

exports.Team = Team;
exports.Player = Player;
exports.simGame = simGame;
exports.matchEvents = matchEvents;