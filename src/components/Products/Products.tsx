import { useState } from 'react';
import { ImageList, ImageListItem, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';
import Modal from '../ProductItem/ProductItem';
import {styles} from './products.styles';
import type { Item } from '../../types/product_item';

export const Products = () => {
  const [open, setOpen] = useState(false);
  const [curIndex, setCurIndex] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Item | null>(null);
  const [products, setProducts] = useState<Item[]>([]);

  const fetchProductsData = async () => {
    const response = await Axios.get<Item[]>('https://fakestoreapi.com/products');
    setProducts(response.data);
    return response;
  };

  const { isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProductsData,
  });

  const moveToPage = (index: number | undefined, direction: 'next' | 'prev') => {
    if (typeof index === 'number') {
      const newIndex = direction === 'next' ? index + 1 : index - 1;
      setCurIndex(newIndex);
      setSelectedProduct(products[newIndex - 1]);
    }
  };

  const handleProductClick = (item: Item | undefined) => {
    if (item !== undefined) {
      setCurIndex(item.id);
      setOpen(true);
      setSelectedProduct(item || null);
    }
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setOpen(false);
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div style={styles.container}>
        <ImageList style={styles.imageList} cols={styles.imageList.cols}>
          {products.map((item) => (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
              key={item.id}
              style={styles.productLink}
              onClick={() => handleProductClick(item)}
            >
              <ImageListItem key={item.id} style={styles.imageListItem}>
                <img
                  srcSet={item.image}
                  src={item.image}
                  alt={item.title}
                  style={styles.productImage}
                />
              <Typography style={styles.productTitle} gutterBottom>{item.title}</Typography>  
              </ImageListItem>
              
            </a>
          ))}
        </ImageList>
      </div>
      <Modal
        open={open}
        onClose={handleCloseModal}
        modalId={curIndex}
        totalItems={products.length}
        imageSrc={selectedProduct?.image}
        title={selectedProduct?.title}
        moveNext={() => moveToPage(curIndex, 'next')}
        movePrev={() => moveToPage(curIndex, 'prev')}
      />
    </>
  );
};
