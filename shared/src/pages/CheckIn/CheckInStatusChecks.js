export const dummySession = {
  id: 58,
  master_event_id: 75,
  event_type: 'instructor_led',
  modality: 'in_person',
  details:
    'Session event to be used in demonstration meeting. This session will be used to test the check-in and room schedule APIs.',
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
      event_date: '2024-12-26',
      start_time: '13:00:00',
      end_time: '23:00:00',
      room: {
        id: 1,
        building: {
          id: 1,
          name: 'Region 4 Education Service Center',
        },
        name: 'Training Room One',
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
