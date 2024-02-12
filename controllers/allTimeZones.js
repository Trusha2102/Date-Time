const { DateTime } = require('luxon');
const path = require('path');
const fs = require('fs');

const timezoneFilePath = path.join(__dirname, '../timezone.json');
const timeZones = JSON.parse(fs.readFileSync(timezoneFilePath, 'utf8'));

exports.convertTimeToMultipleTimeZones = (req, res) => {
    const { time } = req.body;
  
    if (!time) {
      return res.status(400).json({ error: 'Missing time' });
    }
  
    const convertedTimes = [];
  
    // Loop through each time zone
    timeZones.forEach(timeZone => {
      // Parse the input time in the current time zone
      const dateTime = DateTime.fromISO(time, { zone: timeZone.zone_name });
  
      // Convert the parsed time to the time zone's time
      const localTime = dateTime.setZone(timeZone.zone_name);
  
      // Add the converted time to the result array
      convertedTimes.push({ timeZone: timeZone.zone_name, localTime: localTime.toISO() });
    });
  
    res.json(convertedTimes);
  };
