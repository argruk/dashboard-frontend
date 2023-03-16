import React from 'react'

export const TabView = ({value, index, children}) => {
    return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`vertical-tabpanel-${index}`}
          aria-labelledby={`vertical-tab-${index}`}
        >
          {value === index && (
            children
          )}
        </div>
      );
}
