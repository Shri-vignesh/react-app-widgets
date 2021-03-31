import {useEffect,useState} from 'react';

const Route = ({route, children}) => {
  const [pathName,setpathName] = useState(window.location.pathname)

  useEffect(() =>{
    const onLocationChange = () => {
      //Step 5 : wantedly trying to change the state so that component gets re-rendered
      setpathName(window.location.pathname)
    }

    //Step 4: creating a seperate call back function onLocationChange so that it would be convinient
    //to remove the created event listener in future
    window.addEventListener('popstate',onLocationChange);

    return () => {
      window.removeEventListener('popstate', onLocationChange);
    }
  },[])

  return pathName === route ? children : null
}

export default Route;