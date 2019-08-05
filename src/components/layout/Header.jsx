import React from 'react'
import styled from 'styled-components'
import {NavLink} from 'react-router-dom'

const HeaderWrapper = styled.header`
  height: 80px;
  border-bottom: 1px solid #333;
`

const Logo = styled.span`
  font-size: 36px;
`

const SiteTitle = styled.span`
  font-size: 24px;
  font-weight: bold;
`

const Header = props => <HeaderWrapper>
  <Logo>¿</Logo> <SiteTitle>Inside Wellbeing</SiteTitle>{' '}
  <NavLink to='/'>Home</NavLink> |{' '}
  <NavLink to='/blog'>Blog</NavLink>
</HeaderWrapper>

export default Header
