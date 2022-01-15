let allCryptoData=[
                {'csupply': "18906315.00",
            'id': "90",
            'market_cap_usd': "786468534845.23",
            'msupply': "21000000",
           'name': "Bitcoin",
            'nameid': "bitcoin",
           'percent_change_1h': "-0.09",
           'percent_change_7d': "-10.22",
           'percent_change_24h': "1.93",
           'price_btc': "1.00",
           'price_usd': "41598.19",
           'rank': 1,
           'symbol': "BTC",
           'tsupply': "18906315",
           'volume24': 19554750719.720966,
           'volume24a': 19414728208.19509
            },

            {'csupply': "18906315.00",
            'id': "90",
            'market_cap_usd': "786468534845.23",
            'msupply': "21000000",
           'name': "Doge",
            'nameid': "bitcoin",
           'percent_change_1h': "-0.09",
           'percent_change_7d': "-10.22",
           'percent_change_24h': "1.93",
           'price_btc': "1.00",
           'price_usd': "41598.19",
           'rank': 1,
           'symbol': "doge",
           'tsupply': "18906315",
           'volume24': 19554750719.720966,
           'volume24a': 19414728208.19509
            },

            
        
        ];

let globalCryptoData=[
    {'active_markets': 22103,
    'avg_change_percent': "1.03",
    'btc_d': "40.04",
    'coins_count': 7669,
    'eth_d': "19.09",
    'mcap_ath': 2912593726674.3335,
    'mcap_change': "2.10",
    'total_mcap': 2012598482509.4924,
    'total_volume': 306431737375.4975,
    'volume_ath': 3992741953593.4854,
    'volume_change': "29.38"},];

let searchedData=[];

let suggestions;

document.body.innerHTML=`

                        <div class="container">
                            <nav class="navbar mt-4 d-flex justify-content-center ">
                                
                            <!--    <div class="search-box-container  d-flex justify-content-center align-items-center "> 
                                    
                                    
                                    <input class="inp-search" type="text" placeholder="Search the Sacred words..."  /> 
                                    <div class="sheath"><div class="sparking"></div></div><span></span>
                                    <div class="handle-wraper">
                                        <button class="btn-search" title="Search" onClick="SerchThisAnime(null,false)"><i class="bi bi-binoculars-fill"></i></button>
                                        </div>
                                 </div> 
                            -->

                                <div class="wrapper">
                                    <div class="search-input search-box-container  d-flex justify-content-center ">
                                        
                                        <input class="inp-search" type="text" placeholder="Type to search.." />
                                       
                                        <div class="btn-search"><i class="bi bi-binoculars-fill"></i></div>
                                        <div class="autocom-box position-absolute ">
                                            <!-- here list are inserted from javascript -->
                                        </div>
                                    </div> 
                                   
                                </div>
                               
                            </nav>

                            <hr />
                            <div class="globalMaarket-container flex-wrap  d-flex justify-content-evenly align-items-center "> 
                            
                            </div>
                            <hr> 

                            <div class="result-container mt-5 d-flex flex-wrap  justify-content-center">
                                <table class="table table-hover">
                                    <thead>
                                    <tr>
                                        <th scope="col">Rank</th>
                                        <th scope="col">Symbol</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">$Price</th>
                                        <th scope="col">1h %</th>
                                        <th scope="col">24h %</th>
                                        <th scope="col">7D %</th>
                                        <th scope="col">Market Cap</th>
                                        <th scope="col">Current Supply</th>
                                        <th scope="col">Total Supply</th>
                                        <th scope="col">Maximum supply</th>                                        
                                    </tr>
                                    </thead>
                                    <tbody class="table-body">
   
                                    </tbody>
                                </table>
                            </div> 

                        </div>
                            
                       
                        `;


//function to retrive data from API
async function getData()
    {

       
         await fetch('https://api.coinlore.net/api/tickers/')
        .then(res => res.json())
        .then(jsonadata => allCryptoData= jsonadata.data );
        // .then(jsonadata => allCryptoData=jsonadata.data);
        //  = await FetchedData.json();

        
        await fetch('https://api.coinlore.net/api/global/')
        .then(res => res.json())
        .then(jsonadata => globalCryptoData= jsonadata );
        
        suggestions = allCryptoData.map( (c) => `${c.symbol} ${c.name}`);
        renderResults();
        RenderGlobalMaeket();
    }
    // (!allCryptoData) ? getData() :null;
   getData();



const tableBodyContainer = document.querySelector(".table-body");

//to render the table containing cryptodata
function renderResults()
{

    tableBodyContainer.innerHTML=  ``;
    console.log("red",allCryptoData);

   let dataToRender;

    if(searchedData.length===0)
    {
        dataToRender=allCryptoData.slice(0,20);
    }
    else{
        dataToRender=searchedData;
    }

    for(let i=0 ;i<dataToRender.length ;i++)
    {
        let MarketCap=FormateThisNum(dataToRender[i].market_cap_usd);
        let CurrentSupply=FormateThisNum(dataToRender[i].csupply);
        let TotalSupply=FormateThisNum(dataToRender[i].tsupply);
        let MaxSupply=FormateThisNum(dataToRender[i].msupply);

        tableBodyContainer.innerHTML+=`
                                    <tr>
                                        <th scope="row">${dataToRender[i].rank}</th>
                                        <td>${dataToRender[i].symbol}</td>
                                        <td><B>${dataToRender[i].name}</B></td>
                                        <td>${dataToRender[i].price_usd}</td>           
                                        <td class="text-${(dataToRender[i].percent_change_1h>0)?'success':'danger'}">${dataToRender[i].percent_change_1h}</td>
                                        <td class="text-${(dataToRender[i].percent_change_24h>0)?'success':'danger'}">${dataToRender[i].percent_change_24h}</td>
                                        <td class="text-${(dataToRender[i].percent_change_7d>0)?'success':'danger'}">${dataToRender[i].percent_change_7d}</td>
                                        <td>${ MarketCap}</td>
                                        <td>${ CurrentSupply}</td>
                                        <td>${TotalSupply}</td>
                                        <td>${MaxSupply}</td>
                                    </tr>
                                    `;

    }


}



const globalMarketContainer = document.querySelector(".globalMaarket-container");


function RenderGlobalMaeket()
{   console.log("Global",globalCryptoData);
        globalMarketContainer.innerHTML+=`
                                    
                                    <div class="d-flex" ><label for="Coins" ><B>Coins: </B></label><p>${globalCryptoData[0].coins_count}</p></div>
                                    <div class="d-flex"><label for="Exchanges" ><B>Markets: </B></label><p>${globalCryptoData[0].active_markets}</p></div>
                                    <div class="d-flex"><label for="Market_Cap" ><B>Market Cap: </B></label><p>${FormateThisNum(globalCryptoData[0].total_mcap)}<sup class="mx-1 text-${(globalCryptoData[0].avg_change_percent>0)?'success':'danger'} ">${globalCryptoData[0].avg_change_percent}</sup></p></div>
                                    <div class="d-flex"><label for="24h_Vol" ><B>24h Vol: </B></label><p>${ FormateThisNum(globalCryptoData[0].total_volume)} <sup class="mx-1 text-${(globalCryptoData[0].volume_change>0)?'success':'danger'} ">${globalCryptoData[0].volume_change}</sup></p></div>
                                    <div class="d-flex" ><label for="Dominance" ><B>Dominance: </B></label><p>  BTC :  ${globalCryptoData[0].btc_d}%  ETH : ${globalCryptoData[0].eth_d}% </p></div>     
                                    
                                    `;
        
} 
// RenderGlobalMaeket();                      
// renderResults();
                                
       




// var numbers = [98721, 9812730,37462,29,093484620123, 9732, ];
// for(let num of numbers){
//   console.log(new Intl.NumberFormat( 'en-US', { maximumFractionDigits: 1,notation: "compact" , compactDisplay: "short" }).format(num));
// }

function FormateThisNum(num)
{  
  return  new Intl.NumberFormat( 'en-US', { maximumFractionDigits: 1,notation: "compact" , compactDisplay: "short" }).format(num)
}




console.log("Sugg", suggestions);

// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = document.querySelector("Input");
const suggBox = document.querySelector(".autocom-box");
const btnSearch = document.querySelector(".btn-search");
let linkTag =document.querySelector("a");
let webLink;
//if user press any key and release
inputBox.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    
    let emptyArray = [];
    if(userData){
        console.log("U Types: ",userData);
        btnSearch.onclick = ()=>{

            Search(userData);

            // webLink = `https://www.google.com/search?q=${userData}`;
            // linkTag.setAttribute("href", webLink);
            // linkTag.click();
        }

        emptyArray = suggestions.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            // return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
            return data.toLocaleLowerCase().includes(userData.toLocaleLowerCase());
        });

        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
        });

        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);

        let allList = suggBox.querySelectorAll("li");

        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
        searchedData=[];
        renderResults();
    }
}


function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    btnSearch.onclick = ()=>{

        Search(selectData);

        // webLink = `https://www.google.com/search?q=${selectData}`;
        // linkTag.setAttribute("href", webLink);
        // linkTag.click();
    }
    searchWrapper.classList.remove("active");
}


function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
}


function Search(searchThis)
{   
    
    searchThis = searchThis.split(" "); 
    
    console.log("SearchThis",searchThis);

    //it will chceck for name at 0 index if its not name at 0 index it must be symbol
    searchedData =  allCryptoData.filter((crypto) => crypto.name.toLocaleLowerCase() === searchThis[0].toLocaleLowerCase() );

    if(searchedData.length===0)
    {
        searchedData =  allCryptoData.filter((crypto) => crypto.symbol.toLocaleLowerCase() === searchThis[0].toLocaleLowerCase());
        if(searchedData.length===0)
        {
           console.log("Result Not Foiund") ;
           alert("Result Not Found");
        }       
    }

    console.log("SearchResults", searchedData);
    renderResults();

    
}
