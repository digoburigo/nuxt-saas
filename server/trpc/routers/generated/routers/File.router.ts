/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        aggregate: procedure.input($Schema.FileInputSchema.aggregate).query(({ ctx, input }) => checkRead(db(ctx).file.aggregate(input as any))),

        createMany: procedure.input($Schema.FileInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).file.createMany(input as any))),

        create: procedure.input($Schema.FileInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).file.create(input as any))),

        deleteMany: procedure.input($Schema.FileInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).file.deleteMany(input as any))),

        delete: procedure.input($Schema.FileInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).file.delete(input as any))),

        findFirst: procedure.input($Schema.FileInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).file.findFirst(input as any))),

        findFirstOrThrow: procedure.input($Schema.FileInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).file.findFirstOrThrow(input as any))),

        findMany: procedure.input($Schema.FileInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).file.findMany(input as any))),

        findUnique: procedure.input($Schema.FileInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).file.findUnique(input as any))),

        findUniqueOrThrow: procedure.input($Schema.FileInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).file.findUniqueOrThrow(input as any))),

        groupBy: procedure.input($Schema.FileInputSchema.groupBy).query(({ ctx, input }) => checkRead(db(ctx).file.groupBy(input as any))),

        updateMany: procedure.input($Schema.FileInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).file.updateMany(input as any))),

        update: procedure.input($Schema.FileInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).file.update(input as any))),

        upsert: procedure.input($Schema.FileInputSchema.upsert).mutation(async ({ ctx, input }) => checkMutate(db(ctx).file.upsert(input as any))),

        count: procedure.input($Schema.FileInputSchema.count).query(({ ctx, input }) => checkRead(db(ctx).file.count(input as any))),

    }
    );
}
