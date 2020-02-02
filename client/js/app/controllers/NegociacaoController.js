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
            'adiciona', 'esvazia');

        this._mensagem = new BindHelper(
            new Mensagem(),
            new MensagensView($('#mensagensView')),
            'texto'
        );
    }

    adiciona(event) {
        event.preventDefault();

        this._listaNegociacoes.adiciona(this.criaNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso!';
        this.limpaFormulario();
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
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    apaga() {
        this._listaNegociacoes.esvazia();
    }

    importaNegociacoes() {
        let service = new NegociacaoService();
        service.obterNegociacoesDaSemana((erro, negociacoes) => {
            if (erro) {
                this._mensagem.texto = erro;
                return;
            }
            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
        });
    }
}