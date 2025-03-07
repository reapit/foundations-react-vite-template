import { RoutesComponent } from '../router'
import { Routes as RoutePaths } from '../../constants/routes'
import { render } from '../../scripts/tests'

describe('RoutesComponent', () => {
  it('should match a snapshot for the root path', () => {
    window.location.pathname = '/'
    expect(render(<RoutesComponent />).asFragment())
  })

  it('should match a snapshot for the login', () => {
    window.location.pathname = RoutePaths.LOGIN
    expect(render(<RoutesComponent />).asFragment())
  })

  it('should match a snapshot for the login', () => {
    window.location.pathname = RoutePaths.CONTACTS
    expect(render(<RoutesComponent />).asFragment())
  })
})
