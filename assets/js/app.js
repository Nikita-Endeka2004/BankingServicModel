const url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

let model = {

    rates: [],
    ArrayForWords: [],
    ArrayForNumber: [],
    CostInFilter: [],
    async load(){

        let data = await fetch(url);
            data = await data.json();

        this.rates = data;   
        this.doSearch();

    },

    doSearch(){
        
        let re = /^[A-Z]{3}/;
        let rep = /[0-9]{1,6}/;
        let GetTags = document.querySelectorAll("span");
        let ForWords = [];
        let ForNumber = [];
        for(let i = 0; i < GetTags.length; i++){

            ForWords[i] = GetTags[i].innerText.replace(rep, "").trim();
            ForNumber[i] = GetTags[i].innerText.replace(re, "").trim();

        }
        this.ArrayForNumber = ForNumber;
        this.ArrayForWords = ForWords;
        this.filter();

    },

    filter(){

        let ratesToShow = this.rates.map(item => item.cc);
        let cost = [];
        for(let i = 0; i < ratesToShow.length; i++){
            for(let j = 0; j < this.ArrayForWords.length; j++){

                if(ratesToShow[i] === this.ArrayForWords[j]){

                    cost[j] = this.rates[i].rate;

                }

            }

        }
        this.CostInFilter = cost;
        this.output();

    },

    output(){

        let sum = [];
        for(let i = 0; i < this.ArrayForNumber.length; i++){

            sum[i] = this.ArrayForNumber[i] * this.CostInFilter[i];
            sum[i] = Math.ceil(sum[i]);

        }
        let GetTags = document.querySelectorAll("span");
        for(let i = 0; i < sum.length; i++){

        GetTags[i].innerHTML = sum[i] + ' UAH';

        }

    }
    
}   
model.load();
