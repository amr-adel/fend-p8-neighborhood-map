import React, { Component } from 'react';

class ListPlaces extends Component {

    filter(query) {
        const { filter, selectMall } = this.props

        filter(query)

        selectMall(null)
    }

    hideInfo() {
        let selected = document.getElementsByClassName('selected')

        if (selected.length !== 0) {
            selected[0].classList.remove('selected')
        }
    }

    fetchFourSquare(id) {
        fetch(`https://api.foursquare.com/v2/venues/${id}?client_id=N0UR5Z3XKXDNY4GWMBV4H4J0VZIHDCKLUZIZ0U4RBNLAE1CG&client_secret=LVDZ0NKPQVY1SMUFSVJJT02ARZOJXWUFMIJ1AZ0ACSLMKNHR&v=20180620`)
            .then(res => res.json())
            .then(data => this.detailsOutput(data))
            .catch(err => alert(`Unable to get data from FourSquare (${err})`))
    }

    detailsOutput(details) {
        if (details.response.venue) {

            const { bestPhoto, name, ratingColor, rating, location, likes, canonicalUrl, id } = details.response.venue

            const markup = `
                <img class="photo" src="${bestPhoto.prefix}500x300${bestPhoto.suffix}" alt="${name}">
                <div class="rating" style="color: #${ratingColor};">${rating}</div>
                <div class="address"><svg><use xlink:href="./icons.svg#marker"></use></svg>${location.formattedAddress[0]}</div>
                <div class="status"><svg><use xlink:href="./icons.svg#like"></use></svg>Liked by ${likes.count} user</div>
                <a class="link" href="${canonicalUrl}" target="_blank" rel="noopener noreferrer">More on FourSquare<svg><use xlink:href="./icons.svg#link"></use></svg></a>
            `

            document.querySelector(`#fs${id} .details`).innerHTML = markup

        } else {
            alert(`Unable to get details from FourSquare (${details.meta.errorDetail})`)
        }

    }

    componentDidUpdate(prevProps) {
        const { selected } = this.props

        if (prevProps.selected === selected) {
            return false
        } else {
            this.hideInfo()

            if (selected !== null) {

                this.fetchFourSquare(selected.fsId)

                document.getElementById('fs' + selected.fsId).classList.add('selected')
            }
        }
    }


    selectMall(mall, target) {
        const { selected, selectMall } = this.props

        if (target === 'SPAN') {
            selectMall(null)
        } else if (selected === mall) {
            return false
        } else {
            selectMall(mall)
        }
    }

    render() {
        const { filteredMalls } = this.props

        return (
            <section className="sidebar">
                <header className="header">
                    <div className="brand">
                        <h1><svg className="logo"><use xlinkHref="./icons.svg#bag"></use></svg>Malls<span>Of</span>Cairo</h1>
                    </div>
                </header>

                <input
                    type="text"
                    className="filter"
                    placeholder="Filter Places"
                    aria-label="Filter"
                    onChange={e => this.filter(e.target.value)}
                />

                <ol className="places">
                    {filteredMalls.length > 0 ?
                        filteredMalls.map(mall => (
                            <li
                                key={mall.fsId}
                                className="place"
                                role="button"
                                tabIndex="0"
                                id={`fs${mall.fsId}`}
                                onClick={(e) => this.selectMall(mall, e.target.tagName)}
                                onKeyPress={(e) => this.selectMall(mall, e.target.tagName)}
                            >

                                <h4 className="name">{mall.name}</h4>
                                <span className="close" aria-label="Close" role="button" tabIndex="0" >X</span>
                                <div className="details">Loading mall details...</div>

                            </li>
                        ))
                        : <li className="place" key="no-match">
                            <h4 className="name">Unfortunately, your keyword doesn't match any of the listed malls.</h4>
                        </li>
                    }
                </ol>

                <footer className="footer" id="footer">
                    <div className="footer__follow">
                        <a href="https://twitter.com/fullstackamr/" target="_blank" rel="noopener noreferrer">
                            <svg>
                                <use xlinkHref="./icons.svg#twitter"></use>
                            </svg>
                        </a >
                        <a href="https://github.com/amr-adel/" target="_blank" rel="noopener noreferrer">
                            <svg>
                                <use xlinkHref="./icons.svg#github"></use>
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/in/amr-abdelmoez/" target="_blank" rel="noopener noreferrer">
                            <svg>
                                <use xlinkHref="./icons.svg#linkedin"></use>
                            </svg>
                        </a>
                        <a href="https://codepen.io/amr-adel/" target="_blank" rel="noopener noreferrer">
                            <svg>
                                <use xlinkHref="./icons.svg#codepen"></use>
                            </svg>
                        </a>
                    </div >
                </footer >

            </section>
        );
    }
}

export default ListPlaces;
