import { useState } from 'react';
import './App.css';

function App() {
  const [list, setList] = useState([]);
  const [undid, setUndid] = useState([]);

  const handleClick = (event) => {
    const newDot = {
      clientX: event.clientX,
      clientY: event.clientY
    };

    console.log(newDot);
    setList((prev) => [...prev, newDot]);
    setUndid([]);
  };

  const handleUndo = (event) => {
    event.stopPropagation();
    console.log('undo');

    if(list.length === 0) {
      return;
    }

    const lastItem = list[list.length - 1];
    setUndid((prev) => [...prev, lastItem]);

    setList((prev) => (prev.slice(0, -1)));
  };

  const handleRedo = (event) => {
    event.stopPropagation();
    console.log('redo');

    if(list.length === 0 && undid.length === 0) {
      return;
    }

    if(undid.length === 0) {
      return;
    }

    const lastItemUndid = undid[undid.length - 1];
    setUndid((prev) => (prev.slice(0, -1)));
    setList((prev) => [...prev, lastItemUndid]);
  };

  
  return (
    <div id='page' onClick={handleClick}>
      <button onClick={handleUndo}>Desfazer</button>
      <button onClick={handleRedo}>Refazer</button>
      {list.map((item, index) => (
        <span 
          key={index}
          className='dot'
          style={{ left: item.clientX, top: item.clientY }}  
       />
      ))} 
    </div>
  );
}

export default App;
