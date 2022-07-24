// ****** Global Variable **********
// tìm tới thẻ form lớn
const form = document.querySelector(".grocery-form");
// tìm tới thẻ p.alert để hiện thông báo
const alertElement = document.querySelector(".alert");
// tìm tới thẻ input#grocery
const grocery = document.getElementById("grocery");
// tìm tới thẻ button Submit
const submitBtn = document.querySelector(".submit-btn");


// tìm tới thẻ chứa danh sách và btn Clear
const container = document.querySelector(".grocery-container");
// tìm tới thẻ  danh sách Item
const list = document.querySelector(".grocery-list");
// tìm tới btn Clear
const clearBtn = document.querySelector(".clear-btn");
// tạo một Object mảng Item để lưu giá trị các item
const itemList = new ItemList();

// ????
let editFlag = false; // ????
let editID = ""; // ????

// ****** Call function **********
// đoán : lấy dữ liệu từ local hiển thị lên trên form
getLocalStorage();
// click btn Submit để thêm Item vào danh sách list
// submitBtn.addEventListener("click", function(e){
//     e.preventDefault(); // ???? 
//     if(!editFlag){

//         addItem();
//     }else{
//         editItem();
//     }
// });
// phải truyền tham số e vào function
submitBtn.onclick = function(e){
    e.preventDefault(); // ???? 
    if(!editFlag){
        // nếu editflag có giá trị là true thì thực hiện hàm thêm item
        addItem();
    }else{
        // nếu editlag có giá trị là false thì thực hiện hàm edit item
        editItem();
    }
}






// ****** Functions **********
// hàm này dùng để thêm item
function addItem() {
  

    var value = grocery.value; //  lấy giá trị người dùng nhập vào từ form

    // Ý nghĩa dòng code bên dưới : tạo 1 biến có tên id và dùng hàm Date().getTime() để lấy làm id
    // hàm này sẽ trả về 1 số là số mili giây tính từ 1/1/1970 và có kiểu dữ liệu là number . 
    // dùng hàm toString() để biến kiểu dữ liệu số thành kiểu dữ liệu string
    var id = new Date().getTime().toString(); 
    // ý nghĩa câu lệnh bên trong hàm if : 
    // hàm trim() hay còn gọi là trim method sẽ ngắt bỏ tất cả phần dấu cách 2 đầu của một chuỗi . 
    // Ý nghĩa của câu lệnh này value.trim() !== "" là kiểm tra xem nếu người dùng nhập thì mới thực hiện bên trong hàm if. Nếu người dùng không nhập thì thì dùng hàm đã tạo tên là displayAlert() để hiện thông báo cho người dùng
    if(value.trim() !== "" ){
        // dựa vào Class Item đã tạo để tạo một instance của Class và gán vào biến item. lúc này item là 1 object có 2 property là id và value
        var item = new Items(id, value);
        // sau đó dùng method addItem của lớp Itemlist để thêm object vào mảng
        itemList.addItemMethod(item);
        // sau đó đẩu mảng của object Itemlist đc tạo global từ Class ItemList vào local Storage
        setLocalStorage(itemList.list); 
        // sau đó sử dụng hàm showItem() để hiện thị ra màn hình Item vùa thêm
        showItems();
        //
        resetForm() ; 
        displayAlert("Item added", "success");
        if(!container.classList.contains("show-container")){
            container.classList.add("show-container");
        }

    }else{
        displayAlert("please enter value", "danger");
    }
}
// hàm này dùng để hiện thị item lên trên giao diện
function showItems() {
    var content = "";
    // ?? 
    itemList.list.map(function (item) { // map ??? 
        content += `
                <div data-id="${item.id}"  class="grocery-item">
                    <p class="title">${item.value}</p>
                    <div class="btn-container">
                    <!-- edit btn -->
                    <button onclick="getItem('${item.id}')" type="button" class="edit-btn">
                        <i class="fas fa-edit"></i>
                    </button>
                    <!-- delete btn -->
                    <button onclick="deleteItem('${item.id}')" type="button" class="delete-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                    </div>
                </div>
                
            `;
    });


    list.innerHTML = content;
}
// hàm này dùng để xóa item
function deleteItem(id) {
    itemList.deleteItemMethod(id);
    setLocalStorage(itemList.list);
    showItems();
    displayAlert("item removed", "danger");
}
// hàm nay dùng để lấy ra 1 item
function getItem(id){
    let item = itemList.getItemMethod(id);
    grocery.value = item.value;
    submitBtn.innerHTML ="Edit";
    editFlag = true;
    editID = item.id;
}
// hàm này dùng để edit 1 item
function editItem(){
    var newValue = grocery.value ;

    if(newValue.trim() !== ""){

        itemList.editItemMethod(editID,newValue);
        setLocalStorage(itemList.list);
        showItems();
        resetForm();
        displayAlert("value changed", "success");
    }else {
        displayAlert("please enter value", "danger");
    }

}
// hàm này dùng để reset form
function resetForm(){
    form.reset();
    submitBtn.innerHTML ="Submit";
    editFlag = false;
    editID = "";
}
// ấn button item sẽ thực hiện hàm clearItem để xóa hết tất cả các item
clearBtn.addEventListener("click",clearItems);
function clearItems() {
   
    displayAlert("empty list", "danger");
    resetForm();
    localStorage.removeItem("GroceryList");
    getLocalStorage();
    container.classList.remove("show-container");
}
// hàm này dùng để hiện thị thông báo lên trên giao diện khi thực hiện 1 hành động nào đó như thêm sửa xóa clear
function displayAlert(text, action) {
    alertElement.innerText = text;
    alertElement.classList.add(`alert-${action}`);
    // remove alert
    setTimeout(function () {
        alertElement.innerText = "";
        alertElement.classList.remove(`alert-${action}`);
    }, 1000);
}



// ****** local storage **********
//2 Hàm này giúp lưu dữ liệu vào local storage
function setLocalStorage(arr) {

    localStorage.setItem("GroceryList", JSON.stringify(arr));

}

function getLocalStorage() {
    itemList.list = localStorage.getItem("GroceryList") ? JSON.parse(localStorage.getItem("GroceryList")) : [];
    showItems();
}
// var time = new Date().getTime() ; 
// console.log(time , typeof(time)) ; 
// console.log(time.toString() , typeof(time.toString())) ; 
// var arr  = [
//     ob1 = {
//         name : "name1" , 
//         age : "age1" ,
//         career : "career1"
//     } ,
//     ob2 = {
//         name : "name2" , 
//         age : "age2" ,
//         career : "career2"
//     } ,
//     ob3 = {
//         name : "name3" , 
//         age : "age3" ,
//         career : "career3"
//     } ,
//     ob4 = {
//         name : "name4" , 
//         age : "age4" ,
//         career : "career4"
//     }

    
// ] ; 
// setLocalStorage(arr) ; 
