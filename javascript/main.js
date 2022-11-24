const newMessage= document.querySelector('#message')
const boutonEnvoyer = document.querySelector('.envoi')
const requetePost = new XMLHttpRequest();
const signUpButton = document.querySelector('.signUp')
const chatButton = document.querySelector('.chat')
bodyPage = document.querySelector('body')
fil= document.querySelector('.filAccueil')


let baseUrl= 'https://b1messenger.tk'
let token=""
let nom=''
let id=''
let content=''
let react=''
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
    </div>`

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
                    <div class="modalError"></div>
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
        <div style="color: red" class="modalError"></div>
<div class="login">
    <div class="topbar">
    </div>
    <div class="remain">
        Connect to your account
            <div class="form">
                    <label for="username">Username</label>
                    <input required type="text" id="usernameConnection" placeholder="John Doe"> <br>
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
let allmessages=""



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


                    const alreadyAccount=document.querySelector('.connexion')
                    const createUsername = document.querySelector('#usernameConnection')
                    const createPassword = document.querySelector('#passwordConnection')

                    modalExemple=`<!-- Button trigger modal -->
                                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                      Launch static backdrop modal
                                    </button>
                                    
                                    <!-- Modal -->
                                    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                      <div class="modal-dialog">
                                        <div class="modal-content">
                                          <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                          </div>
                                          <div class="modal-body">
                                            ...
                                          </div>
                                          <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-primary">Understood</button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>`

                    alreadyAccount.addEventListener('click',()=>{
                        const erreurModal = document.querySelector('.modalError')
                        chatButton.addEventListener('click',()=>{
                            display(templateChat)
                        })
                        let body={
                            username:`${createUsername.value}`,
                            password:`${createPassword.value}`
                        }
                        let fetchParams={
                            method: "POST",
                            body: JSON.stringify(body),
                            headers: {"Content-Type":"application/json"}

                        }

                        fetch(`${baseUrl}/login`,fetchParams)
                            .then(responseSerialise=>responseSerialise.json())
                            .then(responseDeserialise=>{
                                if (responseDeserialise.message ==="Invalid credentials."){
                                    erreurModal.innerHTML= modalExemple


                                }else {
                                    console.log("Bienvenue!")
                                    token = responseDeserialise.token
                                    console.log(token)
                                    refreshPage()
                                    return token
                                }
                            })
                    })






                }
            })

        console.log("Merci de vous etre inscrit")

    })
    chatButton.addEventListener('click',()=>{
        display(templateChat)
    })
    alreadyButton.addEventListener('click',()=>{
        const chatButton = document.querySelector('.chat')

        chatButton.addEventListener('click',()=>{
            display(templateChat)
        })
        display(templateConnection)

        const alreadyAccount=document.querySelector('.connexion')
        const createUsername = document.querySelector('#usernameConnection')
        const createPassword = document.querySelector('#passwordConnection')

        modalExemple=`<!-- Button trigger modal -->
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                          Launch static backdrop modal
                        </button>
                        
                        <!-- Modal -->
                        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                          <div class="modal-dialog">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div class="modal-body">
                                ...
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Understood</button>
                              </div>
                            </div>
                          </div>
                        </div>`

            alreadyAccount.addEventListener('click',()=>{
                const erreurModal = document.querySelector('.modalError')
                chatButton.addEventListener('click',()=>{
                    display(templateChat)
                })
                let body={
                    username:`${createUsername.value}`,
                    password:`${createPassword.value}`
                }
                let fetchParams={
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: {"Content-Type":"application/json"}

                }

                fetch(`${baseUrl}/login`,fetchParams)
                    .then(responseSerialise=>responseSerialise.json())
                    .then(responseDeserialise=>{
                        if (responseDeserialise.message ==="Invalid credentials."){
                            erreurModal.innerHTML+= modalExemple


                        }else {
                            console.log("Bienvenue!")
                            token = responseDeserialise.token
                            console.log(token)
                            refreshPage()
                            return token
                        }
                    })
            })

        })

    })



function printChat(template,)

function display(content){
    clearBodyPage()

    bodyPage.innerHTML=content
}

function getMessages(bearerToken){
    fetch(`${baseUrl}/api/messages/`,{
        headers:{'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearerToken}`
        }}      )
        .then(response=>response.json())
        .then(messages=>{
            messages.forEach(message=>{
                nom = message.author.username
                id = message.id
                content = message.content
                templateCard(nom, id, content)

                message.responses.forEach(response=>{
                    nom = response.author.username
                    id = response.id
                    content = response.content
                    templateLittleCard(nom, id, content)
                })
                message.reactions.forEach(reaction=>{
                    name = reaction.author.username
                    switch (reaction.type) {
                        case("happy"):
                            react = "(*^▽^*)"
                            templateminiCard(name, react)
                            break

                        case("sad"):
                            react = "(⏓‿⏓)"
                            templateminiCard(name, react)
                            break

                        case ("like"):
                            react = "〘•௰•〙👍"
                            templateminiCard(name, react)
                            break

                        case("dislike"):
                            react = '👎〘•௰•〙'
                            templateminiCard(name, react)
                            break

                        case ('love'):
                            react = '{ᶫᵒᵛᵉᵧₒᵤ}•.❮♥ᄉ♥❯'
                            templateminiCard(name, react)
                            break
                    }

                })
            })
        })

    setTimeout("scrollBy(0,100000)",1000)


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

    allmessages += template
    console.log("booj")
}

function templateLittleCard(name,identifiant,content){
    let template= `
                <div class="card carte carteLittle" style="width: 12rem;">
                    <div class="card-body carteLittleBody">
                        <h5 class="card-title carteTitre carteLittleTitre">${name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted carteSousTitre carteLittleSousTitre">message numéro ${identifiant}</h6>
                        <p class="card-text carteContenu carteLittleContenu"><strong>${content}</strong></p>
                    </div>
                </div>`

    allmessages += template
    console.log("meh")

}

function templateminiCard(name,reaction){
    let template=`
                <div class="card carte carteMini" style="width: 8rem;">
                    <div class="card-body carteMiniBody">
                        <h5 class="card-title carteMiniTitre">${name}</h5>
                        <p class="card-text carteMiniContenu"><strong>${reaction}</strong></p>
                    </div>
                </div>`
    allmessages += template
    console.log("bonjur")

}

async function refreshPage(){

    getMessages(token)

}




getMessages(token)