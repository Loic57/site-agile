document.addEventListener('DOMContentLoaded', function() {

    /********** OPEN/CLOSE NAVIGATION  WHEN CLICKING ON NAV TRIGGER  **********/
    const body = document.querySelector("body"),
          pageHeaderLeftBar = document.querySelector('.page-header.page-header--left-bar'),
          pageHeaderTopBar = document.querySelector('.page-header:not(.page-header--left-bar):not(.page-header--bottom-bar-mobile)'),
          pageHeaderBottomMobile = document.querySelector('.page-header.page-header--bottom-bar-mobile'),
          pageNavOverlay = document.querySelector("#pageNavOverlay"),
          pageNav = document.querySelectorAll(".page-nav"),
          triggerNavContainer = document.querySelectorAll('[data-trigger-nav]'),
          triggerSubNavPrimary = document.querySelectorAll('.nav-primary__has-sub-level'),
          navPrimaryLI = document.querySelectorAll('.nav-primary > li');


    //toggle the left navbar
    const toggleNav = event =>  {
        event.preventDefault();

        const dataTriggerNav = event.currentTarget.dataset.triggerNav;
        let i=0;

        while(i<pageNav.length) {
          if(pageNav[i].id == dataTriggerNav)
            body.classList.contains('menu-opened') ? body.classList.remove('menu-opened') : body.classList.add('menu-opened');
          i++
        }
    };
    let i=0;
    while(i < triggerNavContainer.length) {
      triggerNavContainer[i].addEventListener('click', toggleNav);
      i++;
    }


    //close the left navbar
    const closeNav = () => {
        body.classList.remove('menu-opened');
    };
    pageNavOverlay.addEventListener('click', closeNav);


    //toggle the subnav
    const toggleSubNav = event => {
      /*if(pageHeaderTopBar || pageHeaderLeftBar) {
        if(!pageHeaderBottomMobile) {
          event.preventDefault();
        }
      }*/

    //  if(pageHeaderBottomMobile && window.innerWidth > 1024) event.preventDefault();

      if(window.innerWidth < 1025 || pageHeaderLeftBar) {
        event.currentTarget.classList.add('show');
        //event.currentTarget.classList.toggle('show');
      }
    }
    let j=0;
    while(j < triggerSubNavPrimary.length) {
      triggerSubNavPrimary[j].addEventListener('click', toggleSubNav);
      if(window.innerWidth < 1025 || pageHeaderLeftBar) {
        triggerSubNavPrimary[j].classList.add('show');
      }
      j++;
    }


    //on resize, if window width > 1024px then close the nav and if < 1024px then allow click on  <li> which have .has-sub-level class to display sub nav
    window.addEventListener('resize', function() {
      if(this.innerWidth > 1024) {
        closeNav();
        let j=0;
        while(j < triggerSubNavPrimary.length) {
          //triggerSubNavPrimary[j].addEventListener('click', toggleSubNav);
          triggerSubNavPrimary[j].classList.remove('show');
          j++;
        }
      }

      if(this.innerWidth < 1024) {
        let j=0;
        while(j < triggerSubNavPrimary.length) {
          //triggerSubNavPrimary[j].addEventListener('click', toggleSubNav);
          triggerSubNavPrimary[j].classList.add('show');
          j++;
        }
      }
    });


    //accessibility enter key
    for(let i=0, x=navPrimaryLI.length; i<x; i++) {
      navPrimaryLI[i].addEventListener('keyup', event => {
        for(let j=0, x=navPrimaryLI.length; j<x; j++) {
          navPrimaryLI[j].classList.remove('show');
        }
        event.currentTarget.classList.add('show');
      });
    }

    /********** OPEN/CLOSE NAVIGATION WHEN CLICKING ON NAV TRIGGER **********/

}, false);
