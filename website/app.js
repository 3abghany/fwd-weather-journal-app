/* Global Variables */
const generateBtn = document.querySelector('#generate');
const resDate = document.querySelector('#date');
const resTemp = document.querySelector('#temp');
const resContent = document.querySelector('#content');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

//URL and Personal API Key for OpenWeatherMap API
const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?';
const apiKey = ',&appid=a0e6ac3cb26fd3e0fb294bc34dc98b74&units=metric';


//generate event listener
generateBtn.addEventListener('click', performAction)

function performAction(e) {

  
  const zipCode = document.querySelector('#zip').value;
  const feeling = document.querySelector("#feelings").value;
  
  // call async GET request
  fetchData(zipCode)
  
  //chain Promise that makes a POST request
  .then(function(data){
    temperature = data.main.temp;
    postData('http://localhost:8000/post', feeling);
  })
 
  //chain Promise that updates the UI dynamically
  
  .then(function(){
  
    fetchUiData('http://localhost:8000/get')

   })
 
}



//asynchronous function to to make a GET request using fetch()
async function fetchData(zip){

if(!zip) {
  alert('no zip code provided');
}

const response = await fetch(`${apiUrl}zip=${zip}${apiKey}`)

const data = await response.json()

console.log(data);

return data;
}

//asynchronous function to to make a POST request
async function postData(url, feelings){

const dataS={
  date: newDate,
  temp: temperature,
  userRes: feelings
}

const options =  {
  method: "POST",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json"
            },
  body: JSON.stringify(dataS)
          }

await fetch(url, options);

}

//asynchronous function GET request&update ui based on the server response
async function fetchUiData(url){
    const serverResponse = await fetch(url);
    const serverData = await serverResponse.json();
    console.log(serverData);
    
    resDate.innerHTML = `Date is: ${serverData.date}`;
    resTemp.innerHTML = `Temperature is: ${serverData.temp}`;
    resContent.innerHTML = `Content is: ${serverData.userRes}`;
 }


