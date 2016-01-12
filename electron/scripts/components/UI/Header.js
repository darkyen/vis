import _ from 'lodash';
import React, {Component} from 'react';
import classNames from 'classnames';

export default class AppHeader extends Component{
  render(){

    const {flat, frosty, tintColor} = this.props;
    const tintClassName = classNames('header__tint', {
      'header__tint--frosty': frosty,
      'header__tint--flat':   flat
    });
    const outerClassName = classNames('header', this.props.className);

    return  <header className={outerClassName}>
              <div className={tintClassName} style={{
                  backgroundColor: tintColor,
                  borderColor: `1px solid ${tintColor}`
              }}></div>
              <div className="header__content">
                {this.props.children}
              </div>
            </header>;
  }
}
