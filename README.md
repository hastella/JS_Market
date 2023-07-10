# JS_Market

순수 자바스크립트를 연습하기 위해 만들어보는 마켓 서비스 사이트

## 📝 서비스 기획

### 메인 페이지

- 모든 페이지는 네비게이션을 포함
- 메인 페이지의 상단에 '전체상품 보러가기' 버튼이 있음
- 메인 페이지에는 상품 섹션이 나뉘어져 있음
- 상품 카드는 썸네일, 장바구니 버튼, 상품명, 할인율, 가격, 기존가격으로 구성되어 있음

### 상품 카드

- 상품 카드의 장바구니 버튼은 현재 상태를 반영: 장바구니에 이미 담긴 경우 회색버튼, 담기지 않은 경우 파란색 버튼 노출
- 장바구니에 담는 액션 구현: confirm창 노출 후 리턴값에 따른 기능 구현
- 장바구니에 담는 액션은 localStorage를 통해 구현

### 장바구니 페이지

- 전제삭제 버튼이 있고, 클릭시 장바구니에 저장된 항목 모두 삭제되고 페이지 리프레시
- 페이지 하단에는 상품 카드 리스트 존재
- 장바구니 결제 화면에는 '상품 금액, 할인금액, 배송비, 결제예정금액'으로 구성됨
- 배송비는 총 상품금액이 2만원 이상이면 0원, 이하인 경우 3000원

### 리스트 페이지

- 필터 화면에서 최소금액, 최대금액, 최소 할인율 세팅 가능
- 금액 입력 시 돈 단위를 나타내는 ,와 '원'이 추가되어 노출되고, 할인율은 %가 추가되어 노출됨
- 검색 버튼 클릭시 필터에 따른 상품 리스트 노출됨

<br>

## 기능 구현

### 💡 상품 카드 구현 - DOM 다루기

상품 카드 구현을 위한 **getProductCard** 함수입니다. productInfo를 매개변수로 받아 imgSrc, name, discountPercent, price, originalPrice 중 필요한 데이터를 추출해서 사용하여 상품 카드에 정보를 나타내주게 됩니다.

함수 내부에서는 DOM 요소를 생성하고, 이를 조합하여 상품 카드를 구현합니다. **makeDomWithProperties** 함수는 지정된 태그 이름과 속성을 가진 DOM 요소를 생성하는 유틸리티 함수입니다. **appendChildrenList** 함수는 부모 DOM 요소에 여러 자식 DOM 요소를 추가하는 함수입니다.

상품 카드를 구성하는 각 요소들은 makeDomWithProperties 함수를 사용하여 생성되며, appendChildrenList 함수를 사용하여 상위 요소에 자식 요소로 추가됩니다.

```
import { makeDomWithProperties, appendChildrenList } from "../utils/dom.js";
import { getCartToggleBtn } from "./cartToggleBtn.js";

export const getProductCard = (productInfo) => {
  const { imgSrc, name, discountPercent, price, originalPrice } = productInfo;
  // 특정 DOM 생성
  const productCard = makeDomWithProperties("div", {
    className: "product-card",
  });

  // --- product-image-con ---
  const productImageCon = makeDomWithProperties("div", {
    className: "product-image-con",
  });
  const productImage = makeDomWithProperties("img", {
    src: imgSrc,
    alt: name,
  });
  const cartToggleBtn = getCartToggleBtn(productInfo);

  appendChildrenList(productImageCon, [productImage, cartToggleBtn]);
  // --- product-image-con ---

  // --- product-description ---
  const productDescription = makeDomWithProperties("div", {
    className: "product-description",
  });
  const productName = makeDomWithProperties("div", {
    className: "product-name",
    innerText: name,
  });
  const productPriceCon = makeDomWithProperties("div", {
    className: "product-price-con",
  });
  const productDiscountPercent = makeDomWithProperties("div", {
    className: "product-discount-percent",
    innerText: `${discountPercent}%`,
  });
  const productPrice = makeDomWithProperties("div", {
    className: "product-price",
    innerText: `${price.toLocaleString()}원`,
  });
  const productOriginalPrice = makeDomWithProperties("div", {
    className: "product-original-price",
    innerText: `${originalPrice.toLocaleString()}원`,
  });
  appendChildrenList(productPriceCon, [productDiscountPercent, productPrice]);
  appendChildrenList(productDescription, [
    productName,
    productPriceCon,
    productOriginalPrice,
  ]);
  // --- product-description ---

  appendChildrenList(productCard, [productImageCon, productDescription]);

  return productCard;
};
```

### 💡 상품 목록 구현

상품 목록 구현을 위한 **getProductList** 함수입니다. <br>상품 정보 객체들의 배열을 나타내는 productInfoList 매개변수로 받아줍니다. 매개변수로 받아와 준 배열의 값이 유효한지 우선 확인하기 위해 조건문을 이용한 null 처리를 통해 배열이 존재하는 경우에만 return 하도록 하였습니다.

```
[
  {
    "id": 1,
    "imgSrc": "/public/assets/예시.jpg",
    "name": "예시 2입",
    "discountPercent": 20,
    "price": 2000,
    "originalPrice": 2500
  },
  {
    "id": 2,
    "imgSrc": "/public/assets/예시2.jpg",
    "name": "예시2 500g",
    "discountPercent": 30,
    "price": 2000,
    "originalPrice": 3000
  },
]
```

함수 내부에서는 makeDomWithProperties 함수를 사용하여 상품 목록을 담는 컨테이너를 위해 productListContainer라는 DIV 요소를 생성합니다.<br> **productInfoList** 배열을 순회하면서 각 상품 정보 (productInfo)를 getProductCard 함수에 넘겨주어 상품 카드 DOM 요소를 생성합니다. 이때, productInfo 객체의 속성들을 펼쳐서 개별적인 인자로 전달할 수 있도록 스프레드 문법을 사용하였습니다.

```
import { makeDomWithProperties } from "../utils/dom.js";
import { getProductCard } from "./productCard.js";

export const getProductList = (productInfoList) => {
  if (productInfoList == null || !Array.isArray(productInfoList)) return;
  const productListContainer = makeDomWithProperties("div", {
    className: "product-list-con",
  });

  productInfoList.forEach((productInfo) => {
    productListContainer.appendChild(
      getProductCard({
        ...productInfo, //spread 문법
      })
    );
  });
  return productListContainer;
};
```

이렇게 getProductCard 함수의 매개변수로 전달되어 생성된 상품 카드 DOM 요소는 productListContainer에 추가됩니다.
<br>

### 💡 장바구니에 담기 & 삭제 구현 - localStorage 이용

localStorage를 이용하여 구현한 장바구니에 담기 & 삭제입니다. **getCartInfo** 함수를 이용해 로컬 스토리지에서 장바구니 정보를 가져와 줍니다. **localStorage.getItem(CART_COOKIE_KEY)** 를 호출하여 로컬 스토리지에서 CART_COOKIE_KEY로 저장된 값을 가져옵니다. 가져온 값은 JSON 문자열이므로 JSON.parse를 사용하여 JavaScript 객체로 변환합니다. 만약 값이 null이거나 없을 경우 빈 배열을 반환하도록 하였습니다.<br>
장바구니 담기를 위한 **addCartInfo** 함수에서는 장바구니에 담겨 있는 정보와 장바구니에 담을 상품의 정보를 비교하여 중복된 상품인지를 검사합니다. 이때, **Array.some** 메서드를 이용하여 이미 장바구니에 있는 상품인 경우 추가하지 않고 함수를 종료하도록 하였습니다. 그렇지 않은 경우, **JSON.stringify([...originalCartInfo, productInfo])** 를 통해 기존 장바구니 정보와 새로운 상품 정보를 결합하여 로컬 스토리지에 저장합니다.<br>
장바구니에 담긴 상품을 삭제하기 위한 **removeCartInfo** 함수는 cartInfo의 id를 매개변수로 받아와 getCartInfo 함수를 호출하여 현재 장바구니 정보를 가져옵니다. **Array.filter** 메서드를 사용하여 id와 일치하지 않는 상품들로 이루어진 새로운 장바구니 정보를 생성합니다. 이후 새로운 장바구니 정보를 로컬 스토리지에 저장합니다.

```
export const getCartInfo = () =>
  JSON.parse(localStorage.getItem(CART_COOKIE_KEY)) || [];

const addCartInfo = (productInfo) => {
  const originalCartInfo = getCartInfo();

  // some 메소드를 통해 배열의 요소 중에서 조건을 만족하는 요소가 존재하는지 확인
  if (originalCartInfo.some((cartInfo) => cartInfo.id === productInfo.id)) {
      return;
    }

  localStorage.setItem(
    CART_COOKIE_KEY,
    JSON.stringify([...originalCartInfo, productInfo])
  );
};

const removeCartInfo = ({ id }) => {
  const originalCartInfo = getCartInfo();

  const newCartInfo = originalCartInfo.filter((cartInfo) => cartInfo.id !== id);
  localStorage.setItem(CART_COOKIE_KEY, JSON.stringify(newCartInfo));
};

```

<br>

### 💡 장바구니 토글 버튼 구현

특정 상품이 장바구니에 있는지 확인하는 **isInCart** 함수입니다. 구조분해 할당으로 productInfo의 필요한 값인 id를 매개변수로 받아오도록 해주고, getCartInfo 함수를 호출하여 현재 장바구니 정보를 가져옵니다. 배열의 요소 중에서 콜백 함수가 하나라도 참을 반환하는지를 검사하는 **Array.some** 메서드를 사용하여 장바구니에 있는지 확인합니다. 만약 장바구니에 id와 일치하는 상품이 있다면 some 메소드는 true를 반환하고, 일치하는 상품이 없다면 false를 반환합니다.

```
const isInCart = ({ id }) => {
  // productInfo를 다 넘겨주어도, 구조분해 할당으로 필요한 id값만 받아오도록 구현
  const originalCartInfo = getCartInfo();

  return originalCartInfo.some((cartInfo) => cartInfo.id === id);
};
```

<br>
아래 코드는 장바구니 버튼 구현을 위한 getCartToggleBtn 함수입니다. 우선 isInCart(productInfo) 함수를 호출하여 해당 상품이 장바구니에 있는지를 확인하여 이를 기반으로 초기 상태로 inCart 변수를 설정합니다.<br>
cartToggleBtn 버튼 요소를 생성하여 onclick 속성에 대한 콜백 함수를 정의해 주었습니다. 클릭 이벤트에 따라 상품이 이미 장바구니에 있는 경우와 없는 경우에 대해 각각 다른 동작을 수행합니다.<br>상품이 이미 장바구니에 있는 경우, confirm 창을 통해 삭제 여부를 묻고, 확인 결과에 따라 removeCartInfo 함수를 호출하여 상품을 장바구니에서 삭제합니다. 삭제되는 경우 cartImage의 이미지를 active하게 변경해줍니다.<br>상품이 장바구니에 없는 경우, addCartInfo 함수를 호출하여 상품을 장바구니에 추가합니다. 또한 cartImage의 이미지를 disabled하게 변경하고, confirm 창을 노출시켜 장바구니 페이지로 이동할지에 대한 확인 후 이동하도록 구현해주었습니다.

```
export const getCartToggleBtn = (productInfo) => {
  let inCart = isInCart(productInfo);
  const cartToggleBtn = makeDomWithProperties("button", {
    className: "cart-toggle-btn",
    type: "button",
    onclick: () => {
      if (inCart) {
        const result = confirm(
          `${productInfo.name}을 장바구니에서 삭제하시겠습니까?`
        );
        if (!result) return; // early-return
        removeCartInfo(productInfo);
        cartImage.src = "public/assets/cart.png";
      } else {
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
```
