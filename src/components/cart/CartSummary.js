import React, { Component } from "react";
import { connect } from "react-redux";
import * as cartActions from "../../redux/actions/cartActions";
import alertify from "alertifyjs";

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem,
  NavLink,
  Badge
} from "reactstrap";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

class CartSummary extends Component {
  renderEmpty() {
    return (
      <NavItem>
        <NavLink href="/components/">Sepetiniz Boş</NavLink>
      </NavItem>
    );
  }
  removeFromCart(product){
    this.props.actions.removeFromCart(product);
    alertify.error(product.productName + " sepetten silindi")
}
  renderSummary() {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Sepetiniz
        </DropdownToggle>
        <DropdownMenu right>
          {this.props.cart.map(cartItem => (
            <DropdownItem key={cartItem.product.id}>
                 <Badge onClick={()=>this.removeFromCart(cartItem.product)} color="danger"> X </Badge>
              {cartItem.product.productName}
              <Badge color="success"> {cartItem.quantity} </Badge>
            </DropdownItem>
          ))}

          <DropdownItem divider />
          <DropdownItem><Link to="/cart">Sepete Git</Link></DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }

  render() {
    return (
      <div>
        {this.props.cart.length > 0 ? this.renderSummary() : this.renderEmpty()}
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch)
    }
  };
}
function mapStateToProps(state) {
  return {
    cart: state.cartReducer
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartSummary);
