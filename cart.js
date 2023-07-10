import { getCartInfo } from "./module/cartToggleBtn.js";
import { getProductList } from "./module/productList.js";
import { makeDomWithProperties } from "./utils/dom.js";

// 1. 장바구니에 있는 물품 정보 가져오기
// 2. 물품 정보 - productList와 연결하기
// 3. section 아래의 cart-pay-container 앞에 productList를 삽입하기

const sectionDOM = document.getElementsByTagName("section")[0];
const cartPayContainerDOM = document.getElementById("cart-pay-container");
const reloadPage = () => location.reload();

const cartInfo = getCartInfo(); // 1. 장바구니에 있는 물품 정보 가져오기
if (cartInfo.length < 1) {
  // 장바구니가 비었을 때
  const noticeDOM = makeDomWithProperties("div", {
    innerHTML: "장바구니가 비었습니다.",
    className: "product-list-con",
  });
  sectionDOM.insertBefore(noticeDOM, cartPayContainerDOM);
} else {
  const productListDOM = getProductList(cartInfo, reloadPage); // 2. 물품 정보 - productList와 연결하기
  sectionDOM.insertBefore(productListDOM, cartPayContainerDOM); // 3. section 아래의 cart-pay-container 앞에 productList를 삽입하기
  // A.insertBefore(B, C);
  // A의 자식 노드 중 C를 찾아서 그 앞에 B를 삽입한다.
}
