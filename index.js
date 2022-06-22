// Global Variable Declarations
const mainDiv = document.getElementById('main-div')
const search = document.getElementById('search')
const previous = document.querySelector('#previous')
const next = document.querySelector('#next')
const mainCardType = document.getElementById('brewery-type')
const mainCardName = document.getElementById('brewery-name')
const mainCardComments = document.getElementById('brewery-comments')
const mainCardAddress = document.getElementById('complete-address')
const mainCard = document.getElementById('Main-Beer')

let pageNumber = 1
let stateSearchParameter = ""
let citySearchParameter = ""
let zipcodeSearchParameter = ""
let parameter = ""

// Function to Clear Page and Reload Original Breweries
function clearPage(){
    pageReset()
    fetch (`https://api.openbrewerydb.org/breweries?page=1&per_page=12`)
    .then(res => res.json())
    .then(data => {
        data.forEach(breweryBuilder)
        hidePrevious()
        hideButtonIfNextPage()
    })
    parameter = ""
    pageNumber = 1
}
clearPage()

// Function to Delete All Items in Main Div (Brewery Cards)
function pageReset(){
    while (mainDiv.firstChild) {
        mainDiv.removeChild(mainDiv.lastChild);
    }
}

// Hide Previous Button
function hidePrevious(){
    previous.classList.add('hidden')
}
// Show Previous Button
function showPrevious(){
    previous.classList.remove('hidden')
}
// Hide Next Button
function hideNext(){
    next.classList.add('hidden')
}
// Show Next Button
function showNext(){
    next.classList.remove('hidden')
}

function hideButtonIfNextPage(){
    fetch(`https://api.openbrewerydb.org/breweries?${parameter}page=${pageNumber + 1}&per_page=12`)
    .then(res => res.json())
    .then(data => {
        if(data.length === 0){
            hideNext()
        }
        else{
            showNext()
        }
    })
}

// Search Form Event Listener
search.addEventListener('submit', (e) => {
    (e).preventDefault()
    pageReset()
    pageNumber = 1

    let state = e.target.state.value
    let city = e.target.city.value
    let zipcode = e.target.zipcode.value

    stateSearchParameter = `by_state=${state}`
    citySearchParameter = `by_city=${city}`
    zipcodeSearchParameter = `by_postal=${zipcode}`

    parameter = `${stateSearchParameter}&${citySearchParameter}&${zipcodeSearchParameter}&`

    fetch(`https://api.openbrewerydb.org/breweries?${parameter}page=1&per_page=12`)
    .then(res => res.json())
    .then(data => data.forEach(breweryBuilder))

    hideButtonIfNextPage()
    hidePrevious()
})

// Reset Button
const reset = document.querySelector('#reset')
reset.addEventListener('click', function(){
    search.reset()
    clearPage()
})

// Event Listener for Next Button
next.addEventListener('click', function(){
    pageNumber += 1
    fetch (`https://api.openbrewerydb.org/breweries?${parameter}page=${pageNumber}&per_page=12`)
    .then(res => res.json())
    .then(data => {
        hideButtonIfNextPage()
        if(data.length === 0){
            pageNumber -= 1
        }
        else{
            pageReset()
            data.forEach(breweryBuilder)
        }

    if(pageNumber > 1){
        showPrevious()
    }      
})
})

// Event Listener for Previous Button
previous.addEventListener('click', function(){
    if(pageNumber > 1){
        pageReset()
        pageNumber -= 1
        fetch (`https://api.openbrewerydb.org/breweries?${parameter}page=${pageNumber}&per_page=12`)
        .then(res => res.json())
        .then(data => data.forEach(breweryBuilder))
        hideButtonIfNextPage()
        if (pageNumber === 1){
            hidePrevious()
        }
    }
})

// Builds the Brewery Cards from Incoming Data
function breweryBuilder(data) {
    const breweryContainer = document.createElement('div')
    breweryContainer.className = 'beer-card'

    const breweryName = document.createElement('h2')
    breweryName.textContent = data.name

    let phoneNumber = "Not Available"
    if(data.phone){
        const phone = (data.phone).toString()
        phoneNumber = `${phone.substr(0,3)}-${phone.substr(3,3)}-${phone.substr(6,4)}`
    }

    let postalCode = "Not Available"
    if(data.postal_code !== 0){
        postalCode = (data.postal_code).toString().substr(0,5)
    }

    const breweryAddress = document.createElement('p')
    breweryAddress.textContent = `${data.city}, ${data.state}, U.S. ${postalCode} (${phoneNumber})`

    const breweryRater = document.createElement('form')
    const starRating = document.createElement('div')
    breweryRater.id = 'Rating'
    starRating.id = 'star-form'

    const breweryWebsite = document.createElement('a')
    breweryWebsite.textContent = "No URL Available"
    if(data.website_url){
        breweryWebsite.href = data.website_url
        breweryWebsite.textContent = `${data.website_url}`
    }

    breweryContainer.append(breweryName, breweryAddress, breweryRater, breweryWebsite)
    breweryRater.append(starRating)
    for (element of starBuilder()) {
        starRating.append(element)
    }

    breweryContainer.addEventListener('click', () => {
        mainCardName.textContent = data.name
        mainCardAddress.textContent = breweryAddress.innerText
        mainCardType.textContent = data.brewery_type
        mainCardComments.textContent = `feature coming soon!`


    })
    mainDiv.append(breweryContainer)
}

function starBuilder () {
    const starArray = []
    for (i=1; i < 6; i++) {
        const star = document.createElement('input')
        star.type = 'radio'
        star.name = `star${i}`
        star.rating = `star-rating${i}`
        star.value = `star-value${i}`
        starArray.push(star)
    }
    return(starArray)
}