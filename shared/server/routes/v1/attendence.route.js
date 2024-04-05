import express from 'express'
const router = express.Router()

// const checkInStmt = (userId, status, checkedIn, checkedOut) => {
//   const stmt = `
//     INSERT INTO attendee (user_id, status, checked_in, checked_out)
//     VALUES ('${userId}', ${status}, ${checkedIn}, ${checkedOut})
//     ON CONFLICT(user_id)
//     DO UPDATE SET
//       status = EXCLUDED.status,
//       checked_in = EXCLUDED.checked_in,
//       checked_out = EXCLUDED.checked_out;
//   `

//   return stmt
// }

// const hasAttendenceRecordStmt = (userId, eventId, scheduleId) => {
//   const stmt = `SELECT EXISTS(SELECT 1 FROM attendee WHERE user_id='${userId}' AND event_id='${eventId}' AND schedule_id='${scheduleId}')`
//   return stmt
// }

router.get('/check-in', async (req, res) => {
  try {
    // const hasRecordSql = hasAttendenceRecordStmt(req.query.userId, req.query.eventId, req.query.scheduleId)
    // const hasRecordResult = await queryDatabase(hasRecordSql)
    // console.log("HAS RECORD", hasRecordResult.rows[0].exists)

    // const checkInSql = checkInStmt(req.query.userId, 1, true, false)
    // const checkInResult = await queryDatabase(checkInSql);
    res.status(200).json({"data": []})
  } catch (error) {
    console.error('An error ocurred:', error)
    res.status(500).json(error)
  }
})

router.get('/', async (req, res) => {
  try {
    // const result = await queryDatabase('SELECT * FROM attendee');
    res.status(200).json({"data": []})
  } catch (error) {
    console.error('An error ocurred:', error)
    res.status(500).json(error)
  }
});

  export default router