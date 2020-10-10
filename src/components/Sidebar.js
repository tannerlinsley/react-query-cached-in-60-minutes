import React from 'react'
import { Link } from 'react-router-dom'

import { SidebarStyles } from './styled'

export default function Sidebar() {
  return (
    <SidebarStyles>
      <ul>
        <li>
          <Link to="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link to="/blog">
            <a>Blog</a>
          </Link>
        </li>
        <hr />
        <li>
          <Link to="/admin">
            <a>Admin</a>
          </Link>
        </li>
      </ul>
    </SidebarStyles>
  )
}
