document.addEventListener('DOMContentLoaded',function(){

    iniciarApp();
})

function iniciarApp(){
    navegacionFija();
    crearGaleria();
    scrollNav();
}
function navegacionFija(){
    const barra = document.querySelector('.header')
    const sobreFestival=document.querySelector('.sobre-festival')
    const body = document.querySelector('.body')

    window.addEventListener('scroll', function(){        
        if (sobreFestival.getBoundingClientRect().top<0){
            barra.classList.add('fijo')
            body.classList.add('body-scroll')
        }else {
            barra.classList.remove('fijo')
            body.classList.remove('body-scroll')
        }
            
    })

}

function scrollNav(){
    //Lectura enlaces
    const enlaces=document.querySelectorAll('.navegacion_principal a')
    enlaces.forEach(enlace => {
        enlace.addEventListener('click',function(e){
            e.preventDefault()
            const seccionScroll = e.target.attributes.href.value
            const seccion =document.querySelector(seccionScroll)
            seccion.scrollIntoView({behavior:"smooth"})
        })

    } )
}

function crearGaleria(){
    // seleccionar la clase de html en una variable
    const galeria = document.querySelector('.galeria-imagenes')

    //recorrero las imagenes 
    for(let i = 1; i<=12; i++){
        //crear una clase etiqueta
        const imagen = document.createElement('picture')
        // La propiedad Element.innerHTML devuelve o establece la sintaxis HTML describiendo los descendientes del elemento.
        imagen.innerHTML = ` 
            <picture>
            <source srcset="build/img/thumb/${i}.avif" type="imagen/avif">
            <source srcset="build/img/thumb/${i}.webp" type="imagen/webp">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen cargando">
            </picture>`
          
        //Funcion click imaganes
        imagen.onclick=function(){
            mostrarImagen(i)
        }
        //pasar imaganes
        galeria.appendChild(imagen)

    }
}

function mostrarImagen(id_imagen){   
    //crear una clase etiqueta    
    const imagen = document.createElement('picture')
    // La propiedad Element.innerHTML devuelve o establece la sintaxis HTML describiendo los descendientes del elemento.
    imagen.innerHTML = ` 
        <picture>
        <source srcset="build/img/grande/${id_imagen}.avif" type="imagen/avif">
        <source srcset="build/img/grande/${id_imagen}.webp" type="imagen/webp">
        <img loading="lazy" width="200" height="300" src="build/img/grande/${id_imagen}.jpg" alt="imagen cargando">
        </picture>`;

    //crea el overlay con la imagen
    const overlay = document.createElement('DIV')
    overlay.appendChild(imagen)
    overlay.classList.add("overlay")
    overlay.onclick=function(){
        const body = document.querySelector('body')        
        body.classList.remove("fijar-body")
        overlay.remove()

    }

    //boton para cerrar el modal
    const cerrarModal= document.createElement('P')
    cerrarModal.textContent='X'
    cerrarModal.classList.add('btn-cerrar')
    cerrarModal.onclick=function(){
        const body = document.querySelector('body')        
        body.classList.remove("fijar-body")
        overlay.remove()
    }
    overlay.appendChild(cerrarModal)

    // //anadir al html
    const body = document.querySelector('body')
    body.appendChild(overlay)
    body.classList.add("fijar-body")
}