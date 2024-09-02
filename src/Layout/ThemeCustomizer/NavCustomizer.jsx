import React, { Fragment } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

const NavCustomizer = ({ callbackNav, selected }) => {
  return (
    <Fragment>
      <Nav className='flex-column nac-pills' id='c-pills-tab' role='tablist' aria-orientation='vertical'>
        <NavItem>
          <NavLink className={selected === 'check-layout' ? 'active' : ''} onClick={() => callbackNav('check-layout', true)}>
            <div className='settings'>
              <i className='fa fa-cog'></i>
            </div>
            <span>Quick Option</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={selected === 'sidebar-type' ? 'active' : ''} onClick={() => callbackNav('sidebar-type', true)}>
            <div className='settings'>
              <i className='fa fa-cog'></i>
            </div>
            <span>Quick Option</span>
          </NavLink>
        </NavItem>




      </Nav>
    </Fragment>
  );
};

export default NavCustomizer;
