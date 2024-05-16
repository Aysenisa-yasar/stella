// HTML'deki elementleri seçme
const searchForm = document.querySelector(".search-form");
const cartItem = document.querySelector(".cart-items-container");
const navbar = document.querySelector(".navbar");
const searchBtn = document.querySelector("#search-btn");
const cartBtn = document.querySelector("#cart-btn");
const menuBtn = document.querySelector("#menu-btn");
const cartButton = document.getElementById('cart-btn');
const modal = document.getElementById('cart-modal');
const closeButton = document.getElementsByClassName('close')[0];
const addToCartButtons = document.querySelectorAll('.btn');
const cartCount = document.getElementById('cart-item-count');
const cartList = document.getElementById('cart-items-list');

// Arama düğmesine tıklama olayı
searchBtn.addEventListener("click", function() {
    searchForm.classList.toggle("active");
    document.addEventListener("click", function(e) {
        if (!e.composedPath().includes(searchForm) && !e.composedPath().includes(searchBtn)) {
            searchForm.classList.remove("active");
        }
    });
});

// Menu button click event
menuBtn.addEventListener('click', function() {
    navbar.classList.toggle('active');
});

// Click event for document to remove active class if clicked outside navbar
document.addEventListener('click', function(event) {
    const isClickInsideNavbar = navbar.contains(event.target);
    const isClickInsideMenuBtn = menuBtn.contains(event.target);
    if (!isClickInsideNavbar && !isClickInsideMenuBtn) {
        navbar.classList.remove('active');
    }
});


//jquery fonkum index.html de **************************************************************************ÖNEMLİ ÖNEMLİİİ***

// Sepet düğmesine tıklama olayı
cartBtn.addEventListener("click", function() {
    cartItem.classList.toggle("active");
    document.addEventListener("click", function(e) {
        if (!e.composedPath().includes(cartItem) && !e.composedPath().includes(cartBtn)) {
            cartItem.classList.remove("active");
        }
    });
});

// Sepet öğe sayısını tutacak değişken
let cartItemCount = 0;

// Sepet düğmesine tıklama olayı
cartButton.addEventListener('click', function() {
    modal.style.display = 'block';
});

// Modalı kapatma olayı
closeButton.onclick = function() {
    modal.style.display = 'none';
}

// Modal dışına tıklama olayı
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Sepet öğelerini depolamak için bir fonksiyon
function storeCartItems(cartItems) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Sepet öğelerini almak için bir fonksiyon
function getCartItems() {
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
}

// Sepeti gösterme fonksiyonu
function showCart() {
    const cartItems = getCartItems();
    cartCount.textContent = cartItems.length; // Sepetteki öğe sayısını güncelle
    cartList.innerHTML = ''; // Önceki içeriği temizle
    cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        cartList.appendChild(listItem);
    });
}

// Ürün ekleme düğmeleri için tıklama olayı
addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const itemName = this.parentElement.parentElement.querySelector('h3').innerText;
        addToCart(itemName);
        updateCartCount(); // Sepet öğe sayacını güncelle
        updateLocalStorage(); // Yerel depolamadaki sepet durumunu güncelle
        addRemoveIcons(); // Çarpı işaretlerini tekrar ekle
    });
});

function addToCart(item) {
    // Sepete eklenen ürünleri gösteren liste
    const cartItemsList = document.getElementById('cart-items-list');
    // Yeni bir liste öğesi oluştur
    const listItem = document.createElement('li');
    // Öğenin içeriğini belirle
    listItem.textContent = item;


    // Çarpı ikonunu oluştur ve ekleyerek her bir öğenin yanına yerleştir
    const removeIcon = document.createElement('span');
    removeIcon.className = 'remove-item';
    removeIcon.innerHTML = '&#10006;'; // Çarpı ikonu
    removeIcon.onclick = function(event) {
        removeItem(event, listItem); // Bu öğeyi sepetten kaldır
    };
    listItem.appendChild(removeIcon);


  // Öğeyi sepet listesine ekle
  cartItemsList.appendChild(listItem);

  // Sepet öğe sayısını güncelle
  updateCartCount();
}
// Sepetten öğe kaldırmak için fonksiyon
function removeItem(event, element) {
    // Öğenin bulunduğu listeyi bul
    var listItem = element;
    // Öğeyi listeden kaldır
    listItem.remove();
    // Sepet öğe sayısını azalt
    updateCartCount();
    // Sepet öğelerini güncelle
    updateLocalStorage(); // Yerel depolamadaki sepet durumunu güncelle

    // Modalın kapanmasını engelle
    event.stopPropagation();
}

// Sepet öğe sayısını güncelleyen fonksiyon
function updateCartCount() {
    const cartItems = document.querySelectorAll('#cart-items-list li');
    const cartCount = document.getElementById('cart-item-count');
    cartCount.textContent = cartItems.length;
}

// Sepet öğelerini yerel depolamada güncelleyen fonksiyon
function updateLocalStorage() {
    const cartItems = [];
    document.querySelectorAll('#cart-items-list li').forEach(item => {
        cartItems.push(item.textContent);
    });
    storeCartItems(cartItems);
}

//sayfa yüklendiğinde sepeti ve çarpı işaretini göster
document.addEventListener("DOMContentLoaded", function() {
    showCart();
    addRemoveIcons();
});

// Sayfa yüklendiğinde veya ürün eklediğinizde çarpı işaretlerini ekleyen fonksiyon
function addRemoveIcons() {
    const removeIcons = document.querySelectorAll('.remove-item');
    removeIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            removeItem(this.parentElement); // Bu öğeyi sepetten kaldır
        });
    });
}
// Sepeti boşalt butonunu seçin
const clearCartBtn = document.getElementById('clear-cart-btn');

// Sepeti boşalt butonuna tıklama olayını ekle
clearCartBtn.addEventListener('click', function() {
    // Sepetteki tüm öğeleri kaldır
    clearCart();
});
// Sepeti boşaltan işlev
function clearCart() {
    // Sepet listesini temizle
    cartList.innerHTML = '';
    // Sepet öğe sayacını sıfırla
    cartCount.textContent = '0';
    // Yerel depolamadaki sepet durumunu güncelle
    updateLocalStorage();
}

// Yerel depolamadaki sepeti temizleyen fonksiyon
function clearLocalStorage() {
    localStorage.removeItem('cartItems');
}





/*jquery */

$(document).ready(function () {
    // Sepet öğe sayacını başlangıçta 0 olarak ayarla
    var cartItemCount = 0;

    // "+" simgesine tıklandığında
    $(".fa-plus").click(function () {
        // Ürün adını ve fiyatını al
        var itemName = $(this).closest(".box").find(".name").text();
        var itemPrice = $(this).closest(".box").find(".price").text();

        // Yeni bir liste öğesi oluştur
        var listItem = "<li class='cart-item'>" +
            "<span class='cart-item-name'>" + itemName + "</span>" +
            "<span class='cart-item-price'>" + itemPrice + "</span>" +
            "<span class='cart-item-remove'>&times;</span>" +
            "</li>";

        // Liste öğesini sepet listesine ekle
        $("#cart-items-list").append(listItem);

        // Sepet öğe sayısını 1 arttır
        cartItemCount++;
        $("#cart-item-count").text(cartItemCount);

        // Ürün sepete eklendi mesajını göster
        $("#cart-message").text(itemName + " sepetinize eklendi.").fadeIn(1000).delay(2000).fadeOut(1000);
    });

    // Sepet öğesini kaldırmak için çarpı simgesine tıklandığında
    $(document).on("click", ".cart-item-remove", function () {
        $(this).closest(".cart-item").remove(); // Ürünü listeden sil

        // Sepet öğe sayısını 1 azalt
        cartItemCount--;
        $("#cart-item-count").text(cartItemCount);
    });
});

$(document).ready(function() {
    // İletişim formundaki her bir giriş alanı değiştiğinde
    $('form input, form textarea').on('input', function() {
        // Değişiklik olunca "Bilgi verme" fonksiyonunu çağır
        informUser();
    });

    // Bilgi verme fonksiyonu
    function informUser() {
        // İletişim formundaki giriş değerlerini al
        var name = $('input[name="name"]').val();
        var email = $('input[name="email"]').val();
        var message = $('textarea[name="message"]').val();

        // Eğer herhangi bir giriş alanı boşsa veya mesaj 10 karakterden azsa
        if (name === '' || email === '' || message === '' || message.length < 10) {
            // Bilgi kutusu ile kullanıcıya uyarı ver
            $('#notification').text('Lütfen tüm alanları doldurun ve mesajınızı en az 10 karakter girin.').fadeIn(500);
        } else {
            // Değilse, bilgi kutusunu gizle
            $('#notification').fadeOut(500);
        }
    }
});





$(document).ready(function () {
    // Contact Now butonuna tıklandığında
    $("input[type='submit']").click(function (event) {
        // Sayfanın yeniden yüklenmesini engelle
        event.preventDefault();

        // Bilgi vermek için bir modal oluştur
        var modalContent = "<div style='text-align: center;'>we will get back to you!</div>";
        modalContent += "<div style='text-align: center;'><button class='btn' id='close-modal'>Close</button></div>";
        $("#notification").html(modalContent);
        $("#notification").fadeIn();

        // Modalı kapatmak için Close butonuna tıklanınca
        $("#close-modal").click(function () {
            $("#notification").fadeOut();
        });
    });


    $("#next-content-btn").click(function (event) {
        var a = $("#next-content");
        a.text("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam earum ab enim necessitatibus quaerat? Amet voluptas vitae nihil ipsam alias asperiores, soluta corrupti nobis delectus ad qui assumenda itaque distinctio hic provident illum quae? Veritatis distinctio corporis cum dolorum, temporibus dignissimos esse repellendus eum pariatur sequi nam sapiente ducimus nisi necessitatibus est vel, doloribus odit placeat quae rem laudantium repudiandae quis iusto natus! Voluptatem veritatis similique molestiae doloremque aut exercitationem qui repudiandae, odio quaerat consequatur, quibusdam obcaecati, neque laborum nulla voluptas nihil. Architecto dignissimos culpa nam quos, nemo corrupti placeat ad eum at similique necessitatibus omnis illo, temporibus expedita dolorum.");
        $("#next-content-btn").remove();
    });
});
document.addEventListener("DOMContentLoaded", function() {
    var learnMoreLink = document.getElementById("learn-more");
    var notification = document.getElementById("notification");
    var closeModalButton = document.getElementById("close-modal");

    learnMoreLink.addEventListener("click", function(event) {
        event.preventDefault();
        notification.style.display = "block";
    });

    closeModalButton.addEventListener("click", function() {
        notification.style.display = "none";
    });
});


// Bildirim Modalını Açma Fonksiyonu
function openNotification() {
    $("#notification").css("display", "block");
}

// Bildirim Modalını Kapatma Fonksiyonu
function closeNotification() {
    $("#notification").css("display", "none");
}

// Kullanıcıyı Bilgilendirme Fonksiyonu
function informUser() {
    var nameInput = $('input[name="name"]');
    var emailInput = $('input[name="email"]');
    var messageInput = $('textarea[name="message"]');
    var notification = $("#notification");

    if (nameInput.val() === "" || emailInput.val() === "" || messageInput.val() === "" || messageInput.val().length < 10) {
        notification.text("Lütfen tüm alanları doldurun ve en az 10 karakterlik bir mesaj girin.");
        openNotification();
    } else {
        closeNotification();
    }
}
// Sepet İçeriğini Kaydetme Fonksiyonu
function saveCartContent() {
    var cartItems = document.getElementById("cart-items-list").innerHTML;
    localStorage.setItem("cartItems", cartItems);
}

// Sepet İçeriğini Yükleme Fonksiyonu
function loadCartContent() {
    var cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
        document.getElementById("cart-items-list").innerHTML = cartItems;
        var itemCount = document.querySelectorAll(".cart-item").length;
        document.getElementById("cart-item-count").textContent = itemCount;
    }
}

// Sepet İçeriğini Temizleme ve Kapatma Fonksiyonu
function clearAndCloseCart() {
    clearCart();
    closeCartModal();
}

$(document).ready(function () {
    // Contact Now butonuna tıklandığında
    $("input[type='submit']").click(function (event) {
        // Sayfanın yeniden yüklenmesini engelle
        event.preventDefault();

        // Bilgi vermek için bir modal oluştur
        var modalContent = "<div style='text-align: center;'>Size en kısa sürede geri döneceğiz!</div>";
        modalContent += "<div style='text-align: center;'><button class='btn' id='close-modal'>Kapat</button></div>";
        $("#notification").html(modalContent);
        $("#notification").fadeIn();

        // Modalı kapatmak için Kapat butonuna tıklanınca
        $("#close-modal").click(function () {
            $("#notification").fadeOut();
        });
    });
});
$(document).ready(function() {
    $('#sortable').sortable();
    $('#sortable').disableSelection();
});
$(document).ready(function() {
    $('.change-color').dblclick(function() {
        $(this).css('background-color', '#f0f0f0');
    });
});
$(document).ready(function() {
    $('#fetch-data-btn').click(function() {
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/posts',
            method: 'GET',
            success: function(data) {
                var content = '';
                data.forEach(function(post) {
                    content += '<div class="post">';
                    content += '<h3>' + post.title + '</h3>';
                    content += '<p>' + post.body + '</p>';
                    content += '</div>';
                });
                $('#posts-container').html(content);
            },
            error: function() {
                $('#posts-container').html('<p>Veri alınamadı.</p>');
            }
        });
    });
});
$(document).ready(function() {
    $('.slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
    });
});
$(document).ready(function() {
    $('form input, form textarea').on('input', function() {
        informUser();
    });

    function informUser() {
        var name = $('input[name="name"]').val();
        var email = $('input[name="email"]').val();
        var message = $('textarea[name="message"]').val();

        if (name === '' || email === '' || message === '' || message.length < 10) {
            $('#notification').text('Lütfen tüm alanları doldurun ve mesajınızı en az 10 karakter girin.').fadeIn(500);
        } else {
            $('#notification').fadeOut(500);
        }
    }
});
$(document).ready(function() {
    // Scroll to top button
    var scrollToTopBtn = $('<button id="scrollToTopBtn" class="btn">Top</button>');
    $('body').append(scrollToTopBtn);

    $(window).scroll(function() {
        if ($(window).scrollTop() > 300) {
            $('#scrollToTopBtn').fadeIn();
        } else {
            $('#scrollToTopBtn').fadeOut();
        }
    });

    $('#scrollToTopBtn').click(function() {
        $('html, body').animate({scrollTop: 0}, '300');
    });
});
