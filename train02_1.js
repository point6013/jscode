var Cus_startRow = 1;
var Cus_selCol = 1;
var Cus_typeCol = 2;
var Cus_currCell = {};
var Cus_selDescArr = [];
var arr1 = [];
var Cus_type=[];
var Cus_selText = null;
var Cus_confirmed = false;
var Cus_sourceCol = 2;
var Cus_targetCol = 5;
var startRow = 1;
function Refresh(){
    spread.suspendPaint();

    var sheet2= spread.getSheet(1);
    var arr2 = sheet2.getArray(1, 0, sheet2.getRowCount(), 2);//获取第二sheet页的门店名称列
    arr2.forEach(row => {
        if (row[0]) {
            var temp=JSON.parse('{"'+row[0]+'":"'+row[1]+'"}')
            Cus_type.push(temp);
        }
    })
    var keys=''
    Cus_type.forEach(element=>{
        keys+=','+Object.keys(element)
    })
    var startRow = 1;
    var sheet1 = spread.getSheet(0);
    var endRow = sheet1.getRowCount();
    // 下拉列表的值用,隔开，注意是英文逗号
    var str = keys
    var spreadNS = GC.Spread.Sheets;
    var dv1 = new spreadNS.DataValidation.createListValidator(str); 
    for (var i = startRow; i < endRow; i++) { 
        sheet1.setDataValidator(i, 2, dv1); 
    } 



    //当单元格改变事件
    spread.bind(GC.Spread.Sheets.Events.ValueChanged, function (e, args) {
        debugger;
        if (args.col == 2) {
            spread.suspendPaint();
            args.cancel = true;
            Cus_currCell.row = args.row;
            Cus_currCell.col = args.col;
            //获取一下当前选择的值
            let Cus_typeId = args.sheet.getText(args.row, args.col);
            Cus_selText = null;
            var Cus_typevalue = '';
            for (let i = 0; i < Cus_type.length; i++) {
                if (Object.keys(Cus_type[i]) == Cus_typeId) {
                    Cus_typevalue = Object.values(Cus_type[i])[0]
                }
            }
            var sht = spread.getSheet(0);
            //选择事件触发后设置单价
            if (Cus_typevalue == null) {
                //设置为可编辑

            } else {
                //设置为只读
                sht.setValue(Cus_currCell.row, Cus_currCell.col + 3, Cus_id);
                sheet.getCell(Cus_currCell.row, Cus_currCell.col + 3).backColor("White"); //  区域底色变白
                sheet.getCell(Cus_currCell.row, Cus_currCell.col + 3).locked(true);  //  区域锁定
            }
            spread.resumePaint();
        }
    });
    


    // var sheet1 = spread.getSheet(0);
    // var endRow = sheet1.getRowCount();
    // var endCol =sheet1.getColumnCount();
    // 获取选择框的数据
    let sheet3 = spread.getSheet(2);
    var sheet3Name = sheet3.ITa.name;
    var arr2 = sheet3.getArray(1, 0, sheet3.getRowCount(), 2);//获取第三sheet页的门店名称列
    Cus_selDescArr = []
    debugger;
    arr2.forEach(row => {
        if (row[0]) {
            var temp=JSON.parse('{"'+row[1]+'":"'+row[0]+'"}')
            Cus_selDescArr.push(temp);
        }
    })
    debugger;
    //添加单元格编辑事件
    spread.bind(GC.Spread.Sheets.Events.CellDoubleClick, function (e, args) {
        if (args.col == Cus_selCol) {
            spread.suspendPaint();
            args.cancel = true;
            Cus_currCell.row = args.row;
            Cus_currCell.col = args.col;
            let text = args.sheet.getText(args.row, args.col);
            Cus_selText = null;
            $('#Cus_SelSearch').val(!text ? "" : text);
            $('#Cus_SelModal').modal('show');
            spread.resumePaint();
        }
    });
    //初始化model
    var modelDom = $(`<div class="modal fade text-center" id="Cus_SelModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div class="modal-dialog" style="display: inline-block;">
            <div class="modal-content" style="display: inline-block; max-width:600px; max-height:500px">
                <div class="modal-body">
                    <div class="form-group row">
                        <label class="col-form-label col-lg-2">Search</label>
                        <div class="col-lg-8">
                            <input id="Cus_SelSearch" type="text" class="form-control" autocomplete="off">
                        </div>
                        <button id="Cus_SelModal_btok" type="button" class="btn btn-outline bg-teal-400 text-teal-400 border-teal-400 border-1 legitRipple">OK</button>
                    </div>
                    <div class="table-responsive" style="width: 400px; height: 400px">
                        <table id="Cus_SelTable" class="table-xs table-hover text-left">
                            <tbody class="cursor-pointer">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal -->
    </div>`);
    $("#content").append(modelDom);
    $('#Cus_SelModal').on('shown.bs.modal', function () {
        Cus_initTable();
    });
    $('#Cus_SelModal').on('hidden.bs.modal', function () {
        $("#Cus_SelTable").find('tbody').html("");
        if (Cus_confirmed) Cus_fillCell(Cus_selText)
    });
    spread.resumePaint();
}

function BeforeSave(){
    return Cus_descToLabel();
}

function Cus_initTable(){
    $("#Cus_SelSearch").unbind();
    $("#Cus_SelSearch").bind("input propertychange",function(){
        let value = $(this).val().toString().toUpperCase();
        Cus_createTable(value);
    });
    $("#Cus_SelModal_btok").unbind();
    $("#Cus_SelModal_btok").click(function () {
        Cus_confirmed = true;
        $('#Cus_SelModal').modal('hide');
    });
    let value = $("#Cus_SelSearch").val().toString().toUpperCase();
    Cus_createTable(value);
}
function Cus_fillCell(str){
    if (str){
      	// var sht = spread.getSheet(0);
        // sht.setValue(Cus_currCell.row, Cus_currCell.col, str);  
        var cm = spread.commandManager(); 
        var sheet = spread.getSheet(0);
        cm.execute({cmd: "editCell", row:Cus_currCell.row, col:Cus_currCell.col, newValue: str, sheetName: sheet.name()});
    }
}
function Cus_createTable(value){
    let table = $("#Cus_SelTable").find('tbody');
    table.html("");
    let rowArr = []
    var k = 0;
    for (let i = 0; i < Cus_selDescArr.length; i++){
        if (!value ||Object.values(Cus_selDescArr[i])[0].toString().toUpperCase().indexOf(value) > -1){
            k += 1;
            rowArr.push("<tr><td>" + Object.values(Cus_selDescArr[i])[0] + "</td><td class='text-muted'></td><tr>")
        }
    }
    table.html(rowArr.join(""));
    if (k === 1){
        Cus_selectItem(table.find('tr'));
    }
    $("#Cus_SelTable").find('tr').click(function(){
        Cus_selectItem($(this));
    });
    $("#Cus_SelTable").find('tr').dblclick(function(){
        Cus_selectItem($(this));
        Cus_confirmed = true;
        $('#Cus_SelModal').modal('hide');
    });
    Cus_confirmed = false;
}
function Cus_selectItem(tr){
    tr.parent().parent().removeClass("table-hover");
    tr.parent().find('tr').removeClass('bg-teal-400');
    tr.parent().find('i').remove();
    let td1 = $(tr.find("td")[0]);
    let td2 = $(tr.find("td")[1]);
    Cus_selText = td1.text();
    var Cus_id='';
    for (let i = 0; i < Cus_selDescArr.length; i++){
        if(Object.values(Cus_selDescArr[i])==Cus_selText){
            Cus_id=Object.keys(Cus_selDescArr[i])[0]
        }
    }
    var sht = spread.getSheet(0);
    sht.setValue(Cus_currCell.row, Cus_currCell.col-1, Cus_id);  
    //方法二：vlook函数区域公式
    tr.addClass('bg-teal-400');
    td2.html('<i class="text-white icon-checkmark3 icon text-default mr-1">');
}



function Cus_descToLabel(){
    spread.suspendPaint();
    var res = true;
    // var ads = "";
    var text = "";
    var sheet = spread.getSheet(0);
    var rowCount = sheet.getRowCount();
    // var arr = [];

    // var colWord = cfs.common.getColWord(Cus_selCol);
    // var firstFitRow = null;
    for (let i = Cus_startRow; i < rowCount; i++){
        text = sheet.getText(i, Cus_selCol);
        if (text){
            debugger;
            let index = Cus_selDescArr.indexOf(text);
            if (index == -1){
                let rg = sheet.getRange(i, Cus_selCol);
                rg.backColor("#f2dedf");
                // ads = colWord + (i + 1);
                res = false;
                // if (!firstFitRow) firstFitRow = i;
            }
        }
    }
    let arr2 = []
    arr1.forEach(row => {
        if (row[0]) {
            arr2.push(row[0]);
        }
    })
    for (let i = Cus_startRow; i < rowCount; i++){
        text = sheet.getText(i, Cus_typeCol);
        if (text){
            let index = arr2.indexOf(text);
            if (index == -1){
                let rg = sheet.getRange(i, Cus_typeCol);
                rg.backColor("#f2dedf");
                // ads = colWord + (i + 1);
                res = false;
                // if (!firstFitRow) firstFitRow = i;
            }
        }
    }
    if (!res) {
        ForSwal("存在无效数据，请检查填写！");
        // sheet.setActiveCell(firstFitRow, Cus_selCol);
        //var r = sheet.getCellRect(firstFitRow, Cus_selCol);
        //var v = sheet.getViewportBottomRow(1);
    }
    spread.resumePaint();
    return res;
}