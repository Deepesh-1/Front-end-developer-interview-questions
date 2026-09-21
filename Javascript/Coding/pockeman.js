//Pockeman API: JS

let pockemanArray = []
const displayData = document.getElementById('displayData')
const pockemanDetails = document.getElementById('pockemanDetails')

async function fetchData() {
  try {
    displayData.innerText = 'Loading...'
    const response = await fetch('https://pokeapi.co/api/v2/pokemon')
    if (!response.ok) {
      throw new Error(response.status)
    }
    const data = await response.json()
    pockemanArray = [...pockemanArray, ...data.results]
    renderData()
  } catch (e) {
    displayData.innerText = `${e}`
    console.error(e)
  } finally {
      console.log('Request completed')
  }
}
fetchData()
function renderData() {
  displayData.innerHTML = ''
  let select = document.createElement('select')
  displayData.appendChild(select)
  pockemanArray.forEach((item) => {
    const option = document.createElement('option')
    option.value = `${item.url}`
    option.text = `${item.name}`
    select.appendChild(option)
  })
  select.addEventListener('change', async (event) => {
    const url = event.target.value
    const response = await fetch(url)
    const data = await response.json()
    const pokeman = {
      name: data?.name,
      weight: data?.weight,
    }

    pockemanDetails.innerText = `Pockeman Details:\nName:${pokeman.name}\nWeight:${pokeman.weight}`
  })
}
