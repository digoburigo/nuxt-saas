/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        aggregate: procedure.input($Schema.ProjectInputSchema.aggregate).query(({ ctx, input }) => checkRead(db(ctx).project.aggregate(input as any))),

        createMany: procedure.input($Schema.ProjectInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).project.createMany(input as any))),

        create: procedure.input($Schema.ProjectInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).project.create(input as any))),

        deleteMany: procedure.input($Schema.ProjectInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).project.deleteMany(input as any))),

        delete: procedure.input($Schema.ProjectInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).project.delete(input as any))),

        findFirst: procedure.input($Schema.ProjectInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).project.findFirst(input as any))),

        findFirstOrThrow: procedure.input($Schema.ProjectInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).project.findFirstOrThrow(input as any))),

        findMany: procedure.input($Schema.ProjectInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).project.findMany(input as any))),

        findUnique: procedure.input($Schema.ProjectInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).project.findUnique(input as any))),

        findUniqueOrThrow: procedure.input($Schema.ProjectInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).project.findUniqueOrThrow(input as any))),

        groupBy: procedure.input($Schema.ProjectInputSchema.groupBy).query(({ ctx, input }) => checkRead(db(ctx).project.groupBy(input as any))),

        updateMany: procedure.input($Schema.ProjectInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).project.updateMany(input as any))),

        update: procedure.input($Schema.ProjectInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).project.update(input as any))),

        upsert: procedure.input($Schema.ProjectInputSchema.upsert).mutation(async ({ ctx, input }) => checkMutate(db(ctx).project.upsert(input as any))),

        count: procedure.input($Schema.ProjectInputSchema.count).query(({ ctx, input }) => checkRead(db(ctx).project.count(input as any))),

    }
    );
}
