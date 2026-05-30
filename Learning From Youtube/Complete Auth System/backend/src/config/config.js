import dotenv from 'dotenv';
dotenv.config();

if(!process.env.MONGODB_URI) {
    throw new Error(`MongoDb URI Is Not Defined In Enviournmental Variables `)
}

if(!process.env.JWT_SECRET) {
    throw new Error(`JWT Secret Is Not Defined In Enviournmental Variables `)
}

const config = {
    MONGODB_URI : process.env.MONGODB_URI , 
    JWT_SECRET : process.env.JWT_SECRET
};

export default config ;