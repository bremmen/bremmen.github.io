(function(){
    //Variable
    var tareaInput=document.getElementById("tareaInput"),
        btnNuevaTarea=document.getElementById("btn-agregar");

    // Funciones 
        //agregar Tareas
    var agregarTarea= function(){
        
        var tarea= tareaInput.value;

        if(tarea===""){
            tareaInput.setAttribute("placeholder","Agrega una tarea valida");
            tareaInput.className += " error";
            return false
        }
        if(localStorage.getItem('tasks')===null){
            let tasks=[];
            tasks.push(tarea);
            localStorage.setItem('tasks',JSON.stringify(tasks));
        }
        else{
            let tasks=JSON.parse(localStorage.getItem('tasks'))
            tasks.push(tarea);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        tareaInput.value="";
        getTasks();
    };
    //obtener tareas
    

        //comprobar tareas
    var comprobarInput= function(){
        tareaInput.className="form-control";
        tareaInput.setAttribute("placeholder", "Agrega tu tarea")
    };

        //eliminar tareas
    var eliminarTarea= function(){
        //this.parentNode.remove(this);
        
        var lista=JSON.parse(localStorage.getItem('tasks'));

        for(var i=0; i<lista.length; i++){
            
            if(lista[i]==this.name){
                lista.splice(i,1);
                console.log(this.name)
            }
        }
        //actualizo BD y muestro 
        localStorage.setItem('tasks', JSON.stringify(lista));
        getTasks();
        
    };

    //Eventos

    //Agregar Tarea
    btnNuevaTarea.addEventListener("click", agregarTarea);

    //Comprobar input
    tareaInput.addEventListener("click", comprobarInput)


    //Cargo las tareas de la base de datos
    getTasks();

    function getTasks(){
        var lista=JSON.parse(localStorage.getItem('tasks'));
        if(lista!==null){

            //remuevo todos los elementos de la lista
            var mostrarLista=document.getElementById("lista"); //obtengo la seccion para mostrar las tareas
            while (mostrarLista.firstChild) {
                mostrarLista.removeChild(mostrarLista.firstChild);
              }

            for(let i =0; i<lista.length; i++){

                    //Creo los elementos a agregar a la seccion
                    li=document.createElement("li"),
                    div=document.createElement("div"),
                    indiceP = document.createElement("p"),
                    btnEliminar=document.createElement("button"),
                    
                    //creo los contenidos
                    indice = document.createTextNode(i+1),
                    x=document.createTextNode("X"),
                    task=document.createTextNode(lista[i]); // obtengo la tareas en la BD
                    
                    //agrego los contenidos
                    div.appendChild(task);
                    indiceP.appendChild(indice);
                    btnEliminar.appendChild(x);
        
                    //agrego las clases a las etiquetas
                    div.className="col-8 order-2";
                    indiceP.className="badge badge-pill badge-primary order-1"
                    btnEliminar.className="btn btn-danger order-3";
                    btnEliminar.setAttribute("name", lista[i])
                    //agrego evento al boton eliminar
                    btnEliminar.addEventListener("click",eliminarTarea);
                    
                    // agrego los elementos a la sección.
                    li.appendChild(indiceP);
                    li.appendChild(div);
                    li.appendChild(btnEliminar);
                    mostrarLista.appendChild(li);
            }
        }
        
    }
}()
);