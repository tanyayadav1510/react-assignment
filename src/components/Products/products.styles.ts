export const styles = {
  container: {
    width: '100%',
  },
  imageList: {
    cols: 3,
    marginLeft: '5%',
    marginTop: '8%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productLink: {
    textDecoration: 'none',
    color: 'black',
  },
  imageListItem: {
    width: '90%',
    height: '90%',
    display: 'flex',
    cursor: 'pointer',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '50%',
    height: '50%',
    objectFit: 'cover' as const,
    display: 'block',
  },
  productTitle: {
    marginTop:"10px",
    variant: 'subtitle1',
    align: 'center',
    gutterBottom: true,
    fontWeight: 'bold',
  },
  productDescription: {
    marginTop:"10px",
    variant: 'subtitle2',
    align: 'center',
    gutterBottom: true,
  },
  centerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: "100vh",
  },
  centerContainerImage: {
    height:"50px", 
    width:"50px"
  }
};