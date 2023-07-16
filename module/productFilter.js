const minPriceFilter = document.getElementById("price-min-filter");
const maxPriceFilter = document.getElementById("price-max-filter");
const discountFilter = document.getElementById("discount-filter");
const filterButton =
  document.getElementsByClassName("product-filter-con")[0]?.lastElementChild;

// 필터버튼 누름 -> min, max, discount 값을 받아옴 -> 값을 이용하여 해당하는 물품을 추출 -> 다시 화면에 나타냄

export const setButtonEvent = () => {
  filterButton.onclick = () => {
    const maxPrice = maxPriceFilter.value;
    const minPrice = minPriceFilter.value;
    const discountRate = discountFilter.value;

    console.log(maxPrice, minPrice, discountRate);
  };
};
