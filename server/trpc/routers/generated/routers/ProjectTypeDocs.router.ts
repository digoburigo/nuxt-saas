/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        aggregate: procedure.input($Schema.ProjectTypeDocsInputSchema.aggregate).query(({ ctx, input }) => checkRead(db(ctx).projectTypeDocs.aggregate(input as any))),

        createMany: procedure.input($Schema.ProjectTypeDocsInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).projectTypeDocs.createMany(input as any))),

        create: procedure.input($Schema.ProjectTypeDocsInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).projectTypeDocs.create(input as any))),

        deleteMany: procedure.input($Schema.ProjectTypeDocsInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).projectTypeDocs.deleteMany(input as any))),

        delete: procedure.input($Schema.ProjectTypeDocsInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).projectTypeDocs.delete(input as any))),

        findFirst: procedure.input($Schema.ProjectTypeDocsInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).projectTypeDocs.findFirst(input as any))),

        findFirstOrThrow: procedure.input($Schema.ProjectTypeDocsInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).projectTypeDocs.findFirstOrThrow(input as any))),

        findMany: procedure.input($Schema.ProjectTypeDocsInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).projectTypeDocs.findMany(input as any))),

        findUnique: procedure.input($Schema.ProjectTypeDocsInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).projectTypeDocs.findUnique(input as any))),

        findUniqueOrThrow: procedure.input($Schema.ProjectTypeDocsInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).projectTypeDocs.findUniqueOrThrow(input as any))),

        groupBy: procedure.input($Schema.ProjectTypeDocsInputSchema.groupBy).query(({ ctx, input }) => checkRead(db(ctx).projectTypeDocs.groupBy(input as any))),

        updateMany: procedure.input($Schema.ProjectTypeDocsInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).projectTypeDocs.updateMany(input as any))),

        update: procedure.input($Schema.ProjectTypeDocsInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).projectTypeDocs.update(input as any))),

        upsert: procedure.input($Schema.ProjectTypeDocsInputSchema.upsert).mutation(async ({ ctx, input }) => checkMutate(db(ctx).projectTypeDocs.upsert(input as any))),

        count: procedure.input($Schema.ProjectTypeDocsInputSchema.count).query(({ ctx, input }) => checkRead(db(ctx).projectTypeDocs.count(input as any))),

    }
    );
}
