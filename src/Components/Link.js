import React from 'react';



const Link = ({href,className,children}) => {
  const onClickLink = (event) => {

    //code expln below
    if(event.metaKey || event.ctrlKey){
      return;
    }

    event.preventDefault(); //Step 1: this statement helps to prevent a full page reload
  
    //Step 2: this helps to update the pathname in the url
    window.history.pushState({},'',href);

    //Step 3: generating a nav event and emitting them to let route know that url has been changed
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  }

  return(
    <a 
      href={href} 
      className={className}
      onClick={onClickLink}>
      {children}
    </a>
  );
};

export default Link;

//---------------------------------------------------------------------------------------
//Steps to follow on when user clicks on the link

//1.Stop the page from refreshing -  (even.preventDefault())
//2. change the URL - window.history.pushState({}, '' , '/pathnameyouneed')
//3. Each route now should be able to detect the URL change
      //Expln - when the user clicks on the link we generate and emit a navigation event and
      //this navigation event is going to tell the route that url has been changed
      // const navEvent = new PopStateEvent('popstate');
      //   window.dispatchEvent(navEvent);
//4. Route should listen to the event and should update a piece of state
//5. When the state changes route re-renders and appropriate component is shown

//-----------------------------------------------------------------------------------------
//This code is for when user long press ctrl key and clicks the link, the link opens up in
  //a new tab
                    // if(event.metaKey || event.ctrlKey){
                    //   return;
                    // }
  //metaKey -> this one is for mac systems represting command key
  //ctrlkey ->this one is for mac systems represting control key

  //So we are saying when the user does any such action we do not want the code to behave in
  //the way we have written instead we want the code to behave in the way it usually does so
  //returning null

//-------------------------------------------------------------------------------------------