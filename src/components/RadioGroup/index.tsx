import React, { useEffect } from "react";

interface Prop {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const RadioGroup: React.FC<Prop> = ({ state, setState }) => {
  const values = ["mehh", "high", "low"];
  useEffect(() => {
    setState(values[0] || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="mt-4 text-white">Mood:</div>
      <div className="flex gap-4 text-white">
        {values.map((v, i) => (
          <div key={i}>
            <input
              className="mb-0.5 border-none text-gray-500 transition-all checked:bg-gray-800 hover:cursor-pointer focus:ring-0"
              id={v}
              type="radio"
              name="status"
              value={state}
              checked={state === v}
              readOnly
              onClick={() => setState(v)}
            />
            <label
              className="px-1 hover:cursor-pointer"
              onClick={() => setState(v)}
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
