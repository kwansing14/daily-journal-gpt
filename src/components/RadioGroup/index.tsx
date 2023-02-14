import React from "react";

const RadioGroup = () => {
  const values = ["normal", "relieved", "frustration"];
  const [value, setValue] = React.useState(values[0]);
  
  return (
    <>
      <div className="mt-4 text-white">Mood:</div>
      <div className="flex gap-4 text-white">
        {values.map((v, i) => (
          <div key={i}>
            <input
              className="mb-0.5 border-none text-gray-500 checked:bg-gray-800 hover:cursor-pointer focus:ring-0 transition-all"
              id={v}
              type="radio"
              name="status"
              value={value}
              checked={value === v}
              onClick={() => setValue(v)}
            />
            <label
              className="px-1 hover:cursor-pointer"
              onClick={() => setValue(v)}
            >
              {v}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default RadioGroup;
