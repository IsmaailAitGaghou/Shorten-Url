const navToggle = document.querySelector(".nav__toggle"),
  navMenu = document.querySelector(".nav__menu"),
  navLink = document.querySelectorAll(".nav__link"),
  navBtn = document.querySelectorAll(".nav__btn");

const inputForm = document.querySelector(".shorten__input");
const form = document.querySelector(".form__shorten");
const btn = document.querySelector(".shorten__btn");
const valid = document.querySelector(".validation");
const copyBtn = document.querySelector(".copy__btn");

const toggleMenu = () => {
  navMenu.classList.toggle("show__menu");
};

const removeMenu = () => {
  navMenu.classList.remove("show__menu");
};

navToggle.addEventListener("click", toggleMenu);

navLink.forEach((link) => {
  link.addEventListener("click", removeMenu);
});

navBtn.forEach((btn) => {
  btn.addEventListener("click", removeMenu);
});

btn.addEventListener("click", () => {
  // e.preventDefault();

  if (inputForm.value === "") {
    inputForm.classList.add("show__error");
    valid.innerHTML = `Please enter a valid url`;
  } else {
    shortLink();
    valid.innerHTML = ``;
    inputForm.value = "";
  }
});

const shortLink = async () => {
  const res = await fetch(
    "https://api.shrtco.de/v2/shorten?url=" + inputForm.value
  );
  const data = await res.json();
  const originallink = data.result.original_link;
  const shortlink = data.result.short_link3;

  localStorage.setItem(data.result.code, {
    originallink,
  });

  const original = JSON.parse(localStorage.getItem(data.result.code));

  console.log(original);

  if (!data.ok) {
    inputForm.classList.add("show__error");
    valid.innerHTML = "The link you entered is a disallowed link";
  } else {
    // console.log(Links)
    const link__shrinked = document.querySelector(".link__shriked");
    link__shrinked.innerHTML += `
                <div class='shortened__link'>
                    <div class='link__to__short'>
                        <p> ${original[0]}</p>
                    </div>
                    <hr/>
                    <div class='shortened'>
                        <p>${original[1]}</p>
                    </div>
                    <div class='button__copy'>
                        <button class='btn copy__btn'> Copy </button>
                    </div>
                </div>
        `;
  }
};

// ScrollReveal

const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
  reset: true, // Animations repeat
});
sr.reveal(` .hero__container , .card`);
sr.reveal(` .form__shorten, .section__title, .section__subtitle`, {
  origin: "bottom",
});
sr.reveal(` .about_data`, { origin: "left" });
