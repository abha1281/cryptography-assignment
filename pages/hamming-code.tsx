import { Listbox, Transition } from "@headlessui/react";
import React, { useState } from "react";

const options = [
  { label: "Even", value: "even" },
  { label: "Odd", value: "odd" },
];

const HammingCode = () => {
  const [value, setValue] = useState("0");
  const [isBinary, setIsBinary] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value);
  };

  const checkParity = (parityBit: number) => {
    if (parityBit % 2 === 0) {
      if (selectedOption.value === "even") {
        return 0;
      } else {
        return 1;
      }
    } else {
      if (selectedOption.value === "odd") {
        return 1;
      } else {
        return 0;
      }
    }
  };

  const hammingEncode = () => {
    const splitValue = value.split("");

    const d1 = parseInt(splitValue[0]);
    const d2 = parseInt(splitValue[1]);
    const d3 = parseInt(splitValue[2]);
    const d4 = parseInt(splitValue[3]);

    const p1 = checkParity(d1 + d2 + d4);
    const p2 = checkParity(d1 + d3 + d4);
    const p4 = checkParity(d2 + d3 + d4);

    console.log(p1, p2, p4);
    

  };
  return (
    <div className="flex justify-center items-center mt-10">
      <div className="flex flex-col gap-y-4 border p-10 rounded-xl">
        <div className="flex flex-col gap-y-2">
          <p className="text-gray-500">
            Please enter a binary code to encode to Hamming&apos;s encoding.
          </p>
          <div className="flex items-center gap-x-4">
            <input
              type="text"
              placeholder="0"
              maxLength={4}
              className="font-semibold text-xl border px-5 py-2 rounded-lg tracking-widest w-72"
              value={value}
              onChange={handleChange}
            />
            <Listbox
              as="div"
              className="relative"
              value={selectedOption}
              onChange={setSelectedOption}
            >
              <Listbox.Button className="font-semibold w-32 border px-5 py-2 rounded-lg text-left">
                {selectedOption.label}
              </Listbox.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-y-95 opacity-0"
                enterTo="transform scale-y-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-y-100 opacity-100"
                leaveTo="transform scale-y-95 opacity-0"
              >
                <Listbox.Options className="whitespace-nowrap absolute top-2 right-0 border w-32 rounded-lg overflow-hidden">
                  {options.map(option => (
                    <Listbox.Option
                      className="px-5 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
                      key={option.value}
                      value={option}
                    >
                      {option.label}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </Listbox>
          </div>
        </div>
        <button
          className="px-4 py-2 bg-red-500 hover:bg-red-700 transition-colors rounded-md text-white font-semibold w-max"
          onClick={hammingEncode}
        >
          Encode
        </button>
      </div>
    </div>
  );
};

export default HammingCode;
