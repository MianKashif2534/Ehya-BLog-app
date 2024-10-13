// import React from "react";

// function AsyncMultiSelectTagDropdown({
//   defaultValue = [],
//   loadOptions,
//   onChange,
//   placeholder
// }) {
//   return (
//     <AsyncMultiSelectTagDropdown
//       defaultValue={defaultValue}
//       defaultOptions
//       isMulti
//       loadOptions={loadOptions}
//       className="z-20 relative"
//       onChange={onChange}
//       placeholder={placeholder}
//     //   additional={{
//     //     page: 1,
//     //   }}
//     />
//   );
// }

// export default AsyncMultiSelectTagDropdown;

import React from "react";
import { AsyncPaginate } from "react-select-async-paginate";

function AsyncMultiSelectTagDropdown({
  defaultValue = [],
  loadOptions,
  onChange,
  placeholder,
}) {
  return (
    <AsyncPaginate
      defaultValue={defaultValue}
      defaultOptions
      isMulti
      loadOptions={loadOptions} // function to load options asynchronously
      className="z-20 relative"
      onChange={onChange} // onChange handler for selected values
      placeholder={placeholder} // Placeholder for dropdown
      additional={{
        page: 1, // Additional option, e.g., for pagination
      }}
    />
  );
}

export default AsyncMultiSelectTagDropdown;
