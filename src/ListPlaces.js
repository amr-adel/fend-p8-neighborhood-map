import React, { Component } from 'react';

class ListPlaces extends Component {

    state = {

    }

    filter(query) {
        this.props.filter(query)

        this.hideInfo()
    }

    showInfo(mall) {
        this.props.showInfo(mall)

        this.hideInfo()

        document.getElementById(mall.gmapId).classList.add('selected')
    }

    hideInfo() {
        let selected = document.getElementsByClassName('selected')

        if (selected.length !== 0) {
            selected[0].classList.remove('selected')
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

                <input type="text" className="filter" placeholder="Filter Places" onChange={e => this.filter(e.target.value)} />

                <ol className="places">
                    {this.props.filteredMalls.map(mall => (
                        <li className="place" key={mall.gmapId} id={mall.gmapId} onClick={() => this.showInfo(mall)} >
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
