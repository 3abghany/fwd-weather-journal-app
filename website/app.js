
/* Global Variables */
const generateBtn = document.querySelector('#generate');
const resDate = document.querySelector('#date');
const resTemp = document.querySelector('#temp');
const resContent = document.querySelector('#content');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

//URL and Personal API Key for OpenWeatherMap API
let apiUrl = 'http://api.openweathermap.org/data/2.5/weather?';
let apiKey = ',&appid=a0e6ac3cb26fd3e0fb294bc34dc98b74';


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
    console.log(temperature);
    
    postData('http://localhost:8000/post', feeling);
  })
 
  //chain Promise that updates the UI dynamically
  .then(function(data){
 
  resDate.innerHTML = `Date is: ${newDate}`;
  resTemp.innerHTML = `Temperature is: ${temperature}`;
  resContent.innerHTML = `Content is: ${feeling}`;

 })

}



//asynchronous function to to make a GET request using fetch()
async function fetchData(zip){

const response = await fetch(`${apiUrl}zip=${zip}${apiKey}`)

const data = await response.json()

console.log(data);

return data;
}

//asynchronous function to to make a GET request
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


