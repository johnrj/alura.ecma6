class BaseView {
    constructor(elemento) {
        this._elemento = elemento;
    }

    template() {
        throw new Error('Método template não foi implementado.');
    }

    update(modelo) {
        this._elemento.innerHTML = this.template(modelo);
    }
}