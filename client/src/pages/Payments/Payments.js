import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import Spinner from '../../components/elements/Spinner';

import { getStripeAccountLink, getStripeAccount } from '../../state/payment/paymentActions';
import CreateStripeAccount from './CreateStripeAccount';

const Payments = ({ user }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [stripeAccountChargesEnabled, setStripeAccountChargesEnabled] = useState(false);
  const [stripeAccount, setStripeAccount] = useState(null);

  useEffect(() => {
    dispatch({ type: 'NAV_PAYMENTS' });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchStripeAccount();
    // eslint-disable-next-line
  }, []);

  const fetchStripeAccount = async () => {
    setLoading(true);
    const account = await getStripeAccount();
    setStripeAccount(account);

    if (account) {
      console.log(account);
      setStripeAccountChargesEnabled(account.charges_enabled || false);
    }
    setLoading(false);
  };

  return (
    <div className="px-4">
      {loading ? (
        <div className="flex justify-center mt-10">
          <Spinner />
        </div>
      ) : !stripeAccountChargesEnabled ? (
        <CreateStripeAccount />
      ) : (
        <div>
          <h1>Setup! Woohoo!</h1>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(Payments);
