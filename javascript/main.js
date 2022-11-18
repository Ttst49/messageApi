const newMessage= document.querySelector('#message')
const boutonEnvoyer = document.querySelector('.envoi')
const requetePost = new XMLHttpRequest();
const signUpButton = document.querySelector('.signUp')
const chatButton = document.querySelector('.chat')
bodyPage = document.querySelector('body')
fil= document.querySelector('.filAccueil')


let baseUrl= 'https://139.162.156.85:8000'
let token='eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2Njg3NjY1OTUsImV4cCI6MTY2ODc3MDE5NSwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiVGhpYmF1dCJ9.nN5dWl6pJsT-FGF1wkwDlspxOmo2Nnd_yGR3b2ilWqMpKstN9SeCYjI-Ze_8QEtYamANU9GZu8iMHP3WMzGjWquD8p8ecERoHnF6b9U8LyFvcAD8y0ku-DEKqJUaCpS1YOuIYwT5IMFxa_sknsNNRBOIKryxdJQh92w7hf1yMLEvOUinFx87zpAMKuBMXuOVx-N0JmzMm9d40PlNwvnY8tSIkKo0hYMyTV_WRsWcu_MGo2TEERBJ2-xDGs2GVk-92lgL7uxjv-cUMPTEA-Z9g93ibGPLP5c-j3OEMdHxmZvByqTmqamgGfJgRAI0HgpPrQesFEuHVBrOxuvJ_5TI8A'
let usedtoken=""
let idUser=39
let nom=''
let id=''
let contenu=''
let templateChat=`
    <div class="container page">
        <div class="navbar">
            <span class="logo">Who's app</span>
            <span class="chat">chat</span>
            <span class="signUp">sign up</span>
        </div>
    </div>
    <div class="filAccueil">
        <div class="fixedElement">
            <input type="text" id="message" placeholder="votre message">
            <button class="btn btn-success envoi">envoyer</button>
        </div>
    </div>
`
let templateSignUp=`
<div class="container page">
    <div class="navbar">
        <span class="logo">Who's app</span>
        <span class="chat">chat</span>
        <span class="signUp">sign up</span>
    </div>
</div>
        <div class="landingPage">
<div class="login">
    <div class="topbar">
    </div>
    <div class="remain">
        Create an account
            <div class="form">
                    <label for="username">Username</label>
                    <input required type="text" id="username" placeholder="John Doe"> <br>
                    <label for="password">Password</label>
                    <input required type="password" id="password" minlength="6" placeholder="********">
                    <div class="bouton">
                        <button class="btn btn-primary inscription">S'inscrire</button>
                    </div>
            </div>
            <div class="boutonConnect">
        </div>
    </div>
    
</div>
<button class="alreadyAccount btn btn-danger"> J'ai déja un compte</button>
</div>
    `
let templateConnection=`
<div class="container page">
    <div class="navbar">
        <span class="logo">Who's app</span>
        <span class="chat">chat</span>
        <span class="signUp">sign up</span>
    </div>
</div>
        <div class="landingPage">
<div class="login">
    <div class="topbar">
    </div>
    <div class="remain">
        Create an account
            <div class="form">
                    <label for="username">Username</label>
                    <input required type="text" id="usernameConnection" placeholder="John Doe"> <br>
                    <div style="color: red" class="usernameAlreadyTaken"></div>
                    <label for="password">Password</label>
                    <input required type="password" id="passwordConnection" minlength="6" placeholder="********">
                    <div class="bouton">
                        <button class="btn btn-primary connexion">Se connecter</button>
                    </div>
            </div>
            <div class="boutonConnect">
        </div>
    </div>
    
</div>

</div>
    `



boutonEnvoyer.addEventListener("click",()=>{

    requetePost.open("POST", `${baseUrl}/api/messages/new`, true);
    requetePost.setRequestHeader('Content-Type', 'application/json');
    requetePost.setRequestHeader('Authorization',`Bearer ${token}`)
    requetePost.send(JSON.stringify({
        content: newMessage.value
    }));
    clearMessageZone(newMessage)
    refreshPage(200)


})

chatButton.addEventListener('click',()=>{
    display(templateChat)
    refreshPage(200)


})


signUpButton.addEventListener('click',()=>{


    display(templateSignUp)
    const inscriptionButton= document.querySelector('.inscription')
    const alreadyButton = document.querySelector('.alreadyAccount')
    const createUsername = document.querySelector('#username')
    const createPassword = document.querySelector('#password')
    const connexionButton = document.querySelector('.alreadyAccount')



    inscriptionButton.addEventListener('click',()=>{
        let body={
            username:`${createUsername.value}`,
            password:`${createPassword.value}`
        }
        let fetchParams={
            method: "POST",
            body: JSON.stringify(body),
            headers: {"Content-Type":"application/json"}

        }
        console.log(fetchParams)
        fetch(`${baseUrl}/register`,fetchParams)
            .then(responseSerialise => responseSerialise.json())
            .then(responseDeserialise=>{
                if (responseDeserialise ==='username already taken'){
                    alert('name user already used')
                }else {
                    display(templateConnection)
                }
            })

        console.log("Merci de vous etre inscrit")

    })
    alreadyButton.addEventListener('click',()=>{
        display(templateConnection)

        const alreadyAccount=document.querySelector('.connexion')
        const createUsername = document.querySelector('#usernameConnection')
        const createPassword = document.querySelector('#passwordConnection')


        let body={
            username:`${createUsername.value}`,
            password:`${createPassword.value}`
        }
        let fetchParams={
            method: "POST",
            body: JSON.stringify(body),
            headers: {"Content-Type":"application/json"}

        }
            alreadyAccount.addEventListener('click',()=>{
                fetch(`${baseUrl}/login`,fetchParams)
                    .then(responseSerialise=>responseSerialise.json())
                    .then(responseDeserialise=>{
                        if (responseDeserialise.message ==="Invalid credentials."){
                            alert("an error occured")
                            console.log(createUsername.value)
                            console.log(createPassword.value)
                        }else {
                            console.log("Bienvenue!")
                            //display(templateChat)
                            //refreshPage(200)
                            token = responseDeserialise.value
                            return token
                        }
                    })
            })

        })


    })
    chatButton.addEventListener('click',()=>{
        display(templateChat)
    })






function display(content){
    clearBodyPage()

    bodyPage.innerHTML=content
}

function getMessages(){
    fetch(`${baseUrl}/api/messages/`,{
        headers:{'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
                }}      )
        .then(response=>response.json())
        .then(messages=> {
            messages.forEach(message=>{
                nom=message.author.username
                id=message.id
                contenu=message.content
                templateCard(nom,id,contenu)

            })
        })
}

function clearBodyPage(){
    bodyPage.innerHTML=''
}

function clearMessageZone(messageZone){
    messageZone.value=""
}

function templateCard(name,identifiant,content){
    let template= `
                <div class="card carte" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title carteTitre">${name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted carteSousTitre">message numéro ${identifiant}</h6>
                        <p class="card-text carteContenu"><strong>${content}</strong></p>
                    </div>
                </div>`

    fil.innerHTML += template
}

async function refreshPage(t){

    setTimeout("location.reload();", t);

}

bodyPage.addEventListener('load',()=>{
    window.scroll({
        bottom: 10000,
        behavior: 'smooth'
    });
})


getMessages()
