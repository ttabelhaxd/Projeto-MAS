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
// ===================================

/* Verificar a existência da chabe 'utilizadores' no localstorage, caso não exista, criá-la com um valor 'null' */
localStorage.setItem("utilizadores", localStorage.getItem("utilizadores"))
// ===================================

/* Função que adiciona um novo utilizador */
function registFunc() {
    event.preventDefault();
    if (validateRegistar()) {

        var nome = $("#nome").val();
        var sobrenome = $("#Sobrenome").val();
        var email = $("#Email").val();
        var pass = $("#Password").val();
        var telemovel = $("#cellnum").val();
        var morada = $("#moradaRegisto").val();
        var distrito= $("#distritoRegisto").val();
        var cidade = $("#cidadeRegisto").val();
        var codigo = $("#codigoRegisto").val();
        var endereco = {
            morada: morada,
            distrito: distrito,
            cidade: cidade,
            codigo: codigo
        };
        
        var novoUtilizador = {
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            password: pass,
            telemovel: telemovel,
            endereco: endereco,
            compras: [],
            historicoCompras: []
        };

        
        
        var utilizadores = JSON.parse(localStorage.getItem("utilizadores")); 

        if (utilizadores != null) {
            utilizadores.push(novoUtilizador); // adiciona mais um utilizador  
        }
        else {
            localStorage.setItem("utilizadores", "[]");
            utilizadores = JSON.parse(localStorage.getItem("utilizadores")); // []
            utilizadores.push(novoUtilizador); // adiciona o primeiro utilizador a "utilizadores"
        }

        var dadosJson = JSON.stringify(utilizadores); // [{nome: Tomás, sobrenome: Fernandes, email: email@gmail.com, password: pass123, telemovel: 123456789}]
        localStorage.setItem("utilizadores", dadosJson); // utilizadores: [{nome: Tomás, sobrenome: Fernandes, email: email@gmail.com, password: pass123, telemovel: 123456789}]
    }
}
// ===================================



/* Função que verifica o login e guarda os dados do utilizadro que está a usar o site */
function loginFunc() {
    event.preventDefault()
    localStorage.setItem("utilizadorAtivo", "");
    var email = $("#emailLogin").val();
    var pass = $("#passwordLogin").val();
    var utilizadores = JSON.parse(localStorage.getItem("utilizadores")); // utilizadores == null, se for a primeira vez a usar o site

    if (utilizadores != null) {
        for (i = 0; i < utilizadores.length; i++) {
            if (email == utilizadores[i].email && pass == utilizadores[i].password) {
                localStorage.setItem("utilizadorAtivo", JSON.stringify(utilizadores[i])); // guarda os utilizador ativo numa key 'utilizadorAtivo' no localStorage
                window.location.href = "logedin.html";
                break;
            }
        }
        // alert('Email ou password errados.')
    }
    else {
        alert('Para fazer o login, precisa de fazer registo!');
    }
}
// ===================================


