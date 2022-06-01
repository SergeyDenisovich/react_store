export const productArrayFromCart = (obj) =>
  Object.keys(obj)
    .map((key) => obj[key])
    .flat();
