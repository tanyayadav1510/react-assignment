/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect} from 'react';
import { ImageList, ImageListItem, Typography } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import Axios from 'axios';
import Modal from '../ProductItem/ProductItem';
import {styles} from './products.styles';
import type { Item } from '../../types/product_item';


const fetchProductsData = async ({ pageParam = 1 }) => {
  const response = await Axios.get(`https://dummyjson.com/products?limit=10&skip=${pageParam}`);
  return response.data;
};

export default function Products(){
  const [open, setOpen] = useState(false);
  const [curIndex, setCurIndex] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Item | null>(null);
  const [products, setProducts] = useState<Item[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hasFetchedNext, setHasFetchedNext] = useState(false);
  

  const { data, isLoading, isError, error, fetchNextPage, isFetching, isFetchingNextPage,
    hasNextPage} = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: fetchProductsData,
    staleTime: 60000,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      const lastProduct = lastPage.products[lastPage.products.length - 1];
      return lastProduct ? lastProduct.id : undefined;
    },
  });
  
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement || document.body;
    if (clientHeight < scrollHeight && scrollHeight - scrollTop - clientHeight < 5 && hasNextPage && !isFetchingNextPage && !hasFetchedNext) {
      fetchNextPage();
      setHasFetchedNext(true);
      setScrollPosition(scrollHeight-100);
    }
  };

  useEffect(() => {
    // This useEffect runs after the initial render
    if (data) {
      const newProducts = data.pages[data.pages.length - 1].products;
      console.log(newProducts)
      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      window.scrollTo(0, scrollPosition);
      setHasFetchedNext(false);
      
    }
  }, [data]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, hasNextPage, isFetchingNextPage, fetchNextPage]);

  

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

  if (isFetching || isLoading || isError) {
    return (
      <div style={styles.centerContainer}>
        {(isFetching || isLoading) ? (
          <img style={styles.centerContainerImage} src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.webp" alt="loading.." />
        ) : (
          <h2>{error?.message ?? 'An error occurred.'}</h2>
        )}
      </div>
    );
  }


  return (
    <>
      <div style={styles.container}>
        <ImageList style={styles.imageList} cols={styles.imageList.cols}>
          {products.map((item) => (
              <ImageListItem key={item.id} style={styles.imageListItem} onClick={() => handleProductClick(item)}>
                <img
                  srcSet={item.thumbnail}
                  src={item.thumbnail}
                  alt={item.title}
                  style={styles.productImage}
                />
              <Typography key={item.id} style={styles.productTitle} gutterBottom>{item.title}</Typography>
              <Typography key={item.id} style={styles.productDescription} gutterBottom>{item.description.slice(0, 40)+'...'}</Typography>  
              </ImageListItem>
          ))}
        </ImageList>
      </div>
      <Modal
        open={open}
        onClose={handleCloseModal}
        modalId={curIndex}
        totalItems={data?.pages[0].total}
        imageSrc={selectedProduct?.thumbnail}
        title={selectedProduct?.title}
        description={selectedProduct?.description}
        moveNext={() => moveToPage(curIndex, 'next')}
        movePrev={() => moveToPage(curIndex, 'prev')}
      />
    </>
  );
};
