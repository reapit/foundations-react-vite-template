import '@testing-library/jest-dom'
import fetchMock from 'jest-fetch-mock'
import 'jest-location-mock'
import { Config } from '../../types/global'
import MockDate from 'mockdate'

MockDate.set(new Date('2023-01-01'))

Object.defineProperty(import.meta, 'env', {
  value: {
    VITE_CONNECT_CLIENT_ID: 'MOCK_ID',
  } as Config,
})

// jest.mock('@linaria/react', () => {
//   const styled = (tag: any) => {
//     return jest.fn(() => `mock-styled.${tag}`)
//   }
//   return {
//     styled: new Proxy(styled, {
//       get(o, prop) {
//         return o(prop)
//       },
//     }),
//   }
// })

// jest.mock('@linaria/core', () => {
//   const css = (tag: any) => {
//     return `mock-css.${tag}`
//   }

//   const { cx } = jest.requireActual('@linaria/core')

//   return {
//     cx,
//     css,
//   }
// })

fetchMock.enableMocks()
