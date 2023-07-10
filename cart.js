import { getCartInfo } from "./module/cartToggleBtn.js";
import { getProductList } from "./module/productList.js";
import { makeDomWithProperties } from "./utils/dom.js";
const sectionDOM = document.getElementsByTagName("section")[0];
const cartPayContainerDOM = document.getElementById("cart-pay-container");
const cartInfo = getCartInfo();

if (cartInfo.length < 1) {
  // 장바구니가 비었을 때
  const noticeDOM = makeDomWithProperties("div", {
    innerHTML: "장바구니가 비었습니다.",
    className: "product-list-con",
  });
  sectionDOM.insertBefore(noticeDOM, cartPayContainerDOM);
} else {
  const productListDOM = getProductList(cartInfo);
  sectionDOM.insertBefore(productListDOM, cartPayContainerDOM);
  // A.insertBefore(B, C);
  // A의 자식 노드 중 C를 찾아서 그 앞에 B를 삽입한다.
}
