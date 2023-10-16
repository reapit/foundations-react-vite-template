import { PropsWithChildren } from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { ReapitConnectBrowserSession } from '@reapit/connect-session'
import axios from 'axios'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PlatformGet, usePlatformGet } from '../use-platform-get'
import { MemoryRouter } from 'react-router'

jest.mock('axios', () => ({
  get: jest.fn(),
}))

jest.mock('../../use-connect-session', () => ({
  useConnectSession: () =>
    ({
      connectSession: jest.fn(() => ({
        accessToken: 'SOME_TOKEN',
      })),
    } as unknown as ReapitConnectBrowserSession),
}))

jest.mock('@reapit/elements', () => ({
  useSnack: jest.fn(() => ({
    success: mockSuccess,
    error: mockError,
  })),
}))

const mockData = {
  someData: {
    someKey: 'someValue',
  },
}
const mockSuccess = jest.fn()
const mockError = jest.fn()
const mockAxios = axios.get as unknown as jest.Mock

import.meta.env.VITE_PLATFORM_API_URL = 'https://platform.reapit.cloud'

const createWrapper = () => {
  const queryClient = new QueryClient()
  const Wrapper: PropsWithChildren<any> = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  )

  return Wrapper
}

describe('usePlatformGet', () => {
  it('should correctly set loading, fetch data, render a success message and refresh', async () => {
    mockAxios.mockReturnValue({
      data: mockData,
    })

    const { result, waitForNextUpdate } = renderHook<{}, PlatformGet<typeof mockData>>(
      () =>
        usePlatformGet<typeof mockData>({
          path: '/foo/bar',
          headers: {
            foo: 'bar',
          },
          queryParams: {
            baz: 'bat',
          },
          successMessage: 'Success',
          errorMessage: 'Error',
          fetchWhenTrue: [true],
        }),
      {
        wrapper: createWrapper(),
      },
    )
    expect(result.current[0]).toBeNull()
    expect(result.current[1]).toBe(true)

    await waitForNextUpdate()

    expect(mockAxios).toHaveBeenCalledWith('https://platform.reapit.cloud/foo/bar?baz=bat', {
      headers: {
        Authorization: 'Bearer SOME_TOKEN',
        'Content-Type': 'application/json',
        'api-version': 'latest',
        foo: 'bar',
      },
    })

    expect(mockAxios).toHaveBeenCalledTimes(1)

    expect(mockSuccess).toHaveBeenCalledWith('Success')
    expect(mockError).not.toHaveBeenCalled()

    expect(result.current[0]).toEqual(mockData)
    expect(result.current[1]).toEqual(false)
    expect(result.current[2]).toEqual(null)

    const refresh = result.current[3]

    refresh()

    await waitForNextUpdate()

    expect(mockAxios).toHaveBeenCalledTimes(2)
  })

  it('should correctly handle an error', async () => {
    mockAxios.mockImplementation(
      jest.fn(() => {
        throw new Error('Error')
      }),
    )

    const { result, waitForNextUpdate } = renderHook<{}, PlatformGet<typeof mockData>>(
      () =>
        usePlatformGet<typeof mockData>({
          path: '/foo/bar',
          headers: {
            foo: 'bar',
          },
          queryParams: {
            baz: 'bat',
          },
          successMessage: 'Success',
          errorMessage: 'Error',
          fetchWhenTrue: [true],
        }),
      {
        wrapper: createWrapper(),
      },
    )
    expect(result.current[0]).toBeNull()
    expect(result.current[1]).toBe(true)

    await waitForNextUpdate({ timeout: 5000 })

    expect(mockError).toHaveBeenCalled()

    expect(result.current[0]).toBeNull()
    expect(result.current[1]).toEqual(false)
    expect(result.current[2]).toEqual('Error')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
})
