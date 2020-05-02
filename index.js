//api x telegram bot
var TelegramBot = require("node-telegram-bot-api");
//token del bot CORONA --
var token = "1127722645:AAH1CDV6T9Am12vuNPBcN3rv0hpiJF_zV-0";

var bot = new TelegramBot(token, {
    polling: true
});

const axios = require('axios');
const cheerio = require('cheerio');
//s è l'array utilizzato all'inizio di ogni funzione per azzerrare la coda dei dati;
var s = [];
var top=[];
var id = 1;

//il match viene utilizzato per ricevere il valore dato dall'utente
bot.onText(/\/confermati/, (msg, match) => {
    //s viene azzerato prima che la funzione richiami altri dati ed effettui un push in s;
    //nel caso in cui l'array s fosse piene viene svuotato per evitare che si crei un elenco di dati che si ripetono
    if(s.length != 0){
        s.length = 0;
        id = 1;
    }
    
    var idq = match.input.split(" ")[1];//il messaggio dell'utente viene splittato e viene ricavato quindi l'id
    
    console.log(idq);
    dati("https://news.google.com/covid19/map?hl=it&gl=IT&ceid=IT:it", function(s){//viene richiamata la funzione dati() e inserito l'url della pagina
        var trovato = "";
        for (j = 0; j < s.length; j++) {
            if (s[j].split('+')[0] == idq) {//viene confrontato l'id della nazione con quello da usare, fino a quando sarà uguale
                trovato = s[j];//in tal caso viene inserito il dato in trovato
            }
        }
        //viene effettuato un controllo nel caso l'id inserito dall'utente sia maggiore degli id dispoibili
        if(idq>s.length){
            bot.sendMessage(msg.chat.id,"l'id che hai inserito non corrisponde a nessuna nazione, riprova");
        }
        else{
            bot.sendMessage(msg.chat.id,"nazione:"+trovato.split('+')[1]+ "; "+"\n"+"contagi confermati: " + trovato.split('+')[2]);//incremento del valore per andare a ottenere il dato desiderato che in questo caso si trova nella terza posizione dell'array
        }
    });
});
//funzione per mostrare i casi  di una nazione
//ognuna di queste funzioni utilizza la stessa logica della precedente
bot.onText(/\/casi/, (msg, match) => {
    if(s.length != 0){
        s.length = 0;
        id = 1;
    }
    var idq = match.input.split(" ")[1];
    console.log(idq);
    dati("https://news.google.com/covid19/map?hl=it&gl=IT&ceid=IT:it", function(s){
        var trovato = "";
        for (j = 0; j < s.length; j++) {
            if (s[j].split('+')[0] == idq) {
                trovato = s[j];
            }
        }if(idq>s.length){
            bot.sendMessage(msg.chat.id,"l'id che hai inserito non corrisponde a nessuna nazione, riprova");
        }
        else{
            bot.sendMessage(msg.chat.id,"nazione:"+trovato.split('+')[1]+ "; "+"\n"+"casi confermati: " + trovato.split('+')[3]);//incremento
        }
    });
});
//funzione per mostrare i guariti di una nazione tramite id
bot.onText(/\/guariti/, (msg, match) => {
    if(s.length != 0){
        s.length = 0;
        id = 1;
    }
    var idq = match.input.split(" ")[1];
    console.log(idq);
    dati("https://news.google.com/covid19/map?hl=it&gl=IT&ceid=IT:it", function(s){
        var trovato = "";
        for (j = 0; j < s.length; j++) {
            if (s[j].split('+')[0] == idq) {
                trovato = s[j];
            }
        }
        if(idq>s.length){
            bot.sendMessage(msg.chat.id,"l'id che hai inserito non corrisponde a nessuna nazione, riprova");
        }
        else{
            bot.sendMessage(msg.chat.id,"nazione:"+trovato.split('+')[1]+ "; "+"\n"+"casi guariti: " + trovato.split('+')[4]);//incremento 
        }
    });
});

bot.onText(/\/decessi/, (msg, match) => {
    if(s.length != 0){
        s.length = 0;
        id = 1;
    }
    var idq = match.input.split(" ")[1];
    console.log(idq);
    dati("https://news.google.com/covid19/map?hl=it&gl=IT&ceid=IT:it", function(s){
        var trovato = "";
        for (j = 0; j < s.length; j++) {
            if (s[j].split('+')[0] == idq) {
                trovato = s[j];
            }
        }
        if(idq>s.length){
            bot.sendMessage(msg.chat.id,"l'id che hai inserito non corrisponde a nessuna nazione, riprova");
        }
        else{
            bot.sendMessage(msg.chat.id,"nazione:"+trovato.split('+')[1]+ "; "+"\n"+"decessi: " + trovato.split('+')[5]);//incremento
        }
    });
});
//la funzione topmondo mostra tutta la classifica dei paesi contagiati dal coronavirus e soprattutto mostra i loro dati
bot.onText(/\/topmondo/, (msg) => {
    if(s.length != 0){
        s.length = 0;
        top.length=0;
        id = 1;
    }
    dati("https://news.google.com/covid19/map?hl=it&gl=IT&ceid=IT:it", function(s){
        var messaggio = "";
        for (j = 0; j < s.length; j++) {
            console.log(top[j]);
            messaggio += (top[j] + "\n\n");//la stringa 'messaggio' viene riempita con tutti i dati;
            //viene riempita 'messaggio' per oviare al problema della classifica non ordinata che sarebbe risultata stampando normalmente l'array 'top';  
        }
        bot.sendMessage(msg.chat.id, messaggio);
    });
});


//la funzione topdati mostra la top ten e ha lo stesso funzionamento della /topmondo
bot.onText(/\/topdati/, (msg) => {
    if(s.length != 0){
        s.length = 0;
        top.length=0;
        id = 1;//l'id viene tenuto a 1 per non prendere il primo dato presente nella tabella del sito che contiene i dati totali dwl mondo
    }
    dati("https://news.google.com/covid19/map?hl=it&gl=IT&ceid=IT:it", function(s){
        var messaggio = "";
        for (j = 0; j < 10; j++) {//viene considerato l'array solo fino a i primi 10 valori
            console.log(top[j]);
            messaggio += (top[j] + "\n\n");
        }
        bot.sendMessage(msg.chat.id, messaggio);
    });
});


//la funzione 'dati()' permette di ottenere dal sito di google news le varie statistiche dalla pagina html dei dati riguardanti il covid-19
function dati(_url, callback){
    const url = _url;
    axios(url)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html)
            
            const mondot = $('tbody > tr');//i tr fanno parte del tbody e rappresentano le varie righe della tabella
                //il for ricava tutti i dati della tabella delle diverse nazioni con contagi e finisce con il finire dei tr e quindi delle righe
                // la i viene tenuta a 1 per non prendere la prima riga che inserisce i dati complessivi mondiali
            for (i = 1; i < mondot.length; i++) {
                //l'array mondo t contiene diversi dati (nome, confermati, ecc..) per ogni nazione
                let nome = $(mondot[i].children[0]).text();
                let confermati = $(mondot[i].children[1]).text();
                let casi = $(mondot[i].children[2]).text();
                let guariti = $(mondot[i].children[3]).text();
                let decessi = $(mondot[i].children[4]).text();
                //l'array s viene riempito con i dati delle nazioni
                s.push(id + "+" + nome + "+" + confermati + "+" + casi + "+" + guariti + "+" + decessi);
                top.push(id + " Nazione:" + nome + "; Confermati:" + confermati + "; Casi:" + casi + "; Guariti:" + guariti + "; Decessi:" + decessi+";");
                id++;
            }

            //fornisce i dati anche nel terminal
            console.log("\nDATI\n");
            for(var i = 0; i < s.length; i++){
                console.log(s[i]);
            }

            callback(s);
        })
        .catch(console.error);
}

//il comando '/help' fornisce semplicemente la lista di comandi disponibili del bot e una breve descrizione di essi
bot.onText(/\/help/, (msg) => {
    
    bot.sendMessage(msg.chat.id, "/topmondo - Permette di visualizzare i dati relativi al covid-19 delle diverse nazioni"+"\n\n"+
    "/confermati 'n' - mostra il numero di confermati di una nazione a scelta in base al suo id"+"\n\n"+
    "/casi 'n' - mostra il numero di casi di una nazione a scelta in base al suo id" +"\n\n"+
    "/guariti 'n' - mostra il numero di guariti di una nazione a scelta in base al suo id"+"\n\n"+
    "/decessi 'n' - mostra il numero di decessi di una nazione a scelta in base al suo id"+"\n\n"+
    "/topdati - mostra la top 10 dei paesi con le statisctiche più alte al mondo per covid-19");
       
});
//mostra il polling error se presente
bot.on("polling_error", function (err) {
    console.log(err);
});