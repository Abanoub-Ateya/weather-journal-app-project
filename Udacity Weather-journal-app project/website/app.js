// Create a new date instance dynamically with JS-
const d = new Date();
const newDate = d.getMonth() + '' + d.getDate() + '' + d.getFullYear();

/* Global Variables */
const generate = document.querySelector("#generate");
const zipCode = document.querySelector("#zip"); 
const temperature = document.querySelector("#temp"); 
const content = document.querySelector("#content");
const date = document.querySelector("#date");
const feelings = document.querySelector("#feelings")

// baseURL and apiKey obtained from the website https://openweathermap.org/
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip="
const apiKey = "&appid=ba033007e767f1256f22e682798751fe&units=imperial"




/*
adding an event listener to the button with the id generate 
with a callback that is executed when the generate button is clicked 
*/
generate.addEventListener("click", (e)=> {
    e.preventDefault();
    getZipCode(baseURL, zipCode.value, apiKey)

// a chained promise calling the postData async. function
.then((data)=>{
    postData("/add", {
        date: d,
        content: feelings.value,
        temperature: data.main.temp
    })
    
// a chained promise calling the retrieveData async. function
.then (
    retrieveData()
)
}
)
}
)



/*

an async. function to fetch data from the API depending on the baseURL, zipCode and apiKey
async. keyword makes the function asynchronous and gives access to using the keywords: 
await, try and catch .
*/
const getZipCode = async (baseURL, zipCode, apiKey)=> {

    
    const res = await fetch(baseURL + zipCode + apiKey)

    // try runs if fetch is completed without errors 
    try {
        
        const data = await res.json();
        if (data.cod == 200){
        console.log(data)
        return data}
        else{console.log(data.message)}
    } 

    // catch; handles errors & is run if fetch is not completed correctly
    catch (error) {
        
        console.log("error", error);
    }
}



/*
this async. post is saving the fetched data and that added by the user 
to the app. so it could be called at any time by the get request
*/

const postData = async (url='', data = {}) => {

    const response = await fetch (url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // transforming data into json
        body: JSON.stringify(data),     
    });

    // try runs if fetch is completed without errors
    try {
        const newData = await response.json();
        console.log(newData);
        return newData

        // catch; handles errors & is run if fetch is not completed correctly
    } catch (error) {
        console.log("error", error);
    }
}



/* an asycn. function that is retrieving the sought after data from the
 fetched data so that we have only the data we need(date, temperature, content ) 
 written separately in the console and in the terminal 
*/
const retrieveData = async () => {
    const request = await fetch('/route');

    // try runs if fetch is completed without errors
    try {

        // Transform into JSON
        const allData = await request.json()
        console.log(allData)

        //updating the user interface dynamically to include data fetched and that entered by the user
        temperature.innerHTML ="the temperature is ▶️"+ Math.round(allData.temperature) + ' degrees';
        content.innerHTML ="Feeling ▶️" + allData.content;
        date.innerHTML = "the date is ▶️ "+ allData.date;
    }

    // catch; handles errors & is run if fetch is not completed correctly
    catch (error) {
        console.log("error", error);
        
    }
}











































