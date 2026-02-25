export const MY_ORDERS = /* GraphQL */ `
  query MyOrders {
    ordersCollection(orderBy: [{ created_at: DescNullsLast }]) {
      edges {
        node {
          id
          status
          total_amount
          currency
          created_at
        }
      }
    }
  }
`;

export const ORDER_BY_ID = /* GraphQL */ `
  query OrderById($id: UUID!) {
    ordersCollection(filter: { id: { eq: $id } }, first: 1) {
      edges {
        node {
          id
          status
          total_amount
          currency
          created_at
          order_itemsCollection {
            edges {
              node {
                id
                title
                unit_price
                quantity
              }
            }
          }
        }
      }
    }
  }
`;