export declare const assignees: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "assignees";
    schema: undefined;
    columns: {
        taskID: import("drizzle-orm/pg-core").PgColumn<{
            name: "taskID";
            tableName: "assignees";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        workspaceID: import("drizzle-orm/pg-core").PgColumn<{
            name: "workspaceID";
            tableName: "assignees";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        assigneeID: import("drizzle-orm/pg-core").PgColumn<{
            name: "assigneeID";
            tableName: "assignees";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
