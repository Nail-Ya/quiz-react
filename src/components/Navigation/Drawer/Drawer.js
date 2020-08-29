import React from 'react';
import './Drawer.css';
import Backdrop from './../../Backdrop/Backdrop'
import {NavLink} from 'react-router-dom'




const links = [
  {to: '/', label: 'Список', exact: true},
  {to: '/auth', label: 'Автоизация', exact: false},
  {to: '/quiz-creator', label: 'Создать тест', exact: false},
]

class Drawer extends React.Component {
  // закрыть меню при нажатии на ссылку
  handleClick = () => {
    this.props.onClose();
  }

  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName="active"
            onClick={this.handleClick}
          >
            {link.label}
          </NavLink>
        </li>
      )
    })
  }


  render() {

    const classNameArray = [
      'Drawer'
    ]

    if (!this.props.isOpen) {
      classNameArray.push('close')
    }

    return (
      <>
      <nav className={classNameArray.join(' ')}>
        <ul>
          {this.renderLinks()}
        </ul>
      </nav>
      {
        this.props.isOpen && <Backdrop onClick={this.props.onClose}/>
      }

      </>

    )
  }
}

export default Drawer;
