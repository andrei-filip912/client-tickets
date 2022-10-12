import React from 'react';
import Link from 'next/link';

const Header = ({ currentUser }) => {
  // array that is used to display sign up/in/out buttons
  const authLinks = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' }
  ]
    .filter(linkConfig => linkConfig)
    .map(({ label, href }) => {
      return <li key={href} className='nav-item'>
        <Link href={href}>
          <a className='nav-link text-white'>{label}</a>
        </Link>
      </li>
    });

  const ticketLinks = [
    currentUser && { label: 'Sell Tickets', href: '/tickets/new' },
    currentUser && { label: 'My Orders', href: '/orders' }
  ]
    .filter(linkConfig => linkConfig)
    .map(({ label, href }) => {
      return <li key={href} className='nav-item'>
        <Link href={href}>
          <a className='nav-link text-white'>{label}</a>
        </Link>
      </li>
    });

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
      <div className='container d-flex'>

          {/* the link component is to be used inside next.js not just href a */}
          <Link href='/'>
            <a className='navbar-brand'>GetTicket</a>
          </Link>

          <ul className='me-auto nav'>
            {ticketLinks}
          </ul>

          <ul className='nav'>
            {authLinks}
          </ul>

      </div>
    </nav>


  )
}

export default Header