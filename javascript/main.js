const newMessage= document.querySelector('#message')
const boutonEnvoyer = document.querySelector('.envoi')
const requetePost = new XMLHttpRequest();
const signUpButton = document.querySelector('.signUp')
const chatButton = document.querySelector('.chat')
bodyPage = document.querySelector('body')
fil= document.querySelector('.filAccueil')


let baseUrl= 'https://139.162.156.85:8000'
let token='eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2Njg3Njk4MjIsImV4cCI6MTY2ODc3MzQyMiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiVGhpYmF1dCJ9.jOWiIbunE1lOmR7wH-EjBEIYhnw-WIRe7TH6EV1DeqCkPYkqfubAX8nMYhUyo6oLvW5cK-GkAx-GxgdmIac_RyjWkCD8gtlim3aD_TNJqyV0L2bjd0ouWqnM7L_FhcsWZSiTLslhc5gJyCRg8zR8Yrw223PRCFJomQbaPMltII14gialQkexgtIMmRHYUF748i6ednnq6sPUkuk3yXuaKjF04r2YFdBSWdEXFfIlLV52DO_9Jwhi4zFl5WC92SqU5cwp8KX1OWjx0RkuYUtyhyU-V9bUSDNq7olllzqiP1iWTKQa6sA9CLgYzn2DUDZMcpWe2cT8fbSWm5FhN4s9NA'
let usedtoken=""
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
        Create an account
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


                    const alreadyAccount=document.querySelector('.connexion')
                    const createUsername = document.querySelector('#usernameConnection')
                    const createPassword = document.querySelector('#passwordConnection')

                    modalExemple=`<div className="modal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Modal body text goes here.</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"
                                data-bs-dismiss="modal">Close
                        </button>
                        <button type="button" className="btn btn-primary">Save changes</button>
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
                                    usedtoken = responseDeserialise.token
                                    console.log(usedtoken)
                                    display(templateChat)
                                    refreshPage(200)

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

        modalExemple=`<div className="modal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Modal body text goes here.</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"
                                data-bs-dismiss="modal">Close
                        </button>
                        <button type="button" className="btn btn-primary">Save changes</button>
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
                            usedtoken = responseDeserialise.token
                            console.log(usedtoken)
                            display(templateChat)
                            refreshPage(200)

                        }
                    })
            })

        })

    })







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


getMessages(token)
console.log(usedtoken)
