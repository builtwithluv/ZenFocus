import React, { Component } from 'react';
import { Button, Menu, MenuItem, MenuDivider, Popover, Position } from '@blueprintjs/core';

const MenuContent = () => (
  <Menu>
    <MenuItem
      iconName="time"
      text="Focus"
    />
    <MenuDivider />
    <MenuItem text="Options" iconName="cog" />
  </Menu>
);

export default class MenuMain extends Component {
  render() {
    return (
      <Popover
        content={<MenuContent />}
        position={Position.BOTTOM_LEFT}
      >
        <Button iconName="time" text="Focus" />
      </Popover>
    );
  }
}
