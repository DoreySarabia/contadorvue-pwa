if("serviceWorker" in navigator){
    // register recibe el parametro de la ruta de serviceworker
    navigator.serviceWorker.register("./sw.js")
    .then((reg) => console.log("Registro exitoso"))
    .catch((err) => console.log(err))
}