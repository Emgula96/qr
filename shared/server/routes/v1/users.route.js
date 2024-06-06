import express from 'express';
import sql from 'mssql';
const router = express.Router();
import { query } from '../../db.js';  // Assuming you have these exports from your db.js file

router.get('/', async (req, res) => {
  try {
    let { email, first_name, last_name } = req.query;

    // Convert the first character of each name to uppercase
    first_name = first_name ? first_name.charAt(0).toUpperCase() + first_name.slice(1).toLowerCase() : null;
    last_name = last_name ? last_name.charAt(0).toUpperCase() + last_name.slice(1).toLowerCase() : null;

    const result = await query(`
    SELECT TOP 1
    u.user_pk,
    u.sid,
    u.fname,
    u.mname,
    u.lname,
    u.email,
    e.event_id,
    e.obj_id,
    e.[limit],
    e.credithours,
    e.regstart,
    e.regend,
    a.attendee_pk,
    a.credits,
    a.fee,
    a.attended,
    a.paid,
    a.cancelled,
    a.cancel_date,
    ev.title AS event_title
FROM
    [dbo].[user] u
INNER JOIN
    [dbo].[event.session.attendee] a ON u.user_pk = a.user_id
INNER JOIN
    [dbo].[event.session] e ON a.[event.session_id] = e.obj_id
INNER JOIN
    [tx_esc_04].[dbo].[event] ev ON e.obj_id = ev.obj_id -- Assuming obj_id is the common column between event.session and event tables
WHERE
    u.email = @Email
    AND u.fname = @FirstName
    AND u.lname = @LastName
ORDER BY
    e.regend DESC;
    `, [
      { name: 'Email', type: sql.NVarChar, value: email },
      { name: 'FirstName', type: sql.NVarChar, value: first_name },
      { name: 'LastName', type: sql.NVarChar, value: last_name }
    ]);
    console.log(result.recordset);
    res.status(200).json({ data: result.recordset });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json(error);
  }
});

export default router;