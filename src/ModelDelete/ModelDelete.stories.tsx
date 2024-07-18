import type { Meta, StoryObj } from '@storybook/react';
import { ModelDelete } from './ModelDelete';

const meta = {
    title: 'Model/ModelDelete/ModelDelete',
    component: ModelDelete,
    args: {
        affected: [],
        prevented: [],
        deleted: [],
    }
} satisfies Meta<typeof ModelDelete>
export default meta;

type Story = StoryObj<typeof meta>;

export const Affected: Story = {
    args: {
        affected: [{
            type: 'Noir',
            id: 75,
            value: 'Chinatown',
            extra: 'Jack Nicholson'
        },
        {
            type: 'Comedy',
            id: 4353,
            value: 'The Hangover',
            extra: 'Bradley Cooper'
        },
        {
            type: 'Horror',
            id: 8543,
            value: 'Hereditary',
            extra: 'Ari Aster'
        },
        {
            type: 'Horror',
            id: '343c',
            value: 'The Thing',
            extra: 'John Carpenter'
        },
        {
            type: 'Action/Thriller',
            id: 221,
            value: 'Sicario',
            extra: 'Emily Blunt'
        }],
        prevented: [],
        deleted: [],
    }
};

export const Prevented: Story = {
    args: {
        affected: [],
        prevented: [{
            type: 'Thriller',
            id: 69,
            value: 'Alien',
            extra: 'Sigourney Weaver'
        }],
        deleted: [],
    }
};

export const Deleted: Story = {
    args: {
        affected: [],
        prevented: [],
        deleted: [{
            type: 'Noir',
            id: 75,
            value: 'Blood Simple',
            extra: 'Frances McDormand'
        },
        {
            type: 'Sci-Fi',
            id: 4353,
            value: 'Dune: Part Two',
            extra: 'Denis Villeneuve'
        }]
    }
};

export const AllConflicts: Story = {
    args: {
        affected: [{
            type: 'Noir',
            id: 75,
            value: 'Chinatown',
            extra: 'Jack Nicholson'
        },
        {
            type: 'Comedy',
            id: 4353,
            value: 'The Hangover',
            extra: 'Bradley Cooper'
        }],
        prevented: [{
            type: 'Thriller',
            id: 69,
            value: 'Alien',
            extra: 'Sigourney Weaver'
        }],
        deleted: [{
            type: 'Noir',
            id: 75,
            value: 'Blood Simple',
            extra: 'Frances McDormand'
        },
        {
            type: 'Sci-Fi',
            id: 4353,
            value: 'Dune: Part Two',
            extra: 'Denis Villeneuve'
        }],
    }
};

export const NoConflicts: Story = {
    args: {
        affected: [],
        prevented: [],
        deleted: [],
    }
}

export const DataOverload: Story = {
    args: {
        affected: [
            {
                type: 'Noir',
                id: 75,
                value: 'Blood Simple',
                extra: 'Frances McDormand'
            },
            {
                type: 'Sci-Fi',
                id: 4353,
                value: 'Dune: Part Two',
                extra: 'Denis Villeneuve'
            },
            {
                type: 'Noir',
                id: 75,
                value: 'Blood Simple',
                extra: 'Frances McDormand'
            },
            {
                type: 'Sci-Fi',
                id: 4353,
                value: 'Dune: Part Two',
                extra: 'Denis Villeneuve'
            },
            {
                type: 'Noir',
                id: 75,
                value: 'Blood Simple',
                extra: 'Frances McDormand'
            },
            {
                type: 'Sci-Fi',
                id: 4353,
                value: 'Dune: Part Two',
                extra: 'Denis Villeneuve'
            },
            {
                type: 'Noir',
                id: 75,
                value: 'Blood Simple',
                extra: 'Frances McDormand'
            },
            {
                type: 'Sci-Fi',
                id: 4353,
                value: 'Dune: Part Two',
                extra: 'Denis Villeneuve'
            },
            {
                type: 'Noir',
                id: 75,
                value: 'Blood Simple',
                extra: 'Frances McDormand'
            },
            {
                type: 'Sci-Fi',
                id: 4353,
                value: 'Dune: Part Two',
                extra: 'Denis Villeneuve'
            },
            {
                type: 'Noir',
                id: 75,
                value: 'Blood Simple',
                extra: 'Frances McDormand'
            },
            {
                type: 'Sci-Fi',
                id: 4353,
                value: 'Dune: Part Two',
                extra: 'Denis Villeneuve'
            }
        ],
        prevented: [
            {
                type: 'Noir',
                id: 75,
                value: 'Blood Simple',
                extra: 'Frances McDormand'
            },
            {
                type: 'Sci-Fi',
                id: 4353,
                value: 'Dune: Part Two',
                extra: 'Denis Villeneuve'
            },
            {
                type: 'Noir',
                id: 75,
                value: 'Blood Simple',
                extra: 'Frances McDormand'
            },
            {
                type: 'Sci-Fi',
                id: 4353,
                value: 'Dune: Part Two',
                extra: 'Denis Villeneuve'
            },
            {
                type: 'Noir',
                id: 75,
                value: 'Blood Simple',
                extra: 'Frances McDormand'
            },
            {
                type: 'Sci-Fi',
                id: 4353,
                value: 'Dune: Part Two',
                extra: 'Denis Villeneuve'
            },
            {
                type: 'Noir',
                id: 75,
                value: 'Blood Simple',
                extra: 'Frances McDormand'
            },
            {
                type: 'Sci-Fi',
                id: 4353,
                value: 'Dune: Part Two',
                extra: 'Denis Villeneuve'
            },
            {
                type: 'Noir',
                id: 75,
                value: 'Blood Simple',
                extra: 'Frances McDormand'
            },
            {
                type: 'Sci-Fi',
                id: 4353,
                value: 'Dune: Part Two',
                extra: 'Denis Villeneuve'
            },
            {
                type: 'Noir',
                id: 75,
                value: 'Blood Simple',
                extra: 'Frances McDormand'
            },
            {
                type: 'Sci-Fi',
                id: 4353,
                value: 'Dune: Part Two',
                extra: 'Denis Villeneuve'
            }
        ],
        deleted: [
            {
                type: 'Noir',
                id: 75,
                value: 'Blood Simple',
                extra: 'Frances McDormand'
            },
            {
                type: 'Sci-Fi',
                id: 4353,
                value: 'Dune: Part Two',
                extra: 'Denis Villeneuve'
            },
            {
                type: 'Noir',
                id: 75,
                value: 'Blood Simple',
                extra: 'Frances McDormand'
            },
            {
                type: 'Sci-Fi',
                id: 4353,
                value: 'Dune: Part Two',
                extra: 'Denis Villeneuve'
            },
            {
                type: 'Noir',
                id: 75,
                value: 'Blood Simple',
                extra: 'Frances McDormand'
            },
            {
                type: 'Sci-Fi',
                id: 4353,
                value: 'Dune: Part Two',
                extra: 'Denis Villeneuve'
            },
            {
                type: 'Noir',
                id: 75,
                value: 'Blood Simple',
                extra: 'Frances McDormand'
            },
            {
                type: 'Sci-Fi',
                id: 4353,
                value: 'Dune: Part Two',
                extra: 'Denis Villeneuve'
            },
            {
                type: 'Noir',
                id: 75,
                value: 'Blood Simple',
                extra: 'Frances McDormand'
            },
            {
                type: 'Sci-Fi',
                id: 4353,
                value: 'Dune: Part Two',
                extra: 'Denis Villeneuve'
            },
            {
                type: 'Noir',
                id: 75,
                value: 'Blood Simple',
                extra: 'Frances McDormand'
            },
            {
                type: 'Sci-Fi',
                id: 4353,
                value: 'Dune: Part Two',
                extra: 'Denis Villeneuve'
            }
        ]
    }
}