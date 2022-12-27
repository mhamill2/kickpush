import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Payments = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'NAV_PAYMENTS' });
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold">Payments</h1>
      </div>
    </div>
  );
};

export default Payments;
