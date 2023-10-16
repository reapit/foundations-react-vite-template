import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import {
  Button,
  ButtonGroup,
  elMb11,
  elMb7,
  FormLayout,
  InputGroup,
  InputWrap,
  Label,
  Loader,
  Pagination,
  PersistentNotification,
  StatusIndicator,
  Table,
  Title,
  ToggleRadio,
  useModal,
} from '@reapit/elements'
import debounce from 'just-debounce-it'
import { useForm, UseFormWatch } from 'react-hook-form'
import { ContactModel, ContactModelPagedResult, UpdateContactModel } from '@reapit/foundations-ts-definitions'
import { useNavigate } from 'react-router'
import { UpdateFunction, usePlatformGet, usePlatformUpdate } from '../../../hooks'
import { combineAddress } from '../../../utils/combine-address'
import { combineName } from '../../../utils/combine-name'
import { ErrorBoundary } from '../../../utils/error-boundary'
import { navigateRoute } from '../../../utils/navigate'

export type ContactFilterValues = {
  name?: string
  address?: string
  email?: string
  active?: string
}

export const handleOpenModal =
  (
    openModal: () => void,
    contact: ContactModel,
    setContactToToggleActive: Dispatch<SetStateAction<ContactModel | null>>,
  ) =>
  () => {
    openModal()
    setContactToToggleActive(contact)
  }

export const handleToggleActiveContact =
  (
    closeModal: () => void,
    contactsRefresh: () => void,
    toggleActiveContact: UpdateFunction<UpdateContactModel, boolean>,
    setContactToToggleActive: Dispatch<SetStateAction<ContactModel | null>>,
    active?: boolean,
  ) =>
  async () => {
    const deleted = await toggleActiveContact({ active: !active })

    if (deleted) {
      closeModal()
      contactsRefresh()
      setContactToToggleActive(null)
    }
  }

export const handleSetContactsFilters =
  (setContactFilters: Dispatch<SetStateAction<ContactFilterValues>>, watch: UseFormWatch<ContactFilterValues>) =>
  () => {
    const subscription = watch(debounce(setContactFilters, 500))
    return () => subscription.unsubscribe()
  }

export const ContactsList: FC = () => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [contactToToggleActive, setContactToToggleActive] = useState<ContactModel | null>(null)
  const [contactFilters, setContactFilters] = useState<ContactFilterValues>({})
  const navigate = useNavigate()
  const { Modal, openModal, closeModal } = useModal()

  const { register, watch } = useForm<ContactFilterValues>({
    mode: 'onChange',
  })

  useEffect(handleSetContactsFilters(setContactFilters, watch), [])

  const [contacts, contactsLoading, , contactsRefresh] = usePlatformGet<ContactModelPagedResult>({
    path: '/contacts',
    queryParams: {
      ...contactFilters,
      pageNumber,
      pageSize: 12,
    },
  })

  const [toggleActiveContact, toggleActiveContactLoading] = usePlatformUpdate<UpdateContactModel, boolean>({
    path: `/contacts/${contactToToggleActive?.id}`,
    method: 'PATCH',
    headers: {
      'if-match': contactToToggleActive?._eTag ?? '',
    },
    successMessage: `Contact successfully ${contactToToggleActive?.active ? 'deactivated' : 'activated'}`,
  })

  return (
    <ErrorBoundary>
      <Title>Contacts List</Title>
      <form>
        <FormLayout className={elMb11}>
          <InputWrap>
            <InputGroup
              {...register('name')}
              label="Contact Name"
              type="search"
              icon="searchSystem"
              placeholder="Search name"
            />
          </InputWrap>
          <InputWrap>
            <InputGroup
              {...register('address')}
              label="Contact Address"
              type="search"
              icon="searchSystem"
              placeholder="Search address"
            />
          </InputWrap>
          <InputWrap>
            <InputGroup
              {...register('email')}
              label="Contact Email"
              type="search"
              icon="searchSystem"
              placeholder="Search email"
            />
          </InputWrap>
          <InputWrap>
            <Label>Active Contacts</Label>
            <ToggleRadio
              {...register('active')}
              hasGreyBg
              options={[
                {
                  id: 'option-active-all',
                  value: '',
                  text: 'All',
                  isChecked: true,
                },
                {
                  id: 'option-active-true',
                  value: 'true',
                  text: 'Active',
                  isChecked: false,
                },
                {
                  id: 'option-active-false',
                  value: 'false',
                  text: 'Inactive',
                  isChecked: false,
                },
              ]}
            />
          </InputWrap>
        </FormLayout>
      </form>
      {contactsLoading && <Loader />}
      {contacts?._embedded?.length ? (
        <>
          <Table
            className={elMb11}
            rows={contacts._embedded.map((contact) => {
              const { id, title, forename, surname, email, primaryAddress, mobilePhone, active } = contact
              return {
                cells: [
                  {
                    label: 'Contact Name',
                    value: combineName(title, forename, surname),
                    icon: 'applicantInfographic',
                    cellHasDarkText: true,
                    narrowTable: {
                      showLabel: true,
                    },
                  },
                  {
                    label: 'Contact Email',
                    icon: 'mailInfographic',
                    value: email ?? '-',
                    narrowTable: {
                      showLabel: true,
                    },
                  },
                  {
                    label: 'Contact Mobile Phone',
                    icon: 'phoneInfographic',
                    value: mobilePhone ?? '-',
                    narrowTable: {
                      showLabel: true,
                    },
                  },
                  {
                    label: 'Contact Address',
                    icon: 'houseInfographic',
                    value: combineAddress(primaryAddress),
                    narrowTable: {
                      showLabel: true,
                    },
                  },
                  {
                    label: 'Contact Active',
                    value: (
                      <>
                        <StatusIndicator intent={active ? 'success' : 'danger'} /> {active ? 'Active' : 'Inactive'}
                      </>
                    ),
                    narrowTable: {
                      showLabel: true,
                    },
                  },
                ],
                expandableContent: {
                  content: (
                    <>
                      <ButtonGroup alignment="center">
                        <Button onClick={navigateRoute(navigate, `/contacts/${id}/view`)} intent="primary">
                          View Contact
                        </Button>
                        <Button onClick={navigateRoute(navigate, `/contacts/${id}/personal`)} intent="secondary">
                          Edit Contact
                        </Button>
                        <Button
                          onClick={handleOpenModal(openModal, contact, setContactToToggleActive)}
                          intent={active ? 'danger' : 'secondary'}
                        >
                          {active ? 'Deactivate' : 'Activate'}
                        </Button>
                      </ButtonGroup>
                    </>
                  ),
                },
              }
            })}
          />
          <div className={elMb11}>
            <Pagination
              callback={setPageNumber}
              currentPage={pageNumber}
              numberPages={Math.ceil((contacts?.totalCount ?? 1) / 12)}
            />
          </div>
          <Modal title="Deactivate Contact">
            <PersistentNotification
              className={elMb7}
              isExpanded
              isFullWidth
              isInline
              intent={contactToToggleActive?.active ? 'danger' : 'secondary'}
            >
              Are you sure you want to {contactToToggleActive?.active ? 'deactivate' : 'activate'} this contact?
            </PersistentNotification>
            <ButtonGroup alignment="center">
              <Button onClick={closeModal} intent="low">
                Cancel
              </Button>
              <Button
                onClick={handleToggleActiveContact(
                  closeModal,
                  contactsRefresh,
                  toggleActiveContact,
                  setContactToToggleActive,
                  contactToToggleActive?.active,
                )}
                disabled={toggleActiveContactLoading}
                intent={contactToToggleActive?.active ? 'danger' : 'secondary'}
              >
                {contactToToggleActive?.active ? 'Deactivate' : 'Activate'}
              </Button>
            </ButtonGroup>
          </Modal>
        </>
      ) : !contactsLoading && contacts && !contacts._embedded?.length ? (
        <PersistentNotification className={elMb11} isInline isExpanded isFullWidth intent="secondary">
          No contacts found for your search terms, please try again.
        </PersistentNotification>
      ) : null}
    </ErrorBoundary>
  )
}
