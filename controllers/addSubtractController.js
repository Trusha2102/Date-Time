const { DateTime } = require('luxon');

exports.addSubtractTime = (req, res) => {
  const { time, unit, value, operation } = req.body;

  if (!time || !unit || !value || !operation) {
    return res.status(400).json({ error: 'Missing time, unit, value, or operation' });
  }

  let result;
  let dateTime;

  if (unit === 'hours' || unit === 'minutes') {
    const [hours, minutes] = time.split(':').map(Number);
    dateTime = DateTime.local().set({ hours, minutes, seconds: 0 });
  } else if (unit === 'days') {
    const [day, month, year] = time.split('-').map(Number);
    dateTime = DateTime.local().set({ day, month, year, hours: 0, minutes: 0, seconds: 0 });
  } else {
    return res.status(400).json({ error: 'Invalid unit' });
  }

  if (operation === 'Add') {
    if (unit === 'hours') {
      result = dateTime.plus({ hours: value });
    } else if (unit === 'minutes') {
      result = dateTime.plus({ minutes: value });
    } else if (unit === 'days') {
      result = dateTime.plus({ days: value });
    }
  } else if (operation === 'Subtract') {
    if (unit === 'hours') {
      result = dateTime.minus({ hours: value });
    } else if (unit === 'minutes') {
      result = dateTime.minus({ minutes: value });
    } else if (unit === 'days') {
      result = dateTime.minus({ days: value });
    }
  } else {
    return res.status(400).json({ error: 'Invalid operation' });
  }

  // Format the result time as per input type
  const formattedResult = unit === 'days' ? result.toFormat('dd-MM-yyyy') : result.toFormat('HH:mm');
  
  res.json({ result: formattedResult });
};
