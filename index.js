//data elements we want
// city, state, country, name, phone, postal_code, website_url

const mainDiv = document.getElementById('div')

fetch ('https://api.openbrewerydb.org/breweries')
.then(r => r.json())
.then(data => data.forEach(breweryBuilder))

function breweryBuilder(data) {
    const breweryName = document.createElement('h2')
    const breweryState = document.createElement('h4')
    const breweryCountry = document.createElement('h4')
    const breweryCity = document.createElement('h4')
    const breweryPhone = document.createElement('h4')
    const breweryPostal = document.createElement('h4')
    const breweryWebsite = document.createElement('a')
    breweryWebsite.href = data.website_url

    breweryWebsite.textContent = `${data.website_url}`
    breweryPostal.textContent = data.postal_code
    breweryPhone.textContent = data.phone
    breweryCity.textContent = data.city
    breweryCountry.textContent = data.country
    breweryState.textContent = data.state
    breweryName.textContent = data.name

    mainDiv.append(breweryName, breweryState, breweryCountry, breweryCity, breweryPhone, breweryPostal, breweryWebsite)
}