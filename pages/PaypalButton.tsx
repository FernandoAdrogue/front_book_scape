import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useAuthContext } from "@/context/AuthContext";

const bookscapeback = process.env.NEXT_PUBLIC_BOOKSCAPEBACK;

interface PaypalButtonInterface {
  totalValue: string;
  invoice: string;
}

const PaypalButton: React.FC<PaypalButtonInterface> = (props) => {
  const { user } = useAuthContext();
  
  const handleSuccessfulPayment = async (orderId:any) => {
    // Almacenar la información de la orden en Local Storage
    const orderData = {
      orderId,
      totalValue: props.totalValue,
      invoice: props.invoice,
      userId: user?.id,
    };

    localStorage.setItem("orderData", JSON.stringify(orderData));
  };

  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: props.invoice,
              amount: {
                value: props.totalValue,
              },
            },
          ],
        });
      }}
      onApprove={async (data, actions) => {
        const order = await actions.order?.capture();
        console.log("order", order);

        const orderResponse = await axios.post(`${bookscapeback}/orders`, {
          orden: order,
          factura: props.invoice,
          id: user?.id,
        });
        console.log("orderResponse", orderResponse);
        // Almacenar el ID de la orden en Local Storage

        handleSuccessfulPayment(order?.id);
      }}
    />
  );
};

export default PaypalButton;
