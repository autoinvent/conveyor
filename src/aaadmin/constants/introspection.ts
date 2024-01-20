export const INTROSPECTION_QUERY = `
{
  __schema {
    queryType {
      fields { name type {name} }
  	}
    
    mutationType {
      fields {
        name
        type { ofType {name} }
        args { 
          name
          type { 
            kind
            name
            ofType {
              kind
              name
              ofType { kind name }
            }
          } 
        }
      }
    }

    types {
    	name
      kind
      fields {
        name 
        type { 
          name
          kind 
          ofType {
            name 
            kind 
            ofType {
              name kind ofType { kind name }
            }
          } 
        }
      }
  	}
  }
}
`;
