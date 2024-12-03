let subMenus = document.querySelectorAll('ul li ul');


hideSubMenus();
let menuLinks = document.querySelectorAll('.menu-link');


for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener('click', function (event) {
        event.preventDefault();
        let thisMenu = this.parentNode.querySelector('ul');
        // let thisMenu = this.nextElementSibling se puede usar también

        if (thisMenu.classList.contains('hide-menu')) {
            // Así evitamos tener muchos menús abiertos a la vez
            hideSubMenus();
            thisMenu.className = 'show-menu';

        } else {
            thisMenu.className = 'hide-menu';
        }
    });


}
function hideSubMenus() {
    for (let i = 0; i < subMenus.length; i++) {
        subMenus[i].className = 'hide-menu';
    }
}