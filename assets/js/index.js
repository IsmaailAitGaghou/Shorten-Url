const navToggle = document.querySelector('.nav__toggle'),
      navMenu = document.querySelector('.nav__menu'),
      navLink = document.querySelectorAll('.nav__link'),
      navBtn = document.querySelectorAll('.nav__btn');

const inputForm = document.querySelector('.shorten__input');
const form = document.querySelector('.form__shorten');
const btn = document.querySelector('.shorten__btn');
const valid = document.querySelector('.validation');
const copyBtn = document.querySelector('.copy__btn')


const toggleMenu = () => {
    navMenu.classList.toggle('show__menu')
}

const removeMenu = () => {
    navMenu.classList.remove('show__menu');
}

navToggle.addEventListener('click', toggleMenu)

navLink.forEach( (link) => {
    link.addEventListener('click', removeMenu)
})

navBtn.forEach( (btn) => {
    btn.addEventListener('click', removeMenu)
})

btn.addEventListener('click', () => {
    // e.preventDefault();

    if(inputForm.value === '') {
            inputForm.classList.add('show__error');
            valid.innerHTML = `Please enter a valid url`;
    } else {
        
        shortLink()
        valid.innerHTML = ``;
        inputForm.value = ''
    }
})

const shortLink = async () => { 

    const res = await fetch('https://api.shrtco.de/v2/shorten?url='+inputForm.value)
    const data = await res.json()

    localStorage.setItem(data.result.code , JSON.stringify(data))
    
    const Links = JSON.parse( localStorage.getItem(data.result.code))
    if(!Links.ok) {
        inputForm.classList.add('show__error');
        valid.innerHTML = 'The link you entered is a disallowed link'
    } else{
        
        console.log(Links)


        const boxShortenedLink = document.createElement("div")
        boxShortenedLink.setAttribute('class','shortened__link')
        const LinkToShort = document.createElement("div")
        LinkToShort.setAttribute('class', 'link__to__short')
        boxShortenedLink.appendChild(LinkToShort);
        const paragraph = document.createElement("p");
        const originalLink = document.createTextNode(Links.result.original_link);
        paragraph.appendChild(originalLink)
        LinkToShort.appendChild(paragraph)
    
        const Line = document.createElement("hr")
        boxShortenedLink.appendChild(Line)
        const shortened = document.createElement("div")
        shortened.setAttribute('class', 'shortened')
        boxShortenedLink.appendChild(shortened)
    
        const paragraph2 = document.createElement("p")
        const shortLink = document.createTextNode(Links.result.short_link3)
        paragraph2.appendChild(shortLink)
        shortened.appendChild(paragraph2)
    
        const button = document.createElement("div")
        button.setAttribute('class', 'button__copy')
        boxShortenedLink.appendChild(button);
        const ankorLink = document.createElement("a")
        ankorLink.setAttribute('class', 'btn copy__btn')
        // ankorLink.setAttribute('href', '#')
        const copy = document.createTextNode('Copy')
        ankorLink.appendChild(copy)
        button.appendChild(ankorLink)
        form.insertAdjacentElement('afterend', boxShortenedLink)
    }
}


// ScrollReveal


const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    reset: true, // Animations repeat
})
sr.reveal(` .hero , .header__details`);
sr.reveal(` .shorten`, {origin: 'bottom'})
sr.reveal(` .about_data`, {origin: 'left'})
