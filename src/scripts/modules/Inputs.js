export class Input{

    processPC(key, func_){
        document.addEventListener("keydown", function(event){
            if(event.key === key){
                func_()
            }
        })
    }

    processMob(element, func_){
        element.addEventListener('submit', function(event){
            event.preventDefault();
            func_();
        })
    }

}