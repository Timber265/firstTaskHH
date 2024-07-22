const URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1'

async function request(url) {
    try {
        const localData = localStorage.getItem('data')
        if (localData) {
            return JSON.parse(localData)
        } else {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            localStorage.setItem('data', JSON.stringify(data))
            return data;
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

async function createDom(dataPromise) {
    const data = await dataPromise
    const tableContent = document.querySelector('.table__content')
    tableContent.innerHTML = ''
    const tableContentTr = document.createElement('tr')
    const tableContentThId = document.createElement('th')
    tableContentThId.textContent = 'ID'
    tableContentThId.className = 'tableID'
    const tableContentThSymbol = document.createElement('th')
    tableContentThSymbol.textContent = 'SYMBOL'
    tableContentThSymbol.className = 'tableSymbol'
    const tableContentThName = document.createElement('th')
    tableContentThName.textContent = 'NAME'
    tableContentThName.className = 'tableName'
    tableContentTr.append(tableContentThId, tableContentThSymbol, tableContentThName)
    tableContent.appendChild(tableContentTr)

    data.forEach(item => {
        const trElement = document.createElement('tr')
        const tdElementID = document.createElement('td')
        tdElementID.className = 'tableID'
        const tdElementSymbol = document.createElement('td')
        tdElementSymbol.className = 'tableSymbol'
        const tdElementName = document.createElement('td')
        tdElementName.className = 'tableName'
        // // const itemElement = document.createElement('div')
        // // itemElement.textContent = item.id
        // // tableContent.appendChild(itemElement)
        // trElement.appendChild(thElement)
        // thElement.textContent = 'id'
        // tableContent.appendChild(trElement)

        tdElementID.textContent = item.id
        tdElementSymbol.textContent = item.symbol
        tdElementName.textContent = item.name

        trElement.append(tdElementID, tdElementSymbol, tdElementName)

        tableContent.appendChild(trElement)
    })
}

createDom(request(URL))

