const { DateTime } = require('luxon');

exports.getTimeBetween = (req, res) => {
  const { start, end } = req.body;
  console.log("PAYLOAD", start, end);

  if (!start || !end) {
    return res.status(400).json({ error: 'Missing start or end time' });
  }

  let startTime, endTime;

  // Check if start and end are in date format (YYYY-MM-DD)
  if (start.includes('-') && end.includes('-')) {
    startTime = DateTime.fromISO(start);
    endTime = DateTime.fromISO(end);
  } else if (start.includes(':') && end.includes(':')) { // Check if start and end are in time format (HH:mm)
    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);

    startTime = DateTime.local().set({ hour: startHour, minute: startMinute });
    endTime = DateTime.local().set({ hour: endHour, minute: endMinute });
  } else {
    return res.status(400).json({ error: 'Invalid start or end time format' });
  }

  const diff = endTime.diff(startTime);

  // Convert difference to days, hours, minutes, and seconds
  const { days, hours, minutes, seconds } = diff.shiftTo('days', 'hours', 'minutes', 'seconds').toObject();

  res.json({ days, hours, minutes, seconds });
};
