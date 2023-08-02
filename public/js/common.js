
    $(document).ready(function(){
        $("#myTable td").click(function() {
           
            removeControl(this);
           
           
        });
        setCookie('key',Math.floor(Math.random() * 1000),1)
        setInterval(()=>{
            apiCall();
        },200000)
    });

    function apiCall(){
        $.ajax({

            url : 'http://localhost:3000/checkControl?userId='+getCookie('key'),
            type : 'GET',
            success : function(data) {  

                ColorTable(data.grid)
                if(data.user===getCookie('key') && data.using){
                    $ ('table').css ('pointer-events', 'auto');

                } else{
                    $ ('table').css ('pointer-events', 'none');

                }
                if(data.user==='' && !data.using){
                    $ ('button').css ('pointer-events', 'auto');

                }
                else if(data.user===getCookie('key') && !data.using){
                    $ ('button').css ('pointer-events', 'none');
                } 
                if(data.currentUser===getCookie('key')){
                    document.getElementById('result').innerHTML = "You are having control"
                } else if(data.currentUser!=='' && data.currentUser!==getCookie('key')){
                    document.getElementById('result').innerHTML = "Another user having control"

                }
                else{
                    document.getElementById('result').innerHTML = "No user Has control"

                }
            },
            error : function(request,error)
            {
                console.log(error);
            }
        });
    }
    function takeControl(){
        $.ajax({

            url : 'http://localhost:3000/takeControl',
            type : 'POST',
            data: {
                userID:getCookie('key'),
            },
            success : function(data) {              
            },
            error : function(request,error)
            {
               
            }
        });
    }
    function removeControl(id){
        $.ajax({

            url : 'http://localhost:3000/removeControl',
            type : 'POST',
            data: {
                userID:getCookie('key'),
            },
            success : function(data) {    
            setGridColor(id,data)        
               switch($(id).attr('class')){
                case data:
                    $(id).removeClass(data);
                    break;
                  default:
                    $(id).addClass(data);
                    break;
                         
            }
            },
            error : function(request,error)
            {
            }
        });
    }
    function setGridColor(id,color){
        $.ajax({

            url : 'http://localhost:3000/setGridColor',
            type : 'POST',
            data: {
                gridId:parseInt($(id).text().trim()),
                color:color,
            },
            success : function(data) {              
              
            },
            error : function(request,error)
            {
                console.log(error,'error')
            }
        });
    }
    function ColorTable(data) {
        let myTable = document.getElementById('myTable');
        let cells = myTable.querySelectorAll('td');
        cells.forEach( (cell,index) =>   $(cell).addClass(data[index+1]));
       }
    function setCookie(cname, cvalue, exdays){
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    function getCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }