class HttpService {
    get(url) {
        return new Promise((res, rej) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        res(JSON.parse(xhr.responseText));
                    } else {
                        rej(xhr.responseText);
                    }
                }
            };
            xhr.send();
        });
    }
}