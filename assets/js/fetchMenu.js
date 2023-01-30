var list_menu = []
var showed = 3

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
    callback(list_menu);    
  }).catch(err => alert(err));
}

function renderMenu(list_menu){
  html = ``;
  for (let index = 0; index < list_menu.length; index++) {
    const menu = list_menu[index];
    let cls = ''
    if(index+1 > showed){
      cls = 'hide'
    }
    html += `
    <div class="md:col-span-4 menu-wrapper ${cls}" id="menu-container-${index}">
      <div class="mx-auto menu-container px-8 pt-28 pb-6 w-64 md:w-auto lg:w-64 h-auto rounded-2xl shadow-lg">
        <img src="./assets/img/menu/${menu.image}.png" class="mx-auto menu-img" alt="">
        <div class="text-center">
          <h1 class="whitespace-nowrap">
            ${menu.nama}
          </h1>
          <p>
            ${menu.kategori}
          </p>
          <div class="flex justify-between items-center">
            <div></div>
            <div class="text-center price">
              Rp.${menu.harga}
            </div>
            <div class="text-right">
              <button class="menu-button text-center md:w-6 md:h-6 w-8 h-8 rounded-full text-white">
                <i class="ri-shopping-bag-line"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
  }
  $('#list-menu').html(html)
}

function showMenu(list_menu) {
  for (let index = 0; index < list_menu.length; index++) {
    const menu = list_menu[index];
    if(index < showed){
      $(`#menu-container-${index}`).removeClass('hide');
    }else{
      $(`#menu-container-${index}`).addClass('hide');
    }
  }
}

$(()=>{ 
  fetchMenu(renderMenu);

  $('.showmore').on('click', function(){
    showed += 3
    showMenu(list_menu);
    if(showed >= list_menu.length){
      $('.showmore').addClass('hidden');
      $('.showless').removeClass('hidden');
    }
  });
  $('.showless').on('click', function(){
    showed = 3
    showMenu(list_menu);
    $('.showmore').removeClass('hidden');
    $('.showless').addClass('hidden');
    $('a[href^="#popular"]').trigger('click');
  });


})