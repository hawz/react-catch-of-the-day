import React from 'react'
import PropTypes from 'prop-types'

import AddFishForm from './AddFishForm'
import { app, provider } from '../base'

class Inventory extends React.Component {
  state = {
    uid: null,
    owner: null
  }

  componentDidMount() {
    app.auth().onAuthStateChanged((user, error) => {
      if (error) {
        return;
      }
      if (user) {
        this.authHandler({user})
      }
    })
  }

  authHandler = (authData) => {
    const storeRef = app.database().ref(this.props.storeId)
    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {}
      if (!data.owner) {
        storeRef.set({
          owner: authData.user.uid
        })
      }

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      })
    })
  }

  authenticate = (chosenProvider) => {
    app.auth().signInWithPopup(provider)
      .then((authData) => this.authHandler(authData));
  }

  logout = () => {
    app.auth().signOut().then(() => {
      this.setState({
        uid: null
      })
    })
  }

  handleChange = (event, key) => {
    const fish = this.props.fishes[key]

    // take a copy of that fish and update with new data
    const updatedFish = {
      ...fish,
      [event.target.name]: event.target.value
    }

    this.props.updateFish(key, updatedFish)
  }

  renderInventory = (key) => {
    const fish = this.props.fishes[key];
    return (
      <div className="fish-edit" key={key}>
        <input
          type="text"
          name="name"
          value={fish.name}
          placeholder="Fish Name"
          onChange={(e) => this.handleChange(e, key)}
        />
        <input
          type="text"
          name="price"
          value={fish.price}
          placeholder="Fish Price"
          onChange={(e) => this.handleChange(e, key)}
        />
        <select
          name="status"
          value={fish.status}
          onChange={(e) => this.handleChange(e, key)}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          name="desc"
          value={fish.desc}
          placeholder="Fish Desc"
          onChange={(e) => this.handleChange(e, key)}>
        </textarea>
        <input
          name="image"
          value={fish.image}
          type="text"
          placeholder="Fish Image"
          onChange={(e) => this.handleChange(e, key)}
        />
        <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
      </div>
    )
  }

  renderLogin = () => {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>
        {/* <button className="github" onClick={() => this.authenticate('github')}>Log In with Github</button>
        <button className="facebook" onClick={() => this.authenticate('facebook')}>Log In with Facebook</button>
        <button className="twitter" onClick={() => this.authenticate('twitter')}>Log In with Twitter</button> */}
        <button className="google" onClick={() => this.authenticate('google')}>Log In with Google</button>
      </nav>
    )
  }

  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>
    // check if they're not logged in at all
    if (!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }

    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you aren't the owner of this store!</p>
          {logout}
        </div>
      )
    }
    return (
      <div>
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    );
  }
}

Inventory.propTypes = {
  fishes: PropTypes.object.isRequired,
  updateFish: PropTypes.func.isRequired,
  removeFish: PropTypes.func.isRequired,
  addFish: PropTypes.func.isRequired,
  loadSamples: PropTypes.func.isRequired,
  storeId: PropTypes.string.isRequired
}

export default Inventory
