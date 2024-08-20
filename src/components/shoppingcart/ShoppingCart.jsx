import CartClear from "./CartClear";
import CartLits from "./CartLits";
import CartTotal from "./CartTotal";
import CheckoutButton from "./CheckoutButton";
import styled from "styled-components";

const ShoppingCart = ({ onCheckout }) => {
  return (
    <div>
      <ShoppingCartLayout>
        <CartLits />
        <CashContainer>
          <CartTotal />
          <CartClear />
        </CashContainer>
        <CheckoutButton onCheckout={onCheckout} />
      </ShoppingCartLayout>
    </div>
  );
};

export default ShoppingCart;

const ShoppingCartLayout = styled.div`
  display: flex;
  width: 658px;
  height: 112px;
  border: 1px solid;
`;

const CashContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 147px;
  height: 112px;
`;
