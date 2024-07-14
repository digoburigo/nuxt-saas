/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@zenstackhq/runtime/models";
import createUserRouter from "./User.router";
import createTeamRouter from "./Team.router";
import createTeamUserRouter from "./TeamUser.router";
import createCustomerRouter from "./Customer.router";
import createProjectRouter from "./Project.router";
import createProjectTypeDocsRouter from "./ProjectTypeDocs.router";
import createFileRouter from "./File.router";
import createNotificationRouter from "./Notification.router";
import createAccountRouter from "./Account.router";
import createSessionRouter from "./Session.router";
import createTokenRouter from "./Token.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        user: createUserRouter(router, procedure),
        team: createTeamRouter(router, procedure),
        teamUser: createTeamUserRouter(router, procedure),
        customer: createCustomerRouter(router, procedure),
        project: createProjectRouter(router, procedure),
        projectTypeDocs: createProjectTypeDocsRouter(router, procedure),
        file: createFileRouter(router, procedure),
        notification: createNotificationRouter(router, procedure),
        account: createAccountRouter(router, procedure),
        session: createSessionRouter(router, procedure),
        token: createTokenRouter(router, procedure),
    }
    );
}
