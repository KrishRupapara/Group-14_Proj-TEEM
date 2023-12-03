export declare const statusEnum: import("drizzle-orm/pg-core").PgEnum<["To Do", "In Progress", "Done"]>;
export declare const tasks: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "tasks";
    schema: undefined;
    columns: {
        taskID: import("drizzle-orm/pg-core").PgColumn<{
            name: "taskID";
            tableName: "tasks";
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
            tableName: "tasks";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        description: import("drizzle-orm/pg-core").PgColumn<{
            name: "description";
            tableName: "tasks";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        taskType: import("drizzle-orm/pg-core").PgColumn<{
            name: "taskType";
            tableName: "tasks";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        deadline: import("drizzle-orm/pg-core").PgColumn<{
            name: "deadline";
            tableName: "tasks";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        status: import("drizzle-orm/pg-core").PgColumn<{
            name: "status";
            tableName: "tasks";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "To Do" | "In Progress" | "Done";
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: ["To Do", "In Progress", "Done"];
            baseColumn: never;
        }, {}, {}>;
        workspaceID: import("drizzle-orm/pg-core").PgColumn<{
            name: "workspaceID";
            tableName: "tasks";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "tasks";
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
