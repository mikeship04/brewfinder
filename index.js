//data elements we want
// city, state, country, name, phone, postal_code, website_url

const mainDiv = document.getElementById('main-div')
let zipcode = 0

let pageNumber = 1


// for(i = 1; i < 50; i++){
//     fetch (`https://api.openbrewerydb.org/breweries?page=${i}&per_page=10`)
//     .then(res => res.json())
//     .then(data => data.forEach(breweryBuilder))
// }


fetch (`https://api.openbrewerydb.org/breweries?page=1&per_page=10`)
.then(res => res.json())
.then(data => data.forEach(breweryBuilder))

// Event Listener for Next Button
const next = document.querySelector('#next')
next.addEventListener('click', function(){
    while (mainDiv.firstChild) {
        mainDiv.removeChild(mainDiv.lastChild);
    }
    pageNumber += 1

    fetch (`https://api.openbrewerydb.org/breweries?page=${pageNumber}&per_page=10`)
    .then(res => res.json())
    .then(data => data.forEach(breweryBuilder))
})

// Event Listener for Previous Button
const previous = document.querySelector('#previous')
previous.addEventListener('click', function(){
    if(pageNumber > 1){
        while (mainDiv.firstChild) {
            mainDiv.removeChild(mainDiv.lastChild);
        }
        pageNumber -= 1

        fetch (`https://api.openbrewerydb.org/breweries?page=${pageNumber}&per_page=10`)
        .then(res => res.json())
        .then(data => data.forEach(breweryBuilder))
    }
    else{
        alert('Unable To Execute Command')
    }
})

function breweryBuilder(data) {
    const breweryContainer = document.createElement('div')
    const breweryName = document.createElement('h2')
    const breweryState = document.createElement('h4')
    const breweryCountry = document.createElement('h4')
    const breweryCity = document.createElement('h4')
    const breweryPhone = document.createElement('h4')
    const breweryPostal = document.createElement('h4')
    const breweryWebsite = document.createElement('a')
    if(data.website_url) breweryWebsite.href = data.website_url

    breweryContainer.className = 'beer-card'
    breweryContainer.setAttribute('id', data.id)
    if(data.website_url) breweryWebsite.textContent = `${data.website_url}`
    breweryPostal.textContent = data.postal_code
    breweryPhone.textContent = data.phone
    breweryCity.textContent = data.city
    breweryCountry.textContent = data.country
    breweryState.textContent = data.state
    breweryName.textContent = data.name

    breweryContainer.append(breweryName, breweryState, breweryCountry, breweryCity, breweryPhone, breweryPostal, breweryWebsite)
    //const card = document.querySelector(`#a${cardNumber}`)
    //card.append(breweryContainer)
    mainDiv.append(breweryContainer)
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