class Numerology{

    #_DOB_raw;
    #_DOB_day;
    #_DOB_week_day;
    #_DOB_month;
    #_DOB_year;

    constructor(dob){
        //constructor
        if(dob && dob.value != ''){
            const formattedDate = this.#formatDateDDMMYYYToYYYMMDD(dob.value);
            this.#_DOB_raw = new Date(formattedDate);
          
            this.#_DOB_day = parseInt(this.#_DOB_raw.getDate());
            this.#_DOB_week_day = parseInt(this.#_DOB_raw.getDay());
            this.#_DOB_month = parseInt((this.#_DOB_raw.getMonth() + 1));
            this.#_DOB_year = parseInt(this.#_DOB_raw.getFullYear());

            //console.table(this.#_DOB_day,this.#_DOB_month,this.#_DOB_year, this.#WeekDay(this.#_DOB_week_day))

        }

    }

    #getMVA(){

        const day = this.#_DOB_day;
        let daySplit = day.toString().split(''); 
        const month = this.#_DOB_month;
        let monthSplit = month.toString().split(''); 
        const year = this.#_DOB_year;
        let yearSplit = [];

        // dia > 9 - quebra os digitos em 2 e os soma. eg: 21 = 2 + 1 = 3;
        if(day < 10){
            daySplit[0] = 0;
            daySplit[1] = day;
        }
            
        // mes > 9 - quebra os digitos em 2 e os soma. eg: 11 = 1 + 1 = 2;
        if(month < 10){
            monthSplit[0] = 0;
            monthSplit[1] = month; 
        }

        yearSplit = year.toString().split(''); 
     
        // Soma dos numeros em colunas
        // eg:  04
        //      01
        //    1982 
        //    ----
        //    1987
        
        //     col4 4 + 1 + 2 = 7;
        //     col3 0 + 0 + 8 = 8;
        //     col2 0 + 0 + 9 = 9;
        //     col1 0 + 0 + 1 = 1;

        const col4 =  parseInt(daySplit[1]) + parseInt(monthSplit[1]) + parseInt(yearSplit[3]);
        const col3 = parseInt(daySplit[0]) + parseInt(monthSplit[0]) + parseInt(yearSplit[2]);
        const col2 = parseInt(yearSplit[1]);
        const col1 = parseInt(yearSplit[0]);

        const sumOfSplittedDate = col1 + col2 + col3 + col4;

        //console.log(daySplit, monthSplit);
        //console.table(col1,col2, col3, col4);
        //console.log(sumOfSplittedDate);
        
        const mva = this.#splitNumbers(sumOfSplittedDate,22);

        return mva;

    }

    showMVA(){

        const mva = this.#getMVA();

        const mvaElem = document.getElementById("mva");

        if(mvaElem){
            mvaElem.innerText = ` ${mva}`;
        }

        return mva;

    }

    #getIlka(mva){

        const valueDays = this.#splitNumbers(this.#_DOB_day, 22);
        const valueMonths = this.#_DOB_month;
        //Soma os digitos do ano se for maior que 22 quebra o resultado em 2 e soma. 
        const valueYears = this.#splitNumbers(this.#sumDigits(this.#_DOB_year), 22);

        return valueDays + valueMonths + valueYears + mva;

    }

    showIlka(mva){

        const sumIlka = this.#getIlka(mva);

        const ilka = document.getElementById("ilka");
            if(ilka){
                ilka.innerText = ` ${sumIlka}` 
            }

    }

    #getNumMoney(mva){

        let val = parseInt(mva) + 8;
        if(val > 9){
            val = this.#splitNumbers(val, 9);
        }    

        return val;

    }

    showNumMoney(mva){

        const money = document.getElementById("dinheiro");
        if(money){
            const result = this.#getNumMoney(mva);
            money.innerText = ` ${result}`;
        }

    }

    #sumDigits(value){
        let newValue = 0;
        if(value != ''){
            const splitNums = value.toString().split(''); 
            for (let i = 0; i < splitNums.length; i++) {
               newValue += parseInt(splitNums[i]);
            }
        }

        return newValue;
    }

    #splitNumbers(value, numLimit){

        let newValue = 0;
        if(value > numLimit){
            const splitNums = value.toString().split(''); 
            newValue = parseInt(splitNums[0]) + parseInt(splitNums[1]);
        }else{
            newValue = parseInt(value);
        }

        return newValue;

    }

    

    #formatDateDDMMYYYToYYYMMDD(value){

        if(value == '' || value == ''){
            console.log(`formatDateDDMMYYYToYYYMMDD: ${value}`);
            return new Date();
        }

        const [day, month, year] = value.split('/');
        const date = `${year}-${month}-${day}`;

        return date; 

    }

    #WeekDay(num) {

        let result = "";
        let resultEnd = "-Feira";

        switch(num){
            case 1:
                result = "Segunda";
                break;
            case 2:
                result = "Terça";
                break;
            default:
                break;
        };

        return result += resultEnd;
        
    }

    

}