import { getProductList } from "./module/productList.js";
import { getProductSection } from "./module/productSection.js";

const body = document.getElementsByTagName("body")[0];
try {
  const response = await fetch("public/mock/sectionListData.json");
  const data = await response.json();
  const sectionInfoList = data.sectionInfoList;

  sectionInfoList.forEach((sectionInfo) => {
    console.log(sectionInfo);
    const { sectionTitle, productList } = sectionInfo;
    const productSectionDOM = getProductSection(sectionTitle, productList);
    body.appendChild(productSectionDOM);
  });
} catch (error) {
  console.log(error);
}
