/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        aggregate: procedure.input($Schema.TeamUserInputSchema.aggregate).query(({ ctx, input }) => checkRead(db(ctx).teamUser.aggregate(input as any))),

        createMany: procedure.input($Schema.TeamUserInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).teamUser.createMany(input as any))),

        create: procedure.input($Schema.TeamUserInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).teamUser.create(input as any))),

        deleteMany: procedure.input($Schema.TeamUserInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).teamUser.deleteMany(input as any))),

        delete: procedure.input($Schema.TeamUserInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).teamUser.delete(input as any))),

        findFirst: procedure.input($Schema.TeamUserInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).teamUser.findFirst(input as any))),

        findFirstOrThrow: procedure.input($Schema.TeamUserInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).teamUser.findFirstOrThrow(input as any))),

        findMany: procedure.input($Schema.TeamUserInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).teamUser.findMany(input as any))),

        findUnique: procedure.input($Schema.TeamUserInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).teamUser.findUnique(input as any))),

        findUniqueOrThrow: procedure.input($Schema.TeamUserInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).teamUser.findUniqueOrThrow(input as any))),

        groupBy: procedure.input($Schema.TeamUserInputSchema.groupBy).query(({ ctx, input }) => checkRead(db(ctx).teamUser.groupBy(input as any))),

        updateMany: procedure.input($Schema.TeamUserInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).teamUser.updateMany(input as any))),

        update: procedure.input($Schema.TeamUserInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).teamUser.update(input as any))),

        upsert: procedure.input($Schema.TeamUserInputSchema.upsert).mutation(async ({ ctx, input }) => checkMutate(db(ctx).teamUser.upsert(input as any))),

        count: procedure.input($Schema.TeamUserInputSchema.count).query(({ ctx, input }) => checkRead(db(ctx).teamUser.count(input as any))),

    }
    );
}
