import { CONTACTS_ROUTES } from '../components/contacts'
import { LOGIN_ROUTES } from '../components/login'

export const Routes = {
  HOME: '/',
  ...LOGIN_ROUTES,
  ...CONTACTS_ROUTES,
}
