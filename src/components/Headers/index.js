import React from 'react'

export const PageTitle = ({title, className, children}) => (
  <header className={`page-title ${className ? className : ''}`}>
    <h1>{title}</h1>
    { children &&
			children
    }
  </header>
);
