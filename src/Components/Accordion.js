import React,{useState} from 'react';

//We cannot give default and function name together
// export default Accordian = () => {
//   return(
//     <div>Accoridan</div>
//   );
// }

const Accordion = ({items}) => {
  //TIP:if you know the state is number then initialze it to null
  const [activeIndex,setactiveIndex] = useState(null);

  const onItemClick = (index) => {
    setactiveIndex(index);
  }

  const renderedItems = items.map((item,index) => {
    const active = index === activeIndex ? 'active' : '';

    return(
      <React.Fragment key={item.title}>
        <div className={`title ${active}`} onClick={() => onItemClick(index)} >
          <i className="dropdown icon"></i>
          {item.title}
        </div>
        <div className={`content ${active}`}>
          <p>{item.content}</p>
        </div> 
      </React.Fragment>
    )
  })
  return  <div className="ui styled accordion">{renderedItems}</div>
}

export default Accordion

//---------------------------------------------------------------------------------------

//useState is a function provided by the react hook so we import them using  {}, it is always
//returned with the array of two elements

//Array destructing - const [activeIndex,setactiveIndex] = useState(null), syntax to tell JS that
//we need access to first two elements in a araay returned by useState, the first element returned
// by the useState will be assigned to acitve Index and similarly second elemnet to setActiveIndex.

//setActive index - a setter function that we call to update the state

//--------------------------------------------------------------------------------------------
//Named Export

// export function speak(){
//   return 'moo';
// }

//default export

// export default{
//   speak(){
//     return 'moo'
//   },
//   eat(){
//     return 'cow eats'
//   }
// }

//------------------------------------------------------------------------------------------