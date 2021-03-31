import React,{useState}from 'react';
import Accordion from './Components/Accordion';
import Search from './Components/Search';
import Dropdown from './Components/Dropdown';
import Translate from './Components/Translate';
import Route from './Components/Route';
import Header from "./Components/Header";

const items = [
  {
    title : 'What is React',
    content :  'react is a Front end JavaScript Framework'
  },
  {
    title : 'What we use React',
    content :  'React is the most commonly used library among the Engineers'
  },
  {
    title : 'How do you use react',
    content :  'We use React by creating buolding blocks like components'
  }
]

const options = [
  {
    label :'A color of red',
    value: 'red'
  },
  {
    label :'A color of blue',
    value: 'blue'
  },
  {
    label :'A shade of green',
    value: 'green'
  }
]

//------------------------------------------------------------------------------------------
//Below are set of individaul functions written for navigation purpose

// const showAccordian = () => {
//   return window.location.pathname === "/" ? <Accordion items = {items}/> : null;
// }

// const showList = () => {
//   return window.location.pathname === "/List" ? <Search /> : null;
// }

// const showDropdown = () => {
//   return window.location.pathname === "/Dropdown" ? <Dropdown /> : null;
// }

// const showTranslate = () => {
//   return window.location.pathname === "/Translate" ? <Translate /> : null;
// }

//-------------------------------------------------------------------------------------------

//Make this routing logic seperate react function, import and use it here so came with Route
//component

              // const showComponent = (path, component) => {
              //   return window.location.pathname === path ? component : null;
              // }

//-------------------------------------------------------------------------------------------

export default () => {
  const[selected, setselected] = useState(options[0])
  return (
    <div>
      <Header />
      {/* <Accordion items = {items} /> */}
      {/* <Search /> */}
      {/* <Dropdown 
        label="Select a Color"
        options={options} 
        selected= {selected}
        setselected = {setselected}/> */}``
        {/* <Translate /> */}

        {/* one of the way but we need to write individual function */}
        {/* {showAccordian()}
        {showList()}
        {showDropdown()}
        {showTranslate()} */}

        {/* another way - where we can mae use of one reusbale function */ }
        {/* {showComponent("/", <Accordion items = {items} />)}
        {showComponent("/List", <Search />)}
        {showComponent("/Dropdown", <Dropdown />)}
        {showComponent("/Translate", <Translate />)} */}

     {/* Extract the routing logic and place it in a reusbale component ("Route") */}
        <Route route="/">
          <Accordion items = {items}/>
        </Route>
        <Route route="/List">
          <Search />
        </Route>
        <Route route="/Dropdown">
          <Dropdown 
            label="Select a Color"
            options={options} 
            selected= {selected}
            setselected = {setselected}/>
        </Route>
        <Route route="/Translate">
          <Translate />
        </Route>
    </div>
  );
};

//---------------------------------------------------------------------------------------------

//useEffect - it is a function in Hook system that helps you to do something similar to component life cycle methods
//of class based component

//useState,useEffect,useRef,useContext,useReducer,useCallback,useMemo - There are primitive hooks

//Custom hook is nothing but a hook you develop with the help of these prmitive hooks

//--------------------------------------------------------------------------------------------

//window.location.pathname -> provides the current pathname from the current URL
//locahost:3000 alone gives pathname as "/".

//--------------------------------------------------------------------------------------------
//Must have tools:
//1. React dev tools
//2. Redux dev
//3. Prettier(formatting)

//-------------------------------------------------------------------------------------------