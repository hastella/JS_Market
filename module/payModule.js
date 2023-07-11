import { getCartInfo } from "./cartToggleBtn.js";

const DELIVERY_FREE_PRICE = 20000;
const DELIVERY_FEE = 3000;

const originalPriceDOM = document.getElementById("original-price");
const discountPriceDOM = document.getElementById("discount-price");
const deliveryPriceDOM = document.getElementById("delivery-price");
const totalPriceDOM = document.getElementById("total-price");

const setPayInfo = () => {
  // 1. 장바구니에서 물품 정보 얻어오기
  // 2. 물품 정보들을 순회하면서 총 가격, 할인가격, 배송비, 결제금액 계산하기
  // 3. 2번에서 계산된 금액들을 DOM.innerHTML로 설정하기

  const cartInfoList = getCartInfo(); // 1. 장바구니에서 물품 정보 얻어오기

  let originalPrice = 0;
  let discountPrice = 0;
  let deliveryPrice = 0; // 20,000원 이상 무료배송, 미만 3,000원
  cartInfoList.forEach((cartInfo) => {
    originalPrice += cartInfo.originalPrice; // 복합 할당 연산자 (originalPrice = originalPrice + cartInfo.originalPrice)
    discountPrice += cartInfo.originalPrice - cartInfo.price; // 할인 금액 계산하기 (discountPrice = originalPrice - price)
  });

  // 배열의 reduce 메서드를 사용해서 할인 금액 계산하기
  // array1.reduce(함수, 초기화값)

  // 실제 총 상품 금액 = 원래 가격들의 합 - 할인된 가격들의 합
  // 실제 결제 금액 = 실제 총 상품 금액 + 배송비

  const payPrice = originalPrice - discountPrice;
  if (payPrice < DELIVERY_FREE_PRICE) {
    deliveryPrice += DELIVERY_FEE;
  }

  originalPriceDOM.innerHTML = originalPrice;
  discountPriceDOM.innerHTML = discountPrice;
  deliveryPriceDOM.innerHTML = deliveryPrice;
  totalPriceDOM.innerHTML = payPrice + deliveryPrice;
};

{
  /* <div id="cart-pay-container">
<ul>
  <li>
    <span class="cart-pay-info-title">상품 금액</span>
    <span id="original-price" class="cart-pay-info-value">38,000</span>
  </li>
  <li>
    <span class="cart-pay-info-title">할인 금액</span>
    <span id="discount-price" class="cart-pay-info-value">0</span>
  </li>
  <li>
    <span class="cart-pay-info-title">배송비</span>
    <span id="delivery-price" class="cart-pay-info-value">+3,000</span>
    <span id="delivery-description"
      >20,000원 이상 주문 시 무료배송</span
    >
  </li>
  <li>
    <span class="cart-pay-info-title">결제예정금액</span>
    <span id="total-price" class="cart-pay-info-value">41,000</span>
  </li>
</ul>
<button type="button">결제하기</button>
</div> */
}
