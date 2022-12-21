
import { useEffect, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    if (data && data.products) {
      setProducts(data.products);
    }
    console.log(products);
  };
  const selectpage = (selectpageno) => {
    if(selectpageno>=1 && selectpageno<=products.length/10 &&selectpageno!==page)
    setPage(selectpageno);
  };
  useEffect(() => {
    fetchProducts();
  }, [page]);
  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((prod) => {
            return (
              <span key={prod.id} className="products__single">
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span onClick={() => selectpage(page - 1)}  className={page>1?"":"pagination_disabled"}>⬅️</span>
          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span className={page===i+1?"pagination__selected":""} onClick={() => selectpage(i + 1)} key={i}>
                {i + 1}
              </span>
            );
          })}
          <span onClick={() => selectpage(page + 1)}
          className={page<products.length/10?"":"pagination_disabled"}>➡️</span>
        </div>
      )}
    </div>
  );
}
