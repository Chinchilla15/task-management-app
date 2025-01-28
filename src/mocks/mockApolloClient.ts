// src/lib/test-utils/mockApolloClient.ts
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { SchemaLink } from "@apollo/client/link/schema";
import { makeExecutableSchema } from "@graphql-tools/schema";

export const mockApolloClient = ({ mocks }: { mocks: any }) => {
  const schema = makeExecutableSchema({
    typeDefs: `
      scalar DateTime

      enum PointEstimate {
        ZERO
        ONE
        TWO
        FOUR
        EIGHT
      }

      enum Status {
        BACKLOG
        CANCELLED
        DONE
        IN_PROGRESS
        TODO
      }

      enum TaskTag {
        ANDROID
        IOS
        NODE_JS
        RAILS
        REACT
      }

      enum UserType {
        ADMIN
        CANDIDATE
      }

      type User {
        id: ID!
        avatar: String
        createdAt: DateTime!
        email: String!
        fullName: String!
        type: UserType!
        updatedAt: DateTime!
      }

      type Task {
        id: ID!
        assignee: User
        createdAt: DateTime!
        creator: User!
        dueDate: DateTime!
        name: String!
        pointEstimate: PointEstimate!
        position: Float!
        status: Status!
        tags: [TaskTag!]!
      }

      input CreateTaskInput {
        assigneeId: String
        dueDate: DateTime!
        name: String!
        pointEstimate: PointEstimate!
        status: Status!
        tags: [TaskTag!]!
      }

      input DeleteTaskInput {
        id: String!
      }

      input UpdateTaskInput {
        assigneeId: String
        dueDate: DateTime
        id: String!
        name: String
        pointEstimate: PointEstimate
        position: Float
        status: Status
        tags: [TaskTag!]
      }

      input FilterTaskInput {
        assigneeId: String
        dueDate: DateTime
        name: String
        ownerId: String
        pointEstimate: PointEstimate
        status: Status
        tags: [TaskTag!]
      }

      type Query {
        profile: User!
        tasks(input: FilterTaskInput!): [Task!]!
        users: [User!]!
      }

      type Mutation {
        createTask(input: CreateTaskInput!): Task!
        deleteTask(input: DeleteTaskInput!): Task!
        updateTask(input: UpdateTaskInput!): Task!
      }
    `,
    resolvers: {
      Query: mocks.Query,
      Mutation: mocks.Mutation,
    },
  });

  return new ApolloClient({
    link: new SchemaLink({ schema }),
    cache: new InMemoryCache(),
  });
};
