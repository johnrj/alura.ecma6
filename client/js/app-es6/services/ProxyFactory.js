export class ProxyFactory {
    static create(obj, props, action) {
        return new Proxy(obj, {
            get(target, prop, receiver) {
                if (props.includes(prop) && ProxyFactory._isTypeOfFunction(target[prop])) {
                    return function() {
                        Reflect.apply(target[prop], target, arguments);
                        return action(target);
                    }
                }
                return Reflect.get(target, prop, receiver)
            },
            set(target, prop, value, receiver) {
                let retorno = Reflect.set(target, prop, value, receiver);
                if (props.includes(prop)) {
                    target[prop] = value;
                    action(target);
                }
                return retorno;
            }
        });
    }
    static _isTypeOfFunction(f) {
        return typeof(f) == typeof(Function)
    }
}