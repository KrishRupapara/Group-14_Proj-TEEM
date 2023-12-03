export declare const roleEnum: import("drizzle-orm/pg-core").PgEnum<["Manager", "TeamMate", "collaborator", "Client"]>;
export declare const workspaces: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "workspaces";
    schema: undefined;
    columns: {
        workspaceID: import("drizzle-orm/pg-core").PgColumn<{
            name: "workspaceID";
            tableName: "workspaces";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        title: import("drizzle-orm/pg-core").PgColumn<{
            name: "title";
            tableName: "workspaces";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        type: import("drizzle-orm/pg-core").PgColumn<{
            name: "type";
            tableName: "workspaces";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        progress: import("drizzle-orm/pg-core").PgColumn<{
            name: "progress";
            tableName: "workspaces";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        description: import("drizzle-orm/pg-core").PgColumn<{
            name: "description";
            tableName: "workspaces";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        projectManager: import("drizzle-orm/pg-core").PgColumn<{
            name: "projectManager";
            tableName: "workspaces";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "createdAt";
            tableName: "workspaces";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const members: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "members";
    schema: undefined;
    columns: {
        workspaceID: import("drizzle-orm/pg-core").PgColumn<{
            name: "workspaceID";
            tableName: "members";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        memberID: import("drizzle-orm/pg-core").PgColumn<{
            name: "memberID";
            tableName: "members";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        role: import("drizzle-orm/pg-core").PgColumn<{
            name: "role";
            tableName: "members";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "Manager" | "TeamMate" | "collaborator" | "Client";
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: ["Manager", "TeamMate", "collaborator", "Client"];
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
