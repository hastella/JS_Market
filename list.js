import { fetchSectionListData } from "./module/fetch.js";
import { setButtonEvent } from "./module/productFilter.js";
import { getProductList } from "./module/productList.js";

// 물품 목록을 모두 불러와서 페이지에 띄우기 => productList.js getProductList 함수사용!

const sectionInfoList = await fetchSectionListData();
const productList = sectionInfoList.reduce(
  //newArr에 curr의 productList를 넣어준다. => prev + curr.productList
  (prev, curr) => [...prev, ...curr.productList],
  []
);

const section = document.getElementsByTagName("section")[0];
const productListDOM = getProductList(productList);
section.appendChild(productListDOM);
// productListDOM을 section에 넣어준다.

setButtonEvent(productList);
