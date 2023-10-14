import { ContactsList, handleOpenModal, handleToggleActiveContact, handleSetContactsFilters } from '..'
import { usePlatformGet } from '../../../../hooks'
import { mockContactModelPagedResult, mockContactModel } from '../../../../scripts/stubs'
import { render } from '../../../../scripts/tests'

jest.mock('@apps/hooks', () => ({
  usePlatformGet: jest.fn(),
  usePlatformUpdate: jest.fn(() => [jest.fn()]),
}))

const mockUsePlatformGet = usePlatformGet as jest.Mock

describe('ContactsList', () => {
  it('should match a snapshot with data', () => {
    mockUsePlatformGet.mockReturnValue([mockContactModelPagedResult, false])

    expect(render(<ContactsList />)).toMatchSnapshot()
  })

  it('should match a snapshot when loading', () => {
    mockUsePlatformGet.mockReturnValue([null, true])

    expect(render(<ContactsList />)).toMatchSnapshot()
  })

  it('should match a snapshot when not loading but no contact', () => {
    mockUsePlatformGet.mockReturnValue([null, false])

    expect(render(<ContactsList />)).toMatchSnapshot()
  })
})

describe('handleOpenModal', () => {
  it('should correctly open the modal', () => {
    const openModal = jest.fn()
    const contact = mockContactModel
    const setContactToToggleActive = jest.fn()

    const curried = handleOpenModal(openModal, contact, setContactToToggleActive)

    curried()

    expect(openModal).toHaveBeenCalledTimes(1)
    expect(setContactToToggleActive).toHaveBeenCalledWith(contact)
  })
})

describe('handleToggleActiveContact', () => {
  it('should correctly deactivate the contact', async () => {
    const closeModal = jest.fn()
    const contactsRefresh = jest.fn()
    const toggleActiveContact = jest.fn(() => Promise.resolve(true))
    const setContactToToggleActive = jest.fn()

    const curried = handleToggleActiveContact(
      closeModal,
      contactsRefresh,
      toggleActiveContact,
      setContactToToggleActive,
      true,
    )

    await curried()

    expect(closeModal).toHaveBeenCalledTimes(1)
    expect(contactsRefresh).toHaveBeenCalledTimes(1)
    expect(toggleActiveContact).toHaveBeenCalledWith({ active: false })
    expect(setContactToToggleActive).toHaveBeenCalledWith(null)
  })
})

describe('handleSetContactsFilters', () => {
  it('should subscribe to watch', () => {
    const setContactFilters = jest.fn()
    const watch = jest.fn()

    const curried = handleSetContactsFilters(setContactFilters, watch)

    curried()

    expect(watch).toHaveBeenCalledTimes(1)
  })
})
