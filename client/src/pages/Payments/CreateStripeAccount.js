import { connect } from 'react-redux';

import Button from '../../components/elements/Button';
import Spinner from '../../components/elements/Spinner';

const CreateStripeAccount = ({ startStripeFlow, stripeFlowLoading, user }) => {
  const displayText =
    user.accountType === 'instructor'
      ? 'In order to be paid for your lessons, you must register a payment method'
      : 'In order to purchase lessons, you must register a payment method';
  return (
    <div className="flex flex-col mt-5">
      <h1 className="text-lg font-bold">Register a Method of Payment</h1>
      <p className="text-sm mb-8">
        {displayText} <span className="text-xs">(Powered by Stripe)</span>
      </p>
      {stripeFlowLoading ? (
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
