/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        aggregate: procedure.input($Schema.TokenInputSchema.aggregate).query(({ ctx, input }) => checkRead(db(ctx).token.aggregate(input as any))),

        createMany: procedure.input($Schema.TokenInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).token.createMany(input as any))),

        create: procedure.input($Schema.TokenInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).token.create(input as any))),

        deleteMany: procedure.input($Schema.TokenInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).token.deleteMany(input as any))),

        delete: procedure.input($Schema.TokenInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).token.delete(input as any))),

        findFirst: procedure.input($Schema.TokenInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).token.findFirst(input as any))),

        findFirstOrThrow: procedure.input($Schema.TokenInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).token.findFirstOrThrow(input as any))),

        findMany: procedure.input($Schema.TokenInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).token.findMany(input as any))),

        findUnique: procedure.input($Schema.TokenInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).token.findUnique(input as any))),

        findUniqueOrThrow: procedure.input($Schema.TokenInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).token.findUniqueOrThrow(input as any))),

        groupBy: procedure.input($Schema.TokenInputSchema.groupBy).query(({ ctx, input }) => checkRead(db(ctx).token.groupBy(input as any))),

        updateMany: procedure.input($Schema.TokenInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).token.updateMany(input as any))),

        update: procedure.input($Schema.TokenInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).token.update(input as any))),

        upsert: procedure.input($Schema.TokenInputSchema.upsert).mutation(async ({ ctx, input }) => checkMutate(db(ctx).token.upsert(input as any))),

        count: procedure.input($Schema.TokenInputSchema.count).query(({ ctx, input }) => checkRead(db(ctx).token.count(input as any))),

    }
    );
}
