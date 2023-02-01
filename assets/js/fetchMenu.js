var list_menu = []
var list_kategori = []
var showed = 1
function fetchKategoriMenu(callback = () => {}){
  let link = 'https://api.jsonbin.io/v3/b/63d94231c0e7653a056a8148'
  let config = {
    headers: {
      'X-ACCESS-KEY': '$2b$10$5664BCwJ4Pg3zvteFB77kukM7adM7HGdiWbKqW5kZr6WRVCdnRs1.',
    }
  }
  axios.get(link, config)
  .then(res => res.data)
  .then(res => res.record)
  .then(res => {
    list_kategori = res.data;
    callback(list_kategori);    
  }).catch(err => alert(err));
}
function fetchMenu(callback = () => {}) {
  let link = 'https://api.jsonbin.io/v3/b/63d69a91ace6f33a22cc5ba0'
  let config = {
    headers: {
      'X-ACCESS-KEY': '$2b$10$5664BCwJ4Pg3zvteFB77kukM7adM7HGdiWbKqW5kZr6WRVCdnRs1.',
    }
  }
  axios.get(link, config)
  .then(res => res.data)
  .then(res => res.record)
  .then(res => {
    list_menu = res.data;
    callback(list_menu, fetchKategoriMenu(multiCarousel));    
  }).catch(err => alert(err));
}
function slug(string) {
  var a = string;

  var b = a.toLowerCase().replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');

  return b
}
function multiCarousel(list_kategori){
  for (let index = 0; index < list_kategori.length; index++) {
    const kategori = list_kategori[index];
    // multi carousel script
    let items = document.querySelectorAll(`#${slug(kategori.nama)}-carousel .carousel-item`)

    items.forEach((el) => {
      const minPerSlide = 3
      let next = el.nextElementSibling
      for (var i=1; i<minPerSlide; i++) {
        if (!next) {
            // wrap carousel by using first child
          next = items[0]
        }
        let cloneChild = next.cloneNode(true)
        el.appendChild(cloneChild.children[0])
        next = next.nextElementSibling
      }
    })
  }
  // for (let index = 0; index < list_menu.length; index++) {
  //   const menu = list_menu[index];
  //   $(`#${slug(menu.nama)}-${index}-button`).on('click', function(){
  //     $(`#${slug(menu.nama)}-${index}-link`)[0].click();
  //   });
  // }
}
function renderMenu(list_menu, callback = () => {}){
  html = ``;
  last_kategori = '';
  active = false;
  $('#list-menu').append(`<a href="#" id="menu-gofood-link" class="hidden" target="__blank" rel="noopener noreferrer"></a>`);
  for (let index = 0; index < list_menu.length; index++) {
    const menu = list_menu[index];
    let cls = ''
    if(index+1 > showed){
      cls = 'hide'
    }
    if(slug(menu.kategori) != slug(last_kategori)){
      active = true
      // console.log(`${slug(menu.kategori)} ${slug(last_kategori)} Tidak Sama!`)
      last_kategori = menu.kategori;
      carousel = `
      <div class="menu-wrapper ${cls} my-10" id="${slug(menu.kategori)}">
        <div class="block subtitle text-center mb-10">
          ${menu.kategori}
        </div>
        <div id="${slug(menu.kategori)}-carousel" class="carousel slide"  data-bs-ride="carousel" data-bs-interval="false" data-ride="carousel" data-pause="hover">
          <div class="carousel-inner" id="${slug(menu.kategori)}-inner">
          </div>
          <a class="carousel-control-prev bg-transparent w-aut" href="#${slug(menu.kategori)}-carousel" role="button" data-bs-slide="prev">
            <i class="ri-arrow-left-s-line"></i>
          </a>
          <a class="carousel-control-next bg-transparent w-aut" href="#${slug(menu.kategori)}-carousel" role="button" data-bs-slide="next">
            <i class="ri-arrow-right-s-line"></i>
          </a>
        </div>
      </div>
      `;
      html = ``;
      $('#list-menu').append(carousel)
    }
    // console.log(`${slug(menu.kategori)} ${slug(last_kategori)}`)
    if(slug(menu.kategori) == slug(last_kategori)){
      // console.log(`${slug(menu.kategori)} ${slug(last_kategori)} Sama!`)
      html = `
      <div class="carousel-item ${active ? 'active' : ''}">
        <div class="w-full flex justify-center align-center">
          <div class="menu-container px-8 pt-28 pb-6 w-64 md:w-auto lg:w-64 h-auto rounded-2xl shadow-lg">
            <img src="assets\\img\\menu\\${menu.image}.png" class="mx-auto menu-img" alt="">
            <div class="text-center">
              <h3 class="whitespace-nowrap">
                ${menu.nama}
              </h3>
              <p>
                ${menu.kategori}
              </p>
              <div class="flex justify-between items-center">
                <div></div>
                <div class="text-center price">
                  Rp.${menu.harga}
                </div>
                <div class="text-right">
                  <button onclick="gofood('${menu.link}')" class="menu-button text-center md:w-6 md:h-6 w-8 h-8 rounded-full text-white">
                    <i class="ri-shopping-bag-line"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
      $(`#${slug(menu.kategori)}-inner`).append(html);
      active = false;
    }
  }
  // $('#list-menu').html(html)
}

function showMenu(list_kategori) {
  for (let index = 0; index < list_kategori.length; index++) {
    const kategori = list_kategori[index];
    if(index < showed){
      $(`#${slug(kategori.nama)}`).removeClass('hide');
    }else{
      $(`#${slug(kategori.nama)}`).addClass('hide');
    }
  }
}

function gofood(link){
  $('#menu-gofood-link').attr('href', link);
  $('#menu-gofood-link')[0].click();
}

$(()=>{ 
  fetchMenu(renderMenu);
  $('.showmore').on('click', function(){
    showed += 2
    showMenu(list_kategori);
    if(showed >= list_kategori.length){
      $('.showmore').addClass('hidden');
      $('.showless').removeClass('hidden');
    }
  });
  $('.showless').on('click', function(){
    // showed = 1
    // showMenu(list_kategori);
    // $('.showmore').removeClass('hidden');
    // $('.showless').addClass('hidden');
    $('#all-menus')[0].click();
  });


})