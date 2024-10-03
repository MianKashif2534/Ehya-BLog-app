import React from "react";
import AsyncSelect from "react-select/async";

function MultiSelectTagDropdown({ defaultValue = [], loadOptions, onChange }) {
  return (
    <AsyncSelect
      defaultValue={defaultValue}
      defaultOptions
      isMulti
      loadOptions={loadOptions}
      className="z-20 relative"
      onChange={onChange}
    />
  );
}

export default MultiSelectTagDropdown;
