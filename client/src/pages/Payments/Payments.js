import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Spinner from '../../components/elements/Spinner';

import { getStripeAccountLink, getStripeAccount } from '../../state/payment/paymentActions';
import CreateStripeAccount from './CreateStripeAccount';

const Payments = ({ user }) => {
  const dispatch = useDispatch();
  const params = new URLSearchParams(useLocation().search);
  const stripeRefresh = params.get('stripeRefresh');

  const [loading, setLoading] = useState(false);
  const [stripeFlowLoading, setStripeFlowLoading] = useState(false);
  const [stripeAccountChargesEnabled, setStripeAccountChargesEnabled] = useState(false);

  useEffect(() => {
    dispatch({ type: 'NAV_PAYMENTS' });
    fetchStripeAccount();
    // eslint-disable-next-line
  }, []);

  const fetchStripeAccount = async () => {
    setLoading(true);
    const account = await getStripeAccount();

    if (account) {
      setStripeAccountChargesEnabled(account.charges_enabled || false);
    }

    setLoading(false);
  };

  const startStripeFlow = async () => {
    setStripeFlowLoading(true);
    const accountLink = await getStripeAccountLink();

    if (accountLink?.url) {
      window.location.href = accountLink.url;
    } else {
      setStripeFlowLoading(false);
    }
  };

  if (stripeRefresh) {
    startStripeFlow();
  }

  return (
    <div className="px-4">
      {loading ? (
        <div className="flex justify-center mt-10">
          <Spinner />
        </div>
      ) : !stripeAccountChargesEnabled ? (
        <CreateStripeAccount startStripeFlow={startStripeFlow} stripeFlowLoading={stripeFlowLoading} />
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
