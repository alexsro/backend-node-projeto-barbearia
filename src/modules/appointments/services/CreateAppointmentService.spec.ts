import AppError from 'shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '2154164564157',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create two appointments on the same date/time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmendDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmendDate,
      provider_id: '2154164564157',
    });

    expect(
      createAppointment.execute({
        date: appointmendDate,
        provider_id: '2154164564157',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
