const { DateTime } = require('luxon');

exports.convertToUTC = (req, res) => {
  const { time } = req.body;

  if (!time) {
    return res.status(400).json({ error: 'Missing time' });
  }

  // Get the user's time zone from the system
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Parse the input time in the user's time zone
  const dateTime = DateTime.fromISO(time, { zone: userTimeZone });

  // Convert the parsed time to UTC
  const utcTime = dateTime.toUTC();

  res.json({ utcTime: utcTime.toISO() });
};
