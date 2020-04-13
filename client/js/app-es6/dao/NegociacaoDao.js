import { Negociacao } from '../models/Negociacao';

export class NegociacaoDao {
    constructor(connection) {
        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao) {
        return new Promise((res, rej) => {
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(negociacao);

            request.onsuccess = e => res();

            request.onerror = e => rej(e.target.error);
        });
    }

    listaTodas() {
        return new Promise((res, rej) => {
            let cursor = this._connection.
            transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();

            let negociacoes = [];

            cursor.onsuccess = e => {
                let atual = e.target.result;
                if (atual) {
                    let dado = atual.value;
                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
                    atual.continue();
                } else {
                    res(negociacoes);
                }
            };
            cursor.onerror = e => rej('Erro: ' + e.target.error);
        });
    }

    apagarTodas() {
        return new Promise((res, rej) => {
            let cursor = this._connection.
            transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();
            cursor.onsuccess = e => {
                res();
            };

            cursor.onerror = e => rej(e.target.error);
        });
    }
}