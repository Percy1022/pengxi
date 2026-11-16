const CONTACT = {
  email: "",
  phone: ""
};

const categories = [
  ["cotton", "Cotton Embroidery"]
];

const products = [
  ["cotton","Cotton Embroidery 81","PX-CE00081","cotton-embroidery-px-ce00081.jpg"],
  ["cotton","Cotton Embroidery 82","PX-CE00082","cotton-embroidery-px-ce00082.jpg"],
  ["cotton","Cotton Embroidery 83","PX-CE00083","cotton-embroidery-px-ce00083.jpg"],
  ["cotton","Cotton Embroidery 84","PX-CE00084","cotton-embroidery-px-ce00084.jpg"],
  ["cotton","Cotton Embroidery 85","PX-CE00085","cotton-embroidery-px-ce00085.jpg"],
  ["cotton","Cotton Embroidery 86","PX-CE00086","cotton-embroidery-px-ce00086.jpg"],
  ["cotton","Cotton Embroidery 87","PX-CE00087","cotton-embroidery-px-ce00087.jpg"],
  ["cotton","Cotton Embroidery 88","PX-CE00088","cotton-embroidery-px-ce00088.jpg"],
  ["cotton","Cotton Embroidery 89","PX-CE00089","cotton-embroidery-px-ce00089.jpg"],
  ["cotton","Cotton Embroidery 90","PX-CE00090","cotton-embroidery-px-ce00090.jpg"]
];

const categoryName = key => categories.find(c => c[0] === key)?.[1] || key;
const filters = document.querySelector("#filters");
const grid = document.querySelector("#product-grid");
const count = document.querySelector("#result-count");
let active = "all";

function renderFilters(){
  filters.innerHTML = [["all","All Products"],...categories].map(([key,label]) => `<button class="filter ${key===active?'active':''}" data-filter="${key}">${label}</button>`).join("");
}
function renderProducts(){
  const visible = active === "all" ? products : products.filter(p => p[0] === active);
  grid.innerHTML = visible.map(([cat,name,code,file]) => `<article class="product-card" tabindex="0" data-code="${code}"><div class="image"><img loading="lazy" src="assets/products/${file}" alt="${name}, style ${code}"></div><div class="product-card-info"><div><h3>${name}</h3><p>${categoryName(cat)} · ${code}</p></div><span class="arrow">↗</span></div></article>`).join("");
  count.textContent = `${visible.length} style${visible.length===1?'':'s'} shown`;
}
filters.addEventListener("click",e=>{const btn=e.target.closest("button[data-filter]");if(!btn)return;active=btn.dataset.filter;renderFilters();renderProducts()});

const dialog = document.querySelector("#product-dialog");
function openProduct(code){
  const p = products.find(item=>item[2]===code); if(!p)return;
  document.querySelector("#dialog-image").src = `assets/products/${p[3]}`;
  document.querySelector("#dialog-image").alt = p[1];
  document.querySelector("#dialog-category").textContent = categoryName(p[0]);
  document.querySelector("#dialog-title").textContent = p[1];
  document.querySelector("#dialog-code").textContent = `Style ${p[2]}`;
  dialog.showModal();
}
grid.addEventListener("click",e=>{const card=e.target.closest(".product-card");if(card)openProduct(card.dataset.code)});
grid.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.matches(".product-card"))openProduct(e.target.dataset.code)});
document.querySelector(".dialog-close").addEventListener("click",()=>dialog.close());
document.querySelector(".dialog-inquire").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close()});

const menu = document.querySelector(".nav");
const menuButton = document.querySelector(".menu-toggle");
menuButton.addEventListener("click",()=>{const open=menu.classList.toggle("open");menuButton.setAttribute("aria-expanded",open)});
menu.addEventListener("click",()=>{menu.classList.remove("open");menuButton.setAttribute("aria-expanded","false")});

if(CONTACT.email){document.querySelector("[data-contact-email]").textContent=CONTACT.email;document.querySelector("[data-contact-email]").href=`mailto:${CONTACT.email}`}
if(CONTACT.phone)document.querySelector("[data-contact-phone]").textContent=CONTACT.phone;
document.querySelector("#inquiry-form").addEventListener("submit",e=>{
  e.preventDefault(); const data=new FormData(e.currentTarget);
  if(!CONTACT.email){document.querySelector("#form-note").textContent="Please add the company email in script.js before publishing.";return}
  const subject=encodeURIComponent(`Website inquiry: ${data.get("product")}`);
  const body=encodeURIComponent(`Name / Company: ${data.get("name")}\nEmail: ${data.get("email")}\nCountry: ${data.get("country")}\nProduct: ${data.get("product")}\n\n${data.get("message")}`);
  location.href=`mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
});
document.querySelector("#year").textContent=new Date().getFullYear();
renderFilters();renderProducts();
