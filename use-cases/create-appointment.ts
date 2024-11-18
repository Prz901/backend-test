import { Appointment } from "../entities/appointment";
import { AppointmentsRepository } from "../repositories/appointments-repository";

interface CreateAppointmentRequest {
  customer: string;
  startsAt: Date;
  endAt: Date;
}

type CreateAppointmentResponse = Appointment

// Geralmente um useCases so tem somente um metodo de execução ele recebe algo de devolve algo.
export class CreateAppointment {

  constructor(
    private appointmentRepository: AppointmentsRepository
  ) {

  }


  async execute({ customer, startsAt, endAt }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const overLappingAppointment = await this.appointmentRepository.findOverlappingAppointment(startsAt, endAt)

    if (overLappingAppointment) {
      throw new Error("Another appointment overlaps this appointment dates")
    }

    const appoiment = new Appointment({
      customer, startsAt, endAt
    })

    await this.appointmentRepository.create(appoiment)


    return appoiment
  }
}