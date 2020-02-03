class NegociacaoService {
    constructor() {
        this._httpService = new HttpService();
    }
    obterNegociacoesDaSemana() {
        return this._httpService.get('negociacoes/semana')
            .then(negociacoes =>
                negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)))
            .catch(err => {
                console.log(err);
                throw new Error('Erro ao obter negociações.')
            });
    }
    obterNegociacoesDaSemanaAnterior() {
        return this._httpService.get('negociacoes/anterior')
            .then(negociacoes =>
                negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)))
            .catch(err => {
                console.log(err);
                throw new Error('Erro ao obter negociações.')
            });
    }
    obterNegociacoesDaSemanaRetrasada() {
        return this._httpService.get('negociacoes/retrasada')
            .then(negociacoes =>
                negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)))
            .catch(err => {
                console.log(err);
                throw new Error('Erro ao obter negociações.')
            });
    }
    obterTodasNegociacoes() {
        return Promise.all(
            [
                this.obterNegociacoesDaSemana(),
                this.obterNegociacoesDaSemanaAnterior(),
                this.obterNegociacoesDaSemanaRetrasada()
            ]
        )
            .then(negociacoes =>
                negociacoes.reduce((ret, arr) => ret.concat(arr), []))
            .catch(err => err);
    }
}