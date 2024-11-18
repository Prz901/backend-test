import { describe, expect, it } from "vitest";
import { CreateAppointment } from "./create-appointment";
import { Appointment } from "../entities/appointment";
import { getFutureDate } from "../tests/utils/get-future-date";
import { InMemoryAppointmentRepository } from "../repositories/in-memory/in-memory-appointments-repository";


describe('Create Appointment', () => {
  it('should be able to create an appointment', () => {
    const startsAt = getFutureDate("2022-08-10")
    const endAt = getFutureDate("2022-08-11")

    const appointmentRepository = new InMemoryAppointmentRepository()
    const createAppointment = new CreateAppointment(appointmentRepository)

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt,
      endAt
    })).resolves.toBeInstanceOf(Appointment)
  })

  it('should not be able to create an appointment with overlapping dates', async () => {
    const startsAt = getFutureDate("2022-08-10")
    const endAt = getFutureDate("2022-08-15")

    const appointmentRepository = new InMemoryAppointmentRepository()
    const createAppointment = new CreateAppointment(appointmentRepository)


    await createAppointment.execute({
      customer: 'John Doe',
      startsAt,
      endAt
    })

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate("2022-08-14"),
      endAt: getFutureDate("2022-08-18")
    })).rejects.toBeInstanceOf(Error)

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate("2022-08-08"),
      endAt: getFutureDate("2022-08-18")
    })).rejects.toBeInstanceOf(Error)
  })

})