import React,{useEffect, useState, useRef} from 'react';

const Dropdown = ({label,options,selected,setselected}) => {
  const[dropDownOpen,setdropDownOpen] = useState(false);
  const ref = useRef();

  //We need to set up event listener only one time so placing it inside the useEffect() and passing
  //[] as second arg
  useEffect(() => {
    //this "event" object always comes up with this function
    const onBodyClick = (event) => {
      if(ref && ref.current&& ref.current.contains(event.target)){
        return;
      }

    setdropDownOpen(false);
  }
    
    document.body.addEventListener("click",onBodyClick,{capture: true}) ////adding this capture: true is a new change for react v17.0 this makes the onClick on body to be triggered first followed by the element onclick
    
    //When we are unmounting this component from DOM, we need to turn off or remove the event 
    //listener, so make use of clean up function
    return () => {
      document.body.removeEventListener('click',onBodyClick)
    }; 
  },[]);

  const OndropDownSelect = () => {
    setdropDownOpen(!dropDownOpen);
  }
  const renderOptions = options.map((option) => {
    //stephen's code logic
    // if(option.value === selected.value){
    //   return null;
    // }

    if(!(selected === option))
      return(
        <div 
          key={option.value} 
          className="item"
          onClick={() => setselected(option)}>
          {option.label}
        </div>
      )
  })

  return(
    <div ref={ref} className="ui form">
      <div className="field">
        <label className="label">{label}</label>
        <div 
          className={`ui selection dropdown ${dropDownOpen ? 'visible active' : ''}`}
          onClick={() => OndropDownSelect()}>
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={`menu ${dropDownOpen ? 'visible transition' : ''}`}>
            {renderOptions}
          </div>
        </div>
      </div>
      <div>
        <p style={{color : selected.value }}>This is for testing purpose!!!</p>
      </div>
    </div>
  )
}

export default Dropdown;

//---------------------------------------------------------------------------------------------
//Event Bubbling - lecture No 180
//So when the user clicks on the element on the browser, browser creates an event object which 
//contains the information about the click (like which element the user has clicked) browser then
//hands out that event object on to the react and react does a bit of processing nad gives it to
//the respective onClick event handler.
 
//One key thing -> event object doesn't get stopped there instead it passes to its parent
//onClick event handlers and those onClick event handlers gets invoked automatically.This is called
//as event bubbling. Becuase of this event bubbling, when the user selects the drop down option
//the drop down collapses even though we don't have the code written for it in that specific
//event handler method but the code is present in its parent onclick method.

//----------------------------------------------------------------------------------------------
//The order of onClick
//One IMP -> Whatever the case is, onClick put up in the body is the first one to get executed always

//When you click on parent div:
//Console statements
        //Body Clicked!! - false
        //Parent div Clicked - true

//when you click on element : issue is : drop down doesn't close
//Console Statements
        //Body Clicked!! - false
        //Element Clicked!! - do nothing 
        //Parent div Clicked - true ( due to event bubbling)

//Why onClick on body gets called first?
//the onClick event listeners on parent div and particaular element are wired up through react but
//the Onclick on body is wired up through manual event listener.So all the event listeners set up
//through addEventListeners are called first.

// We are going to handle the code in such a way that body event listener is not going to listen
//to any click that is made in react dom elements and any click on the react dom elements are not
//going to be heared by the body event listener as well

//It is a bad practise to cancel the event bubbling.
//--------------------------------------------------------------------------------------------------

//useRef - Direct reference to DOM element
//ref.current - will give refernce to the current div 

//-----------------------------------------------------------------------------------------------

//One other scenario on when the clean up function will get involed is when the component
//is going to get unmounted