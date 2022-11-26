import { useState, forwardRef, useImperativeHandle } from 'react';

const Toggle = forwardRef(({ children }, refs) => {
  const[visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      handleClick
    };
  });
  return(
    <>
      {visible && children}
      <button onClick={handleClick}>{visible ? 'Hide' : 'Show'}</button>
    </>
  );
});

Toggle.displayName = 'Toggle';
export default Toggle;