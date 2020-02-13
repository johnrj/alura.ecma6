var ConnectionFactory = (function () {

    const stores = ['negociacoes'];
    const version = 3;
    const dbName = 'aluraframe';
    var connection = null;
    var close = null;

    return class ConnectionFactory {
        constructor() {
            throw new Error('Not allowed!');
        }

        static getConnection() {
            return new Promise((res, rej) => {
                let openRequest = window.indexedDB.open(dbName, version);

                openRequest.onupgradeneeded = e => this._createStores(e.target.result);

                openRequest.onsuccess = e => {
                    if (!connection) {
                        connection = e.target.result;
                        close = connection.close.bind(connection);
                        connection.close = function () {
                            throw new Error('Not allowed!');
                        };
                    }
                    res(e.target.result)
                };

                openRequest.onerror = e => {
                    console.log(e.target.error);
                    rej(e.target.error.name);
                };
            });
        }

        static _createStores(connection) {
            stores.forEach(store => {
                if (connection.objectStoreNames.contains(store)) {
                    connection.deleteObjectStore(store);
                }
                connection.createObjectStore(store, { autoIncrement: true });
            })
        }

        static closeConnection() {
            if (connection) {
                close();
                connection = null;
            }
        }
    }
}
)();
