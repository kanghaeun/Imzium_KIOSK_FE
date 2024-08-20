import { useState } from "react";
import styled from "styled-components";
import ProductModal from "../modal/ProductModal";
import OrderDetailsContent from "../modal/OrderDetailContent";

const products = [
  { name: "초코라떼", price: "₩ 6,800", image: "coffee.png" },
  { name: "초코라떼", price: "₩ 6,800", image: "coffee.png" },
  { name: "초코라떼", price: "₩ 6,800", image: "coffee.png" },
  { name: "초코라떼", price: "₩ 6,800", image: "coffee.png" },
  { name: "초코라떼", price: "₩ 6,800", image: "coffee.png" },
  { name: "초코라떼", price: "₩ 6,800", image: "coffee.png" },
  { name: "초코라떼", price: "₩ 6,800", image: "coffee.png" },
  { name: "초코라떼", price: "₩ 6,800", image: "coffee.png" },
];
const ProductGrid = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalStep, setModalStep] = useState("options");
  const [quantity, setQuantity] = useState(1);
  const [temperature, setTemperature] = useState("hot");
  const [size, setSize] = useState("medium");
  const [syrup, setSyrup] = useState("none");

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setModalStep("options");
    setQuantity(1);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalStep("options");
  };

  const handleNext = () => {
    setModalStep("details");
  };

  const handlePrevious = () => {
    setModalStep("options");
  };

  const handleOrderType = (type) => {
    setModalStep("payment");
  };

  const orderDetails = [
    {
      name: selectedProduct?.name || "상품명",
      price: selectedProduct?.price || "가격",
      options: [temperature, size, syrup],
    },
    // 다른 주문 항목을 추가하려면 여기에 추가
  ];

  const getModalContent = () => {
    switch (modalStep) {
      case "options":
        return (
          <OptionsContent>
            <LeftColumn>
              <ProductImage
                src={selectedProduct?.image}
                alt={selectedProduct?.name}
              />
              <ProductName>{selectedProduct?.name}</ProductName>
              <ProductPrice>{selectedProduct?.price}</ProductPrice>
              <QuantityControl>
                <QuantityButton
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </QuantityButton>
                <QuantityDisplay>{quantity}</QuantityDisplay>
                <QuantityButton onClick={() => setQuantity(quantity + 1)}>
                  +
                </QuantityButton>
              </QuantityControl>
            </LeftColumn>
            <RightColumn>
              <OptionSection>
                <OptionTitle>온도</OptionTitle>
                <OptionButton
                  selected={temperature === "ice"}
                  onClick={() => setTemperature("ice")}
                >
                  ICE
                </OptionButton>
                <OptionButton
                  selected={temperature === "hot"}
                  onClick={() => setTemperature("hot")}
                >
                  HOT
                </OptionButton>
              </OptionSection>
              <OptionSection>
                <OptionTitle>사이즈</OptionTitle>
                <OptionButton
                  selected={size === "small"}
                  onClick={() => setSize("small")}
                >
                  Small
                </OptionButton>
                <OptionButton
                  selected={size === "medium"}
                  onClick={() => setSize("medium")}
                >
                  Medium
                </OptionButton>
                <OptionButton
                  selected={size === "large"}
                  onClick={() => setSize("large")}
                >
                  Large
                </OptionButton>
              </OptionSection>
              <OptionSection>
                <OptionTitle>시럽</OptionTitle>
                <OptionButton
                  selected={syrup === "none"}
                  onClick={() => setSyrup("none")}
                >
                  없음
                </OptionButton>
                <OptionButton
                  selected={syrup === "vanilla"}
                  onClick={() => setSyrup("vanilla")}
                >
                  바닐라
                </OptionButton>
                <OptionButton
                  selected={syrup === "hazelnut"}
                  onClick={() => setSyrup("hazelnut")}
                >
                  헤이즐넛
                </OptionButton>
              </OptionSection>
            </RightColumn>
          </OptionsContent>
        );
      case "details":
        return <OrderDetailsContent details={orderDetails} />;
      case "payment":
        return (
          <PaymentContent>
            <p>카드결제 내용</p>
          </PaymentContent>
        );
      default:
        return null;
    }
  };

  const getModalButtons = () => {
    switch (modalStep) {
      case "options":
        return [
          {
            label: "닫기",
            onClick: closeModal,
            style: {
              backgroundColor: "#C5C7C9",
              color: "white",
              padding: "20px 100px",
              fontSize: "204px !important", // 폰트 사이즈 증가
              fontWeight: "bold", // 폰트 굵기 증가
            },
          },
          {
            label: "담기",
            onClick: handleNext,
            style: {
              backgroundColor: "#729F96",
              color: "white",
              padding: "20px 100px",
              fontSize: "24px", // 폰트 사이즈 증가
              fontWeight: "bold", // 폰트 굵기 증가
            },
          },
        ];
      case "details":
        return [
          {
            label: "이전",
            onClick: handlePrevious,
            style: {
              backgroundColor: "#C5C7C9",
              color: "white",
              padding: "20px 100px",
              fontSize: "20px", // 폰트 사이즈 조정
              fontWeight: "bold", // 폰트 굵기 조정
            },
          },
          {
            label: "매장",
            onClick: () => handleOrderType("매장"),
            style: {
              backgroundColor: "#729F96",
              color: "white",
              padding: "20px 40px",
              fontSize: "20px", // 폰트 사이즈 조정
              fontWeight: "bold", // 폰트 굵기 조정
              marginRight: "10px", // 매장과 포장 버튼 간격 좁히기
            },
          },
          {
            label: "포장",
            onClick: () => handleOrderType("포장"),
            style: {
              backgroundColor: "#729F96",
              color: "white",
              padding: "20px 40px",
              fontSize: "20px", // 폰트 사이즈 조정
              fontWeight: "bold", // 폰트 굵기 조정
            },
          },
        ];
      case "payment":
        return [
          {
            label: "취소",
            onClick: closeModal,
            style: {
              backgroundColor: "#f0f0f0",
              color: "black",
              padding: "20px 100px",
              fontSize: "20px",
              fontWeight: "bold",
            },
          },
          {
            label: "결제",
            onClick: () => {
              /* Handle payment */
            },
            style: {
              backgroundColor: "#729F96",
              color: "white",
              padding: "20px 100px",
              fontSize: "20px",
              fontWeight: "bold",
            },
          },
        ];
      default:
        return [];
    }
  };

  return (
    <>
      <Grid>
        {products.map((product, index) => (
          <ProductCard key={index} onClick={() => handleProductClick(product)}>
            <ProductImage src={product.image} alt={product.name} />
            <ProductName>{product.name}</ProductName>
            <ProductPrice>{product.price}</ProductPrice>
          </ProductCard>
        ))}
      </Grid>
      <ProductModal
        isOpen={!!selectedProduct}
        onClose={closeModal}
        title={
          modalStep === "options"
            ? "옵션 선택"
            : modalStep === "details"
            ? "주문 세부내역"
            : "카드결제"
        }
        buttons={getModalButtons()}
      >
        {getModalContent()}
      </ProductModal>
    </>
  );
};

export default ProductGrid;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 155px);
  gap: 14px;
  justify-content: center;
  margin-bottom: 60px;
  margin-top: 100px;
`;

const ProductCard = styled.div`
  position: relative;
  width: 155px;
  height: 205px;
  background-color: #ffffff;
  border: 0.4px solid #2d2d2d;
  box-sizing: border-box;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
`;

const ProductName = styled.div`
  position: relative;
  bottom: 20px;
  font-size: 18px;
`;

const ProductPrice = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 17px;
  color: #333;
`;

const OptionsContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LeftColumn = styled.div`
  width: 45%;
`;

const RightColumn = styled.div`
  width: 45%;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  font-size: 20px;
  background-color: #f0f0f0;
  border: none;
  cursor: pointer;
`;

const QuantityDisplay = styled.div`
  width: 40px;
  text-align: center;
  font-size: 18px;
`;

const OptionSection = styled.div`
  margin-bottom: 20px;
`;

const OptionTitle = styled.h3`
  margin-bottom: 10px;
`;

const OptionButton = styled.button`
  margin-right: 10px; /* 버튼 간격 조정 */
  padding: 5px 10px;
  background-color: ${(props) => (props.selected ? "#2196F3" : "#f0f0f0")};
  color: ${(props) => (props.selected ? "white" : "black")};
  border: none;
  cursor: pointer;
`;

const PaymentContent = styled.div``;
