import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import React from "react";
import MenuItem from "app/shared/layout/menus/menu-item";
import {NavDropdown} from "app/shared/layout/menus/menu-components";

const chatMenuItems = (
  <>
    <MenuItem icon="wrench" to="/account/preferences">
      Preferences
    </MenuItem>
  </>
)

export const ChatMenu = () => (
  <NavDropdown name="Chat" id="chat-menu">
    { chatMenuItems }
  </NavDropdown>
);
