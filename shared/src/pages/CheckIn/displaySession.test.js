import displaySession from './displaySession';

// Sample session data to use in tests
const dummySessions = [
  {
    id: 59,
    master_event_id: 76,
    event_type: 'instructor_led',
    modality: 'in_person',
    details: 'All-day session with no late threshold',
    contact_person: 'Jane Doe',
    instructors: 'Jane',
    event_dates: [
      {
        id: 116,
        event_date: '2024-09-15',
        start_time: '09:00:00',
        end_time: '17:00:00',
        room: {
          id: 2,
          building: {
            id: 1,
            name: 'Region 4 Education Service Center',
          },
          name: 'Conference Hall',
          label: 'ESC-CH',
        },
      },
    ],
    confirmation_comments: 'confirmed',
    evaluation_type_id: 1,
    certificate_type_id: 2,
    fee: '50.00',
    capacity: 30,
    late_threshold: 0,
  },
  {
    id: 60,
    master_event_id: 77,
    event_type: 'instructor_led',
    modality: 'online',
    details:
      'Session with start time past current time but within late threshold',
    contact_person: 'Bob Smith',
    instructors: 'Bob',
    event_dates: [
      {
        id: 117,
        event_date: '2024-03-10',
        start_time: '14:00:00',
        end_time: '16:00:00',
        room: null,
      },
    ],
    confirmation_comments: 'confirmed',
    evaluation_type_id: 2,
    certificate_type_id: 1,
    fee: '25.00',
    capacity: 20,
    late_threshold: 15,
  },
];

const newSession = {
  id: 61,
  master_event_id: 78,
  event_type: 'series',
  modality: 'in_person',
  details: 'Afternoon session with a late threshold',
  contact_person: 'Amanda Silva',
  instructors: [
    {
      id: 8,
      username: '8iZYjORjrMe__J_YvKAaJiaqPXk',
      first_name: 'Amanda',
      last_name: 'Silva',
    },
  ],
  event_dates: [
    {
      id: 119,
      event_date: '2024-09-10',
      start_time: '15:30:00',
      end_time: '16:00:00',
      room: {
        id: 3,
        building: {
          id: 2,
          name: 'Region 4 ESC',
        },
        name: 'MCC102',
        label: 'MCC102',
      },
    },
  ],
  confirmation_comments: 'Late threshold test',
  evaluation_type_id: 2,
  certificate_type_id: 2,
  fee: '0.00',
  capacity: 10,
  late_threshold: 60, // 60-minute late threshold
};

describe('displaySession', () => {
  // Test case for Rule 1: If a session is within 30 minutes of starting
  test('should return a session that is within 30 minutes of starting', () => {
    // Mock the current date to be just before the session starts
    jest.useFakeTimers().setSystemTime(new Date('2024-09-15T08:40:00').getTime());

    const result = displaySession(dummySessions);
    expect(result).toEqual(dummySessions[0]); // Expect the session to be returned
  });

  // Test case for Rule 2: If the session is past the late threshold
  test('should skip session that is past the late threshold', () => {
    // Mock the current date to be after the late threshold
    jest.useFakeTimers().setSystemTime(new Date('2024-03-10T14:16:00').getTime());

    const result = displaySession(dummySessions);
    expect(result).toEqual([]); // Expect an empty array because it is past the late threshold
  });

  // Test case for Rule 3: If no sessions are scheduled within 1 hour
  test('should return an empty array when no sessions are scheduled within the next hour', () => {
    // Mock the current date to be 2 hours before any session starts
    jest.useFakeTimers().setSystemTime(new Date('2024-09-15T07:00:00').getTime());

    const result = displaySession(dummySessions);
    expect(result).toEqual([]); // No sessions within the next hour, so expect an empty array
  });

  // Test case for Rule 4: If there is no previous session, return session 1 hour before it starts
  test('should return session information 1 hour before it starts if no previous session exists', () => {
    // Mock the current date to be 1 hour before the session start
    jest.useFakeTimers().setSystemTime(new Date('2024-09-15T08:00:00').getTime());

    const result = displaySession(dummySessions);
    expect(result).toEqual(dummySessions[0]); // Expect the session to be returned 1 hour before start
  });

  // New test for a session in progress and within the late threshold
  test('should return the session that is currently in progress and within the late threshold', () => {
    // Mock the current date to be during the session (3:35 PM)
    jest.useFakeTimers().setSystemTime(new Date('2024-09-10T15:35:00').getTime());

    // Add the new session to the dummySessions array
    const result = displaySession([...dummySessions, newSession]);
    expect(result).toEqual(newSession); // Expect the in-progress session to be returned
  });

  // Reset the fake timers after each test
  afterEach(() => {
    jest.useRealTimers();
  });
});
