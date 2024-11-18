import { areIntervalsOverlapping } from 'date-fns'

import { Appointment } from "../../entities/appointment";
import { AppointmentsRepository } from "../appointments-repository";

export class InMemoryAppointmentRepository implements AppointmentsRepository {
  public items: Appointment[] = []


  async create(appoiment: Appointment): Promise<void> {
    this.items.push(appoiment)
  }

  async findOverlappingAppointment(startsAt: Date, endAt: Date): Promise<Appointment | null> {
    const overLappingAppointment = this.items.find(appointment => {
      return areIntervalsOverlapping(
        { start: startsAt, end: endAt },
        { start: appointment.startsAt, end: appointment.endAt },
        { inclusive: true }
      )
    })
    if (!overLappingAppointment) {
      return null
    }
    return overLappingAppointment
  }

}