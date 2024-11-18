// Estou usando a lib do vitest para fazer os testes unitarios.

import { test, expect } from 'vitest'
import { Appointment } from './appointment'
import { getFutureDate } from '../tests/utils/get-future-date'

// criando a primeira parte dos testes. 
test("Create an appointment", () => {
  const startsAt = getFutureDate("2022-08-10")
  const endAt = getFutureDate("2022-08-11")

  const appointment = new Appointment({
    customer: 'John Doe',
    startsAt,
    endAt,
  })

  expect(appointment).toBeInstanceOf(Appointment)
  expect(appointment.customer).toEqual('John Doe')

})

// basicamente esse teste tem que verificar se a pessoa esta tentando criar um appoinment com dia começando hoje e finalizando ontem.
test('cannot create an appoiment with end date before start date', () => {
  const startsAt = getFutureDate('2022-08-10')
  const endAt = getFutureDate('2022-08-09')

  expect(() => {
    return new Appointment({
      customer: 'John Doe',
      startsAt,
      endAt,
    })
  }).toThrow()
})

test('cannot create an appoiment with start date before now', () => {
  const startsAt = new Date()
  const endAt = new Date()

  startsAt.setDate(startsAt.getDate() - 1)
  endAt.setDate(endAt.getDate() + 3)

  expect(() => {
    return new Appointment({
      customer: 'John Doe',
      startsAt,
      endAt,
    })
  }).toThrow()

})