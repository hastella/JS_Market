import { CART_COOKIE_KEY } from "./constants/cart.js";
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

const cartAllDeleteBtnDOM = document.getElementById("remove-all-button");
cartAllDeleteBtnDOM.onclick = () => {
  // 장바구니 비우기
  const result = confirm("장바구니를 비우시겠습니까?");
  if (!result) return;
  localStorage.removeItem(CART_COOKIE_KEY);
  location.reload();
};
// location.clear();
// removeItem 메서드를 사용하면 key를 인자로 넘겨서 해당 key에 해당하는 value를 삭제할 수 있다. -> cartInfo라는 키를 가진 key-value 쌍이 삭제된다.
// clear 메서드를 사용하면 localStorage의 모든 key-value 쌍을 삭제한다. -> 현재는 cartInfo 만 저장을 하여 상관이 없지만, 다른 정보도 저장하는 경우에는 주의해야 한다.
