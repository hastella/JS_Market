import { makeDomWithProperties, appendChildrenList } from "../utils/dom.js";
import { getCartToggleBtn } from "./cartToggleBtn.js";

export const getProductCard = (productInfo, removeCartCallback) => {
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
  const cartToggleBtn = getCartToggleBtn(productInfo, removeCartCallback);

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

// const productCard = document.createElement("div");
// productCard.className = "product-card";
//
// const productImageCon = document.createElement("div");
// productImageCon.className = "product-image-con";
//
// const productImage = document.createElement("img");
// productImage.src = "public/assets/파프리카.jpg";
// productImage.alt = "파프리카";

/* <div class="product-card">
<div class="product-image-con">
   <img src="public/assets/파프리카.jpg" alt="파프리카 2입">
   <button type="button" class="cart-toggle-btn">
      <img src="public/assets/cart.png" class="cart-image">
   </button>
</div>
<div class="product-description">
   <div class="product-name">파프리카 2입</div>
   <div class="product-price-con">
      <div class="product-discount-percent">20%</div>
      <div class="product-price">2,000원</div>
   </div>
   <div class="product-original-price">2,500원</div>
</div>
</div> */
