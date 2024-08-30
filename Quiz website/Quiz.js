

//////////////////////////////////////////////// Data Constractor//////////////////////////////////////////////////////////////////////////////////////////////

// turn off the Starting-Quiz window and submit window
function dis(){
  document.getElementById('Starting-Quiz-section').style.display ="none";
  document.getElementsByClassName('links')[1].style.display ="none";
  document.getElementsByClassName('links')[2].style.display ="none";
  document.getElementById('result').style.display ="none";
}

dis();


// here we fill the storge with no Answers
window.sessionStorage.setItem(`Quistion-${5}`,"no Answer");


// n will help to choose the next Quistion by increment n++;
let n = 0;

// the questions is the Array  contain question and choices and answer to compare
const questions = [
    {
        question: "What is the capital of Jordan?",
        options: ["Amman", "Irbid", "Jerash", "aqaba"],
        answer: "Amman"
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        options: ["javascript", "scripting", "script", "java"],
        answer: "script"
    },
    {
        question: "How do you call a function named 'myFunction'?",
        options: ["Myfunction()", "Call function my function()", "Call Myfunction()", "Myfunction"],
        answer: "Myfunction()"
    },
    {
        question: "How to write an IF statement in JavaScript?",
        options: ["if i = 5", "if i == 5 then", "if i = 5 then", "if(i != 5)"],
        answer: "if(i != 5)"
    },
    {
        question: "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
        options: ["if(i <> 5)", "if i =! 5 then", "if i <> 5", "if(i != 5 )"],
        answer: "if(i != 5 )"
    }
    
];


// to check and choose feedback
function feedback(a){
    // array of feedback
    const statusarray = [
      one="Sorry. You failed",
      two="Sorry. You failed",
      three="congratulations. you pass",
      four="congratulations. Good you pass",
      five="congratulations. Very Good you pass",
    ]

    //  to choose a feedback
    if(a<=1){
        return one;
    }
    if(a==2){
        return two;
    }
    if(a==3){
        return three;
    }
    if(a==4){
        return four;
    }
    if(a==5){
        return five;
    }   
}


// multiple-choice => MC and the Answers is the lables we use it to replace the text
const MC= document.getElementsByClassName("Answers");

//Grades
let points = 0;

 // checking the answer by using color.  
function clk(){
    
    var inputs = document.getElementsByClassName('Ans'); //Abs is the class of radio and MC is used to color the Answer if is it wrong it will give red if its true the answer color will be green
    
     
    for (var i = 0; i < inputs.length; i++) {
    
        if(questions[n].options[i]== questions[n].answer&& inputs[i].checked.valueOf() == true){ // the questions is the Array  contain question and choices and answer to compare
            MC[i].style.color = "rgb(43, 255, 0)";
        }
        else if(inputs[i].checked.valueOf() == true)
        {
            MC[i].style.color = "red";
        } 
        else 
        {
            MC[i].style.color = "white";
        } 
    }
         
}


    // finshed Quiz
    let finshedQuiz=false; //to end the quiz
    let Points = 0; // grades
    var NotAns = 0; // # of choices that not selected if less then five that mean you Answer Question
    let Timeing = 0; // timer
    let correctAns=0; // total of correct Answers
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





////////////////////////////////////////////////////Save Data Start Quiz/////////////////////////////////////////////////////////////////////////////////////////

function SaveDataStartQuiz(){

    // if you are not insert the full name you will not be able to start the Quiz
    if(document.getElementById('Firstname').value == "" && document.getElementById('Lastname').value =="") 
    {
        document.getElementById('Firstname').style.border='3px solid red'; // where you not insert value
        document.getElementById('Lastname').style.border='3px solid red'; // where you not insert value     
    }
    else if(document.getElementById('Firstname').value == "") // if you not insert your first name
    {
        document.getElementById('Firstname').style.border='3px solid red'; // where you not insert value
        document.getElementById('Lastname').style.border='3px solid black';        
               
    }
    else if(document.getElementById('Lastname').value =="")  // if you not insert your last name
    {
        document.getElementById('Firstname').style.border='3px solid black';
        document.getElementById('Lastname').style.border='3px solid red'; // where you not insert value
               
    }
    else{
        //return color
        document.getElementById('Firstname').style.border='3px solid black';
        document.getElementById('Lastname').style.border='3px solid black';
 
        // Save User Data
        window.sessionStorage.setItem("First-name",document.getElementById('Firstname').value);
        window.sessionStorage.setItem("Last-name",document.getElementById('Lastname').value);

        // turn off log in window
        document.getElementById('login-Quiz-section').style.display ="none";

        //  turn on Quiz Window
        document.getElementById('Starting-Quiz-section').style.display ="block"; // Show Quiz 
        document.getElementsByClassName('links')[1].style.display ="block"; // Next buttom
        document.getElementsByClassName('links')[2].style.display ="block"; // Previous button

        // Time starts
        document.getElementById('timeing').style.display='block'; // show timer

        var int = setInterval( function(){
            document.getElementById('timeing').innerHTML= Timeing++;
            if( Timeing == 60 )
            {
                clearInterval(int);
                Timeing =0;
            }

        }, 1000);


        // Qustion  
        document.getElementById("Qustion").innerHTML = (n+1)+"-"+questions[n].question; // Question Change by n every n++ will change the Question
        document.getElementById("numper-of-Qustion").innerHTML = (n+1)+"/"+(MC.length+1); // Total questions,it's providing how many questions left
        document.getElementById("NextSubmit").innerHTML = "Next Question"; // change button text and use next question

        // multiple-choice => MC here in loop choices Change by n every n++ will change the choices
        for(let i=0; i < MC.length ; i++)
        {
            MC[i].innerHTML = questions[n].options[i];
        }

    }
}



//////////////////////////////////////////////////// Next Question//////////////////////////////////////////////////////////////////////////////////////////////
function NextQuistion(){


    //turn off ratio button and save the data and return color back
    var inputs = document.getElementsByClassName('Ans');
   
    // save last question Answer 
    for (var i = 0; i < MC.length; i++) {
        
        MC[i].style.color = "white"; // change the colot of choices to white if any of the condition below is not true

        if(questions[n].options[i]== questions[n].answer&& inputs[i].checked.valueOf() == true){  // if (Answers = Answers)
            window.sessionStorage.setItem(`Quistion-${n+1}`,questions[n].options[i]); // save data
            inputs[i].checked = false; // turn radio to make sure we will not see it in next question
        }
        else if(inputs[i].checked.valueOf() == true) // if (Answers = Wrong Answers)
        {
            window.sessionStorage.setItem(`Quistion-${n+1}`,questions[n].options[i]);  // save data 
            inputs[i].checked = false; // if (Answers = Wrong Answers)

        }
        else if(inputs[i].checked.valueOf() == false){ // if (Answers = No Answers)
            NotAns++; // to check how many answer is not get an Answer
          
            if(NotAns == 4){ 
                window.sessionStorage.setItem(`Quistion-${n+1}`,"no Answer"); // save no Answer
            }
        }
    }


    //next Quistion 
    if(n == MC.length); // do nothing
    else n++; // next question
   

    // check if you Awnser this Quistion before
    for(let i=0; i < MC.length ; i++){
        if(sessionStorage.getItem(`Quistion-${n+1}`)== questions[n].options[i]){ // check if last Question have Answer and auto check it again 
            inputs[i].checked = true; 
        }
    }
    
    // Qustion 
    document.getElementById("Qustion").innerHTML = (n+1)+"-"+questions[n].question; // # of Question
    document.getElementById("numper-of-Qustion").innerHTML = (n+1)+"/"+(MC.length+1); // total of Questions
   
    // multiple-choice => MC
    for(let i=0; i < MC.length ; i++)
    {
        MC[i].innerHTML = questions[n].options[i];
    }

    //finshed Quiz 
    if(finshedQuiz){
        for(let i=0; i < MC.length ; i++)
        {
            inputs[i].checked = false;
        
        }
        //Turn off start Quiz mode and (start + Previous) Buttons
        document.getElementById('Starting-Quiz-section').style.display ="none"; // turn off Quiz 
        document.getElementsByClassName('links')[1].style.display ="none"; // turn of Next buttom
        document.getElementsByClassName('links')[2].style.display ="none"; // turn of Previous button

        //Turn on Supmit window mode and Buttons
        document.getElementById('result').style.display ="block"; // show result wendows

        for(let i=0; i < questions.length ; i++)
        if(sessionStorage.getItem(`Quistion-${i+1}`)==questions[i].answer){ //check if (my Answer) = (real Answer)
            points++; // for grades
            correctAns++; // total of corect Answers
        }
        else 
        {
            points--; // Deduct points
        }
    
        // desplay full name and feedback of result
        document.getElementById('result-status').innerHTML=sessionStorage.getItem('First-name')+" "+sessionStorage.getItem('Last-name') +" "+feedback(points+1);
        document.getElementById('grade').innerHTML= 'you Grade is '+(points)+'/'+(n+1)+" "+"you solve "+correctAns+" Question"; // how many correct answer
        document.getElementById('percentage').innerHTML='you Grade is '+((100)*((points)/(n+1)))+"%"; // percentage grades
        document.getElementById('timeing').style.display='none'; // turn off timer
        Timeing = 0; //start from zero again
        clearInterval(int); // stop timer

        
        
    }
    else if(n == questions.length-1) // in last Qustion will change the button from Next to Submit and finshedQuiz will be true
    {
        document.getElementById("NextSubmit").innerHTML = "Double click To Submit";  // Submit button  

        // we will check  if all Question was solved if yes will sumbmit no you will locking for unsolve Question
        let allsolved = false;
        var x=0;
        for(let i = 0; i < questions.length ; i++){
            if(sessionStorage.getItem(`Quistion-${i+1}`)!= "no Answer"){   
                x++;
                if(x==5){
                    allsolved = true;
                }
            }
            else
            false;
        }

        if(allsolved){
        finshedQuiz = true;
        }
    }

}


//////////////////////////////////////////////////// Previous Question///////////////////////////////////////////////////////////////////////////////////////////

function PreviousQuistion(){ // its the same as before but in opposite way

    //turn off ratio button and save the data and return color back
    var inputs = document.getElementsByClassName('Ans');

    var NotAns = 0; // # of choice that not selected if less then five that mean you Answer Question
    
    for (var i = 0; i < MC.length; i++) {

        MC[i].style.color = "white";// change the colot of choices to white if any of the condition below is not true

        if(questions[n].options[i]== questions[n].answer&& inputs[i].checked.valueOf() == true){

        window.sessionStorage.setItem(`Quistion-${n+1}`,questions[n].options[i]);      

        inputs[i].checked = false;

        }
        else if(inputs[i].checked.valueOf() == true) 
        {
        window.sessionStorage.setItem(`Quistion-${n+1}`,questions[n].options[i]);   // if (Answers = Wrong Answers)
        inputs[i].checked = false; // uncheck
      
        }
        else if(inputs[i].checked.valueOf() == false){// if (Answers = No Answers)
            NotAns--;
            if(NotAns == 4){ // to check how many answer is not get an check
            window.sessionStorage.setItem(`Quistion-${n+1}`,"no Answer") // save no Answer
            }
        }
    }

    //Previous Quistion 
    if(n == 0);
    else{ 
        n--;
        finshedQuiz=false;
    } 

    // check if you Awnser this Quistion before
    for(let i=0; i < MC.length ; i++){
        if(sessionStorage.getItem(`Quistion-${n+1}`)== questions[n].options[i]){
            inputs[i].checked = true;
           
        }
    }  
    
    
    // Qustion 
    document.getElementById("Qustion").innerHTML = (n+1)+"-"+questions[n].question;
    document.getElementById("numper-of-Qustion").innerHTML = (n+1)+"/"+(MC.length+1);
   
    // multiple-choice => MC
    for(let i=0; i < MC.length ; i++)
    {
        MC[i].innerHTML = questions[n].options[i];
    }

    if(n == questions.length-1)
    {
        document.getElementById("NextSubmit").innerHTML = "Submit";  
    }
    else
    {
        document.getElementById("NextSubmit").innerHTML = "Next Qustion"
    }
   
}

//////////////////////////////////////////////////// restart Quiz///////////////////////////////////////////////////////////////////////////////////////////////

function restart(){   
    sessionStorage.clear(); // Clear Data
    n=0; // return to first Question
    finshedQuiz = false; // to make sure that i can back to take the quiz again 
    points=0; // results zero to re-take the quiz again
    correctAns=0; // # of correct Answers zero to re-take the quiz again 
    document.getElementById('Starting-Quiz-section').style.display ="none"; // turn off start-Quiz windows
    document.getElementsByClassName('links')[1].style.display ="none"; // turn off next
    document.getElementsByClassName('links')[2].style.display ="none"; // turn off Previous
    document.getElementById('result').style.display ="none"; // turn off result windows
    
    document.getElementById('login-Quiz-section').style.display ="block"; // turn On login-Quiz-section windows
    document.getElementById('Firstname').innerHTML=""; // clear old text
    document.getElementById('Lastname').innerHTML=""; // clear old text

 
 
}






