import { makeDomWithProperties } from "../utils/dom.js";
import { CART_COOKIE_KEY } from "../constants/cart.js";

export const getCartInfo = () =>
  JSON.parse(localStorage.getItem(CART_COOKIE_KEY)) || [];

const isInCart = ({ id }) => {
  // productInfo를 다 넘겨주어도, 구조분해 할당으로 필요한 id값만 받아오도록 구현
  // 현재 해당 상품이 장바구니 안에 있는지를 판단하여 결과를 반환
  const originalCartInfo = getCartInfo();

  //Array.find
  return !!originalCartInfo.find((cartInfo) => cartInfo.id === id); // true, false
};

const addCartInfo = (productInfo) => {
  // 장바구니에 해당 물품의 정보를 저장해야 한다.

  const originalCartInfo = getCartInfo();

  // 중복 물품인 경우 장바구니에 담기지 않도록 구현
  if (
    originalCartInfo.findIndex((cartInfo) => cartInfo.id === productInfo.id) !==
    -1
  )
    return;

  localStorage.setItem(
    CART_COOKIE_KEY,
    JSON.stringify([...originalCartInfo, productInfo])
  );
};

const removeCartInfo = ({ id }) => {
  const originalCartInfo = getCartInfo();

  // Array.filter
  const newCartInfo = originalCartInfo.filter((cartInfo) => cartInfo.id !== id);
  localStorage.setItem(CART_COOKIE_KEY, JSON.stringify(newCartInfo));
};

export const getCartToggleBtn = (productInfo) => {
  let inCart = isInCart(productInfo);
  const cartToggleBtn = makeDomWithProperties("button", {
    className: "cart-toggle-btn",
    type: "button",
    onclick: () => {
      if (inCart) {
        // 이미 장바구니에 있으면: 장바구니에서 삭제
        const result = confirm(
          `${productInfo.name}을 장바구니에서 삭제하시겠습니까?`
        );
        if (!result) return; // early-return
        removeCartInfo(productInfo);
        cartImage.src = "public/assets/cart.png"; // 클릭시에 이미지가 바로바로 바뀔수 있도록 구현
      } else {
        // 없으면: 장바구니에 추가
        addCartInfo(productInfo);
        cartImage.src = "public/assets/cartDisabled.png";
        const result = confirm(
          "장바구니에 담겼습니다. 장바구니 페이지로 이동하시겠습니까?"
        );
        if (result) {
          location.href = "./cart.html";
        }
      }
      inCart = !inCart;
    },
  });
  const cartImage = makeDomWithProperties("img", {
    className: "cart-image",
    src: inCart ? "public/assets/cartDisabled.png" : "public/assets/cart.png",
  });
  cartToggleBtn.appendChild(cartImage);
  return cartToggleBtn;
};

// <button type="button" class="cart-toggle-btn">
//    <img src="public/assets/cart.png" class="cart-image">
// </button >
