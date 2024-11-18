import { Appointment } from "../entities/appointment";

export interface AppointmentsRepository {

  create(appoiment: Appointment): Promise<void>

  findOverlappingAppointment(startsAt: Date, endAt: Date): Promise<Appointment | null>
}