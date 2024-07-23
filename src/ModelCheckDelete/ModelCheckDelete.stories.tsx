import type { Meta, StoryObj } from '@storybook/react';
import { ModelCheckDelete } from './ModelCheckDelete';

function sampleOnCancel() {
  return console.log('cancelled');
}

function sampleOnDelete() {
  return console.log('deleted');
}

const meta = {
  title: 'Model/ModelCheckDelete/ModelCheckDelete',
  component: ModelCheckDelete,
  parameters: {
    layout: 'centered',
  },
  args: {
    affected: [],
    prevented: [],
    deleted: [],
    onCancel: () => console.log('cancelled'),
    onDelete: () => console.log('deleted'),
    className: '',
  },
} satisfies Meta<typeof ModelCheckDelete>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Affected: Story = {
  args: {
    affected: [
      {
        type: 'Noir',
        id: 75,
        value: 'Chinatown',
        extra: 'Jack Nicholson',
      },
      {
        type: 'Comedy',
        id: 4353,
        value: 'The Hangover',
        extra: 'Bradley Cooper',
      },
      {
        type: 'Horror',
        id: 8543,
        value: 'Hereditary',
        extra: 'Ari Aster',
      },
      {
        type: 'Horror',
        id: '343c',
        value: 'The Thing',
        extra: 'John Carpenter',
      },
      {
        type: 'Action/Thriller',
        id: 221,
        value: 'Sicario',
        extra: 'Emily Blunt',
      },
    ],
    prevented: [],
    deleted: [],
    onCancel: sampleOnCancel,
    onDelete: sampleOnDelete,
  },
};

export const Prevented: Story = {
  args: {
    affected: [],
    prevented: [
      {
        type: 'Thriller',
        id: 69,
        value: 'Alien',
        extra: 'Sigourney Weaver',
      },
    ],
    deleted: [],
  },
};

export const Deleted: Story = {
  args: {
    affected: [],
    prevented: [],
    deleted: [
      {
        type: 'Noir',
        id: 75,
        value: 'Blood Simple',
        extra: 'Frances McDormand',
      },
      {
        type: 'Sci-Fi',
        id: 4353,
        value: 'Dune: Part Two',
        extra: 'Denis Villeneuve',
      },
    ],
  },
};

export const AllConflicts: Story = {
  args: {
    affected: [
      {
        type: 'Noir',
        id: 75,
        value: 'Chinatown',
        extra: 'Jack Nicholson',
      },
      {
        type: 'Comedy',
        id: 4353,
        value: 'The Hangover',
        extra: 'Bradley Cooper',
      },
    ],
    prevented: [
      {
        type: 'Thriller',
        id: 69,
        value: 'Alien',
        extra: 'Sigourney Weaver',
      },
    ],
    deleted: [
      {
        type: 'Noir',
        id: 75,
        value: 'Blood Simple',
        extra: 'Frances McDormand',
      },
      {
        type: 'Sci-Fi',
        id: 4353,
        value: 'Dune: Part Two',
        extra: 'Denis Villeneuve',
      },
    ],
  },
};

export const NoConflicts: Story = {
  args: {
    affected: [],
    prevented: [],
    deleted: [],
  },
};

export const DataOverload: Story = {
  args: {
    affected: [
      {
        type: 'Noir',
        id: 75,
        value: 'Blood Simple',
        extra: 'Frances McDormand',
      },
      {
        type: 'Sci-Fi',
        id: 4353,
        value: 'Dune: Part Two',
        extra: 'Denis Villeneuve',
      },
      {
        type: 'Noir',
        id: 75,
        value: 'Blood Simple',
        extra: 'Frances McDormand',
      },
      {
        type: 'Sci-Fi',
        id: 4353,
        value: 'Dune: Part Two',
        extra: 'Denis Villeneuve',
      },
      {
        type: 'Noir',
        id: 75,
        value: 'Blood Simple',
        extra: 'Frances McDormand',
      },
      {
        type: 'Sci-Fi',
        id: 4353,
        value: 'Dune: Part Two',
        extra: 'Denis Villeneuve',
      },
      {
        type: 'Noir',
        id: 75,
        value: 'Blood Simple',
        extra: 'Frances McDormand',
      },
      {
        type: 'Sci-Fi',
        id: 4353,
        value: 'Dune: Part Two',
        extra: 'Denis Villeneuve',
      },
      {
        type: 'Noir',
        id: 75,
        value: 'Blood Simple',
        extra: 'Frances McDormand',
      },
      {
        type: 'Sci-Fi',
        id: 4353,
        value: 'Dune: Part Two',
        extra: 'Denis Villeneuve',
      },
      {
        type: 'Noir',
        id: 75,
        value: 'Blood Simple',
        extra: 'Frances McDormand',
      },
      {
        type: 'Sci-Fi',
        id: 4353,
        value: 'Dune: Part Two',
        extra: 'Denis Villeneuve',
      },
    ],
    prevented: [
      {
        type: 'Noir',
        id: 75,
        value: 'Blood Simple',
        extra: 'Frances McDormand',
      },
      {
        type: 'Sci-Fi',
        id: 4353,
        value: 'Dune: Part Two',
        extra: 'Denis Villeneuve',
      },
      {
        type: 'Noir',
        id: 75,
        value: 'Blood Simple',
        extra: 'Frances McDormand',
      },
      {
        type: 'Sci-Fi',
        id: 4353,
        value: 'Dune: Part Two',
        extra: 'Denis Villeneuve',
      },
      {
        type: 'Noir',
        id: 75,
        value: 'Blood Simple',
        extra: 'Frances McDormand',
      },
      {
        type: 'Sci-Fi',
        id: 4353,
        value: 'Dune: Part Two',
        extra: 'Denis Villeneuve',
      },
      {
        type: 'Noir',
        id: 75,
        value: 'Blood Simple',
        extra: 'Frances McDormand',
      },
      {
        type: 'Sci-Fi',
        id: 4353,
        value: 'Dune: Part Two',
        extra: 'Denis Villeneuve',
      },
      {
        type: 'Noir',
        id: 75,
        value: 'Blood Simple',
        extra: 'Frances McDormand',
      },
      {
        type: 'Sci-Fi',
        id: 4353,
        value: 'Dune: Part Two',
        extra: 'Denis Villeneuve',
      },
      {
        type: 'Noir',
        id: 75,
        value: 'Blood Simple',
        extra: 'Frances McDormand',
      },
      {
        type: 'Sci-Fi',
        id: 4353,
        value: 'Dune: Part Two',
        extra: 'Denis Villeneuve',
      },
    ],
    deleted: [
      {
        type: 'Noir',
        id: 75,
        value: 'Blood Simple',
        extra: 'Frances McDormand',
      },
      {
        type: 'Sci-Fi',
        id: 4353,
        value: 'Dune: Part Two',
        extra: 'Denis Villeneuve',
      },
      {
        type: 'Noir',
        id: 75,
        value: 'Blood Simple',
        extra: 'Frances McDormand',
      },
      {
        type: 'Sci-Fi',
        id: 4353,
        value: 'Dune: Part Two',
        extra: 'Denis Villeneuve',
      },
      {
        type: 'Noir',
        id: 75,
        value: 'Blood Simple',
        extra: 'Frances McDormand',
      },
      {
        type: 'Sci-Fi',
        id: 4353,
        value: 'Dune: Part Two',
        extra: 'Denis Villeneuve',
      },
      {
        type: 'Noir',
        id: 75,
        value: 'Blood Simple',
        extra: 'Frances McDormand',
      },
      {
        type: 'Sci-Fi',
        id: 4353,
        value: 'Dune: Part Two',
        extra: 'Denis Villeneuve',
      },
      {
        type: 'Noir',
        id: 75,
        value: 'Blood Simple',
        extra: 'Frances McDormand',
      },
      {
        type: 'Sci-Fi',
        id: 4353,
        value: 'Dune: Part Two',
        extra: 'Denis Villeneuve',
      },
      {
        type: 'Noir',
        id: 75,
        value: 'Blood Simple',
        extra: 'Frances McDormand',
      },
      {
        type: 'Sci-Fi',
        id: 4353,
        value: 'Dune: Part Two',
        extra: 'Denis Villeneuve',
      },
    ],
  },
};
