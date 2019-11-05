import React from 'react'

const Footer = () => {
  return (
    <footer className='footer' id='footer'>
      <div className='footer__follow'>
        <a href='https://twitter.com/fullstackamr/' target='_blank' rel='noopener noreferrer'>
          <svg>
            <use xlinkHref='./icons.svg#twitter'></use>
          </svg>
        </a>
        <a href='https://github.com/amr-adel/' target='_blank' rel='noopener noreferrer'>
          <svg>
            <use xlinkHref='./icons.svg#github'></use>
          </svg>
        </a>
        <a href='https://www.linkedin.com/in/amr-abdelmoez/' target='_blank' rel='noopener noreferrer'>
          <svg>
            <use xlinkHref='./icons.svg#linkedin'></use>
          </svg>
        </a>
        <a href='https://codepen.io/amr-adel/' target='_blank' rel='noopener noreferrer'>
          <svg>
            <use xlinkHref='./icons.svg#codepen'></use>
          </svg>
        </a>
      </div>
    </footer>
  )
}

export default Footer
