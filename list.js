import { getProductCard } from "./module/productCard.js";

const sectionDOM = document.getElementsByTagName("section")[0];

const productCard = getProductCard({
  id: 4,
  imgSrc: "/public/assets/삼겹살.jpg",
  name: "구이용 삼겹살 600g (냉장)",
  discountPercent: 5,
  originalPrice: 15600,
});
const productCard2 = getProductCard({
  id: 5,
  imgSrc: "/public/assets/머핀.jpg",
  name: "[홍대 W마켓] 머핀 (2입)",
  discountPercent: 20,
  originalPrice: 6000,
});
sectionDOM.appendChild(productCard);
sectionDOM.appendChild(productCard2);
