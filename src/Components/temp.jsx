import React, { useState } from 'react';
import Select from 'react-select';
 
function App() {
  const data = [
    {
      value: 1,
      label: "cerulean"
    },
    {
      value: 2,
      label: "fuchsia rose"
    },
    {
      value: 3,
      label: "true red"
    },
    {
      value: 4,
      label: "aqua sky"
    },
    {
      value: 5,
      label: "tigerlily"
    },
    {
      value: 6,
      label: "blue turquoise"
    }
  ];
 
  // set value for default selection
  const [selectedValue, setSelectedValue] = useState([]);
 
  // handle onChange event of the dropdown
  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
  }
 
  return (
    <div className="App">
  
      <Select
        className="dropdown"
        placeholder="Select Option"
        value={data.filter(obj => selectedValue.includes(obj.value))} // set selected values
        options={data} // set list of the data
        onChange={handleChange} // assign onChange function
        isMulti
        isClearable
      />
 
    </div>
  );
}
 
export default App;