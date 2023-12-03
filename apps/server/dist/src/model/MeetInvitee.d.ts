export declare const invitees: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "invitees";
    schema: undefined;
    columns: {
        meetID: import("drizzle-orm/pg-core").PgColumn<{
            name: "meetID";
            tableName: "invitees";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        workspaceID: import("drizzle-orm/pg-core").PgColumn<{
            name: "workspaceID";
            tableName: "invitees";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        inviteeID: import("drizzle-orm/pg-core").PgColumn<{
            name: "inviteeID";
            tableName: "invitees";
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
            name: "created_at";
            tableName: "invitees";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        isAccepted: import("drizzle-orm/pg-core").PgColumn<{
            name: "isAccepted";
            tableName: "invitees";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
