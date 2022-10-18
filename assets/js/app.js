const url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

let model = {

    rates: [],
    async load(){

        let data = await fetch(url);
            data = await data.json();

        this.rates = data;    

    },

    doSearch(){
        
        let re = /^[A-Z]{3}/;
        let GetTags = document.querySelectorAll("span");
        console.dir(GetTags);
        let ForWords = [];
        console.log(ForWords);

    },

    filter(){



    }
    
}   

model.doSearch();
