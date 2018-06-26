import React, { Component } from 'react';

class ListPlaces extends Component {

    filter(query) {
        this.props.filter(query)

        this.hideInfo()
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
            .then(data => this.detailsOutput(data.response))
    }

    detailsOutput(details) {
        setTimeout(() => {
            document.querySelector(`#fs${details.venue.id} .details`).innerHTML = `
            <img class="photo" src="${details.venue.bestPhoto.prefix}500x300${details.venue.bestPhoto.suffix}" alt="${details.venue.name}">
            <div class="rating" style="color: #${details.venue.ratingColor};">${details.venue.rating}</div>
            <div class="address">${details.venue.location.formattedAddress[0]}</div>
            <div class="status">Liked by ${details.venue.likes.count} user</div>
            <a class="link" href="${details.venue.canonicalUrl}" target="_blank">More on FourSquare</a>
            `
        }, 500);

    }

    componentDidUpdate() {

        if (this.props.selected !== null) {

            this.hideInfo()

            document.getElementById('fs' + this.props.selected.fsId).classList.add('selected')

            this.fetchFourSquare(this.props.selected.fsId)

        }
    }

    render() {

        return (
            <section className="sidebar">
                <header className="header">
                    <div className="brand">
                        <h1>Eg-Shopping</h1>
                    </div>
                </header>

                <input
                    type="text"
                    className="filter"
                    placeholder="Filter Places"
                    onChange={e => this.filter(e.target.value)}
                />

                <ol className="places">
                    {this.props.filteredMalls.map(mall => (
                        <li
                            key={mall.fsId}
                            className="place"
                            id={`fs${mall.fsId}`}
                            onClick={() => this.props.showInfo(mall)}
                        >

                            <h4 className="name">{mall.name}</h4>
                            <div className="details">Loading mall details...</div>

                        </li>
                    ))}
                </ol>

                <footer className="footer">FOOTER</footer>

            </section>
        );
    }
}

export default ListPlaces;
