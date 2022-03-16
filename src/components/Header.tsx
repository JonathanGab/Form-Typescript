import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';

export default function Header(): JSX.Element {
  return (
    <div className="header-container">
      <div className="header-body">
        <Link to="/" className="link">
          Home
        </Link>
        <Link to="/wilders" className="link">
          Wilders
        </Link>
        <Link to="/form" className="link">
          Create
        </Link>
      </div>
    </div>
  );
}
