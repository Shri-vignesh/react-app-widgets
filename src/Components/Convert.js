import React,{useState,useEffect} from 'react';
import axios from 'axios';


const Convert = ({text,language}) => {
  const[translatedText,settranslatedtext] = useState('');

  //Stephen has followed a debounce term approach for this useEffect here
  useEffect(() => {
    const translateAPICall = async() => {
      //for post request in axios the 2nd arg is always a body( some info to send along)
      const {data} = await axios.post('https://translation.googleapis.com/language/translate/v2',{},{
        params:{
          q: text,
          target: language.value,
          key:'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
        }
      }) 

      settranslatedtext(data.data.translations[0].translatedText)
    }

    const timerId = setTimeout(() => {
      if(text)
        translateAPICall()
    },1000)

    return () => {
      clearTimeout(timerId);
    }
    
  },[text,language])

  
  return(
    <div>
      <h1 className="ui header">{translatedText}</h1>
    </div>
  );
}

export default Convert;