import React,{ useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
  const [term,setTerm] = useState('Programming')
  const [debounceTerm, setdebounceTerm] = useState(term)
  const [resultList, setResultList] = useState([])

  const onSearchTerm = (searchterm) => {
    setTerm(searchterm)
  }

//-------------------------------------------------------------------------------------------------
  //API request inside useEffect function should be made as a seperate function ONLY and also
  //placed inside the its first argument function of useEffect and it needs to be CALLED manually

  //1.Alternate approach without creating temp variable for api call insdie useEffect
  // useEffect(() => {
  //   //wrap the async around () and then immediately call them by putting () in the end
  //   (async() => {
  //     await axios.get('some api end point')
  //   })();
  // },[term]);

  //2.Promise alternative approach for api call insise useEffect
  // useEffect(() => {
  //   axios.get('api end point')
  //     .then((responsse) => {
  //       console.log(response) 
  //     })
  // },[term])

//-------------------------------------------------------------------------------------------------

  //Uncomment lines from 36 to 77  : they contain the code : two useEffects without debounce term
  // useEffect(() => {
  //     const search= async() => {
  //       //failing to put "https" in front of the api call will make domain to get prepend to the
  //       //call you are making

  //       //In object destructuring you give the exact ey name but in array destructuring you
  //       //provide your own name
  //       const {data} = await axios.get('https://en.wikipedia.org/w/api.php',
  //         {
  //           params:{
  //           action:'query',
  //           list:'search', 
  //           origin : '*', //failing to pass this query param results in CORS issue.This param is required to allow unauthenticated CORS requests
  //           format:'json',
  //           srsearch:term
  //         }
  //       })
  //       setResultList(data.query.search)
  //     }

  //     // console.log(resultList) // [] (my guess - you should just check there is array existing or not)
  //     // console.log(!resultList) // false
  //     // console.log(resultList.length) // 0 ( my guess - you should check for any element present or not)
  //     // console.log(!resultList.length) // true


  //     //IMP: warning shows up in console "act Hook useEffect has a missing dependency: 'resultList.length'
  //     //ither include it or remove the dependency array  react-hooks/exhaustive-deps"
  //     //Reason for the error is because of the below conditional statement in if()
  //     if(term && !resultList.length) // we cannpt just check for !resultList - the case will be false so checking for length
  //       search();
  //     else{
  //       const timeoutId = setTimeout(() => {
  //         if(term)  
  //           search();
  //       },1000)

  //       return(() => {
  //         clearTimeout(timeoutId);
  //       })
  //     }   
  // }, [term])

//----------------------------------------------------------------------------------------------
  useEffect(() => {
    const timerId= setTimeout(() => {
      setdebounceTerm(term)
    }, 500)

    return () => {
      clearTimeout(timerId);
    }
  }, [term])

  useEffect(() => {
    const search= async() => {
      const {data} = await axios.get('https://en.wikipedia.org/w/api.php',
      {
        params:{
        action:'query',
        list:'search', 
        origin : '*', //failing to pass this query param results in CORS issue.This param is required to allow unauthenticated CORS requests
        format:'json',
        srsearch:term
      }
    })
    setResultList(data.query.search)
  }
  if(debounceTerm)
    search();

  },[debounceTerm])

  const renderList = resultList.map((result) => {
    return(
      <div className="item" key={result.pageid}>
        <div className="right floated content">
          <a 
            href={`https://en.wikipedia.org?curid=${result.pageid}`} 
            className="ui button">
              Go
          </a>
        </div>
        <div className="content">
          <div className="header">
            {result.title}
          </div>
          {/* {result.snippet} */}
          <span dangerouslySetInnerHTML = {{__html : result.snippet}}></span>
        </div>
      </div>
    )
  })

  return(
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input 
            className="inout"
            value = {term}
            onChange = {(e) => onSearchTerm(e.target.value)} />
        </div>
      </div>
      <div className="ui celled list">
        {renderList}
      </div>
    </div>
  );
}

export default Search

//-------------------------------------------------------------------------------------------

//On why we arite API call inside useEffect?
//General way - we have the onchange tightly coupled to some function and inside the function
//we can have the API call code written everything might look good but

//This way - on Onchange we call some function and inside the function we do setState and store the
//data and whenever we see the that dats has changed we call the API.

//Why to do this ? - In the latest way we cna also trigger search if someother parameter has also
//changed (for ex - amazon search by multiple filters)but in the general way we fire search only 
//if the onchange event is triggered

//----------------------------------------------------------------------------------------------
//useEffect - second arugument scenarios
// []      -> Runs at initial render
// nothing -> Runs at initial render and runds at every render
// [data]  -> Runs at initial render and runs after every rerender if data has changed since last time

//[term, data] -> useEffect second argument array can have mulitple elements and useEffect is going
//to run everytime if EITHER of them changes.

//IMP Thing - re-render doesnt mean only re running return method everytime but also all the line 
//from  starting of the function component to the end.

//----------------------------------------------------------------------------------------------
//dangerouslySetInnerHTML - helps to render string as HTML
//Whenever we are using a third party API we may be introduced by a security hole into our code
//particularly a specific hole called as XSS attack, (XSS - cross site scripting) attack, This is
//where we accidentally pick up HTML from untrusted source and redner them. Using this some 
//melecious person can execute some Javascript in our application which is a threat.so whenever
//we are using dangerouslysetinnerHTML we have to make sure the dat ais coming from trusted source.

//-----------------------------------------------------------------------------------------------
//setTimeout 
//whenever we call setTimeout(), we get some interger value which is called as identifier,
//clearTimeout(identifier number) is used to delete the setTimeout function by passing the identifier
//number to it.

//----------------------------------------------------------------------------------------------
//useEffect
//the below first argument arrow funciton gets executed on
//1. on initial render and
//2. when the term value changes
// useEffect(() => {

// }, [term])

//UseEffect is allowed to return ONLY an another function not variables or object etc

// useEffect(() => {
//   console.log('Initial render and on term changes')

//   return () => {
//     console.log('Clean up function executed')
//   }
// },[term])

//Very first time the code inside useEffect arrow function will get executed and will return
//only the function meaning only the refernce to the return function will be there

//1. Refresh the broweser
//2. Cosole statement -> Initial render and on term changes
//3. user types and state "term" changes
//4. Console statements -> two console statements printed
  //Clean up function executed
  //Initial render and on term changes
//5. the return function on second time useEffect calling will be saved as a ref and will be called
//on next time execution of the useEffect()
 
//------------------------------------------------------------------------------------------------
//Warning error :React Hook useEffect has a missing dependency: 'resultList.length'. Either 
//include it or remove the dependency array  react-hooks/exhaustive-deps

//Reason: whenever we refer to any state or prop inside the useEffect the react specifically expect
//them to be mentioned as a part of dependency array which is none other than the second arg array
//of the useEffect, so in our case we need to mention [term,resultList],but on doing so 
//useEffect will be called even when the result state is changing which is not what we want so 
//going with teh debounce term approach

//------------------------------------------------------------------------------------------------
