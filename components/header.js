import React from 'react';
import Link from 'next/link';

const Header = ({ currentUser }) => {
  // array that is used to display sign up/in/out buttons
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' }
  ]
    .filter(linkConfig => linkConfig)
    .map(({ label, href }) => {
      return <li key={href} className='nav-item'>
        <Link href={href}>
          <a className='nav-link'>{label}</a>
        </Link>
      </li>
    })
  return (
    <nav className='navbar navbar-light bg-light'>
      {/* the link component is to be used inside next.js not just href a */}
      <Link href='/'>
        <a className='navbar-brand'>GetTicket</a>
      </Link>

      <div className='d-flex justify-content-end'>
        <ul className='nav d-flex align-items-center'>
          {links}
        </ul>
      </div>
    </nav>
  )
}

export default Header