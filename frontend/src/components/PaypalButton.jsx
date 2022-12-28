import { PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector, useDispatch } from "react-redux";
import { payOrder } from "../actions/orderActions";

const PayPalButton = (props) => {
  const dispatch = useDispatch();
  const { orderId } = props;
  const { order } = useSelector((store) => store.orderDetailsss);
  //   function to round off to two decimals
  const roundOff = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order
          .create({
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: roundOff(order.totalPrice),
                },
              },
            ],
          })
          .then((orderId) => {
            // Your code here after create the order
            return orderId;
          });
      }}
      onApprove={async (data, actions) => {
        const paymentResult = await actions.order.capture();
        dispatch(payOrder(orderId, paymentResult));
      }}
      onCancel={() => {
        return alert("sorry your order was cancelled");
      }}
    />
  );
};

export default PayPalButton;
