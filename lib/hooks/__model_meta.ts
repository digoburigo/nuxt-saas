/* eslint-disable */
const metadata = {
    fields: {
        user: {
            id: {
                name: 'id',
                type: 'String',
                isId: true,
                attributes: [{ name: '@default', args: [] }],
            },
            firstName: {
                name: 'firstName',
                type: 'String',
                isOptional: true,
            },
            lastName: {
                name: 'lastName',
                type: 'String',
                isOptional: true,
            },
            name: {
                name: 'name',
                type: 'String',
                isOptional: true,
            },
            email: {
                name: 'email',
                type: 'String',
            },
            password: {
                name: 'password',
                type: 'String',
            },
            posts: {
                name: 'posts',
                type: 'Post',
                isDataModel: true,
                isArray: true,
                backLink: 'author',
            },
            sessions: {
                name: 'sessions',
                type: 'Session',
                isDataModel: true,
                isArray: true,
                backLink: 'user',
            },
        },
        post: {
            id: {
                name: 'id',
                type: 'String',
                isId: true,
                attributes: [{ name: '@default', args: [] }],
            },
            createdAt: {
                name: 'createdAt',
                type: 'DateTime',
                attributes: [{ name: '@default', args: [] }],
            },
            updatedAt: {
                name: 'updatedAt',
                type: 'DateTime',
                attributes: [{ name: '@updatedAt', args: [] }],
            },
            title: {
                name: 'title',
                type: 'String',
            },
            content: {
                name: 'content',
                type: 'String',
            },
            published: {
                name: 'published',
                type: 'Boolean',
                attributes: [{ name: '@default', args: [{ value: false }] }],
            },
            author: {
                name: 'author',
                type: 'User',
                isDataModel: true,
                backLink: 'posts',
                isRelationOwner: true,
                foreignKeyMapping: { id: 'authorId' },
            },
            authorId: {
                name: 'authorId',
                type: 'String',
                isForeignKey: true,
            },
        },
        todo: {
            id: {
                name: 'id',
                type: 'String',
                isId: true,
                attributes: [{ name: '@default', args: [] }],
            },
            createdAt: {
                name: 'createdAt',
                type: 'DateTime',
                attributes: [{ name: '@default', args: [] }],
            },
            updatedAt: {
                name: 'updatedAt',
                type: 'DateTime',
                attributes: [{ name: '@updatedAt', args: [] }],
            },
            title: {
                name: 'title',
                type: 'String',
            },
            completed: {
                name: 'completed',
                type: 'Boolean',
                attributes: [{ name: '@default', args: [{ value: false }] }],
            },
        },
        session: {
            id: {
                name: 'id',
                type: 'String',
                isId: true,
                attributes: [{ name: '@default', args: [] }],
            },
            expiresAt: {
                name: 'expiresAt',
                type: 'DateTime',
            },
            user: {
                name: 'user',
                type: 'User',
                isDataModel: true,
                backLink: 'sessions',
                isRelationOwner: true,
                foreignKeyMapping: { id: 'userId' },
            },
            userId: {
                name: 'userId',
                type: 'String',
                isForeignKey: true,
            },
        },
    },
    uniqueConstraints: {
        user: {
            id: {
                name: 'id',
                fields: ['id'],
            },
            email: {
                name: 'email',
                fields: ['email'],
            },
        },
        post: {
            id: {
                name: 'id',
                fields: ['id'],
            },
        },
        todo: {
            id: {
                name: 'id',
                fields: ['id'],
            },
        },
        session: {
            id: {
                name: 'id',
                fields: ['id'],
            },
        },
    },
    deleteCascade: {
        user: ['Session'],
    },
    authModel: 'User',
};
export default metadata;
