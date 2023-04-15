import { initDatabase } from 'mongo-http';

export const mongoInit = (env) => {
    try {
        const db = initDatabase({
            appId: env.ATLAS_MONGO_HTTP_APP_ID,
            apiKey: env.ATLAS_MONGO_HTTP_API_KEY,
            databaseName: env.ATLAS_MONGO_HTTP_DATABASE_NAME,
        });
    
        return db;
    } catch (error) {
        console.error(error);
    }
}