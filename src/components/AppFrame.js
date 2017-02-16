/* @flow */

import React from 'react'
import {
  addNavigationHelpers,
  type NavigationNavigatorProps
} from 'react-navigation/lib/react-navigation.web'
import Link from './Link'

const NavigationLinks = ({navigation, className, reverse}) => {
  let links = navigation.state.routes.map((route, i) => {
    if (route.routeName === 'Home' || route.routeName === 'NotFound') {
      return null
    }
    return (
      <Link
        to={route.routeName}
        className={i === navigation.state.index ? 'active' : ''}
        key={route.routeName}>
        {route.routeName}
      </Link>
    )
  })
  if (reverse) {
    links = links.reverse()
  }
  return (
    <div className={className}>
      {links}
    </div>
  )
}

class AppFrame extends React.Component {
  props: NavigationNavigatorProps
  state = {isMobileMenuOpen: false}
  componentWillReceiveProps (props: NavigationNavigatorProps) {
    if (this.props.navigation.state !== props.navigation.state) {
      this.setState({isMobileMenuOpen: false})
      window.scrollTo(0, 0)
    }
  }
  render () {
    const {navigation, router} = this.props
    const {isMobileMenuOpen} = this.state
    const childNavigation = addNavigationHelpers({
      ...navigation,
      state: navigation.state.routes[navigation.state.index]
    })
    const {state} = navigation
    const ScreenView = router.getComponentForRouteName(state.routes[state.index].routeName)
    const {routes, index} = state
    const route = routes[index]
    const hasChildNavigation = !!route.routes
    return (
      <div className={`main-app ${isMobileMenuOpen ? 'mobileMenuActive' : ''}`}>

        <nav className='pt-navbar' id='navbar'><div className='inner-navbar'>

          <Link className='pt-navbar-group pt-align-left project-title' to='Home'>
            <h1 className='pt-navbar-heading'>
              React Navigation
            </h1>
          </Link>

          <NavigationLinks navigation={navigation} className='navbuttons' />

          {hasChildNavigation && (
            <span
              className={`pt-icon-properties openMenuButton ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={() => {
                this.setState(s => ({ isMobileMenuOpen: !s.isMobileMenuOpen }))
                window.scrollTo(0, 0)
              }}
            />
          )}

        </div></nav>

        <ScreenView navigation={childNavigation} />
      </div>
    )
  }
}

export default AppFrame
