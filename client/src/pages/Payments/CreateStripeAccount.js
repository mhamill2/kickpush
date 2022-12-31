import { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/elements/Button';
import Spinner from '../../components/elements/Spinner';

import { getStripeAccountLink } from '../../state/payment/paymentActions';

const CreateStripeAccount = ({ user }) => {
  const [loading, setLoading] = useState(false);

  const startStripeFlow = async () => {
    setLoading(true);
    const accountLink = await getStripeAccountLink();
    setLoading(false);

    if (accountLink?.url) {
      window.location.href = accountLink.url;
    } else {
      console.log('Error getting account link');
    }
  };

  return (
    <div className="flex flex-col mt-5">
      <h1 className="text-lg font-bold">Register a Method of Payment</h1>
      <p className="text-sm mb-8">
        In order to be paid for your lessons, you must register a payment method <span className="text-xs">(Powered by Stripe)</span>
      </p>
      {loading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <Button content="Setup a Payment Method" isPrimary={true} size={'large'} onClick={startStripeFlow} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(CreateStripeAccount);
