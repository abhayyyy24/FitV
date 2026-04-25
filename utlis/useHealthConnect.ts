import {
  initialize,
  requestPermission,
  readRecords,
  RecordType,
} from 'react-native-health-connect';

export const readSampleData = async () => {
  // Step 1: Initialize Health Connect
  const isInitialized = await initialize();
  console.log('Health Connect initialized:', isInitialized);

  // Step 2: Request permission to read multiple data types
  const grantedPermissions = await requestPermission([
    { accessType:'read',recordType:'HeartRate' as RecordType},
    { accessType:'read',recordType:'Steps' as RecordType},
    { accessType: 'read', recordType: 'ActiveCaloriesBurned' as RecordType },
    { accessType: 'read', recordType: 'OxygenSaturation' as RecordType },
    { accessType: 'read', recordType: 'SleepSession' as RecordType },
    
  ]);
  console.log('Permissions granted:', grantedPermissions);

  // Step 3: Create dynamic time range for past 24 hours
  const endTime = new Date().toISOString();
  const startTime = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  // Step 4: Read Active Calories
  const calories = await readRecords('ActiveCaloriesBurned', {
    timeRangeFilter: {
      operator: 'between',
      startTime,
      endTime,
    },
  });
  console.log('Calories burned:', calories);

  // Step 5: Read Blood Oxygen (SpO2)
  const oxygen = await readRecords('OxygenSaturation', {
    timeRangeFilter: {
      operator: 'between',
      startTime,
      endTime,
    },
  });
  console.log('Blood Oxygen (SpO2):', oxygen);

  // Step 6: Read Sleep data
  const sleep = await readRecords('SleepSession', {
    timeRangeFilter: {
      operator: 'between',
      startTime,
      endTime,
    },
  });
  console.log('Sleep sessions:', sleep);

  const steps = await readRecords('Steps', {
    timeRangeFilter: {
      operator: 'between',
      startTime,
      endTime,
    },
  });
  console.log('Sleep sessions:', steps);

  const heartrate = await readRecords('HeartRate', {
    timeRangeFilter: {
      operator: 'between',
      startTime,
      endTime,
    },
  });
  console.log('HeartRate:', heartrate);

  return{
    calories,
    oxygen,
    sleep,
    steps,
    heartrate
  }
};

