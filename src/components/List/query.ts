import gql from 'graphql-tag';

export const QUERY_LIST = gql`
   query charactersList($name: String) {
        characters(page: 1, filter: { name: $name }) {
            info {
                count
            }
            results {
                id
                name
                image
            }
        }
  }
`;

