class NegociacaoController {
    constructor() {

        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._tbody = $('table tbody');

        this._listaNegociacoes = new BindHelper(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

        this._mensagem = new BindHelper(
            new Mensagem(),
            new MensagensView($('#mensagensView')),
            'texto'
        );

        this._service = new NegociacaoService();

        this._ordemAtual = '';
        this._init();
    }

    _init() {

        this._service.lista()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this.ordena('data');
            })
            .catch(err => this._mensagem.texto = err);

        setInterval(() => {
            this.importaNegociacoes();
        }, 5000);
    }

    adiciona(event) {
        event.preventDefault();

        let negociacao = this.criaNegociacao();

        this._service.cadastra(negociacao)
            .then(() => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = 'Negociação adicionada com sucesso!';
                this.limpaFormulario();
            })
            .catch(err => this._mensagem.texto = err);

    }

    limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

    criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }

    apaga() {
        this._service.apaga()
            .then(msg => {
                this._mensagem.texto = msg;
                this._listaNegociacoes.esvazia();
            })
            .catch(err => this._mensagem.texto = err);

    }

    importaNegociacoes() {
        this._service.obterTodasNegociacoes()
            .then(negociacoes => negociacoes.filter(negociacao =>
                !this._listaNegociacoes.negociacoes.some(busca => JSON.stringify(busca) == JSON.stringify(negociacao))))
            .then(negociacoes => negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao)))
            .catch(err => this._mensagem.texto = err);
    }
    ordena(coluna) {
        if (this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }
}