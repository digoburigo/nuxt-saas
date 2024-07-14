/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        aggregate: procedure.input($Schema.TeamInputSchema.aggregate).query(({ ctx, input }) => checkRead(db(ctx).team.aggregate(input as any))),

        createMany: procedure.input($Schema.TeamInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).team.createMany(input as any))),

        create: procedure.input($Schema.TeamInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).team.create(input as any))),

        deleteMany: procedure.input($Schema.TeamInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).team.deleteMany(input as any))),

        delete: procedure.input($Schema.TeamInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).team.delete(input as any))),

        findFirst: procedure.input($Schema.TeamInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).team.findFirst(input as any))),

        findFirstOrThrow: procedure.input($Schema.TeamInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).team.findFirstOrThrow(input as any))),

        findMany: procedure.input($Schema.TeamInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).team.findMany(input as any))),

        findUnique: procedure.input($Schema.TeamInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).team.findUnique(input as any))),

        findUniqueOrThrow: procedure.input($Schema.TeamInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).team.findUniqueOrThrow(input as any))),

        groupBy: procedure.input($Schema.TeamInputSchema.groupBy).query(({ ctx, input }) => checkRead(db(ctx).team.groupBy(input as any))),

        updateMany: procedure.input($Schema.TeamInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).team.updateMany(input as any))),

        update: procedure.input($Schema.TeamInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).team.update(input as any))),

        upsert: procedure.input($Schema.TeamInputSchema.upsert).mutation(async ({ ctx, input }) => checkMutate(db(ctx).team.upsert(input as any))),

        count: procedure.input($Schema.TeamInputSchema.count).query(({ ctx, input }) => checkRead(db(ctx).team.count(input as any))),

    }
    );
}
