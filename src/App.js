import { useState } from 'react';

function History({ allClicks }) {
  if (allClicks.length === 0) {
    return (
      <div>
        The app is used by pressing buttons.
      </div>
    );
  } else {
    return (
      <div>
        button press history: {allClicks.join(', ')}
      </div>
    );
  };
};
function Button({ handleClick, text }) {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  );
};

function App() {
  const [ value, setValue ] = useState(10);
  function setToValue(newValue) {
    return function () {
      console.log('value now', newValue);
      setValue(newValue);
    }
  }

  return (
    <div>
      {value}
      <Button handleClick={setToValue(1000)} text='thousand' />
      <Button handleClick={setToValue(0)} text='reset' />
      <Button handleClick={setToValue(value + 1)} text='increment' />
    </div>
  )

}

export default App;