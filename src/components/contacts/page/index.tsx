import { FC } from 'react'
import { Navigate, Routes as Router, useLocation, useNavigate, useParams } from 'react-router'
import { Route } from 'react-router-dom'
import {
  Button,
  elHFull,
  elMb5,
  elMb9,
  elPb11,
  FlexContainer,
  Icon,
  PageContainer,
  SecondaryNav,
  SecondaryNavContainer,
  SecondaryNavItem,
  SmallText,
  Title,
} from '@reapit/elements'
import { CONTACTS_ROUTES } from '../routes'
import { ContactsList } from '../list'
import { ContactsNew } from '../new'
import { ContactsEdit } from '../edit'
import { cx } from '@linaria/core'
import { navigateRoute, openNewPage } from '../../../utils/navigate'

const { CONTACTS_LIST, CONTACTS_NEW } = CONTACTS_ROUTES

export const ContactsPage: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { '*': params } = useParams<'*'>()
  const { pathname } = location
  const isDetail = !pathname.includes(CONTACTS_LIST) && !pathname.includes(CONTACTS_NEW)
  const desktopContactCode = window['__REAPIT_MARKETPLACE_GLOBALS__']?.cntCode

  if (desktopContactCode && !window.location.pathname.includes(desktopContactCode)) {
    window['__REAPIT_MARKETPLACE_GLOBALS__'].cntCode = null
    return <Navigate to={`${desktopContactCode}/view`} replace />
  }

  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        <Title>Contacts</Title>
        <SecondaryNav className={elMb9}>
          <SecondaryNavItem onClick={navigateRoute(navigate, CONTACTS_LIST)} active={pathname.includes('list')}>
            List
          </SecondaryNavItem>
          <SecondaryNavItem onClick={navigateRoute(navigate, CONTACTS_NEW)} active={pathname.includes('new')}>
            New
          </SecondaryNavItem>
          {isDetail && params && (
            <SecondaryNavItem onClick={navigateRoute(navigate, params)} active={isDetail}>
              Details
            </SecondaryNavItem>
          )}
        </SecondaryNav>
        <Icon className={elMb5} icon="leadGenerationInfographic" iconSize="large" />
        <SmallText hasGreyText>
          This app provides the full search, view, edit and delete capabilities for your contacts.
        </SmallText>
        <SmallText hasGreyText>For more information, please click the link below.</SmallText>
        <Button className={elMb5} intent="neutral" onClick={openNewPage('')}>
          Docs
        </Button>
      </SecondaryNavContainer>
      <PageContainer className={cx(elHFull, elPb11)}>
        <Router>
          <Route path=":contactId/*" element={<ContactsEdit />} />
          <Route path="list" element={<ContactsList />} />
          <Route path="new" element={<ContactsNew />} />
        </Router>
      </PageContainer>
    </FlexContainer>
  )
}

export default ContactsPage
