module.exports = () => {
  if (process.env.STAGE === 'prod') {
    return {
      MNCS: {
        spreadsheetId: process.env.DB_SHEET_ID,
        teamGames: '', // the sheet id goes here
        playerGames: '',
      },
    }
  } else {
    return {
      MNCS: {
        spreadsheetId: process.env.DB_SHEET_ID,
        teamGames: '',
        playerGames: '',
      },
    }
  }
}
