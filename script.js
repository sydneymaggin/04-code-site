
console.log("Hello, Airtable");

// load the airtable library, call it "Airtable"
var Airtable = require("airtable");
//console.log(Airtable);

// use airtable library, connect to our base using API key
var base = new Airtable({ apiKey: "key3tVcwkhimDkISL"}).base(
    "appvvIiPfWlrhtTAI"
);

// get our collection base, select all the records
// specify functions that will receive the data
base("readings").select({}).eachPage(gotPageOfResponses,gotAllResponses);

// empty array to hold our data
var responses = [];

// callback function that receives our data
function gotPageOfResponses(records, fetchNextPage) {
    console.log("gotPageOfResponses()");
    // add the records from this page to our array
    responses.push(...records);
    // request more pages
    fetchNextPage();
  }

  // call back function that is called when all pages are loaded
function gotAllResponses(err) {
  console.log("gotAllResponses()");

  // report an error, you'd want to do something better than this in production
  if (err) {
    console.log("error loading responses");
    console.error(err);
    return;
  }

  // call functions to log and show the songs
  consoleLogResponses();
  showResponses();
}


//just loop through the books and console.log them
function consoleLogResponses() {
  console.log("consoleLogResponses()");
  responses.forEach((response) => {
    console.log("Response:", response);
  });
}

// loop through the books, create an h2 for each one, and add it to the page
function showResponses() {
  console.log("showResponses()");
  responses.forEach((response) => {


    // creating new div container where info will go
    var responseContainer = document.createElement("div");
    responseContainer.classList.add("response-container");
    document.querySelector(".container").append(responseContainer);
    responseContainer.style.background = "white";


    // add response title to container
    var responseTitle = document.createElement("h1");
    responseTitle.classList.add("title");
    responseTitle.innerText = response.fields.title;
    responseContainer.append(responseTitle);
 

    // add response title to container
    var responseYear = document.createElement("h1");
    responseYear.classList.add("year");
    responseYear.innerText = response.fields.year;
    responseContainer.append(responseYear);
    


    //add author to song container
    var responseAuthor = document.createElement("h1");
    responseAuthor.classList.add("author");
    responseAuthor.innerText = response.fields.author;
    responseContainer.append(responseAuthor);

    //add summary to our song container
    var responseSummary = document.createElement("p");
    responseSummary.classList.add("summary");
    responseSummary.innerText = response.fields.summary;
    responseContainer.append(responseSummary);

    //add image to response container
    var responseImage = document.createElement("img");
    responseImage.classList.add("image");
    responseImage.src = response.fields.image[0].url;
    responseContainer.append(responseImage);

    //add event listener
    // when user clicks on container
    // image and summary will appear or disappear

    responseContainer.addEventListener("click", function(){
      responseImage.classList.toggle("active");
      responseSummary.classList.toggle("active");
    })
     


    var container = document.querySelector(".container");
    var isColored = false;

    container.addEventListener("click", function(){
    if(isColored){
    responseContainer.style.background = "white";
    responseContainer.style.color = "#3beb02";
    isColored = false;
    } else{
      responseContainer.style.background = "#3beb02";
      responseContainer.style.color = "white";
    isColored = true;
    }
    });    


    

  });
  




}






