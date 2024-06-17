import Products from '../modules/Products/components/Products';
import { ScrollableContent } from '../shared/components/ScrollableContent';
import { Title } from '../shared/components/Title';

const ProductPage = () => {
  return (
    <>
      <Title text="Products" />
      <ScrollableContent>
        <Products />
      </ScrollableContent>
    </>
  );
};

export default ProductPage;
