const photo_user = document.getElementById('photo-user') // Foto do usuario para pegar o click;
const drop_user = document.getElementById('dropdown-js') // menu de usuario para (show/hide);

// function para apresentar o menu do usurio e esconder; 
function show() {
    drop_user.classList.toggle('drop-user')
}

/* habilidades */
const skills = document.querySelectorAll('.skill-box')
const descricao = document.querySelector('.texto-descricao')
const sobreSkill = [
                    '<p>HTML</p> <br> <p>É uma linguagem de marcação utilizada na construção de páginas na Web.</p>',

                    '<p>CSS</p> <br> <p>É um mecanismo para adicionar estilo a um documento web.</p>',

                    '<p>Bootstrap</p> <br> <p>Bootstrap é um framework web para desenvolvimento de componentes de interface e front-end para sites e aplicações web, usando HTML, CSS e JavaScript.</p>',

                    '<p>Tailwind</p> <br> <p>O tailwind entrega classes CSS utilitárias, com estilos prévios para você criar seus próprios componentes de UI.</p>',

                    '<p>PHP</p> <br> <p>PHP é uma linguagem de programação utilizada por programadores e desenvolvedores para construir sites dinâmicos, extensões de integração de aplicações e agilizar no desenvolvimento de um sistema.</p>',

                    '<p>Laravel</p> <br> <p>Laravel é um framework PHP, para o desenvolvimento de sistemas web que utilizam o padrão MVC.</p>',
                    
                    '<p>Mysql</p> <br> <p>O mysql é um sistema de gerenciamento de banco de dados, que utiliza a linguagem SQL como interface. É atualmente um dos sistemas de gerenciamento de bancos de dados mais populares do mundo.</p>'
]

skills.forEach(  (elemento, index) => {
    let index1 = index;
    let elemento1 = elemento;
    elemento.addEventListener('mouseover', (evento) => {
        descricao.innerHTML = `<p>${sobreSkill[index1]} </p>` 
    } )

    
    elemento.addEventListener('mouseout', (evento, elemento,) => {
        descricao.innerHTML = '/* Passe o mouse por cima de alguma habilidade para ler a descrição */'
    } )
} )

/* menu mobile */

let bars = document.getElementById('bars-menu')
let mobile_menu = document.querySelector('.mobile-menu')

bars.addEventListener('click', function() {
    console.log(mobile_menu)

    mobile_menu.classList.toggle('mobile-menu-ab')
});

/* fim menu mobile */