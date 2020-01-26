class ListaNegociacoes {
    constructor() {
        this._listaNegocicoes = [];
        Object.freeze(this);
    }

    adiciona(negociacao) {
        this._listaNegocicoes.push(negociacao);
    }

    get negociacoes() {
        return [].concat(this._listaNegocicoes);
    }
}