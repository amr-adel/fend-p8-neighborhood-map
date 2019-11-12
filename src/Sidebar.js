import React from 'react'
import List from './List'
import Footer from './Footer'

const Sidebar = props => {
  return (
    <section className='sidebar'>
      <header className='header'>
        <div className='brand'>
          <h1>Malls of Cairo</h1>
        </div>
      </header>

      <List {...props} />

      <Footer />
    </section>
  )
}

export default Sidebar
