const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const { disconnect } = require('process');

mongoose.Promise = global.Promise;

class Connection {
    constructor(){
        this.monogoServer = MongoMemoryServer.create();
        this.connection = null;
    }

    async connect() {
        this.monogoServer = await MongoMemoryServer.create();
        const mongoUri = this.monogoServer.getUri();

        this.connection = await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }

    async disconnect(){
       await mongoose.disconnect();
       await this.monogoServer.stop();
    }

    async cleanup(){
        const models = Object.keys(this.connection.models);
        const promises = [];

        models.map((model)=>{
            promises.push(this.connection.models[model].deleteMany({}));
        });


        await Promise.all(promises);
    }
}



exports.connect = async()=>{
    const conn = new Connection();
    await conn.connect();
    return onemptied;
};
