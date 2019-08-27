import React from 'react'

import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import Fish from './Fish'

import sampleFishes from '../sample-fishes'
import base from '../base';

class App extends React.Component {

  state = {
    fishes: {},
    orders: {}
  }

  componentDidMount() {
    // this runs right before the app is rendered
    this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    })

    // check if there's any order in localstorage
    const localStorageRef = localStorage.getItem(`order-${this.props.match.params.storeId}`);

    if (localStorageRef) {
      // update our app component's order state
      this.setState({
        orders: JSON.parse(localStorageRef)
      })
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.match.params.storeId}`, JSON.stringify(nextState.orders))
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

  updateFish = (key, updatedFish) => {
    const fishes = { ...this.state.fishes }
    fishes[key] = updatedFish;
    this.setState({ fishes })
  }

  removeFish = (key) => {
    const fishes = { ...this.state.fishes }
    fishes[key] = null
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

  removeFromOrder = (key) => {
    const orders = { ...this.state.orders }

    orders[key] = orders[key] - 1;
    if (orders[key] === 0) {
      delete orders[key]
    }

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
        <Order
          fishes={this.state.fishes}
          order={this.state.orders}
          params={this.props.match.params}
          removeFromOrder={this.removeFromOrder} />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          removeFish={this.removeFish}
          loadSamples={this.loadSamples}
          fishes={this.state.fishes} />
      </div>
    )
  }
}

export default App;
