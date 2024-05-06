//criando os objetos dos elementos de texto do form

var nome = document.querySelector("#inputName");
var nomeHelp = document.querySelector("#inputNameHelp");
var ano = document.querySelector("#inputYear");
var anoHelp = document.querySelector("#inputYearHelp");
var email = document.querySelector("#inputEmail");
var emailHelp = document.querySelector("#inputEmailHelp");
var senha = document.querySelector("#inputPassword");
var senhaHelp = document.querySelector("#inputPasswordHelp");
var enviar = document.querySelector("#submit");
var enviarHelp = document.querySelector("#submitHelp");


/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco do campo inputName mude, será chamada a função validarNome*/
nome.addEventListener('focusout', validarNome);

/*declaração tradicional de função validarNome(e)
'e' é o objeto do tipo evento que contém, alpem de outras propriedades, o objeto que iniciou o evento,
neste caso o objeto 'nome'
*/
let nomeVale = false;
function validarNome(e){ 
    nomeVale = false;
    // Caso o usuario mude algo, a mensagem anterior eh apagada
    enviarHelp.textContent = "";

    //declaração da expressão regular para definir o formato de um nome válido
    /**
     * MUDANCA NO HTML POR CONTA DE COMO FOI FEITA ESSA FUNCAO
     * Aqui, a função espera um nome que comece com letra maiúscula seguida de letras minúsculas,
     * então espaço e novamente letra maiúscula e letras minúsculas, mas no HTML esse campo está sendo indicado
     * como 'Primeiro Nome', o que pode ficar confuso para o usuário. Por conta disso, no HTML mudarei
     * a indicacao para 'Primeiro e Último Nome', indicando que a pessoa deve colocar seu nome e o ultimo sobrenome,
     * já que a funcao aceita apenas duas palavras nesse formato. Além disso, coloquei um placeholder de exemplo
     * no HTML para facilitar ainda mais o entendimento e trazer uma melhor experiência do usuário
     */
    const regexNome = /^[A-Z][a-z]+ [A-Z][a-z]+$/;
    
    console.log(e); //impressão em console do objeto evento e
    console.log(e.target.value); //impressão em console do valor do objeto 'nome' que originou o evento   

    /**
     * Foi considerado colocar as duas condicoes em um unico if com um || (ou), mas para tornar a experiencia do usuario
     * melhor, mudei a estrategia separando-os em ifs diferentes, já que dessa forma a mensagem de erro é personalizada
     * para o usuario saber exatamente o que ele está errando. Assim, primeiro ele confere o comprimento do nome e, em 
     * seguida se ele se encaixa no formato valido segundo a funcao
     */
    if(e.target.value.trim().length < 6){
        nomeHelp.textContent = "Nome com menos de 6 caracteres. Insira um nome válido, com seu primeiro nome e um sobrenome completo."; 
        nomeHelp.style.color="red";
    }
    else if(e.target.value.trim().match(regexNome)==null){
        //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputNameHelp
        nomeHelp.textContent = "Formato de nome inválido. Insira seu primeiro nome e um sobrenome. A primeira letra de cada nome deve ser maiúscula."; 
        nomeHelp.style.color="red";
    }
    else{
        nomeHelp.textContent = "";
        nomeVale = true;
    }      
}



let anoVale = false;
/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco seja mudado, será chamada a função validarNome*/

//declaração de função de forma anônima usando uma expressão de função de seta =>

ano.addEventListener('focusout', () => {
    // Caso o usuario mude algo, a mensagem anterior eh apagada
    enviarHelp.textContent = "";
    anoVale = false;

    //declaração da expressão regular para definir o formato de um ano válido
    const regexAno = /^[0-9]{4}$/;
    //tirar (trim) espaços em branco antes e depois da string
    const anoTrimado = ano.value.trim();
    console.log(ano.value);

    if(anoTrimado.match(regexAno)==null){
        //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
        anoHelp.textContent = "Formato de ano inválido";
        anoHelp.style.color="red";
    }
    
    else{
        //objeto Date
        var date = new Date();
        //obtem o ano atual
        console.log(date.getFullYear()); 
        
        if( parseInt(anoTrimado) > parseInt(date.getFullYear()) ){
             //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
            anoHelp.textContent = `Ano inválido. O ano não pode ser maior que ${date.getFullYear()}.`;
            anoHelp.style.color="red";
        }
        else if( parseInt(anoTrimado) < parseInt(date.getFullYear())-120 ){
             //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
            anoHelp.textContent = `Ano inválido. O ano não pode ser menor que ${date.getFullYear()-120}.`;
            anoHelp.style.color="red";
        }
        else{
            anoHelp.textContent="";
            anoVale = true;
        }        
        
    }
}
);

let emailVale = false;
/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco do campo inputEmail mude, será chamada a função validarEmail*/
email.addEventListener('focusout', validarEmail);

function validarEmail(e){
    // Caso o usuario mude algo, a mensagem anterior eh apagada
    enviarHelp.textContent = "";
    emailVale = false;
    //declaração da expressão regular para definir o formato de um email válido, segundo a especificacao
    const regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.(br|com|net|org)$/;

    console.log(e); //impressão em console do objeto evento e
    console.log(e.target.value); //impressão em console do valor do objeto 'nome' que originou o evento   

    if(e.target.value.match(regexEmail) == null){
        emailHelp.textContent = `E-mail inválido.`;
        emailHelp.style.color="red";
    }
    else{
        emailHelp.textContent="";
        emailVale = true;
    }   
}

/**
 * Funcao para validar a senha a cada input do usuario
 */

let ultimaMsg = "";
let ultimaCor = "";
let ultimaSeg = "";
let senhaVale = false;

// Adicionando o evento de input para validar a senha
senha.addEventListener('input', validarSenha);

function validarSenha(e) {
    // Regex para cada regra de validacao
    const regexCEspecial = /[^a-zA-Z0-9]/g;
    const regexNumero = /[0-9]/g;
    const regexLetra = /[a-zA-Z]/g;
    const regexLetraMaiuscula = /[A-Z]/g;

    const regraTamanho = document.getElementById('regraTamanho');
    const regraCEspecial = document.getElementById('regraCEspecial');
    const regraNumero = document.getElementById('regraNumero');
    const regraLetra = document.getElementById('regraLetra');

    let senhaValida = false;
    let validacoes = 0;
    let nomeUsuario = nome.value.toLowerCase().split(" ");
    let senhaMinuscula = e.target.value.toLowerCase();
    let nomeInSenha = nomeUsuario.some(parte => senhaMinuscula.includes(parte));
    let anoNascimento = ano.value;
    // Caso o usuario mude algo, a mensagem anterior eh apagada
    enviarHelp.textContent = "";

    // condicoes para a senha ser valida
    if (e.target.value.length >= 6 && e.target.value.length <= 20) {
        regraTamanho.style.color = "green";
        validacoes++;
    } 
    else {
        regraTamanho.style.color = "red";
    }

    if (regexCEspecial.test(e.target.value)) {
        regraCEspecial.style.color = "green";
        validacoes++;
    } 
    else {
        regraCEspecial.style.color = "red";
    }

    if (regexNumero.test(e.target.value)) {
        regraNumero.style.color = "green";
        validacoes++;
    } 
    else {
        regraNumero.style.color = "red";
    }

    if (regexLetra.test(e.target.value)) {
        regraLetra.style.color = "green";
        validacoes++;
    } 
    else {
        regraLetra.style.color = "red";
    }

    if(!e.target.value.includes(anoNascimento) && !nomeInSenha){
        validacoes++;
    }
    else{
        ultimaMsg = "Senha Inválida. Sua senha não pode conter seu nome e/ou ano de nascimento.";
        ultimaCor = 'red';
    }

    // condicao auxiliar apenas para mudar o texto
    if(!nomeInSenha && !e.target.value.includes(anoNascimento) && validacoes != 5){
        ultimaMsg = "Senha Inválida.";
        ultimaCor = "red";
    }
    

    //condicao que checa se a senha eh valida ou nao
    if (validacoes === 5) {
        senhaValida = true;
    } else {
        senhaValida = false;
        segurancaSenha = 0;
        senhaVale = false;
    }

    // quando a senha eh dada como valida, entra nessa funcao para calcular sua forca
    if (senhaValida) {
        senhaVale = true;
        if (e.target.value.length >= 12 && 
            (e.target.value.match(regexCEspecial) || []).length > 1 && 
            (e.target.value.match(regexNumero) || []).length > 1 && 
            (e.target.value.match(regexLetraMaiuscula) || []).length > 1) { 
            ultimaMsg = "Senha forte";
            ultimaCor = "green";
            segurancaSenha = 3;
        }
        else if (regexLetraMaiuscula.test(e.target.value)) {
            ultimaMsg = "Senha moderada";
            ultimaCor = "orange";
            segurancaSenha = 2;
        } 
        else if (e.target.value.length <= 8) {
            ultimaMsg = "Senha fraca";
            ultimaCor = "orange";
            segurancaSenha = 1;
        } 
    
       
    }

    senhaHelp.textContent = ultimaMsg;
    senhaHelp.style.color = ultimaCor;
    passStrengthMeter.value = (segurancaSenha * 10);
}


/**
 * Cricao de funcao para retornar se o cadastro pode ser finalizado ou nao ao clicar no botao
 * de enviar.
 */
enviar.addEventListener("click", submit);

function submit(){

    if(nomeVale && emailVale && anoVale && senhaVale){
        enviarHelp.textContent = "Cadastro efetuado com sucesso!";
        enviarHelp.style.color = "blue";
    }
    else{
        enviarHelp.textContent = "Cadastro não pode ser finalizado, preencha os campos corretamente";
        enviarHelp.style.color = "red";
    }
}
