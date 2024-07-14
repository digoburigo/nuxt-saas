/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        aggregate: procedure.input($Schema.NotificationInputSchema.aggregate).query(({ ctx, input }) => checkRead(db(ctx).notification.aggregate(input as any))),

        createMany: procedure.input($Schema.NotificationInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).notification.createMany(input as any))),

        create: procedure.input($Schema.NotificationInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).notification.create(input as any))),

        deleteMany: procedure.input($Schema.NotificationInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).notification.deleteMany(input as any))),

        delete: procedure.input($Schema.NotificationInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).notification.delete(input as any))),

        findFirst: procedure.input($Schema.NotificationInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).notification.findFirst(input as any))),

        findFirstOrThrow: procedure.input($Schema.NotificationInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).notification.findFirstOrThrow(input as any))),

        findMany: procedure.input($Schema.NotificationInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).notification.findMany(input as any))),

        findUnique: procedure.input($Schema.NotificationInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).notification.findUnique(input as any))),

        findUniqueOrThrow: procedure.input($Schema.NotificationInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).notification.findUniqueOrThrow(input as any))),

        groupBy: procedure.input($Schema.NotificationInputSchema.groupBy).query(({ ctx, input }) => checkRead(db(ctx).notification.groupBy(input as any))),

        updateMany: procedure.input($Schema.NotificationInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).notification.updateMany(input as any))),

        update: procedure.input($Schema.NotificationInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).notification.update(input as any))),

        upsert: procedure.input($Schema.NotificationInputSchema.upsert).mutation(async ({ ctx, input }) => checkMutate(db(ctx).notification.upsert(input as any))),

        count: procedure.input($Schema.NotificationInputSchema.count).query(({ ctx, input }) => checkRead(db(ctx).notification.count(input as any))),

    }
    );
}
