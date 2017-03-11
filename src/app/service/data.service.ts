import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let osbb = [
            { id: 1, name: 'Wind22storm', street:'123' },
            { id: 2, name: 'Windstorm', street:'123' },
            { id: 3, name: 'Windst2324orm', street:'123' },
            { id: 4, name: 'Windstorm131', street:'123' },
            { id: 5, name: 'Windstorm4242', street:'123' },
            { id: 6, name: 'Windstorm242', street:'123' },
            { id: 7, name: 'Windstorm242', street:'123' },

        ];
        return {osbb};
    }
}
