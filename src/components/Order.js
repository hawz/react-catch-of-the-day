import React from 'react'
import PropTypes from 'prop-types'
import { formatPrice } from '../helpers'

import { CSSTransition, TransitionGroup } from 'react-transition-group'

class Order extends React.Component {
  renderOrder = (key) => {
    const fish = this.props.fishes[key]
    const count = this.props.order[key]
    const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>

    if (!fish || fish.status === 'unavailable') {
      return (
        <CSSTransition key={key} timeout={500} classNames="order">
          <li>Sorry, {fish ? fish.name : 'fish'} is no longer available!{removeButton}</li>
        </CSSTransition>
      )
    }
    return (
      <CSSTransition key={key} timeout={500} classNames="order">
        <li>
          <TransitionGroup component="span" className="count">
            <CSSTransition key={count} timeout={250} classNames="count">
              <span>{count}</span>
            </CSSTransition>
            <span>lbs {fish.name} {removeButton}</span>
          </TransitionGroup>
          <span className="price">{formatPrice(count * fish.price)}</span>
        </li>
      </CSSTransition>
    )
  }

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key]
      const count = this.props.order[key]
      const isAvailable = fish && fish.status === 'available'
      if (isAvailable) {
        return prevTotal + (count * fish.price || 0)
      }
      return prevTotal
    }, 0)
    return (
      <div className="order-wrap">
        <h2>Your Order</h2>
        <TransitionGroup
          component="ul"
          className="order"
        >
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </TransitionGroup>

      </div>
    );
  }
}

Order.propTypes = {
  fishes: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  removeFromOrder: PropTypes.func.isRequired
}

export default Order
