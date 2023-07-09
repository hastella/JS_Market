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
