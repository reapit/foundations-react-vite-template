import { CONTACTS_ROUTES } from '../modules/contacts'
import { LOGIN_ROUTES } from '../modules/login'

export const Routes = {
  HOME: '/',
  ...LOGIN_ROUTES,
  ...CONTACTS_ROUTES,
}
