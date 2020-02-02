class ListaNegociacoes {
    constructor() {
        this._listaNegocicoes = [];
    }

    adiciona(negociacao) {
        this._listaNegocicoes.push(negociacao);
    }

    get negociacoes() {
        return [].concat(this._listaNegocicoes);
    }

    esvazia() {
        this._listaNegocicoes = [];
    }
}