/* eslint-disable */
import type { Prisma, Token } from "@prisma/client";
import type { UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions, InfiniteData } from '@tanstack/vue-query';
import { getHooksContext } from '@zenstackhq/tanstack-query/runtime-v5/vue';
import type { MaybeRefOrGetter, ComputedRef } from 'vue';
import { useModelQuery, useInfiniteModelQuery, useModelMutation } from '@zenstackhq/tanstack-query/runtime-v5/vue';
import type { PickEnumerable, CheckSelect, QueryError, ExtraQueryOptions, ExtraMutationOptions } from '@zenstackhq/tanstack-query/runtime-v5';
import type { PolicyCrudKind } from '@zenstackhq/runtime'
import metadata from './__model_meta';
type DefaultError = QueryError;

export function useCreateToken(options?: Omit<(MaybeRefOrGetter<UseMutationOptions<(Token | undefined), DefaultError, Prisma.TokenCreateArgs, unknown>> | ComputedRef<UseMutationOptions<(Token | undefined), DefaultError, Prisma.TokenCreateArgs, unknown>> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.TokenCreateArgs, DefaultError, Token, true>('Token', 'POST', `${endpoint}/token/create`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.TokenCreateArgs>(
            args: Prisma.SelectSubset<T, Prisma.TokenCreateArgs>,
            options?: Omit<(MaybeRefOrGetter<UseMutationOptions<(CheckSelect<T, Token, Prisma.TokenGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.TokenCreateArgs>, unknown>> | ComputedRef<UseMutationOptions<(CheckSelect<T, Token, Prisma.TokenGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.TokenCreateArgs>, unknown>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, Token, Prisma.TokenGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useCreateManyToken(options?: Omit<(MaybeRefOrGetter<UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.TokenCreateManyArgs, unknown>> | ComputedRef<UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.TokenCreateManyArgs, unknown>> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.TokenCreateManyArgs, DefaultError, Prisma.BatchPayload, false>('Token', 'POST', `${endpoint}/token/createMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.TokenCreateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.TokenCreateManyArgs>,
            options?: Omit<(MaybeRefOrGetter<UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.TokenCreateManyArgs>, unknown>> | ComputedRef<UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.TokenCreateManyArgs>, unknown>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useFindManyToken<TArgs extends Prisma.TokenFindManyArgs, TQueryFnData = Array<Prisma.TokenGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: MaybeRefOrGetter<Prisma.SelectSubset<TArgs, Prisma.TokenFindManyArgs>> | ComputedRef<Prisma.SelectSubset<TArgs, Prisma.TokenFindManyArgs>>, options?: (MaybeRefOrGetter<Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'>> | ComputedRef<Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'>> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('Token', `${endpoint}/token/findMany`, args, options, fetch);
}

export function useInfiniteFindManyToken<TArgs extends Prisma.TokenFindManyArgs, TQueryFnData = Array<Prisma.TokenGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: MaybeRefOrGetter<Prisma.SelectSubset<TArgs, Prisma.TokenFindManyArgs>> | ComputedRef<Prisma.SelectSubset<TArgs, Prisma.TokenFindManyArgs>>, options?: MaybeRefOrGetter<Omit<UseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey' | 'initialPageParam'>> | ComputedRef<Omit<UseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey' | 'initialPageParam'>>) {
    const { endpoint, fetch } = getHooksContext();
    return useInfiniteModelQuery<TQueryFnData, TData, TError>('Token', `${endpoint}/token/findMany`, args, options, fetch);
}

export function useFindUniqueToken<TArgs extends Prisma.TokenFindUniqueArgs, TQueryFnData = Prisma.TokenGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: MaybeRefOrGetter<Prisma.SelectSubset<TArgs, Prisma.TokenFindUniqueArgs>> | ComputedRef<Prisma.SelectSubset<TArgs, Prisma.TokenFindUniqueArgs>>, options?: (MaybeRefOrGetter<Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'>> | ComputedRef<Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'>> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('Token', `${endpoint}/token/findUnique`, args, options, fetch);
}

export function useFindFirstToken<TArgs extends Prisma.TokenFindFirstArgs, TQueryFnData = Prisma.TokenGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: MaybeRefOrGetter<Prisma.SelectSubset<TArgs, Prisma.TokenFindFirstArgs>> | ComputedRef<Prisma.SelectSubset<TArgs, Prisma.TokenFindFirstArgs>>, options?: (MaybeRefOrGetter<Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'>> | ComputedRef<Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'>> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('Token', `${endpoint}/token/findFirst`, args, options, fetch);
}

export function useUpdateToken(options?: Omit<(MaybeRefOrGetter<UseMutationOptions<(Token | undefined), DefaultError, Prisma.TokenUpdateArgs, unknown>> | ComputedRef<UseMutationOptions<(Token | undefined), DefaultError, Prisma.TokenUpdateArgs, unknown>> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.TokenUpdateArgs, DefaultError, Token, true>('Token', 'PUT', `${endpoint}/token/update`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.TokenUpdateArgs>(
            args: Prisma.SelectSubset<T, Prisma.TokenUpdateArgs>,
            options?: Omit<(MaybeRefOrGetter<UseMutationOptions<(CheckSelect<T, Token, Prisma.TokenGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.TokenUpdateArgs>, unknown>> | ComputedRef<UseMutationOptions<(CheckSelect<T, Token, Prisma.TokenGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.TokenUpdateArgs>, unknown>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, Token, Prisma.TokenGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useUpdateManyToken(options?: Omit<(MaybeRefOrGetter<UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.TokenUpdateManyArgs, unknown>> | ComputedRef<UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.TokenUpdateManyArgs, unknown>> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.TokenUpdateManyArgs, DefaultError, Prisma.BatchPayload, false>('Token', 'PUT', `${endpoint}/token/updateMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.TokenUpdateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.TokenUpdateManyArgs>,
            options?: Omit<(MaybeRefOrGetter<UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.TokenUpdateManyArgs>, unknown>> | ComputedRef<UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.TokenUpdateManyArgs>, unknown>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useUpsertToken(options?: Omit<(MaybeRefOrGetter<UseMutationOptions<(Token | undefined), DefaultError, Prisma.TokenUpsertArgs, unknown>> | ComputedRef<UseMutationOptions<(Token | undefined), DefaultError, Prisma.TokenUpsertArgs, unknown>> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.TokenUpsertArgs, DefaultError, Token, true>('Token', 'POST', `${endpoint}/token/upsert`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.TokenUpsertArgs>(
            args: Prisma.SelectSubset<T, Prisma.TokenUpsertArgs>,
            options?: Omit<(MaybeRefOrGetter<UseMutationOptions<(CheckSelect<T, Token, Prisma.TokenGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.TokenUpsertArgs>, unknown>> | ComputedRef<UseMutationOptions<(CheckSelect<T, Token, Prisma.TokenGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.TokenUpsertArgs>, unknown>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, Token, Prisma.TokenGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteToken(options?: Omit<(MaybeRefOrGetter<UseMutationOptions<(Token | undefined), DefaultError, Prisma.TokenDeleteArgs, unknown>> | ComputedRef<UseMutationOptions<(Token | undefined), DefaultError, Prisma.TokenDeleteArgs, unknown>> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.TokenDeleteArgs, DefaultError, Token, true>('Token', 'DELETE', `${endpoint}/token/delete`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.TokenDeleteArgs>(
            args: Prisma.SelectSubset<T, Prisma.TokenDeleteArgs>,
            options?: Omit<(MaybeRefOrGetter<UseMutationOptions<(CheckSelect<T, Token, Prisma.TokenGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.TokenDeleteArgs>, unknown>> | ComputedRef<UseMutationOptions<(CheckSelect<T, Token, Prisma.TokenGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.TokenDeleteArgs>, unknown>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, Token, Prisma.TokenGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteManyToken(options?: Omit<(MaybeRefOrGetter<UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.TokenDeleteManyArgs, unknown>> | ComputedRef<UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.TokenDeleteManyArgs, unknown>> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.TokenDeleteManyArgs, DefaultError, Prisma.BatchPayload, false>('Token', 'DELETE', `${endpoint}/token/deleteMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.TokenDeleteManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.TokenDeleteManyArgs>,
            options?: Omit<(MaybeRefOrGetter<UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.TokenDeleteManyArgs>, unknown>> | ComputedRef<UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.TokenDeleteManyArgs>, unknown>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useAggregateToken<TArgs extends Prisma.TokenAggregateArgs, TQueryFnData = Prisma.GetTokenAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: MaybeRefOrGetter<Prisma.SelectSubset<TArgs, Prisma.TokenAggregateArgs>> | ComputedRef<Prisma.SelectSubset<TArgs, Prisma.TokenAggregateArgs>>, options?: (MaybeRefOrGetter<Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'>> | ComputedRef<Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'>> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('Token', `${endpoint}/token/aggregate`, args, options, fetch);
}

export function useGroupByToken<TArgs extends Prisma.TokenGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.TokenGroupByArgs['orderBy'] } : { orderBy?: Prisma.TokenGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
    ? `Error: "by" must not be empty.`
    : HavingValid extends Prisma.False
    ? {
        [P in HavingFields]: P extends ByFields
        ? never
        : P extends string
        ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
        : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`,
        ]
    }[HavingFields]
    : 'take' extends Prisma.Keys<TArgs>
    ? 'orderBy' extends Prisma.Keys<TArgs>
    ? ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "take", you also need to provide "orderBy"'
    : 'skip' extends Prisma.Keys<TArgs>
    ? 'orderBy' extends Prisma.Keys<TArgs>
    ? ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "skip", you also need to provide "orderBy"'
    : ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields], TQueryFnData = {} extends InputErrors ?
    Array<PickEnumerable<Prisma.TokenGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.TokenGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.TokenGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.TokenGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: MaybeRefOrGetter<Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.TokenGroupByArgs, OrderByArg> & InputErrors>> | ComputedRef<Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.TokenGroupByArgs, OrderByArg> & InputErrors>>, options?: (MaybeRefOrGetter<Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'>> | ComputedRef<Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'>> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('Token', `${endpoint}/token/groupBy`, args, options, fetch);
}

export function useCountToken<TArgs extends Prisma.TokenCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.TokenCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: MaybeRefOrGetter<Prisma.SelectSubset<TArgs, Prisma.TokenCountArgs>> | ComputedRef<Prisma.SelectSubset<TArgs, Prisma.TokenCountArgs>>, options?: (MaybeRefOrGetter<Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'>> | ComputedRef<Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'>> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('Token', `${endpoint}/token/count`, args, options, fetch);
}

export function useCheckToken<TError = DefaultError>(args: { operation: PolicyCrudKind; where?: { id?: string; userId?: string; type?: string; token?: string; sentTo?: string }; }, options?: (MaybeRefOrGetter<Omit<UseQueryOptions<boolean, TError, boolean>, 'queryKey'>> | ComputedRef<Omit<UseQueryOptions<boolean, TError, boolean>, 'queryKey'>> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<boolean, boolean, TError>('Token', `${endpoint}/token/check`, args, options, fetch);
}
