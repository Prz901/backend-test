export interface AppointmentProps {
  customer: string;
  startsAt: Date;
  endAt: Date;
}


export class Appointment {
  private props: AppointmentProps


  // criação de geters e seters.
  get customer() {
    return this.props.customer
  }

  get startsAt() {
    return this.props.startsAt
  }

  get endAt() {
    return this.props.endAt
  }

  constructor(props: AppointmentProps) {
    const { startsAt, endAt } = props

    if (startsAt <= new Date()) {
      throw new Error("Invalid start date")
    }

    if (endAt <= startsAt) {
      throw new Error("Invalid end date")
    }

    this.props = props
  }

}