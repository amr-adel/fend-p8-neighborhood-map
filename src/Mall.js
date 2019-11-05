import React from 'react'
import fallbackImg from './images/fs_fallback.jpg'

const Mall = ({ mall, setSelected, isSelected }) => {
  const handleClick = () => {
    if (!isSelected) setSelected(mall)
  }

  const fetchFourSquare = id => {
    fetch(`https://api.foursquare.com/v2/venues/${id}?client_id=N0UR5Z3XKXDNY4GWMBV4H4J0VZIHDCKLUZIZ0U4RBNLAE1CG&client_secret=LVDZ0NKPQVY1SMUFSVJJT02ARZOJXWUFMIJ1AZ0ACSLMKNHR&v=20180620`)
      .then(res => res.json())
      .then(data => detailsOutput(data))
      .catch(err => alert(`Unable to get data from FourSquare (${err})`))
  }

  const detailsOutput = details => {
    if (details.response.venue) {
      const { bestPhoto, name, ratingColor, rating, location, likes, canonicalUrl, id } = details.response.venue

      const markup = `
                <img class="photo" src="${bestPhoto ? `${bestPhoto.prefix}500x300${bestPhoto.suffix}` : fallbackImg}" alt="${name}" onload="this.parentElement.parentElement.scrollIntoView({behavior: 'smooth'})">
                ${rating ? `<div class="rating" style="color: #${ratingColor};">${rating}</div>` : ''}
                <div class="address"><svg><use xlink:href="./icons.svg#marker"></use></svg>${location.formattedAddress[0]}</div>
                <div class="status"><svg><use xlink:href="./icons.svg#like"></use></svg>Liked by ${likes.count} user</div>
                <a class="link" href="${canonicalUrl}" target="_blank" rel="noopener noreferrer">More on FourSquare<svg><use xlink:href="./icons.svg#link"></use></svg></a>
            `

      document.querySelector(`#fs${id} .details`).innerHTML = markup
    } else {
      alert(`Unable to get details from FourSquare (${details.meta.errorDetail})`)
    }
  }

  // if (isSelected) fetchFourSquare(mall.id)

  return (
    <li className={`place${isSelected ? ' selected' : ''}`} role='button' tabIndex='0' id={`fs${mall.id}`} onClick={e => handleClick()} onKeyPress={e => handleClick()}>
      <h4 className='name'>{mall.name}</h4>
      <span className='close' aria-label='Close' role='button' tabIndex='0' onClick={e => setSelected(null)}>
        X
      </span>
      <div className='details'>Loading mall details...</div>
    </li>
  )
}

export default Mall
