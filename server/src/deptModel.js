export default event => {
  console.log('yabladu '+event.data);
  console.log(event);
  

  // countProducts(api: GraphQLClient, id: string): Promise<{ User }> {
  //   const query = `
  //   query {
  //     _allProductsMeta(filter: {
  //       accessRole: ADMIN
  //     }) {
  //       count
  //     }
  //   }
  //   `
  //
  //   const variables = {
  //     id,
  //   }
  //
  //   return api.request<{ User }>(query, variables)
  // }

  return {
    data: {
      message: `Hello`
    }
  }
}
