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

        let data = new Date(...
            this._inputData.value
                .split('-')
                .map((item, indice) => item - indice % 2)
        );

        let negociacao = new Negociacao(
            data,
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
            this.dataToString(negociacao.data),
            negociacao.quantidade,
            negociacao.valor,
            negociacao.volume
        ];

        console.log(this._tbody);

        var tr = document.createElement('tr');

        campos.forEach(function (campo) {
            var td = document.createElement('td');
            td.textContent = campo;
            tr.appendChild(td);
        });
        this._tbody.appendChild(tr);
    }

    dataToString(data) {
        let dd = data.getDate();
        let mm = data.getMonth() + 1;

        let yyyy = data.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        return dd + '/' + mm + '/' + yyyy;
    }
}