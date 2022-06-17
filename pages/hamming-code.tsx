import { Listbox, Transition } from "@headlessui/react";
import { ArrowRightIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import Modal from "../components/globals/Modal";

const options = [
  { label: "Even", value: "even" },
  { label: "Odd", value: "odd" },
];

const HammingCode = () => {
  const [value, setValue] = useState("0");
  const [validate, setValidate] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [encriptedCode, setEncriptedCode] = useState("");
  const [show, setShow] = useState(false);

  const checkParity = (parityBit: number) => {
    if (parityBit % 2 === 0) {
      return (selectedOption.value === "even") ? 1 : 0
    } else {
      return (selectedOption.value === "odd") ? 0 : 1
    }
  };

  const validateInput = () => {
    if (value.length < 4) {
      setValidate(true);
      setShow(true);
    } else {
      for (let digit of value.split("")) {
        if (digit !== "0" && digit !== "1") {
          setValidate(true);
          setShow(true);
          break;
        } else {
          setValidate(false);
          hammingEncode();
        }
      }
    }
  };

  const hammingEncode = () => {
    const splitValue = value.split("");

    let d1 = parseInt(splitValue[0]);
    let d2 = parseInt(splitValue[1]);
    let d3 = parseInt(splitValue[2]);
    let d4 = parseInt(splitValue[3]);

    const p1 = checkParity(d1 + d2 + d4);
    const p2 = checkParity(d1 + d3 + d4);
    const p4 = checkParity(d2 + d3 + d4);

    setEncriptedCode(
      `${p1}${p2}${d1.toString()}${p4}${d2.toString()}${d3.toString()}`
    );

    setShow(true);
  };

  return (
    <>
      <div className="flex justify-center items-center gap-x-10">
    <div className="text-gray-900 w-2/3 mx-auto flex flex-col gap-y-2">
      <h2  className="font-bold text-3xl">History</h2>
      <p>
        The Bell Model V computer, an electromechanical relay-based device with
        second cycle times, was being developed at Bell Labs in the late 1940s
        when Richard Hamming, the creator of Hamming codes, was employed there.
        On seven-eighths of an inch wide, punched paper tape with up to six
        holes per row, input was fed in. On workdays, the machine would halt and
        flash lights when relay problems were found so that the personnel could
        fix the issue. The machine just went on to the next task on the weekends
        and after-hours when there were no operators.
      </p>
      <p>
        Hamming worked on the weekends, but he grew dissatisfied with having to
        start his programs over when flaws were found. &quot;And so I said, Damn it,
        if the computer can identify a mistake, why can&apos;`t it locate the error&apos;`s
        position and rectify it?&quot; stated Hamming in a recorded interview. He
        continued to work on the issue of error-correction over the following
        few years, creating an ever-larger variety of powerful algorithms. He
        introduced what is now referred to as Hamming code in 1950, and it is
        still used today in applications like ECC memory.
      </p>
    </div>
        <div className="flex flex-col gap-y-4 border p-10 rounded-xl">
          <div className="flex flex-col gap-y-2">
            <p className="text-gray-500">
              Please enter a binary code to encode to Hamming&apos;s encoding.
            </p>
            <div className="flex items-center gap-x-4">
              <input
                type="text"
                placeholder="0"
                minLength={4}
                maxLength={4}
                className="font-semibold text-xl border px-5 py-2 rounded-lg tracking-widest w-72"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
              <Listbox
                as="div"
                className="relative"
                value={selectedOption}
                onChange={setSelectedOption}
              >
                <Listbox.Button className="font-semibold w-20 border px-5 py-2 rounded-lg text-left">
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
                  <Listbox.Options className="whitespace-nowrap absolute top-2 right-0 border w-20 rounded-lg overflow-hidden">
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
            onClick={validateInput}
          >
            Encode
          </button>
        </div>
      </div>
      <Modal isOpen={show} closeModal={() => setShow(false)}>
        {!validate ? (
          <>
            <p>You have successfully encoded.</p>
            <div className="flex items-center gap-x-4">
              <p className="text-4xl font-medium">{value}</p>
              <ArrowRightIcon className="w-4 h-4" />
              <p className="text-4xl font-medium">{encriptedCode}</p>
            </div>
          </>
        ) : (
          <p>Please enter a valid input</p>
        )}
      </Modal>
    </>
  );
};

export default HammingCode;
