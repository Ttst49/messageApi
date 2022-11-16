const newMessage= document.querySelector('#message')
const boutonEnvoyer = document.querySelector('.envoi')
const requetePost = new XMLHttpRequest();
const signUpButton = document.querySelector('.signUp')
const chatButton = document.querySelector('.chat')
bodyPage = document.querySelector('body')
fil= document.querySelector('.filAccueil')

let token="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2Njg2MTI1OTMsImV4cCI6MTY2ODYxNjE5Mywicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiVGhpYmF1dCJ9.XTdNrLWWHIMgDhVyw3cRCG0UwdeONBix7NRxnHXJ4JcdL23B4xSvWKmNlrnYnvijEV6ZNbBFsh_xBi6QOfmeewSGZzrZTGqu8h5H_i6kE9-2RSK1UCafkpc72SVUsT-yeGEyxUsaRGthH7FIFtlQ7Upca5NFqydfdJD7X2WHwYChx8cMZYNFNOCN0dgg6tY33ZhiSSXnH2gdWyG1vGMyRKn5KYl_2gqBsI1qdb53I3rFbLMn4pPGdvYPMMscc3CEwrq6iJzFdX3COcV4xAf2IxR8p7_MALrsP6ayTGoJgzNspXYysLgrYNe-iIIoFm7CQoL19zDqfEsD2yyPu_rJ0A"
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
            <form action="">
                    <label for="username">Username</label>
                    <input required type="text" id="username" placeholder="John Doe"> <br>
                    <label for="password">Password</label>
                    <input required type="password" id="password" minlength="6" placeholder="********">
                    <div class="bouton">
                        <button class="btn btn-primary inscription">S'inscrire</button>
                    </div>
             </form>
            </div>
            <div class="boutonConnect">
        </div>
    </div>
    
</div>
<button class="already btn btn-danger"> J'ai déja un compte</button>
</div>
    `



boutonEnvoyer.addEventListener("click",()=>{

    requetePost.open("POST", "https://192.168.12.246:8000/api/messages/new", true);
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
    const alreadyButton = document.querySelector('.already')
    const createUsername = document.querySelector('#username')
    const createPassword = document.querySelector('#password')



    inscriptionButton.addEventListener('click',()=>{
        console.log(createPassword.value)
        console.log(createUsername.value)

        fetch("https://139.162.156.85:8000/register"),{
            method: "POST",
            headers:{'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2Njg2MDg0MDEsImV4cCI6MTY2ODYxMjAwMSwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiVGhpYmF1dCJ9.NHEvShoeygHUp7txmrShNS4ACkd9t8YeWTA3oftL7RNaOKAhMiAsmo2SL7-GtlkGxDgzaWb2Yo_vK0Ty7nxGhNunAU4TiNTT6S6ZKVae6EROUA_YQzFgrSC8DlLjszOM0PqijklTSfCJHiHv_8zWFr5OcKIc0D5gmekMoM_BarJ-_hTKb1FA_JgXRQp1Ys9fU071_thfHzFBuQUY8a8VCaKI3TrVLIJIViJq9zoLsYL_94vUMc3yqGrN1Nrx2DUYhlRDyFHEBjJ0pMcbTrNFchOhNMMFTcu581tDsAoAy8KIYXszGZ-bHwW5daJvHeX5kSKMeiQQdBuzgbkppeG4wQ'},
            body: `{
    "username":"${createUsername.value}",
    "password":"${createPassword.value}"
}`
        }

        alert(`Merci de vous être inscrit ${createUsername.value}`)
        display(templateChat)
        refreshPage(200)

    })
    alreadyButton.addEventListener('click',()=>{
        display(templateChat)
        refreshPage(200)

    })
    chatButton.addEventListener('click',()=>{
        display(templateChat)
    })


})


function display(content){
    clearBodyPage()

    bodyPage.innerHTML=content
}

function getMessages(){
    fetch("https://192.168.12.246:8000/api/messages",{
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
