import { useState, forwardRef, useImperativeHandle } from 'react';
import { Button, Spacer } from '@nextui-org/react';
import PropTypes from 'prop-types';

const Toggle = forwardRef(({ children }, refs) => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      handleClick,
    };
  });
  return (
    <>
      {visible && children}
      <Spacer y={2} />
      <Button flat='true' onClick={handleClick} auto='true'>
        {visible ? 'Hide' : 'Show'}
      </Button>
    </>
  );
});

Toggle.propTypes = {
  children: PropTypes.node.isRequired,
};

Toggle.displayName = 'Toggle';
export default Toggle;
