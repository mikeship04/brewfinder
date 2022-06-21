// global variable declarations
const mainDiv = document.getElementById('main-div')
const search = document.getElementById('search')
const previous = document.querySelector('#previous')
const next = document.querySelector('#next')

let pageNumber = 1
let stateSearchParameter = ""
let citySearchParameter = ""
let zipcodeSearchParameter = ""

//intial pageload fetch
fetch (`https://api.openbrewerydb.org/breweries?page=1&per_page=9`)
.then(res => res.json())
.then(data => {
    data.forEach(breweryBuilder)
    hidePrevious()
})

function pageReset(){
    while (mainDiv.firstChild) {
        mainDiv.removeChild(mainDiv.lastChild);
    }
}

function hidePrevious(){
    previous.classList.add('hidden')
}

// Search Form Event Listener
search.addEventListener('submit', (e) => {
    (e).preventDefault()
    let state = e.target.state.value
    let city = e.target.city.value
    let zipcode = e.target.zipcode.value
    pageReset()
    zipcodeSearchParameter = `by_postal=${zipcode}`
    stateSearchParameter = `by_state=${state}`
    citySearchParameter = `by_city=${city}`
    let parameter = `${stateSearchParameter}&${citySearchParameter}&${zipcodeSearchParameter}&`
    fetch(`https://api.openbrewerydb.org/breweries?${parameter}page=1&per_page=9`)
    .then(res => res.json())
    .then(data => data.forEach(breweryBuilder))

    hidePrevious()
    search.reset()
})

// Event Listener for Next Button
next.addEventListener('click', function(){
    pageNumber += 1
    let parameter = `${stateSearchParameter}&${citySearchParameter}&`
    fetch (`https://api.openbrewerydb.org/breweries?${parameter}page=${pageNumber}&per_page=9`)
    .then(res => res.json())
    .then(data => {
        if(data.length === 0){
            alert('No More Pages')
            pageNumber -= 1
        }
        else{
            pageReset()
            data.forEach(breweryBuilder)
        }

    if(pageNumber > 1){
        previous.classList.remove('hidden')
    }      
})
})

// Event Listener for Previous Button
previous.addEventListener('click', function(){
    if(pageNumber > 1){
        pageReset()
        pageNumber -= 1
        let parameter = `${stateSearchParameter}&${citySearchParameter}&`
        fetch (`https://api.openbrewerydb.org/breweries?${parameter}page=${pageNumber}&per_page=9`)
        .then(res => res.json())
        .then(data => data.forEach(breweryBuilder))
        if (pageNumber === 1){
            hidePrevious()
        }
    }
})

//builds the brewery cards from incoming data
function breweryBuilder(data) {
    const breweryContainer = document.createElement('div')
    const breweryRater = document.createElement('form')
    const starRating = document.createElement('div')
    const breweryName = document.createElement('h2')
    const breweryState = document.createElement('h5')
    const breweryCountry = document.createElement('h6')
    const breweryCity = document.createElement('h5')
    const breweryPhone = document.createElement('p')
    const breweryPostal = document.createElement('p')
    const breweryWebsite = document.createElement('a')
    if(data.website_url) breweryWebsite.href = data.website_url

    breweryContainer.className = 'beer-card'
    if(data.website_url) breweryWebsite.textContent = `${data.website_url}`
    breweryPostal.textContent = data.postal_code
    breweryPhone.textContent = data.phone
    breweryCity.textContent = data.city
    breweryCountry.textContent = data.country
    breweryState.textContent = data.state
    breweryName.textContent = data.name
    breweryRater.id = 'Rating'
    starRating.id = 'star-form'

    breweryContainer.append(breweryRater, breweryName, breweryState, breweryCity, breweryCountry, breweryPhone, breweryPostal, breweryWebsite)
    breweryRater.append(starRating)
    for (element of starBuilder()) {
        starRating.append(element)
    }
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


// Zipcode form to search by zipcode
// const zipcodeForm = document.querySelector('#zipcode-search')
// zipcodeForm.addEventListener('submit', e => {
//     e.preventDefault()
//     let tempZipcode = parseInt(e.target.zipcode.value)
//     if(!tempZipcode){
//         tempZipcode = 0
//     }
//     zipcode = tempZipcode
//     grabBrewery()
//     zipcodeForm.reset()
// })

// fetch ('https://api.openbrewerydb.org/breweries')
//     .then(res => res.json())
//     .then(data => {
//         organizePage(data)
//         for(i = 1; i < 9; i++){
//             const card = document.getElementById(`a${i}`).children
//             card[0].classList.toggle('page1')
//             card[1].classList.toggle('hidden')
//             card[1].classList.toggle('page2')
//             if(card[2]){
//                 card[2].classList.toggle('hidden')
//                 card[2].classList.toggle('page3')
//             }
//         }
//     })

//Next page button
// const next = document.querySelector('#next')
// next.addEventListener('click', function(){
//     const currentPage = document.getElementsByClassName(`page${pageNumber}`)
//     for(element of currentPage){
//         element.classList.toggle('hidden')
//     }

//     pageNumber += 1

//     const nextPage = document.getElementsByClassName(`page${pageNumber}`)
//     for(element of nextPage){
//         element.classList.toggle('hidden')
//     }
// })

//Previous page button
// const previous = document.querySelector('#previous')
// previous.addEventListener('click', function(){
//     if(pageNumber > 1){
//         const currentPage = document.getElementsByClassName(`page${pageNumber}`)
//         for(element of currentPage){
//             element.classList.toggle('hidden')
//         }
 
//         pageNumber -= 1
        
//         const previousPage = document.getElementsByClassName(`page${pageNumber}`)
//         for(element of previousPage){
//             element.classList.toggle('hidden')
//         }
//     }
//     else{
//         alert('Stop scrolling')
//     }
// })

// function grabBrewery(){
//     fetch ('https://api.openbrewerydb.org/breweries?')
//     .then(res => res.json())
//     .then(data => {
//         results = data.filter(element => {
//             dataZipcode = parseInt(element.postal_code.toString().substr(0,5))
//             return zipcode === dataZipcode
//         })
//         results.forEach(breweryBuilder)
//         if(results.length === 0){
//             console.log("Sorry there were no breweries that fit this search criteria")
//         }
//     })
// }

//Organizes array of elements into one of 8 div classes from a1-a8
// function organizePage(array){
//     let count = 0
//     for(x = 0; x < Math.ceil(array.length/8); x++){
//         for(i = 1; i < 9; i++){
//             breweryBuilder(array[count], i)
//             count += 1
//             if(count === array.length){
//                 break
//             }
//         }
//     }
// }