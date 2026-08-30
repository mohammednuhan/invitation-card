import { MongoMemoryServer } from "mongodb-memory-server";
import { writeFileSync } from "fs";

const mongod = await MongoMemoryServer.create();
writeFileSync("_mongo-uri.txt", mongod.getUri(), "utf8");
console.log("mongo-memory-server ready at", mongod.getUri());
process.stdin.resume();
