import React from 'react'

import { getFunName } from '../helpers'

class StorePicker extends React.Component {
  storeInput = React.createRef()

  // constructor() {
  //   super()
  //   this.goToStore = this.goToStore.bind(this)
  // }

  goToStore = (event) => {
    event.preventDefault();
    console.log(this.storeInput.current.value)
    // first grub the text from the box
    // then go to transition from / to /store/:storeId
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please enter a store</h2>
        <input
          type="text"
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
          ref={this.storeInput}
        />
        <button>Visit Store</button>
      </form>
    )
  }
}

export default StorePicker;
