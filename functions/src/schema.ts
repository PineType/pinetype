const {gql} = require('apollo-server-express');

const schema = gql`
  scalar Date

  type User {
    id: ID!
    name: String!
    email: String!
    birthday: Date
    location: Geo
    avatar: String
    slug: String
  }
  
  type Geo {
    lat: Float
    lon: Float
    name: String
  }

  type Note {
    id: ID!
    userId: ID
    text: String!
    metadata: Metadata
  }

  type Metadata {
    noteId: ID
    date: Date
    title: String!
    location: [Geo]
    weather: Weather
    sentiment: Float
    typingPattern: [TypingPattern]
  }

  type Weather {
    date: Date!
    location: Geo
    high: Float
    low: Float 
    sky: String
    wind: String
    pressure: Int
  }

  type TypingPattern {
    paragraphId: Int
    speed: Float
  }
  
  type Query {
    users: [User]
    notes: [Note]
  }

`;

export default schema;
