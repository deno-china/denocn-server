import { Client, ClientConfig } from "https://deno.land/x/mysql/mod.ts";
import { assert } from "https://deno.land/x/testing/mod.ts";

interface FieldDef {
    type: any,
    name?: string,
    default?: any,
    primary?: boolean;
};

export interface ModelDef {
    [key: string]: FieldDef;
}

export type ModleReturn<M extends ModelDef> = {
    [key in keyof M]?: ReturnType<M[key]["type"]>;
};

// 驼峰转下划线
function camel2line(key: string) {
    return key.replace(/([A-Z])/g, "_$1").toLowerCase();
}

// 下划线转驼峰
function line2camel(key: string) {
    return key.replace(/_(\w)/g, function (_, letter) {
        return letter.toUpperCase();
    });
}

export class Model<M extends ModelDef, T = ModleReturn<M>> {

    private _pk: FieldDef;
    private _name: string;
    private _def: M;

    constructor(tableName: string, def: M) {
        this._name = tableName.toLocaleLowerCase();
        this._def = def;
        for (const key in def) {
            def[key].name = key;
            if (def[key].primary) {
                this._pk = def[key];
            }
        }
    }

    async findById(id: string | number): Promise<T> {
        assert(this._pk != null, `No field was designated as primary key in ${this._name}`);
        const pk = camel2line(this._pk.name);
        const result = await client.query(`SELECT * FROM ?? WHERE ?? = ?`, [this._name, pk, id]);
        return result.length ? this.parseModel(result[0]) : null;
    }

    private parseModel(data: any): T {
        const result: T = <T>{};
        for (let key in data) {
            result[line2camel(key)] = data[key];
        }
        return result;
    }
}

const client = new Client();

export function connect(config: ClientConfig) {
    client.connect(config);
}