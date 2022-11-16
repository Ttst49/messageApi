const newMessage= document.querySelector('#message')
const boutonEnvoyer = document.querySelector('.envoi')
const requetePost = new XMLHttpRequest();
const chatButton = document.querySelector('.chat')
const signUpButton = document.querySelector('.signUp')
const connexionButton= document.querySelector('.connexion')
bodyPage = document.querySelector('body')
fil= document.querySelector('.filAccueil')


let nom=''
let id=''
let contenu=''

//onload= "refreshPage(5000);"

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

function getMessages(){
         fetch("https://139.162.156.85:8000/messages/")
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



function clearMessageZone(messageZone){
    messageZone.value=""
}

function templateCard(name,identifiant,content){
    let template= `
                <div class="card carte" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title carteTitre">${name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted carteSousTitre">message numéro ${identifiant}</h6>
                        <p class="card-text carteContenu">${content}</p>
                    </div>
                </div>`

    fil.innerHTML += template
}

async function refreshPage(t){

    setTimeout("location.reload();", t);
    await fil.scrollTo(0,0)

}



boutonEnvoyer.addEventListener("click",()=>{

    requetePost.open("POST", "https://139.162.156.85:8000/messages/4/new", true);
    requetePost.setRequestHeader('Content-Type', 'application/json');
    requetePost.send(JSON.stringify({
        content: newMessage.value
    }));
    clearMessageZone(newMessage)


})

chatButton.addEventListener('click',()=>{
    bodyPage.innerHTML = templateChat
    refreshPage(200)


})


signUpButton.addEventListener('click',()=>{
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
        Creer un compte de messagerie
            <div class="form">
                <form action="">
                    <label for="username">Username</label>
                    <input type="text" id="username" placeholder="John Doe"> <br>
                    <label for="password">Password</label>
                    <input type="password" id="password" placeholder="********">
                    <div class="bouton">
                        <button class="btn btn-primary Connexion" type="submit">S'inscrire</button>
                    </div>
                </form>
            </div>
        <div class="already"><a href="index.html"> J'ai déja un compte</a></div>
    </div>
</div>
</div>
    `

    bodyPage.innerHTML= templateSignUp
})

connexionButton.addEventListener('click',()=>{
    bodyPage.innerHTML= templateChat
})

getMessages()
