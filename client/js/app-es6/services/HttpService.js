export class HttpService {
    get(url) {
        return fetch(url)
            .then(res => this._handleErros(res))
            .then(res => res.json());
    }

    post(url, dado) {

        return fetch(url, {
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            body: JSON.stringify(dado)
        }).then(res => this._handleErros(res));
    }

    _handleErros(res) {
        if (res.ok) {
            return res;
        } else {
            throw new Error(res.statusText);
        }
    }
}