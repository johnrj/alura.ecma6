class NegociacoesView extends BaseView {
    constructor(elemento) {
        super(elemento);
    }

    template(modelo) {
        return `    
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th onclick="controller.ordena('data')">DATA</th>
                        <th onclick="controller.ordena('quantidade')">QUANTIDADE</th>
                        <th onclick="controller.ordena('valor')">VALOR</th>
                        <th onclick="controller.ordena('volume')">VOLUME</th>
                    </tr>
                </thead>

                <tbody>
                    ${modelo.negociacoes.map(n => `
                        <tr>
                            <td>${DateHelper.dataParaTexto(n.data)}</td>
                            <td>${n.quantidade}</td>
                            <td>${n.valor}</td>
                            <td>${n.volume}</td>
                        </tr>`).join('')}
                </tbody>

                <tfoot>
                    <tr>
                        <td colspan="3"></td>
                        <td>${modelo.negociacoes.reduce((total, n) => total += n.volume, 0.0)}</td>
                    </tr>
                </tfoot>
            </table>`;
    }
}