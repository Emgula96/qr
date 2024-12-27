export const testSession1 = {
  id: 58,
  master_event_id: 75,
  event_type: 'instructor_led',
  modality: 'in_person',
  details: 'Session event to be used in demonstration meeting.',
  contact_person: 'John Gilliland',
  instructors: [
    {
      first_name: 'John',
      last_name: 'Doe',
    },
  ],
  event_dates: [
    {
      id: 115,
      event_date: '2024-12-17',
      start_time: '13:00:00',
      end_time: '14:00:00',
      room: {
        id: 1,
        building: {
          id: 1,
          name: 'Region 4 Education Service Center',
        },
        name: 'Training session 1',
        label: 'ESC-1',
      },
    },
    {
      id: 116,
      event_date: '2024-12-17',
      start_time: '14:00:00',
      end_time: '15:00:00',
      room: {
        id: 1,
        building: {
          id: 1,
          name: 'Region 4 Education Service Center',
        },
        name: 'Training session 2',
        label: 'ESC-1',
      },
    },
    {
      id: 117,
      event_date: '2024-12-17',
      start_time: '15:00:00',
      end_time: '16:00:00',
      room: {
        id: 1,
        building: {
          id: 1,
          name: 'Region 4 Education Service Center',
        },
        name: 'Training session 3',
        label: 'ESC-1',
      },
    },
  ],
  confirmation_comments: 'confirmed',
  evaluation_type_id: 1,
  certificate_type_id: 2,
  fee: '10.00',
  capacity: 10,
  late_threshold: 14,
};

export const testSession2 = {
  id: 59,
  master_event_id: 76,
  event_type: 'instructor_led',
  modality: 'in_person',
  details: 'Second demonstration session with multiple time slots.',
  contact_person: 'Jane Smith',
  instructors: [
    {
      first_name: 'Jane',
      last_name: 'Smith',
    },
  ],
  event_dates: [
    {
      id: 118,
      event_date: '2024-12-17',
      start_time: '09:00:00',
      end_time: '10:00:00',
      room: {
        id: 2,
        building: {
          id: 1,
          name: 'Region 4 Education Service Center',
        },
        name: 'Training Room Two',
        label: 'ESC-2',
      },
    },
    {
      id: 119,
      event_date: '2024-12-17',
      start_time: '10:00:00',
      end_time: '11:00:00',
      room: {
        id: 2,
        building: {
          id: 1,
          name: 'Region 4 Education Service Center',
        },
        name: 'Training Room Two',
        label: 'ESC-2',
      },
    },
    {
      id: 120,
      event_date: '2024-12-17',
      start_time: '11:00:00',
      end_time: '12:00:00',
      room: {
        id: 2,
        building: {
          id: 1,
          name: 'Region 4 Education Service Center',
        },
        name: 'Training Room Two',
        label: 'ESC-2',
      },
    },
  ],
  confirmation_comments: 'confirmed',
  evaluation_type_id: 1,
  certificate_type_id: 2,
  fee: '15.00',
  capacity: 15,
  late_threshold: 14,
};
