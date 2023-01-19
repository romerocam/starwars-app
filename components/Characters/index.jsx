import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../Navbar";

const Characters = ({ props }) => {
  const [characters, setCharacters] = useState(props.results);
  const [next, setNext] = useState(props.next);
  const [previous, setPrevious] = useState(props.previous);
  // console.log("PROPS", props);
  // console.log("NEXT", next);
  // console.log("PREVIOUS", previous);
  // console.log("CHARACTERS", characters);

  const handleNextPage = () => {
    axios.get(next).then((response) => {
      setCharacters(response.data);
      setPrevious(response.data.previous);
      setNext(response.data.next);
    });
  };

  const handlePreviousPage = () => {
    axios.get(previous).then((response) => {
      setCharacters(response.data);
      setPrevious(response.data.previous);
      setNext(response.data.next);
    });
  };

  useEffect(() => {
    axios.get("https://swapi.dev/api/people/").then((res) => {
      setCharacters(res.data);
      // console.log("CHARACTERS IN USEEFFECT--->", characters);
      setNext(res.data.next);
      // console.log("NEXT in USEEFFECT--->", props.next);
    });
  }, []);
  return (
    <>
      {/* <Navbar /> */}
      {/* <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[1]" /> */}
      {/* <Image
        src="https://images.unsplash.com/photo-1547700055-b61cacebece9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHN0YXIlMjB3YXJzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
        layout="fill"
        className="object-cover"
        alt="starwars"
      /> */}

      <div className="relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 px-4 pb-4 text-white z-10">
        <button
          className="flex justify-center items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-black rounded-3xl"
          disabled={!previous}
          onClick={handlePreviousPage}
        >
          Previous
        </button>

        <button
          className="flex justify-center items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-black rounded-3xl"
          disabled={!next}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
      <div className="columns-2 justify-center items-center">
        <div>
          {characters?.results?.map((item, index) => (
            <div key={index}>
              <div className="relative items-center m-auto p-2 text-gray-300 z-10">
                <div className=" bg-black/50 rounded-md flex flex-col items-center">
                  <div>
                    <p className="text-3xl ">NAME: {item.name}</p>
                  </div>
                  <p className="text-1xl">HEIGHT: {item.height}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Characters;
