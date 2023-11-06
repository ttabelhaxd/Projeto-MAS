$('document').ready(function () {
    const carousel = new bootstrap.Carousel('#myCarousel', {
        interval: 5000
    });
})

let modalPrecoTotal = document.getElementById('total');
let inputPrecoTotal = document.getElementById('total1');
let inputQtdTotal = document.getElementById("quantidades");
let precoTotal = 0;
let qtdTotal = 0;

var nome = JSON.parse(localStorage.getItem("utilizadorAtivo")).nome;
var sobrenome = JSON.parse(localStorage.getItem("utilizadorAtivo")).sobrenome;
var email = JSON.parse(localStorage.getItem("utilizadorAtivo")).email;
var password = JSON.parse(localStorage.getItem("utilizadorAtivo")).password;
var telemovel = JSON.parse(localStorage.getItem("utilizadorAtivo")).telemove
var compras = JSON.parse(localStorage.getItem("utilizadorAtivo")).compras;

var morada = JSON.parse(localStorage.getItem("utilizadorAtivo")).endereco.morada;
var distrito = JSON.parse(localStorage.getItem("utilizadorAtivo")).endereco.distrito;
var cidade = JSON.parse(localStorage.getItem("utilizadorAtivo")).endereco.cidade;
var codigo = JSON.parse(localStorage.getItem("utilizadorAtivo")).endereco.codigo;
var historicoCompras = JSON.parse(localStorage.getItem("utilizadorAtivo")).historicoCompras;

function addProduct(number) {
    let quantidadeProdutoSelecionado = document.getElementById("qty" + number);
    quantidadeProdutoSelecionado.value++;
    calculate();
}

function calculate() {
    let precAtual, qtdAtual;
    precoTotal = 0;
    qtdTotal = 0;

    for (let i = 1; i <= 6; i++) {
        precAtual = parseFloat(document.getElementById('price' + i).value);
        qtdAtual = parseFloat(document.getElementById('qty' + i).value);
        precoTotal += precAtual * qtdAtual;
        qtdTotal += qtdAtual;
    }
    
    inputQtdTotal.innerText = qtdTotal;
    inputPrecoTotal.innerText = precoTotal.toFixed(2);
    modalPrecoTotal.innerText = precoTotal.toFixed(2);
}


// localStorage Cart
function addCart(number) {
    var newproduct = document.getElementById('price' + number).value;
    var newname= document.getElementById('price' + number).name; 
    
    var utilizadorAtual = JSON.parse(localStorage.getItem("utilizadorAtivo"))


    var dups = false;

    for(var i = 0; i < utilizadorAtual.compras.length; i++){
        if(utilizadorAtual.compras[i].name === newname) {
            utilizadorAtual.compras[i].quantity++;
            dups = true;
            break;
        }
    }
    if(!dups) {
        utilizadorAtual.compras.push({name: newname, price: newproduct, quantity: 1})
    }
    
    console.log(utilizadorAtual)
    
    document.getElementById('products').innerHTML += '<div class="mb-1 mx-2 row">' +
    '<div class="col-6"><span>' + newname  + '</span></div>' + '<div class="col-6 text-end"><span>' + newproduct + '€</span></div>';

    localStorage.setItem("utilizadorAtivo", JSON.stringify(utilizadorAtual));

    var current_products = document.querySelectorAll(".eu");

    for (var i = 0; i < current_products.length; i++) {
        current_products[i].onclick = function () {
            this.parentNode.remove();
        }
    }
}
// ===============================================

function valid() { // ao clicar em 'comprar' ou 'finalizar compra'
    if (precoTotal <= 0 && qtdTotal <= 0) {
        alert("Erro o carrinho está vazio");
    } else {
        // aqui, estava a pensar em 'isolar' a compra que acabei de fazer, para que depois, ao regressar do pagamento da primeira, poder começar uma nova compra
        window.location.href = "pagamento.html";
    }
}



function clean() {
    for (let i = 1; i <= 3; i++) {
        qtdAtual = document.getElementById("qty" + i).value = 0; 
    }
    precoTotal = 0;
    qtdTotal = 0;
    modalPrecoTotal.innerText = "0.00"
    inputPrecoTotal.innerText = "0.00"
    inputQtdTotal.innerText = 0
    document.getElementById('products').innerHTML = ''
    var alterado = {
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        password: password,
        telemovel: telemovel,
        endereco: {
            morada: morada,
            distrito: distrito,
            cidade: cidade,
            codigo: codigo
        },
        compras: [],
        historicoCompras: historicoCompras,

    }
    localStorage.setItem("utilizadorAtivo", JSON.stringify(alterado))
    
}



// validação de formulários
function validateRegistar() {
    var retVal = true;
    if ($('#nome').val().trim().length < 3) {
        retVal = false;
        $('#nameError').show();
    } else {
        $('#nameError').hide();
    }
    if ($('#Sobrenome').val().trim().length < 3) {
        retVal = false;
        $('#snameError').show();
    } else {
        $('#snameError').hide();
    }
    if ($('#cellnum').val().trim().length < 9) {
        retVal = false;
        $('#numError').show();
    } else {
        $('#numError').hide();
    }
    var re = /\S+@\S+\.\S+/;
    var email = $('#Email').val().trim()
    if (!re.test(email)) {
        $('#EmailError').show();
        retVal = false;
    }
    else $('#EmailError').hide();

    if ($('#Password').val().trim().length < 8) {
        retVal = false;
        $('#PasswordError').show();
    } else {
        $('#PasswordError').hide();
    }

    if ($('#repeatPsw').val().trim() != $('#Password').val()) {
        retVal = false;
        $('#repeatPasswordError').show();
    } else {
        $('#repeatPasswordError').hide();
    }

    if ($("#moradaRegisto").val().trim().length < 4) {
        retVal = false;
        $('#moradaRegistoError').show();
    } else {
        $('#moradaRegistoError').hide();
    }
    if ($("#distritoRegisto").val().trim().length < 2) {
        retVal = false;
        $('#distritoRegistoError').show();
    } else {
        $('#distritoRegistoError').hide();
    }
    if ($("#cidadeRegisto").val().trim().length < 2) {
        retVal = false;
        $('#cidadeRegistoError').show();
    } else {
        $('#cidadeRegistoError').hide();
    }
    if ($("#codigoRegisto").val().trim().length < 3) {
        retVal = false;
        $('#codigoRegistoError').show();
    } else {
        $('#codigoRegistoError').hide();
    }

    return retVal;
}

function verSeDaRegistar() {
    if (validateRegistar()) {
        return document.getElementById('id02').style.display='none', document.getElementById('id04').style.display='block'
    }
}

/* ---------------------------------------- */

function validateLogin() {
    var retVal = true;
    var re = /\S+@\S+\.\S+/;
    var email = $('#emailLogin').val().trim()
    if (!re.test(email)) {
        $('#loginEmailError').show();
        retVal = false;
    } else { 
        $('#loginEmailError').hide();
    }
    
    if ($('#passwordLogin').val().trim().length < 8) {
        retVal = false;
        $('#loginPasswordError').show();
    } else {
        $('#loginPasswordError').hide();
    }
    return retVal;
    
}

function verSeDaLogin() {
    if (validateLogin()) {
        $("#goToLogedIn").attr('href', 'logedin.html');
    }
}

// ===============================================================


// searchbar 
function search() {
    var pesquisa = $("#search").val().toLowerCase()
    switch (pesquisa) {
        case "coca-cola 4x1 lt":
            $("#cola").removeClass("d-none");
            $("#bombons").addClass("d-none");
            $("#bolo").addClass("d-none");
            $("#pao").addClass("d-none");
            $("#cenoura").addClass("d-none");
            $("#cebolas").addClass("d-none");
            break;
        case "bombons caja roja 400g":
            $("#bombons").removeClass("d-none");
            $("#cola").addClass("d-none");
            $("#bolo").addClass("d-none");
            $("#pao").addClass("d-none");
            $("#cenoura").addClass("d-none");
            $("#cebolas").addClass("d-none");
            break;
        case "bolo rei 1kg":
            $("#bolo").removeClass("d-none");
            $("#cola").addClass("d-none");
            $("#bombons").addClass("d-none");
            $("#pao").addClass("d-none");
            $("#cenoura").addClass("d-none");
            $("#cebolas").addClass("d-none");
            break;
        case "pão 150g":
            $("#pao").removeClass("d-none");
            $("#cola").addClass("d-none");
            $("#bolo").addClass("d-none");
            $("#bombons").addClass("d-none");
            $("#cenoura").addClass("d-none");
            $("#cebolas").addClass("d-none");
            break;
        case "cenoura 1kg":
            $("#cenoura").removeClass("d-none");
            $("#cola").addClass("d-none");
            $("#bolo").addClass("d-none");
            $("#pao").addClass("d-none");
            $("#bombons").addClass("d-none");
            $("#cebolas").addClass("d-none");
            break;
        case "cebolas 1kg":
            $("#cebolas").removeClass("d-none");
            $("#cola").addClass("d-none");
            $("#bolo").addClass("d-none");
            $("#pao").addClass("d-none");
            $("#cenoura").addClass("d-none");
            $("#bombons").addClass("d-none");
            break;
        default:
            $("#cebolas").removeClass("d-none");
            $("#cola").removeClass("d-none");
            $("#bolo").removeClass("d-none");
            $("#pao").removeClass("d-none");
            $("#cenoura").removeClass("d-none");
            $("#bombons").removeClass("d-none");
    }
}

// ==============================

