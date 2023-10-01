

function API(url , success , data , reload = false , type = 'POST') {
    $.ajax({
        url , 
        type , 
        data ,
        success : (res) => {
            if(reload) {
                window.location.reload();
            }else{
                $(`#${success}`).html(res)
            }
            
        },
        error : (err) => {
            console.log(err.responseJSON.message);
        }
    })
}
function addToCart(pro_id) {
    API('api/add-to-cart' , 'products' , {pro_id} , false)
}
function removeFromCart(id) {
    API('api/remove-from-cart' , 'sfs' , {id} , true)
}
function checkout() {
    const name = $('#name').val()
    const ad = $('#address').val()
    const phone = $('#phone').val() 
    const msg= JSON.parse(localStorage.getItem('usercart'));

    if(name == '' || ad == '' || phone == ''){
        Swal.fire(
            'خطأ' ,
            'كل الخاناة ضرورية',
            'error'
          )
    }else{
        console.log(ad);
        var params={
            name: name,
            address: ad,
            phone:phone,
            message:msg,
        }
        const serviceId="service_8lmpsy9";
        const tmp="template_xki8eud";
          emailjs.send(serviceId,tmp,params).then(
         Swal.fire(
            'مبروك تم الشراء بنجاح',
            'تم ارسال المعلومات بنجاح',
           'success'
        )
          ).catch(err=>console.log(er))
       
         
    }

}
function login() {
    const key = $('#key').val();
    API('/api/admin-login' , 'login-backup' , {key} , false);
}
function deleteOrder(id) {
    API('/api/remove-order' , 'l' , {id} , true);
}
function block(token) {
    API('/api/block-user' , 'l' , {token} , true);
}
function block(token) {
    API('/api/block-user' , 'l' , {token} , true);
}

let arr=[];

function AddToCart(name,e){
    arr.push(name);
    if(arr.length<4){

    
    localStorage.setItem('usercart', JSON.stringify(arr));
    let items = JSON.parse(localStorage.getItem('usercart'));
    $(e).attr('disabled','disabled');
    if(items.length < 3)
    {
        document.getElementById('aff').innerHTML= '<p style=" margin-bottom: 0%;display: flex; justify-content: center;color: black;">يجب ان تحتوي سلتك على 3 عطور</p><p style="color: black;display: flex; justify-content: center;">   تحتوي سلتك الان على'+ items.length + ' عطور</p>'
    }
    else
    {
        document.getElementById('aff').innerHTML= '<div style="margin-top: 2%; display: flex;justify-content: center;text-align: center;"><button class="days"  style=" border: none;margin: 0 ; padding : 5px 15px; background:#f15d30; color : white ; text-align: center; font-weight : 400; width: auto;"><a href="cart.html" style="color: white;"> مشاهدة السلة</a></button><span style="color: black;margin-left: 2%; margin-top: 0.5%;">   سلتك مكتملة  </span></div>'

    }
}
}
function getCartItems()
{
    let items = JSON.parse(localStorage.getItem('usercart'));
     let cpt=0;
    for(let i=0; i<items.length; i++)
    {
       
        if(items[i]!=null)
        {
        cpt+=1;
        document.getElementById("products").innerHTML+=' <div  style="display: flex; width : 100%; margin : 15px 0 ; align-items : center ; justify-content : space-between ; "><img width="150px"  src="img/'+items[i]+'.jpg" alt=""><span style="font-size: 15px; color : black;">'+items[i]+'</span><button onclick="removeFromCart('+items[i]+')" style="border: none;width : 60px; height : 60px; color : white ; background : #f15d30; display : flex; justify-content : center ; align-items:  center ; font-size : 30px;">&times;</button></div>';
        }
        if(cpt==3)
        {
        document.getElementById("products").innerHTML+='<a href="checkout.html" style="position: absolute;bottom: 0;margin-bottom:3%; margin-top : 15px;margin-left:0%;width : 80%; padding : 5px 0; background:#f15d30; color : white ; text-align: center; font-weight : 400;">اتمام الطلب</a>';
        }

    }    
}
function removeFromCart(a){
    let items = JSON.parse(localStorage.getItem('usercart'));
    for(let i=0; i<items.length; i++)
    {
        if(items[i]==a){
            delete items[i];
            localStorage.setItem('usercart', JSON.stringify(items));
            location.reload();
       } 
       
    }
}