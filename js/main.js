getData();

const isResponseOk = (response) => {
    if (!response.ok)
        throw new Error(response.status);
    return response.text()
}

function getData() {
    const options = {
        method: "GET",
        headers: {
            "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaWQiOiI2MmNhMTViMGMwZDg3ZTBkMDAyMTdhNjAiLCJpYXQiOjE2NTc0MTA4MTIsImp0aSI6IjYyY2ExNWIwYzBkODdlMGQwMDIxN2E2MSIsInN1YiI6IjU4YWM2YTc0NWU5NzA1MDg4OTJmZTRhOCIsImV4cCI6MTY3Mjk2Mjk5Mn0.liXUiouGNeaZkGeaDzs76ARm6ob__JxoagaZRrqWjInXBKc3BU4F0sZvgyeSK2LA02O37lKVGgSWw0zNP0vMlXsoy1PKE9OwReXwlkoG9yPoAIo5L-Tb50bh5Q87FDV-Z0VrqNFJcN3OfnPfWh57Rj08PpDV94_JfODTwKl3x7u4q5eUlamLYQjf_CChimPdmpUddk48sxwerxZiLFHmt4Ll_8CHSjzkssUfJw6SpvZ-NiNZYdEAWOk-MuCN_VffvE3bCPF9GCuOIzxqYjz0G59BlZ_eEfCz1YYbUocDEgb2C8UTFcKFji1FAFFev0tc80vnvOjRAL1D7Lkf-SOAOg"
        },
        body: null
    };
    // fetch('https://play.cine.ar/api/v1.7/home?perfil=58ac6a3b189ad41270144f51&prods=30', options).then((result) => {
    //   console.log(result.json());
    // }).catch((error) => {
    //     console.error(error);
    // })
    fetch('https://play.cine.ar/api/v1.7/home?perfil=58ac6a3b189ad41270144f51&prods=30', options)
        .then(response => isResponseOk(response))
        .then(data => {
            const bodyData = JSON.parse(data);
            
            bodyData.tiras.forEach(tira => {
                const div = document.createElement('div');
                div.className = 'row';
                // document.getElementById('body').append(<h1>x.titulo</h1>)
                div.innerHTML = `
                    <h1 class="categoryTitle">${tira.titulo}</h1>
                    <div id="posterContainer${tira.id}" class="posterContainer"></div>
                `;
                document.getElementById('body').appendChild(div);
                tira.conte.forEach(contenido => {
                    const articleImg = bodyData.prods[parseInt(contenido)].afi;
                    const articleTitle = bodyData.prods[parseInt(contenido)].tit;
                    const articleYear = bodyData.prods[parseInt(contenido)].an;
                    const article = document.createElement('article');
                    article.className = 'poster';
                    article.innerHTML = `
                    <img src="https://img.cine.ar/image/${articleImg}/context/odeon_afiche" alt="">
                    <div class="poseter__data">
                        <span class="poseter__data__primary">${articleTitle}</span>
                        <span class="poseter__data__secondary">${articleYear}</span>
                    </div>
                    `;
                    document.getElementById('posterContainer' + tira.id).appendChild(article);
                })
            })
        })
        .catch(err => console.error("ERROR: ", err.message));
}