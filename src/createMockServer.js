import { createServer } from "miragejs";

import searchResults from "./search-result.json";
const createMockServer = () => {
    return createServer({
        routes() {
            this.urlPrefix = 'http://api.openweathermap.org';
            this.get('/geo/1.0/direct', () => {
                return searchResults;
            });
        }
    });
}

export {createMockServer}