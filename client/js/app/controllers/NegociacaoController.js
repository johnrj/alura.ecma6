class NegociacaoController {
    constructor() {

        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._tbody = $('table tbody');
    }

    adiciona(event) {
        event.preventDefault();

        let negociacao = new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );

        this.atualizaLista(negociacao);
        this.limpaFormulario();
    }

    limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

    atualizaLista(negociacao) {
        let campos = [
            DateHelper.dataParaTexto(negociacao.data),
            negociacao.quantidade,
            negociacao.valor,
            negociacao.volume
        ];

        var tr = document.createElement('tr');

        campos.forEach(function (campo) {
            var td = document.createElement('td');
            td.textContent = campo;
            tr.appendChild(td);
        });
        this._tbody.appendChild(tr);
    }
}