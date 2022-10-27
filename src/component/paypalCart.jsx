// Custom component to wrap the PayPalButtons and handle currency changes
import { useEffect } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";

const style = {"layout":"vertical"};
const ButtonWrapper = ({ currency, showSpinner,preciototal,renderPago }) => {
    const amount = preciototal;
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);

    
    return (<>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={renderPago}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            console.log("orden",orderId)
                            return orderId;
                        });
                }}
                onApprove={function (data, actions) {
                    return actions.order.capture().then((details) => {
                        debugger
                        const name = details.payer.name.given_name;
                        alert(`Transaction completed by ${name}`);
                    });
                }}
            />
        </>
    );
}

export default ButtonWrapper;