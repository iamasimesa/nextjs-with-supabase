export const MY_ACTIVE_CART = /* GraphQL */ `
  query MyActiveCart {
    cartsCollection(filter: { status: { eq: "active" } }, first: 1) {
      edges {
        node {
          id
          status
          cart_itemsCollection {
            edges {
              node {
                id
                quantity
                product: products {
                  id
                  title
                  price
                  currency
                  slug
                }
              }
            }
          }
        }
      }
    }
  }
`;