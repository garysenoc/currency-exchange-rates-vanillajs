async function getAllData() {
  try {
    let myData = null;
    await Promise.all([
      fetch(
        'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/eur.json',
        { cache: 'default' },
      ),
      fetch(
        'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/aud.json',
        { cache: 'default' },
      ),
      fetch(
        'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/cad.json',
        { cache: 'default' },
      ),
      fetch(
        'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/chf.json',
        { cache: 'default' },
      ),
      fetch(
        'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/nzd.json',
        { cache: 'default' },
      ),
      fetch(
        'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/bgn.json',
        { cache: 'default' },
      ),

      fetch(
        'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/aud.json',
        { cache: 'default' },
      ),
      fetch(
        'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/cad.json',
        { cache: 'default' },
      ),
      fetch(
        'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/chf.json',
        { cache: 'default' },
      ),
      fetch(
        'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/nzd.json',
        { cache: 'default' },
      ),
      fetch(
        'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/bgn.json',
        { cache: 'default' },
      ),

      fetch(
        'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/aud/cad.json',
        { cache: 'default' },
      ),
      fetch(
        'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/aud/chf.json',
        { cache: 'default' },
      ),
      fetch(
        'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/aud/nzd.json',
        { cache: 'default' },
      ),
      fetch(
        'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/aud/bgn.json',
        { cache: 'default' },
      ),

      fetch(
        'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/cad/chf.json',
        { cache: 'default' },
      ),
      fetch(
        'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/cad/nzd.json',
        { cache: 'default' },
      ),
      fetch(
        'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/cad/bgn.json',
        { cache: 'default' },
      ),

      fetch(
        'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/chf/nzd.json',
        { cache: 'default' },
      ),
      fetch(
        'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/chf/bgn.json',
        { cache: 'default' },
      ),

      fetch(
        'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/nzd/bgn.json',
        { cache: 'default' },
      ),
    ])
      .then(function (responses) {
        // Get a JSON object from each of the responses
        return Promise.all(
          responses.map(function (response) {
            return response.json();
          }),
        );
      })
      .then(function (data) {
        myData = data;
      })
      .catch(function (error) {
        // if there's an error, log it
        console.log(error);
      });

    return myData;
  } catch (e) {
    console.log(e);
  }
}

async function separateData(currency) {
  try {
    let group1 = [];
    let group2 = [];
    let group3 = [];

    let finalData = [];
    let list = [
      'USD-EUR',
      'USD-AUD',
      'USD-CAD',
      'USD-CHF',
      'USD-NZD',
      'USD-BGN',
      'EUR-AUD',
      'EUR-CAD',
      'EUR-CHF',
      'EUR-NZD',
      'EUR-BGN',
      'AUD-CAD',
      'AUD-CHF',
      'AUD-NZD',
      'AUD-BGN',
      'CAD-CHF',
      'CAD-NZD',
      'CAD-BGN',
      'CHF-NZD',
      'CHF-BGN',
      'NZD-BGN',
    ];
    const myFinalData = await getAllData();

    for (let i in myFinalData) {
      let curkey = Object.keys(myFinalData[i])[1];
      finalData.push({
        currency: list[i],
        exchangeRate: myFinalData[i][curkey],
      });
    }

    for (let i in finalData) {
      if (
        finalData[i].currency.toLowerCase().includes(currency.toLowerCase())
      ) {
        if (finalData[i].exchangeRate < 1) {
          group1.push(finalData[i]);
        } else if (
          finalData[i].exchangeRate >= 1 &&
          finalData[i].exchangeRate < 1.5
        ) {
          group2.push(finalData[i]);
        } else {
          group3.push(finalData[i]);
        }
      }
    }

    group1 = sortGroup(group1);
    group2 = sortGroup(group2);
    group3 = sortGroup(group3);

    fillData(group1, 'group1');
    fillData(group2, 'group2');
    fillData(group3, 'group3');
  } catch (e) {
    console.log(e);
  }
}

function fillData(group, bodyName) {
  const mainBody = document.querySelector(`#${bodyName}`);
  for (let i in group) {
    const text = `${group[i].currency}: ${group[i].exchangeRate}`;
    const myText = document.createElement('li');
    myText.appendChild(document.createTextNode(text));
    mainBody.appendChild(myText);
  }
  const text = `Count: ${group.length}`;
  const myText = document.createElement('li');
  myText.appendChild(document.createTextNode(text));
  mainBody.appendChild(myText);
}

function sortGroup(group) {
  return group?.sort((a, b) => (a.exchangeRate > b.exchangeRate ? 1 : -1));
}

var select = document.querySelector('#currency');
select.addEventListener('change', function () {
  let group1 = document.getElementById('group1');
  group1.innerHTML = '';
  let group2 = document.getElementById('group2');
  group2.innerHTML = '';
  let group3 = document.getElementById('group3');
  group3.innerHTML = '';
  separateData(select.value);
});

