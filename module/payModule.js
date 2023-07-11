import { getCartInfo } from "./cartToggleBtn.js";

const DELIVERY_FREE_PRICE = 20000;
const DELIVERY_FEE = 3000;

const originalPriceDOM = document.getElementById("original-price");
const discountPriceDOM = document.getElementById("discount-price");
const deliveryPriceDOM = document.getElementById("delivery-price");
const totalPriceDOM = document.getElementById("total-price");

export const setPayInfo = () => {
  // 1. 장바구니에서 물품 정보 얻어오기
  // 2. 물품 정보들을 순회하면서 총 가격, 할인가격, 배송비, 결제금액 계산하기
  // 3. 2번에서 계산된 금액들을 DOM.innerHTML로 설정하기

  const cartInfoList = getCartInfo(); // 1. 장바구니에서 물품 정보 얻어오기
  console.log(cartInfoList);

  let deliveryPrice = 0; // 20,000원 이상 무료배송, 미만 3,000원

  // 배열의 reduce 메서드를 사용해서 할인 금액 계산하기
  // array1.reduce(함수, 초기화값)
  const { originalPrice, discountPrice } = cartInfoList.reduce(
    (prev, curr) => ({
      originalPrice: prev.originalPrice + curr.originalPrice,
      discountPrice: prev.discountPrice + (curr.originalPrice - curr.price),
    }),
    {
      originalPrice: 0,
      discountPrice: 0,
    }
  );

  // forEach 메서드를 사용해서 할인 금액 계산하기
  // cartInfoList.forEach((cartInfo) => {
  //   originalPrice += cartInfo.originalPrice; // 복합 할당 연산자 (originalPrice = originalPrice + cartInfo.originalPrice)
  //   discountPrice += cartInfo.originalPrice - cartInfo.price; // 할인 금액 계산하기 (discountPrice = originalPrice - price)
  // });

  // 실제 총 상품 금액 = 원래 가격들의 합 - 할인된 가격들의 합
  // 실제 결제 금액 = 실제 총 상품 금액 + 배송비

  const payPrice = originalPrice - discountPrice;
  if (payPrice < DELIVERY_FREE_PRICE) {
    deliveryPrice += DELIVERY_FEE;
  }
  // totalPrice = payPrice + deliveryPrice;

  originalPriceDOM.innerHTML = `${originalPrice.toLocaleString()}원`;
  discountPriceDOM.innerHTML = discountPrice
    ? `-${discountPrice.toLocaleString()}원`
    : "0원";
  deliveryPriceDOM.innerHTML = deliveryPrice
    ? `+${deliveryPrice.toLocaleString()}원`
    : "0원";
  totalPriceDOM.innerHTML = `${(payPrice + deliveryPrice).toLocaleString()}원`;
};
