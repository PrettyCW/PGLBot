module.exports = () => {
  if (process.env.STAGE === 'prod') {
    return {
      MNCS: {
        spreadsheetId: process.env.DB_SHEET_ID,
        gameLog: '632279557',
        // newSheet: '', // more sheets can be added here
      },
    }
  } else {
    return {
      MNCS: {
        spreadsheetId: process.env.DB_SHEET_ID,
        gameLog: '1838970166',
        // newSheet: '',
      },
    }
  }
}
