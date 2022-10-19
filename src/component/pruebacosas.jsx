import React, { useState,useEffect } from "react";
import JsonData from "../MOCK_DATA.json";
import ReactPaginate from "react-paginate";
const Prueba = (props) =>{
  debugger
  const [count, setCount] = useState(0);
  const [calculation, setCalculation] = useState(0);

  useEffect(() => {
    setCalculation(() => count * 2);
  }, [count]); // <- add the count variable here

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <p>Calculation: {calculation}</p>
    </>
  );
}

export default Prueba;