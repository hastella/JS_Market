import { makeDomWithProperties, appendChildrenList } from "../utils/dom.js";
import { getCartToggleBtn } from "./cartToggleBtn.js";

export const getProductCard = (productInfo, removeCartCallback) => {
  const { imgSrc, name, discountPercent, originalPrice } = productInfo;
  const price = originalPrice * (1 - discountPercent / 100);
  productInfo.price = price;
  console.log(productInfo);

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
    innerText: `${price}원`,
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
