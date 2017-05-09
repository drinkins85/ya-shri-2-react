
// возвращает отфильтрованный массив

export default function filtredLections(lections, filter){
    return lections.filter(lection =>{
        if (compareObjects(lection, filter)){
            return lection;
        }
    });
}

function compareObjects(objTarget, objFilter){

    if (!!objFilter["id"]){
        if (objFilter["id"] === objTarget["id"]){
            return false;
        }
    }

    if (!!objFilter["teacher"]){
        if (objFilter["teacher"] !== objTarget["teacher"].id){
            return false;
        }
    }
    if (!!objFilter["classroom"]){
        if (objFilter["classroom"] !== objTarget["classroom"].id){
            return false;
        }
    }

    if (Array.isArray(objFilter["schools"])){
        if (!objFilter.schools.some(function(number){
                for (let i=0; i<objTarget.schools.length; i++){
                    if (objTarget.schools[i].id === number){
                        return true;
                    }
                }
                return false;
            })){
            return false;
        }
    }

    if (!!objFilter["dateStart"] && !! objFilter["dateFinish"]){

        if ( ( objTarget["dateFinish"] <= objFilter["dateStart"]) || (objTarget["dateStart"] >= objFilter["dateFinish"])){
            return false;
        }
    }  else {
        if (!!objFilter["dateStart"]) {
            if (objTarget["dateFinish"] <= objFilter["dateStart"]) {
                return false;
            }
        }
        if (!!objFilter["dateFinish"]) {
            if (objTarget["dateStart"] >= objFilter["dateFinish"]) {
                return false;
            }
        }
    }

    return true;
}