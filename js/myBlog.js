 
 /*****************************Add hyperlink**********************************/
function addLink() {    

    var sel = window.getSelection().getRangeAt(0);    
    var selString=sel.toString();

    var spanTag = document.createElement("span");
    var userLink=prompt("Enter URL:","");
        selString= selString.link(userLink);
        spanTag.innerHTML=selString;
        sel.deleteContents();
        sel.insertNode(spanTag);
  }
/*****************************Add hyperlink**********************************/


function getImage(){
 
  var userLink=prompt("Enter URL:","");
   if(userLink!=""){
    var mydiv = document.getElementById("text1");
    var img = document.createElement("img");
    img.src = userLink
    mydiv.appendChild(img);
  }
}

  
  /*****************************Change Foreground color******************************/
  function testColor(){
      document.getElementById("myColor").click();
  }

  function changeColor(){      
    var newColor=document.getElementById("myColor").value;   
    document.execCommand("styleWithCSS", false, true);
    document.execCommand("foreColor",false,document.getElementById("myColor").value);
  }

 /*****************************Save Blog********************************************/
  function saveBlog(){

    if(typeof(Storage)==undefined)
        document.getElementById("result").innerHTML="Your browser does not support local storage";

    var myArticle=document.getElementById("text1").innerHTML;
    var myTitle=document.getElementById("title1").value;
    var myObject={title1:myTitle,article1:myArticle} ;
    
    var myKey=new Date();   
    localStorage.setItem(myKey.getTime(),JSON.stringify(myObject));
    openList();

}

/*****************************List All the Blogs********************************************/
function getAllBlogs(){
    
     if(typeof(Storage)==undefined)
         document.getElementById("result").innerHTML="Your browser does not support local storage";

    var rowCount=0,colCount=0;
      document.getElementById("static").addEventListener("click",viewBlog);
      rowCount++;
      colCount++;
            
   for(let i=0; i<localStorage.length;i++)
   {

    var item=localStorage.key(i);
    var myObject=JSON.parse(localStorage.getItem(item));  

    var myDiv= document.getElementById("myRow");
    var newDiv = document.createElement("div");
    var textNode = document.createTextNode(myObject.title1);
    newDiv.appendChild(textNode);
    newDiv.classList.add("viewDiv","col-3");
    newDiv.innerHTML= "<h2>" + newDiv.innerHTML + "</h2><br>" + myObject.article1;
    
    newDiv.addEventListener('click',viewBlog);
    myDiv.appendChild(newDiv);  

    var spanTag=document.createElement("span");
    textNode=document.createTextNode(item);
    spanTag.appendChild(textNode);
    newDiv.appendChild(spanTag);
    spanTag.classList.add("viewKey");
    spanTag.style.display='none';

   }
 }
 
 /********************Save the local storage key of selected blog*************************/
 function viewBlog(){ 
    localStorage.setItem("selBlog",JSON.stringify(this.innerHTML));
    var myframe= parent.document.getElementById("myFrame");
    myframe.src="viewBlog.html";
 }


 /*****************************View selected Blog******************************************/ 
 function loadData(){
    document.getElementById("myDiv1").innerHTML = JSON.parse(localStorage.getItem("selBlog")); 
    localStorage.removeItem("selBlog");
 }

 /*****************************Delete selected blog******************************************/ 
  function deleteBlog(){
    var myKey=document.getElementsByClassName("viewKey")[0].innerHTML;
    localStorage.removeItem(myKey);
    openList();
  }

/*****************************Open List Blog html******************************************/ 
 function openList(){
    var myframe= parent.document.getElementById("myFrame");
    myframe.src="listBlog.html";
 }

