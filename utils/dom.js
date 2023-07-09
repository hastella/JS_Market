export const makeDomWithProperties = (domType, propertyMap) => {
  // domType : div, a, li...
  // propertyMap : { className: "product-card", src: "public/assets/파프리카.jpg", alt: "파프리카" }
  // Object.keys(propertyMap) : ["className", "src", "alt"]

  const dom = document.createElement(domType);
  Object.keys(propertyMap).forEach((key) => {
    dom[key] = propertyMap[key]; // dom.className = "product-card"
  });
  return dom; // <div class="product-card"></div>
};

export const appendChildrenList = (target, childrenList) => {
  if (!Array.isArray(childrenList)) return; // childrenList가 배열이 아니면 함수 종료

  childrenList.forEach((children) => {
    target.appendChild(children);
  });
};
