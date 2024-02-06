const { DateTime } = require('luxon');

exports.convertToUTC = (req, res) => {
  const { time } = req.body;

  if (!time) {
    return res.status(400).json({ error: 'Missing time' });
  }

  const dateTime = DateTime.fromISO(time).toUTC();

  res.json({ utcTime: dateTime.toISO() });
};
