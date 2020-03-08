import { Collection, ObjectId } from "mongo";
import { db } from "../common/mongo.ts";

export interface WithId {
  _id?: ObjectId;
}

export class MongoModel<Schema, T = Schema & WithId> {
  private collection: Collection;

  constructor(private readonly modelType: { new (): Schema }, name: string) {
    this.collection = db.collection(name);
  }

  private mergeDefaults(doc: Partial<Schema>) {
    const _doc: any = { ...new this.modelType(), ...doc };
    return _doc;
  }

  public async findById(_id: ObjectId | string): Promise<Schema | null> {
    if (typeof _id === "string") _id = ObjectId(_id);
    return this.collection.findOne({ _id });
  }

  public async findOne(filter?: Partial<Schema>): Promise<Schema | null> {
    return this.collection.findOne(filter);
  }

  public async find(filter?: Object): Promise<Schema | null> {
    return this.collection.find(filter);
  }

  public async create(doc: Partial<Schema>): Promise<T> {
    const _doc: any = this.mergeDefaults(doc);
    const insertId = await this.collection.insertOne(_doc);
    _doc._id = insertId;
    return _doc;
  }

  public async update(doc: Partial<Schema> & WithId) {
    const { _id, ...updateDoc } = this.mergeDefaults(doc);
    this.collection.updateOne({ _id }, { $set: updateDoc });
  }
}
