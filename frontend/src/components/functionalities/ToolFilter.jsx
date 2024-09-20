import React from "react";

//components
import IconButton from '../buttons/IconButton'

//styles
import '../../styles/components/functionalitiesStyle/toolFilter.css'

const ToolFilter = () => {
  return (

    <div className="filter-container">
      <IconButton 
        onMouseEnter="sound"
        className="tool-filter-button"
        iconKey="react"
      />
      <IconButton 
        onMouseEnter="sound"
        className="tool-filter-button"
        iconKey="js"
      />
    </div>

  );
}

export default ToolFilter;