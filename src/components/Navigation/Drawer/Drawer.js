import React from 'react';
import './Drawer.css';
import Backdrop from './../../UI/Backdrop/Backdrop';
import { NavLink } from 'react-router-dom';
class Drawer extends React.Component {
  // закрыть меню при нажатии на ссылку
  handleClick = () => {
    this.props.onClose();
  }

  renderLinks(links) {
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

    const links = [
      {to: '/', label: 'Список', exact: true},
    ]

    if (this.props.isAuthenticated) {
      links.push({to: '/quiz-creator', label: 'Создать тест', exact: false})
      links.push({to: '/logout', label: 'Выйти', exact: false})
    } else {
      links.push({to: '/auth', label: 'Автоизация', exact: false},)
    }

    return (
      <>
        <nav className={classNameArray.join(' ')}>
          <ul>
            {this.renderLinks(links)}
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
