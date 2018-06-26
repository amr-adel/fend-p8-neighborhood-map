import React, { Component } from 'react';

class ListPlaces extends Component {

    state = {

    }

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
        // .then(data => console.log(data.response))
    }

    detailsOutput(details) {
        setTimeout(() => {
            document.querySelector(`#fs${details.venue.id} .details`).innerHTML = details.venue.location.formattedAddress[0]
        }, 500);
    }

    componentDidUpdate() {

        if (this.props.selected !== null) {

            this.hideInfo()

            document.getElementById('fs' + this.props.selected.fsId).classList.add('selected')

            // this.fetchFourSquare(this.props.selected.fsId)

            document.querySelector(`#fs${this.props.selected.fsId} .details`).innerHTML = `
                <img class="photo" src="https://irs1.4sqi.net/img/general/500x300/63892328_N0A_9qgk0N30lHiqDWIRtNb-0YfO84BIxHc9SP7h4rY.jpg" alt="Alternate text">
                <div class="rating" style="color: #00B551;">9.3</div>
                <div class="address">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
                <div class="status">Open until 1:00 AM</div>
                <a class="link" href="https://foursquare.com/v/foursquare-hq/4ab7e57cf964a5205f7b20e3" target="_blank">More on FourSquare</a>
                `
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
