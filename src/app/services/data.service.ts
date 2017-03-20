import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let osbb = [
            { id: 1, name: 'ул. Комарова 87', street:'123' },
            { id: 2, name: 'пр. Комарова 25', street:'123' },
            { id: 3, name: 'ул. Комарова 232', street:'123' },
            { id: 4, name: 'ул. Комарова 232', street:'123' },
            { id: 5, name: 'ул. Комарова 232', street:'123' },
            { id: 6, name: 'ул. Комарова 232', street:'123' },
            { id: 7, name: 'ул. Комарова 232', street:'123' },
            { id: 8, name: 'ул. Комарова 232', street:'123' },
            { id: 9, name: 'ул. Комарова 232', street:'123' },
            { id: 10, name: 'ул. Комарова 232', street:'123' },
            { id: 11, name: 'ул. Комарова 232', street:'123' }
        ];
        return {osbb};
    }
}
