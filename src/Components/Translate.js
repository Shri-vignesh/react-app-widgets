import React,{useState} from 'react';
import Dropdown from './Dropdown';
import Convert from './Convert';

const languageOptions = [
  {
    label: 'Tamil',
    value: 'ta'
  },
  {
    label: 'Afrikaans',
    value: 'af'
  },
  {
    label: 'Arabic',
    value: 'ar'
  },
  {
    label: 'Hindi',
    value: 'hi'
  }
]

const Translate = () => {
  const[selected, setselected] = useState(languageOptions[0])
  const [text, setText] = useState('');

  return(
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Text</label>
          <input value={text} onChange={(e) => setText(e.target.value)}></input>
        </div>
      </div>     
      <Dropdown 
        label= "Select a Language"
        options= {languageOptions}
        selected={selected}
        setselected = {setselected}/>
      <h3 className="ui header">Output</h3>
      <Convert text={text} language={selected}/>
    </div>
  );
}

export default Translate;