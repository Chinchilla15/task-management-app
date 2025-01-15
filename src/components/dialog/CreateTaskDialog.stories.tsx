import { Meta, StoryObj } from "@storybook/react";
import { CreateTaskDialog } from "./CreateTaskDialog";
import { ApolloProvider } from "@apollo/client";
import { mockApolloClient } from "@/mocks/mockApolloClient";

const mockUsers = [
  { id: "1", fullName: "John Doe", avatar: null },
  { id: "2", fullName: "Jane Doe", avatar: null },
];

const CreateTaskDialogWithProviders = () => {
  const client = mockApolloClient({
    mocks: {
      Query: {
        users: () => ({ users: mockUsers }),
      },
      Mutation: {
        createTask: () => ({
          createTask: { id: "1", name: "Task 1", status: "Backlog" },
        }),
      },
    },
  });

  return (
    <ApolloProvider client={client}>
      <div className="flex h-screen items-center justify-center">
        <CreateTaskDialog />
      </div>
    </ApolloProvider>
  );
};

const meta: Meta<typeof CreateTaskDialogWithProviders> = {
  title: "Components/Dialog/CreateTaskDialog",
  component: CreateTaskDialogWithProviders,
  parameters: {
    layout: { fullscreen: true },
    docs: {
      description: {
        component: `
          CreateTaskDialog is a complex dialog component that handles task creation.
          It includes:
          - Form validation using react-hook-form and zod
          - GraphQL mutations for creating tasks
          - Dynamic form fields for assignee selection, point estimates, and tags
        `,
      },
    },
  },
  args: {},
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof CreateTaskDialogWithProviders>;

export const Default: Story = {};
