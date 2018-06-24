import React, { Component } from 'react';

class ListPlaces extends Component {
    state = {
        malls: [],
        query: ''
    };

    componentDidMount() {
        this.fetchPlaces();
    }

    fetchPlaces() {
        fetch('./places.json')
            .then(res => res.json())
            .then(data => this.setState({ malls: data.malls }))
            .catch(err => console.log(err));
    }

    updateQuery(query) {
        this.setState({ query: query })
    }

    render() {
        return (
            <section className="sidebar">
                <header className="header">
                    <div className="brand">
                        <h1>Eg-Shopping</h1>
                    </div>
                </header>

                <input type="text" className="filter" placeholder="Filter Places" value={this.state.query} onChange={e => this.updateQuery(e.target.value)} />

                <ol className="places">
                    {this.state.malls.filter(mall => mall.name.toLowerCase().indexOf(this.state.query.trim().toLowerCase()) !== -1).map(mall => (
                        <li className="place" key={mall.gmapId}>
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
