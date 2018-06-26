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

    componentDidUpdate() {

        if (this.props.selected !== null) {

            this.hideInfo()

            document.getElementById(this.props.selected.gmapId).classList.add('selected')
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
                            key={mall.gmapId}
                            className="place"
                            id={mall.gmapId}
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
