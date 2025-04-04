import React from 'react';

const Header = (props) => {
  return (
    <h1 id="title">{props.title}</h1> 
  );
}

Header.defaultProps = { title: "To Do List" };
export default Header;
