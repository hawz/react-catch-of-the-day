import React from 'react'

import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import Fish from './Fish'

import sampleFishes from '../sample-fishes'

class App extends React.Component {

  state = {
    fishes: {},
    orders: {}
  }


  addFish = (fish) => {
    // update our state
    const fishes = { ...this.state.fishes }
    // add in our new fish
    const timeStamp = Date.now()
    fishes[`fish-${timeStamp}`] = fish
    // set state
    this.setState({ fishes })
  }

  loadSamples = () => {
    this.setState({
      fishes: sampleFishes
    })
  }

  addToOrder = (key) => {
    // take a copy of our state
    const orders = { ...this.state.orders }
    // update or add the new number of fish ordered
    orders[key] = orders[key] + 1 || 1;
    // update the state
    this.setState({ orders })
  }

  render() {

    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {Object
              .keys(this.state.fishes)
              .map(key => <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />)
            }
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.orders} />
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
      </div>
    )
  }
}

export default App;
