import React from 'react'
import List from './List'
import Footer from './Footer'

const Sidebar = props => {
  console.log('Sidebar Rendered')
  return (
    <section className='sidebar'>
      <header className='header'>
        <div className='brand'>
          <h1>
            <svg className='logo'>
              <use xlinkHref='./icons.svg#bag'></use>
            </svg>
          </h1>
        </div>
      </header>

      <List {...props} />

      <Footer />
    </section>
  )
}

export default Sidebar
