const { DateTime } = require('luxon');
const Time = require('../models/time');

exports.convertToUTC = async (req, res) => {
  const { time } = req.body;

  if (!time) {
    return res.status(400).json({ error: 'Missing time' });
  }

  try {
    // Get the user's time zone from the system
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Parse the input time in the user's time zone
    const dateTime = DateTime.fromISO(time, { zone: userTimeZone });

    // Convert the parsed time to UTC
    const utcTime = dateTime.toUTC();

    // Create a new Time document to save in the database
    const newTime = new Time({
      enteredTime: new Date(time),
      convertedTime: new Date(utcTime.toISO())
    });

    // Save the newTime document to the database
    await newTime.save();

    res.json({ utcTime: utcTime.toISO() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
