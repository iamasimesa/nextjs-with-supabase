export const PRODUCTS_LIST = /* GraphQL */ `
  query ProductsList {
    productsCollection(filter: { is_active: { eq: true } }) {
      edges {
        node { id title price currency slug }
      }
    }
  }
`;

export const PRODUCT_BY_SLUG = /* GraphQL */ `
  query ProductBySlug($slug: String!) {
    productsCollection(filter: { slug: { eq: $slug } }, first: 1) {
      edges {
        node { id title price currency slug description }
      }
    }
  }
`;