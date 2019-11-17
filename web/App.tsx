import React from "react";
import "./App.less";
import * as React from "react";

export default function App(props: { name: string; age: number }) {
  const { name = "", age = 0 } = props;
  return (
    <div>
      <div>This is a React App</div>
      <h1>My name is {name}</h1>
      <h3>I'm {age} years old.</h3>
    </div>
  );
}
