import React from 'react'

import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'

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

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Order />
        <Inventory addFish={this.addFish} />
      </div>
    )
  }
}

export default App;
