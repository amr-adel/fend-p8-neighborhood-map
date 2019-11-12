import React from 'react'
import Icon from './Icon'

const Footer = () => {
  return (
    <footer className='footer' id='footer'>
      <div className='footer__follow'>
        <a href='https://twitter.com/fullstackamr/' target='_blank' rel='noopener noreferrer'>
          <Icon name='twitter' />
        </a>
        <a href='https://github.com/amr-adel/' target='_blank' rel='noopener noreferrer'>
          <Icon name='github' />
        </a>
        <a href='https://www.linkedin.com/in/amr-abdelmoez/' target='_blank' rel='noopener noreferrer'>
          <Icon name='linkedin' />
        </a>
        <a href='https://codepen.io/amr-adel/' target='_blank' rel='noopener noreferrer'>
          <Icon name='codepen' />
        </a>
      </div>
    </footer>
  )
}

export default Footer
