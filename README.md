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

### 상품 카드 구현 - DOM 다루기

상품 카드 구현을 위한 getProductCard 함수입니다. productInfo를 매개변수로 받아 imgSrc, name, discountPercent, price, originalPrice 중 필요한 데이터를 추출해서 사용하여 상품 카드에 정보를 나타내주게 됩니다.

함수 내부에서는 DOM 요소를 생성하고, 이를 조합하여 상품 카드를 구현합니다. **makeDomWithProperties** 함수는 지정된 태그 이름과 속성을 가진 DOM 요소를 생성하는 유틸리티 함수입니다. **appendChildrenList** 함수는 부모 DOM 요소에 여러 자식 DOM 요소를 추가하는 함수입니다.

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
  // productImageCon.appendChild(productImage);
  // productImageCon.appendChild(cartToggleBtn);
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

배열 메서드, location 객체, 이벤트 핸들링, localStorage, 네트워크 통신, 데이터 저장(JSON)
