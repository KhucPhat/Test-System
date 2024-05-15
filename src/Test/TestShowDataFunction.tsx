import React, { useState } from 'react';

function ParameterInputs() {
  const [dataList] = useState([
    {
      name: "Get global",
      parameter: [
        { test: 'ob', name: 'system', func: "Get global"},
        { pri: 'Long', name: 'Bal',  func: "Get global"}
      ],
      type: 'left'
    },
    {
      name: "Get global2",
      parameter: [
        { test: 'ob2', name: 'system2', func: "Get global2" },
        { test: 'ob23', name: 'system23', func: "Get global2" },
        { pri: 'Long2', name: 'Bal2', func: "Get global2" }
      ],
      type: 'right'
    },
    {
      name: "Get global",
      parameter: [
        { test: 'ob', name: 'system', func: "Get global"},
        { pri: 'Long', name: 'Bal', func: "Get global"}
      ],
      type: 'right'
    }
  ]);

  return (
    <div>
      {dataList.map((item, listIndex) => (
        <div key={listIndex}>
          <h2>{item.name}</h2>
          {item.parameter.map((param, paramIndex) => (
            <div key={paramIndex}>
              <label>
                {param.test ? `#${paramIndex} ` : `@${param.name}`}
                <input
                  type="text"
                  defaultValue={param.test ? `#${paramIndex}` : `@${param.name}`}
                  placeholder={`Enter value for ${param.name}`}
                />
              </label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ParameterInputs;
