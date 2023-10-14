import { FC } from 'react'
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import { Routes as RoutePaths } from '../constants/routes'
import PrivateRouteWrapper from './private-route-wrapper'
import { LoginModule } from '../modules/login'
import { ContactsModule } from '../modules/contacts'

export const RoutesComponent: FC = () => (
  <>
    <Routes>
      <Route path={RoutePaths.LOGIN} element={<LoginModule />} />
      <Route
        path={RoutePaths.CONTACTS}
        element={
          <PrivateRouteWrapper>
            <ContactsModule />
          </PrivateRouteWrapper>
        }
      />
      <Route
        path="/"
        index
        element={<Navigate to={`${RoutePaths.CONTACTS_LIST}${window.location.search}`} replace />}
      />
    </Routes>
  </>
)

export const Router: FC = () => (
  <BrowserRouter>
    <RoutesComponent />
  </BrowserRouter>
)
