function ItemList(){
    // mảng chứa danh sách Item
    this.list = [];
    // method thêm item cho mảng
    this.addItemMethod = function(itemObj){
        this.list.push(itemObj);
    }
    // method tìm vị trí Index của item 
    this.findIndexMethod = function(id) {
        var indexItem = -1;
        // map method để duyệt mảng(chưa học tới)
        this.list.map(function(item,index) {
            if(item.id === id){
                indexItem = index;
            }
        });

        return indexItem;
    }
    // tìm và xóa Item theo thuộc tính id
    this.deleteItemMethod = function(id) {
        // đàu tiên sẽ tìm xem Item có id cần tìm nằm ở vị trí nào bằng method findInderMethod
        var indexItem = this.findIndexMethod(id);
        
        if(indexItem > -1){
            // Nếu tìm thấy thì sẽ thực thực hiện xóa phần tử có index tương ứng trong mảng
            this.list.splice(indexItem,1);
        }else{
            // nếu không tìm thấy thì hiện thông báo không thể xóa 
            alert("Can't delete item");
        }
    }
    // method tìm Item xem có trong list hay ko
    this.getItemMethod = function(id) {
        // trả về index của Item muốn tìm
        var indexItem = this.findIndexMethod(id);

        if(indexItem > -1){
            // nếu item muốn tìm tồn tại thì sẽ trả về Item Object tương ứng vs các thuộc tính đi kèm
            return this.list[indexItem];
        }else{
            // nếu ko tìm thấy item mong muốn sẽ báo ra màn hình là ko tìm thấy
            alert("Can't get item");
        }
    }
    // method sửa thông tin Item
    this.editItemMethod = function(id,value){
        // truyền vào method 2 thuộc tính của Item là id và value
        var indexItem = this.findIndexMethod(id);
        // Nếu tìm thấy index thì sửa thuộc tính value của Object
        if(indexItem > -1){

            this.list[indexItem].value = value;
        }else{
            alert("Can't edit item");
        }
    }


}