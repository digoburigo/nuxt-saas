/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        aggregate: procedure.input($Schema.CustomerInputSchema.aggregate).query(({ ctx, input }) => checkRead(db(ctx).customer.aggregate(input as any))),

        createMany: procedure.input($Schema.CustomerInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).customer.createMany(input as any))),

        create: procedure.input($Schema.CustomerInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).customer.create(input as any))),

        deleteMany: procedure.input($Schema.CustomerInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).customer.deleteMany(input as any))),

        delete: procedure.input($Schema.CustomerInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).customer.delete(input as any))),

        findFirst: procedure.input($Schema.CustomerInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).customer.findFirst(input as any))),

        findFirstOrThrow: procedure.input($Schema.CustomerInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).customer.findFirstOrThrow(input as any))),

        findMany: procedure.input($Schema.CustomerInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).customer.findMany(input as any))),

        findUnique: procedure.input($Schema.CustomerInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).customer.findUnique(input as any))),

        findUniqueOrThrow: procedure.input($Schema.CustomerInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).customer.findUniqueOrThrow(input as any))),

        groupBy: procedure.input($Schema.CustomerInputSchema.groupBy).query(({ ctx, input }) => checkRead(db(ctx).customer.groupBy(input as any))),

        updateMany: procedure.input($Schema.CustomerInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).customer.updateMany(input as any))),

        update: procedure.input($Schema.CustomerInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).customer.update(input as any))),

        upsert: procedure.input($Schema.CustomerInputSchema.upsert).mutation(async ({ ctx, input }) => checkMutate(db(ctx).customer.upsert(input as any))),

        count: procedure.input($Schema.CustomerInputSchema.count).query(({ ctx, input }) => checkRead(db(ctx).customer.count(input as any))),

    }
    );
}
