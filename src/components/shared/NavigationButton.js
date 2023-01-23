import React from 'react';
import {Link} from 'react-router-dom';

export const NavigationButton = (props) => {
  return (
    <Link to={props.path} style={{ textDecoration: 'none', color: 'black' }}>
        {props.children}
    </Link>
  )
}
