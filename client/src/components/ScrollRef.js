import { useRef, useEffect } from 'react';

const ScrollRef = () => {
  const divRef = useRef(null);
  const count = useRef(0);

  useEffect(() => {
    // Snap to the bottom of the messages on first render
    if (count.current === 0) {
      divRef.current.scrollIntoView();
    } else {
      divRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    count.current++;
    // eslint-disable-next-line
  });

  return <div ref={divRef} />;
};

export default ScrollRef;
