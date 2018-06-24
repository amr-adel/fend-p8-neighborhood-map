import React, { Component } from 'react';

class ListPlaces extends Component {

    render() {
        return (
            <section className="sidebar">
                <header className="header">
                    <div className="brand">
                        <h1>Eg-Shopping</h1>
                    </div>
                </header>

                <input type="text" className="filter" placeholder="Filter Places" onChange={e => this.props.filter(e.target.value)} />

                <ol className="places">
                    {this.props.filteredMalls.map(mall => (
                        <li className="place" key={mall.gmapId} onClick={() => this.props.showInfo(mall)} >
                            {mall.name}
                        </li>
                    ))}
                </ol>

                <footer className="footer">FOOTER</footer>

            </section>
        );
    }
}

export default ListPlaces;
