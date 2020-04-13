import { BaseView } from './BaseView';

export class MensagensView extends BaseView {
    constructor(elemento) {
        super(elemento);
    }

    template(modelo) {
        return modelo.texto ? `<p class="alert alert-info">${modelo.texto}</p>` : '';
    }
}