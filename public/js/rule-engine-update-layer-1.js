

$(function () {
    $('.closesMessage').click(function (e) {
        $('.topMessageRow').fadeOut('fast');
        //window.location.href="/headless/liquidationlist";
    });
});

function getallowedActions(tablenum, obj) {
    var tableno = tablenum //parseInt($("#indexValue").val()-1);        
    var fieldFor = '';
    fieldFor = $('#fieldForWhenRule_' + tableno).val();
    //alert(fieldFor);
    var nameSpace = $('#customObjects').val();
    if (fieldFor == 'Custom Code') {

    } else {
        var chooseField = $('#ChooseField_' + tableno + '_' + obj).val();
        //alert(fieldFor)
        var choosenFun = $('#allFunctions_' + tableno + '_' + obj).val();
        //alert('CHOOSEN FUN='+choosenFun);

        if (fieldFor == 'Function Call' || (typeof choosenFun!='undefined' && choosenFun!='')) {
            
            //alert(choosenFun);
            var loopingOn=[];
            if(typeof PClevel.jupiterMetaData.result.field[fieldFor]!='undefined'){
                console.log('VALUE HERE==',PClevel.jupiterMetaData.result.field[fieldFor])
                loopingOn=PClevel.jupiterMetaData.result.field[fieldFor].methods;
            }else{
            loopingOn = PClevel.jupiterMetaData.result.methods;
            }
             console.log('loopingOn value is=',loopingOn);
            
            $('#browt_condition_' + tableno + '_' + obj).empty();
            $.each(loopingOn, function (i, item) {
                if (item.name == choosenFun) {
                    if (item.allowedActions != undefined) {
                        $('#condition_' + tableno + '_' + obj).show();
                        $('#browt_condition_' + tableno + '_' + obj).append("<option value=''>");
                        $.each(item.allowedActions, function (j, items) {
                            $('#browt_condition_' + tableno + '_' + obj).append('<option value="' + items + '">' + items + '</option>');
                        });
                    } else {
                        $('#condition_' + tableno + '_' + obj).show();
                        $('#browt_condition_' + tableno + '_' + obj).append('<option value="">NA</option>');
                    }
                } else {
                    $('#condition_' + tableno + '_' + obj).show();
                    $('#browt_condition_' + tableno + '_' + obj).append('<option value="">NA</option>');
                }
            });
        } else {
           
            if (fieldFor == 'Field Call') {
                
                var loopingOnActions = Object.values(PClevel.jupiterMetaData.result.field[chooseField].allowedActions)
                $('#browt_condition_' + tableno + '_' + obj).empty();
                $('#browt_condition_' + tableno + '_' + obj).append("<option value=''>");
                $.each(loopingOnActions, function (i, item) {
                    $('#browt_condition_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
                });
                var dataType = PClevel.jupiterMetaData.result.field[chooseField].datatype;
                // alert(dataType)
                $('#dataTypeOfField_' + tableno + '_' + obj).val(dataType);

            } else {
             
                if (chooseField != '' && fieldFor != '' && nameSpace != '' && typeof chooseField != 'undefined' && typeof fieldFor != 'undefined' && typeof nameSpace != 'undefined') {

                    $.ajax({
                        method: "GET",
                        url: '/jupiter/get-jupiter-allowedActions?field=' + chooseField + '&fieldFor=' + fieldFor + '&nameSpace=' + nameSpace,
                    }).done(function (res) {
                        console.log("============ getallowedActions ajax Response ==========");
                        $('#dataTypeOfField_' + tableno + '_' + obj).val(res.dataType);
                        var j = 0
                        $('#browt_condition_' + tableno + '_' + obj).empty();
                        $('#browt_condition_' + tableno + '_' + obj).append("<option value=''>");
                        $.each(res.allowedActionArr, function (i, item) {
                            if (item != '') {
                                $('#browt_condition_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
                            }
                        });
                    });

                }
            }
        }
    }




}





$(".up,.down").click(function () {
    var row = $(this).parents("tr:first");
    console.log('row here', row);
    if ($(this).is(".up")) {
        row.insertBefore(row.prev());
    } else {
        row.insertAfter(row.next());
    }
});




function addMoreRule(tablnum) {
    var tableno = ''
    if (tablnum != '') {
        tableno = parseInt(tablnum);
    } else {
        tableno = parseInt($('#indexValue').val() - 1)
    }
    let rowCount = parseInt($('#totalRules_' + tableno).val());
    if (rowCount > 0) {
        rowCount = rowCount - 1;
    }

    if ($('#operator_' + tableno + '_' + rowCount).val() == '') {
        alert("Please select an operator");
        $('#operator_' + tableno + '_' + rowCount).focus();
        $('#operator_' + tableno + '_' + rowCount).addClass("err");
        return false;
    } else {
        $('#operator_' + tableno + '_' + rowCount).removeClass("err");
    }

    if ($('#ChooseField_0' + rowCount).val() == '') {
        alert("Please select a Field Name");
        $('#ChooseField_0' + rowCount).focus();
        $('#ChooseField_0' + rowCount).addClass("err");
        return false;
    } else {
        $('#ChooseField_0' + rowCount).removeClass("err");
    }

    var nextRow = (rowCount + 1)
    var isCustomCodeExist=$('#customCodeFieldLevel_'+tableno+'_'+nextRow).val();

    //alert(isCustomCodeExist)
    if(typeof isCustomCodeExist != 'undefined' && isCustomCodeExist!=''){
       // alert('insidee');
        nextRow=nextRow+1; 
    }

    let rowfyable = $('#tableaddRecorder_' + tableno).closest('table');
    var rowId = "tableRow_" + tableno + "_" + rowCount;
    //alert(rowId)
    // let lastRow = $("#tableaddRecorder_" + tableno + " tbody tr").last().clone();
    let lastRow = $("#" + rowId).clone();

    var newHtmlText1 = '<tr id="' + rowId + '">' + lastRow.html().replace("ChooseField_" + tableno + "_" + rowCount, "ChooseField_" + tableno + "_" + nextRow) + '</tr>';
    var newHtmlText2 = newHtmlText1.replace("OpeningBrackets_" + tableno + "_" + rowCount, "OpeningBrackets_" + tableno + "_" + nextRow);
    var newHtmlText3 = newHtmlText2.replace("ruleValue_" + tableno + "_" + rowCount, "ruleValue_" + tableno + "_" + nextRow);
    var newHtmlText4 = newHtmlText3.replace("condition_" + tableno + "_" + rowCount, "condition_" + tableno + "_" + nextRow);
    var newHtmlText5 = newHtmlText4.replace("operator_" + tableno + "_" + rowCount, "operator_" + tableno + "_" + nextRow);
    var newHtmlText6 = newHtmlText5.replace("getallowedActions(" + tableno + "," + rowCount + ")", "getallowedActions(" + tableno + "," + nextRow + ")");
    var newHtmlText7 = newHtmlText6.replace("remove_" + tableno + "_" + rowCount, "remove_" + tableno + "_" + nextRow);
    var newHtmlText8 = newHtmlText7.replace("browt_ChooseField_" + tableno + "_" + rowCount, "browt_ChooseField_" + tableno + "_" + nextRow);
    var newHtmlText9 = newHtmlText8.replace("ChooseField_" + tableno + "_" + rowCount, "ChooseField_" + tableno + "_" + nextRow);
    var newHtmlText10 = newHtmlText9.replace("fieldFor_" + tableno + "_" + rowCount, "fieldFor_" + tableno + "_" + nextRow);
    var newHtmlText11 = newHtmlText10.replace("browt_condition_" + tableno + "_" + rowCount, "browt_condition_" + tableno + "_" + nextRow);
    var newHtmlText12 = newHtmlText11.replace("CartAndStatement_" + tableno + "_" + rowCount, "CartAndStatement_" + tableno + "_" + nextRow);
    var newHtmlText13 = newHtmlText12.replace("StatementCart_" + tableno + "_" + rowCount, "StatementCart_" + tableno + "_" + nextRow);
    var newHtmlText14 = newHtmlText13.replace("browt_Conditions_" + tableno + "_" + rowCount, "browt_Conditions_" + tableno + "_" + nextRow);
    var newHtmlText15 = newHtmlText14.replace("browt_Conditions_" + tableno + "_" + rowCount, "browt_Conditions_" + tableno + "_" + nextRow);
    var newHtmlText16 = newHtmlText15.replace("ClosingBrackets_" + tableno + "_" + rowCount, "ClosingBrackets_" + tableno + "_" + nextRow);
    var newHtmlText17 = newHtmlText16.replace("changeCartStatementObjectField('" + rowCount + "')", "changeCartStatementObjectField('" + nextRow + "')");
    var newHtmlText18 = newHtmlText17.replace("condition_" + tableno + "_" + rowCount, "condition_" + tableno + "_" + nextRow);
    var newHtmlText19 = newHtmlText18.replace("allFunctions_" + tableno + "_" + rowCount, "allFunctions_" + tableno + "_" + nextRow);
    var newHtmlText20 = newHtmlText19.replace("FunctionClsDrop_" + tableno + "_" + rowCount, "FunctionClsDrop_" + tableno + "_" + nextRow);
    var newHtmlText21 = newHtmlText20.replace("ChooseFieldCls_" + tableno + "_" + rowCount, "ChooseFieldCls_" + tableno + "_" + nextRow);
    var newHtmlText22 = newHtmlText21.replace("browt_AllFunction_" + tableno + "_" + rowCount, "browt_AllFunction_" + tableno + "_" + nextRow);
    var newHtmlText23 = newHtmlText22.replace("browt_AllFunction_" + tableno + "_" + rowCount, "browt_AllFunction_" + tableno + "_" + nextRow);
    var newHtmlText24 = newHtmlText23.replace("tableRow_" + tableno + "_" + rowCount, "tableRow_" + tableno + "_" + nextRow);
    var newHtmlText25 = newHtmlText24.replace("removeRuleRow(" + tableno + "," + rowCount + ")", "removeRuleRow(" + tableno + "," + nextRow + ")");
    var newHtmlText26 = newHtmlText25.replace("functionParameter_" + tableno + "_" + rowCount, "functionParameter_" + tableno + "_" + nextRow);
    var newHtmlText27 = newHtmlText26.replace("templateDropDown_" + tableno + "_" + rowCount, "templateDropDown_" + tableno + "_" + nextRow);
    var newHtmlText28 = newHtmlText27.replace("operator_" + tableno + "_" + rowCount, "operator_" + tableno + "_" + nextRow);
    var newHtmlText29 = newHtmlText28.replace("setvalueForTemplate(" + tableno + "," + rowCount + ")", "setvalueForTemplate(" + tableno + "," + nextRow + ")");
    var newHtmlText30 = newHtmlText29.replace("dataTypeOfField_" + tableno + "_" + rowCount, "dataTypeOfField_" + tableno + "_" + nextRow);
    var newHtmlText30 = newHtmlText30.replace("addrulebutton_" + tableno + "_" + rowCount, "addrulebutton_" + tableno + "_" + nextRow);
    var newHtmlText30 = newHtmlText30.replace("templateVariableSymbol_" + tableno + "_" + rowCount, "templateVariableSymbol_" + tableno + "_" + nextRow);
    var newHtmlText30 = newHtmlText30.replace("templateVariableSymbolData_" + tableno + "_" + rowCount, "templateVariableSymbolData_" + tableno + "_" + nextRow);
    



    var newHtmlText31 = newHtmlText30.replace("display: none;", "");
    var newHtmlText32 = newHtmlText31.replace("getallowedActions(" + tableno + "," + rowCount + ")", "getallowedActions(" + tableno + "," + nextRow + ")");
    // $("#tableaddRecorder_" + tableno + " tbody").append(newHtmlText32);
    $("#tableaddRecorder_" + tableno).append(newHtmlText32);

    
    document.getElementById("totalRules_" + tableno).value = nextRow + 1;

    $("#ChooseField_" + tableno + "_" + nextRow).val('');
    $("#ruleValue_" + tableno + "_" + nextRow).val('');
    $("#condition_" + tableno + "_" + nextRow).val('');
    $("#operator_" + tableno + "_" + nextRow).val('');
    $(".FunctionClsDrop_" + tableno + "_" + nextRow).hide();
    $(".ChooseFieldCls_" + tableno + "_" + nextRow).show();
    $(".templateVariableSymbolData_" + tableno + "_" + nextRow).hide();
    if (nextRow > 0) {
        $("#remove_" + tableno + "_" + rowCount).show();
        $("#addrulebutton_" + tableno + "_" + rowCount).remove();
    }
    $("#remove_" + tableno + "_" + nextRow).hide();
    var optionSelected = $('#addfieldfunction').val();
    if (optionSelected == 'field') {
        $("#functionParameter_" + tableno + "_" + nextRow).prop("readonly", true);
        $("#functionParameter_" + tableno + "_" + nextRow).attr("placeholder", "NA");
    }
   // changeCustomObjectFieldaddMore(nextRow, tableno);
}




function changeposition() {
    var row = $(this).parents("tr:first");
    console.log('row here', row);
    if ($(this).is(".up")) {
        row.insertBefore(row.prev());
    } else {
        row.insertAfter(row.next());
    }
}



function addnewtable_OLD() {
    var totalSep = $("#indexValue").val();
    var tableno = parseInt(totalSep);
    var newRow = parseInt(totalSep);
    var idCount = 0;
    var sepHtml = '';


    sepHtml += '<table class="table table-vcenter table-mobile-md card-table" id="tableaddRecorder_' + tableno + '" style="border: 1px solid #c2c2c2;margin-top:20px;">';
    sepHtml += '<thead>';
    sepHtml += '<tr class="tableHead_' + tableno + '">';
    sepHtml += '<th id="tableHeadRow_' + tableno + '" colspan="6" width="95%">';
    sepHtml += '<input type="hidden" id="fieldForWhenRule_' + tableno + '" name="fieldForWhenRule[]" value=""/>'
    sepHtml += '<input type="hidden" id="whenTableIds_' + tableno + '" name="whenTableIds[]" value="' + tableno + '"/>'
    sepHtml += '<span class="FieldsHeading_' + tableno + ' hide">';
    sepHtml += '<b>Fields</b>';
    sepHtml += '</span>';

    sepHtml += '<span class="FunctionsHeading_' + tableno + ' hide">';
    sepHtml += '<b>Functions</b>';
    sepHtml += '</span>';

    sepHtml += '<span id="thheadSecondary_' + tableno + '_0" data-bs-toggle="modal" data-bs-target="#modal-ForFieldsLevel" class="btn--primary links" style="text-transform:uppercase;" type="button" onclick="fieldModelPopUpInbetween(' + tableno + ');"></span>';
    sepHtml += '</th>';
    sepHtml += '<th width="5%">';
    sepHtml += '<span id="remove_' + tableno + '" onclick="removeRuleTable(' + tableno + ')">';

    sepHtml += '<svg width="24" height="24" fill="#aa1818" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m3.707-11.707a.999.999 0 0 0-1.414 0L10 8.586 7.707 6.293a.999.999 0 1 0-1.414 1.414L8.586 10l-2.293 2.293a.999.999 0 1 0 1.414 1.414L10 11.414l2.293 2.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l2.293-2.293a.999.999 0 0 0 0-1.414"></path></svg>';

    sepHtml += '</span>';
    sepHtml += '</th>';
    sepHtml += '</tr>';
    sepHtml += '</thead>';
    sepHtml += '<tbody>';

    sepHtml += '<tr class="cusOpr_' + tableno + ' hide">';
    sepHtml += '<td colspan="7">';
    sepHtml += '<div class="row">';
    sepHtml += '<div class="col-lg-2">';
    sepHtml += '<label align="center" for="" style="margin-top: 10px;">';
    sepHtml += '<b>Custom Operation</b></label>';
    sepHtml += '</div>';
    sepHtml += '<div class="col-lg-2" style="margin-bottom:10px;">';
    sepHtml += '<input readonly type="text" class="form-control" id="cusOperation_' + tableno + '" name="customOperation_' + tableno + '[]">';

    sepHtml += '</div>';
    sepHtml += '</td>';

    sepHtml += '<tr class="cusOprAppliedOnField_' + tableno + ' hide">';
    sepHtml += '<td colspan="7">';
    sepHtml += '<label align="center" for="" style="margin:5px 0px;color:#e16b08">';
    sepHtml += '<b>On Field:</b></label>';
    sepHtml += '<div class="row">';
    sepHtml += '<div class="col-lg-2">';
    sepHtml += '<label align="center" for="" style="margin-top: 10px;">';
    sepHtml += '<b>Field Name</b></label>';
    sepHtml += '</div>';

    sepHtml += '<div class="col-lg-4">';
    sepHtml += '<input style="width:250px;" list="browt_customOprFieldName_' + tableno + '" id="cusOperationAppliedOnField_' + tableno + '" name="cusOperationAppliedOnField_' + tableno + '[]" class="form-control required">';
    sepHtml += '<datalist id="browt_customOprFieldName_' + tableno + '">';
    sepHtml += '</datalist>';
    sepHtml += '</div>';
    sepHtml += '</div>';
    sepHtml += '</td>';
    sepHtml += '</tr>';

    sepHtml += '<tr class="cusOpr_' + tableno + ' hide">';
    sepHtml += '<td colspan="7" style="background: #eee;">';
    sepHtml += '<label align="center" for="" style="margin:10px 0px; ">';
    sepHtml += '<b>Condition</b>';
    sepHtml += '</label>';
    sepHtml += '</td>'
    sepHtml += '</tr>'

    sepHtml += '<input type="hidden" id="totalRules_' + tableno + '" name="totalRules" value="0"/>';
    sepHtml += '<tr id="tableRow_' + tableno + '_' + idCount + '">';

    sepHtml += '<td>';
    sepHtml += '<select name="OpeningBrackets_' + tableno + '[]" id="OpeningBrackets_' + tableno + '_' + idCount + '" class="form-control form-select">';
    sepHtml += '<option value=""> Opening Bracket </option>';
    sepHtml += '<option value="Yes">(</option>';
    sepHtml += '</select>';
    sepHtml += '</td>';

    sepHtml += '<td class="ChooseFieldCls_' + tableno + '_' + idCount + '">';
    sepHtml += '<input list="browt_ChooseField_' + tableno + '_' + idCount + '" name="ChooseField_' + tableno + '[]" id="ChooseField_' + tableno + '_' + idCount + '" class="form-control required" onchange="getallowedActions(' + tableno + ',' + idCount + ')" placeholder="Field">';
    sepHtml += '<datalist id="browt_ChooseField_' + tableno + '_' + idCount + '">';
    sepHtml += '</datalist>';
    sepHtml += '<input type="hidden" id="fieldFor_' + tableno + '_' + idCount + '" name="fieldFor_' + idCount + '" value=""/>';
    sepHtml += '<input type="hidden" id="dataTypeOfField_' + tableno + '_' + idCount + '" name="dataTypeOfField_' + tableno + '[]" value="" /> ';

    sepHtml += '</td>';

    sepHtml += '<td class="FunctionClsDrop_' + tableno + '_' + idCount + ' hide">';
    sepHtml += '<input list="browt_AllFunction_' + tableno + '_' + idCount + '" name="allFunctions_' + tableno + '[]" id="allFunctions_' + tableno + '_' + idCount + '" class="form-control required" onchange="getallowedActions(' + tableno + ',' + idCount + ')" placeholder="Function">';
    sepHtml += '<datalist id="browt_AllFunction_' + tableno + '_' + idCount + '">'
    sepHtml += '</datalist>'
    sepHtml += '</td>'


    sepHtml += '<td class="FunctionClsDrop_' + tableno + '_' + idCount + ' hide">';
    sepHtml += '<input type="text" class="form-control" name="functionParameter_' + tableno + '[]" placeholder="Parameter" value="" id="functionParameter_' + tableno + '_' + idCount + '">';
    sepHtml += '</td> ';


    sepHtml += '<td>';

    sepHtml += '<input list="browt_condition_' + tableno + '_' + idCount + '" name="condition_' + tableno + '[]" id="condition_' + tableno + '_' + idCount + '" class="form-control required" placeholder="Condition">';
    sepHtml += '<datalist id="browt_condition_' + tableno + '_' + idCount + '">';
    sepHtml += '</datalist>';

    sepHtml += '</td>';
    sepHtml += '<td>';
    sepHtml += '<input type="text" class="form-control" name="rulevalue_' + tableno + '[]" placeholder="Value" value="" id="ruleValue_' + tableno + '_' + idCount + '">';
    sepHtml += '</td> ';

    sepHtml += '<td>';
    sepHtml += '<select name="ClosingBrackets_' + tableno + '[]" id="ClosingBrackets_' + tableno + '_' + idCount + '" class="form-control form-select">';
    sepHtml += '<option value=""> Closing Bracket </option>';
    sepHtml += '<option value="Yes">)</option>';
    sepHtml += '</select>';
    sepHtml += '</td>';

    sepHtml += '<td>';
    sepHtml += '<select name="Operator_' + tableno + '[]"';
    sepHtml += 'id="operator_' + tableno + '_' + idCount + '" class="form-control form-select">';
    sepHtml += '<option value=""> Operator </option>';
    sepHtml += '<option value="&&">AND</option>';
    sepHtml += '<option value="||">OR</option>';
    sepHtml += '<option value="&& !">AND NOT</option>';
    sepHtml += '<option value="|| !">OR NOT</option>';
    sepHtml += '</select>';
    sepHtml += '</td>';



    sepHtml += '<td class="remove">';
    sepHtml += '<span id="remove_' + tableno + '_' + idCount + '" onclick="removeRuleRow(' + tableno + ',' + idCount + ')">';
    sepHtml += '<svg width="24" height="24" fill="#aa1818" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m3.707-11.707a.999.999 0 0 0-1.414 0L10 8.586 7.707 6.293a.999.999 0 1 0-1.414 1.414L8.586 10l-2.293 2.293a.999.999 0 1 0 1.414 1.414L10 11.414l2.293 2.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l2.293-2.293a.999.999 0 0 0 0-1.414"></path></svg>';
    sepHtml += '</span>';
    sepHtml += '</td>';
    sepHtml += '</tr>';

    sepHtml += '</tbody>';

    sepHtml += '<tfoot>';
    sepHtml += '<tr>';
    sepHtml += '<td id="tableBottomRow_' + tableno + '" colspan="6"></td>';
    sepHtml += '<td>';
    sepHtml += '<div class="exchangeorderbtnWhenAdd">';
    sepHtml += '<span id="addrulebutton_' + tableno + '" value="" class="btn--primary" data-bs-toggle="modal" data-bs-target="#modal-AddFunOrField" type="button" onclick="addMoreRuleForTableNum(' + tableno + ')">';
    sepHtml += '<svg fill="#206bc4" width="24" height="24" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true">';
    sepHtml += '<path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M8.996 8.996V7.008c.001-.043 0-.054.004-.097.044-.449.423-.845.879-.9.094-.011.115-.007.145-.007.043.002.054.002.097.007.448.054.834.442.879.9.004.043.003.054.004.097v1.988h1.992l.048.001c.49.035.918.441.954.93.039.545-.424 1.063-1.002 1.077h-1.992V13a1.04 1.04 0 0 1-.648.939c-.584.221-1.327-.217-1.359-.891L8.996 13v-1.996H7.004c-.511-.012-.966-.435-1.002-.931-.038-.53.396-1.049.954-1.076l.048-.001h1.992z"></path>';
    sepHtml += '</svg>';
    sepHtml += '</span>';
    sepHtml += '<input type="hidden" id="tableType_' + tableno + '" name="tableType[]" value="" />';
    sepHtml += '</div>';
    sepHtml += '</td>';
    sepHtml += '</tr>';


    sepHtml += '<tr class="cusOprAction_' + tableno + ' hide">'
    sepHtml += '<td colspan="7">';
    sepHtml += '<div class="col-md-2" style="margin:5px 0px; color:#e16b08">';
    sepHtml += '<label align="left" class="form-label no-padding-right" >';
    sepHtml += '<b>Logic:</b>';
    sepHtml += '</label>';
    sepHtml += '</div>';
    sepHtml += '<div class="row">';
    sepHtml += '<div class="cusOprAction_' + tableno + ' col-md-2 hide" style="margin-bottom:10px;margin-left:10px;">';
    sepHtml += '<label align="center" class="form-label no-padding-right" >';
    sepHtml += '<b>Custom Operators</b></label>';
    sepHtml += '<div class="input-group input-group-flat">';
    sepHtml += '<input list="browt_customOperationsAction_' + tableno + '" id="cusOperationAction_' + tableno + '" name="customOperationAction_' + tableno + '[]" class="form-control required" style="margin-bottom:20px;">';
    sepHtml += '<datalist id="browt_customOperationsAction_' + tableno + '">';
    sepHtml += '</datalist>';
    sepHtml += '</div>';
    sepHtml += '</div>';
    sepHtml += '<div class="cusOprActionValue_' + tableno + ' col-md-2 hide" style="margin-bottom:10px;margin-left:10px;">';
    sepHtml += '<label align="center" class="form-label no-padding-right" >';
    sepHtml += '<b>Custom Operation Value</b></label>';
    sepHtml += '<div class="input-group input-group-flat">';
    sepHtml += '<input type="text" class="form-control" id="cusOperationActionValue_' + tableno + '" name="customOperationActionValue_' + tableno + '[]" value="" style="margin-bottom:20px;">';
    sepHtml += '</div>';
    sepHtml += '</div>';
    sepHtml += '</div>';
    sepHtml += '</td>';
    sepHtml += '</tr>';
    sepHtml += '<tr class="customCodeForFieldLevel_' + tableno + ' col-md-4 hide" >';
    sepHtml += '<td colspan="7">';
    sepHtml += '<h5>Custom Code</h5>';
    sepHtml += '<textarea  style="width:100%; height:50px" class="form-control" id="customCodeFieldLevel_' + tableno + '" name="customCodeFieldLevel_' + tableno + '" value=""></textarea>';
    sepHtml += '</td>';
    sepHtml += '</tr>';
    sepHtml += '</tfoot>';

    sepHtml += '</table>';










    //addnew row
    console.log('HERER SEP HTML', sepHtml);
    $("#sep_addWhenNew").append(sepHtml);
    //$("#indexValue").val(newRow);

}

function addnewtable() {
    var totalSep = $("#indexValue").val();
    var tableno = parseInt(totalSep);
    var newRow = parseInt(totalSep);
    var idCount = 0;
    var sepHtml = '';

    var hiddenClass='';
    if(tableno==1){
        hiddenClass='hide'
    }

    //logical connector table

    sepHtml +='<table style="margin-top:10px;" class="ConnectorTable_'+tableno+' '+hiddenClass+'" id="connectorTableId_'+tableno+'" >';
    sepHtml += '<tbody>';
    sepHtml += '<tr class="ConnectorTable_' + tableno + '" id="logicalConnectorTableRowId_'+tableno+'" >';
    
    sepHtml += '<td>';
    sepHtml += '<select name="LogicalOperator_'+tableno+'[]"';
    sepHtml += 'id="Logicaloperator_'+tableno+'" class="form-control form-select">';
    sepHtml += '<option value=""> Operator </option>';
    sepHtml += '<option value="&&">AND</option>';
    sepHtml += '<option value="||">OR</option>';
    sepHtml += '<option value="&& !">AND NOT</option>';
    sepHtml += '<option value="|| !">OR NOT</option>';
    sepHtml += '</select>';
    sepHtml += '</td>';

    sepHtml += '</tr>';
    sepHtml += '</tbody>';

    sepHtml +='</table>';
    //logical connector table ends



    sepHtml += '<table class="table table-vcenter table-mobile-md card-table" id="tableaddRecorder_' + tableno + '" style="border: 1px solid #c2c2c2;margin-top:20px;">';
    sepHtml += '<thead>';
    sepHtml += '<tr class="tableHead_' + tableno + '">';

    sepHtml += '<th width="95%" id="tableHeadRow_' + tableno + '" class="tblHeadRow" colspan="6">';

    sepHtml += '<input type="hidden" id="whenTableIds_' + tableno + '" name="whenTableIds[]" value="' + tableno + '"/>'
    sepHtml += '<input type="hidden" id="fieldForWhenRule_' + tableno + '" name="fieldForWhenRule[]" value=""/>'
    sepHtml += '<input type="hidden" id="parent_' + tableno + '" name="parent_' + tableno + '[]" value="">';
    sepHtml += '<input type="hidden" id="rootpath_' + tableno + '" name="rootpath_' + tableno + '[]" value="">';
    sepHtml += '<input type="hidden" id="totalRules_' + tableno + '" name="totalRules" value="0"/>';
    sepHtml += '<input type="hidden" id="tableType_' + tableno + '" name="tableType[]" value="" />';

    sepHtml += '<span class="FieldsHeading_' + tableno + ' hide">';
    sepHtml += '<b>Fields</b>';
    sepHtml += '</span>';

    sepHtml += '<span class="FunctionsHeading_' + tableno + ' hide">';
    sepHtml += '<b>Functions</b>';
    sepHtml += '</span>';

    sepHtml += '<span id="thheadSecondary_' + tableno + '_0" data-bs-toggle="modal" data-bs-target="#modal-ForFieldsLevel" class="btn--primary links" style="text-transform:uppercase;" type="button" onclick="fieldModelPopUpInbetween(' + tableno + ');"></span>';

    sepHtml += '</th>';

    sepHtml += '<th width="5%">';
    sepHtml += '<span id="remove_tbl_' + tableno + '" onclick="removeRuleTable(' + tableno + ')"><svg width="24" height="24" fill="#aa1818" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m3.707-11.707a.999.999 0 0 0-1.414 0L10 8.586 7.707 6.293a.999.999 0 1 0-1.414 1.414L8.586 10l-2.293 2.293a.999.999 0 1 0 1.414 1.414L10 11.414l2.293 2.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l2.293-2.293a.999.999 0 0 0 0-1.414"> </path></svg></span>';
    sepHtml += '</th>';

    sepHtml += '</tr>';
    sepHtml += '</thead>';

    sepHtml += '<tbody>';

    sepHtml += '<tr class="cusOpr_' + tableno + ' hide">';
    sepHtml += '<td class="tblFullRow" colspan="7">';
    sepHtml += '<div class="row">';
    sepHtml += '<div class="col-lg-2">';
    sepHtml += '<label align="center" for="" style="margin-top: 10px;">';
    sepHtml += '<b>Custom Operation</b></label>';
    sepHtml += '</div>';
    sepHtml += '<div class="col-lg-2" style="margin-bottom:10px;">';
    sepHtml += '<input readonly type="text" class="form-control" id="cusOperation_' + tableno + '" name="customOperation_' + tableno + '[]">';

    sepHtml += '</div>';
    sepHtml += '</td>';

    sepHtml += '<tr class="cusOprAppliedOnField_' + tableno + ' hide">';
    sepHtml += '<td class="tblFullRow" colspan="7">';
    sepHtml += '<label align="center" for="" style="margin:5px 0px;color:#e16b08">';
    sepHtml += '<b>On Field:</b></label>';
    sepHtml += '<div class="row">';
    sepHtml += '<div class="col-lg-2">';
    sepHtml += '<label align="center" for="" style="margin-top: 10px;">';
    sepHtml += '<b>Field Name</b></label>';
    sepHtml += '</div>';

    sepHtml += '<div class="col-lg-4">';
    sepHtml += '<input style="width:250px;" list="browt_customOprFieldName_' + tableno + '" id="cusOperationAppliedOnField_' + tableno + '" name="cusOperationAppliedOnField_' + tableno + '[]" class="form-control required">';
    sepHtml += '<datalist id="browt_customOprFieldName_' + tableno + '">';
    sepHtml += '</datalist>';
    sepHtml += '</div>';
    sepHtml += '</div>';
    sepHtml += '</td>';
    sepHtml += '</tr>';

    sepHtml += '<tr class="cusOpr_' + tableno + ' hide">';
    sepHtml += '<td class="tblFullRow" colspan="7" style="background: #eee;">';
    sepHtml += '<label align="center" for="" style="margin:10px 0px; ">';
    sepHtml += '<b>Condition</b>';
    sepHtml += '</label>';
    sepHtml += '</td>'
    sepHtml += '</tr>'


    sepHtml += '<tr class="ParentTbl" id="tableRow_' + tableno + '_' + idCount + '">';

    sepHtml += '<td>';
    sepHtml += '<select name="OpeningBrackets_' + tableno + '[]" id="OpeningBrackets_' + tableno + '_' + idCount + '" class="form-control form-select">';
    sepHtml += '<option value=""> Opening Bracket </option>';
    sepHtml += '<option value="Yes">(</option>';
    sepHtml += '</select>';
    sepHtml += '</td>';

    sepHtml += '<td class="ChooseFieldCls_' + tableno + '_' + idCount + '">';
    sepHtml += '<input list="browt_ChooseField_' + tableno + '_' + idCount + '" name="ChooseField_' + tableno + '[]" id="ChooseField_' + tableno + '_' + idCount + '" class="form-control" onchange="getallowedActions(' + tableno + ',' + idCount + ')" placeholder="Field">';
    sepHtml += '<datalist id="browt_ChooseField_' + tableno + '_' + idCount + '">';
    sepHtml += '</datalist>';
    sepHtml += '<input type="hidden" id="fieldFor_' + tableno + '_' + idCount + '" name="fieldFor_' + idCount + '" value=""/>';
    sepHtml += '<input type="hidden" id="dataTypeOfField_' + tableno + '_' + idCount + '" name="dataTypeOfField_' + tableno + '[]" value="" /> ';

    sepHtml += '</td>';

    sepHtml += '<td class="FunctionClsDrop_' + tableno + '_' + idCount + ' hide">';
    sepHtml += '<input list="browt_AllFunction_' + tableno + '_' + idCount + '" name="allFunctions_' + tableno + '[]" id="allFunctions_' + tableno + '_' + idCount + '" class="form-control" onchange="getallowedActions(' + tableno + ',' + idCount + ')" placeholder="Function">';
    sepHtml += '<datalist id="browt_AllFunction_' + tableno + '_' + idCount + '">'
    sepHtml += '</datalist>'
    sepHtml += '</td>'


    sepHtml += '<td class="FunctionClsDrop_' + tableno + '_' + idCount + ' hide">';
    sepHtml += '<input type="text" class="form-control" name="functionParameter_' + tableno + '[]" placeholder="Parameter" value="" id="functionParameter_' + tableno + '_' + idCount + '">';
    sepHtml += '</td> ';


    sepHtml += '<td>';

    sepHtml += '<input list="browt_condition_' + tableno + '_' + idCount + '" name="condition_' + tableno + '[]" id="condition_' + tableno + '_' + idCount + '" class="form-control" placeholder="Condition">';
    sepHtml += '<datalist id="browt_condition_' + tableno + '_' + idCount + '">';
    sepHtml += '</datalist>';

    sepHtml += '</td>';

    sepHtml += '<td class="templateTypeOption hide">';
    sepHtml += '<select name="templateDropDown_' + tableno + '[]" id="templateDropDown_' + tableno + '_' + idCount + '" class="form-control form-select templateDropDown" onchange="setvalueForTemplate(' + tableno + ',' + idCount + ');">';
    sepHtml += '<option value="Value">Value</option>';
    sepHtml += '<option value="Variable">Variable</option>';
    sepHtml += '</select>';
    sepHtml += '</td>';

    //sepHtml += '<td><input type="text" readonly class="templateVariableSymbolData_'+tableno+'_'+idCount+' hide form-control" name="templateVariableSymbol_'+tableno+'[]" id="templateVariableSymbol_'+tableno+'_'+idCount+'" value="%%"/></td>';



    sepHtml += '<td>';
    sepHtml += '<span style="display: flex;">';
    sepHtml += '<span  style="margin-top: 12px;" class="templateVariableSymbolData_'+tableno+'_'+idCount+' hide" name="templateVariableSymbol_'+tableno+'[]" id="templateVariableSymbol_'+tableno+'_'+idCount+'">%%</span>';
    sepHtml += '<input type="text" class="form-control rulevalue_'+tableno+' required" name="rulevalue_' + tableno + '[]" placeholder="Value" value="" id="ruleValue_' + tableno + '_' + idCount + '">';
    sepHtml += '</span>';
    sepHtml += '</td> ';

    sepHtml += '<td>';
    sepHtml += '<select name="ClosingBrackets_' + tableno + '[]" id="ClosingBrackets_' + tableno + '_' + idCount + '" class="form-control form-select">';
    sepHtml += '<option value=""> Closing Bracket </option>';
    sepHtml += '<option value="Yes">)</option>';
    sepHtml += '</select>';
    sepHtml += '</td>';

    sepHtml += '<td>';
    sepHtml += '<select name="Operator_' + tableno + '[]"';
    sepHtml += 'id="operator_' + tableno + '_' + idCount + '" class="form-control form-select">';
    sepHtml += '<option value=""> Operator </option>';
    sepHtml += '<option value="&&">AND</option>';
    sepHtml += '<option value="||">OR</option>';
    sepHtml += '<option value="&& !">AND NOT</option>';
    sepHtml += '<option value="|| !">OR NOT</option>';
    sepHtml += '</select>';
    sepHtml += '</td>';



    sepHtml += '<td class="remove">';
    sepHtml += '<span id="remove_' + tableno + '_' + idCount + '" onclick="removeRuleRow(' + tableno + ',' + idCount + ')">';
    sepHtml += '<svg width="24" height="24" fill="#aa1818" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m3.707-11.707a.999.999 0 0 0-1.414 0L10 8.586 7.707 6.293a.999.999 0 1 0-1.414 1.414L8.586 10l-2.293 2.293a.999.999 0 1 0 1.414 1.414L10 11.414l2.293 2.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l2.293-2.293a.999.999 0 0 0 0-1.414"></path></svg>';
    sepHtml += '</span>';

    sepHtml += '<span id="addrulebutton_' + tableno + '_' + idCount + '" class="btn--primary" data-bs-toggle="modal" data-bs-target="#modal-AddFunOrField" type="button" onclick="addMoreRuleForTableNum(' + tableno + ')">';
    sepHtml += '<svg fill="#206bc4" width="24" height="24" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true">';
    sepHtml += '<path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M8.996 8.996V7.008c.001-.043 0-.054.004-.097.044-.449.423-.845.879-.9.094-.011.115-.007.145-.007.043.002.054.002.097.007.448.054.834.442.879.9.004.043.003.054.004.097v1.988h1.992l.048.001c.49.035.918.441.954.93.039.545-.424 1.063-1.002 1.077h-1.992V13a1.04 1.04 0 0 1-.648.939c-.584.221-1.327-.217-1.359-.891L8.996 13v-1.996H7.004c-.511-.012-.966-.435-1.002-.931-.038-.53.396-1.049.954-1.076l.048-.001h1.992z"></path>';
    sepHtml += '</svg>';
    sepHtml += '</span>';

    sepHtml += '</td>';
    sepHtml += '</tr>';

    sepHtml += '</tbody>';

    sepHtml += '<tfoot>';
    sepHtml += '<tr class="cusOprAction_' + tableno + ' hide">'
    sepHtml += '<td class="tblFullRow" colspan="7">';
    sepHtml += '<div class="col-md-2" style="margin:5px 0px; color:#e16b08">';
    sepHtml += '<label align="left" class="form-label no-padding-right" >';
    sepHtml += '<b>Logic:</b>';
    sepHtml += '</label>';
    sepHtml += '</div>';
    sepHtml += '<div class="row">';
    sepHtml += '<div class="cusOprAction_' + tableno + ' col-md-2 hide" style="margin-bottom:10px;margin-left:10px;">';
    sepHtml += '<label align="center" class="form-label no-padding-right" >';
    sepHtml += '<b>Custom Operators</b></label>';
    sepHtml += '<div class="input-group input-group-flat">';
    sepHtml += '<input list="browt_customOperationsAction_' + tableno + '" id="cusOperationAction_' + tableno + '" name="customOperationAction_' + tableno + '[]" class="form-control required" style="margin-bottom:20px;">';
    sepHtml += '<datalist id="browt_customOperationsAction_' + tableno + '">';
    sepHtml += '</datalist>';
    sepHtml += '</div>';
    sepHtml += '</div>';

    sepHtml += '<div class="templateTypeOption hide col-md-2" style="margin-bottom:10px;margin-left:10px;">';
    sepHtml += '<label align="center" class="form-label no-padding-right" >';
    sepHtml += '<b>Type</b></label>';
    sepHtml += '<div class="input-group input-group-flat">';
    sepHtml += '<select name="templateDropDownCusOpr_' + tableno + '[]" id="templateDropDownCusOpr_' + tableno +'" class="form-control form-select templateDropDown" onchange="setvalueForTemplateCusOpr(' + tableno + ');">';
    sepHtml += '<option value="Value">Value</option>';
    sepHtml += '<option value="Variable">Variable</option>';
    sepHtml += '</select>';
    sepHtml += '</div>';
    sepHtml += '</div>';

    sepHtml += '<div class="cusOprActionValue_' + tableno + ' col-md-2 hide" style="margin-bottom:10px;margin-left:10px;">';
    sepHtml += '<label align="center" class="form-label no-padding-right" >';
    sepHtml += '<b>Custom Operation Value</b></label>';
    sepHtml += '<div class="input-group input-group-flat">';
    sepHtml += '<span style="margin-top: 12px;" class="templateVariableSymbolDataCusOpr_'+tableno+' hide" name="templateVariableSymbolCusOpr_'+tableno+'[]" id="templateVariableSymbolCusOpr_'+tableno+'">%%</span>';
    sepHtml += '<input type="text" class="form-control" id="cusOperationActionValue_' + tableno + '" name="customOperationActionValue_' + tableno + '[]" value="" style="margin-bottom:20px;">';
    sepHtml += '</div>';
    sepHtml += '</div>';
    sepHtml += '</div>';
    sepHtml += '</td>';
    sepHtml += '</tr>';


    // === --- Child Table will add here --- === //
    sepHtml += '<tr class="hide" id="customObjectChildTable_' + tableno + '">';
    sepHtml += '<td class="tblFullRow" id="customObjectSubTable_' + tableno + '" colspan="7" width="100%">';
    sepHtml += '<input type="hidden" id="fieldForWhenRuleChild_' + tableno + '" name="fieldForWhenRuleChild[]" value=""/>'
    sepHtml += '<input type="hidden" id="ChildTableNumOfMasterTableNo_' + tableno + '" name="ChildTableNumOfMasterTableNo[]" value="0"/>';
    sepHtml += '</td>';
    sepHtml += '</tr>';
    // === --- Child Table will End here --- === //         

    sepHtml += '</tfoot>';
    sepHtml += '</table>';
    $("#sep_addWhenNew").append(sepHtml);
    $("#remove_" + tableno + "_0").hide();
}


function changeCustomObjectField() {
    $(".col").show();
    $('.addnamespacefirstpage').hide();
    $('.toptitle').show();
    $('.whenallpart').show();
    $('.thenallpart').show();
    $('.validdraft').show();

    //$('.exchangeorderbtnWhen').hide();
    //$('.exchangeorderbtnThen').hide();
    //$('.btn-close').click();
    var tableno = parseInt($("#indexValue").val());
    var obj = parseInt(tableno - 1);
    var fieldJson = $('#customObjects').val();
    console.log("in changeCustomObjectField metaDataGlobal --- ", metaDataGlobal);
    $('.rulenamespace').show();
    $('#browt_selectcountry').empty();
    $('#browt_selectcountry').append("<option value=''>");
    $.each(metaDataGlobal.allowedCountries[fieldJson], function (i, item) {
        $('#browt_selectcountry').append('<option value="' + item + '">' + item + '</option>');
    });
    $('#browt_ruletype').empty();
    $.each(metaDataGlobal.ruleType, function (i, item) {
        $('#browt_ruletype').append('<option value="' + item + '">' + item + '</option>');
    });

    $('.selectcountrytitle').show();
    $.ajax({
        method: "GET",
        url: '/jupiter/get-jupiter-metadata?nameSpace=' + fieldJson,
    }).done(function (res) {

        PClevel = res;
        console.log('Global variable ------ :', PClevel)
        //$('#fieldFor_' + tableno + '_' + obj).val(fieldJson);
        var allChooseFilelds;
        // if (fieldJson == 'The following exists' || fieldJson == 'The following does not exist' || fieldJson == 'Any of the following are true' || fieldJson == 'CART') {
            if (fieldJson == 'CART' || fieldJson == 'PAYMENT' || fieldJson == 'PREORDERVALIDATION') {
                allChooseFilelds = Object.keys(PClevel.jupiterMetaData.result.field)

                //FOR WHEN
                $('#browt_namespaceFields').empty();

                $('#browt_namespaceFields').append("<option value=''>");
                $.each(PClevel.jupiterMetaData.result.fieldList, function (i, item) {
                    $('#browt_namespaceFields').append('<option value="' + item + '">' + item + '</option>');
                });

                //FOR THEN

                $('#browt_namespaceFieldsThen').empty();

                $('#browt_namespaceFieldsThen').append("<option value=''>");
                $.each(PClevel.jupiterMetaData.result.fieldList, function (i, item) {
                    $('#browt_namespaceFieldsThen').append('<option value="' + item + '">' + item + '</option>');
                });


                //FOR WHEN
                $('#browt_namespace-customObjects').empty();

                $('#browt_namespace-customObjects').append("<option value=''>");
                $.each(PClevel.jupiterMetaData.result.customObjects, function (i, item) {
                    $('#browt_namespace-customObjects').append('<option value="' + item + '">' + item + '</option>');
                });

                console.log('VALUE OF CUSTOM OBJECT DROP DOWN==',$('#browt_namespace-customObjects').val());


                //FOR THEN

                $('#browt_namespace-customObjectsThen').empty();

                $('#browt_namespace-customObjectsThen').append("<option value=''>");
                $.each(PClevel.jupiterMetaData.result.customObjects, function (i, item) {
                    $('#browt_namespace-customObjectsThen').append('<option value="' + item + '">' + item + '</option>');
                });



                var operations = ['Accumulate', 'Count', 'Exists'];

                //FOR WHEN
                $('#browt_namespace-operations').empty();

                $('#browt_namespace-operations').append("<option value=''>");
                $.each(operations, function (i, item) {
                    $('#browt_namespace-operations').append('<option value="' + item + '">' + item + '</option>');
                });

                //FOR THEN

                $('#browt_namespace-operationsThen').empty();

                $('#browt_namespace-operationsThen').append("<option value=''>");
                $.each(operations, function (i, item) {
                    $('#browt_namespace-operationsThen').append('<option value="' + item + '">' + item + '</option>');
                });


                //FOR WHEN
                $('#browt_namespace-functioncall').empty();

                $('#browt_namespace-functioncall').append("<option value=''>");
                $.each(PClevel.jupiterMetaData.result.methodsList, function (i, item) {
                    $('#browt_namespace-functioncall').append('<option value="' + item + '">' + item + '</option>');
                });

                //FOR THEN

                $('#browt_namespace-functioncallThen').empty();

                $('#browt_namespace-functioncallThen').append("<option value=''>");
                $.each(PClevel.jupiterMetaData.result.methodsList, function (i, item) {
                    $('#browt_namespace-functioncallThen').append('<option value="' + item + '">' + item + '</option>');
                });


            } else {
                allChooseFilelds = PClevel.jupiterMetaData.result.customObjects
            }
        // } else if (PClevel.jupiterMetaData.result.field) {
        //     console.log('All Data:', PClevel.jupiterMetaData.result.field)
        //     console.log(Object.keys(PClevel.jupiterMetaData.result.field))
        //     allChooseFilelds = Object.keys(PClevel.jupiterMetaData.result.field)
        // }

        if (allChooseFilelds) {
            if (fieldJson == 'PAYMENT' || fieldJson == 'CART' || fieldJson == 'PREORDERVALIDATION') {
                $('#CartAndStatement_' + tableno + '_' + obj).show();
                $('#CartAndStatement_then_' + obj).show();
                $('#browt_Conditions_' + tableno + '_' + obj).append("<option value=''>");
                $.each(allChooseFilelds, function (i, item) {
                    //  var name = "( " + item.id + "_" + item.frameType + " )"
                    $('#browt_Conditions_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
                });

                //then append
                $('#browt_Conditions_then_' + obj).append("<option value=''>");
                $.each(allChooseFilelds, function (i, item) {
                    //  var name = "( " + item.id + "_" + item.frameType + " )"
                    $('#browt_Conditions_then_' + obj).append('<option value="' + item + '">' + item + '</option>');
                });
                //then append end


            } else {
                $('#browt_ChooseField_' + tableno + '_' + obj).append("<option value=''>");
                $.each(allChooseFilelds, function (i, item) {
                    //  var name = "( " + item.id + "_" + item.frameType + " )"
                    $('#browt_ChooseField_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
                });
            }
        } else {
            var allOperators = Object.values(PClevel.jupiterMetaData.result.field[fieldJson].allowedActions)
            $('#condition_' + tableno + '_' + obj).empty();
            $('#ChooseField_' + tableno + '_' + obj).hide();
            //$('#condition_').addClass('fixedWidth');
            $.each(allOperators, function (i, item) {
                console.log('item-----', item)
                if (item != '') {
                    $('#condition_' + tableno + '_' + obj).append($('<option>', {
                        value: item,
                        text: item
                    }));
                    j++
                }
            });
        }
        $('#tableDefault').show();
        $('#sep_addThen').show();

        var text = $('#customObjects').val();
        var headingNumber = obj + 1;


        $('#thhead_' + tableno + '_' + obj).html('There is a <font color="#800000">' + text + '</font> with');
        $('#thheadThen_' + tableno + '_' + obj).html('Set the value in <font color="#800000">' + text + '</font>');


        $('#thhead_' + tableno + '_' + obj).show();
        $('#thheadThen_' + tableno + '_' + obj).show()
        $(".col").hide();

    });

}

function changeCustomObjectFieldaddMore(obj, tablenumber) {
    $('.defaultParent_' + tablenumber).show();
    var tableno;
    if (tablenumber != '') {
        tableno = parseInt(tablenumber);
    } else {
        tableno = parseInt($("#indexValue").val() - 1);
    }
    console.log('Global variable:', PClevel)
    var fieldJson = $('#fieldFor_' + tableno + '_' + obj).val();
    if (fieldJson == 'Field Call' || fieldJson == 'Function Call') {
        return true;
    }
    var allChooseFilelds;
    // if (fieldJson == 'The following exists' || fieldJson == 'The following does not exist' || fieldJson == 'Any of the following are true' || fieldJson == 'CART') {
        if (fieldJson == 'CART' || fieldJson == 'PAYMENT' || fieldJson == 'PREORDERVALIDATION') {
            if (fieldJson == 'CART' || fieldJson == 'PAYMENT' || fieldJson == 'PREORDERVALIDATION') {
                allChooseFilelds = Object.keys(PClevel.jupiterMetaData.result.field)
            } else {
                allChooseFilelds = PClevel.jupiterMetaData.result.customObjects
            }
        } else if (PClevel.jupiterMetaData.result.field[fieldJson].field) {
            console.log('All Data:', PClevel.jupiterMetaData.result.field[fieldJson].field)
            console.log(Object.keys(PClevel.jupiterMetaData.result.field[fieldJson].field))
            allChooseFilelds = Object.keys(PClevel.jupiterMetaData.result.field[fieldJson].field)
        }


        
    // } else if (PClevel.jupiterMetaData.result.field[fieldJson].field != 'undefined') {
    //     allChooseFilelds = Object.keys(PClevel.jupiterMetaData.result.field[fieldJson].field)
    // }
    if (allChooseFilelds) {
        console.log('INSIDE ALL', allChooseFilelds)

        if (fieldJson == 'PAYMENT' || fieldJson == 'CART' || fieldJson == 'PREORDERVALIDATION') {


            $('#CartAndStatement_' + tableno + '_' + obj).show();
            $('#browt_Conditions_' + tableno + '_' + obj).empty();
            $('#browt_Conditions_' + tableno + '_' + obj).append("<option value=''>");
            $.each(allChooseFilelds, function (i, item) {
                $('#browt_Conditions_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
            });

        } else {
            $('#browt_ChooseField_' + tableno + '_' + obj).empty();
            $('#browt_ChooseField_' + tableno + '_' + obj).append("<option value=''>");
            $.each(allChooseFilelds, function (i, item) {
                if (item != '') {
                    $('#browt_ChooseField_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
                }
            });
        }
    } else {
        console.log('OUTSIDE ALL', allChooseFilelds)
        var allOperators = Object.values(PClevel.jupiterMetaData.result.field[fieldJson].allowedActions)

        $('#condition_' + tableno + '_' + obj).empty();
        $('#ChooseField_' + tableno + '_' + obj).hide();
        //   $('#condition_').addClass('fixedWidth');
        /*   $.each(allOperators, function (i, item) {
               console.log('item-----',item)
               if(item!=''){
               $('#condition_'+obj).append($('<option>', { 
                   value: item,
                   text : item 
               }));
               }
           });  */
        $('#browt_condition_' + tableno + '_' + obj).empty();
        $('#browt_condition_' + tableno + '_' + obj).append("<option value=''>");
        $.each(allOperators, function (i, item) {
            //  var name = "( " + item.id + "_" + item.frameType + " )"
            $('#browt_condition_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
        });
    }

    //$('.modal').hide();



}

function appendCustomCodeTable_OLD(tableno) {
    var sepHtml = '';
    sepHtml += '<table class="table table-vcenter table-mobile-md card-table cusCode hide" id="tableaddRecorder_' + tableno + '" style="border: 1px solid #c2c2c2; margin-top:20px;">';
    sepHtml += '<thead>';
    sepHtml += '<tr class="tableHead_' + tableno + '">';
    sepHtml += '<th id="tableHeadRow_' + tableno + '" width="95%">';
    sepHtml += '<input type="hidden" id="whenTableIds_' + tableno + '" name="whenTableIds[]" value="' + tableno + '"/>'
    sepHtml += '<input type="hidden" id="fieldForWhenRule_' + tableno + '" name="fieldForWhenRule[]" value="Custom Code"/>'
    sepHtml += '<span  class="FieldsHeading_' + tableno + '"><b>Custom Code</b></span>';
    sepHtml += '</th>';
    sepHtml += '<th width="5%">';
    sepHtml += '<span  id="removeCustomeCode" onclick="removeCustomCode(' + tableno + ')"><svg width="24" height="24" fill="#aa1818" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m3.707-11.707a.999.999 0 0 0-1.414 0L10 8.586 7.707 6.293a.999.999 0 1 0-1.414 1.414L8.586 10l-2.293 2.293a.999.999 0 1 0 1.414 1.414L10 11.414l2.293 2.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l2.293-2.293a.999.999 0 0 0 0-1.414"> </path></svg></span>';

    sepHtml += '</th>';

    sepHtml += '</tr>';
    sepHtml += '</thead>';
    sepHtml += '<tbody>';
    sepHtml += '<tr>';
    sepHtml += '<td colspan="2">';
    sepHtml += '<textarea id="cusCodesUpperLevel_' + tableno + '" name="cusCodesWhen_' + tableno + '" value="" style="width: 100%;"></textarea>';
    sepHtml += '</td>'
    sepHtml += '</tr>';
    sepHtml += '</tbody>';
    sepHtml += '</table>';
    //console.log('sepHtml=====',sepHtml)
    $("#sep_addWhenNew").append(sepHtml);
}

function appendCustomCodeTable_OLD(tableno) {
    var sepHtml = '';
    sepHtml += '<table class="table table-vcenter table-mobile-md card-table cusCode hide" id="tableaddRecorder_' + tableno + '" style="border: 1px solid #c2c2c2; margin-top:20px;">';
    sepHtml += '<thead>';
    sepHtml += '<tr class="tableHead_' + tableno + '">';
    sepHtml += '<th id="tableHeadRow_' + tableno + '" width="95%">';
    sepHtml += '<input type="hidden" id="whenTableIds_' + tableno + '" name="whenTableIds[]" value="' + tableno + '"/>'
    sepHtml += '<input type="hidden" id="fieldForWhenRule_' + tableno + '" name="fieldForWhenRule[]" value="Custom Code"/>'
    sepHtml += '<span  class="FieldsHeading_' + tableno + '"><b>Custom Code</b></span>';
    sepHtml += '</th>';
    sepHtml += '<th width="5%">';
    sepHtml += '<span  id="removeCustomeCode" onclick="removeCustomCode(' + tableno + ')"><svg width="24" height="24" fill="#aa1818" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m3.707-11.707a.999.999 0 0 0-1.414 0L10 8.586 7.707 6.293a.999.999 0 1 0-1.414 1.414L8.586 10l-2.293 2.293a.999.999 0 1 0 1.414 1.414L10 11.414l2.293 2.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l2.293-2.293a.999.999 0 0 0 0-1.414"> </path></svg></span>';

    sepHtml += '</th>';

    sepHtml += '</tr>';
    sepHtml += '</thead>';
    sepHtml += '<tbody>';
    sepHtml += '<tr>';
    sepHtml += '<td colspan="2">';
    sepHtml += '<textarea id="cusCodesUpperLevel_' + tableno + '" name="cusCodesWhen_' + tableno + '" value="" style="width: 100%;"></textarea>';
    sepHtml += '</td>'
    sepHtml += '</tr>';
    sepHtml += '</tbody>';
    sepHtml += '</table>';
    //console.log('sepHtml=====',sepHtml)
    $("#sep_addWhenNew").append(sepHtml);
}

function appendCustomCodeTable(tableno) {
    var sepHtml = '';
    var hiddenClass='';
    if(tableno==1){
        hiddenClass='hide'
    }

    //logical connector table

    sepHtml +='<table style="margin-top:10px;" class="ConnectorTable_'+tableno+' '+hiddenClass+'" id="connectorTableId_'+tableno+'" >';
    sepHtml += '<tbody>';
    sepHtml += '<tr class="ConnectorTable_' + tableno + '" id="logicalConnectorTableRowId_'+tableno+'" >';
    
    sepHtml += '<td>';
    sepHtml += '<select name="LogicalOperator_'+tableno+'[]"';
    sepHtml += 'id="Logicaloperator_'+tableno+'" class="form-control form-select">';
    sepHtml += '<option value=""> Operator </option>';
    sepHtml += '<option value="&&">AND</option>';
    sepHtml += '<option value="||">OR</option>';
    sepHtml += '<option value="&& !">AND NOT</option>';
    sepHtml += '<option value="|| !">OR NOT</option>';
    sepHtml += '</select>';
    sepHtml += '</td>';

    sepHtml += '</tr>';
    sepHtml += '</tbody>';

    sepHtml +='</table>';
    //logical connector table ends
    sepHtml += '<table class="table table-vcenter table-mobile-md card-table cusCode hide" id="tableaddRecorder_' + tableno + '" style="border: 1px solid #c2c2c2; margin-top:20px;">';
    sepHtml += '<thead>';
    sepHtml += '<tr class="tableHead_' + tableno + '">';
    sepHtml += '<th id="tableHeadRow_' + tableno + '" width="95%">';
    sepHtml += '<input type="hidden" id="whenTableIds_' + tableno + '" name="whenTableIds[]" value="' + tableno + '"/>'
    sepHtml += '<input type="hidden" id="fieldForWhenRule_' + tableno + '" name="fieldForWhenRule[]" value="Custom Code"/>'
    sepHtml += '<span  class="FieldsHeading_' + tableno + '"><b>Custom Code</b></span>';
    sepHtml += '</th>';
    sepHtml += '<th width="5%">';
    sepHtml += '<span  id="removeCustomeCode" onclick="removeCustomCode(' + tableno + ')"><svg width="24" height="24" fill="#aa1818" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m3.707-11.707a.999.999 0 0 0-1.414 0L10 8.586 7.707 6.293a.999.999 0 1 0-1.414 1.414L8.586 10l-2.293 2.293a.999.999 0 1 0 1.414 1.414L10 11.414l2.293 2.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l2.293-2.293a.999.999 0 0 0 0-1.414"> </path></svg></span>';

    sepHtml += '</th>';

    sepHtml += '</tr>';
    sepHtml += '</thead>';
    sepHtml += '<tbody>';
    sepHtml += '<tr>';
    sepHtml += '<td colspan="2">';
    sepHtml += '<textarea id="cusCodesUpperLevel_' + tableno + '" name="cusCodesWhen_' + tableno + '" value="" style="width: 100%;"></textarea>';
    sepHtml += '</td>'
    sepHtml += '</tr>';
    sepHtml += '</tbody>';
    sepHtml += '</table>';
    //console.log('sepHtml=====',sepHtml)
    $("#sep_addWhenNew").append(sepHtml);
}



function changeCartStatementObjectField_OLD(obj) {

    var obj = 0//parseInt($("#indexValue").val()-1);
    var tableno = parseInt($("#indexValue").val());
    var nxtTblNum = tableno + 1;
    var functionCallOncart = $('#selectOptn').val();
    //alert(tableno);
    var nameCustomCode = '';
    nameCustomCode = $('#namespaceCustomCode').val();
    $('#browt_customOperationsFieldLevel').empty();
    $('#cusOperationModelFieldPopup').val('');
    $('#cusObjectsModelFieldPopup').val('');
    if (functionCallOncart == 'Custom Code') {
        appendCustomCodeTable(tableno);
        $('#cusCodesUpperLevel').text(nameCustomCode);
        $('.cusCode').show();
        $('#overallCustomCode').val(nameOperations);
        $('#namespaceCustomCode').val('');
        $('.modalbtn').click();
        var indexTable = parseInt($("#indexValue").val());
        $("#indexValue").val(indexTable + 1);
        return true;

    } else {
        $('#tableaddRecorder_1').show();
        $('.exchangeorderbtnWhenAdd').show();
        //if (parseInt($("#indexValue").val()) > 1) {
        addnewtable();
        //}
        $("#tableType_" + tableno).val(functionCallOncart);
        var obj = parseInt(obj);

        if (functionCallOncart == 'Function Call') {
            $("#whenCurrTableType").val('function');
            $("#tableHeadRow_" + tableno).attr('colspan', 8);
            $("#tableBottomRow_" + tableno).attr('colspan', 8);
            //$('#thheadSecondary_'+tableno+'_'+obj).text('There is a Function Call with');
            //$('.tableHead_' + tableno).remove();
            $('.tableHeadForField_' + tableno).show();
            $('.FunctionsHeading_' + tableno).show();
            $('#fieldFor_' + tableno + '_0').val('Function Call');
            //alert('CALLL');
            $('#fieldForWhenRule_' + tableno).val('Function Call');
            $('#cusOperation_' + tableno).val('');
            $('#browt_AllFunction_' + tableno + '_' + obj).empty();

            $('#browt_AllFunction_' + tableno + '_' + obj).append("<option value=''>");
            $.each(PClevel.jupiterMetaData.result.methodsList, function (i, item) {
                $('#browt_AllFunction_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
            });
            $(".ChooseFieldCls_" + tableno + "_" + obj).hide();
            $(".FunctionClsDrop_" + tableno + "_" + obj).show();
            var countRow = parseInt($("#indexValue").val()) + 1;
            $("#indexValue").val(countRow);

            $('#namespaceField').val('');
            $('#nameSpaceCustomObjects').val('');
            $('#nameOperations').val('');
            $('#namespaceCustomCode').val('');
            $('#namespaceFunctionCall').val('');

            $('.fieldscls').hide();
            $('.customObjcls').hide();
            $('.operationscls').hide();
            $('.customcodecls').hide();
            $('.functioncallcls').hide();
            $('#selectOptn').val('');
            $('.modalbtn').click();
            return true;
        }

        if (functionCallOncart == 'Fields') {
            var ruleTypeTaken = $('#ruleType').val();
            if (ruleTypeTaken == 'TEMPLATE' || ruleTypeTaken == 'FACT_TEMPLATE') {
                $(".templateTypeOption").show();

            } else {
                $(".templateTypeOption").hide();
            }
            $("#whenCurrTableType").val('field');
            $("#tableHeadRow_" + tableno).attr('colspan', 8);
            $("#tableBottomRow_" + tableno).attr('colspan', 8);
            //$('.tableHead_' + tableno).remove();
            $('.tableHeadForField_' + tableno).show();
            $('.FieldsHeading_' + tableno).show();
            $('#fieldFor_' + tableno + '_0').val('Field Call');
            //alert('CALLL');
            $('#fieldForWhenRule_' + tableno).val('Field Call');
            $('#cusOperation_' + tableno).val('');

            $('#browt_AllFunction_' + tableno + '_' + obj).empty();

            $('#browt_AllFunction_' + tableno + '_' + obj).append("<option value=''>");
            $.each(PClevel.jupiterMetaData.result.methodsList, function (i, item) {
                $('#browt_AllFunction_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
            });

            $('#browt_ChooseField_' + tableno + '_' + obj).empty();
            $('#browt_ChooseField_' + tableno + '_' + obj).append("<option value=''>");
            $.each(PClevel.jupiterMetaData.result.fieldList, function (i, item) {
                $('#browt_ChooseField_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
            });
            $(".ChooseFieldCls_" + tableno + "_" + obj).show();
            //$('#ChooseField_'+tableno+'_'+obj).hide();
            $(".FunctionClsDrop_" + tableno + "_" + obj).hide();
            var countRow = parseInt($("#indexValue").val()) + 1;
            $("#indexValue").val(countRow);

            $('#namespaceField').val('');
            $('#nameSpaceCustomObjects').val('');
            $('#nameOperations').val('');
            $('#namespaceCustomCode').val('');
            $('#namespaceFunctionCall').val('');

            $('.fieldscls').hide();
            $('.customObjcls').hide();
            $('.operationscls').hide();
            $('.customcodecls').hide();
            $('.functioncallcls').hide();
            $('#selectOptn').val('');
            $('.modalbtn').click();
            return true;
        }


        var fieldJson = '';
        fieldJson = $('#StatementCart_' + tableno + '_' + obj).val()
        fieldJson = $('#nameSpaceCustomObjects').val();
        if (functionCallOncart == 'Custom Objects') {
            var ruleTypeTaken = $('#ruleType').val();
            if (ruleTypeTaken == 'TEMPLATE' || ruleTypeTaken == 'FACT_TEMPLATE') {
                $(".templateTypeOption").show();

            } else {
                $(".templateTypeOption").hide();
            }
            if (fieldJson == '') {
                fieldJson = $('#namespaceField').val();
                $("#errmsg").text("Please select at least one Custom Objects");
                $("#nameSpaceCustomObjects").focus();
                return false;
            } else {
                $("#errmsg").text("");
            }
            $('#fieldForWhenRule_' + tableno).val(fieldJson);
        }


        //alert(newFieldJson);
        //alert(fieldJson);
        $('#thheadSecondary_' + tableno + '_' + obj).text('There is ' + fieldJson + ' with');
        $('#fieldFor_' + tableno + '_' + obj).val(fieldJson);
        //alert('CALLL');
        //$('#fieldForWhenRule_'+tableno).val(fieldJson);

        var allChooseFilelds;
        if (fieldJson == 'CART' || fieldJson == 'PAYMENT' || fieldJson == 'PREORDERVALIDATION') {
            if (fieldJson == 'CART' || fieldJson == 'PAYMENT' || fieldJson == 'PREORDERVALIDATION') {
                allChooseFilelds = Object.keys(PClevel.jupiterMetaData.result.field)
            } else {
                allChooseFilelds = PClevel.jupiterMetaData.result.customObjects
            }
        } else if (PClevel.jupiterMetaData.result.field[fieldJson].field) {
            console.log('All Data:', PClevel.jupiterMetaData.result.field[fieldJson].field)
            console.log(Object.keys(PClevel.jupiterMetaData.result.field[fieldJson].field))
            allChooseFilelds = Object.keys(PClevel.jupiterMetaData.result.field[fieldJson].field)
        }
        if (allChooseFilelds) {
            $('#browt_AllFunction_' + tableno + '_' + obj).empty();

            $('#browt_AllFunction_' + tableno + '_' + obj).append("<option value=''>");
            $.each(PClevel.jupiterMetaData.result.methodsList, function (i, item) {
                $('#browt_AllFunction_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
            });

            $('#ChooseField_' + tableno + '_' + obj).show();


            if (fieldJson == 'The following exists' || fieldJson == 'The following does not exist' || fieldJson == 'Any of the following are true' || fieldJson == 'CART' || fieldJson == 'PAYMENT' || fieldJson == 'PREORDERVALIDATION') {
                $('#CartAndStatement_' + tableno + '_' + obj).show();
                $('#browt_Conditions_' + tableno + '_' + obj).append("<option value=''>");
                $.each(allChooseFilelds, function (i, item) {
                    //  var name = "( " + item.id + "_" + item.frameType + " )"
                    $('#browt_Conditions_' + obj).append('<option value="' + item + '">' + item + '</option>');
                });

            } else {
                var customOperationsResult = PClevel.jupiterMetaData.result.field[fieldJson].customKeywords.condition;
                if (customOperationsResult.length > 0) {
                    //New Table Then part


                    //New Table Then part 
                    $('.cusOpr_' + tableno).hide();
                    $('.cusOprAppliedOnField_' + tableno).hide();
                    // $('.cusOprActionValue_'tableno).show();

                    $('#browt_customOperations_' + tableno).empty();
                    $('#browt_customOperations_' + tableno).append("<option value=''>");
                    $.each(customOperationsResult, function (i, item) {
                        //var name = "( " + item.name + "_" + item.datatype + " )"
                        //alert(name)
                        $('#browt_customOperations_' + tableno).append('<option value="' + item.name + '">' + item.name + '</option>');
                    });

                    //For model pop on field levelcustomoperation dropdown 
                    $('#browt_customOperationsFieldLevel').empty();
                    $('#browt_customOperationsFieldLevel').append("<option value=''>");
                    $.each(customOperationsResult, function (i, item) {

                        $('#browt_customOperationsFieldLevel').append('<option value="' + item.name + '">' + item.name + '</option>');
                    });


                    //end


                    /* $('#browt_customOprFieldName_' + tableno).empty();
                        $('#browt_customOprFieldName_' + tableno).append("<option value=''>");
                        $.each(allChooseFilelds, function (i, item) {
                            $('#browt_customOprFieldName_' + tableno).append('<option value="' + item + '">' + item + '</option>');
                        });*/

                }

                $('#browt_ChooseField_' + tableno + '_' + obj).empty();
                $('#browt_ChooseField_' + tableno + '_' + obj).append("<option value=''>");
                $.each(allChooseFilelds, function (i, item) {
                    //  var name = "( " + item.id + "_" + item.frameType + " )"
                    $('#browt_ChooseField_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
                });
            }
        } else {
            // alert('country');
            $('#browt_AllFunction_' + tableno + '_' + obj).empty();

            $('#browt_AllFunction_' + tableno + '_' + obj).append("<option value=''>");
            $.each(PClevel.jupiterMetaData.result.methodsList, function (i, item) {
                $('#browt_AllFunction_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
            });

            var allOperators = Object.values(PClevel.jupiterMetaData.result.field[fieldJson].allowedActions)
            $('#condition_' + tableno + '_' + obj).empty();
            $('#ChooseField_' + tableno + '_' + obj).hide();
            $('#browt_condition_' + tableno + '_' + obj).empty();
            $('#browt_condition_' + tableno + '_' + obj).append("<option value=''>");
            $.each(allOperators, function (i, item) {
                $('#browt_condition_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
            });
        }
        var countRow = parseInt($("#indexValue").val()) + 1;
        $("#indexValue").val(countRow);
    }
    $('#namespaceField').val('');
    $('#nameSpaceCustomObjects').val('');
    $('#nameOperations').val('');
    $('#namespaceCustomCode').val('');
    $('#namespaceFunctionCall').val('');

    $('.fieldscls').hide();
    $('.customObjcls').hide();
    $('.operationscls').hide();
    $('.customcodecls').hide();
    $('.functioncallcls').hide();
    $('#selectOptn').val('');
    $('.modalbtn').click();




}

function changeCartStatementObjectField(obj) {

    var obj = 0//parseInt($("#indexValue").val()-1);
    var tableno = parseInt($("#indexValue").val());
    var nxtTblNum = tableno + 1;
    var functionCallOncart = $('#selectOptn').val();
    var nameCustomCode = '';
    nameCustomCode = $('#namespaceCustomCode').val();
    $('#browt_customOperationsFieldLevel').empty();
    $('#cusOperationModelFieldPopup').val('');
    $('#cusObjectsModelFieldPopup').val('');
    if (functionCallOncart == 'Custom Code') {
        appendCustomCodeTable(tableno);
        $('#cusCodesUpperLevel').text(nameCustomCode);
        $('.cusCode').show();
        $('#overallCustomCode').val(nameOperations);
        $('#namespaceCustomCode').val('');
        $('.modalbtn').click();
        var indexTable = parseInt($("#indexValue").val());
        $("#indexValue").val(indexTable + 1);
        return true;

    } else {
        addnewtable();
        $('#tableaddRecorder_1').show();
        $('.exchangeorderbtnWhenAdd').show();
        $("#tableType_" + tableno).val(functionCallOncart);
        var obj = parseInt(obj);
        if (functionCallOncart == 'Function Call') {
            var ruleTypeTaken = $('#ruleType').val();
            if (ruleTypeTaken == 'TEMPLATE' || ruleTypeTaken == 'FACT_TEMPLATE') {
                $(".templateTypeOption").show();
                $("#tableHeadRow_" + tableno).attr('colspan', 7);
            } else {
                $(".templateTypeOption").hide();
                $("#tableHeadRow_" + tableno).attr('colspan', 6);
            }
            $("#whenCurrTableType").val('function');
            $("#tableHeadRow_" + tableno).attr('colspan', 7);
            $("#tableBottomRow_" + tableno).attr('colspan', 7);
            $('.tableHeadForField_' + tableno).show();
            $('.FunctionsHeading_' + tableno).show();
            $('#fieldFor_' + tableno + '_0').val('Function Call');
            $('#fieldForWhenRule_' + tableno).val('Function Call');
            $('#cusOperation_' + tableno).val('');
            $('#browt_AllFunction_' + tableno + '_' + obj).empty();

            $('#browt_AllFunction_' + tableno + '_' + obj).append("<option value=''>");
            $.each(PClevel.jupiterMetaData.result.methodsList, function (i, item) {
                $('#browt_AllFunction_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
            });
            $(".ChooseFieldCls_" + tableno + "_" + obj).hide();
            $(".FunctionClsDrop_" + tableno + "_" + obj).show();
            var countRow = parseInt($("#indexValue").val()) + 1;
            $("#indexValue").val(countRow);

            $('#namespaceField').val('');
            $('#nameSpaceCustomObjects').val('');
            $('#nameOperations').val('');
            $('#namespaceCustomCode').val('');
            $('#namespaceFunctionCall').val('');

            $('.fieldscls').hide();
            $('.customObjcls').hide();
            $('.operationscls').hide();
            $('.customcodecls').hide();
            $('.functioncallcls').hide();
            $('#selectOptn').val('');
            $('.modalbtn').click();
            return true;
        }

        if (functionCallOncart == 'Fields') {
            var ruleTypeTaken = $('#ruleType').val();
            if (ruleTypeTaken == 'TEMPLATE' || ruleTypeTaken == 'FACT_TEMPLATE') {
                $(".templateTypeOption").show();
                $("#tableHeadRow_" + tableno).attr('colspan', 7);
            } else {
                $(".templateTypeOption").hide();
                $("#tableHeadRow_" + tableno).attr('colspan', 6);
            }
            $("#whenCurrTableType").val('field');
            $('.tableHeadForField_' + tableno).show();
            $('.FieldsHeading_' + tableno).show();
            $('#fieldFor_' + tableno + '_0').val('Field Call');
            $('#fieldForWhenRule_' + tableno).val('Field Call');
            $('#cusOperation_' + tableno).val('');

            $('#browt_AllFunction_' + tableno + '_' + obj).empty();

            $('#browt_AllFunction_' + tableno + '_' + obj).append("<option value=''>");
            $.each(PClevel.jupiterMetaData.result.methodsList, function (i, item) {
                $('#browt_AllFunction_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
            });

            $('#browt_ChooseField_' + tableno + '_' + obj).empty();
            $('#browt_ChooseField_' + tableno + '_' + obj).append("<option value=''>");
            $.each(PClevel.jupiterMetaData.result.fieldList, function (i, item) {
                $('#browt_ChooseField_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
            });
            $(".ChooseFieldCls_" + tableno + "_" + obj).show();
            //$('#ChooseField_'+tableno+'_'+obj).hide();
            $(".FunctionClsDrop_" + tableno + "_" + obj).hide();
            var countRow = parseInt($("#indexValue").val()) + 1;
            $("#indexValue").val(countRow);

            $('#namespaceField').val('');
            $('#nameSpaceCustomObjects').val('');
            $('#nameOperations').val('');
            $('#namespaceCustomCode').val('');
            $('#namespaceFunctionCall').val('');

            $('.fieldscls').hide();
            $('.customObjcls').hide();
            $('.operationscls').hide();
            $('.customcodecls').hide();
            $('.functioncallcls').hide();
            $('#selectOptn').val('');
            $('.modalbtn').click();
            return true;
        }


        var fieldJson = '';
        fieldJson = $('#StatementCart_' + tableno + '_' + obj).val()
        fieldJson = $('#nameSpaceCustomObjects').val();
        if (functionCallOncart == 'Custom Objects') {
            $('#tableRow_' + tableno + '_' + obj).hide();
            $('#addMoreRulebutton_' + tableno).hide();
            var ruleTypeTaken = $('#ruleType').val();

            if (fieldJson == '') {
                fieldJson = $('#namespaceField').val();
                $("#errmsg").text("Please select at least one Custom Objects");
                $("#nameSpaceCustomObjects").focus();
                return false;
            } else {
                $("#errmsg").text("");
            }
            $('#fieldForWhenRule_' + tableno).val(fieldJson);
            $('#rootpath_' + tableno).val(fieldJson);
        }

        $('#thheadSecondary_' + tableno + '_' + obj).text('There is ' + fieldJson + ' with');
        $('#fieldFor_' + tableno + '_' + obj).val(fieldJson);

        var allChooseFilelds;
        var allmethodlist=[];
        if (fieldJson == 'CART' || fieldJson == 'PAYMENT' || fieldJson == 'PREORDERVALIDATION') {
            if (fieldJson == 'CART' || fieldJson == 'PAYMENT' || fieldJson == 'PREORDERVALIDATION') {
                allChooseFilelds = Object.keys(PClevel.jupiterMetaData.result.field)
            } else {
                allChooseFilelds = PClevel.jupiterMetaData.result.customObjects
            }
        } else if (PClevel.jupiterMetaData.result.field[fieldJson].field) {
            console.log('All Data:', PClevel.jupiterMetaData.result.field[fieldJson].field)
            console.log(Object.keys(PClevel.jupiterMetaData.result.field[fieldJson].field))
            allChooseFilelds = Object.keys(PClevel.jupiterMetaData.result.field[fieldJson].field)
            if(typeof PClevel.jupiterMetaData.result.field[fieldJson].methodsList!='undefined'){
                allmethodlist=PClevel.jupiterMetaData.result.field[fieldJson].methodsList;
                }
                console.log('allmethodlist',allmethodlist)
        }
        if (allChooseFilelds) {
            $('#browt_AllFunction_' + tableno + '_' + obj).empty();
     
            if(allmethodlist.length>0){
            $('#browt_AllFunction_' + tableno + '_' + obj).append("<option value=''>");
            $.each(allmethodlist, function (i, item) {
                $('#browt_AllFunction_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
            });
          }

            $('#ChooseField_' + tableno + '_' + obj).show();


            if (fieldJson == 'CART' || fieldJson == 'PAYMENT' || fieldJson == 'PREORDERVALIDATION') {
                $('#CartAndStatement_' + tableno + '_' + obj).show();
                $('#browt_Conditions_' + tableno + '_' + obj).append("<option value=''>");
                $.each(allChooseFilelds, function (i, item) {
                    //  var name = "( " + item.id + "_" + item.frameType + " )"
                    $('#browt_Conditions_' + obj).append('<option value="' + item + '">' + item + '</option>');
                });

            } else {
                var customOperationsResult = PClevel.jupiterMetaData.result.field[fieldJson].customKeywords.condition;
                if (customOperationsResult.length > 0) {
                    //New Table Then part


                    //New Table Then part 
                    $('.cusOpr_' + tableno).hide();
                    $('.cusOprAppliedOnField_' + tableno).hide();
                    $('#browt_customOperations_' + tableno).empty();
                    $('#browt_customOperations_' + tableno).append("<option value=''>");
                    $.each(customOperationsResult, function (i, item) {
                        $('#browt_customOperations_' + tableno).append('<option value="' + item.name + '">' + item.name + '</option>');
                    });

                    //For model pop on field levelcustomoperation dropdown 
                    $('#browt_customOperationsFieldLevel').empty();
                    $('#browt_customOperationsFieldLevel').append("<option value=''>");
                    $.each(customOperationsResult, function (i, item) {

                        $('#browt_customOperationsFieldLevel').append('<option value="' + item.name + '">' + item.name + '</option>');
                    });

                }

                $('#browt_ChooseField_' + tableno + '_' + obj).empty();
                $('#browt_ChooseField_' + tableno + '_' + obj).append("<option value=''>");
                $.each(allChooseFilelds, function (i, item) {
                    $('#browt_ChooseField_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
                });
            }
        } else {
            $('#browt_AllFunction_' + tableno + '_' + obj).empty();

            $('#browt_AllFunction_' + tableno + '_' + obj).append("<option value=''>");
            $.each(PClevel.jupiterMetaData.result.methodsList, function (i, item) {
                $('#browt_AllFunction_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
            });

            var allOperators = Object.values(PClevel.jupiterMetaData.result.field[fieldJson].allowedActions)
            $('#condition_' + tableno + '_' + obj).empty();
            $('#ChooseField_' + tableno + '_' + obj).hide();
            $('#browt_condition_' + tableno + '_' + obj).empty();
            $('#browt_condition_' + tableno + '_' + obj).append("<option value=''>");
            $.each(allOperators, function (i, item) {
                $('#browt_condition_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
            });
        }
        var countRow = parseInt($("#indexValue").val()) + 1;
        $("#indexValue").val(countRow);
    }
    $('#namespaceField').val('');
    $('#nameSpaceCustomObjects').val('');
    $('#nameOperations').val('');
    $('#namespaceCustomCode').val('');
    $('#namespaceFunctionCall').val('');

    $('.fieldscls').hide();
    $('.customObjcls').hide();
    $('.operationscls').hide();
    $('.customcodecls').hide();
    $('.functioncallcls').hide();
    $('#selectOptn').val('');
    $('.modalbtn').click();
}

function checkValidation() {
    if ($("#addrule").valid()) {
        var formData = $("#addrule").serialize();
        console.log("formData serialize:", formData);
        $.ajax({
            type: "POST",
            url: "/jupiter/validate-rule",
            data: formData
        }).done(function (resultRes) {
            console.log("============ ajax Response ==========");
            console.log(resultRes);
            $(".topMessageRow").hide();
            $(".successMsg").hide();
            $(".errorMsg").hide();
            $(".msgRow").html('');
            if (resultRes.status == 200) {
                $(".topMessageRow").show();
                $("#successMsg").show();
                $("#errorMsg").hide();
                $("#successMsg").html(resultRes.result);
                $('html, body').animate({ scrollTop: $('.navbar-expand-md').offset().top }, 'slow');
                return true;

            } else {
                $(".topMessageRow").show();
                $("#successMsg").hide();
                $("#errorMsg").show();
                $("#errorMsg").html(JSON.stringify(resultRes, undefined, 2));
                //$("#errorMsg").html(resultRes.message);
                $('html, body').animate({ scrollTop: $('.navbar-expand-md').offset().top }, 'slow');
                return false;
            }
        });
    }
}

function draftSaveRule() {
    var formData = $("#addrule").serialize();
    //console.log("formData serialize:", formData);
    $.ajax({
        type: "POST",
        url: "/jupiter/draft-save-rule",
        data: formData
    }).done(function (resultRes) {
        console.log("============ ajax Response ==========");
        console.log(resultRes);
        $(".topMessageRow").hide();
        $(".successMsg").hide();
        $(".errorMsg").hide();
        $(".msgRow").html('');
        if (resultRes.status == 200) {
            $(".topMessageRow").show();
            $("#successMsg").show();
            $("#errorMsg").hide();
            $("#successMsg").html(resultRes.result);
            $('html, body').animate({ scrollTop: $('.navbar-expand-md').offset().top }, 'slow');
            return true;

        } else {
            $(".topMessageRow").show();
            $("#successMsg").hide();
            $("#errorMsg").show();
            $("#errorMsg").html(JSON.stringify(resultRes, undefined, 2));
            //$("#errorMsg").html(resultRes.result);
            $('html, body').animate({ scrollTop: $('.navbar-expand-md').offset().top }, 'slow');
            return false;
        }
    });
}

function changeCartStatementObjectFieldThen(obj) {
    var obj = parseInt(obj);
    //console.log('Global variable:', PClevel)
    var fieldJson = $('#StatementCart_then_' + obj).val()
    $('#fieldFor_then_' + obj).val(fieldJson);
    var allChooseFilelds;
    if (fieldJson == 'PAYMENT' || fieldJson == 'CART' || fieldJson == 'PREORDERVALIDATION') {
        if (fieldJson == 'CART' || fieldJson == 'PAYMENT' || fieldJson == 'PREORDERVALIDATION') {
            allChooseFilelds = Object.keys(PClevel.jupiterMetaData.result.field)
        } else {
            allChooseFilelds = PClevel.jupiterMetaData.result.customObjects
        }
    } else if (PClevel.jupiterMetaData.result.field[fieldJson].field != 'undefined') {
        allChooseFilelds = Object.keys(PClevel.jupiterMetaData.result.field[fieldJson].field)
    }
    if (allChooseFilelds) {
        $('#ChooseField_then_' + obj).show();
        if (fieldJson == 'CART' || fieldJson == 'PAYMENT' || fieldJson == 'PREORDERVALIDATION') {
            $('#CartAndStatement_then_' + obj).show();
            $('#browt_Conditions_' + obj).append("<option value=''>");
            $.each(allChooseFilelds, function (i, item) {
                $('#browt_Conditions_then_' + obj).append('<option value="' + item + '">' + item + '</option>');
            });
        } else {
            $('#browt_ChooseField_then_' + obj).empty();
            $('#browt_ChooseField_then_' + obj).append("<option value=''>");
            $.each(allChooseFilelds, function (i, item) {
                //  var name = "( " + item.id + "_" + item.frameType + " )"
                $('#browt_ChooseField_then_' + obj).append('<option value="' + item + '">' + item + '</option>');
            });
        }
    } else {
        var allOperators = Object.values(PClevel.jupiterMetaData.result.field[fieldJson].allowedActions)
        $('#condition_then_' + obj).empty();
        $('#ChooseField_then_' + obj).hide();
        $('#browt_condition_then_' + obj).empty();
        $('#browt_condition_then_' + obj).append("<option value=''>");
        $.each(allOperators, function (i, item) {
            $('#browt_condition_then_' + obj).append('<option value="' + item + '">' + item + '</option>');
        });
    }
}

function changeCustomObjectFieldaddMoreThen(obj) {
    console.log('Global variable:', PClevel)
    var fieldJson = $('#customObjects').val()
    var allChooseFilelds;
    if (fieldJson == 'CART' || fieldJson == 'PAYMENT' || fieldJson == 'PREORDERVALIDATION') {
        if (fieldJson == 'CART' || fieldJson == 'PAYMENT' || fieldJson == 'PREORDERVALIDATION') {
            allChooseFilelds = Object.keys(PClevel.jupiterMetaData.result.field)
        } else {
            allChooseFilelds = PClevel.jupiterMetaData.result.customObjects
        }
    } else if (PClevel.jupiterMetaData.result.field[fieldJson].field != 'undefined') {
        allChooseFilelds = Object.keys(PClevel.jupiterMetaData.result.field[fieldJson].field);
    }
    if (allChooseFilelds) {
        if (fieldJson == 'The following exists' || fieldJson == 'The following does not exist' || fieldJson == 'Any of the following are true' || fieldJson == 'CART') {
            $('#CartAndStatement_then_' + obj).show();
            $('#browt_Conditions_then_' + obj).append("<option value=''>");
            $.each(allChooseFilelds, function (i, item) {
                $('#browt_Conditions_then_' + obj).append('<option value="' + item + '">' + item + '</option>');
            });

        } else {
            $('#browt_ChooseField_then_' + obj).append("<option value=''>");
            $.each(allChooseFilelds, function (i, item) {
                if (item != '') {
                    $('#browt_ChooseField_then_' + obj).append('<option value="' + item + '">' + item + '</option>');
                }
            });
        }
    } else {
        var allOperators = Object.values(PClevel.jupiterMetaData.result.field[fieldJson].allowedActions)
        $('#condition_then_' + obj).empty();
        $('#ChooseField_then_' + obj).hide();

        $('#browt_condition_then_' + obj).empty();
        $('#browt_condition_then_' + obj).append("<option value=''>");
        $.each(allOperators, function (i, item) {
            $('#browt_condition_then_' + obj).append('<option value="' + item + '">' + item + '</option>');
        });
    }
}

function addMoreRulethen(tablenum) {

    let rowCount = parseInt($('#totalRulesThen_' + tablenum).val());
    
    if (rowCount > 0) {
        rowCount = rowCount - 1;
    }
    var nextRow = (rowCount + 1)
    
    var rowId = "nonCustmOprFieldForThen_" + tablenum + "_" + rowCount;
    var newRowId = "nonCustmOprFieldForThen_" + tablenum + "_" + nextRow;
    var tableChildRowIdOld=tablenum + "_" + rowCount;
    var tableChildRowIdNew=tablenum + "_" + nextRow;

    //   alert('rowId-->'+rowId)
    //  alert('newRowId-->'+newRowId)
    //  alert('rowCount-->'+rowCount)
    // alert('nextRow-->'+nextRow)
    // alert(tableChildRowIdOld)
    // alert(tableChildRowIdNew)
    
    //let rowfyable = $('#tableaddRecorderThenChild_' + tablenum).closest('table');
    //let lastRow = $("#tableaddRecorderThenChild_" + tablenum + " tbody tr").last().clone();
    let lastRow = $("#"+rowId).clone();
    var newHtmlText1 = '<tr id="' + newRowId + '">' + lastRow.html().replace("ChoosenFieldThen_" + tablenum + '_' + rowCount, "ChoosenFieldThen_" + tablenum + '_' + nextRow) + '</tr>';
    var newHtmlText2 = newHtmlText1.replace("thheadSecondaryThen_" + tablenum + '_' + rowCount, "thheadSecondaryThen_" + tablenum + '_' + nextRow);
    var newHtmlText3 = newHtmlText2.replace("browt_ChooseFieldThen_" + tablenum + '_' + rowCount, "browt_ChooseFieldThen_" + tablenum + '_' + nextRow);
    var newHtmlText4 = newHtmlText3.replace("removeThen_" + tablenum + '_' + rowCount, "removeThen_" + tablenum + '_' + nextRow);
    var newHtmlText4 = newHtmlText4.replace("addrulebuttonthen_" + tablenum + '_' + rowCount, "addrulebuttonthen_" + tablenum + '_' + nextRow);

    var newHtmlText5 = newHtmlText4.replace("browt_ChooseFieldThen_" + tablenum + '_' + rowCount, "browt_ChooseFieldThen_" + tablenum + '_' + nextRow);
    var newHtmlText6 = newHtmlText5.replace("ruleValueThen_" + tablenum + '_' + rowCount, "ruleValueThen_" + tablenum + '_' + nextRow);
    var newHtmlText7 = newHtmlText6.replace("fieldForThenn_" + tablenum + '_' + rowCount, "fieldForThenn_" + tablenum + '_' + nextRow);
    var newHtmlText8 = newHtmlText7.replace("dataTypeOfFieldThen_" + tablenum + '_' + rowCount, "dataTypeOfFieldThen_" + tablenum + '_' + nextRow);
    var newHtmlText9 = newHtmlText8.replace("getDataTypeThen(" + tablenum + "," + rowCount + ")", "getDataTypeThen(" + tablenum + "," + nextRow + ")");
    var newHtmlText9 = newHtmlText9.replace("removeRuleRowThen(" + tablenum + "," + rowCount + ")", "removeRuleRowThen(" + tablenum + "," + nextRow + ")");
    var newHtmlText9 = newHtmlText9.replace("functionParameterThen_" + tablenum + '_' + rowCount, "functionParameterThen_" + tablenum + '_' + nextRow);
    var newHtmlText9 = newHtmlText9.replace("allFunctionsThen_" + tablenum + '_' + rowCount, "allFunctionsThen_" + tablenum + '_' + nextRow);
    var newHtmlText9 = newHtmlText9.replace("templateDropDownThen_" + tablenum + '_' + rowCount, "templateDropDownThen_" + tablenum + '_' + nextRow);
    //var newHtmlText9 = newHtmlText9.replace("setvalueForTemplateThen('" + tablenum + '_' + rowCount + "')", "setvalueForTemplateThen('" + tablenum + '_' + nextRow + "')");
    var newHtmlText9 = newHtmlText9.replace("setvalueForTemplateThen(" + tablenum + "," + rowCount + ")", "setvalueForTemplateThen(" + tablenum + "," + nextRow + ")");
    var newHtmlText9 = newHtmlText9.replace("templateVariableSymbolThen_" + tablenum + '_' + rowCount, "templateVariableSymbolThen_" + tablenum + '_' + nextRow);
    var newHtmlText9 = newHtmlText9.replace("templateVariableSymbolDataThen_" + tablenum + '_' + rowCount, "templateVariableSymbolDataThen_" + tablenum + '_' + nextRow);
    var newHtmlText9 = newHtmlText9.replace("ChooseFieldClsThen_" + tablenum + '_' + rowCount, "ChooseFieldClsThen_" + tablenum + '_' + nextRow);




    var newHtmlText10 = newHtmlText9.replace("display: none;", "");

    //$("#tableaddRecorderThen_" + tablenum + " tbody").append(newHtmlText10);
    
    $("#tableaddRecorderThen_"+ tablenum + "> tbody > tr").last().after(newHtmlText10);
    var nxtRl = parseInt(nextRow) + 1;
    $("#totalRulesThen_" + tablenum).val(nxtRl)
    $("#ChoosenFieldThen_" + tablenum +'_'+ nextRow).val('');
    $("#ruleValueThen_" + tablenum +'_'+ nextRow).val('');
    $(".templateVariableSymbolDataThen_" + tablenum +'_'+ nextRow).removeClass('hide');
   // alert(".templateVariableSymbolDataThen_" + tablenum +'_'+ nextRow)
    $(".templateVariableSymbolDataThen_" + tablenum +'_'+nextRow).hide();

    var checkFunction=$('#allFunctionsThen_' + tablenum + '_' + rowCount).val();
   //alert(checkFunction)
   if(checkFunction!='undefined' && checkFunction!=''){
    $(".ChooseFieldClsThen_" +tablenum+'_'+nextRow).hide();
   }

    if (nextRow > 0) {
        $("#removeThen_" + tablenum + "_" + rowCount).show();
        $("#addrulebuttonthen_" + tablenum + "_" + rowCount).remove();
    }
    $("#removeThen_" + tablenum + "_" + nextRow).hide();

}

function addMoreRulethenOLDChooseField(tablenum) {

    let rowCount = parseInt($('#totalRulesThenOLDChooseField_' + tablenum).val());
    
    if (rowCount > 0) {
        rowCount = rowCount - 1;
    }
    var nextRow = (rowCount + 1)
    
    var rowId = "nonCustmOprFieldForThen_" + tablenum + "_" + rowCount;
    var newRowId = "nonCustmOprFieldForThen_" + tablenum + "_" + nextRow;
    var tableChildRowIdOld=tablenum + "_" + rowCount;
    var tableChildRowIdNew=tablenum + "_" + nextRow;

    //   alert('rowId-->'+rowId)
    //   alert('newRowId-->'+newRowId)
    //  alert('rowCount-->'+rowCount)
    //  alert('nextRow-->'+nextRow)
    // alert(tableChildRowIdOld)
    // alert(tableChildRowIdNew)
    
    //let rowfyable = $('#tableaddRecorderThenChild_' + tablenum).closest('table');
    //let lastRow = $("#tableaddRecorderThenChild_" + tablenum + " tbody tr").last().clone();
    let lastRow = $("#"+rowId).clone();
    var newHtmlText1 = '<tr id="' + newRowId + '">' + lastRow.html().replace("ChoosenFieldThen_" + tablenum + '_' + rowCount, "ChoosenFieldThen_" + tablenum + '_' + nextRow) + '</tr>';
    var newHtmlText2 = newHtmlText1.replace("thheadSecondaryThen_" + tablenum + '_' + rowCount, "thheadSecondaryThen_" + tablenum + '_' + nextRow);
    var newHtmlText3 = newHtmlText2.replace("browt_ChooseFieldThen_" + tablenum + '_' + rowCount, "browt_ChooseFieldThen_" + tablenum + '_' + nextRow);
    var newHtmlText4 = newHtmlText3.replace("removeThen_" + tablenum + '_' + rowCount, "removeThen_" + tablenum + '_' + nextRow);
    var newHtmlText4 = newHtmlText4.replace("addrulebuttonthen_" + tablenum + '_' + rowCount, "addrulebuttonthen_" + tablenum + '_' + nextRow);

    var newHtmlText5 = newHtmlText4.replace("browt_ChooseFieldThen_" + tablenum + '_' + rowCount, "browt_ChooseFieldThen_" + tablenum + '_' + nextRow);
    var newHtmlText6 = newHtmlText5.replace("ruleValueThen_" + tablenum + '_' + rowCount, "ruleValueThen_" + tablenum + '_' + nextRow);
    var newHtmlText7 = newHtmlText6.replace("fieldForThenn_" + tablenum + '_' + rowCount, "fieldForThenn_" + tablenum + '_' + nextRow);
    var newHtmlText8 = newHtmlText7.replace("dataTypeOfFieldThen_" + tablenum + '_' + rowCount, "dataTypeOfFieldThen_" + tablenum + '_' + nextRow);
    var newHtmlText9 = newHtmlText8.replace("getDataTypeThen(" + tablenum + "," + rowCount + ")", "getDataTypeThen(" + tablenum + "," + nextRow + ")");
    var newHtmlText9 = newHtmlText9.replace("removeRuleRowThen(" + tablenum + "," + rowCount + ")", "removeRuleRowThen(" + tablenum + "," + nextRow + ")");
    var newHtmlText9 = newHtmlText9.replace("functionParameterThen_" + tablenum + '_' + rowCount, "functionParameterThen_" + tablenum + '_' + nextRow);
    var newHtmlText9 = newHtmlText9.replace("allFunctionsThen_" + tablenum + '_' + rowCount, "allFunctionsThen_" + tablenum + '_' + nextRow);
    var newHtmlText9 = newHtmlText9.replace("templateDropDownThen_" + tablenum + '_' + rowCount, "templateDropDownThen_" + tablenum + '_' + nextRow);
    //var newHtmlText9 = newHtmlText9.replace("setvalueForTemplateThen('" + tablenum + '_' + rowCount + "')", "setvalueForTemplateThen('" + tablenum + '_' + nextRow + "')");
    var newHtmlText9 = newHtmlText9.replace("setvalueForTemplateThen(" + tablenum + "," + rowCount + ")", "setvalueForTemplateThen(" + tablenum + "," + nextRow + ")");
    var newHtmlText9 = newHtmlText9.replace("templateVariableSymbolThen_" + tablenum + '_' + rowCount, "templateVariableSymbolThen_" + tablenum + '_' + nextRow);
    var newHtmlText9 = newHtmlText9.replace("templateVariableSymbolDataThen_" + tablenum + '_' + rowCount, "templateVariableSymbolDataThen_" + tablenum + '_' + nextRow);
    var newHtmlText9 = newHtmlText9.replace("ChooseFieldClsThen_" + tablenum + '_' + rowCount, "ChooseFieldClsThen_" + tablenum + '_' + nextRow);




    var newHtmlText10 = newHtmlText9.replace("display: none;", "");

    //$("#tableaddRecorderThen_" + tablenum + " tbody").append(newHtmlText10);
    
    $("#tableaddRecorderThen_"+ tablenum + "> tbody > tr").last().after(newHtmlText10);
    var nxtRl = parseInt(nextRow) + 1;
    $("#totalRulesThenOLDChooseField_" + tablenum).val(nxtRl)
    $("#ChoosenFieldThen_" + tablenum +'_'+ nextRow).val('');
    $("#ruleValueThen_" + tablenum +'_'+ nextRow).val('');
    $(".templateVariableSymbolDataThen_" + tablenum +'_'+ nextRow).removeClass('hide');
   // alert(".templateVariableSymbolDataThen_" + tablenum +'_'+ nextRow)
    $(".templateVariableSymbolDataThen_" + tablenum +'_'+nextRow).hide();

    var checkFunction=$('#allFunctionsThen_' + tablenum + '_' + rowCount).val();
   //alert(checkFunction)
   if(checkFunction!='undefined' && checkFunction!=''){
    $(".ChooseFieldClsThen_" +tablenum+'_'+nextRow).hide();
   }

    if (nextRow > 0) {
        $("#removeThen_" + tablenum + "_" + rowCount).show();
        $("#addrulebuttonthen_" + tablenum + "_" + rowCount).remove();
    }
    $("#removeThen_" + tablenum + "_" + nextRow).hide();

}

function addMoreRulethenNew(tablenum,rowCount) {
    
    // let rowCount = parseInt($('#totalRulesThen_' + tablenum).val());
 
     // if (rowCount > 0) {
     //     rowCount = rowCount - 1;
     // }
     var maxCount=$('#totalRulesThenNewChooseField_'+tablenum).val();
     var nextRow = (rowCount + 1)
     let rowfyable = $('#tableaddRecorderThen_' + tablenum).closest('table');
 
     let lastRow = $("#conditionThenForCustomOperation_" + tablenum+"_"+rowCount).clone()//.append('<td class="remove"><svg width="24" height="24" fill="#aa1818" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m3.707-11.707a.999.999 0 0 0-1.414 0L10 8.586 7.707 6.293a.999.999 0 1 0-1.414 1.414L8.586 10l-2.293 2.293a.999.999 0 1 0 1.414 1.414L10 11.414l2.293 2.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l2.293-2.293a.999.999 0 0 0 0-1.414"></path></svg></td>');
     let newRowId="conditionThenForCustomOperation_" + tablenum+"_"+nextRow;
 
    
     tableChildRowIdOld=tablenum + "_" + rowCount;
     tableChildRowIdNew=tablenum + "_" + nextRow;

    //   alert('rowCount='+rowCount);
    //   alert('nextRow=='+nextRow);
    //   alert('maxCount=='+maxCount);
 
     var newHtmlText1 = '<tr id="'+newRowId+'">' + lastRow.html().replace("ChooseFieldThenNew_" + tablenum + '_' + rowCount, "ChooseFieldThenNew_" + tablenum + '_' + nextRow) + '</tr>';
     var newHtmlText2 = newHtmlText1.replace("thheadSecondaryThenNew_" + tablenum + '_' + rowCount, "thheadSecondaryThenNew_" + tablenum + '_' + nextRow);
     var newHtmlText3 = newHtmlText2.replace("browt_ChooseFieldThenNew_" + tablenum + '_' + rowCount, "browt_ChooseFieldThenNew_" + tablenum + '_' + nextRow);
     var newHtmlText4 = newHtmlText3.replace("fieldForThenNew_" + tablenum + '_' + rowCount, "fieldForThenNew_" + tablenum + '_' + nextRow);
     var newHtmlText5 = newHtmlText4.replace("remove_thenNew_" + rowCount, "remove_thenNew_" + nextRow);
     var newHtmlText6 = newHtmlText5.replace("browt_ChooseFieldThenNew_" + tablenum + '_' + rowCount, "browt_ChooseFieldThenNew_" + tablenum + '_' + nextRow);
     var newHtmlText7 = newHtmlText6.replace("ruleValueThenNew_" + tablenum + '_' + rowCount, "ruleValueThenNew_" + tablenum + '_' + nextRow);
     var newHtmlText8 = newHtmlText7.replace("fieldForThennNew_" + tablenum + '_' + rowCount, "fieldForThennNew_" + tablenum + '_' + nextRow);
     var newHtmlText8 = newHtmlText8.replace("addrulebuttonthenNew_" + tablenum + '_' + rowCount, "addrulebuttonthenNew_" + tablenum + '_' + nextRow);
     var newHtmlText8 = newHtmlText8.replace("FunctionClsDropThenNew_" + tablenum + '_' + rowCount, "FunctionClsDropThenNew_" + tablenum + '_' + nextRow);
     var newHtmlText8 = newHtmlText8.replace("FunctionClsDropThenNew_" + tablenum + '_' + rowCount, "FunctionClsDropThenNew_" + tablenum + '_' + nextRow);
     var newHtmlText8 = newHtmlText8.replace("OpeningBracketsThenNew_" + tablenum + '_' + rowCount, "OpeningBracketsThenNew_" + tablenum + '_' + nextRow);
     var newHtmlText8 = newHtmlText8.replace("ClosingBracketsThenNew_" + tablenum + '_' + rowCount, "ClosingBracketsThenNew_" + tablenum + '_' + nextRow);
     var newHtmlText8 = newHtmlText8.replace("conditionThenNew_" + tablenum + '_' + rowCount, "conditionThenNew_" + tablenum + '_' + nextRow);
     var newHtmlText8 = newHtmlText8.replace("conditionThenNew_" + tablenum + '_' + rowCount, "conditionThenNew_" + tablenum + '_' + nextRow);
     var newHtmlText8 = newHtmlText8.replace("browt_conditionThenNew_" + tablenum + '_' + rowCount, "browt_conditionThenNew_" + tablenum + '_' + nextRow);
     var newHtmlText8 = newHtmlText8.replace("operatorThenNew_" + tablenum + '_' + rowCount, "operatorThenNew_" + tablenum + '_' + nextRow);
     var newHtmlText8 = newHtmlText8.replace("operatorThenNew_" + tablenum + '_' + rowCount, "operatorThenNew_" + tablenum + '_' + nextRow);
     var newHtmlText8 = newHtmlText8.replace("functionParameterThenNew_" + tablenum + '_' + rowCount, "functionParameterThenNew_" + tablenum + '_' + nextRow);
     var newHtmlText8 = newHtmlText8.replace("ChooseFieldThenNew_" + tablenum + '_' + rowCount, "ChooseFieldThenNew_" + tablenum + '_' + nextRow);
     var newHtmlText9 = newHtmlText8.replace("ChooseFieldClsThenNew_" + tablenum + '_' + rowCount, "ChooseFieldClsThenNew_" + tablenum + '_' + nextRow);
     var newHtmlText9 = newHtmlText9.replace("removeThenNew_" + tablenum + '_' + rowCount, "removeThenNew_" + tablenum + '_' + nextRow);
     var newHtmlText9 = newHtmlText9.replace("addMoreRulethenNew(" + tablenum + "," + rowCount + ")", "addMoreRulethenNew(" + tablenum + "," + nextRow + ")");
     var newHtmlText9 = newHtmlText9.replace("dataTypeOfFieldThenNew_" + tablenum + '_' + rowCount, "dataTypeOfFieldThenNew_" + tablenum + '_' + nextRow);
 
 
     var newHtmlText9 = newHtmlText9.replace("display: none;", "");
     var newHtmlText9 = newHtmlText9.replace("removeRuleRowThenNew('"+tableChildRowIdOld+"')", "removeRuleRowThenNew('"+tableChildRowIdNew+"')");
     var newHtmlText9 = newHtmlText9.replace("getallowedActionsThen(" + tablenum + "," + rowCount + ")", "getallowedActionsThen(" + tablenum + "," + nextRow + ")");
     var newHtmlText9 = newHtmlText9.replace("templateVariableSymbolThenNew_" + tablenum + '_' + rowCount, "templateVariableSymbolThenNew_" + tablenum + '_' + nextRow);
     var newHtmlText9 = newHtmlText9.replace("templateVariableSymbolDataThenNew_" + tablenum + '_' + rowCount, "templateVariableSymbolDataThenNew_" + tablenum + '_' + nextRow);
     var newHtmlText9 = newHtmlText9.replace("setvalueForTemplateThenNew(" + tablenum + "," + rowCount + ")", "setvalueForTemplateThenNew(" + tablenum + "," + nextRow + ")");
     var newHtmlText9 = newHtmlText9.replace("templateDropDownThenNew_" + tablenum + '_' + rowCount, "templateDropDownThenNew_" + tablenum + '_' + nextRow);
    
 
     $("#customConditionNewTableParentLevel_" + maxCount + " tbody:last").append(newHtmlText9);
 
     // var nxtRl = parseInt(nextRow) + 1;
     // $("#totalRulesThen_" + tablenum).val(nxtRl)
 
     $("#ChoosenFieldThenNew_" + tablenum +'_'+nextRow).val('');
     $("#ruleValueThenNew_" + tablenum +'_'+nextRow).val('');
     $(".templateVariableSymbolDataThenNew_" + tablenum +'_'+ nextRow).hide();
     if (nextRow > 0) {
         $("#removeThenNew_" + tablenum + "_" + rowCount).show();
         $("#addrulebuttonthenNew_" + tablenum + "_" + rowCount).remove();
     }
     $("#removeThenNew_" + tablenum + "_" + nextRow).hide();
 
 }

function selectOtherOptions() {
    var optionSelected = $('#selectOptn').val();
    if (optionSelected != '') {
        if (optionSelected == 'Fields') {
            $('.fieldscls').hide();
            $('.customObjcls').hide();
            $('.operationscls').hide();
            $('.customcodecls').hide();
            $('.functioncallcls').hide();
        }
        if (optionSelected == 'Custom Objects') {
            $('.fieldscls').hide();
            $('.customObjcls').show();
            $('.operationscls').hide();
            $('.customcodecls').hide();
            $('.functioncallcls').hide();
        }
        if (optionSelected == 'Operations') {
            $('.fieldscls').hide();
            $('.customObjcls').hide();
            $('.operationscls').show();
            $('.customcodecls').hide();
            $('.functioncallcls').hide();

        }
        if (optionSelected == 'Custom Code') {
            $('.fieldscls').hide();
            $('.customObjcls').hide();
            $('.operationscls').hide();
            $('.customcodecls').show();
            $('.functioncallcls').hide();

        }
        if (optionSelected == 'Function Call') {
            $('.fieldscls').hide();
            $('.customObjcls').hide();
            $('.operationscls').hide();
            $('.customcodecls').hide();
            $('.functioncallcls').hide();

        }
    }
}

function checkCustomOperationActions(tableno) {
    $('.cusOprActionValue_' + tableno).show();
    var fieldfor = $('#fieldForWhenRule_' + tableno).val();//$('#fieldFor_' + tableno + '_0').val()
    var operatorCustom = $('#cusOperation_' + tableno).val()

    allCustomActionsArray = PClevel.jupiterMetaData.result.field[fieldfor].customKeywords.condition
    if (allCustomActionsArray.length > 0) {
        $('#browt_customOperationsAction_' + tableno).empty();
        $('#browt_customOperationsAction_' + tableno).append("<option value=''>");
        $.each(allCustomActionsArray, function (i, item) {
            //var name = "( " + item.name + "_" + item.datatype + " )"
            var name = item.name;
            if (name == operatorCustom) {
                if (item.allowedActions != undefined) {
                    console.log('ALL ACTIONSSSS---', item.allowedActions)
                    var allowedActionArr = Object.values(item.allowedActions)
                    if (allowedActionArr.length > 0) {
                        $('.cusOprAction_' + tableno).show();
                        $.each(allowedActionArr, function (j, items) {
                            $('#browt_customOperationsAction_' + tableno).append('<option value="' + items + '">' + items + '</option>');
                        });
                    }
                } else {
                    $('.cusOprAction_' + tableno).hide();
                }
            }

        });
    }

    if (operatorCustom == 'itemExists' || operatorCustom == 'walletExists') {
        $('.cusOprAppliedOnField_' + tableno).hide();
        $('.cusOprAction_' + tableno).hide();
        $('.cusOprActionValue_' + tableno).hide();

    }

    if (operatorCustom == 'itemCount') {
        $('.cusOprAppliedOnField_' + tableno).hide();

    }



}

function addMoreRuleForTableNumThen(tablenumber) {
    $('#thenTableNumberForAdd').val(tablenumber);
    var thenAddMorTableType = $('#thenTableType_' + tablenumber).val();

    if (thenAddMorTableType == 'Fields')
        thenCurrTableType = 'field';
    else if (thenAddMorTableType == 'Function Call')
        thenCurrTableType = 'function';
    else
        thenCurrTableType = thenAddMorTableType;
    $('#addfieldfunctionThen').val(thenCurrTableType);

    if (thenCurrTableType == 'field' || thenCurrTableType == 'function') {
        addFieldOrFunctionThen();
    }
}

function addMoreRuleForTableNum(tablenumber) {
    let rowCount = parseInt($('#totalRules_' + tablenumber).val());
    if (rowCount > 0) {
        rowCount = rowCount - 1;
    }
    if ($('#operator_' + tablenumber + '_' + rowCount).val() == '') {
        alert("Please select an operator");
        $('#operator_' + tablenumber + '_' + rowCount).focus();
        $('#operator_' + tablenumber + '_' + rowCount).addClass("err");
        $('.btn-close').click();
        return false;
    }
    $('#tableNumberForAdd').val(tablenumber);
    
    var whenAddMorTableType = $('#tableType_' + tablenumber).val();
    if (whenAddMorTableType == 'Fields' || whenAddMorTableType == 'Field Call')
        whenCurrTableType = 'field';
    else if (whenAddMorTableType == 'Function Call' || whenAddMorTableType == 'Function')
        whenCurrTableType = 'function';
    else
        whenCurrTableType = whenAddMorTableType;

    $('#addfieldfunction').val(whenCurrTableType);

    if (whenCurrTableType == 'field' || whenCurrTableType == 'function' || whenCurrTableType == 'Custom Objects') {
        addFieldOrFunction(whenCurrTableType);
    }
}

function addMoreRuleForTableNum_NEW(tablenumber) {
    var tableno  = tablenumber
    let rowCount = parseInt($('#totalRules_' + tableno).val());
    if (rowCount > 0) {
        rowCount = rowCount - 1;
    }
    if ($('#operator_' + tableno + '_' + rowCount).val() == '') {
        alert("Please select an operator");
        $('#operator_' + tableno + '_' + rowCount).focus();
        $('#operator_' + tableno + '_' + rowCount).addClass("err");
        $('.btn-close').click();
        return false;
    } else {
        $('#operator_' + tableno + '_' + rowCount).removeClass("err");
        $('#tableNumberForAdd').val(tablenumber);
        var whenAddMorTableType = $('#tableType_' + tablenumber).val();

        if (whenAddMorTableType == 'Fields')
            whenCurrTableType = 'field';
        else if (whenAddMorTableType == 'Function Call')
            whenCurrTableType = 'function';
        else
            whenCurrTableType = whenAddMorTableType;

        $('#addfieldfunction').val(whenCurrTableType);
        if (whenCurrTableType == 'field' || whenCurrTableType == 'function') {
            addFieldOrFunction();
        }
    }
}

function addFieldOrFunction(opnSel) {
    
    $('.modalbtnFieldOrFun').click();
    var tablenum = parseInt($('#tableNumberForAdd').val());
    var optionSelected = $('#addfieldfunction').val()
    if(optionSelected==null){
        optionSelected=opnSel;
    }
    var isItFunction = $('#fieldFor_' + tablenum + '_0').val();
    if (optionSelected == 'field' || optionSelected=='Custom Objects') {
        if (isItFunction == 'Function Call') {
            alert('Field add not applicable');
            return true;
        } else {
            addMoreRule(tablenum);
        }
    }

    if (optionSelected == 'function') {
        addMoreRuleForFunction(tablenum);
    }
}

function addFieldOrFunctionThen() {
    $('.modalbtnFieldOrFun').click();
    var tablenum = parseInt($('#thenTableNumberForAdd').val());
    var optionSelected = $('#addfieldfunctionThen').val()
    var isItFunction = $('#fieldFor_' + tablenum + '_0').val();
    if (optionSelected == 'field') {
        if (isItFunction == 'Function Call') {
            alert('Field add not applicable');
            return true;
        } else {
            addMoreRulethen(tablenum);
        }
    }

    if (optionSelected == 'function') {
        addMoreRuleForFunction(tablenum);
    }
}

function addMoreRuleForFunction_OLD(tablnum) {
    var tableno = ''
    if (tablnum != '') {
        tableno = parseInt(tablnum);
    } else {
        tableno = parseInt($('#indexValue').val() - 1)
    }
    let rowCount = parseInt($('#totalRules_' + tableno).val());
    if (rowCount > 0) {
        rowCount = rowCount - 1;
    }

    if ($('#ChooseField_0' + rowCount).val() == '') {
        alert("Please select a Field Name");
        $('#ChooseField_0' + rowCount).focus();
        $('#ChooseField_0' + rowCount).addClass("err");
        return false;
    } else {
        $('#ChooseField_0' + rowCount).removeClass("err");
    }

    var nextRow = (rowCount + 1)
    let rowfyable = $('#tableaddRecorder_' + tableno).closest('table');
    let lastRow = $("#tableaddRecorder_" + tableno + " tbody tr").last().clone()//.append('<td class="remove"><svg width="24" height="24" fill="#aa1818" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m3.707-11.707a.999.999 0 0 0-1.414 0L10 8.586 7.707 6.293a.999.999 0 1 0-1.414 1.414L8.586 10l-2.293 2.293a.999.999 0 1 0 1.414 1.414L10 11.414l2.293 2.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l2.293-2.293a.999.999 0 0 0 0-1.414"></path></svg></td>');

    var newHtmlText1 = '<tr>' + lastRow.html().replace("ChooseField_" + tableno + "_" + rowCount, "ChooseField_" + tableno + "_" + nextRow) + '</tr>';
    var newHtmlText2 = newHtmlText1.replace("OpeningBrackets_" + tableno + "_" + rowCount, "OpeningBrackets_" + tableno + "_" + nextRow);
    var newHtmlText3 = newHtmlText2.replace("ruleValue_" + tableno + "_" + rowCount, "ruleValue_" + tableno + "_" + nextRow);
    var newHtmlText4 = newHtmlText3.replace("condition_" + tableno + "_" + rowCount, "condition_" + tableno + "_" + nextRow);
    var newHtmlText5 = newHtmlText4.replace("operator_" + tableno + "_" + rowCount, "operator_" + tableno + "_" + nextRow);
    var newHtmlText6 = newHtmlText5.replace("getallowedActions(" + tableno + "," + rowCount + ")", "getallowedActions(" + tableno + "," + nextRow + ")");
    var newHtmlText7 = newHtmlText6.replace("remove_" + tableno + "_" + rowCount, "remove_" + tableno + "_" + nextRow);
    var newHtmlText8 = newHtmlText7.replace("browt_ChooseField_" + tableno + "_" + rowCount, "browt_ChooseField_" + tableno + "_" + nextRow);
    var newHtmlText9 = newHtmlText8.replace("ChooseField_" + tableno + "_" + rowCount, "ChooseField_" + tableno + "_" + nextRow);
    var newHtmlText10 = newHtmlText9.replace("fieldFor_" + tableno + "_" + rowCount, "fieldFor_" + tableno + "_" + nextRow);
    var newHtmlText11 = newHtmlText10.replace("browt_condition_" + tableno + "_" + rowCount, "browt_condition_" + tableno + "_" + nextRow);
    var newHtmlText12 = newHtmlText11.replace("CartAndStatement_" + tableno + "_" + rowCount, "CartAndStatement_" + tableno + "_" + nextRow);
    var newHtmlText13 = newHtmlText12.replace("StatementCart_" + tableno + "_" + rowCount, "StatementCart_" + tableno + "_" + nextRow);
    var newHtmlText14 = newHtmlText13.replace("browt_Conditions_" + tableno + "_" + rowCount, "browt_Conditions_" + tableno + "_" + nextRow);
    var newHtmlText15 = newHtmlText14.replace("browt_Conditions_" + tableno + "_" + rowCount, "browt_Conditions_" + tableno + "_" + nextRow);
    var newHtmlText16 = newHtmlText15.replace("ClosingBrackets_" + tableno + "_" + rowCount, "ClosingBrackets_" + tableno + "_" + nextRow);
    var newHtmlText17 = newHtmlText16.replace("changeCartStatementObjectField('" + rowCount + "')", "changeCartStatementObjectField('" + nextRow + "')");
    var newHtmlText18 = newHtmlText17.replace("condition_" + tableno + "_" + rowCount, "condition_" + tableno + "_" + nextRow);
    var newHtmlText19 = newHtmlText18.replace("allFunctions_" + tableno + "_" + rowCount, "allFunctions_" + tableno + "_" + nextRow);
    var newHtmlText20 = newHtmlText19.replace("FunctionClsDrop_" + tableno + "_" + rowCount, "FunctionClsDrop_" + tableno + "_" + nextRow);
    var newHtmlText21 = newHtmlText20.replace("ChooseFieldCls_" + tableno + "_" + rowCount, "ChooseFieldCls_" + tableno + "_" + nextRow);
    var newHtmlText22 = newHtmlText21.replace("browt_AllFunction_" + tableno + "_" + rowCount, "browt_AllFunction_" + tableno + "_" + nextRow);
    var newHtmlText23 = newHtmlText22.replace("browt_AllFunction_" + tableno + "_" + rowCount, "browt_AllFunction_" + tableno + "_" + nextRow);
    var newHtmlText24 = newHtmlText23.replace("functionParameter_" + tableno + "_" + rowCount, "functionParameter_" + tableno + "_" + nextRow);


    var newHtmlText25 = newHtmlText24.replace("display: none;", "");
    var newHtmlText26 = newHtmlText25.replace("getallowedActions(" + tableno + "," + rowCount + ")", "getallowedActions(" + tableno + "," + nextRow + ")");

    $("#tableaddRecorder_" + tableno + " tbody").append(newHtmlText26);

    document.getElementById("totalRules_" + tableno).value = nextRow + 1;

    //$("#StatementCart_" + nextRow).val(''); 
    $("#ChooseField_" + tableno + "_" + nextRow).val('');
    $("#ruleValue_" + tableno + "_" + nextRow).val('');
    $("#condition_" + tableno + "_" + nextRow).val('');
    $("#operator_" + tableno + "_" + nextRow).val('');
    $(".FunctionClsDrop_" + tableno + "_" + nextRow).show();
    $(".ChooseFieldCls_" + tableno + "_" + nextRow).hide();
    changeCustomObjectFieldaddMore(nextRow, tableno);
}

function addMoreRuleForFunction(tablnum) {
    var tableno = ''
    if (tablnum != '') {
        tableno = parseInt(tablnum);
    } else {
        tableno = parseInt($('#indexValue').val() - 1)
    }
    let rowCount = parseInt($('#totalRules_' + tableno).val());
    if (rowCount > 0) {
        rowCount = rowCount - 1;
    }

    if ($('#operator_' + tableno + '_' + rowCount).val() == '') {
        alert("Please select an operator");
        $('#operator_' + tableno + '_' + rowCount).focus();
        $('#operator_' + tableno + '_' + rowCount).addClass("err");
        return false;
    } else {
        $('#operator_' + tableno + '_' + rowCount).removeClass("err");
    }

    if ($('#ChooseField_0' + rowCount).val() == '') {
        alert("Please select a Field Name");
        $('#ChooseField_0' + rowCount).focus();
        $('#ChooseField_0' + rowCount).addClass("err");
        return false;
    } else {
        $('#ChooseField_0' + rowCount).removeClass("err");
    }

    var nextRow = (rowCount + 1)
    var rowId = "tableRow_" + tableno + "_" + rowCount;
    let lastRow = $("#" + rowId).clone();
    //let lastRow = $("#tableaddRecorder_" + tableno + " tbody tr").last().clone()//.append('<td class="remove"><svg width="24" height="24" fill="#aa1818" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m3.707-11.707a.999.999 0 0 0-1.414 0L10 8.586 7.707 6.293a.999.999 0 1 0-1.414 1.414L8.586 10l-2.293 2.293a.999.999 0 1 0 1.414 1.414L10 11.414l2.293 2.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l2.293-2.293a.999.999 0 0 0 0-1.414"></path></svg></td>');
    var newRowId = "tableRow_" + tableno + "_" + nextRow;
    var newHtmlText1 = '<tr class="ParentTbl'+tableno+'" id="' + newRowId + '">' + lastRow.html().replace("ChooseField_" + tableno + "_" + rowCount, "ChooseField_" + tableno + "_" + nextRow) + '</tr>';
    var newHtmlText2 = newHtmlText1.replace("OpeningBrackets_" + tableno + "_" + rowCount, "OpeningBrackets_" + tableno + "_" + nextRow);
    var newHtmlText3 = newHtmlText2.replace("ruleValue_" + tableno + "_" + rowCount, "ruleValue_" + tableno + "_" + nextRow);
    var newHtmlText4 = newHtmlText3.replace("condition_" + tableno + "_" + rowCount, "condition_" + tableno + "_" + nextRow);
    var newHtmlText5 = newHtmlText4.replace("operator_" + tableno + "_" + rowCount, "operator_" + tableno + "_" + nextRow);
    var newHtmlText6 = newHtmlText5.replace("getallowedActions(" + tableno + "," + rowCount + ")", "getallowedActions(" + tableno + "," + nextRow + ")");
    var newHtmlText7 = newHtmlText6.replace("remove_" + tableno + "_" + rowCount, "remove_" + tableno + "_" + nextRow);
    var newHtmlText8 = newHtmlText7.replace("browt_ChooseField_" + tableno + "_" + rowCount, "browt_ChooseField_" + tableno + "_" + nextRow);
    var newHtmlText9 = newHtmlText8.replace("ChooseField_" + tableno + "_" + rowCount, "ChooseField_" + tableno + "_" + nextRow);
    var newHtmlText10 = newHtmlText9.replace("fieldFor_" + tableno + "_" + rowCount, "fieldFor_" + tableno + "_" + nextRow);
    var newHtmlText11 = newHtmlText10.replace("browt_condition_" + tableno + "_" + rowCount, "browt_condition_" + tableno + "_" + nextRow);
    var newHtmlText12 = newHtmlText11.replace("CartAndStatement_" + tableno + "_" + rowCount, "CartAndStatement_" + tableno + "_" + nextRow);
    var newHtmlText13 = newHtmlText12.replace("StatementCart_" + tableno + "_" + rowCount, "StatementCart_" + tableno + "_" + nextRow);
    var newHtmlText14 = newHtmlText13.replace("browt_Conditions_" + tableno + "_" + rowCount, "browt_Conditions_" + tableno + "_" + nextRow);
    var newHtmlText15 = newHtmlText14.replace("browt_Conditions_" + tableno + "_" + rowCount, "browt_Conditions_" + tableno + "_" + nextRow);
    var newHtmlText16 = newHtmlText15.replace("ClosingBrackets_" + tableno + "_" + rowCount, "ClosingBrackets_" + tableno + "_" + nextRow);
    var newHtmlText17 = newHtmlText16.replace("changeCartStatementObjectField('" + rowCount + "')", "changeCartStatementObjectField('" + nextRow + "')");
    var newHtmlText18 = newHtmlText17.replace("condition_" + tableno + "_" + rowCount, "condition_" + tableno + "_" + nextRow);
    var newHtmlText19 = newHtmlText18.replace("allFunctions_" + tableno + "_" + rowCount, "allFunctions_" + tableno + "_" + nextRow);
    var newHtmlText20 = newHtmlText19.replace("FunctionClsDrop_" + tableno + "_" + rowCount, "FunctionClsDrop_" + tableno + "_" + nextRow);
    var newHtmlText21 = newHtmlText20.replace("ChooseFieldCls_" + tableno + "_" + rowCount, "ChooseFieldCls_" + tableno + "_" + nextRow);
    var newHtmlText22 = newHtmlText21.replace("browt_AllFunction_" + tableno + "_" + rowCount, "browt_AllFunction_" + tableno + "_" + nextRow);
    var newHtmlText23 = newHtmlText22.replace("browt_AllFunction_" + tableno + "_" + rowCount, "browt_AllFunction_" + tableno + "_" + nextRow);
    var newHtmlText24 = newHtmlText23.replace("functionParameter_" + tableno + "_" + rowCount, "functionParameter_" + tableno + "_" + nextRow);
    //var newHtmlText24= newHtmlText23.replace("getallowedActions("+rowCount+")","getallowedActions("+nextRow+")");
    var newHtmlText24 = newHtmlText24.replace("addrulebutton_" + tableno + "_" + rowCount, "addrulebutton_" + tableno + "_" + nextRow);
    var newHtmlText24 = newHtmlText24.replace("removeRuleRow(" + tableno + "," + rowCount + ")", "removeRuleRow(" + tableno + "," + nextRow + ")");

    var newHtmlText25 = newHtmlText24.replace("display: none;", "");
    var newHtmlText26 = newHtmlText25.replace("getallowedActions(" + tableno + "," + rowCount + ")", "getallowedActions(" + tableno + "," + nextRow + ")");
    var newHtmlText26 = newHtmlText26.replace("setvalueForTemplate(" + tableno + "," + rowCount + ")", "setvalueForTemplate(" + tableno + "," + nextRow + ")");
    var newHtmlText26 = newHtmlText26.replace("setvalueForTemplate(" + tableno + "," + rowCount + ")", "setvalueForTemplate(" + tableno + "," + nextRow + ")");
    var newHtmlText26 = newHtmlText26.replace("templateVariableSymbol_" + tableno + "_" + rowCount, "templateVariableSymbol_" + tableno + "_" + nextRow);
    var newHtmlText26 = newHtmlText26.replace("templateVariableSymbolData_" + tableno + "_" + rowCount, "templateVariableSymbolData_" + tableno + "_" + nextRow);
    var newHtmlText26 = newHtmlText26.replace("templateDropDown_" + tableno + "_" + rowCount, "templateDropDown_" + tableno + "_" + nextRow);

    $("#tableaddRecorder_" + tableno + " tbody").append(newHtmlText26);

    document.getElementById("totalRules_" + tableno).value = nextRow + 1;

    //$("#StatementCart_" + nextRow).val(''); 
    $("#ChooseField_" + tableno + "_" + nextRow).val('');
    $("#ruleValue_" + tableno + "_" + nextRow).val('');
    $("#condition_" + tableno + "_" + nextRow).val('');
    $("#operator_" + tableno + "_" + nextRow).val('');
    $(".FunctionClsDrop_" + tableno + "_" + nextRow).show();
    $(".ChooseFieldCls_" + tableno + "_" + nextRow).hide();
    $(".templateVariableSymbolData_" + tableno + "_" + nextRow).hide();
    //getJupiterMetaData(nextRow);
    if(nextRow>0){
        $("#remove_" + tableno + "_" + rowCount).show();
        $("#addrulebutton_" + tableno + "_" + rowCount).remove();
    }
    $("#remove_" + tableno + "_" + nextRow).hide();
    $("#functionParameter_" + tableno + "_" + nextRow).prop("readonly", false);
    $("#functionParameter_" + tableno + "_" + nextRow).attr("placeholder","Parameter");
    changeCustomObjectFieldaddMore(nextRow, tableno);
    //$('select').select2();
}

function appenCustomCodeForThen(tableno) {
    var sepHtml = '';
    sepHtml += '<div class="cusCodeThen hide" style="margin-top:20px;margin-bottom:20px;">';

    sepHtml += '<table class="table table-vcenter table-mobile-md card-table" id="tableaddRecorderThen_' + tableno + '" style="border:1px solid #c2c2c2;">';
    sepHtml += '<thead>';
    sepHtml += '<tr>';
    sepHtml += '<th width="95%">';
    sepHtml += '<input type="hidden" name="fieldForThen_0[]" value="Custom Code"/>';
    sepHtml += '<input type="hidden" id="thenTableIds_' + tableno + '" name="thenTableIds[]" value="' + tableno + '"/>'
    sepHtml += '<span class="cart"><b>Custom Code</b></span>';
    sepHtml += '</th>';
    sepHtml += '<th width="5%">';
    sepHtml += '<span id="removeCustomeCodeThen_' + tableno + '" onclick="removeCustomCodeThen(' + tableno + ')"><svg width="24" height="24" fill="#aa1818" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m3.707-11.707a.999.999 0 0 0-1.414 0L10 8.586 7.707 6.293a.999.999 0 1 0-1.414 1.414L8.586 10l-2.293 2.293a.999.999 0 1 0 1.414 1.414L10 11.414l2.293 2.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l2.293-2.293a.999.999 0 0 0 0-1.414"> </path></svg></span>';

    sepHtml += '</th>';
    sepHtml += '</tr>';
    sepHtml += '</thead>';
    sepHtml += '<tbody>';
    sepHtml += '<tr>';
    sepHtml += '<td colspan="2">';
    sepHtml += '<textarea id="cusCodesUpperLevelThen" name="cusCodesThen_' + tableno + '" value="" style="width: 100%;"></textarea>';

    //sepHtml +='<input type="hidden" id="overallCustomOprThen" name="overallCustomOprThen" value="" />';
    //sepHtml +='<input type="hidden" id="overallCustomCodeThen" name="overallCustomCodeThen" value="" />';

    sepHtml += '</td>';
    sepHtml += '</tr>';
    sepHtml += '</tbody>';
    sepHtml += '</table>';
    sepHtml += '</div>';

    $("#sep_addThenNew").append(sepHtml);
}

function changeCartStatementObjectFieldThenNew_OLD(obj) {
    $('.modalbtn').click();
    var selectedOptionThenmodel = $('#selectOptnThen').val()
    var obj = 0//parseInt($("#indexValue").val()-1);
    var tableno = parseInt($("#indexValueThen").val());
    var nextTblNum = tableno + 1;
    tableno = nextTblNum;
    //alert(tableno)
    $('.FieldsHeadingThen_' + tableno).hide();
    $('.FunctionsHeadingThen_' + tableno).hide();
    $('#CustomObjHeadingThen_' + tableno).hide();

    var nameCustomCode = '';
    nameCustomCode = $('#namespaceCustomCodeThen').val();
    if (selectedOptionThenmodel == 'Custom Code') {
        appenCustomCodeForThen(tableno);
        $('#cusCodesUpperLevelThen').text(nameCustomCode);
        $('.cusCodeThen').show();
        $('#overallCustomCodeThen').val(nameOperations);
        $('#namespaceCustomCodeThen').val('');
        $("#indexValueThen").val(nextTblNum);
        return true;
    }


    addnewtableThen(tableno);


    $("#thenTableType_" + tableno).val(selectedOptionThenmodel);

    var obj = parseInt(obj);
    var fieldJson = '';
    //alert(selectedOptionThenmodel);
    if (selectedOptionThenmodel == 'Custom Objects') {
        fieldJson = $('#nameSpaceCustomObjectsThen').val();
    }
    //alert(selectedOptionThenmodel);
    if (fieldJson == '' && selectedOptionThenmodel == 'Fields') {
        $('#tableaddRecorderThen_' + tableno).show();
        $('.exchangeorderbtnThenAdd_' + tableno).show();
        $('#ChoosenFieldThen_' + tableno + '_' + obj).attr('placeholder', 'Field');
        var allchossenField;
        if (PClevel.jupiterMetaData.result.fieldList) {
            allchossenField = PClevel.jupiterMetaData.result.fieldList;
            if (allchossenField.length > 0) {

                $('#browt_ChooseFieldThen_' + tableno + '_' + obj).empty();
                $('#browt_ChooseFieldThen_' + tableno + '_' + obj).append("<option value=''>");
                $.each(allchossenField, function (i, item) {
                    console.log('NEW ITEMS==', item);
                    //  var name = "( " + item.id + "_" + item.frameType + " )"
                    $('#browt_ChooseFieldThen_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
                });

                $('.FieldsHeadingThen_' + tableno).show();
                $('.FunctionsHeadingThen_' + tableno).hide();
                $('#fieldForThen_' + tableno).val('FieldsThen');
            }
        }
    } else if (fieldJson == '' && selectedOptionThenmodel == 'Function Call') {
        $('#tableaddRecorderThen_' + tableno).show();
        $('.exchangeorderbtnThenAdd_' + tableno).show();
        $('#fieldForThen_' + tableno).val('Function Call');
        $('#browt_ChooseFieldThen_' + tableno + '_' + obj).empty();
        $('#browt_ChooseFieldThen_' + tableno + '_' + obj).append("<option value=''>");
        $.each(PClevel.jupiterMetaData.result.methodsList, function (i, item) {
            console.log('NEW ITEMS==', item);
            //  var name = "( " + item.id + "_" + item.frameType + " )"
            $('#browt_ChooseFieldThen_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
        });

        $('.FieldsHeadingThen_' + tableno).hide();
        $('.FunctionsHeadingThen_' + tableno).show();
        $('#fieldForThen_' + tableno).val('Function Call');
        $('#ChoosenFieldThen_' + tableno + '_' + obj).attr('placeholder', 'Function');
        //return true;              
    } else if (fieldJson != '') {
        $('#tableaddRecorderThen_' + tableno).show();
        $('.FieldsHeadingThen_' + tableno).hide();
        $('.FunctionsHeadingThen_' + tableno).hide();
        $('#CustomObjHeadingThen_' + tableno).text('Set the value in ' + fieldJson + ' with');
        $('#CustomObjHeadingThen_' + tableno).show();
        $('#fieldForThen_' + tableno).val(fieldJson);
        var allChooseFilelds;
        if (PClevel.jupiterMetaData.result.field[fieldJson].field) {
            //$('#tableaddRecorderThen_'+tableno).show();
            console.log('All Data THEN:', PClevel.jupiterMetaData.result.field[fieldJson].field)
            console.log(Object.keys(PClevel.jupiterMetaData.result.field[fieldJson].field))
            allChooseFilelds = Object.keys(PClevel.jupiterMetaData.result.field[fieldJson].field)
            if (allChooseFilelds.length > 0) {
                $('#browt_ChooseFieldThen_' + tableno + '_' + obj).empty();
                $('#browt_ChooseFieldThen_' + tableno + '_' + obj).append("<option value=''>");
                $.each(allChooseFilelds, function (i, item) {
                    //  var name = "( " + item.id + "_" + item.frameType + " )"
                    $('#browt_ChooseFieldThen_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
                });


                //seting first table choose field val also   
                $('#browt_ChooseFieldThenNew_' + tableno + '_' + obj).empty();
                $('#browt_ChooseFieldThenNew_' + tableno + '_' + obj).append("<option value=''>");
                $.each(allChooseFilelds, function (i, item) {
                    //  var name = "( " + item.id + "_" + item.frameType + " )"
                    $('#browt_ChooseFieldThenNew_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
                });

                //seting first table choose field val also ends              
            }

            var customOperationsResult = PClevel.jupiterMetaData.result.field[fieldJson].customKeywords.action;

            console.log('Getting cus opr for then==customOperationsResult==', customOperationsResult);
            if (customOperationsResult.length > 0) {
                //For model pop on field levelcustomoperation dropdown 
                $('#browt_customOperationsFieldLevelThen').empty();
                $('#browt_customOperationsFieldLevelThen').append("<option value=''>");
                $.each(customOperationsResult, function (i, item) {
                    console.log('=====', item.name)
                    $('#browt_customOperationsFieldLevelThen').append('<option value="' + item.name + '">' + item.name + '</option>');
                });
            } else {
                $("#selectOptnFieldLevelThen option[value='Custom Operations']").remove();
            }
        }
    }
    ($("#indexValueThen").val(tableno));
}

function changeCartStatementObjectFieldThenNew(obj) {
    $('.modalbtn').click();
    var selectedOptionThenmodel = $('#selectOptnThen').val()
    var obj = 0//parseInt($("#indexValue").val()-1);
    var tableno = parseInt($("#indexValueThen").val());
    var nextTblNum = tableno + 1;
    tableno = nextTblNum
    $('.FieldsHeadingThen_' + tableno).hide();
    $('.FunctionsHeadingThen_' + tableno).hide();
    $('#CustomObjHeadingThen_' + tableno).hide();

    var nameCustomCode = '';
    nameCustomCode = $('#namespaceCustomCodeThen').val();
    if (selectedOptionThenmodel == 'Custom Code') {
        appenCustomCodeForThen(tableno);
        $('#cusCodesUpperLevelThen').text(nameCustomCode);
        $('.cusCodeThen').show();
        $('#overallCustomCodeThen').val(nameOperations);
        $('#namespaceCustomCodeThen').val('');
        $("#indexValueThen").val(nextTblNum);
        return true;
    } else {
        addnewtableThen(tableno);
        $("#thenTableType_" + tableno).val(selectedOptionThenmodel);
        var obj = parseInt(obj);
        var fieldJson = '';
        if (selectedOptionThenmodel == 'Custom Objects') {
            var ruleTypeTaken = $('#ruleType').val();
            if (ruleTypeTaken == 'TEMPLATE' || ruleTypeTaken == 'FACT_TEMPLATE') {
                $(".templateTypeOptionThen").show();
                // $("#tableHeadRow_" + tableno).attr('colspan', 7);
            } else {
                $(".templateTypeOptionThen").hide();
                // $("#tableHeadRow_" + tableno).attr('colspan', 6);
            }
            fieldJson = $('#nameSpaceCustomObjectsThen').val();
            $('#rootpathThen_' + tableno).val(fieldJson);
        }
        if (fieldJson == '' && selectedOptionThenmodel == 'Fields') {
            var ruleTypeTaken = $('#ruleType').val();
            if (ruleTypeTaken == 'TEMPLATE' || ruleTypeTaken == 'FACT_TEMPLATE') {
                $(".templateTypeOptionThen").show();
                // $("#tableHeadRow_" + tableno).attr('colspan', 7);
            } else {
                $(".templateTypeOptionThen").hide();
                // $("#tableHeadRow_" + tableno).attr('colspan', 6);
            }
            $('.nonCustmOprFieldForThen_'+tableno).show();
            $('#tableaddRecorderThen_' + tableno).show();
            $('.exchangeorderbtnThenAdd_' + tableno).show();
            $('#ChoosenFieldThen_' + tableno + '_' + obj).attr('placeholder', 'Field');
            var allchossenField;
            if (PClevel.jupiterMetaData.result.fieldList) {
                allchossenField = PClevel.jupiterMetaData.result.fieldList;
                if (allchossenField.length > 0) {

                    $('#browt_ChooseFieldThen_' + tableno + '_' + obj).empty();
                    $('#browt_ChooseFieldThen_' + tableno + '_' + obj).append("<option value=''>");
                    $.each(allchossenField, function (i, item) {
                        console.log('NEW ITEMS==', item);
                        //  var name = "( " + item.id + "_" + item.frameType + " )"
                        $('#browt_ChooseFieldThen_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
                    });

                    $('.FieldsHeadingThen_' + tableno).show();
                    $('.FunctionsHeadingThen_' + tableno).hide();
                    $('#fieldForThen_' + tableno).val('FieldsThen');
                }
            }
        } else if (fieldJson == '' && selectedOptionThenmodel == 'Function Call') {
            $('#tableaddRecorderThen_' + tableno).show();
            $('.exchangeorderbtnThenAdd_' + tableno).show();
            $('.FunctionClsDropThenParameter_'+tableno+'_'+obj).show();
            $('#ruleValueThen_'+tableno+'_'+obj).hide();
            $('#fieldForThen_' + tableno).val('Function Call');
            $('#browt_ChooseFieldThen_' + tableno + '_' + obj).empty();
            $('#browt_ChooseFieldThen_' + tableno + '_' + obj).append("<option value=''>");
            $.each(PClevel.jupiterMetaData.result.methodsList, function (i, item) {
                console.log('NEW ITEMS==', item);
                //  var name = "( " + item.id + "_" + item.frameType + " )"
                $('#browt_ChooseFieldThen_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
            });

            //alert('HERER IN FUNCTION CALL CHECK==')
            $('.nonCustmOprFieldForThen_' + tableno).show();
            var ruleTypeTaken = $('#ruleType').val();
            if (ruleTypeTaken == 'TEMPLATE' || ruleTypeTaken == 'FACT_TEMPLATE') {
                $(".templateTypeOptionThen").show();
                // $("#tableHeadRow_" + tableno).attr('colspan', 7);
            } else {
                $(".templateTypeOptionThen").hide();
                // $("#tableHeadRow_" + tableno).attr('colspan', 6);
            }

            $('.FieldsHeadingThen_' + tableno).hide();
            $('.FunctionsHeadingThen_' + tableno).show();
            $('#fieldForThen_' + tableno).val('Function Call');
            $('#ChoosenFieldThen_' + tableno + '_' + obj).attr('placeholder', 'Function');
            //return true;              
        } else if (fieldJson != '') {
            $('#tableaddRecorderThen_' + tableno).show();
            $('.FieldsHeadingThen_' + tableno).hide();
            $('.FunctionsHeadingThen_' + tableno).hide();
            $('#CustomObjHeadingThen_' + tableno).text('Set the value in ' + fieldJson + ' with');
            $('#CustomObjHeadingThen_' + tableno).show();
            $('#fieldForThen_' + tableno).val(fieldJson);
            var allChooseFilelds;
            if (PClevel.jupiterMetaData.result.field[fieldJson].field) {
                //$('#tableaddRecorderThen_'+tableno).show();
                console.log('All Data THEN:', PClevel.jupiterMetaData.result.field[fieldJson].field)
                console.log(Object.keys(PClevel.jupiterMetaData.result.field[fieldJson].field))
                allChooseFilelds = Object.keys(PClevel.jupiterMetaData.result.field[fieldJson].field)
                if (allChooseFilelds.length > 0) {
                    $('#browt_ChooseFieldThen_' + tableno + '_' + obj).empty();
                    $('#browt_ChooseFieldThen_' + tableno + '_' + obj).append("<option value=''>");
                    $.each(allChooseFilelds, function (i, item) {
                        //  var name = "( " + item.id + "_" + item.frameType + " )"
                        $('#browt_ChooseFieldThen_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
                    });


                    //seting first table choose field val also   
                    $('#browt_ChooseFieldThenNew_' + tableno + '_' + obj).empty();
                    $('#browt_ChooseFieldThenNew_' + tableno + '_' + obj).append("<option value=''>");
                    $.each(allChooseFilelds, function (i, item) {
                        //  var name = "( " + item.id + "_" + item.frameType + " )"
                        $('#browt_ChooseFieldThenNew_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
                    });

                    //seting first table choose field val also ends              
                }

                var customOperationsResult = PClevel.jupiterMetaData.result.field[fieldJson].customKeywords.action;
                console.log('Getting cus opr for then==customOperationsResult==', customOperationsResult);
                if (customOperationsResult.length > 0) {
                    //For model pop on field levelcustomoperation dropdown 
                    $('#browt_customOperationsFieldLevelThen').empty();
                    $('#browt_customOperationsFieldLevelThen').append("<option value=''>");
                    $.each(customOperationsResult, function (i, item) {
                        console.log('=====', item.name)
                        $('#browt_customOperationsFieldLevelThen').append('<option value="' + item.name + '">' + item.name + '</option>');
                    });
                } else {
                    $("#selectOptnFieldLevelThen option[value='Custom Operations']").remove();
                }
            }
        }
        ($("#indexValueThen").val(tableno));
    }
}

function addnewtableThen_OLD(tableno) {
    var totalSep = $("#indexValueThen").val();
    if (tableno == '') {
        tableno = parseInt(totalSep);
    }
    var newRow = parseInt(totalSep);
    var idCount = 0;
    var sepHtml = '';

    sepHtml += '<table class="table table-vcenter table-mobile-md card-table hide" id="tableaddRecorderThen_' + tableno + '" style="margin-top:20px; border:1px solid #c2c2c2;">';
    sepHtml += '<thead>';
    sepHtml += '<tr>';
    sepHtml += '<th colspan="7" width="95%">';

    sepHtml += '<span class="cart fieldStyle FieldsHeadingThen_' + tableno + ' hide">';
    sepHtml += '<b style="margin-left:15px;">Fields</b>';
    sepHtml += '</span>';
    sepHtml += '<span class="cart fieldStyle FunctionsHeadingThen_' + tableno + ' hide">';
    sepHtml += '<b style="margin-left:15px;">Functions</b>';
    sepHtml += '</span>';
    sepHtml += '<span id="CustomObjHeadingThen_' + tableno + '" data-bs-toggle="modal" data-bs-target="#modal-ForFieldsLevelThen" class="cart fieldStyle links hide" onclick="fieldModelPopUpInbetweenThenNew(' + tableno + ');"></span>';

    sepHtml += '<input type="hidden" id="fieldForThen_' + tableno + '" name="fieldForThen_0[]" value=""/>';
    sepHtml += '<input type="hidden" id="thenTableIds_' + tableno + '" name="thenTableIds[]" value="' + tableno + '"/>'
    sepHtml += '<input type="hidden" id="parentThen_' + tableno + '" name="parent_' + tableno + '[]" value="">';
    sepHtml += '<input type="hidden" id="rootpathThen_' + tableno + '" name="rootpath_' + tableno + '[]" value="">';
    sepHtml += '<input type="hidden" name="thenTableType[]" id="thenTableType_' + tableno + '" value="" />';
    sepHtml += '<input type="hidden" id="totalRulesThen_' + tableno + '" name="totalRules" value="0"/>';
    sepHtml += '<input type="hidden" id="fieldForThenn_' + tableno + '_' + idCount + '" name="fieldForThenn_0[]" value="FieldsThen"/>';
    sepHtml += '</th>';
    sepHtml += '<th id="" width="5%"><span id="removeThen_1" onclick="removeRuleTableThen(' + tableno + ')"><svg width="24" height="24" fill="#aa1818" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m3.707-11.707a.999.999 0 0 0-1.414 0L10 8.586 7.707 6.293a.999.999 0 1 0-1.414 1.414L8.586 10l-2.293 2.293a.999.999 0 1 0 1.414 1.414L10 11.414l2.293 2.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l2.293-2.293a.999.999 0 0 0 0-1.414"></path></svg></span></th>';

    sepHtml += '</tr>';
    sepHtml += '</thead>';
    sepHtml += '<tbody>';

    sepHtml += '<tr class="cusOprThenNew_' + tableno + ' hide">';
    sepHtml += '<td class="tblFullRow" colspan="8">';
    sepHtml += '<div class="row">';
    sepHtml += '<div class="col-lg-2">';
    sepHtml += '<h5 style="padding:10px 0px;">Custom Operation</h5>';
    sepHtml += '</div>';
    sepHtml += '<div class="col-lg-2" style="margin-bottom:10px;">';
    sepHtml += '<input readonly type="text" class="form-control" id="cusOperationThen_' + tableno + '" name="customOperationThen_' + tableno + '[]" style="margin-left:-60px;">';
    sepHtml += '</div>';
    sepHtml += '</div>';
    sepHtml += '</td>';
    sepHtml += '</tr>';

    sepHtml += '<tr class="cusOprThenNew_' + tableno + ' hide">';
    sepHtml += '<td class="tblFullRow" colspan="8" style="background: #eee;padding-top: 15px;">';
    sepHtml += '<h5>Condition</h5>';
    sepHtml += '</td>';
    sepHtml += '</tr>';


    sepHtml += '<tr class="conditionThenForCustomOperation_' + tableno + ' hide" id="conditionThenForCustomOperation_' + tableno + '_' + idCount + '">';
    sepHtml += '<td>';
    sepHtml += '<select name="OpeningBracketsThenNew_' + tableno + '[]" id="OpeningBracketsThenNew_' + tableno + '_' + idCount + '" class="form-control form-select"><option value="">Bracket</option><option value="Yes">(</option></select>';
    sepHtml += '</td>';

    sepHtml += '<td class="ChooseFieldClsThenNew_' + tableno + '_' + idCount + '">';
    sepHtml += '<input list="browt_ChooseFieldThenNew_' + tableno + '_' + idCount + '" name="ChooseFieldThenNew_' + tableno + '[]" id="ChooseFieldThenNew_' + tableno + '_' + idCount + '" class="form-control required" onchange="getallowedActionsThen(' + tableno + ',' + idCount + ')">';
    sepHtml += '<datalist id="browt_ChooseFieldThenNew_' + tableno + '_' + idCount + '">';
    sepHtml += '</datalist>';


    sepHtml += '</td>';

    sepHtml += '<td class="FunctionClsDropThenNew_' + tableno + '_' + idCount + ' hide">';
    sepHtml += '<input list="browt_AllFunctionThenNew_' + tableno + '_' + idCount + '" name="allFunctionsThenNew_' + tableno + '[]" id="allFunctionsThenNew_' + tableno + '_' + idCount + '" class="form-control required" onchange="getallowedActions(' + tableno + ',' + idCount + ')" placeholder="Function">';
    sepHtml += '<datalist id="browt_AllFunctionThenNew_' + tableno + '_' + idCount + '">';
    sepHtml += '</datalist>';
    sepHtml += '</td>';

    sepHtml += '<td class="FunctionClsDropThenNew_' + tableno + '_' + idCount + ' hide">';
    sepHtml += '<input type="text" class="form-control" name="functionParameterThenNew_' + tableno + '[]" placeholder="Parameter" value="" id="functionParameterThenNew_' + tableno + '_' + idCount + '">';
   
    sepHtml += '</td>';


    sepHtml += '<td>';
    sepHtml += '<input list="browt_conditionThenNew_' + tableno + '_' + idCount + '" name="conditionThenNew_' + tableno + '[]" id="conditionThenNew_' + tableno + '_' + idCount + '" class="form-control required">';
    sepHtml += '<datalist id="browt_conditionThenNew_' + tableno + '_' + idCount + '">';
    sepHtml += '</datalist>';
    sepHtml += '</td>';

    sepHtml += '<td class="templateTypeOptionThenNew hide" width="30%">';
    sepHtml += '<select name="templateDropDownThenNew_' + tableno + '[]" id="templateDropDownThenNew_' + tableno + '_' + idCount + '" class="form-control form-select templateDropDown" onchange="setvalueForTemplateThenNew(' + tableno + ',' + idCount + ');">';
    sepHtml += '<option value="Value">Value</option>';
    sepHtml += '<option value="Variable">Variable</option>';
    sepHtml += '</select>';
    sepHtml += '</td>';


    //sepHtml += '<td width="10%"><input type="text" readonly class="templateVariableSymbolDataThenNew_'+tableno+'_'+idCount+' hide form-control" name="templateVariableSymbolThenNew_'+tableno+'[]" id="templateVariableSymbolThenNew_'+tableno+'_'+idCount+'" value="%%"/></td>';


   

    sepHtml += '<td>';
    sepHtml += '<span style="display: flex;">';
    sepHtml += '<span style="margin-top: 12px;" width="10%" class="templateVariableSymbolDataThenNew_'+tableno+'_'+idCount+' hide" name="templateVariableSymbolThenNew_'+tableno+'[]" id="templateVariableSymbolThenNew_'+tableno+'_'+idCount+'">%%</span>';
    sepHtml += '<input type="text" class="form-control rulevalueThenNew_'+tableno+' required" name="rulevalueThenNew_' + tableno + '[]" placeholder="Value" value="" id="ruleValueThenNew_' + tableno + '_' + idCount + '">';
    sepHtml += '</span>';
    sepHtml += '</td>';

    sepHtml += '<td>';
    sepHtml += '<select name="ClosingBracketsThenNew_' + tableno + '[]" id="ClosingBracketsThenNew_' + tableno + '_' + idCount + '" class="form-control form-select"><option value="">Bracket</option><option value="Yes">)</option></select> ';
    sepHtml += '</td>';

    sepHtml += '<td>';
    sepHtml += '<select name="OperatorThenNew' + tableno + '[]" id="operatorThenNew_' + tableno + '_' + idCount + '" class="form-control form-select"><option value="">--Select Operator--</option><option value="&&">AND</option><option value="||">OR</option><option value="&& !">AND NOT</option><option value="|| !">OR NOT</option></select>';
    sepHtml += '</td>';

    sepHtml += '<td class="remove">';
    sepHtml += '<span id="removeThenNew_' + tableno + '_' + idCount + '" class="hide">';
    sepHtml += '<svg width="24" height="24" fill="#aa1818" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m3.707-11.707a.999.999 0 0 0-1.414 0L10 8.586 7.707 6.293a.999.999 0 1 0-1.414 1.414L8.586 10l-2.293 2.293a.999.999 0 1 0 1.414 1.414L10 11.414l2.293 2.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l2.293-2.293a.999.999 0 0 0 0-1.414"></path></svg>';
    sepHtml += '</span>';
    sepHtml += '<span id="addrulebuttonthenNew_' + tableno + '_' + idCount + '" class="btn--primary" type="button" onclick="addMoreRulethenNew(' + tableno + ','+idCount+')"><svg fill="#206bc4" width="24" height="24" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M8.996 8.996V7.008c.001-.043 0-.054.004-.097.044-.449.423-.845.879-.9.094-.011.115-.007.145-.007.043.002.054.002.097.007.448.054.834.442.879.9.004.043.003.054.004.097v1.988h1.992l.048.001c.49.035.918.441.954.93.039.545-.424 1.063-1.002 1.077h-1.992V13a1.04 1.04 0 0 1-.648.939c-.584.221-1.327-.217-1.359-.891L8.996 13v-1.996H7.004c-.511-.012-.966-.435-1.002-.931-.038-.53.396-1.049.954-1.076l.048-.001h1.992z"></path></svg></span>';
    sepHtml += '</td>';
    sepHtml += '</tr>';

    sepHtml += '<tr class="nonCustmOprFieldForThen_' + tableno + ' hide" id="nonCustmOprFieldForThen_' + tableno + '_' + idCount + '">';
    sepHtml += '<td colspan="3" width="45%" class="ChooseFieldClsThen_'+tableno+'_'+idCount+'">';

    sepHtml += '<input type="text" list="browt_ChooseFieldThen_' + tableno + '_' + idCount + '" name="choose_field_then_' + tableno + '[]" id="ChoosenFieldThen_' + tableno + '_' + idCount + '"  onchange="getDataTypeThen(' + tableno + ',' + idCount + ')" class="form-control required">';
    sepHtml += '<datalist id="browt_ChooseFieldThen_' + tableno + '_' + idCount + '">';
    sepHtml += '</datalist>';

    sepHtml += '<td class="FunctionClsDropThen_' + tableno + '_' + idCount + ' hide" width="40%">';
    sepHtml += '<input list="browt_AllFunctionThen_' + tableno + '_' + idCount + '" name="allFunctionsThen_' + tableno + '[]" id="allFunctionsThen_' + tableno + '_' + idCount + '" class="form-control" onchange="getallowedActionsThen(' + tableno + ',' + idCount + ')" placeholder="Function">';
    sepHtml += '<datalist id="browt_AllFunctionThen_' + tableno + '_' + idCount + '">'
    sepHtml += '</datalist>'
    sepHtml += '</td>'

    sepHtml += '<td class="templateTypeOptionThen hide" width="30%">';
    sepHtml += '<select name="templateDropDownThen_' + tableno + '[]" id="templateDropDownThen_' + tableno + '_' + idCount + '" class="form-control form-select templateDropDown" onchange="setvalueForTemplateThen(' + tableno + ',' + idCount + ');">';
    sepHtml += '<option value="Value">Value</option>';
    sepHtml += '<option value="Variable">Variable</option>';
    sepHtml += '</select>';
    sepHtml += '</td>';

    //sepHtml += '<td width="10%"><input type="text" readonly class="templateVariableSymbolDataThen_'+tableno+'_'+idCount+' hide form-control" name="templateVariableSymbolThen_'+tableno+'[]" id="templateVariableSymbolThen_'+tableno+'_'+idCount+'" value="%%"/></td>';



    sepHtml += '<td class="FunctionClsDropThenParameter_' + tableno + '_' + idCount + ' hide" width="45%">';
    sepHtml += '<input type="text" class="form-control" name="functionParameterThen_' + tableno + '[]" placeholder="Parameter" value="" id="functionParameterThen_' + tableno + '_' + idCount + '">';
    sepHtml += '</td> ';


    sepHtml += '</td>';
    sepHtml += '<td colspan="3" width="50%">';
    sepHtml += '<span style="display: flex;">';
    sepHtml += '<span  style="margin-top: 12px;" width="10%" class="templateVariableSymbolDataThen_'+tableno+'_'+idCount+' hide" name="templateVariableSymbolThen_'+tableno+'[]" id="templateVariableSymbolThen_'+tableno+'_'+idCount+'">%%</span>';
    sepHtml += '<input type="text" class="form-control rulevalue_then_'+tableno+' required" name="rulevalue_then_' + tableno + '[]" placeholder="Value" value="" id="ruleValueThen_' + tableno + '_' + idCount + '">';
    sepHtml += '<input type="hidden" id="dataTypeOfFieldThenNew_' + tableno + '_' + idCount + '" name="dataTypeOfFieldThenNew_' + tableno + '[]" value="" />';
    sepHtml += '<input type="hidden" id="dataTypeOfFieldThen_' + tableno + '_' + idCount + '" name="dataTypeOfFieldThen_' + tableno + '[]" value="" />';
    sepHtml += '</span>';
    sepHtml += '</td> ';

    sepHtml += '<td class="remove removeThen" width="5%">';
    sepHtml += '<span id="removeThen_' + tableno + '_' + idCount + '" onclick="removeRuleRowThen(' + tableno + ',' + idCount + ')">';
    sepHtml += '<svg width="24" height="24" fill="#aa1818" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m3.707-11.707a.999.999 0 0 0-1.414 0L10 8.586 7.707 6.293a.999.999 0 1 0-1.414 1.414L8.586 10l-2.293 2.293a.999.999 0 1 0 1.414 1.414L10 11.414l2.293 2.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l2.293-2.293a.999.999 0 0 0 0-1.414"></path></svg>';
    sepHtml += '</span>';

    sepHtml += '<span id="addrulebuttonthen_' + tableno + '_' + idCount + '" class="btn--primary" type="button" onclick="addMoreRulethen(' + tableno + ')"><svg fill="#206bc4" width="24" height="24" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M8.996 8.996V7.008c.001-.043 0-.054.004-.097.044-.449.423-.845.879-.9.094-.011.115-.007.145-.007.043.002.054.002.097.007.448.054.834.442.879.9.004.043.003.054.004.097v1.988h1.992l.048.001c.49.035.918.441.954.93.039.545-.424 1.063-1.002 1.077h-1.992V13a1.04 1.04 0 0 1-.648.939c-.584.221-1.327-.217-1.359-.891L8.996 13v-1.996H7.004c-.511-.012-.966-.435-1.002-.931-.038-.53.396-1.049.954-1.076l.048-.001h1.992z"></path></svg></span>';

    sepHtml += '</td>';
    sepHtml += '</tr>';
    sepHtml += '</tbody>';

    sepHtml += '<tfoot>';
    // sepHtml += '<tr><td colspan="6">&nbsp;</td><td>';
    // sepHtml += '<div class="exchangeorderbtnThen exchangeorderbtnThenAdd_' + tableno + '">';
    // sepHtml += '<span id="addrulebuttonthen" value="" class="btn--primary" type="button" onclick="addMoreRulethen(' + tableno + ')"><svg fill="#206bc4" width="24" height="24" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M8.996 8.996V7.008c.001-.043 0-.054.004-.097.044-.449.423-.845.879-.9.094-.011.115-.007.145-.007.043.002.054.002.097.007.448.054.834.442.879.9.004.043.003.054.004.097v1.988h1.992l.048.001c.49.035.918.441.954.93.039.545-.424 1.063-1.002 1.077h-1.992V13a1.04 1.04 0 0 1-.648.939c-.584.221-1.327-.217-1.359-.891L8.996 13v-1.996H7.004c-.511-.012-.966-.435-1.002-.931-.038-.53.396-1.049.954-1.076l.048-.001h1.992z"></path></svg></span>';
    // sepHtml += '</div>';

    // sepHtml += '</td></tr>';
    sepHtml += '<tr class="customCodeForFieldLevelThen_' + tableno + ' hide">';
    sepHtml += '<td class="tblFullRow" colspan="7"><h5>Custom Code</h5> <textarea  style="width:100%; height:100px;" class="form-control" id="customCodeFieldLevelThen_' + tableno + '" name="customCodeFieldLevelThen_' + tableno + '[]" value=""></textarea></td>';
    sepHtml += '</tr>';

    // === --- Child Table will add here --- === //
    sepHtml += '<tr class="hide" id="customObjectChildTableThen_' + tableno + '">';
    sepHtml += '<td class="tblFullRowThen" id="customObjectSubTableThen_' + tableno + '" colspan="7" width="100%">';
    sepHtml += '<input type="hidden" id="fieldForWhenRuleChildThen_' + tableno + '" name="fieldForWhenRuleChildThen[]" value=""/>'
    sepHtml += '<input type="hidden" id="ChildTableNumOfMasterTableNoThen_' + tableno + '" name="ChildTableNumOfMasterTableNoThen[]" value="0"/>';
    sepHtml += '</td>';
    sepHtml += '</tr>';
    // === --- Child Table will End here --- === //   
    sepHtml += '</tfoot>';

    sepHtml += '</table>';



    $("#sep_addThenNew").append(sepHtml);
    $("#removeThen_" + tableno + "_0").hide();
    $("#removeThenNew_" + tableno + "_0").hide();
    //$("#indexValue").val(newRow);
}

function addnewtableThen(tableno) {
    var totalSep = $("#indexValueThen").val();
    if (tableno == '') {
        tableno = parseInt(totalSep);
    }
    var newRow = parseInt(totalSep);
    var idCount = 0;
    var sepHtml = '';
    var tablesufix = "'"+tableno+'_'+idCount+"'" ;

    sepHtml += '<table class="table table-vcenter table-mobile-md card-table hide" id="tableaddRecorderThen_' + tableno + '" style="margin-top:20px; border:1px solid #c2c2c2;">';
    sepHtml += '<thead>';
    sepHtml += '<tr>';
    sepHtml += '<th colspan="7" width="95%">';

    sepHtml += '<span class="cart fieldStyle FieldsHeadingThen_' + tableno + ' hide">';
    sepHtml += '<b style="margin-left:15px;">Fields</b>';
    sepHtml += '</span>';
    sepHtml += '<span class="cart fieldStyle FunctionsHeadingThen_' + tableno + ' hide">';
    sepHtml += '<b style="margin-left:15px;">Functions</b>';
    sepHtml += '</span>';
    sepHtml += '<span id="CustomObjHeadingThen_' + tableno + '" data-bs-toggle="modal" data-bs-target="#modal-ForFieldsLevelThen" class="cart fieldStyle links hide" onclick="fieldModelPopUpInbetweenThenNew(' + tableno + ');"></span>';

    sepHtml += '<input type="hidden" id="fieldForThen_' + tableno + '" name="fieldForThen_0[]" value=""/>';
    sepHtml += '<input type="hidden" id="thenTableIds_' + tableno + '" name="thenTableIds[]" value="' + tableno + '"/>'
    sepHtml += '<input type="hidden" id="parentThen_' + tableno + '" name="parent_' + tableno + '[]" value="">';
    sepHtml += '<input type="hidden" id="rootpathThen_' + tableno + '" name="rootpath_' + tableno + '[]" value="">';
    sepHtml += '<input type="hidden" name="thenTableType[]" id="thenTableType_' + tableno + '" value="" />';
    sepHtml += '<input type="hidden" id="totalRulesThen_' + tableno + '" name="totalRules" value="0"/>';
    sepHtml += '<input type="hidden" id="fieldForThenn_' + tableno + '_' + idCount + '" name="fieldForThenn_0[]" value="FieldsThen"/>';
    sepHtml += '</th>';
    sepHtml += '<th id="" width="5%"><span id="removeThen_1" onclick="removeRuleTableThen(' + tableno + ')"><svg width="24" height="24" fill="#aa1818" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m3.707-11.707a.999.999 0 0 0-1.414 0L10 8.586 7.707 6.293a.999.999 0 1 0-1.414 1.414L8.586 10l-2.293 2.293a.999.999 0 1 0 1.414 1.414L10 11.414l2.293 2.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l2.293-2.293a.999.999 0 0 0 0-1.414"></path></svg></span></th>';

    sepHtml += '</tr>';
    sepHtml += '</thead>';
    sepHtml += '<tbody>';

    sepHtml += '<tr class="cusOprThenNew_' + tableno + ' hide">';
    sepHtml += '<td class="tblFullRow" colspan="8">';
    sepHtml += '<div class="row">';
    sepHtml += '<div class="col-lg-2">';
    sepHtml += '<h5 style="padding:10px 0px;">Custom Operation</h5>';
    sepHtml += '</div>';
    sepHtml += '<div class="col-lg-2" style="margin-bottom:10px;">';
    sepHtml += '<input readonly type="text" class="form-control" id="cusOperationThen_' + tableno + '" name="customOperationThen_' + tableno + '[]" style="margin-left:-60px;">';
    sepHtml += '</div>';
    sepHtml += '</div>';
    sepHtml += '</td>';
    sepHtml += '</tr>';

    sepHtml += '<tr class="cusOprThenNew_' + tableno + ' hide">';
    sepHtml += '<td class="tblFullRow" colspan="8">';
    sepHtml += '<table class="table" id="customConditionNewTableParentLevel_' +tableno +'"><tr><td colspan="10" style="background: #eee;padding-top: 15px;">';
    sepHtml += '<h5>Condition</h5>';
    sepHtml += '</td>';
    sepHtml += '</tr>';


    sepHtml += '<tr class="conditionThenForCustomOperation_' + tableno + ' hide" id="conditionThenForCustomOperation_' + tableno + '_' + idCount + '">';
    sepHtml += '<td>';
    sepHtml += '<select name="OpeningBracketsThenNew_' + tableno + '[]" id="OpeningBracketsThenNew_' + tableno + '_' + idCount + '" class="form-control form-select"><option value="">Bracket</option><option value="Yes">(</option></select>';
    sepHtml += '</td>';

    sepHtml += '<td class="ChooseFieldClsThenNew_' + tableno + '_' + idCount + '">';
    sepHtml += '<input list="browt_ChooseFieldThenNew_' + tableno + '_' + idCount + '" name="ChooseFieldThenNew_' + tableno + '[]" id="ChooseFieldThenNew_' + tableno + '_' + idCount + '" class="form-control required" onchange="getallowedActionsThen(' + tableno + ',' + idCount + ')">';
    sepHtml += '<datalist id="browt_ChooseFieldThenNew_' + tableno + '_' + idCount + '">';
    sepHtml += '</datalist>';


    sepHtml += '</td>';

    sepHtml += '<td class="FunctionClsDropThenNew_' + tableno + '_' + idCount + ' hide">';
    sepHtml += '<input list="browt_AllFunctionThenNew_' + tableno + '_' + idCount + '" name="allFunctionsThenNew_' + tableno + '[]" id="allFunctionsThenNew_' + tableno + '_' + idCount + '" class="form-control required" onchange="getallowedActions(' + tableno + ',' + idCount + ')" placeholder="Function">';
    sepHtml += '<datalist id="browt_AllFunctionThenNew_' + tableno + '_' + idCount + '">';
    sepHtml += '</datalist>';
    sepHtml += '</td>';

    sepHtml += '<td class="FunctionClsDropThenNew_' + tableno + '_' + idCount + ' hide">';
    sepHtml += '<input type="text" class="form-control" name="functionParameterThenNew_' + tableno + '[]" placeholder="Parameter" value="" id="functionParameterThenNew_' + tableno + '_' + idCount + '">';
   
    sepHtml += '</td>';


    sepHtml += '<td>';
    sepHtml += '<input list="browt_conditionThenNew_' + tableno + '_' + idCount + '" name="conditionThenNew_' + tableno + '[]" id="conditionThenNew_' + tableno + '_' + idCount + '" class="form-control required">';
    sepHtml += '<datalist id="browt_conditionThenNew_' + tableno + '_' + idCount + '">';
    sepHtml += '</datalist>';
    sepHtml += '</td>';

    sepHtml += '<td class="templateTypeOptionThenNew hide" width="30%">';
    sepHtml += '<select name="templateDropDownThenNew_' + tableno + '[]" id="templateDropDownThenNew_' + tableno + '_' + idCount + '" class="form-control form-select templateDropDown" onchange="setvalueForTemplateThenNew(' + tableno + ',' + idCount + ');">';
    sepHtml += '<option value="Value">Value</option>';
    sepHtml += '<option value="Variable">Variable</option>';
    sepHtml += '</select>';
    sepHtml += '</td>';


    //sepHtml += '<td width="10%"><input type="text" readonly class="templateVariableSymbolDataThenNew_'+tableno+'_'+idCount+' hide form-control" name="templateVariableSymbolThenNew_'+tableno+'[]" id="templateVariableSymbolThenNew_'+tableno+'_'+idCount+'" value="%%"/></td>';


   

    sepHtml += '<td>';
    sepHtml += '<span style="display: flex;">';
    sepHtml += '<span style="margin-top: 12px;" width="10%" class="templateVariableSymbolDataThenNew_'+tableno+'_'+idCount+' hide" name="templateVariableSymbolThenNew_'+tableno+'[]" id="templateVariableSymbolThenNew_'+tableno+'_'+idCount+'">%%</span>';
    sepHtml += '<input type="hidden" id="dataTypeOfFieldThenNew_' + tableno + '_' + idCount + '" name="dataTypeOfFieldThenNew_' + tableno + '[]" value="" />';
    sepHtml += '<input type="text" class="form-control rulevalueThenNew_'+tableno+' required" name="rulevalueThenNew_' + tableno + '[]" placeholder="Value" value="" id="ruleValueThenNew_' + tableno + '_' + idCount + '">';
    sepHtml += '</span>';
    sepHtml += '</td>';

    sepHtml += '<td>';
    sepHtml += '<select name="ClosingBracketsThenNew_' + tableno + '[]" id="ClosingBracketsThenNew_' + tableno + '_' + idCount + '" class="form-control form-select"><option value="">Bracket</option><option value="Yes">)</option></select> ';
    sepHtml += '</td>';

    sepHtml += '<td>';
    sepHtml += '<select name="OperatorThenNew' + tableno + '[]" id="operatorThenNew_' + tableno + '_' + idCount + '" class="form-control form-select"><option value="">--Select Operator--</option><option value="&&">AND</option><option value="||">OR</option><option value="&& !">AND NOT</option><option value="|| !">OR NOT</option></select>';
    sepHtml += '</td>';

    sepHtml += '<td class="remove">';
    sepHtml += '<span id="removeThenNew_' + tableno + '_' + idCount + '" onclick="removeRuleRowThenNew('+tablesufix+')" class="hide">';
    sepHtml += '<svg width="24" height="24" fill="#aa1818" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m3.707-11.707a.999.999 0 0 0-1.414 0L10 8.586 7.707 6.293a.999.999 0 1 0-1.414 1.414L8.586 10l-2.293 2.293a.999.999 0 1 0 1.414 1.414L10 11.414l2.293 2.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l2.293-2.293a.999.999 0 0 0 0-1.414"></path></svg>';
    sepHtml += '</span>';
    sepHtml += '<span id="addrulebuttonthenNew_' + tableno + '_' + idCount + '" class="btn--primary" type="button" onclick="addMoreRulethenNew(' + tableno + ','+idCount+')"><svg fill="#206bc4" width="24" height="24" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M8.996 8.996V7.008c.001-.043 0-.054.004-.097.044-.449.423-.845.879-.9.094-.011.115-.007.145-.007.043.002.054.002.097.007.448.054.834.442.879.9.004.043.003.054.004.097v1.988h1.992l.048.001c.49.035.918.441.954.93.039.545-.424 1.063-1.002 1.077h-1.992V13a1.04 1.04 0 0 1-.648.939c-.584.221-1.327-.217-1.359-.891L8.996 13v-1.996H7.004c-.511-.012-.966-.435-1.002-.931-.038-.53.396-1.049.954-1.076l.048-.001h1.992z"></path></svg></span>';
    sepHtml += '</td>';
    // sepHtml += '</tr>';
    sepHtml += '</table></td></tr>';

    sepHtml += '<tr class="nonCustmOprFieldForThen_' + tableno + ' hide" id="nonCustmOprFieldForThen_' + tableno + '_' + idCount + '">';
    sepHtml += '<td colspan="3" width="45%" class="ChooseFieldClsThen_'+tableno+'_'+idCount+'">';

    sepHtml += '<input type="text" list="browt_ChooseFieldThen_' + tableno + '_' + idCount + '" name="choose_field_then_' + tableno + '[]" id="ChoosenFieldThen_' + tableno + '_' + idCount + '"  onchange="getDataTypeThen(' + tableno + ',' + idCount + ')" class="form-control required">';
    sepHtml += '<datalist id="browt_ChooseFieldThen_' + tableno + '_' + idCount + '">';
    sepHtml += '</datalist>';

    sepHtml += '<td class="FunctionClsDropThen_' + tableno + '_' + idCount + ' hide" width="40%">';
    sepHtml += '<input list="browt_AllFunctionThen_' + tableno + '_' + idCount + '" name="allFunctionsThen_' + tableno + '[]" id="allFunctionsThen_' + tableno + '_' + idCount + '" class="form-control" onchange="getallowedActionsThen(' + tableno + ',' + idCount + ')" placeholder="Function">';
    sepHtml += '<datalist id="browt_AllFunctionThen_' + tableno + '_' + idCount + '">'
    sepHtml += '</datalist>'
    sepHtml += '</td>'

    sepHtml += '<td class="templateTypeOptionThen hide" width="30%">';
    sepHtml += '<select name="templateDropDownThen_' + tableno + '[]" id="templateDropDownThen_' + tableno + '_' + idCount + '" class="form-control form-select templateDropDown" onchange="setvalueForTemplateThen(' + tableno + ',' + idCount + ');">';
    sepHtml += '<option value="Value">Value</option>';
    sepHtml += '<option value="Variable">Variable</option>';
    sepHtml += '</select>';
    sepHtml += '</td>';

    //sepHtml += '<td width="10%"><input type="text" readonly class="templateVariableSymbolDataThen_'+tableno+'_'+idCount+' hide form-control" name="templateVariableSymbolThen_'+tableno+'[]" id="templateVariableSymbolThen_'+tableno+'_'+idCount+'" value="%%"/></td>';



    sepHtml += '<td class="FunctionClsDropThenParameter_' + tableno + '_' + idCount + ' hide" width="45%">';
    sepHtml += '<input type="text" class="form-control" name="functionParameterThen_' + tableno + '[]" placeholder="Parameter" value="" id="functionParameterThen_' + tableno + '_' + idCount + '">';
    sepHtml += '</td> ';


    sepHtml += '</td>';
    sepHtml += '<td colspan="3" width="50%">';
    sepHtml += '<span style="display: flex;">';
    sepHtml += '<span  style="margin-top: 12px;" width="10%" class="templateVariableSymbolDataThen_'+tableno+'_'+idCount+' hide" name="templateVariableSymbolThen_'+tableno+'[]" id="templateVariableSymbolThen_'+tableno+'_'+idCount+'">%%</span>';
    sepHtml += '<input type="text" class="form-control rulevalue_then_'+tableno+' required" name="rulevalue_then_' + tableno + '[]" placeholder="Value" value="" id="ruleValueThen_' + tableno + '_' + idCount + '">';
    // sepHtml += '<input type="hidden" id="dataTypeOfFieldThenNew_' + tableno + '_' + idCount + '" name="dataTypeOfFieldThenNew_' + tableno + '[]" value="" />';
    sepHtml += '<input type="hidden" id="dataTypeOfFieldThen_' + tableno + '_' + idCount + '" name="dataTypeOfFieldThen_' + tableno + '[]" value="" />';
    sepHtml += '</span>';
    sepHtml += '</td> ';

    sepHtml += '<td class="remove removeThen" width="5%">';
    sepHtml += '<span id="removeThen_' + tableno + '_' + idCount + '" onclick="removeRuleRowThen(' + tableno + ',' + idCount + ')">';
    sepHtml += '<svg width="24" height="24" fill="#aa1818" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m3.707-11.707a.999.999 0 0 0-1.414 0L10 8.586 7.707 6.293a.999.999 0 1 0-1.414 1.414L8.586 10l-2.293 2.293a.999.999 0 1 0 1.414 1.414L10 11.414l2.293 2.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l2.293-2.293a.999.999 0 0 0 0-1.414"></path></svg>';
    sepHtml += '</span>';

    sepHtml += '<span id="addrulebuttonthen_' + tableno + '_' + idCount + '" class="btn--primary" type="button" onclick="addMoreRulethen(' + tableno + ')"><svg fill="#206bc4" width="24" height="24" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M8.996 8.996V7.008c.001-.043 0-.054.004-.097.044-.449.423-.845.879-.9.094-.011.115-.007.145-.007.043.002.054.002.097.007.448.054.834.442.879.9.004.043.003.054.004.097v1.988h1.992l.048.001c.49.035.918.441.954.93.039.545-.424 1.063-1.002 1.077h-1.992V13a1.04 1.04 0 0 1-.648.939c-.584.221-1.327-.217-1.359-.891L8.996 13v-1.996H7.004c-.511-.012-.966-.435-1.002-.931-.038-.53.396-1.049.954-1.076l.048-.001h1.992z"></path></svg></span>';

    sepHtml += '</td>';
    sepHtml += '</tr>';
    sepHtml += '</tbody>';

    // sepHtml += '<tfoot>';
    // sepHtml += '<tr><td colspan="6">&nbsp;</td><td>';
    // sepHtml += '<div class="exchangeorderbtnThen exchangeorderbtnThenAdd_' + tableno + '">';
    // sepHtml += '<span id="addrulebuttonthen" value="" class="btn--primary" type="button" onclick="addMoreRulethen(' + tableno + ')"><svg fill="#206bc4" width="24" height="24" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M8.996 8.996V7.008c.001-.043 0-.054.004-.097.044-.449.423-.845.879-.9.094-.011.115-.007.145-.007.043.002.054.002.097.007.448.054.834.442.879.9.004.043.003.054.004.097v1.988h1.992l.048.001c.49.035.918.441.954.93.039.545-.424 1.063-1.002 1.077h-1.992V13a1.04 1.04 0 0 1-.648.939c-.584.221-1.327-.217-1.359-.891L8.996 13v-1.996H7.004c-.511-.012-.966-.435-1.002-.931-.038-.53.396-1.049.954-1.076l.048-.001h1.992z"></path></svg></span>';
    // sepHtml += '</div>';

    // sepHtml += '</td></tr>';
    sepHtml += '<tr class="customCodeForFieldLevelThen_' + tableno + ' hide">';
    sepHtml += '<td class="tblFullRow" colspan="7"><h5>Custom Code</h5> <textarea  style="width:100%; height:100px;" class="form-control" id="customCodeFieldLevelThen_' + tableno + '" name="customCodeFieldLevelThen_' + tableno + '[]" value=""></textarea></td>';
    sepHtml += '</tr>';

    // === --- Child Table will add here --- === //
    sepHtml += '<tr class="hide" id="customObjectChildTableThen_' + tableno + '">';
    sepHtml += '<td class="tblFullRowThen" id="customObjectSubTableThen_' + tableno + '" colspan="7" width="100%">';
    sepHtml += '<input type="hidden" id="fieldForWhenRuleChildThen_' + tableno + '" name="fieldForWhenRuleChildThen[]" value=""/>'
    sepHtml += '<input type="hidden" id="ChildTableNumOfMasterTableNoThen_' + tableno + '" name="ChildTableNumOfMasterTableNoThen[]" value="0"/>';
    sepHtml += '</td>';
    sepHtml += '</tr>';
    // === --- Child Table will End here --- === //   
    // sepHtml += '</tfoot>';

    sepHtml += '</table>';



    $("#sep_addThenNew").append(sepHtml);
    $("#removeThen_" + tableno + "_0").hide();
    $("#removeThenNew_" + tableno + "_0").hide();
    //$("#indexValue").val(newRow);
}







function addMoreRuleFieldLevel_OLD(tablnum) {
    $('#condition_' + tablnum + '_0').show();
    var tableno = ''
    if (tablnum != '') {
        tableno = parseInt(tablnum);
    } else {
        tableno = parseInt($('#indexValue').val() - 1)
    }

    let rowCount = parseInt($('#totalRules_' + tableno).val());
    if (rowCount > 0) {
        rowCount = rowCount - 1;
    }

    if ($('#ChooseField_0' + rowCount).val() == '') {
        alert("Please select a Field Name");
        $('#ChooseField_0' + rowCount).focus();
        $('#ChooseField_0' + rowCount).addClass("err");
        return false;
    } else {
        $('#ChooseField_0' + rowCount).removeClass("err");
    }



    $(".FunctionClsDrop_" + tableno + "_" + rowCount).hide();
    $(".ChooseFieldCls_" + tableno + "_" + rowCount).show();


    changeCustomObjectFieldaddMore(rowCount, tablnum);

}



function openCustomCodeFieldLevel_OLD(tablenum) {
    $('.customCodeForFieldLevel_' + tablenum).show();
}

function removeRuleRow(tablenumber, rownumber) {
    if (confirm('Are you sure to remove this record')) {
        $('#tableRow_' + tablenumber + '_' + rownumber).remove();

    }
}

function removeRuleTable(tablenumber) {
    if (confirm('Are you sure to remove this table')) {
        $('#tableaddRecorder_' + tablenumber).remove();
        $('#connectorTableId_' + tablenumber).remove();

    }
}

function hideRuleTable(tablenumber) {
    if (confirm('Are you sure to remove this table')) {
        $('#tableaddRecorder_' + tablenumber).addClass("hide");
    }
}

function setCheckSelectedValues() {
    var selectedOptn = $('#selectOptnFieldLevel').val();
    if (selectedOptn == 'Fields' || selectedOptn == 'Function Call' || selectedOptn == 'Custom Code') {
        $('.CustomOperationForSpecificField').hide();
        $('.CustomObjectForSpecificField').hide();
        $('#cusOperationModelFieldPopup').val('');
        $('#cusObjectsModelFieldPopup').val('');
    }
    if (selectedOptn == 'Custom Operations') {
        $('.CustomObjectForSpecificField').hide();
        $('.CustomOperationForSpecificField').show();

    }
    if (selectedOptn == 'Custom Objects') {
        $('.CustomOperationForSpecificField').hide();
        $('.CustomObjectForSpecificField').show();

    }
}

function setCheckSelectedValuesThen() {

    var selectedOptn = $('#selectOptnFieldLevelThen').val();

    if (selectedOptn == 'Fields' || selectedOptn == 'Function Call' || selectedOptn == 'Custom Code') {
        $('.CustomOperationForSpecificFieldThen').hide();
        $('.CustomCodeForSpecificField').show();
        $('#cusOperationModelFieldPopup').val('');
        $('#cusObjectModelFieldPopupThen').val('');
        $('.CustomObjectForSpecificFieldThen').hide();

    }else if(selectedOptn == 'Custom Operations') {
        $('.CustomObjectForSpecificFieldThen').hide();
        $('.CustomOperationForSpecificFieldThen').show();
    }else if (selectedOptn == 'Custom Objects') {
        $('.CustomOperationForSpecificFieldThen').hide();
        $('.CustomObjectForSpecificFieldThen').show();
        $('.CustomCodeForSpecificFieldThen').hide();
    }else{
        $('.CustomOperationForSpecificFieldThen').hide();
        $('.CustomObjectForSpecificFieldThen').hide();

    }



}

function changeFieldLevelsOptionsThenOLD() {
    var valueSelected = $("#selectOptnFieldLevelThen").val();
    if (valueSelected == 'Function Call' || valueSelected == 'Fields') {
        addFieldOrFunctionFormFieldLevel();
    }
    if (valueSelected == 'Custom Operations') {
        addFieldOrFunctionFormFieldLevelThen();
    }
    if (valueSelected == 'Custom Code') {
        addFieldOrFunctionFormFieldLevelThen();
    }
}

function changeFieldLevelsOptionsThen() {
    var valueSelected = $("#selectOptnFieldLevelThen").val();
    var currentTableSuffix = $("#currentTable_suffixThen").val();

    addFieldOrFunctionFormFieldLevelThen(currentTableSuffix);
    
    $('.CustomObjectForSpecificFieldThen').hide();
    $('#selectOptnFieldLevelThen').val('');
    //$('.templateVariableSymbolDataThenNew_'+currentTableSuffix+'_0').hide();
    $('.templateVariableSymbolDataThen_'+currentTableSuffix+'_0').hide();
}


function fieldModelPopUpInbetweenOLD(tableNumber) {
    if (($("#selectOptnFieldLevel option[value='Custom Operations']").length > 0)) {

    } else {
        var option = $("<option/>", {
            value: 'Custom Operations',
            text: 'Custom Operations'
        })
        $("#selectOptnFieldLevel").append(option);
    }

    if (($("#selectOptnFieldLevel option[value='Custom Objects']").length > 0)) {

    } else {
        var option = $("<option/>", {
            value: 'Custom Objects',
            text: 'Custom Objects'
        })
        $("#selectOptnFieldLevel").append(option);
    }


    $('.modalbtn').click();
    var obj = 0//parseInt($("#indexValue").val()-1);
    var tableno = parseInt(tableNumber);
    var tbno = $('#currentTableNo').val(tableno);
    var functionCallOncart = $('#selectOptn').val();

    var nameCustomCode = '';
    nameCustomCode = $('#namespaceCustomCode').val();
    $('#browt_customOperationsFieldLevel').empty();
    $('#cusOperationModelFieldPopup').val('');
    $('#cusObjectsModelFieldPopup').val('');
    $('#browt_customObjectsFieldLevel').empty();

    if (functionCallOncart == 'Custom Code') {
        $('#cusCodesUpperLevel').text(nameCustomCode);
        $('.cusCode').show();
        $('#overallCustomCode').val(nameOperations);
        $('#namespaceCustomCode').val('');
        return true;
    }

    $('#tableaddRecorder_1').show();
    $('.exchangeorderbtnWhenAdd').show();

    var obj = parseInt(obj);
    if (functionCallOncart == 'Function Call') {
        $("#tableHeadRow_" + tableno).attr('colspan', 8);
        $("#tableBottomRow_" + tableno).attr('colspan', 8);
        $('.tableHead_' + tableno).remove();
        $('.tableHeadForField_' + tableno).show();
        $('.FunctionsHeading_' + tableno).show();
        $('#fieldFor_' + tableno + '_0').val('Function Call');
        $('#browt_AllFunction_' + tableno + '_' + obj).empty();

        $('#browt_AllFunction_' + tableno + '_' + obj).append("<option value=''>");
        $.each(PClevel.jupiterMetaData.result.methodsList, function (i, item) {
            $('#browt_AllFunction_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
        });
        $(".ChooseFieldCls_" + tableno + "_" + obj).hide();
        //$('#ChooseField_'+tableno+'_'+obj).hide();
        $(".FunctionClsDrop_" + tableno + "_" + obj).show();
        var countRow = parseInt($("#indexValue").val()) + 1;
        $("#indexValue").val(countRow);

        $('#namespaceField').val('');
        $('#nameSpaceCustomObjects').val('');
        $('#nameOperations').val('');
        $('#namespaceCustomCode').val('');
        $('#namespaceFunctionCall').val('');

        $('.fieldscls').hide();
        $('.customObjcls').hide();
        $('.operationscls').hide();
        $('.customcodecls').hide();
        $('.functioncallcls').hide();
        $('#selectOptn').val('');
        return true;
    }

    if (functionCallOncart == 'Fields') {
        $("#tableHeadRow_" + tableno).attr('colspan', 8);
        $("#tableBottomRow_" + tableno).attr('colspan', 8);
        $('.tableHead_' + tableno).remove();
        $('.tableHeadForField_' + tableno).show();
        $('.FieldsHeading_' + tableno).show();
        $('#fieldFor_' + tableno + '_0').val('Field Call');

        $('#browt_AllFunction_' + tableno + '_' + obj).empty();

        $('#browt_AllFunction_' + tableno + '_' + obj).append("<option value=''>");
        $.each(PClevel.jupiterMetaData.result.methodsList, function (i, item) {
            $('#browt_AllFunction_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
        });

        $('#browt_ChooseField_' + tableno + '_' + obj).empty();
        $('#browt_ChooseField_' + tableno + '_' + obj).append("<option value=''>");
        $.each(PClevel.jupiterMetaData.result.fieldList, function (i, item) {
            $('#browt_ChooseField_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
        });
        $(".ChooseFieldCls_" + tableno + "_" + obj).show();
        //$('#ChooseField_'+tableno+'_'+obj).hide();
        $(".FunctionClsDrop_" + tableno + "_" + obj).hide();
        var countRow = parseInt($("#indexValue").val()) + 1;
        $("#indexValue").val(countRow);

        $('#namespaceField').val('');
        $('#nameSpaceCustomObjects').val('');
        $('#nameOperations').val('');
        $('#namespaceCustomCode').val('');
        $('#namespaceFunctionCall').val('');

        $('.fieldscls').hide();
        $('.customObjcls').hide();
        $('.operationscls').hide();
        $('.customcodecls').hide();
        $('.functioncallcls').hide();
        $('#selectOptn').val('');
        return true;
    }


    var fieldJson = '';
    fieldJson = $($('#fieldFor_' + tableno + '_' + obj)).val();

    var allChooseFilelds;
    if (fieldJson == 'CART' || fieldJson == 'PAYMENT' || fieldJson == 'PREORDERVALIDATION') {
        if (fieldJson == 'CART' || fieldJson == 'PAYMENT' || fieldJson == 'PREORDERVALIDATION') {
            allChooseFilelds = Object.keys(PClevel.jupiterMetaData.result.field)
        } else {
            allChooseFilelds = PClevel.jupiterMetaData.result.customObjects
        }
    } else if (PClevel.jupiterMetaData.result.field[fieldJson].field) {
        console.log('All Data:', PClevel.jupiterMetaData.result.field[fieldJson].field)
        console.log(Object.keys(PClevel.jupiterMetaData.result.field[fieldJson].field))
        allChooseFilelds = Object.keys(PClevel.jupiterMetaData.result.field[fieldJson].field)
    }
    if (allChooseFilelds) {
        $('#browt_AllFunction_' + tableno + '_' + obj).empty();

        $('#browt_AllFunction_' + tableno + '_' + obj).append("<option value=''>");
        $.each(PClevel.jupiterMetaData.result.methodsList, function (i, item) {
            $('#browt_AllFunction_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
        });

        $('#ChooseField_' + tableno + '_' + obj).show();

        if (fieldJson == 'CART' || fieldJson == 'PAYMENT' || fieldJson == 'PREORDERVALIDATION') {
            $('#CartAndStatement_' + tableno + '_' + obj).show();
            $('#browt_Conditions_' + tableno + '_' + obj).append("<option value=''>");
            $.each(allChooseFilelds, function (i, item) {
                //  var name = "( " + item.id + "_" + item.frameType + " )"
                $('#browt_Conditions_' + obj).append('<option value="' + item + '">' + item + '</option>');
            });

        } else {
            var customOperationsResult = PClevel.jupiterMetaData.result.field[fieldJson].customKeywords.condition;
            var customObjectInnerResult = PClevel.jupiterMetaData.result.field[fieldJson].customObjects;
            console.log('customObjectInnerResult=======', customObjectInnerResult)
            if (customOperationsResult.length > 0) {


                $('#browt_customOperations_' + tableno).empty();
                $('#browt_customOperations_' + tableno).append("<option value=''>");
                $.each(customOperationsResult, function (i, item) {
                    $('#browt_customOperations_' + tableno).append('<option value="' + item.name + '">' + item.name + '</option>');
                });

                //For model pop on field levelcustomoperation dropdown 
                $('#browt_customOperationsFieldLevel').empty();
                $('#browt_customOperationsFieldLevel').append("<option value=''>");
                $.each(customOperationsResult, function (i, item) {

                    $('#browt_customOperationsFieldLevel').append('<option value="' + item.name + '">' + item.name + '</option>');
                });


                //end


                $('#browt_customOprFieldName_' + tableno).empty();
                $('#browt_customOprFieldName_' + tableno).append("<option value=''>");
                $.each(allChooseFilelds, function (i, item) {
                    //  var name = "( " + item.id + "_" + item.frameType + " )"
                    $('#browt_customOprFieldName_' + tableno).append('<option value="' + item + '">' + item + '</option>');
                });

            } else {
                $("#selectOptnFieldLevel option[value='Custom Operations']").remove();
            }

            //check for innerCustom Object available

            if (customObjectInnerResult.length > 0) {




                //For model pop on field levelcustomObject dropdown 
                $('#browt_customObjectsFieldLevel').empty();
                $('#browt_customObjectsFieldLevel').append("<option value=''>");
                $.each(customObjectInnerResult, function (i, item) {

                    $('#browt_customObjectsFieldLevel').append('<option value="' + item + '">' + item + '</option>');
                });




                //end

            } else {
                $("#selectOptnFieldLevel option[value='Custom Objects']").remove();
            }


            //check for innerCustom code available ends

            $('#browt_ChooseField_' + tableno + '_' + obj).empty();
            $('#browt_ChooseField_' + tableno + '_' + obj).append("<option value=''>");
            $.each(allChooseFilelds, function (i, item) {
                //  var name = "( " + item.id + "_" + item.frameType + " )"
                $('#browt_ChooseField_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
            });
        }
    } else {
        $('#browt_AllFunction_' + tableno + '_' + obj).empty();

        $('#browt_AllFunction_' + tableno + '_' + obj).append("<option value=''>");
        $.each(PClevel.jupiterMetaData.result.methodsList, function (i, item) {
            $('#browt_AllFunction_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
        });

        var allOperators = Object.values(PClevel.jupiterMetaData.result.field[fieldJson].allowedActions)
        $('#condition_' + tableno + '_' + obj).empty();
        $('#ChooseField_' + tableno + '_' + obj).hide();


        $('#browt_condition_' + tableno + '_' + obj).empty();
        $('#browt_condition_' + tableno + '_' + obj).append("<option value=''>");
        $.each(allOperators, function (i, item) {
            //  var name = "( " + item.id + "_" + item.frameType + " )"
            $('#browt_condition_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
        });
    }


    $('#namespaceField').val('');
    $('#nameSpaceCustomObjects').val('');
    $('#nameOperations').val('');
    $('#namespaceCustomCode').val('');
    $('#namespaceFunctionCall').val('');

    $('.fieldscls').hide();
    $('.customObjcls').hide();
    $('.operationscls').hide();
    $('.customcodecls').hide();
    $('.functioncallcls').hide();
    $('#selectOptn').val('');
    $('#currentTable_suffix').val(tableNumber);
}

function fieldModelPopUpInbetween(tableNumber) {
    
    var nameSpace=$('#ruleNamespace').val();
    var forPaymentNamespaceMethodList='';
    if (($("#selectOptnFieldLevel option[value='Custom Operations']").length > 0)) {

    } else {
        var option = $("<option/>", {
            value: 'Custom Operations',
            text: 'Custom Operations'
        })
        $("#selectOptnFieldLevel").append(option);
    }

    if (($("#selectOptnFieldLevel option[value='Custom Objects']").length > 0)) {

    } else {
        var option = $("<option/>", {
            value: 'Custom Objects',
            text: 'Custom Objects'
        })
        $("#selectOptnFieldLevel").append(option);
    }


    $('.modalbtn').click();
    var obj = 0//parseInt($("#indexValue").val()-1);
    var tableno = parseInt(tableNumber);
    var tbno = $('#currentTableNo').val(tableno);
    var functionCallOncart = $('#selectOptn').val();

    var nameCustomCode = '';
    nameCustomCode = $('#namespaceCustomCode').val();
    $('#browt_customOperationsFieldLevel').empty();
    $('#cusOperationModelFieldPopup').val('');
    $('#cusObjectsModelFieldPopup').val('');
    $('#browt_customObjectsFieldLevel').empty();

    if (functionCallOncart == 'Custom Code') {
        $('#cusCodesUpperLevel').text(nameCustomCode);
        $('.cusCode').show();
        $('#overallCustomCode').val(nameOperations);
        $('#namespaceCustomCode').val('');
        return true;
    }

    $('#tableaddRecorder_1').show();
    $('.exchangeorderbtnWhenAdd').show();

    var obj = parseInt(obj);
    
    if (functionCallOncart == 'Function Call') {
       
        console.log('here data are==',PClevel.jupiterMetaData.result)
        console.log('all methods',PClevel.jupiterMetaData.result.methodsList)
        $("#tableHeadRow_" + tableno).attr('colspan', 8);
        $("#tableBottomRow_" + tableno).attr('colspan', 8);
        $('.tableHead_' + tableno).remove();
        $('.tableHeadForField_' + tableno).show();
        $('.FunctionsHeading_' + tableno).show();
        $('#fieldFor_' + tableno + '_0').val('Function Call');
        if(typeof $('#fieldForWhenRule_'+tableno).val()!='undefined'){
        forPaymentNamespaceMethodList=$('#fieldForWhenRule_'+tableno);
        }
        
        
        if(nameSpace=='PAYMENT' && forPaymentNamespaceMethodList!=''){
            
            $('#browt_AllFunction_' + tableno + '_' + obj).empty();

            $('#browt_AllFunction_' + tableno + '_' + obj).append("<option value=''>");
            $.each(PClevel.jupiterMetaData.result[forPaymentNamespaceMethodList].methodsList, function (i, item) {
                $('#browt_AllFunction_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
            });
        }else{
                $('#browt_AllFunction_' + tableno + '_' + obj).empty();

                $('#browt_AllFunction_' + tableno + '_' + obj).append("<option value=''>");
                $.each(PClevel.jupiterMetaData.result.methodsList, function (i, item) {
                    $('#browt_AllFunction_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
                });
        }
        $(".ChooseFieldCls_" + tableno + "_" + obj).hide();
        //$('#ChooseField_'+tableno+'_'+obj).hide();
        $(".FunctionClsDrop_" + tableno + "_" + obj).show();
        var countRow = parseInt($("#indexValue").val()) + 1;
        $("#indexValue").val(countRow);

        $('#namespaceField').val('');
        $('#nameSpaceCustomObjects').val('');
        $('#nameOperations').val('');
        $('#namespaceCustomCode').val('');
        $('#namespaceFunctionCall').val('');

        $('.fieldscls').hide();
        $('.customObjcls').hide();
        $('.operationscls').hide();
        $('.customcodecls').hide();
        $('.functioncallcls').hide();
        $('#selectOptn').val('');
        return true;
    }

    if (functionCallOncart == 'Fields') {
        $("#tableHeadRow_" + tableno).attr('colspan', 8);
        $("#tableBottomRow_" + tableno).attr('colspan', 8);
        $('.tableHead_' + tableno).remove();
        $('.tableHeadForField_' + tableno).show();
        $('.FieldsHeading_' + tableno).show();
        $('#fieldFor_' + tableno + '_0').val('Field Call');

        $('#browt_AllFunction_' + tableno + '_' + obj).empty();

        $('#browt_AllFunction_' + tableno + '_' + obj).append("<option value=''>");
        $.each(PClevel.jupiterMetaData.result.methodsList, function (i, item) {
            $('#browt_AllFunction_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
        });

        $('#browt_ChooseField_' + tableno + '_' + obj).empty();
        $('#browt_ChooseField_' + tableno + '_' + obj).append("<option value=''>");
        $.each(PClevel.jupiterMetaData.result.fieldList, function (i, item) {
            $('#browt_ChooseField_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
        });
        $(".ChooseFieldCls_" + tableno + "_" + obj).show();
        //$('#ChooseField_'+tableno+'_'+obj).hide();
        $(".FunctionClsDrop_" + tableno + "_" + obj).hide();
        var countRow = parseInt($("#indexValue").val()) + 1;
        $("#indexValue").val(countRow);

        $('#namespaceField').val('');
        $('#nameSpaceCustomObjects').val('');
        $('#nameOperations').val('');
        $('#namespaceCustomCode').val('');
        $('#namespaceFunctionCall').val('');

        $('.fieldscls').hide();
        $('.customObjcls').hide();
        $('.operationscls').hide();
        $('.customcodecls').hide();
        $('.functioncallcls').hide();
        $('#selectOptn').val('');
        return true;
    }


    var fieldJson = '';
    fieldJson = $($('#fieldFor_' + tableno + '_' + obj)).val();

    var allChooseFilelds;
    var allmethodlist=[];
    if (fieldJson == 'CART' || fieldJson == 'PAYMENT' || fieldJson == 'PREORDERVALIDATION') {
        if (fieldJson == 'CART' || fieldJson == 'PAYMENT' || fieldJson == 'PREORDERVALIDATION') {
            allChooseFilelds = Object.keys(PClevel.jupiterMetaData.result.field)
        } else {
            allChooseFilelds = PClevel.jupiterMetaData.result.customObjects
        }
    } else if (PClevel.jupiterMetaData.result.field[fieldJson].field) {
        console.log('All Data:', PClevel.jupiterMetaData.result.field[fieldJson].field)
        console.log(Object.keys(PClevel.jupiterMetaData.result.field[fieldJson].field))
        allChooseFilelds = Object.keys(PClevel.jupiterMetaData.result.field[fieldJson].field)
        if(typeof PClevel.jupiterMetaData.result.field[fieldJson].methodsList!='undefined'){
            allmethodlist=PClevel.jupiterMetaData.result.field[fieldJson].methodsList;
            }
            console.log('allmethodlist',allmethodlist)
    }
    if (allChooseFilelds) {
        $('#browt_AllFunction_' + tableno + '_' + obj).empty();


        if(nameSpace=='PAYMENT'){
            $('#browt_AllFunction_' + tableno + '_' + obj).append("<option value=''>");
            $.each(PClevel.jupiterMetaData.result.field[fieldJson].methodsList, function (i, item) {
                $('#browt_AllFunction_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
            });

        }else{
              if(allmethodlist.length>0){
                $('#browt_AllFunction_' + tableno + '_' + obj).append("<option value=''>");
                $.each(allmethodlist, function (i, item) {
                    $('#browt_AllFunction_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
                });
            }
        }

        $('#ChooseField_' + tableno + '_' + obj).show();

        if (fieldJson == 'CART' || fieldJson == 'PAYMENT' || fieldJson == 'PREORDERVALIDATION') {
            $('#CartAndStatement_' + tableno + '_' + obj).show();
            $('#browt_Conditions_' + tableno + '_' + obj).append("<option value=''>");
            $.each(allChooseFilelds, function (i, item) {
                //  var name = "( " + item.id + "_" + item.frameType + " )"
                $('#browt_Conditions_' + obj).append('<option value="' + item + '">' + item + '</option>');
            });

        } else {
            var customOperationsResult = PClevel.jupiterMetaData.result.field[fieldJson].customKeywords.condition;
            var customObjectInnerResult = PClevel.jupiterMetaData.result.field[fieldJson].customObjects;
            console.log('customObjectInnerResult=======', customObjectInnerResult)
            if (customOperationsResult.length > 0) {


                $('#browt_customOperations_' + tableno).empty();
                $('#browt_customOperations_' + tableno).append("<option value=''>");
                $.each(customOperationsResult, function (i, item) {
                    $('#browt_customOperations_' + tableno).append('<option value="' + item.name + '">' + item.name + '</option>');
                });

                //For model pop on field levelcustomoperation dropdown 
                $('#browt_customOperationsFieldLevel').empty();
                $('#browt_customOperationsFieldLevel').append("<option value=''>");
                $.each(customOperationsResult, function (i, item) {

                    $('#browt_customOperationsFieldLevel').append('<option value="' + item.name + '">' + item.name + '</option>');
                });


                //end


                $('#browt_customOprFieldName_' + tableno).empty();
                $('#browt_customOprFieldName_' + tableno).append("<option value=''>");
                $.each(allChooseFilelds, function (i, item) {
                    //  var name = "( " + item.id + "_" + item.frameType + " )"
                    $('#browt_customOprFieldName_' + tableno).append('<option value="' + item + '">' + item + '</option>');
                });

            } else {
                $("#selectOptnFieldLevel option[value='Custom Operations']").remove();
            }

            //check for innerCustom Object available

            if (customObjectInnerResult.length > 0) {




                //For model pop on field levelcustomObject dropdown 
                $('#browt_customObjectsFieldLevel').empty();
                $('#browt_customObjectsFieldLevel').append("<option value=''>");
                $.each(customObjectInnerResult, function (i, item) {

                    $('#browt_customObjectsFieldLevel').append('<option value="' + item + '">' + item + '</option>');
                });




                //end

            } else {
                $("#selectOptnFieldLevel option[value='Custom Objects']").remove();
            }


            //check for innerCustom code available ends

            $('#browt_ChooseField_' + tableno + '_' + obj).empty();
            $('#browt_ChooseField_' + tableno + '_' + obj).append("<option value=''>");
            $.each(allChooseFilelds, function (i, item) {
                //  var name = "( " + item.id + "_" + item.frameType + " )"
                $('#browt_ChooseField_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
            });
        }
    } else {
        $('#browt_AllFunction_' + tableno + '_' + obj).empty();
        if(allmethodlist.length>0){
        $('#browt_AllFunction_' + tableno + '_' + obj).append("<option value=''>");
        $.each(allmethodlist, function (i, item) {
            $('#browt_AllFunction_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
        });
       }

        var allOperators = Object.values(PClevel.jupiterMetaData.result.field[fieldJson].allowedActions)
        $('#condition_' + tableno + '_' + obj).empty();
        $('#ChooseField_' + tableno + '_' + obj).hide();


        $('#browt_condition_' + tableno + '_' + obj).empty();
        $('#browt_condition_' + tableno + '_' + obj).append("<option value=''>");
        $.each(allOperators, function (i, item) {
            //  var name = "( " + item.id + "_" + item.frameType + " )"
            $('#browt_condition_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
        });
    }


    $('#namespaceField').val('');
    $('#nameSpaceCustomObjects').val('');
    $('#nameOperations').val('');
    $('#namespaceCustomCode').val('');
    $('#namespaceFunctionCall').val('');

    $('.fieldscls').hide();
    $('.customObjcls').hide();
    $('.operationscls').hide();
    $('.customcodecls').hide();
    $('.functioncallcls').hide();
    $('#selectOptn').val('');
    $('#currentTable_suffix').val(tableNumber);
}


function selectOtherOptionsThen() {
    var optionSelected = $('#selectOptnThen').val();
    if (optionSelected != '') {
        if (optionSelected == 'Fields') {
            $('.fieldsclsThen').hide();
            $('.customObjclsThen').hide();
            $('.operationsclsThen').hide();
            $('.customcodeclsThen').hide();
            $('.functioncallclsThen').hide();
        }
        if (optionSelected == 'Custom Objects') {
            $('.fieldsclsThen').hide();
            $('.customObjclsThen').show();
            $('.operationsclsThen').hide();
            $('.customcodeclsThen').hide();
            $('.functioncallclsThen').hide();
        }
        if (optionSelected == 'Operations') {
            $('.fieldsclsThen').hide();
            $('.customObjclsThen').hide();
            $('.operationsclsThen').show();
            $('.customcodeclsThen').hide();
            $('.functioncallclsThen').hide();

        }
        if (optionSelected == 'Custom Code') {
            $('.fieldsclsThen').hide();
            $('.customObjclsThen').hide();
            $('.operationsclsThen').hide();
            $('.customcodeclsThen').show();
            $('.functioncallclsThen').hide();

        }
        if (optionSelected == 'Function Call') {
            $('.fieldsclsThen').hide();
            $('.customObjclsThen').hide();
            $('.operationsclsThen').hide();
            $('.customcodeclsThen').hide();
            $('.functioncallclsThen').hide();

        }
    }
}

function fieldModelPopUpInbetweenThenNew(tableNumber) {
    
    if (($("#selectOptnFieldLevelThen option[value='Custom Operations']").length > 0)) {

    } else {
        var option = $("<option/>", {
            value: 'Custom Operations',
            text: 'Custom Operations'
        });
        $("#selectOptnFieldLevelThen").append(option);
    }

    if (($("#selectOptnFieldLevelThen option[value='Function Call']").length > 0)) {

    } else {
        var option = $("<option/>", {
            value: 'Function Call',
            text: 'Function Call'
        });
        $("#selectOptnFieldLevelThen").append(option);
    }

    if (($("#selectOptnFieldLevelThen option[value='Custom Objects']").length > 0)) {

    } else {
        var option = $("<option/>", {
            value: 'Custom Objects',
            text: 'Custom Objects'
        })
        $("#selectOptnFieldLevelThen").append(option);
    }
    //$('.modalbtn').click();
    var functionCallOncart = $('#selectOptnThen').val();
    
    var obj = 0//parseInt($("#indexValue").val()-1);
    var tableno = parseInt(tableNumber);
    var tbno = $('#currentTableNoThen').val(tableno)
    var nameCustomCode = '';
    if($('#namespaceCustomCodeThen').val()){
    nameCustomCode = $('#namespaceCustomCodeThen').val();
    }
    
    if (nameCustomCode != '') {
        $('#cusCodesUpperLevelThen').text(nameCustomCode);
        $('.cusCodeThen').show();
        $('#overallCustomCodeThen').val(nameOperations);
        $('#namespaceCustomCodeThen').val('');
        return true;
    }

    
    var obj = parseInt(obj);
    if (functionCallOncart == 'Function Call') {
        $('#fieldForThen_' + tableno).val('Function Call');
        $('#browt_ChooseFieldThen_' + tableno + '_' + obj).empty();
        $('#browt_ChooseFieldThen_' + tableno + '_' + obj).append("<option value=''>");
        $.each(PClevel.jupiterMetaData.result.methodsList, function (i, item) {
            console.log('NEW ITEMS==', item);
            //  var name = "( " + item.id + "_" + item.frameType + " )"
            $('#browt_ChooseFieldThen_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
        });

        $('.FieldsHeadingThen_' + tableno).hide();
        $('.FunctionsHeadingThen_' + tableno).show();
        $('#fieldForThen_' + tableno).val('Function Call');
        $('#fieldForThenn_' + tableno + '_' + obj).val('Function Call');
        return true;
    }

    if (functionCallOncart == 'Fields') {

        var allchossenField;
        if (PClevel.jupiterMetaData.result.fieldList) {
            allchossenField = PClevel.jupiterMetaData.result.fieldList;
            if (allchossenField.length > 0) {

                $('#browt_ChooseFieldThen_' + tableno + '_' + obj).empty();
                $('#browt_ChooseFieldThen_' + tableno + '_' + obj).append("<option value=''>");
                $.each(allchossenField, function (i, item) {
                    console.log('NEW ITEMS==', item);
                    //  var name = "( " + item.id + "_" + item.frameType + " )"
                    $('#browt_ChooseFieldThen_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
                });

                $('#browt_AllFunctionThen_' + tableno + '_' + obj).empty();
                $('#browt_AllFunctionThen_' + tableno + '_' + obj).append("<option value=''>");
                $.each(PClevel.jupiterMetaData.result.methodsList, function (i, item) {
                    console.log('NEW ITEMS==', item);
                    //  var name = "( " + item.id + "_" + item.frameType + " )"
                    $('#browt_AllFunctionThen_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
                });

                //$('.nonCustmOprFieldForThen' + tableno).show();
                $('.FieldsHeadingThen_' + tableno).show();
                $('.FunctionsHeadingThen_' + tableno).hide();
                $('#fieldForThen_' + tableno).val('FieldsThen');
                $('#fieldForThenn_' + tableno + '_' + obj).val('FieldsThen');
            }
        }
        return true;
    }


    var fieldJson = '';
    fieldJson = $('#fieldForThen_' + tableno).val();

    $('#fieldForThen_' + tableno).val(fieldJson);
    
    var allChooseFilelds;
    if (PClevel.jupiterMetaData.result.field[fieldJson].field) {
        
        console.log('All Data THEN:', PClevel.jupiterMetaData.result.field[fieldJson].field)
        console.log(Object.keys(PClevel.jupiterMetaData.result.field[fieldJson].field))
        allChooseFilelds = Object.keys(PClevel.jupiterMetaData.result.field[fieldJson].field)
        if (allChooseFilelds.length > 0) {
            $('#browt_ChooseFieldThen_' + tableno + '_' + obj).empty();
            $('#browt_ChooseFieldThen_' + tableno + '_' + obj).append("<option value=''>");
            $.each(allChooseFilelds, function (i, item) {
                $('#browt_ChooseFieldThen_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
            });


            $('#browt_AllFunctionThen_' + tableno + '_' + obj).empty();
            $('#browt_AllFunctionThen_' + tableno + '_' + obj).append("<option value=''>");
            $.each(PClevel.jupiterMetaData.result.field[fieldJson].methodsList, function (i, item) {
                $('#browt_AllFunctionThen_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
            });


            //seting first table choose field val also   
            $('#browt_ChooseFieldThenNew_' + tableno + '_' + obj).empty();
            $('#browt_ChooseFieldThenNew_' + tableno + '_' + obj).append("<option value=''>");
            $.each(allChooseFilelds, function (i, item) {
                //  var name = "( " + item.id + "_" + item.frameType + " )"
                $('#browt_ChooseFieldThenNew_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
            });

            //seting first table choose field val also ends              
        }

        var customOperationsResult = PClevel.jupiterMetaData.result.field[fieldJson].customKeywords.action;

        var customObjectInnerResult=[];
        if(typeof PClevel.jupiterMetaData.result.field[fieldJson].customObjects!='undefined'){
         customObjectInnerResult = PClevel.jupiterMetaData.result.field[fieldJson].customObjects;
        }
        if (customOperationsResult.length > 0) {
            //For model pop on field levelcustomoperation dropdown 
            $('#browt_customOperationsFieldLevelThen').empty();
            $('#browt_customOperationsFieldLevelThen').append("<option value=''>");
            $.each(customOperationsResult, function (i, item) {

                $('#browt_customOperationsFieldLevelThen').append('<option value="' + item.name + '">' + item.name + '</option>');
            });


            //end

        } else {

            $("#selectOptnFieldLevelThen option[value='Custom Operations']").remove();

        }

        if (customObjectInnerResult.length > 0) {

            //For model pop on field levelcustomObject dropdown 
            $('#browt_customObjectsFieldLevelThen').empty();
            $('#browt_customObjectsFieldLevelThen').append("<option value=''>");
            $.each(customObjectInnerResult, function (i, item) {

                $('#browt_customObjectsFieldLevelThen').append('<option value="' + item + '">' + item + '</option>');
            });




            //end

        } else {
            $("#selectOptnFieldLevelThen option[value='Custom Objects']").remove();
        }

        var allmethodList = PClevel.jupiterMetaData.result.field[fieldJson].methodsList;
        if(allmethodList.length>0){

        }else{
            
            $("#selectOptnFieldLevelThen option[value='Function Call']").remove();
        }
    } else {
        $('#tableaddRecorderThen_' + tableno).hide();
        $('.exchangeorderbtnThenAdd_' + tableno).hide();
    }

    $('#namespaceFieldThen').val('');
    $('#nameSpaceCustomObjectsThen').val('');
    $('#nameOperationsThen').val('');
    $('#namespaceCustomCodeThen').val('');
    $('#namespaceFunctionCallThen').val('');

    $('.fieldsclsThen').hide();
    $('.customObjclsThen').hide();
    $('.operationsclsThen').hide();
    $('.customcodeclsThen').hide();
    $('.functioncallclsThen').hide();
    $('.CustomOperationForSpecificFieldThen').hide();
    $('.CustomObjectForSpecificFieldThen').hide();

    $('#selectOptnThen').val('');
    $('#currentTable_suffixThen').val(tableno);

}

function addFieldOrFunctionFormFieldLevelThenOLD() {
    $('.modalbtnFieldLevel').click();
    var tablenum = parseInt($('#currentTableNoThen').val())
    var optionSelected = $('#selectOptnFieldLevelThen').val()
    if (optionSelected == 'Fields') {
        addMoreRuleFieldLevel(tablenum);
    }
    if (optionSelected == 'Function Call') {
        addMoreRuleForFunctionFieldLevel(tablenum);
    }
    if (optionSelected == 'Custom Operations') {
        addMoreRuleForCustomOperationsFieldLevelThen(tablenum);
    }
    if (optionSelected == 'Custom Code') {
        openCustomCodeFieldLevelThen(tablenum);
    }
}

function addFieldOrFunctionFormFieldLevelThen(currentTableSuffix) {
    $('.modalbtnFieldLevel').click();
    var ruleTypeTaken = $('#ruleType').val();
    if (ruleTypeTaken == 'TEMPLATE' || ruleTypeTaken == 'FACT_TEMPLATE') {
        $(".templateTypeOptionThen").show();
        //$("#tableHeadRow_" + tableno).attr('colspan', 7);
    } else {
        $(".templateTypeOptionThen").hide();
        //$("#tableHeadRow_" + tableno).attr('colspan', 6);
    }
    $('.templateVariableSymbolData_'+currentTableSuffix+'_0').hide();
    var tablenum = parseInt($('#currentTableNoThen').val())
    var optionSelected = $('#selectOptnFieldLevelThen').val()

    var currentTableSuffix='';
    if(typeof $('#currentTable_suffixThen').val()!='undefined'){
        currentTableSuffix=$('#currentTable_suffixThen').val();
    }
    
    if (optionSelected == 'Custom Objects') {
        var FieldModalPopUpValue = $('#cusObjectsModelFieldPopupThen').val();
        var tableDataHtml = createInnertableCustomObjectThen(tablenum, currentTableSuffix);
        appendNewTableForCustomObjectThen(tablenum, tableDataHtml, FieldModalPopUpValue, currentTableSuffix);
        
    }else{
        if (optionSelected == 'Custom Code') {
            openCustomCodeFieldLevelThen(currentTableSuffix);
        }else{
                if (optionSelected == 'Fields') {
                    addMoreRuleFieldLevelThen(tablenum,currentTableSuffix);
                }
                if (optionSelected == 'Function Call') {
                    
                    addMoreRuleForFunctionFieldLevelThen(tablenum,currentTableSuffix);
                }
                if (optionSelected == 'Custom Operations') {
                    addMoreRuleForCustomOperationsFieldLevelThen(tablenum,currentTableSuffix);
                }
                if (optionSelected == 'Custom Code') {
                    openCustomCodeFieldLevelThen(tablenum,currentTableSuffix);
                }
            }
        }   

}

function addMoreRuleForFunctionFieldLevelThen(tablnum, currentTableSuffix) {
    var tableno = ''
    if (tablnum != '') {
        tableno = parseInt(tablnum);
    } else {
        tableno = parseInt($('#indexValueThen').val() - 1)
    }

    let rowCount = parseInt($('#totalRulesThen_' + tableno).val());
    if (rowCount > 0) {
        rowCount = rowCount - 1;
    }
    $(".FunctionClsDropThen_" + currentTableSuffix + "_" + rowCount).show();
    $(".FunctionClsDropThenNew_"+ currentTableSuffix + "_" + rowCount).show();
    $(".ChooseFieldClsThen_" + currentTableSuffix + "_" + rowCount).hide();
    $(".ChooseFieldClsThenNew_"+currentTableSuffix+"_"+rowCount).hide();
    $('.nonCustmOprFieldForThen_' + currentTableSuffix).show();
    $(".FunctionClsDropThenParameter_" + currentTableSuffix + "_" + rowCount).show();
    $("#ruleValueThen_"+currentTableSuffix+"_"+rowCount).hide();
    
    //changeCustomObjectFieldaddMore(rowCount, currentTableSuffix);
}


function addMoreRuleForCustomOperationsFieldLevelThen_OLD(tableno) {

    var obj = 0//parseInt($("#indexValue").val()-1);
    var tableno = parseInt(tableno);
    var obj = parseInt(obj);
    console.log('Global variable:', PClevel)
    $('.nonCustmOprFieldForThen_' + tableno).remove();
    $('.conditionThenForCustomOperation_' + tableno).show();
    $('.cusOprThenNew_' + tableno).show();
    var customOperationSelected = $('#cusOperationModelFieldPopupThen').val();
    $('#cusOperationThen_' + tableno).val(customOperationSelected);
}

function addMoreRuleForCustomOperationsFieldLevelThen(tableno,currentTableSuffix) {
    var ruleTypeTaken = $('#ruleType').val();
    if (ruleTypeTaken == 'TEMPLATE' || ruleTypeTaken == 'FACT_TEMPLATE') {
                    $(".templateTypeOptionThenNew").show();
                    //$("#tableHeadRow_" + tableno).attr('colspan', 7);
                } else {
                    $(".templateTypeOptionThenNew").hide();
                    //$("#tableHeadRow_" + tableno).attr('colspan', 6);
                }

    if(currentTableSuffix!=''){

       
        var tableno = currentTableSuffix
        
        var selectedCustomOperationFromModel = $('#cusOperationModelFieldPopupThen').val();
        $('#cusOperationThen_' + tableno).val(selectedCustomOperationFromModel)
        var root = '';
        root = $('#rootpathThen_'+tableno).val()
        //alert('rootPath IN FUN'+root);

        var rootPath = [];
                if(root){
                    rootPath = root.split('.');
                }

        var dataSet = PClevel.jupiterMetaData.result;
            
        if(rootPath.length){
            for(i=0; i<rootPath.length; i++){
                dataSet = dataSet.field[rootPath[i]]
            
            }
        }

        console.log('FINDING CUSTOM OPERATION==',dataSet)
        var allChooseFilelds;
        if(typeof dataSet.fieldList!='undefined'){
                allChooseFilelds = dataSet.customKeywords.condition;
        }
        if (allChooseFilelds.length > 0) {
            //New Table Then part 
            $('.cusOprThenNew_' + tableno).show();
            $('.conditionThenForCustomOperation_' + tableno).show();
            //$('.cusOprAppliedOnField_' + tableno).show();
            // $('.cusOprActionValue_'tableno).show();
            //checkCustomOperationActionsChild(tableno,dataSet);


        } else {
            alert('Custom Operation Not Applicable')
        }

}else{ 
    var obj = 0//parseInt($("#indexValue").val()-1);
    var tableno = parseInt(tableno);
    var obj = parseInt(obj);
    console.log('Global variable:', PClevel)
    $('.nonCustmOprFieldForThen_' + tableno).remove();
    $('.conditionThenForCustomOperation_' + tableno).show();
    $('.cusOprThenNew_' + tableno).show();
    var customOperationSelected = $('#cusOperationModelFieldPopupThen').val();
    $('#cusOperationThen_' + tableno).val(customOperationSelected);


 }  



}


function getallowedActionsThen(tablenum, obj) {

    var tableno = tablenum//parseInt($("#indexValue").val()-1);
    var chooseField = '';
    if ($('#ChooseFieldThenNew_' + tableno + '_' + obj).val()) {
        chooseField = $('#ChooseFieldThenNew_' + tableno + '_' + obj).val();
    };
    var fieldFor = '';
    fieldFor = $('#fieldForThen_' + tableno).val()
    var nameSpace = $('#customObjects').val();
    if (typeof chooseField != "undefined") {
        if (chooseField != '') {
            if (fieldFor == 'Field Call') {

                var loopingOnActions = Object.values(PClevel.jupiterMetaData.result.field[chooseField].allowedActions)

                $('#browt_condition_' + tableno + '_' + obj).empty();

                $('#browt_condition_' + tableno + '_' + obj).append("<option value=''>");
                $.each(loopingOnActions, function (i, item) {

                    $('#browt_condition_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');

                });

                var dataType = PClevel.jupiterMetaData.result.field[chooseField].datatype;
                $('#dataTypeOfFieldThenNew_' + tableno + '_' + obj).val(dataType);

            }
            else {
                $.ajax({
                    method: "GET",
                    url: '/jupiter/get-jupiter-allowedActions?field=' + chooseField + '&fieldFor=' + fieldFor + '&nameSpace=' + nameSpace,
                }).done(function (res) {
                    console.log("============ ajax Response ==========");
                    console.log(res)
                    console.log(res.allowedActionArr)
                    $('#dataTypeOfFieldThenNew_' + tableno + '_' + obj).val(res.dataType);
                    var j = 0
                    $('#browt_conditionThenNew_' + tableno + '_' + obj).empty();
                    $('#browt_conditionThenNew_' + tableno + '_' + obj).append("<option value=''>");
                    $.each(res.allowedActionArr, function (i, item) {
                        if (item != '') {
                            $('#browt_conditionThenNew_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
                        }
                    });

                });
            }

        }
        
    }
}

function openCustomCodeFieldLevelThen_OLD(tablenum) {
    $('.customCodeForFieldLevelThen_' + tablenum).show();
}

function openCustomCodeFieldLevelThen(tableno) {
    //alert('tableno'+tableno)
    var tblarr = tableno.split("_");
    var childTablenum = parseInt($("#totalRulesThen_" + tableno).val());
    var obj = childTablenum;
    if (tblarr.length > 1) {
        var totalRulesChild = parseInt($("#totalRulesThen_" + tableno).val());
        if (totalRulesChild > 1) {
            totalRulesChild = totalRulesChild - 1;
        }
        childTablenum = parseInt($("#totalCustCodeChildThen_" + tableno).val());
        childTablenum = childTablenum + totalRulesChild;
        if (childTablenum > 0) {
            obj = childTablenum + 1;
        }
        
    }
    if(childTablenum==0){
        obj= childTablenum+1;
    }
    
   
    //alert(obj);
    var rowId = "tableRowChildThen_" + tableno + "_" + obj;
    if (tblarr.length > 1) {
        rowId = "tableRowChildThen_" + tableno + "_" + obj;
    }
    var rowIdStr = "'" + rowId + "'";
    sepHtml = '';
    sepHtml += '<tr id="' + rowId + '"><td class="tblFullRow" colspan="7">';
    sepHtml += '<div class="row">';
    sepHtml += '<div class="col-md-12 customCodeForFieldLevelThen_' + tableno + '">';
    sepHtml += '<div class="col-md-10" style="float:left"><h5>Custom Code</h5></div>';
    sepHtml += '<div class="col-md-2 red bold" style="float:left; text-align:right; padding-right:2%; cursor:pointer" onclick="removeTableRow(' + rowIdStr + ')">X';
    //sepHtml += '<svg width="18" height="18" fill="#aa1818" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m3.707-11.707a.999.999 0 0 0-1.414 0L10 8.586 7.707 6.293a.999.999 0 1 0-1.414 1.414L8.586 10l-2.293 2.293a.999.999 0 1 0 1.414 1.414L10 11.414l2.293 2.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l2.293-2.293a.999.999 0 0 0 0-1.414"></path></svg>';
    sepHtml += '</div>';
    sepHtml += '</div>';

    sepHtml += '<div class="col-md-12">';
    sepHtml += '<input class="hide" type="text" name="choose_field_then_' + tableno + '[]" value="custom_code"/>';
    sepHtml += '<textarea  style="width:100%; height:35px" class="form-control" id="customCodeForFieldLevelThen_' + tableno + '_' + obj + '" name="customCodeForFieldLevelThen_' + tableno + '_' + obj + '" value=""></textarea>';
    sepHtml += '</div>';
    sepHtml += '</div>';
    sepHtml += '</div>';
    sepHtml += '</td></tr>';


    if (tblarr.length > 1) {
        //alert('TBLE NO ISIDE IF'+tableno)
        $("#tableaddRecorderThenChild_" + tableno + " tbody:last").append(sepHtml);
        obj++;
        $("#totalCustCodeChildThen_" + tableno).val(obj);
    } else {
        //alert('TBLE NO ISIDE ELSE'+tableno)
        $("#tableaddRecorderThen_" + tableno + " tbody:last").append(sepHtml);
        obj++;
        //$("#totalRulesThen_" + tableno).val(obj)
    }
    //$('.customCodeForFieldLevel_' + tableno).show();
}

function updateRule() {
    if ($("#addrule").valid()) {
        var formData = $("#addrule").serialize();
        console.log("formData serialize:", formData);
        $.ajax({
            type: "POST",
            url: "/jupiter/update-rule",
            data: formData
        }).done(function (resultRes) {
            console.log("============ ajax Response FOR SAVE==========");
            console.log(resultRes);
            $(".topMessageRow").hide();
            $(".successMsg").hide();
            $(".errorMsg").hide();
            $(".msgRow").html('');
            if (resultRes.status == 200) {
                $(".topMessageRow").show();
                $("#successMsg").show();
                $("#errorMsg").hide();
                $("#successMsg").html('Rule Updated with rule id:' + resultRes.result.ruleId);
                $('html, body').animate({ scrollTop: $('.navbar-expand-md').offset().top }, 'slow');
                window.location.href = "/jupiter/rule-version-history/" + resultRes.result.ruleName
                

            } else {
                $(".topMessageRow").show();
                $("#successMsg").hide();
                $("#errorMsg").show();
                $("#errorMsg").html(JSON.stringify(resultRes, undefined, 2));
                //$("#errorMsg").html(resultRes.message);
                $('html, body').animate({ scrollTop: $('.navbar-expand-md').offset().top }, 'slow');
                return false;
            }

        });

    }
}

function addMoreValue() {

    let rowCount = parseInt($('#valuenumber').val());

    var nextRow = (rowCount + 1)
    let rowfyable = $('#templatesValueTable').closest('table');


    var rowId = "tableRow_" + tableno + "_" + rowCount;
    let lastRow = $("#templatesValueTable tbody tr").last().clone()//.append('<td class="remove"><svg width="24" height="24" fill="#aa1818" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m3.707-11.707a.999.999 0 0 0-1.414 0L10 8.586 7.707 6.293a.999.999 0 1 0-1.414 1.414L8.586 10l-2.293 2.293a.999.999 0 1 0 1.414 1.414L10 11.414l2.293 2.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l2.293-2.293a.999.999 0 0 0 0-1.414"></path></svg></td>');

    var newHtmlText1 = '<tr id="' + rowId + '">' + lastRow.html().replace("templateValue_" + tableno + "_" + rowCount, "templateValue_" + nextRow) + '</tr>';
    var newHtmlText2 = newHtmlText1.replace("OpeningBrackets_" + tableno + "_" + rowCount, "OpeningBrackets_" + tableno + "_" + nextRow);
    var newHtmlText3 = newHtmlText2.replace("ruleValue_" + tableno + "_" + rowCount, "ruleValue_" + tableno + "_" + nextRow);
    var newHtmlText4 = newHtmlText3.replace("condition_" + tableno + "_" + rowCount, "condition_" + tableno + "_" + nextRow);
    var newHtmlText5 = newHtmlText4.replace("operator_" + tableno + "_" + rowCount, "operator_" + tableno + "_" + nextRow);
    var newHtmlText6 = newHtmlText5.replace("getallowedActions(" + tableno + "," + rowCount + ")", "getallowedActions(" + tableno + "," + nextRow + ")");
    var newHtmlText7 = newHtmlText6.replace("remove_" + tableno + "_" + rowCount, "remove_" + tableno + "_" + nextRow);
    var newHtmlText8 = newHtmlText7.replace("browt_ChooseField_" + tableno + "_" + rowCount, "browt_ChooseField_" + tableno + "_" + nextRow);
    var newHtmlText9 = newHtmlText8.replace("ChooseField_" + tableno + "_" + rowCount, "ChooseField_" + tableno + "_" + nextRow);
    var newHtmlText10 = newHtmlText9.replace("fieldFor_" + tableno + "_" + rowCount, "fieldFor_" + tableno + "_" + nextRow);
    var newHtmlText11 = newHtmlText10.replace("browt_condition_" + tableno + "_" + rowCount, "browt_condition_" + tableno + "_" + nextRow);
    var newHtmlText12 = newHtmlText11.replace("CartAndStatement_" + tableno + "_" + rowCount, "CartAndStatement_" + tableno + "_" + nextRow);
    var newHtmlText13 = newHtmlText12.replace("StatementCart_" + tableno + "_" + rowCount, "StatementCart_" + tableno + "_" + nextRow);
    var newHtmlText14 = newHtmlText13.replace("browt_Conditions_" + tableno + "_" + rowCount, "browt_Conditions_" + tableno + "_" + nextRow);
    var newHtmlText15 = newHtmlText14.replace("browt_Conditions_" + tableno + "_" + rowCount, "browt_Conditions_" + tableno + "_" + nextRow);
    var newHtmlText16 = newHtmlText15.replace("ClosingBrackets_" + tableno + "_" + rowCount, "ClosingBrackets_" + tableno + "_" + nextRow);
    var newHtmlText17 = newHtmlText16.replace("changeCartStatementObjectField('" + rowCount + "')", "changeCartStatementObjectField('" + nextRow + "')");
    var newHtmlText18 = newHtmlText17.replace("condition_" + tableno + "_" + rowCount, "condition_" + tableno + "_" + nextRow);
    var newHtmlText19 = newHtmlText18.replace("allFunctions_" + tableno + "_" + rowCount, "allFunctions_" + tableno + "_" + nextRow);
    var newHtmlText20 = newHtmlText19.replace("FunctionClsDrop_" + tableno + "_" + rowCount, "FunctionClsDrop_" + tableno + "_" + nextRow);
    var newHtmlText21 = newHtmlText20.replace("ChooseFieldCls_" + tableno + "_" + rowCount, "ChooseFieldCls_" + tableno + "_" + nextRow);
    var newHtmlText22 = newHtmlText21.replace("browt_AllFunction_" + tableno + "_" + rowCount, "browt_AllFunction_" + tableno + "_" + nextRow);
    var newHtmlText23 = newHtmlText22.replace("browt_AllFunction_" + tableno + "_" + rowCount, "browt_AllFunction_" + tableno + "_" + nextRow);
    var newHtmlText24 = newHtmlText23.replace("tableRow_" + tableno + "_" + rowCount, "tableRow_" + tableno + "_" + nextRow);
    var newHtmlText25 = newHtmlText24.replace("removeRuleRow(" + tableno + "," + rowCount + ")", "removeRuleRow(" + tableno + "," + nextRow + ")");
    var newHtmlText26 = newHtmlText25.replace("functionParameter_" + tableno + "_" + rowCount, "functionParameter_" + tableno + "_" + nextRow);




    var newHtmlText27 = newHtmlText26.replace("display: none;", "");
    var newHtmlText28 = newHtmlText27.replace("getallowedActions(" + tableno + "," + rowCount + ")", "getallowedActions(" + tableno + "," + nextRow + ")");
    $("#tableaddRecorder_" + tableno + " tbody").append(newHtmlText28);
    //$("#tableaddRecorder_"+tableno).parents('table tr:last').after(newHtmlText27);


    document.getElementById("totalRules_" + tableno).value = nextRow + 1;

    //$("#StatementCart_" + nextRow).val(''); 
    $("#ChooseField_" + tableno + "_" + nextRow).val('');
    $("#ruleValue_" + tableno + "_" + nextRow).val('');
    $("#condition_" + tableno + "_" + nextRow).val('');
    $("#operator_" + tableno + "_" + nextRow).val('');
    $(".FunctionClsDrop_" + tableno + "_" + nextRow).hide();
    $(".ChooseFieldCls_" + tableno + "_" + nextRow).show();

    $("#remove_" + tableno + "_" + nextRow).show();
    changeCustomObjectFieldaddMore(nextRow, tableno);

}

function addMoreTemplateRuleDataValue() {
    let rowCount = parseInt($('#totalDataRows').val());
//    alert("rowCount - "+rowCount);
    let currRow = 1;
    if (parseInt(rowCount) >= 1) {
        currRow = rowCount - 1;
    }
   // alert("currRow - "+currRow);
    prevClassName = ".rowval_" + currRow;
    var nextRow = (currRow + 1);
    var rowId = "templateRuleDataRow_" + currRow;
    var newRowId = "templateRuleDataRow_" + nextRow;
    let lastRow = $("#templatesValueTable tbody tr").last().clone();
    var newHtmlText = '<tr id="' + newRowId + '">' + lastRow.html() + '</tr>';
    newHtmlText = newHtmlText.replace('class="rmv hide"', 'class="rmv"');
    $(prevClassName).each(function () {
        newHtmlText = newHtmlText.replace('rowval_' + currRow, 'rowval_' + nextRow);
    });
    newHtmlText = newHtmlText.replace('templateRuleDataRowRemove(' + currRow + ')', 'templateRuleDataRowRemove(' + nextRow + ')');
    newHtmlText = newHtmlText.replace('serialNumber_' + currRow, 'serialNumber_' + nextRow);
    $("#templatesValueTable tbody").append(newHtmlText);
    $('#totalDataRows').val(nextRow);
    $('#serialNumber_'+nextRow).text(nextRow+1);

    var className = ".rowval_" + nextRow;
    $(className).each(function () {
        $(this).val('');
    });

    var totalDataRow = parseInt(nextRow)+1;
  //  alert("totalDataRow"+ totalDataRow);
    $('#totalDataRows').val(totalDataRow);
}

function templateRuleDataRowRemove(rowNum) {
    if (confirm("Are you sure to remove this row")) {
        $("#templateRuleDataRow_" + rowNum).remove();
    }
}

function getruleType() {
    var ruleTypeSelected = $('#ruleType').val();
    if (ruleTypeSelected == 'NORMAL' || ruleTypeSelected == 'FACT_NORMAL') {
        $('.templateTypeOption').hide();
    }
    if (ruleTypeSelected == 'TEMPLATE' || ruleTypeSelected == 'FACT_TEMPLATE') {
        $('.templateTypeOption').show();
    }

}


function removeRuleTableThen(tablenumber) {
    if (confirm('Are you sure to remove this record')) {
        $('#tableaddRecorderThen_' + tablenumber).remove();

    }
}

function getDataTypeThen(tablenum, obj) {

    var tableno = tablenum; //parseInt($("#indexValue").val()-1);
    var chooseField = '';
    if ($('#ChoosenFieldThen_' + tableno + '_' + obj).val()) {
        chooseField = $('#ChoosenFieldThen_' + tableno + '_' + obj).val();
    }
    var fieldFor = '';
    fieldFor = $('#fieldForThen_' + tableno).val()
    var nameSpace = $('#customObjects').val();
    if (chooseField != '') {
        if (fieldFor == 'FieldsThen' || fieldFor == 'Function Call') {
            var dataType = PClevel.jupiterMetaData.result.field[chooseField].datatype;
            $('#dataTypeOfFieldThen_' + tableno + '_' + obj).val(dataType);

        } else {
            $.ajax({
                method: "GET",
                url: '/jupiter/get-jupiter-allowedActions?field=' + chooseField + '&fieldFor=' + fieldFor + '&nameSpace=' + nameSpace,
            }).done(function (res) {
                console.log("============ ajax Response ==========");
                console.log(res)
                console.log(res.allowedActionArr)
                console.log(res.dataType)
                $('#dataTypeOfFieldThen_' + tableno + '_' + obj).val(res.dataType);
            });
        }
    }
}

function removeRuleRowThen(tablenumber, rownumber) {
    var id = '#nonCustmOprFieldForThen_' + tablenumber + '_' + rownumber;
    if (confirm('Are you sure to remove this record')) {
        $('#nonCustmOprFieldForThen_' + tablenumber + '_' + rownumber).remove();

    }
}

function removeCustomCode(tablenumber) {
    if (confirm('Are you sure to remove this record')) {
        $('#tableaddRecorder_' + tablenumber).remove();
    }
}

function isButtonRequired(tabSelected) {

    if (tabSelected == 'tab-detail') {
        $('#buttonDiv').show();
    }

    if (tabSelected == 'tab-values') {
        $('#buttonDiv').show();
    }

    if (tabSelected == 'tab-rawCode') {
        $('#buttonDiv').hide();
    }
    if (tabSelected == 'tab-versionHistory') {
        $('#buttonDiv').hide();
    }

}


// -- New Functio added from here DATE20220601--- //

//--- custom Object Child Function Start from Here ---- //
function changeFieldLevelsOptions() {
    var currentTableSuffix = $("#currentTable_suffix").val();
    //alert('currentTableSuffix'+currentTableSuffix);
    addFieldOrFunctionFormFieldLevel(currentTableSuffix);
    // var tableno = $('#currentTableNo').val();
    // if (valueSelected == 'Function Call') {
    //     $("#tableHeadRow_" + tableno).attr('colspan', 7);
    //     $("#tableBottomRow_" + tableno).attr('colspan', 7);
    // } else {
    //     $("#tableHeadRow_" + tableno).attr('colspan', 6);
    //     $("#tableBottomRow_" + tableno).attr('colspan', 6);
    //     if (ruleType == 'TEMPLATE') {
    //         $("#tableHeadRow_" + tableno).attr('colspan', 7);
    //         $("#tableBottomRow_" + tableno).attr('colspan', 7);
    //     }
    // }

    


}

function addFieldOrFunctionFormFieldLevel(currentTableSuffix) {
    $('.modalbtnFieldLevel').click();
    //var tablenum=parseInt($('#indexValue').val()-1)
    var tablenum = parseInt($('#currentTableNo').val())
    //alert('TABLE NUM'+tablenum)
    //alert('currentTableSuffix'+currentTableSuffix)
    var optionSelected = $('#selectOptnFieldLevel').val();
    var currentTableSuffix = '';
    if (typeof $('#currentTable_suffix').val() != 'undefined') {
        currentTableSuffix = $('#currentTable_suffix').val();
    }

    if (optionSelected == 'Custom Objects') {
        var FieldModalPopUpValue = $('#cusObjectsModelFieldPopup').val();
        var tableDataHtml = createInnertableCustomObject(tablenum, currentTableSuffix);
        appendNewTableForCustomObject(tablenum, tableDataHtml, FieldModalPopUpValue, currentTableSuffix);

    } else {
        if (optionSelected == 'Custom Code') {
            openCustomCodeFieldLevel(currentTableSuffix);
        } else {
            if (optionSelected == 'Fields') {
                $('.alldataBody_' + currentTableSuffix).show();

                addMoreRuleFieldLevelFirst(tablenum,currentTableSuffix);
            }
            if (optionSelected == 'Function Call') {
                addMoreRuleForFunctionFieldLevel(tablenum,currentTableSuffix);
            }
            if (optionSelected == 'Custom Operations') {
                addMoreRuleForCustomOperationsFieldLevel(tablenum,currentTableSuffix);
            }

            $('#tableRow_' + currentTableSuffix + '_0').show();
            $('#addMoreRulebutton_' + currentTableSuffix).show();
            $('#tableRowChild_' + currentTableSuffix + '_0').show();
            $('#addrulebuttonChild_' + currentTableSuffix).show();
            $('#remove_' + currentTableSuffix + '_0').hide();
        }
    }

    $('#selectOptnFieldLevel').val('');

    $(".CustomObjectForSpecificField").hide();
    $("#cusObjectsModelFieldPopup").val('');
    $(".CustomOperationForSpecificField").hide();
    $("#cusOperationModelFieldPopup").val('');
    $('.templateVariableSymbolData_' + currentTableSuffix + '_0').hide();
    setTemplateTypeConditions();
}

function createInnertableCustomObject(tablenum,currentTableSuffix) {

    currentTableSuffix = (currentTableSuffix)?currentTableSuffix:tablenum;
    var tableno = tablenum;
    var parent = ($('#fieldFor_' + currentTableSuffix + '_0')).val();
    var idCount = 0;
    var sepHtml = '';
    var childTableNo = $('#ChildTableNumOfMasterTableNo_' + currentTableSuffix).val()
    childTableNo = parseInt(childTableNo) + 1;
    var tableIdSufix = currentTableSuffix + "_" + childTableNo;
    tableIdSufixFunc = "'" + tableIdSufix + "'";
    var childRowId=tableIdSufix+'_'+idCount;
    var childRowIdFunc="'"+childRowId+"'";

    sepHtml += '<table class="table table-vcenter table-mobile-md card-table" id="tableaddRecorderChild_' + tableIdSufix + '" style="border: 1px solid #eee;width:100%">';
    sepHtml += '<thead>';
    sepHtml += '<tr class="tableHead_' + tableIdSufix + '">';
    
    sepHtml += '<th id="tableHeadRow_' + tableIdSufix + '" class="tblHeadRow" colspan="6" width="95%">';
    
    sepHtml += '<span class="FieldsHeading_' + tableIdSufix + ' hide">';
    sepHtml += '<b>Fields</b>';
    sepHtml += '</span>';

    sepHtml += '<span class="FunctionsHeading_' + tableIdSufix + ' hide">';
    sepHtml += '<b>Functions</b>';
    sepHtml += '</span>';

    sepHtml += '<span id="thheadSecondary_' + tableIdSufix + '_0" data-bs-toggle="modal" data-bs-target="#modal-ForFieldsLevel" class="btn--primary links" type="button" onclick="fieldModelPopUpInbetweenNewRecursive(' + tableIdSufixFunc + ',' + tableno + ',' + childTableNo + ');"></span>';

    sepHtml += '<input type="hidden" id="parent_' + tableIdSufix + '" name="parent_' + tableIdSufix + '[]" value="' + parent + '">';
    sepHtml += '<input type="hidden" id="rootpath_' + tableIdSufix + '" name="rootpath_' + tableIdSufix + '[]" value="">';
    sepHtml += '<input type="hidden" id="tableIdSufix_' + tableIdSufix + '" name="tableIdSufix_' + tableIdSufix + '[]" value="'+tableIdSufix+'">';
    sepHtml += '<input type="hidden" id="fieldForWhenRuleChild_' + tableIdSufix + '" name="fieldForWhenRuleChild_' + currentTableSuffix + '[]" value=""/>';
    sepHtml += '<input type="hidden" id="whenChildTableIds_' + tableIdSufix + '" name="whenChildTableIds_' + currentTableSuffix + '[]" value="'+childTableNo+'"/>';
    sepHtml += '<input type="hidden" id="tableType_' + tableIdSufix + '" name="tableType[]" value="" />';
    sepHtml += '<input type="hidden" id="totalRulesChild_' + tableIdSufix + '" name="totalRulesChild_'+tableIdSufix+'[]" value="0"/>';
    sepHtml += '<input type="hidden" id="totalCustCodeChild_' + tableIdSufix + '" name="totalCustCodeChild_'+tableIdSufix+'[]" value="0"/>';

    sepHtml += '</th>';
    sepHtml += '<th width="5%"><span id="remove_subtable_' + tableIdSufix + '" onclick="removeRuleChildTable(' + tableIdSufixFunc + ')"><svg width="24" height="24" fill="#aa1818" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m3.707-11.707a.999.999 0 0 0-1.414 0L10 8.586 7.707 6.293a.999.999 0 1 0-1.414 1.414L8.586 10l-2.293 2.293a.999.999 0 1 0 1.414 1.414L10 11.414l2.293 2.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l2.293-2.293a.999.999 0 0 0 0-1.414"> </path></svg></span></th>';

    sepHtml += '</tr>';
    sepHtml += '</thead>';
    sepHtml += '<tbody>';

    sepHtml += '<tr class="cusOpr_' + tableIdSufix + ' hide">';
    sepHtml += '<td class="tblFullRow" colspan="7">';
    sepHtml += '<div class="row">';
    sepHtml += '<div class="col-lg-2">';
    sepHtml += '<label align="center" for="" style="margin-top: 10px;">';
    sepHtml += '<b>Custom Operation</b></label>';
    sepHtml += '</div>';
    sepHtml += '<div class="col-lg-2" style="margin-bottom:10px;">';
    sepHtml += '<input readonly type="text" class="form-control" id="cusOperation_' + tableIdSufix + '" name="customOperation_' + tableIdSufix + '[]">';

    sepHtml += '</div>';
    sepHtml += '</td>';

    sepHtml += '<tr class="cusOprAppliedOnField_' + tableIdSufix + ' hide">';
    sepHtml += '<td class="tblFullRow" colspan="7">';
    sepHtml += '<label align="center" for="" style="margin:5px 0px;color:#e16b08">';
    sepHtml += '<b>On Field:</b></label>';
    sepHtml += '<div class="row">';
    sepHtml += '<div class="col-lg-2">';
    sepHtml += '<label align="center" for="" style="margin-top: 10px;">';
    sepHtml += '<b>Field Name</b></label>';
    sepHtml += '</div>';

    sepHtml += '<div class="col-lg-4">';
    sepHtml += '<input style="width:250px;" list="browt_customOprFieldName_' + tableIdSufix + '" id="cusOperationAppliedOnField_' + tableIdSufix + '" name="cusOperationAppliedOnField_' + tableIdSufix + '[]" class="form-control required">';
    sepHtml += '<datalist id="browt_customOprFieldName_' + tableIdSufix + '">';
    sepHtml += '</datalist>';
    sepHtml += '</div>';
    sepHtml += '</div>';
    sepHtml += '</td>';
    sepHtml += '</tr>';

    sepHtml += '<tr class="cusOpr_' + tableIdSufix + ' hide">';
    sepHtml += '<td class="tblFullRow" colspan="7" style="background: #eee;">';
    sepHtml += '<label align="center" for="" style="margin:10px 0px; ">';
    sepHtml += '<b>Condition</b>';
    sepHtml += '</label>';
    sepHtml += '</td>';
    sepHtml += '</tr>';

    
    sepHtml += '<tr id="tableRowChild_' + tableIdSufix + '_' + idCount + '" class="hide">';

    sepHtml += '<td>';
    sepHtml += '<select name="OpeningBrackets_' + tableIdSufix + '[]" id="OpeningBrackets_' + tableIdSufix + '_' + idCount + '" class="form-control form-select">';
    sepHtml += '<option value=""> Opening Bracket </option>';
    sepHtml += '<option value="Yes">(</option>';
    sepHtml += '</select>';
    sepHtml += '</td>';

    sepHtml += '<td class="ChooseFieldCls_' + tableIdSufix + '_' + idCount + '">';
    sepHtml += '<input list="browt_ChooseField_' + tableIdSufix + '_' + idCount + '" name="ChooseField_' + tableIdSufix + '[]" id="ChooseField_' + tableIdSufix + '_' + idCount + '" class="form-control" onchange="getallowedActionsChild(' + tableIdSufixFunc + ',' + idCount + ')" placeholder="Field">';
    sepHtml += '<datalist id="browt_ChooseField_' + tableIdSufix + '_' + idCount + '">';
    sepHtml += '</datalist>';
    sepHtml += '<input type="hidden" id="fieldFor_' + tableIdSufix + '_' + idCount + '" name="fieldForChild_' + idCount + '" value=""/>';
    sepHtml += '<input type="hidden" id="dataTypeOfField_' + tableIdSufix + '_' + idCount + '" name="dataTypeOfFieldChild_' + tableIdSufix + '[]" value="" /> ';

    sepHtml += '</td>';

    sepHtml += '<td class="FunctionClsDrop_' + tableIdSufix + '_' + idCount + ' hide">';
    sepHtml += '<input list="browt_AllFunction_' + tableIdSufix + '_' + idCount + '" name="allFunctionsChild_' + tableIdSufix + '[]" id="allFunctions_' + tableIdSufix + '_' + idCount + '" class="form-control" onchange="getallowedActionsChild(' + tableIdSufixFunc + ',' + idCount + ')" placeholder="Function">';
    sepHtml += '<datalist id="browt_AllFunction_' + tableIdSufix + '_' + idCount + '">'
    sepHtml += '</datalist>'
    sepHtml += '</td>';


    sepHtml += '<td class="FunctionClsDrop_' + tableIdSufix + '_' + idCount + ' hide">';
    sepHtml += '<input type="text" class="form-control" name="functionParameter_' + tableIdSufix + '[]" placeholder="Parameter" value="" id="functionParameter_' + tableIdSufix + '_' + idCount + '">';
    sepHtml += '</td> ';


    sepHtml += '<td>';

    sepHtml += '<input list="browt_condition_' + tableIdSufix + '_' + idCount + '" name="condition_' + tableIdSufix + '[]" id="condition_' + tableIdSufix + '_' + idCount + '" class="form-control" placeholder="Condition">';
    sepHtml += '<datalist id="browt_condition_' + tableIdSufix + '_' + idCount + '">';
    sepHtml += '</datalist>';

    sepHtml += '</td>';

    sepHtml += '<td class="templateTypeOption hide">';
    sepHtml += '<select name="templateDropDown_' + tableIdSufix + '[]" id="templateDropDown_' + tableIdSufix + '_' + idCount + '" class="form-control form-select templateDropDown" onchange="setvalueForTemplateChild(' +childRowIdFunc+ ');">';
    sepHtml += '<option value="Value">Value</option>';
    sepHtml += '<option value="Variable">Variable</option>';
    sepHtml += '</select>';
    sepHtml += '</td>';

    //sepHtml += '<td><input type="text" readonly class="templateVariableSymbolData_'+tableIdSufix+'_'+idCount+' hide form-control" name="templateVariableSymbol_'+tableIdSufix+'[]" id="templateVariableSymbol_'+tableIdSufix+'_'+idCount+'" value="%%"/></td>';



    sepHtml += '<td>';
    sepHtml += '<span style="display: flex;">';
    sepHtml += '<span style="margin-top: 12px;" class="templateVariableSymbolData_'+tableIdSufix+'_'+idCount+' hide" name="templateVariableSymbol_'+tableIdSufix+'[]" id="templateVariableSymbol_'+tableIdSufix+'_'+idCount+'">%%</span>';
    sepHtml += '<input type="text" class="form-control rulevalue_'+tableIdSufix+' required" name="rulevalue_' + tableIdSufix + '[]" placeholder="Value" value="" id="ruleValue_' + tableIdSufix + '_' + idCount + '">';
    sepHtml += '</span>';
    sepHtml += '</td> ';

    sepHtml += '<td>';
    sepHtml += '<select name="ClosingBrackets_' + tableIdSufix + '[]" id="ClosingBrackets_' + tableIdSufix + '_' + idCount + '" class="form-control form-select">';
    sepHtml += '<option value=""> Closing Bracket </option>';
    sepHtml += '<option value="Yes">)</option>';
    sepHtml += '</select>';
    sepHtml += '</td>';

    sepHtml += '<td>';
    sepHtml += '<select name="Operator_' + tableIdSufix + '[]"';
    sepHtml += 'id="operator_' + tableIdSufix + '_' + idCount + '" class="form-control form-select">';
    sepHtml += '<option value=""> Operator </option>';
    sepHtml += '<option value="&&">AND</option>';
    sepHtml += '<option value="||">OR</option>';
    sepHtml += '<option value="&& !">AND NOT</option>';
    sepHtml += '<option value="|| !">OR NOT</option>';
    sepHtml += '</select>';
    sepHtml += '</td>';



    sepHtml += '<td class="remove">';
    sepHtml += '<span id="remove_' + tableIdSufix + '_' + idCount + '" onclick="removeRuleChildRow('+childRowIdFunc+')">';
    sepHtml += '<svg width="24" height="24" fill="#aa1818" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m3.707-11.707a.999.999 0 0 0-1.414 0L10 8.586 7.707 6.293a.999.999 0 1 0-1.414 1.414L8.586 10l-2.293 2.293a.999.999 0 1 0 1.414 1.414L10 11.414l2.293 2.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l2.293-2.293a.999.999 0 0 0 0-1.414"></path></svg>';
    sepHtml += '</span>';

    sepHtml += '<span id="addrulebutton_' + tableIdSufix + '_' + idCount + '" value="" class="btn--primary" type="button" onclick="addMoreRuleForTableNumChild(' + tableIdSufixFunc + ')">';
    sepHtml += '<svg fill="#206bc4" width="24" height="24" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true">';
    sepHtml += '<path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M8.996 8.996V7.008c.001-.043 0-.054.004-.097.044-.449.423-.845.879-.9.094-.011.115-.007.145-.007.043.002.054.002.097.007.448.054.834.442.879.9.004.043.003.054.004.097v1.988h1.992l.048.001c.49.035.918.441.954.93.039.545-.424 1.063-1.002 1.077h-1.992V13a1.04 1.04 0 0 1-.648.939c-.584.221-1.327-.217-1.359-.891L8.996 13v-1.996H7.004c-.511-.012-.966-.435-1.002-.931-.038-.53.396-1.049.954-1.076l.048-.001h1.992z"></path>';
    sepHtml += '</svg>';
    sepHtml += '</span>';

    sepHtml += '</td>';
    sepHtml += '</tr>';

    sepHtml += '</tbody>';

    sepHtml += '<tfoot>';
    /*sepHtml += '<tr id="addrulebuttonChild_' + tableIdSufix + '" class="hide">';
    sepHtml += '<td id="tableBottomRow_' + tableIdSufix + '" colspan="6"></td>';
    sepHtml += '<td>';
    sepHtml += '<div class="exchangeorderbtnWhenAdd">';
    sepHtml += '<span id="addrulebutton_' + tableIdSufix + '" value="" class="btn--primary" data-bs-toggle="modal" data-bs-target="#modal-AddFunOrField" type="button" onclick="addMoreRuleForTableNumChild(' + tableIdSufixFunc + ')">';
    sepHtml += '<svg fill="#206bc4" width="24" height="24" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true">';
    sepHtml += '<path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M8.996 8.996V7.008c.001-.043 0-.054.004-.097.044-.449.423-.845.879-.9.094-.011.115-.007.145-.007.043.002.054.002.097.007.448.054.834.442.879.9.004.043.003.054.004.097v1.988h1.992l.048.001c.49.035.918.441.954.93.039.545-.424 1.063-1.002 1.077h-1.992V13a1.04 1.04 0 0 1-.648.939c-.584.221-1.327-.217-1.359-.891L8.996 13v-1.996H7.004c-.511-.012-.966-.435-1.002-.931-.038-.53.396-1.049.954-1.076l.048-.001h1.992z"></path>';
    sepHtml += '</svg>';
    sepHtml += '</span>';
    
    sepHtml += '</div>';
    sepHtml += '</td>';
    sepHtml += '</tr>';
    */

sepHtml += '<tr class="cusOprAction_' + tableIdSufix + ' hide">'
sepHtml += '<td class="tblFullRow" colspan="7">';
sepHtml += '<div class="col-md-2" style="margin:5px 0px; color:#e16b08">';
sepHtml += '<label align="left" class="form-label no-padding-right" >';
sepHtml += '<b>Logic:</b>';
sepHtml += '</label>';
sepHtml += '</div>';
sepHtml += '<div class="row">';
sepHtml += '<div class="cusOprAction_' + tableIdSufix + ' col-md-2 hide" style="margin-bottom:10px;margin-left:10px;">';
sepHtml += '<label align="center" class="form-label no-padding-right" >';
sepHtml += '<b>Custom Operators</b></label>';
sepHtml += '<div class="input-group input-group-flat">';
sepHtml += '<input list="browt_customOperationsAction_' + tableIdSufix + '" id="cusOperationAction_' + tableIdSufix + '" name="customOperationAction_' + tableIdSufix + '[]" class="form-control required" style="margin-bottom:20px;">';
sepHtml += '<datalist id="browt_customOperationsAction_' + tableIdSufix + '">';
sepHtml += '</datalist>';
sepHtml += '</div>';
sepHtml += '</div>';

sepHtml += '<div class="templateTypeOption hide col-md-2" style="margin-bottom:10px;margin-left:10px;">';
sepHtml += '<label align="center" class="form-label no-padding-right" >';
sepHtml += '<b>Type</b></label>';
sepHtml += '<div class="input-group input-group-flat">';
sepHtml += '<select name="templateDropDownCusOpr_' + tableIdSufix + '[]" id="templateDropDownCusOpr_' + tableIdSufix +'" class="form-control form-select templateDropDown" onchange="setvalueForTemplateCusOpr(' + tableIdSufix + ');">';
sepHtml += '<option value="Value">Value</option>';
sepHtml += '<option value="Variable">Variable</option>';
sepHtml += '</select>';
sepHtml += '</div>';
sepHtml += '</div>';

sepHtml += '<div class="cusOprActionValue_' + tableIdSufix + ' col-md-2 hide" style="margin-bottom:10px;margin-left:10px;">';
sepHtml += '<label align="center" class="form-label no-padding-right" >';
sepHtml += '<b>Custom Operation Value</b></label>';
sepHtml += '<div class="input-group input-group-flat">';
sepHtml += '<span style="margin-top: 12px;" class="templateVariableSymbolDataCusOpr_'+tableIdSufix+' hide" name="templateVariableSymbolCusOpr_'+tableIdSufix+'[]" id="templateVariableSymbolCusOpr_'+tableIdSufix+'">%%</span>';
sepHtml += '<input type="text" class="form-control" id="cusOperationActionValue_' + tableIdSufix + '" name="customOperationActionValue_' + tableIdSufix + '[]" value="" style="margin-bottom:20px;">';
sepHtml += '</div>';
sepHtml += '</div>';
sepHtml += '</div>';

sepHtml += '<input type="hidden" id="ChildTableNumOfMasterTableNo_' + tableIdSufix + '" name="ChildTableNumOfMasterTableNo[]" value="0"/>';
sepHtml += '</td>';
sepHtml += '</tr>';

// child table append here
sepHtml += '<tr class="hide" id="customObjectChildTable_' + tableIdSufix + '"><td id="customObjectSubTable_' + tableIdSufix + '" colspan="9" width="100%"></td></tr>';

sepHtml += '<tr class="customCodeForFieldLevel_' + tableIdSufix + ' col-md-4 hide" >';
sepHtml += '<td class="tblFullRow" colspan="7">';
sepHtml += '<h5>Custom Code</h5>';
sepHtml += '<textarea  style="width:100%; height:50px" class="form-control" id="customCodeFieldLevel_' + tableIdSufix + '" name="customCodeFieldLevel_' + tableIdSufix + '" value=""></textarea>';
sepHtml += '</td>';
sepHtml += '</tr>';
sepHtml += '</tfoot>';

sepHtml += '</table>';
return (sepHtml);
}

function appendNewTableForCustomObject(tablenum, tableDataHtml, fieldModelPopUpHeading, currentTableSuffix) {
    var parent;
    var childTablenum = parseInt($("#ChildTableNumOfMasterTableNo_" + currentTableSuffix).val());
    var heading = 'THERE IS ' + fieldModelPopUpHeading + ' WITH';
    var childTablenumForHeading = childTablenum + 1
    if(currentTableSuffix !=1){
        $("#customObjectSubTable_" + currentTableSuffix).append(tableDataHtml);
        parent = $('#rootpath_' + currentTableSuffix).val(); 
    }else{
      $("#customObjectSubTable_" +tablenum).append(tableDataHtml); 
       parent = $('#parent_' + tablenum + '_' + childTablenumForHeading).val(); 
    }
    $('#thheadSecondary_' + currentTableSuffix + '_' + childTablenumForHeading + '_0').text(heading);
    $('#fieldForWhenRuleChild_'+ currentTableSuffix + '_' + childTablenumForHeading).val(fieldModelPopUpHeading);
    $('#ChildTableNumOfMasterTableNo_' + currentTableSuffix).val(childTablenum + 1)
    $("#remove_" + currentTableSuffix + "_" + childTablenumForHeading).hide();
    var child = fieldModelPopUpHeading;
    var root = parent + '.' + child;   
    $('#rootpath_' +currentTableSuffix+'_' + childTablenumForHeading).val(root);
    $('#parent_' +currentTableSuffix+'_' + childTablenumForHeading).val(parent);  
    var childTableNumber = parseInt(childTablenumForHeading);
     if(currentTableSuffix!=''){
    $("#customObjectChildTable_" + currentTableSuffix).show();
     }else{
        $("#customObjectChildTable_" +tablenum).show(); 
    }

    setValueForChildCustomObject(currentTableSuffix, childTableNumber, root);
    setTemplateTypeConditions();
}

function setValueForChildCustomObject(tablenum, childTableNumber, root) {

    var rootPath = [];
    if(root){
        rootPath = root.split('.');
    }
    console.log('rootPath in setValueForChildCustomObject:',rootPath);
    var dataSet = PClevel.jupiterMetaData.result;
   
    if(rootPath.length){
        for(i=0; i<rootPath.length; i++){
            dataSet = dataSet.field[rootPath[i]]
           
        }
    }

    
    var allChooseFilelds;
    var allmethodLists;
   if(typeof dataSet.fieldList!='undefined'){
    allChooseFilelds = dataSet.fieldList
   }

   if(typeof dataSet.methodsList!='undefined'){
        allmethodLists = dataSet.methodsList
       }

    console.log('ALL CHILD FIELDS ARE:', allChooseFilelds);
    console.log('ALL CHILD METHODS ARE:', allmethodLists);

    $('#browt_ChooseField_' + tablenum + '_' + childTableNumber + '_0').empty();
    $('#browt_ChooseField_' + tablenum + '_' + childTableNumber + '_0').append("<option value=''>");
    $.each(allChooseFilelds, function (i, item) {

        $('#browt_ChooseField_' + tablenum + '_' + childTableNumber + '_0').append('<option value="' + item + '">' + item + '</option>');
    });

    $('#browt_AllFunction_' + tablenum + '_' + childTableNumber + '_0').empty();
        $('#browt_AllFunction_' + tablenum + '_' + childTableNumber + '_0').append("<option value=''>");
        $.each(allmethodLists, function (i, item) {
    
            $('#browt_AllFunction_' + tablenum + '_' + childTableNumber + '_0').append('<option value="' + item + '">' + item + '</option>');
        });

}


function openCustomCodeFieldLevel(tableno) {
    var tblarr = tableno.split("_");
    var childTablenum = parseInt($("#totalRules_" + tableno).val());
    if (tblarr.length > 1) {
        var totalRulesChild = parseInt($("#totalRulesChild_" + tableno).val());
        if (totalRulesChild > 1) {
            totalRulesChild = totalRulesChild - 1;
        }
        childTablenum = parseInt($("#totalCustCodeChild_" + tableno).val());
        childTablenum = childTablenum + totalRulesChild;
    }
    var obj = 1;
    if (childTablenum > 0) {
        obj = childTablenum + 1;
    }
    var rowId = "tableRow_" + tableno + "_" + obj;
    if (tblarr.length > 1) {
        rowId = "tableRowChild_" + tableno + "_" + obj;
    }
    var rowIdStr = "'" + rowId + "'";
    sepHtml = '';
    sepHtml += '<tr id="' + rowId + '"><td class="tblFullRow" colspan="7">';
    sepHtml += '<div class="row">';
    sepHtml += '<div class="col-md-12 customCodeForFieldLevel_' + tableno + '">';
    sepHtml += '<div class="col-md-10" style="float:left"><h5>Custom Code</h5></div>';
    sepHtml += '<div class="col-md-2 red bold" style="float:left; text-align:right; padding-right:2%; cursor:pointer" onclick="removeTableRow(' + rowIdStr + ')">X';
    //sepHtml += '<svg width="18" height="18" fill="#aa1818" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m3.707-11.707a.999.999 0 0 0-1.414 0L10 8.586 7.707 6.293a.999.999 0 1 0-1.414 1.414L8.586 10l-2.293 2.293a.999.999 0 1 0 1.414 1.414L10 11.414l2.293 2.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l2.293-2.293a.999.999 0 0 0 0-1.414"></path></svg>';
    sepHtml += '</div>';
    sepHtml += '</div>';

    sepHtml += '<div class="col-md-12">';
    sepHtml += '<input class="hide" type="text" name="ChooseField_' + tableno + '[]" value="custom_code"/>';
    sepHtml += '<textarea  style="width:100%; height:35px" class="form-control" id="customCodeFieldLevel_' + tableno + '_' + obj + '" name="customCodeFieldLevel_' + tableno + '_' + obj + '" value=""></textarea>';
    sepHtml += '</div>';
    sepHtml += '</div>';
    sepHtml += '</div>';
    sepHtml += '</td></tr>';


    if (tblarr.length > 1) {
        $("#tableaddRecorderChild_" + tableno + " tbody").append(sepHtml);
        obj++;
        $("#totalCustCodeChild_" + tableno).val(obj);
    } else {
        $("#tableaddRecorder_" + tableno + " tbody").append(sepHtml);
    }
    //$('.customCodeForFieldLevel_' + tableno).show();
}

//this is the function which is called on add button of model pop up
function addFieldOrFunctionFormFieldLevelNewRecursive() {
    $('.modalbtnFieldLevel').click();
    var tableno = $('#currentTableNo').val();
    var obj=0;
    var parent= $('#fieldFor_' + tableno + '_' + obj).val();
    var valueSelected = $("#selectOptnFieldLevel").val();
    if (optionSelected == 'Fields') {
        addMoreRuleFieldLevel(tableno,parent);
    }
    if (optionSelected == 'Custom Operations') {
        addMoreRuleForCustomOperationsFieldLevel(tableno,parent);;
    }
    if (optionSelected == 'Custom Code') {
        openCustomCodeFieldLevel(tableno,parent);;
    }
    if (optionSelected == 'Custom Objects') {
         var FieldModalPopUpValue=$('#cusObjectsModelFieldPopup').val();
         var tableDataHtml = createInnertableCustomObject(tableno,parent);;
         //console.log('tableDataHtml========',tableDataHtml)
         appendNewTableForCustomObject(tableno,tableDataHtml,FieldModalPopUpValue,parent);
        //openCustomCodeFieldLevel(tablenum);
    }

    if (optionSelected == 'Function Call') {
        $("#tableHeadRow_"+tableno).attr('colspan',8);
        $("#tableBottomRow_"+tableno).attr('colspan',8);
        addMoreRuleForFunctionFieldLevel(tableno,parent);;
    }else{
         $("#tableHeadRow_"+tableno).attr('colspan',8);
         $("#tableBottomRow_"+tableno).attr('colspan',8);
    }

    $('#selectOptnFieldLevel').val('');
    $('.CustomOperationForSpecificField').hide();
    $('.CustomObjectForSpecificField').hide();
    setTemplateTypeConditions();
    
}


function addMoreRuleFieldLevel(tablnum,parent) {
    var tableno = ''
    if (tablnum != '') {
        tableno = parseInt(tablnum);
    } else {
        tableno = parseInt($('#indexValue').val() - 1)
    }
    let rowCount = parseInt($('#totalRules_' + tableno).val());
    if (rowCount > 0) {
        rowCount = rowCount - 1;
    }
    $(".FunctionClsDrop_" + tableno + "_" + rowCount).hide();
    $(".ChooseFieldCls_" + tableno + "_" + rowCount).show();
    changeCustomObjectFieldaddMore(rowCount, tablnum);
    setTemplateTypeConditions();
}

function addMoreRuleForFunctionFieldLevel(tablnum,currentTableSufix) {
    var tableno = ''
    if (tablnum != '') {
        tableno = parseInt(tablnum);
    } else {
        tableno = parseInt($('#indexValue').val() - 1)
    }

    let rowCount = parseInt($('#totalRules_' + tableno).val());
    if (rowCount > 0) {
        rowCount = rowCount - 1;
    }

    if ($('#ChooseField_0' + rowCount).val() == '') {
        alert("Please select a Field Name");
        $('#ChooseField_0' + rowCount).focus();
        $('#ChooseField_0' + rowCount).addClass("err");
        return false;
    } else {
        $('#ChooseField_0' + rowCount).removeClass("err");
    }

    var nextRow = (rowCount + 1)

     //alert(".FunctionClsDrop_" + currentTableSufix+ "_" + rowCount);
    $(".FunctionClsDrop_" + currentTableSufix+ "_" + rowCount).show();
    $(".ChooseFieldCls_"+ currentTableSufix+ "_" + rowCount).hide();


    changeCustomObjectFieldaddMore(rowCount, tableno);

}

function addMoreRuleForCustomOperationsFieldLevelOLD(tableno) {
    var obj = 0//parseInt($("#indexValue").val()-1);
    var tableno = parseInt(tableno);
    var obj = parseInt(obj);

    //console.log('Global variable:', PClevel)
    var selectedCustomOperationFromModel = $('#cusOperationModelFieldPopup').val();
    $('#cusOperation_' + tableno).val(selectedCustomOperationFromModel)
    var fieldJson = '';
    fieldJson = $('#fieldFor_' + tableno + '_0').val()
    console.log('fieldJson==6', fieldJson)
    var customOperationsResult = PClevel.jupiterMetaData.result.field[fieldJson].customKeywords.condition;
    if (customOperationsResult.length > 0) {
        //New Table Then part 
        $('.cusOpr_' + tableno).show();
        $('.cusOprAppliedOnField_' + tableno).show();
        // $('.cusOprActionValue_'tableno).show();
        checkCustomOperationActions(tableno);


    } else {
        alert('Custom Operation Not Applicable')
    }

}

function addMoreRuleForCustomOperationsFieldLevel(tableno,currentTableSuffix) {
    // alert('tableno IN FUN'+tableno)
     //alert('currentTableSuffix IN FUN'+currentTableSuffix);
     
     if(currentTableSuffix!=''){
 
             
             var tableno = currentTableSuffix
             //alert('TABLE NUMBER'+tableno);
             
             var selectedCustomOperationFromModel = $('#cusOperationModelFieldPopup').val();
             $('#cusOperation_' + tableno).val(selectedCustomOperationFromModel)
             var root = '';
             root = $('#rootpath_'+tableno).val()
             //alert('rootPath IN FUN'+root);
 
             var rootPath = [];
                     if(root){
                         rootPath = root.split('.');
                     }
 
             var dataSet = PClevel.jupiterMetaData.result;
                 
             if(rootPath.length){
                 for(i=0; i<rootPath.length; i++){
                     dataSet = dataSet.field[rootPath[i]]
                 
                 }
             }
 
             //alert('Till herer==##');
             console.log('customOperationsResult=====**',dataSet)  
             var allChooseFilelds;
             if(typeof dataSet.fieldList!='undefined'){
                     allChooseFilelds = dataSet.customKeywords.condition;
             }
             
             if (allChooseFilelds.length > 0) {
                 //New Table Then part 
                 $('.cusOpr_' + tableno).show();
                 $('.cusOprAppliedOnField_' + tableno).show();
                 // $('.cusOprActionValue_'tableno).show();
                 checkCustomOperationActionsChild(tableno,dataSet);
                 //checkCustomOperationActions(tableno);
 
 
             } else {
                 alert('Custom Operation Not Applicable')
             }
 
     }else{
             var obj = 0//parseInt($("#indexValue").val()-1);
             var tableno = parseInt(tableno);
             var obj = parseInt(obj);
             var selectedCustomOperationFromModel = $('#cusOperationModelFieldPopup').val();
             $('#cusOperation_' + tableno).val(selectedCustomOperationFromModel)
             var fieldJson = '';
             fieldJson = $('#fieldFor_' + tableno + '_0').val()
 
             var customOperationsResult = PClevel.jupiterMetaData.result.field[fieldJson].customKeywords.condition;
            
             if (customOperationsResult.length > 0) {
                 //New Table Then part 
                 $('.cusOpr_' + tableno).show();
                 $('.cusOprAppliedOnField_' + tableno).show();
                 // $('.cusOprActionValue_'tableno).show();
                 checkCustomOperationActions(tableno);
 
 
             } else {
                 alert('Custom Operation Not Applicable')
             }
      }
 
 }



function addMoreRuleForTableNumChild(tableno) {
    //var tableno = tablnum;
    let rowCount = parseInt($('#totalRulesChild_' + tableno).val());
    let totalCustCodeChild = 0;
    if($("#totalCustCodeChild_" + tableno).val()){
        totalCustCodeChild = parseInt($("#totalCustCodeChild_" + tableno).val());
    }
    
    if (rowCount > 0) {
        rowCount = rowCount - 1;
    }
    
    if ($('#operator_' + tableno + '_' + rowCount).val() == '') {
        alert("Please select an operator");
        $('#operator_' + tableno + '_' + rowCount).focus();
        $('#operator_' + tableno + '_' + rowCount).addClass("err");
        $(".btn-close").click();
        return false;
    } else {
        $('#operator_' + tableno + '_' + rowCount).removeClass("err");
    }
    
    if ($('#ChooseField_0' + rowCount).val() == '') {
        alert("Please select a Field Name");
        $('#ChooseField_0' + rowCount).focus();
        $('#ChooseField_0' + rowCount).addClass("err");
        return false;
    } else {
        $('#ChooseField_0' + rowCount).removeClass("err");
    }
    
    var nextRow = parseInt(rowCount)+totalCustCodeChild+1;
    let rowfyable = $('#tableaddRecorder_' + tableno).closest('table');
    var newRowId="tableRowChild_" + tableno + "_" + nextRow;
    var rowId = "tableRowChild_" + tableno + "_" +rowCount;
    
    var tableChildRowIdNew,tableChildRowIdOld;
    tableChildRowIdNew=tableno + "_" + nextRow;
    tableChildRowIdOld=tableno + "_" + rowCount;
    //let lastRow = $("#tableaddRecorder_" + tableno + " tbody tr").last().clone()//.append('<td class="remove"><svg width="24" height="24" fill="#aa1818" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m3.707-11.707a.999.999 0 0 0-1.414 0L10 8.586 7.707 6.293a.999.999 0 1 0-1.414 1.414L8.586 10l-2.293 2.293a.999.999 0 1 0 1.414 1.414L10 11.414l2.293 2.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l2.293-2.293a.999.999 0 0 0 0-1.414"></path></svg></td>');
    //.closest('.tr_clone')
    let lastRow = $("#" + rowId).clone();
    console.log('lastRow=====', lastRow);
    var newHtmlText1 = '<tr id="' + newRowId + '">' + lastRow.html().replace("ChooseField_" + tableno + "_" + rowCount, "ChooseField_" + tableno + "_" + nextRow) + '</tr>';
    var newHtmlText2 = newHtmlText1.replace("OpeningBrackets_" + tableno + "_" + rowCount, "OpeningBrackets_" + tableno + "_" + nextRow);
    var newHtmlText3 = newHtmlText2.replace("ruleValue_" + tableno + "_" + rowCount, "ruleValue_" + tableno + "_" + nextRow);
    var newHtmlText4 = newHtmlText3.replace("condition_" + tableno + "_" + rowCount, "condition_" + tableno + "_" + nextRow);
    var newHtmlText5 = newHtmlText4.replace("operator_" + tableno + "_" + rowCount, "operator_" + tableno + "_" + nextRow);
    //var newHtmlText6 = newHtmlText5.replace("getallowedActionsChild('" + tableno + "','" + rowCount + "')", "getallowedActionsChild('" + tableno + "','" + nextRow + "')");
    var newHtmlText7 = newHtmlText5.replace("remove_" + tableno + "_" + rowCount, "remove_" + tableno + "_" + nextRow);
    var newHtmlText7 = newHtmlText7.replace("addrulebutton_" + tableno + "_" + rowCount, "addrulebutton_" + tableno + "_" + nextRow);
    
    var newHtmlText8 = newHtmlText7.replace("browt_ChooseField_" + tableno + "_" + rowCount, "browt_ChooseField_" + tableno + "_" + nextRow);
    var newHtmlText9 = newHtmlText8.replace("ChooseField_" + tableno + "_" + rowCount, "ChooseField_" + tableno + "_" + nextRow);
    var newHtmlText10 = newHtmlText9.replace("fieldFor_" + tableno + "_" + rowCount, "fieldFor_" + tableno + "_" + nextRow);
    var newHtmlText11 = newHtmlText10.replace("browt_condition_" + tableno + "_" + rowCount, "browt_condition_" + tableno + "_" + nextRow);
    var newHtmlText12 = newHtmlText11.replace("CartAndStatement_" + tableno + "_" + rowCount, "CartAndStatement_" + tableno + "_" + nextRow);
    var newHtmlText13 = newHtmlText12.replace("StatementCart_" + tableno + "_" + rowCount, "StatementCart_" + tableno + "_" + nextRow);
    var newHtmlText14 = newHtmlText13.replace("browt_Conditions_" + tableno + "_" + rowCount, "browt_Conditions_" + tableno + "_" + nextRow);
    var newHtmlText15 = newHtmlText14.replace("browt_Conditions_" + tableno + "_" + rowCount, "browt_Conditions_" + tableno + "_" + nextRow);
    var newHtmlText16 = newHtmlText15.replace("ClosingBrackets_" + tableno + "_" + rowCount, "ClosingBrackets_" + tableno + "_" + nextRow);
    var newHtmlText17 = newHtmlText16.replace("changeCartStatementObjectField('" + rowCount + "')", "changeCartStatementObjectField('" + nextRow + "')");
    var newHtmlText18 = newHtmlText17.replace("condition_" + tableno + "_" + rowCount, "condition_" + tableno + "_" + nextRow);
    var newHtmlText19 = newHtmlText18.replace("allFunctions_" + tableno + "_" + rowCount, "allFunctions_" + tableno + "_" + nextRow);
    var newHtmlText20 = newHtmlText19.replace("FunctionClsDrop_" + tableno + "_" + rowCount, "FunctionClsDrop_" + tableno + "_" + nextRow);
    var newHtmlText21 = newHtmlText20.replace("ChooseFieldCls_" + tableno + "_" + rowCount, "ChooseFieldCls_" + tableno + "_" + nextRow);
    var newHtmlText22 = newHtmlText21.replace("browt_AllFunction_" + tableno + "_" + rowCount, "browt_AllFunction_" + tableno + "_" + nextRow);
    var newHtmlText23 = newHtmlText22.replace("browt_AllFunction_" + tableno + "_" + rowCount, "browt_AllFunction_" + tableno + "_" + nextRow);
    var newHtmlText24 = newHtmlText23.replace("tableRow_" + tableno + "_" + rowCount, "tableRow_" + tableno + "_" + nextRow);
    var newHtmlText25 = newHtmlText24.replace("removeRuleChildRow('" +tableChildRowIdOld+ "')", "removeRuleChildRow('"+tableChildRowIdNew+"')");
    var newHtmlText26 = newHtmlText25.replace("functionParameter_" + tableno + "_" + rowCount, "functionParameter_" + tableno + "_" + nextRow);
    var newHtmlText27 = newHtmlText26.replace("templateDropDown_" + tableno + "_" + rowCount, "templateDropDown_" + tableno + "_" + nextRow);
    var newHtmlText28 = newHtmlText27.replace("dataTypeOfField_" + tableno + "_" + rowCount, "dataTypeOfField_" + tableno + "_" + nextRow);
    
    var newHtmlText29 = newHtmlText28.replace("display: none;", "");
    var newHtmlText30 = newHtmlText29.replace("getallowedActionsChild('" + tableno + "','" + rowCount + "')", "getallowedActionsChild('" + tableno + "','" + nextRow + "')");
    var newHtmlText31 = newHtmlText30.replace("setvalueForTemplateChild('"+tableChildRowIdOld+"')", "setvalueForTemplateChild('"+tableChildRowIdNew+"')");
    var newHtmlText31 = newHtmlText31.replace("addMoreRuleForTableNumChild('"+tableChildRowIdOld+"')", "addMoreRuleForTableNumChild('"+tableChildRowIdNew+"')");
    var newHtmlText31 = newHtmlText31.replace("templateVariableSymbol_" + tableno + "_" + rowCount, "templateVariableSymbol_" + tableno + "_" + nextRow);
    var newHtmlText31 = newHtmlText31.replace("templateVariableSymbolData_" + tableno + "_" + rowCount, "templateVariableSymbolData_" + tableno + "_" + nextRow);
    
    $("#tableaddRecorderChild_" + tableno).append(newHtmlText31);
    
    
    document.getElementById("totalRulesChild_" + tableno).value = nextRow+1;
    $("#ChooseField_" + tableno + "_" + nextRow).val('');
    $("#ruleValue_" + tableno + "_" + nextRow).val('');
    $("#condition_" + tableno + "_" + nextRow).val('');
    $("#operator_" + tableno + "_" + nextRow).val('');
    $(".FunctionClsDrop_" + tableno + "_" + nextRow).hide();
    $(".ChooseFieldCls_" + tableno + "_" + nextRow).show();
    $(".templateVariableSymbolData_" + tableno + "_" + nextRow).hide();
    
    if(nextRow>0){
        $("#remove_" + tableno + "_" + rowCount).show();
        $("#addrulebutton_" + tableno + "_" + rowCount).remove();    
    }
    //alert("#remove_" + tableno + "_" + nextRow)
    $("#remove_" + tableno + "_" + nextRow).hide();
}

function fieldModelPopUpInbetweenNewRecursive(tableIdSufix, tableNo, childtableNo) {
    
    var root = $('#rootpath_' + tableIdSufix).val();
    var rootPath = [];
    if(root){
        rootPath = root.split('.');
    }
    var dataSet = PClevel.jupiterMetaData.result;
    var parent = '';
    var child = '';
    if(rootPath.length){
        for(i=0; i<rootPath.length; i++){
            dataSet = dataSet.field[rootPath[i]]
            parent += rootPath[i]+'.'
        }
    }
    parent = parent.trim('.');
    child = rootPath[rootPath.length-1]
    console.log("parent == ",parent);
    console.log("child == ",child);
    var tableno = parseInt(tableNo);
    $('#selectOptnFieldLevel').empty();
    var option = $("<option/>", {
                value: '',
                text: '--Select Options--'
            })
    $("#selectOptnFieldLevel").append(option);
    var obj = 0;
    $('#currentTableNo').val(tableno);
    var allChooseFilelds, allMethodList, allFieldList, customObjectInnerResult, customOperationsResult =[];
    if (dataSet.fieldList) {
        console.log('All Data:  ----- loop wala ----', dataSet.fieldList)
        allChooseFilelds = allFieldList = dataSet.fieldList;
        allMethodList = dataSet.methodsList;
        customOperationsResult = dataSet.customKeywords.condition;
        customObjectInnerResult = dataSet.customObjects;
    
        //check if field list is present
        if (allFieldList.length > 0) {
             option = $("<option/>", {
                value: 'Fields',
                text: 'Fields'
            })
            $("#selectOptnFieldLevel").append(option);
        }

        //check if method list is present
        if (allMethodList.length > 0) {
             option = $("<option/>", {
                value: 'Function Call',
                text: 'Function Call'
            })
            $("#selectOptnFieldLevel").append(option);
        }

        //check for innerCustom Object available

        if (customObjectInnerResult.length > 0) {
             option = $("<option/>", {
                value: 'Custom Objects',
                text: 'Custom Objects'
            })
            $("#selectOptnFieldLevel").append(option);

            //For model pop on field levelcustomObject dropdown 
            $('#cusObjectsModelFieldPopup').val('');
            $('#browt_customObjectsFieldLevel').empty();
            $('#browt_customObjectsFieldLevel').append("<option value=''>");
            $.each(customObjectInnerResult, function (i, item) {
                $('#browt_customObjectsFieldLevel').append('<option value="' + item + '">' + item + '</option>');
            });

            //end

        }
        //check for innerCustom Obj available ends
        if (customOperationsResult.length > 0) {

             option = $("<option/>", {
                value: 'Custom Operations',
                text: 'Custom Operations'
            })
            $("#selectOptnFieldLevel").append(option);
            //For model pop on field levelcustomoperation dropdown 
            $('#browt_customOperationsFieldLevel').empty();
            $('#browt_customOperationsFieldLevel').append("<option value=''>");
            $.each(customOperationsResult, function (i, item) {

                $('#browt_customOperationsFieldLevel').append('<option value="' + item.name + '">' + item.name + '</option>');
            });

            $('#browt_customOprFieldName_' + tableno).empty();
            $('#browt_customOprFieldName_' + tableno).append("<option value=''>");
            $.each(allChooseFilelds, function (i, item) {
                $('#browt_customOprFieldName_' + tableno).append('<option value="' + item + '">' + item + '</option>');
            });

        }

    }
    //append option custom code here
     option = $("<option/>", {value: 'Custom Code',text: 'Custom Code'})
    $("#selectOptnFieldLevel").append(option);

    $("#currentTable_suffix").val(tableIdSufix)
}

function setTemplateTypeConditions() {
    var ruleTypeSelected = $('#ruleType').val();
    
    if (ruleTypeSelected == 'NORMAL' || ruleTypeSelected == 'FACT_NORMAL') {
        $('.templateTypeOption').addClass('hide');
        $('.templateTypeOption').hide();
        $('.templateDropDown').val('Value');
        $(".tblHeadRow").attr('colspan', 6);
        $(".tblFullRow").attr('colspan', 7);
    }else if (ruleTypeSelected == 'TEMPLATE' || ruleTypeSelected=='FACT_TEMPLATE') {
        $('.templateTypeOption').removeClass('hide');
        $('.templateTypeOption').show();
        $(".tblHeadRow").attr('colspan', 7);
        $(".tblFullRow").attr('colspan', 8);
    }else{
        $('.templateTypeOption').addClass('hide');
        $('.templateTypeOption').hide();
        $('.templateDropDown').val('Value');
        $(".tblHeadRow").attr('colspan', 6);
        $(".tblFullRow").attr('colspan', 7);
    }

}



function removeTableRow(rowId){
    if(confirm('Are you sure to remove this part')){
       $('#'+rowId).remove();
    }
}

function removeRuleChildRow(rowNo){
    if(confirm('Are you sure to remove this row')){
    $('#tableRowChild_'+rowNo).remove();
    }
}

function removeRuleChildTable(tableId){
    if(confirm('Are you sure to remove this record')){
    $('#tableaddRecorderChild_'+tableId).remove();
    }

}
function getallowedActionsChild(tablenum, obj) {

    var tableno = tablenum;
    var chooseField = $('#ChooseField_' + tableno + '_' + obj).val();
    var root=$('#rootpath_'+tablenum).val();
    var rootPath = [];
        if(root){
            rootPath = root.split('.');
        }
        var dataSet = PClevel.jupiterMetaData.result;
        var parent = '';
        var child = '';
        if(rootPath.length){
            for(i=0; i<rootPath.length; i++){
                dataSet = dataSet.field[rootPath[i]]
                parent += rootPath[i]+'.'
            }
        }

    console.log('dataSet===',dataSet)
    if(typeof dataSet.field[chooseField]!='undefined'){
    var loopingOnActions = Object.values(dataSet.field[chooseField].allowedActions)

    console.log('ALL ALLOWED ACTIONS IN CHILD====',loopingOnActions)

            $('#browt_condition_' + tableno + '_' + obj).empty();

            $('#browt_condition_' + tableno + '_' + obj).append("<option value=''>");
            $.each(loopingOnActions, function (i, item) {

                $('#browt_condition_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');

            });
            var dataType = dataSet.field[chooseField].datatype;
            $('#dataTypeOfField_' + tableno + '_' + obj).val(dataType); 
        }       

}

function fieldModelPopUpInbetweenThenNewRecursive(tableIdSufix, tableNo, childtableNo) {
   
    var root = $('#rootpathThen_' + tableIdSufix).val();
   
    var rootPath = [];
    if(root){
        rootPath = root.split('.');
    }
    var dataSet = PClevel.jupiterMetaData.result;
    var parent = '';
    var child = '';
    console.log('rootPath=',rootPath)
    if(rootPath.length){
        for(i=0; i<rootPath.length; i++){
            dataSet = dataSet.field[rootPath[i]]
            parent += rootPath[i]+'.'
        }
    }
    console.log('dataSet',dataSet);
    parent = parent.trim('.');
    child = rootPath[(rootPath.length)-1]
    console.log("parent == ",parent);
    console.log("child == ",child);
    var tableno = parseInt(tableNo);

    $('#selectOptnFieldLevelThen').empty();

    var option = $("<option/>", {
                value: '',
                text: '--Select Options--'
            })
    $("#selectOptnFieldLevelThen").append(option);
    var obj = 0;
    $('#currentTableNoThen').val(tableno);
    var allChooseFilelds, allMethodList, allFieldList, customObjectInnerResult, customOperationsResult =[];
    if (dataSet.fieldList) {
        console.log('All Data:  ----- loop wala ----', dataSet.fieldList)
        allChooseFilelds = allFieldList = dataSet.fieldList;
        allMethodList = dataSet.methodsList;
        customOperationsResult = dataSet.customKeywords.action;
        customObjectInnerResult = dataSet.customObjects;
        console.log('customObjectInnerResult=======',customObjectInnerResult)
    
        //check if field list is present
        if (allFieldList.length > 0) {
             option = $("<option/>", {
                value: 'Fields',
                text: 'Fields'
            })
            $("#selectOptnFieldLevelThen").append(option);
        }

        //check if method list is present
        if (allMethodList.length > 0) {
             option = $("<option/>", {
                value: 'Function Call',
                text: 'Function Call'
            })
            $("#selectOptnFieldLevelThen").append(option);
        }

        //check for innerCustom Object available

        if (customObjectInnerResult.length > 0) {
             option = $("<option/>", {
                value: 'Custom Objects',
                text: 'Custom Objects'
            })
            $("#selectOptnFieldLevelThen").append(option);

            //For model pop on field levelcustomObject dropdown 
            $('#cusObjectsModelFieldPopupThen').val('');
            $('#browt_customObjectsFieldLevelThen').empty();
            $('#browt_customObjectsFieldLevelThen').append("<option value=''>");
            $.each(customObjectInnerResult, function (i, item) {
                $('#browt_customObjectsFieldLevelThen').append('<option value="' + item + '">' + item + '</option>');
            });

            //end

        }
        //check for innerCustom Obj available ends
        if (customOperationsResult.length > 0) {

             option = $("<option/>", {
                value: 'Custom Operations',
                text: 'Custom Operations'
            })
            $("#selectOptnFieldLevelThen").append(option);
            //For model pop on field levelcustomoperation dropdown 
            $('#browt_customOperationsFieldLevelThen').empty();
            $('#browt_customOperationsFieldLevelThen').append("<option value=''>");
            $.each(customOperationsResult, function (i, item) {

                $('#browt_customOperationsFieldLevelThen').append('<option value="' + item.name + '">' + item.name + '</option>');
            });

            $('#browt_customOprFieldNameThen_' + tableno).empty();
            $('#browt_customOprFieldNameThen_' + tableno).append("<option value=''>");
            $.each(allChooseFilelds, function (i, item) {
                $('#browt_customOprFieldNameThen_' + tableno).append('<option value="' + item + '">' + item + '</option>');
            });

        }

    }
    //append option custom code here
     option = $("<option/>", {value: 'Custom Code',text: 'Custom Code'})
    $("#selectOptnFieldLevelThen").append(option);

    $("#currentTable_suffixThen").val(tableIdSufix)
}


function createInnertableCustomObjectThen(tablenum,currentTableSuffix) {

    currentTableSuffix = (currentTableSuffix)?currentTableSuffix:tablenum;
    var tableno = tablenum;
    var parent = ($('#fieldForThen_' + currentTableSuffix)).val();
    var idCount = 0;
    var sepHtml = '';
    var childTableNo = $('#ChildTableNumOfMasterTableNoThen_' + currentTableSuffix).val()
    childTableNo = parseInt(childTableNo) + 1;
    var tableIdSufix = currentTableSuffix + "_" + childTableNo;
    tableIdSufixFunc = "'" + tableIdSufix + "'";
    var childRowId=tableIdSufix+'_'+idCount;
    var childRowIdFunc="'"+childRowId+"'";

    sepHtml += '<table class="table table-vcenter table-mobile-md card-table" id="tableaddRecorderThenChild_' + tableIdSufix + '" style="border:1px solid #c2c2c2;">';
    sepHtml += '<thead>';
    sepHtml += '<tr class="tableHead_' + tableIdSufix + '">';;
    sepHtml += '<th id="tableHeadRow_' + tableIdSufix + '" class="tblHeadRow" colspan="6" width="95%">';

    sepHtml += '<span class="cart fieldStyle FieldsHeadingThen_' + tableIdSufix + ' hide">';
    sepHtml += '<b style="margin-left:15px;">Fields</b>';
    sepHtml += '</span>';
    sepHtml += '<span class="cart fieldStyle FunctionsHeadingThen_' + tableIdSufix + ' hide">';
    sepHtml += '<b style="margin-left:15px;">Functions</b>';
    sepHtml += '</span>';
    sepHtml += '<span id="CustomObjHeadingThen_' + tableIdSufix + '" data-bs-toggle="modal" data-bs-target="#modal-ForFieldsLevelThen" class="cart fieldStyle links" onclick="fieldModelPopUpInbetweenThenNewRecursive(' + tableIdSufixFunc + ','+tableno+','+childTableNo+');"></span>';

    sepHtml += '<input type="hidden" id="parentThen_' + tableIdSufix + '" name="parentThen_' + tableIdSufix + '[]" value="' + parent + '">';
    sepHtml += '<input type="hidden" id="rootpathThen_' + tableIdSufix + '" name="rootpathThen_' + tableIdSufix + '[]" value="">';
    sepHtml += '<input type="hidden" id="tableIdSufixThen_' + tableIdSufix + '" name="tableIdSufixThen_' + tableIdSufix + '[]" value="'+tableIdSufix+'">';
    sepHtml += '<input type="hidden" id="fieldForThenRuleChild_' + tableIdSufix + '" name="fieldForThenRuleChild_' + currentTableSuffix + '[]" value=""/>';
    sepHtml += '<input type="hidden" id="ThenChildTableIds_' + tableIdSufix + '" name="ThenChildTableIds_' + currentTableSuffix + '[]" value="'+childTableNo+'"/>';
    sepHtml += '<input type="hidden" id="fieldForThen_' + tableIdSufix + '" name="fieldForThen_0[]" value=""/>';
    //sepHtml += '<input type="hidden" id="thenTableIds_' + tableIdSufix + '" name="thenTableIds[]" value="' + tableIdSufix + '"/>'
    sepHtml += '<input type="hidden" name="thenTableType[]" id="thenTableType_' + tableIdSufix + '" value="" />';
    sepHtml += '<input type="hidden" id="totalRulesThen_' + tableIdSufix + '" name="totalRules" value="0"/>';
    sepHtml += '<input type="hidden" id="fieldForThenn_' + tableIdSufix + '_' + idCount + '" name="fieldForThenn_0[]" value="FieldsThen"/>';
    sepHtml += '<input type="hidden" id="totalCustCodeChildThen_' + tableIdSufix + '" name="totalCustCodeChildThen_'+tableIdSufix+'[]" value="0"/>';
    sepHtml += '</th>';
    sepHtml += '<th id="" width="5%"><span id="removeThen_1" onclick="removeRuleTableThenChild(' + tableIdSufixFunc + ')"><svg width="24" height="24" fill="#aa1818" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m3.707-11.707a.999.999 0 0 0-1.414 0L10 8.586 7.707 6.293a.999.999 0 1 0-1.414 1.414L8.586 10l-2.293 2.293a.999.999 0 1 0 1.414 1.414L10 11.414l2.293 2.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l2.293-2.293a.999.999 0 0 0 0-1.414"></path></svg></span></th>';

    sepHtml += '</tr>';
    sepHtml += '</thead>';
    sepHtml += '<tbody>';

    sepHtml += '<tr class="cusOprThenNew_' + tableIdSufix + ' hide">';
    sepHtml += '<td class="tblFullRow" colspan="7">';
    sepHtml += '<div class="row">';
    sepHtml += '<div class="col-lg-2">';
    sepHtml += '<h5 style="padding:10px 0px;">Custom Operation</h5>';
    sepHtml += '</div>';
    sepHtml += '<div class="col-lg-2" style="margin-bottom:10px;">';
    sepHtml += '<input readonly type="text" class="form-control" id="cusOperationThen_' + tableIdSufix + '" name="customOperationThen_' + tableIdSufix + '[]" style="margin-left:-60px;">';
    sepHtml += '</div>';
    sepHtml += '</div>';
    sepHtml += '</td>';
    sepHtml += '</tr>';

    sepHtml += '<tr class="cusOprThenNew_' + tableIdSufix + ' hide">';
    sepHtml += '<td class="tblFullRow" colspan="7" >';
    sepHtml += '<table class="table" id="customConditionNewTable_' + tableIdSufix+'"><tr><td colspan="10" style="background: #eee;padding-top: 15px;">';
    sepHtml += '<h5>Condition</h5>';
    sepHtml += '</td>';
    sepHtml += '</tr>';


    sepHtml += '<tr class="conditionThenForCustomOperation_' + tableIdSufix + ' hide" id="conditionThenForCustomOperationChild_' + tableIdSufix + '_' + idCount + '">';
    sepHtml += '<td>';
    sepHtml += '<select name="OpeningBracketsThenNew_' + tableIdSufix + '[]" id="OpeningBracketsThenNew_' + tableIdSufix + '_' + idCount + '" class="form-control form-select"><option value="">Bracket</option><option value="Yes">(</option></select>';
    sepHtml += '</td>';

    sepHtml += '<td class="ChooseFieldClsThenNew_' + tableIdSufix + '_' + idCount + '">';
    sepHtml += '<input list="browt_ChooseFieldThenNew_' + tableIdSufix + '_' + idCount + '" name="ChooseFieldThenNew_' + tableIdSufix + '[]" id="ChooseFieldThenNew_' + tableIdSufix + '_' + idCount + '" class="form-control required" onchange="getdataTypeThenChildNew(' + tableIdSufixFunc + ',' + idCount + ')">';
    sepHtml += '<datalist id="browt_ChooseFieldThenNew_' + tableIdSufix + '_' + idCount + '">';
    sepHtml += '</datalist>';


    sepHtml += '</td>';

    sepHtml += '<td class="FunctionClsDropThenNew_' + tableIdSufix + '_' + idCount + ' hide">';
    sepHtml += '<input list="browt_AllFunctionThenNew_' + tableIdSufix + '_' + idCount + '" name="allFunctionsThen_' + tableIdSufix + '[]" id="allFunctionsThen_' + tableIdSufix + '_' + idCount + '" class="form-control required" onchange="getdataTypeThenChildNew(' + tableIdSufixFunc + ',' + idCount + ')" placeholder="Function">';
    sepHtml += '<datalist id="browt_AllFunctionThenNew_' + tableIdSufix + '_' + idCount + '">';
    sepHtml += '</datalist>';
    sepHtml += '</td>';

    sepHtml += '<td class="FunctionClsDropThenNew_' + tableIdSufix + '_' + idCount + ' hide">';
    sepHtml += '<input type="text" class="form-control" name="functionParameterThenNew_' + tableIdSufix + '[]" placeholder="Parameter" value="" id="functionParameterThenNew_' + tableIdSufix + '_' + idCount + '">';
   
    sepHtml += '</td>';


    sepHtml += '<td>';
    sepHtml += '<input list="browt_conditionThenNew_' + tableIdSufix + '_' + idCount + '" name="conditionThenNew_' + tableIdSufix + '[]" id="conditionThenNew_' + tableIdSufix + '_' + idCount + '" class="form-control required">';
    sepHtml += '<datalist id="browt_conditionThenNew_' + tableIdSufix + '_' + idCount + '">';
    sepHtml += '</datalist>';
    sepHtml += '</td>';

    sepHtml += '<td class="templateTypeOptionThenNew hide" width="30%">';
    sepHtml += '<select name="templateDropDownThenNew_' + tableIdSufix + '[]" id="templateDropDownThenNew_' + tableIdSufix + '_' + idCount + '" class="form-control form-select templateDropDown" onchange="setvalueForTemplateChildThenNew(' +childRowIdFunc+ ');">';
    sepHtml += '<option value="Value">Value</option>';
    sepHtml += '<option value="Variable">Variable</option>';
    sepHtml += '</select>';
    sepHtml += '</td>';

   // sepHtml += '<td width="10%"><input type="text" readonly class="templateVariableSymbolDataThenNew_'+tableIdSufix+'_'+idCount+' hide form-control" name="templateVariableSymbolThenNew_'+tableIdSufix+'[]" id="templateVariableSymbolThenNew_'+tableIdSufix+'_'+idCount+'" value="%%"/></td>';

    

    sepHtml += '<td>';
    sepHtml += '<span style="display: flex;">';
    sepHtml += '<span style="margin-top: 12px;" width="10%" class="templateVariableSymbolDataThenNew_'+tableIdSufix+'_'+idCount+' hide" name="templateVariableSymbolThenNew_'+tableIdSufix+'[]" id="templateVariableSymbolThenNew_'+tableIdSufix+'_'+idCount+'">%%</span>';
    sepHtml += '<input type="text" class="form-control rulevalueThenNew_'+tableIdSufix+' required" name="rulevalueThenNew_' + tableIdSufix + '[]" placeholder="Value" value="" id="ruleValueThenNew_' + tableIdSufix + '_' + idCount + '">';
    sepHtml += '</span>';
    sepHtml += '</td>';

    sepHtml += '<td>';
    sepHtml += '<select name="ClosingBracketsThenNew_' + tableIdSufix + '[]" id="ClosingBracketsThenNew_' + tableIdSufix + '_' + idCount + '" class="form-control form-select"><option value="">Bracket</option><option value="Yes">)</option></select> ';
    sepHtml += '</td>';

    sepHtml += '<td>';
    sepHtml += '<select name="OperatorThenNew' + tableIdSufix + '[]" id="operatorThenNew_' + tableIdSufix + '_' + idCount + '" class="form-control form-select"><option value="">--Select Operator--</option><option value="&&">AND</option><option value="||">OR</option><option value="&& !">AND NOT</option><option value="|| !">OR NOT</option></select>';
    sepHtml += '</td>';

    sepHtml += '<td class="remove">';
    sepHtml += '<span id="removeThenNew_' + tableIdSufix + '_' + idCount + '" class="hide">';
    sepHtml += '<svg width="24" height="24" fill="#aa1818" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m3.707-11.707a.999.999 0 0 0-1.414 0L10 8.586 7.707 6.293a.999.999 0 1 0-1.414 1.414L8.586 10l-2.293 2.293a.999.999 0 1 0 1.414 1.414L10 11.414l2.293 2.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l2.293-2.293a.999.999 0 0 0 0-1.414"></path></svg>';
    sepHtml += '</span>';
    sepHtml += '<span id="addrulebuttonthenNew_' + tableIdSufix + '_' + idCount + '" class="btn--primary" type="button" onclick="addMoreRulethenNewChild(' + tableIdSufixFunc + ','+idCount+')"><svg fill="#206bc4" width="24" height="24" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M8.996 8.996V7.008c.001-.043 0-.054.004-.097.044-.449.423-.845.879-.9.094-.011.115-.007.145-.007.043.002.054.002.097.007.448.054.834.442.879.9.004.043.003.054.004.097v1.988h1.992l.048.001c.49.035.918.441.954.93.039.545-.424 1.063-1.002 1.077h-1.992V13a1.04 1.04 0 0 1-.648.939c-.584.221-1.327-.217-1.359-.891L8.996 13v-1.996H7.004c-.511-.012-.966-.435-1.002-.931-.038-.53.396-1.049.954-1.076l.048-.001h1.992z"></path></svg></span>';
    sepHtml += '</td>';
    sepHtml += '</tr>';
    
    sepHtml += '</table></td></tr>';


    sepHtml += '<tr class="nonCustmOprFieldForThen_' + tableIdSufix + ' hide" id="nonCustmOprFieldForThenChild_' + tableIdSufix + '_' + idCount + '">';
    sepHtml += '<td colspan="3" width="45%" class="ChooseFieldClsThen_'+tableIdSufix+'_'+idCount+'">';

    sepHtml += '<input type="text" list="browt_ChooseFieldThen_' + tableIdSufix + '_' + idCount + '" name="choose_field_then_' + tableIdSufix + '[]" id="ChoosenFieldThen_' + tableIdSufix + '_' + idCount + '"  onchange="getdataTypeThenChild(' + tableIdSufixFunc + ',' + idCount + ')" class="form-control required">';
    sepHtml += '<datalist id="browt_ChooseFieldThen_' + tableIdSufix + '_' + idCount + '">';
    sepHtml += '</datalist>';

    sepHtml += '<td class="FunctionClsDropThen_' + tableIdSufix + '_' + idCount + ' hide">';
    sepHtml += '<input list="browt_AllFunctionThen_' + tableIdSufix + '_' + idCount + '" name="allFunctionsThen_' + tableIdSufix + '[]" id="allFunctionsThen_' + tableIdSufix + '_' + idCount + '" class="form-control" onchange="getdataTypeThenChild(' + tableIdSufixFunc + ',' + idCount + ')" placeholder="Function">';
    sepHtml += '<datalist id="browt_AllFunctionThen_' + tableIdSufix + '_' + idCount + '">'
    sepHtml += '</datalist>'
    sepHtml += '</td>'

    sepHtml += '<td class="templateTypeOptionThen hide" width="30%">';
    sepHtml += '<select name="templateDropDownThen_' + tableIdSufix + '[]" id="templateDropDownThen_' + tableIdSufix + '_' + idCount + '" class="form-control form-select templateDropDown" onchange="setvalueForTemplateChildThen(' +childRowIdFunc+ ');">';
    sepHtml += '<option value="Value">Value</option>';
    sepHtml += '<option value="Variable">Variable</option>';
    sepHtml += '</select>';
    sepHtml += '</td>';

    //sepHtml += '<td width="10%"><input type="text" readonly class="templateVariableSymbolDataThen_'+tableIdSufix+'_'+idCount+' hide form-control" name="templateVariableSymbolThen_'+tableIdSufix+'[]" id="templateVariableSymbolThen_'+tableIdSufix+'_'+idCount+'" value="%%"/></td>';



    sepHtml += '<td class="FunctionClsDropThen_' + tableIdSufix + '_' + idCount + ' hide">';
    sepHtml += '<input type="text" class="form-control" name="functionParameterThen_' + tableIdSufix + '[]" placeholder="Parameter" value="" id="functionParameterThen_' + tableIdSufix + '_' + idCount + '">';
    sepHtml += '</td> ';


    sepHtml += '</td>';
    sepHtml += '<td colspan="3" width="50%">';
    sepHtml += '<span style="display: flex;">';
    sepHtml += '<span style="margin-top: 12px;" width="10%" class="templateVariableSymbolDataThen_'+tableIdSufix+'_'+idCount+' hide" name="templateVariableSymbolThen_'+tableIdSufix+'[]" id="templateVariableSymbolThen_'+tableIdSufix+'_'+idCount+'">%%</span>';
    sepHtml += '<input type="text" class="form-control rulevalue_then_'+tableIdSufix+' required" name="rulevalue_then_' + tableIdSufix + '[]" placeholder="Value" value="" id="ruleValueThen_' + tableIdSufix + '_' + idCount + '">';
    sepHtml += '<input type="hidden" id="dataTypeOfFieldThenNew_' + tableIdSufix + '_' + idCount + '" name="dataTypeOfFieldThenNew_' + tableIdSufix + '[]" value="" />';
    sepHtml += '<input type="hidden" id="dataTypeOfFieldThen_' + tableIdSufix + '_' + idCount + '" name="dataTypeOfFieldThen_' + tableIdSufix + '[]" value="" />';
    sepHtml += '</span>';
    sepHtml += '</td> ';

    sepHtml += '<td class="remove removeThen" width="5%">';
    sepHtml += '<span id="removeThen_' + tableIdSufix + '_' + idCount + '" onclick="removeRuleRowThenChild('+childRowIdFunc+')">';
    sepHtml += '<svg width="24" height="24" fill="#aa1818" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m3.707-11.707a.999.999 0 0 0-1.414 0L10 8.586 7.707 6.293a.999.999 0 1 0-1.414 1.414L8.586 10l-2.293 2.293a.999.999 0 1 0 1.414 1.414L10 11.414l2.293 2.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l2.293-2.293a.999.999 0 0 0 0-1.414"></path></svg>';
    sepHtml += '</span>';

    sepHtml += '<span id="addrulebuttonthen_' + tableIdSufix + '_' + idCount + '" class="btn--primary" type="button" onclick="addMoreRulethenChild(' + tableIdSufixFunc + ','+idCount+')"><svg fill="#206bc4" width="24" height="24" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M8.996 8.996V7.008c.001-.043 0-.054.004-.097.044-.449.423-.845.879-.9.094-.011.115-.007.145-.007.043.002.054.002.097.007.448.054.834.442.879.9.004.043.003.054.004.097v1.988h1.992l.048.001c.49.035.918.441.954.93.039.545-.424 1.063-1.002 1.077h-1.992V13a1.04 1.04 0 0 1-.648.939c-.584.221-1.327-.217-1.359-.891L8.996 13v-1.996H7.004c-.511-.012-.966-.435-1.002-.931-.038-.53.396-1.049.954-1.076l.048-.001h1.992z"></path></svg></span>';

    sepHtml += '</td>';
    sepHtml += '</tr>';
    sepHtml += '</tbody>';

    // sepHtml += '<tfoot>';
    // sepHtml += '<tr><td colspan="6">&nbsp;</td><td>';
    // sepHtml += '<div class="exchangeorderbtnThen exchangeorderbtnThenAdd_' + tableIdSufix + '">';
    // sepHtml += '<span id="addrulebuttonthen" value="" class="btn--primary" type="button" onclick="addMoreRulethen(' + tableIdSufix + ')"><svg fill="#206bc4" width="24" height="24" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M8.996 8.996V7.008c.001-.043 0-.054.004-.097.044-.449.423-.845.879-.9.094-.011.115-.007.145-.007.043.002.054.002.097.007.448.054.834.442.879.9.004.043.003.054.004.097v1.988h1.992l.048.001c.49.035.918.441.954.93.039.545-.424 1.063-1.002 1.077h-1.992V13a1.04 1.04 0 0 1-.648.939c-.584.221-1.327-.217-1.359-.891L8.996 13v-1.996H7.004c-.511-.012-.966-.435-1.002-.931-.038-.53.396-1.049.954-1.076l.048-.001h1.992z"></path></svg></span>';
    // sepHtml += '</div>';

    // sepHtml += '</td></tr>';
    // sepHtml += '<tr class="customCodeForFieldLevelThen_' + tableIdSufix + ' hide">';
    // sepHtml += '<td class="tblFullRow" colspan="7"><h5>Custom Code</h5> <textarea  style="width:100%; height:100px;" class="form-control" id="customCodeFieldLevelThen_' + tableIdSufix + '" name="customCodeFieldLevelThen_' + tableIdSufix + '[]" value=""></textarea></td>';
    // sepHtml += '</tr>';

    // === --- Child Table will add here --- === //
    sepHtml += '<tr class="hide" id="customObjectChildTableThen_' + tableIdSufix + '">';
    sepHtml += '<td class="tblFullRowThen" id="customObjectSubTableThen_' + tableIdSufix + '" colspan="7" width="100%">';
    sepHtml += '<input type="hidden" id="fieldForWhenRuleChildThen_' + tableIdSufix + '" name="fieldForWhenRuleChildThen_'+tableIdSufix+'[]" value=""/>'
    sepHtml += '<input type="hidden" id="ChildTableNumOfMasterTableNoThen_' + tableIdSufix + '" name="ChildTableNumOfMasterTableNoThen[]" value="0"/>';
    sepHtml += '</td>';
    sepHtml += '</tr>';
    // === --- Child Table will End here --- === //   
    // sepHtml += '</tfoot>';

    sepHtml += '</table>';
return (sepHtml);
}

function appendNewTableForCustomObjectThen(tablenum, tableDataHtml, fieldModelPopUpHeading, currentTableSuffix) {
    var parent;
    var childTablenum = parseInt($("#ChildTableNumOfMasterTableNoThen_" + currentTableSuffix).val());
    var heading = 'SET THE VALUE IN ' + fieldModelPopUpHeading + ' WITH';
    var childTablenumForHeading = childTablenum + 1
    if(currentTableSuffix !=1){
       
        //currentTableSuffix=1;
        $("#customObjectSubTableThen_"+currentTableSuffix).append(tableDataHtml);
        //$("#customObjectChildTableThen_"+currentTableSuffix).show(); //not required here just for testingaddnewtable
        parent = $('#rootpathThen_' + currentTableSuffix).val(); 
    }else{
     
      $("#customObjectSubTableThen_" +tablenum).append(tableDataHtml); 
      
       parent = $('#parentThen_' + tablenum + '_' + childTablenumForHeading).val(); 
    }
    //$('#thheadSecondary_' + currentTableSuffix + '_' + childTablenumForHeading + '_0').text(heading);
    $('#CustomObjHeadingThen_'+ currentTableSuffix+ '_' + childTablenumForHeading).text(heading);
    $('#fieldForThenRuleChild_'+ currentTableSuffix + '_' + childTablenumForHeading).val(fieldModelPopUpHeading);
    $('#fieldForWhenRuleChildThen_'+ currentTableSuffix + '_' + childTablenumForHeading).val(fieldModelPopUpHeading);
    
    $('#ChildTableNumOfMasterTableNoThen_' + currentTableSuffix).val(childTablenum + 1)
    $("#removeThen_" + currentTableSuffix + "_" + childTablenumForHeading+"_0").hide();
    var child = fieldModelPopUpHeading;
    var root = parent + '.' + child;   
    $('#rootpathThen_' +currentTableSuffix+'_' + childTablenumForHeading).val(root);
    $('#parentThen_' +currentTableSuffix+'_' + childTablenumForHeading).val(parent);  
    var childTableNumber = parseInt(childTablenumForHeading);
     if(currentTableSuffix!=''){
    $("#customObjectChildTableThen_" + currentTableSuffix).show();
     }else{
        $("#customObjectChildTableThen_" +tablenum).show(); 
    }

    console.log('root iss------',root);
    setValueForChildCustomObjectThen(currentTableSuffix, childTableNumber, root);
    //setTemplateTypeConditions();
}

function setValueForChildCustomObjectThen(tablenum, childTableNumber, root) {

    var rootPath = [];
    if(root){
        rootPath = root.split('.');
    }
    console.log('rootPath in setValueForChildCustomObject:',rootPath);
    var dataSet = PClevel.jupiterMetaData.result;
   
    if(rootPath.length){
        for(i=0; i<rootPath.length; i++){
            dataSet = dataSet.field[rootPath[i]]
           
        }
    }

    
    var allChooseFilelds;
    var allmethodLists;
   if(typeof dataSet.fieldList!='undefined'){
    allChooseFilelds = dataSet.fieldList
   }

   if(typeof dataSet.methodsList!='undefined'){
    allmethodLists = dataSet.methodsList
   }


    console.log('ALL CHILD FIELDS ARE:', allChooseFilelds);
    console.log('ALL CHILD METHODS ARE:', allmethodLists);

    $('#browt_ChooseFieldThen_' + tablenum + '_' + childTableNumber + '_0').empty();
    $('#browt_ChooseFieldThen_' + tablenum + '_' + childTableNumber + '_0').append("<option value=''>");
    $.each(allChooseFilelds, function (i, item) {

        $('#browt_ChooseFieldThen_' + tablenum + '_' + childTableNumber + '_0').append('<option value="' + item + '">' + item + '</option>');
    });

    $('#browt_AllFunctionThen_' + tablenum + '_' + childTableNumber + '_0').empty();
    $('#browt_AllFunctionThen_' + tablenum + '_' + childTableNumber + '_0').append("<option value=''>");
    $.each(allmethodLists, function (i, item) {

        $('#browt_AllFunctionThen_' + tablenum + '_' + childTableNumber + '_0').append('<option value="' + item + '">' + item + '</option>');
    });

    $('#browt_ChooseFieldThenNew_' + tablenum + '_' + childTableNumber + '_0').empty();
    $('#browt_ChooseFieldThenNew_' + tablenum + '_' + childTableNumber + '_0').append("<option value=''>");
    $.each(allChooseFilelds, function (i, item) {

        $('#browt_ChooseFieldThenNew_' + tablenum + '_' + childTableNumber + '_0').append('<option value="' + item + '">' + item + '</option>');
    });

}


function getdataTypeThenChild(tablenum, obj) {

    var tableno = tablenum;
    var chooseField = $('#ChoosenFieldThen_' + tableno + '_' + obj).val();
    var root=$('#rootpathThen_'+tablenum).val();
    var rootPath = [];
        if(root){
            rootPath = root.split('.');
        }
        var dataSet = PClevel.jupiterMetaData.result;
        var parent = '';
        var child = '';
        if(rootPath.length){
            for(i=0; i<rootPath.length; i++){
                dataSet = dataSet.field[rootPath[i]]
                parent += rootPath[i]+'.'
            }
        }

    console.log('dataSet===',dataSet)
    if(chooseField==''){
        chooseField = $('#ChooseFieldThenNew_' + tableno + '_' + obj).val();
    }

    console.log('chooseField==',chooseField)
    var loopingOnActions = Object.values(dataSet.field[chooseField].allowedActions)

    console.log('ALL ALLOWED ACTIONS IN CHILD====',loopingOnActions)

            // $('#browt_conditionThenNew_' + tableno + '_' + obj).empty();

            // $('#browt_conditionThenNew_' + tableno + '_' + obj).append("<option value=''>");
            // $.each(loopingOnActions, function (i, item) {

            //     $('#browt_conditionThenNew_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');

            // });
            var dataType = dataSet.field[chooseField].datatype;
            $('#dataTypeOfFieldThen_' + tableno + '_' + obj).val(dataType); 
            //$('#dataTypeOfFieldThenNew_' + tableno + '_' + obj).val(dataType);

}

function getdataTypeThenChildNew(tablenum, obj) {

    var tableno = tablenum;
    var chooseField = ''
    var root=$('#rootpathThen_'+tablenum).val();
    var rootPath = [];
        if(root){
            rootPath = root.split('.');
        }
        var dataSet = PClevel.jupiterMetaData.result;
        var parent = '';
        var child = '';
        if(rootPath.length){
            for(i=0; i<rootPath.length; i++){
                dataSet = dataSet.field[rootPath[i]]
                parent += rootPath[i]+'.'
            }
        }

    console.log('dataSet===',dataSet)
    
    if(chooseField==''){
        chooseField = $('#ChooseFieldThenNew_' + tableno + '_' + obj).val();
    }

    console.log('chooseField==',chooseField)

    var loopingOnActions = Object.values(dataSet.field[chooseField].allowedActions)

    console.log('ALL ALLOWED ACTIONS IN CHILD====',loopingOnActions)

            $('#browt_conditionThenNew_' + tableno + '_' + obj).empty();

            $('#browt_conditionThenNew_' + tableno + '_' + obj).append("<option value=''>");
            $.each(loopingOnActions, function (i, item) {

                $('#browt_conditionThenNew_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');

            });
            var dataType = dataSet.field[chooseField].datatype;
            // $('#dataTypeOfFieldThen_' + tableno + '_' + obj).val(dataType); 
            $('#dataTypeOfFieldThenNew_' + tableno + '_' + obj).val(dataType);

}


function addMoreRulethenChild(tablenum,rowCount) {

    // let rowCount = parseInt($('#totalRulesThen_' + tablenum).val());
    // if (rowCount > 0) {
    //     rowCount = rowCount - 1;
    // }
    var nextRow = parseInt(rowCount) + 1
    var rowId = "nonCustmOprFieldForThenChild_" + tablenum + "_" + rowCount;
    var newRowId = "nonCustmOprFieldForThenChild_" + tablenum + "_" + nextRow;
    var tableChildRowIdOld=tablenum + "_" + rowCount;
    var tableChildRowIdNew=tablenum + "_" + nextRow;

    //  alert('rowId-->'+rowId)
    //  alert('newRowId-->'+newRowId)
    //  alert('rowCount-->'+rowCount)
    // alert('nextRow-->'+nextRow)
    // alert(tableChildRowIdOld)
    // alert(tableChildRowIdNew)
    
    //let rowfyable = $('#tableaddRecorderThenChild_' + tablenum).closest('table');
    //let lastRow = $("#tableaddRecorderThenChild_" + tablenum + " tbody tr").last().clone();
    //alert("ChoosenFieldThen_" + tablenum + '_' + rowCount);
    let lastRow = $("#"+rowId).clone();
    var newHtmlText1 = '<tr id="' + newRowId + '">' + lastRow.html().replace("ChoosenFieldThen_" + tablenum + '_' + rowCount, "ChoosenFieldThen_" + tablenum + '_' + nextRow) + '</tr>';
    var newHtmlText2 = newHtmlText1.replace("thheadSecondaryThen_" + tablenum + '_' + rowCount, "thheadSecondaryThen_" + tablenum + '_' + nextRow);
    var newHtmlText3 = newHtmlText2.replace("browt_ChooseFieldThen_" + tablenum + '_' + rowCount, "browt_ChooseFieldThen_" + tablenum + '_' + nextRow);
    var newHtmlText4 = newHtmlText3.replace("removeThen_" + tablenum + '_' + rowCount, "removeThen_" + tablenum + '_' + nextRow);
    var newHtmlText4 = newHtmlText4.replace("addrulebuttonthen_" + tablenum + '_' + rowCount, "addrulebuttonthen_" + tablenum + '_' + nextRow);

    var newHtmlText5 = newHtmlText4.replace("browt_ChooseFieldThen_" + tablenum + '_' + rowCount, "browt_ChooseFieldThen_" + tablenum + '_' + nextRow);
    var newHtmlText6 = newHtmlText5.replace("ruleValueThen_" + tablenum + '_' + rowCount, "ruleValueThen_" + tablenum + '_' + nextRow);
    var newHtmlText7 = newHtmlText6.replace("fieldForThenn_" + tablenum + '_' + rowCount, "fieldForThenn_" + tablenum + '_' + nextRow);
    var newHtmlText8 = newHtmlText7.replace("dataTypeOfFieldThen_" + tablenum + '_' + rowCount, "dataTypeOfFieldThen_" + tablenum + '_' + nextRow);
    var newHtmlText9 = newHtmlText8.replace("getDataTypeThen(" + tablenum + "," + rowCount + ")", "getDataTypeThen(" + tablenum + "," + nextRow + ")");
    var newHtmlText9 = newHtmlText9.replace("removeRuleRowThenChild('"+ tableChildRowIdOld +"')", "removeRuleRowThenChild('"+tableChildRowIdNew+"')");
    var newHtmlText9 = newHtmlText9.replace("templateVariableSymbolThen_" + tablenum + '_' + rowCount, "templateVariableSymbolThen_" + tablenum + '_' + nextRow);
    var newHtmlText9 = newHtmlText9.replace("templateVariableSymbolDataThen_" + tablenum + '_' + rowCount, "templateVariableSymbolDataThen_" + tablenum + '_' + nextRow);
    var newHtmlText9 = newHtmlText9.replace("templateDropDownThen_" + tablenum + '_' + rowCount, "templateDropDownThen_" + tablenum + '_' + nextRow);
    var newHtmlText9 = newHtmlText9.replace("setvalueForTemplateThen('"+ tableChildRowIdOld +"')", "setvalueForTemplateThen('"+tableChildRowIdNew+"')");
    var newHtmlText9 = newHtmlText9.replace("setvalueForTemplateChildThen('"+ tableChildRowIdOld +"')", "setvalueForTemplateChildThen('"+tableChildRowIdNew+"')");

    var newHtmlText9 = newHtmlText9.replace("ChoosenFieldThen_" + tablenum + '_' + rowCount, "ChoosenFieldThen_" + tablenum + '_' + nextRow);
    var newHtmlText9 = newHtmlText9.replace("getdataTypeThenChild('"+ tablenum +"'," + rowCount + ")", "getdataTypeThenChild('" + tablenum + "'," + nextRow + ")");
    var newHtmlText9 = newHtmlText9.replace("addMoreRulethenChild('"+ tablenum +"'," + rowCount + ")", "addMoreRulethenChild('" + tablenum + "'," + nextRow + ")");

 


    var newHtmlText10 = newHtmlText9.replace("display: none;", "");

    //$("#tableaddRecorderThenChild_" + tablenum + " tbody").append(newHtmlText10);
    $("#tableaddRecorderThenChild_"+ tablenum + "> tbody > tr").last().after(newHtmlText10);
    //$("#tableaddRecorderThenChild_"+ tablenum + "> tbody > tr").eq(rowCount+5).after(newHtmlText10);

    var nxtRl = parseInt(nextRow) + 1;
    $("#totalRulesThen_" + tablenum).val(nxtRl)
    $("#ChoosenFieldThen_" + tablenum + "_" + nextRow).val('');
    $(".templateVariableSymbolDataThen_" + tablenum +'_'+ nextRow).hide();
    $("#ruleValueThen_" + tablenum+ "_" +nextRow).val('');
    if (nextRow > 0) {
        $("#removeThen_" + tablenum + "_" + rowCount).show();
        $("#addrulebuttonthen_" + tablenum + "_" + rowCount).remove();
    }
    $("#removeThen_" + tablenum + "_" + nextRow).hide();

}

function addMoreRulethenChildCustomOpr(tablenum) {

    // let rowCount = parseInt($('#totalRulesThenForChildLayer_' + tablenum).val());
    // alert('rowCount'+rowCount);
    // if (rowCount > 0) {
    //     rowCount = rowCount - 1;
    // }

    
    //  alert('rowId-->'+rowId)
    //  alert('newRowId-->'+newRowId)
    //  alert('rowCount-->'+rowCount)
    // alert('nextRow-->'+nextRow)
    // alert(tableChildRowIdOld)
    // alert(tableChildRowIdNew)
    
    let rowfyable = $('#tableaddRecorderThenChild_' + tablenum).closest('table');
    let lastRow = $("#tableaddRecorderThenChild_" + tablenum + " tbody tr").last().clone();
    var previouValue=lastRow.prop("id");
    var previouValueArr=previouValue.split('-');
    var prevFinalArr=previouValueArr[1].split('_');
    var rowCount=prevFinalArr.slice(-1);

    var nextRow = parseInt(rowCount) + 1
    var rowId = "nonCustmOprFieldForThenChild-" + tablenum + "_" + rowCount;
    var newRowId = "nonCustmOprFieldForThenChild-" + tablenum + "_" + nextRow;
    var tableChildRowIdOld=tablenum + "_" + rowCount;
    var tableChildRowIdNew=tablenum + "_" + nextRow;



    console.log('previouValueArr',previouValueArr);

    //let lastRow = $("#"+rowId).clone();
    var newHtmlText1 = '<tr id="' + newRowId + '">' + lastRow.html().replace("ChoosenFieldThenChild_" + tablenum + '_' + rowCount, "ChoosenFieldThenChild_" + tablenum + '_' + nextRow) + '</tr>';
    var newHtmlText2 = newHtmlText1.replace("thheadSecondaryThen_" + tablenum + '_' + rowCount, "thheadSecondaryThen_" + tablenum + '_' + nextRow);
    var newHtmlText3 = newHtmlText2.replace("browt_ChooseFieldThen_" + tablenum + '_' + rowCount, "browt_ChooseFieldThen_" + tablenum + '_' + nextRow);
    var newHtmlText4 = newHtmlText3.replace("removeThen_" + tablenum + '_' + rowCount, "removeThen_" + tablenum + '_' + nextRow);
    var newHtmlText4 = newHtmlText4.replace("addrulebuttonthen_" + tablenum + '_' + rowCount, "addrulebuttonthen_" + tablenum + '_' + nextRow);

    var newHtmlText5 = newHtmlText4.replace("browt_ChooseFieldThen_" + tablenum + '_' + rowCount, "browt_ChooseFieldThen_" + tablenum + '_' + nextRow);
    var newHtmlText6 = newHtmlText5.replace("ruleValueThen_" + tablenum + '_' + rowCount, "ruleValueThen_" + tablenum + '_' + nextRow);
    var newHtmlText7 = newHtmlText6.replace("fieldForThenn_" + tablenum + '_' + rowCount, "fieldForThenn_" + tablenum + '_' + nextRow);
    var newHtmlText8 = newHtmlText7.replace("dataTypeOfFieldThen_" + tablenum + '_' + rowCount, "dataTypeOfFieldThen_" + tablenum + '_' + nextRow);
    var newHtmlText9 = newHtmlText8.replace("getDataTypeThen(" + tablenum + "," + rowCount + ")", "getDataTypeThen(" + tablenum + "," + nextRow + ")");
    var newHtmlText9 = newHtmlText9.replace("removeRuleRowThenChild('"+ tableChildRowIdOld +"')", "removeRuleRowThenChild('"+tableChildRowIdNew+"')");
    var newHtmlText9 = newHtmlText9.replace("templateVariableSymbolThen_" + tablenum + '_' + rowCount, "templateVariableSymbolThen_" + tablenum + '_' + nextRow);
    var newHtmlText9 = newHtmlText9.replace("templateVariableSymbolDataThen_" + tablenum + '_' + rowCount, "templateVariableSymbolDataThen_" + tablenum + '_' + nextRow);
    var newHtmlText9 = newHtmlText9.replace("templateDropDownThen_" + tablenum + '_' + rowCount, "templateDropDownThen_" + tablenum + '_' + nextRow);
    var newHtmlText9 = newHtmlText9.replace("setvalueForTemplateThen('"+ tableChildRowIdOld +"')", "setvalueForTemplateThen('"+tableChildRowIdNew+"')");

    var newHtmlText9 = newHtmlText9.replace("ChoosenFieldThen_" + tablenum + '_' + rowCount, "ChoosenFieldThen_" + tablenum + '_' + nextRow);
    var newHtmlText9 = newHtmlText9.replace("getdataTypeThenChild('"+ tablenum +"'," + rowCount + ")", "getdataTypeThenChild('" + tablenum + "'," + nextRow + ")");
    var newHtmlText9 = newHtmlText9.replace("addMoreRulethenChild('"+ tablenum +"'," + rowCount + ")", "addMoreRulethenChild('" + tablenum + "'," + nextRow + ")");

 


    var newHtmlText10 = newHtmlText9.replace("display: none;", "");

    //$("#tableaddRecorderThenChild_" + tablenum + " tbody").append(newHtmlText10);
    $("#tableaddRecorderThenChild_"+ tablenum + "> tbody > tr").last().after(newHtmlText10);
    //$("#tableaddRecorderThenChild_"+ tablenum + "> tbody > tr").eq(rowCount+5).after(newHtmlText10);

    var nxtRl = parseInt(nextRow) + 1;
    $("#totalRulesThenForChildLayer_" + tablenum).val(nxtRl)
    $("#ChoosenFieldThen_" + tablenum + "_" + nextRow).val('');
    $(".templateVariableSymbolDataThen_" + tablenum +'_'+ nextRow).hide();
    $("#ruleValueThen_" + tablenum+ "_" +nextRow).val('');
    if (nextRow > 0) {
        $("#removeThen_" + tablenum + "_" + rowCount).show();
        $("#addrulebuttonthen_" + tablenum + "_" + rowCount).remove();
    }
   // $("#removeThen_" + tablenum + "_" + nextRow).hide();

}


function removeRuleRowThenChild(rowNo){
    if(confirm('Are you sure to remove this row')){
    $('#nonCustmOprFieldForThenChild_'+rowNo).remove();
    }
}

function removeRuleTableThenChild(tablenumber) {
    if (confirm('Are you sure to remove this record')) {
        $('#tableaddRecorderThenChild_' + tablenumber).remove();

    }
}


function setvalueForTemplate(tableno, rowno) {
    var templateDropValue = $('#templateDropDown_' + tableno + '_' + rowno).val();
    var valueId = "ruleValue_"+tableno+"_"+rowno;
    if (templateDropValue == 'Variable') {
        $('.templateVariableSymbolData_' + tableno + '_' + rowno).show();
        $("#"+valueId).keyup(function() { this.value = this.value.replace(/\s/g,'');});
        //$('#ruleValue_' + tableno + '_' + rowno).val('%%');
    } else {
        $('.templateVariableSymbolData_' + tableno + '_' + rowno).hide();
        $("#"+valueId).unbind();
        //$('#ruleValue_' + tableno + '_' + rowno).val('');
    }
}

function setvalueForTemplateChild(tableSufix) {
    
    var templateDropValue = $('#templateDropDown_' + tableSufix).val();
    var valueId = "ruleValue_"+tableSufix;
    if (templateDropValue == 'Variable') {
        $('.templateVariableSymbolData_' +tableSufix).show();
        $("#"+valueId).keyup(function() { this.value = this.value.replace(/\s/g,'');});
       // $('#ruleValue_' + tableSufix).val('%%');
    } else {
        $('.templateVariableSymbolData_' +tableSufix).hide();
        $("#"+valueId).unbind();
       // $('#ruleValue_' + tableSufix).val('');
    }
}

function setvalueForTemplateThen_Old(tableno) {
    
    var templateDropValue = $('#templateDropDownThen_' + tableno).val();

   

    if (templateDropValue == 'Variable') {
        $('.templateVariableSymbolDataThen_' + tableno).show();
        //$('#ruleValueThen_' + tableno + '_' + rowno).val('%%');
    } else {
        $('.templateVariableSymbolDataThen_' + tableno).hide();
        //$('#ruleValueThen_' + tableno + '_' + rowno).val('');
    }
}

function setvalueForTemplateThen(tableno, rowno) {
    var templateDropValue = $('#templateDropDownThen_' + tableno + '_' + rowno).val();

    if (templateDropValue == 'Variable') {
        $('.templateVariableSymbolDataThen_' + tableno + '_' + rowno).show();
        //$('#ruleValueThen_' + tableno + '_' + rowno).val('%%');
    } else {
        $('.templateVariableSymbolDataThen_' + tableno + '_' + rowno).hide();
        //$('#ruleValueThen_' + tableno + '_' + rowno).val('');
    }
}

function setvalueForTemplateChildThen(tableSufix) {
    var templateDropValue = $('#templateDropDownThen_' + tableSufix).val();
    var valueId = "ruleValue_"+tableSufix;
    if (templateDropValue == 'Variable') {
        $('.templateVariableSymbolDataThen_' + tableSufix).show();
        $("#"+valueId).keyup(function() { this.value = this.value.replace(/\s/g,'');});
        //$('#ruleValueThen_' + tableSufix).val('%%');
    } else {
        $('.templateVariableSymbolDataThen_' + tableSufix).hide();
        $("#"+valueId).unbind();
        //$('#ruleValueThen_' + tableSufix).val('');
    }
}
function removeRuleRowThenNew(rowNo){
    if(confirm('Are you sure to remove this row')){
    $('#conditionThenForCustomOperation_'+rowNo).remove();
    }
}

function setvalueForTemplateThenNew(tableno, rowno) {
    var templateDropValue = $('#templateDropDownThenNew_' + tableno + '_' + rowno).val();
    var valueId = "ruleValueThenNew_"+tableno+"_"+rowno;
    if (templateDropValue == 'Variable') {
        $('.templateVariableSymbolDataThenNew_' + tableno + '_' + rowno).show();
        $("#"+valueId).keyup(function() { this.value = this.value.replace(/\s/g,'');});
        //$('#ruleValueThenNew_' + tableno + '_' + rowno).val('%%');
    } else {
        $('.templateVariableSymbolDataThenNew_' + tableno + '_' + rowno).hide();
        $("#"+valueId).unbind();
        //$('#ruleValueThenNew_' + tableno + '_' + rowno).val('');
    }
}

function setvalueForTemplateChildThenNew(tableSufix) {
    var templateDropValue = $('#templateDropDownThenNew_' + tableSufix).val();
    var valueId = "ruleValueThenNew_"+tableSufix;
    if (templateDropValue == 'Variable') {
        $('.templateVariableSymbolDataThenNew_' +tableSufix).show();
        $("#"+valueId).keyup(function() { this.value = this.value.replace(/\s/g,'');});
        //$('#ruleValueThenNew_' + tableSufix).val('%%');
    } else {
        $('.templateVariableSymbolDataThenNew_' +tableSufix).hide();
        $("#"+valueId).unbind();
        //$('#ruleValueThenNew_' + tableSufix).val('');
    }
}

function addMoreRuleFieldLevelThen(tablnum,currentTableSufix) {
    var tableno = ''
    if (tablnum != '') {
        tableno = parseInt(tablnum);
    } else {
        tableno = parseInt($('#indexValueThen').val() - 1)
    }
    let rowCount = parseInt($('#totalRulesThen_' + tableno).val());
    if (rowCount > 0) {
        rowCount = rowCount - 1;
    }
    $(".FunctionClsDropThen_" + currentTableSufix + "_" + rowCount).hide();
    $(".ChooseFieldClsThen_" + currentTableSufix + "_" + rowCount).show();
    $('.nonCustmOprFieldForThen_' + currentTableSufix).show();
    $(".FunctionClsDropThenNew_" + currentTableSufix + "_" + rowCount).hide();
    $(".ChooseFieldClsThenNew_" + currentTableSufix + "_" + rowCount).show();
    $("#ruleValueThen_" + currentTableSufix + "_" + rowCount).show();
    // changeCustomObjectFieldaddMore(rowCount, tablnum);
    // setTemplateTypeConditions();
}

function addMoreRuleFieldLevelFirst(tablnum,currentTableSuffix) {
    $('#condition_' + tablnum + '_0').show();
    var tableno = ''
    if (tablnum != '') {
        tableno = parseInt(tablnum);
    } else {
        tableno = parseInt($('#indexValue').val() - 1)
    }

    let rowCount = parseInt($('#totalRules_' + tableno).val());
    if (rowCount > 0) {
        rowCount = rowCount - 1;
    }

    if ($('#ChooseField_0' + rowCount).val() == '') {
        alert("Please select a Field Name");
        $('#ChooseField_0' + rowCount).focus();
        $('#ChooseField_0' + rowCount).addClass("err");
        return false;
    } else {
        $('#ChooseField_0' + rowCount).removeClass("err");
    }


   // alert(".ChooseFieldCls_" + currentTableSuffix + "_" + rowCount)
    $(".FunctionClsDrop_" + currentTableSuffix + "_" + rowCount).hide();
    $(".ChooseFieldCls_" + currentTableSuffix + "_" + rowCount).show();
    changeCustomObjectFieldaddMore(rowCount, tablnum);
}


function addMoreRulethenNewChild(tablenum,rowCount) {

    var nextRow = parseInt(rowCount) + 1
    var rowId = "conditionThenForCustomOperationChild_" + tablenum + "_" + rowCount;
    var newRowId = "conditionThenForCustomOperationChild_" + tablenum + "_" + nextRow;
    tableChildRowIdOld=tablenum + "_" + rowCount;
    tableChildRowIdNew=tablenum + "_" + nextRow;
    
    let lastRow = $("#"+rowId).clone();
    tableChildRowIdOld=tablenum + "_" + rowCount;
    tableChildRowIdNew=tablenum + "_" + nextRow;
    
    var newHtmlText1 = '<tr class="nonCustmOprFieldForThenChild_' + tablenum + '" id="' + newRowId + '">' + lastRow.html().replace("ChoosenFieldThenNewChild_" + tablenum + '_' + rowCount, "ChoosenFieldThenNewChild_" + tablenum + '_' + nextRow) + '</tr>';

    //var newHtmlText1 = '<tr>' + lastRow.html().replace("ChooseFieldThenNewChild_" + tablenum + '_' + rowCount, "ChooseFieldThenNewChild_" + tablenum + '_' + nextRow) + '</tr>';
    var newHtmlText2 = newHtmlText1.replace("thheadSecondaryThenNew_" + tablenum + '_' + rowCount, "thheadSecondaryThenNew_" + tablenum + '_' + nextRow);
    var newHtmlText3 = newHtmlText2.replace("browt_ChooseFieldThenNew_" + tablenum + '_' + rowCount, "browt_ChooseFieldThenNew_" + tablenum + '_' + nextRow);
    var newHtmlText4 = newHtmlText3.replace("fieldForThenNew_" + tablenum + '_' + rowCount, "fieldForThenNew_" + tablenum + '_' + nextRow);
    var newHtmlText5 = newHtmlText4.replace("remove_thenNew_" + rowCount, "remove_thenNew_" + nextRow);
    var newHtmlText6 = newHtmlText5.replace("browt_ChooseFieldThenNew_" + tablenum + '_' + rowCount, "browt_ChooseFieldThenNew_" + tablenum + '_' + nextRow);
    var newHtmlText7 = newHtmlText6.replace("ruleValueThenNew_" + tablenum + '_' + rowCount, "ruleValueThenNew_" + tablenum + '_' + nextRow);
    var newHtmlText8 = newHtmlText7.replace("fieldForThennNew_" + tablenum + '_' + rowCount, "fieldForThennNew_" + tablenum + '_' + nextRow);
    var newHtmlText8 = newHtmlText8.replace("removeThen_" + tablenum + '_' + rowCount, "removeThen_" + tablenum + '_' + nextRow);
    var newHtmlText8 = newHtmlText8.replace("addrulebuttonthen_" + tablenum + '_' + rowCount, "addrulebuttonthen_" + tablenum + '_' + nextRow);
    var newHtmlText8 = newHtmlText8.replace("allFunctionsThen_" + tablenum + '_' + rowCount, "allFunctionsThen_" + tablenum + '_' + nextRow);
    var newHtmlText8 = newHtmlText8.replace("FunctionClsDropThenNew_" + tablenum + '_' + rowCount, "FunctionClsDropThenNew_" + tablenum + '_' + nextRow);
    var newHtmlText8 = newHtmlText8.replace("FunctionClsDropThenNew_" + tablenum + '_' + rowCount, "FunctionClsDropThenNew_" + tablenum + '_' + nextRow);
    var newHtmlText8 = newHtmlText8.replace("conditionThenNew_" + tablenum + '_' + rowCount, "conditionThenNew_" + tablenum + '_' + nextRow);
    var newHtmlText8 = newHtmlText8.replace("OpeningBracketsThenNew_" + tablenum + '_' + rowCount, "OpeningBracketsThenNew_" + tablenum + '_' + nextRow);
    var newHtmlText8 = newHtmlText8.replace("ClosingBracketsThenNew_" + tablenum + '_' + rowCount, "ClosingBracketsThenNew_" + tablenum + '_' + nextRow);
    var newHtmlText8 = newHtmlText8.replace("operatorThenNew_" + tablenum + '_' + rowCount, "operatorThenNew_" + tablenum + '_' + nextRow);
    var newHtmlText8 = newHtmlText8.replace("functionParameterThenNew_" + tablenum + '_' + rowCount, "functionParameterThenNew_" + tablenum + '_' + nextRow);
    var newHtmlText8 = newHtmlText8.replace("ChooseFieldThenNew_" + tablenum + '_' + rowCount, "ChooseFieldThenNew_" + tablenum + '_' + nextRow);
    var newHtmlText9 = newHtmlText8.replace("ChooseFieldClsThenNew_" + tablenum + '_' + rowCount, "ChooseFieldClsThenNew_" + tablenum + '_' + nextRow);


    var newHtmlText9 = newHtmlText9.replace("display: none;", "");
    var newHtmlText9 = newHtmlText9.replace("conditionThenNew_" + tablenum + '_' + rowCount, "conditionThenNew_" + tablenum + '_' + nextRow);

    var newHtmlText9 = newHtmlText9.replace("removeRuleRowThenChild('"+tableChildRowIdOld+"')", "removeRuleRowThenChild('"+tableChildRowIdOld+"')");
    var newHtmlText9 = newHtmlText9.replace("getallowedActionsThen(" + tablenum + "," + rowCount + ")", "getallowedActionsThen(" + tablenum + "," + nextRow + ")");
    var newHtmlText9 = newHtmlText9.replace("browt_conditionThenNew_" + tablenum + '_' + rowCount, "browt_conditionThenNew_" + tablenum + '_' + nextRow);
    var newHtmlText9 = newHtmlText9.replace("getdataTypeThenChildNew('" + tablenum + "'," + rowCount + ")", "getdataTypeThenChildNew('" + tablenum + "'," + nextRow + ")");
    var newHtmlText9 = newHtmlText9.replace("addrulebuttonthenNew_" + tablenum + '_' + rowCount, "addrulebuttonthenNew_" + tablenum + '_' + nextRow);
    var newHtmlText9 = newHtmlText9.replace("addMoreRulethenNewChild('" + tablenum + "'," + rowCount + ")", "addMoreRulethenNewChild('" + tablenum + "'," + nextRow + ")");
    var newHtmlText9 = newHtmlText9.replace("removeThenNew_" + tablenum + '_' + rowCount, "removeThenNew_" + tablenum + '_' + nextRow);




    var newHtmlText9 = newHtmlText9.replace("templateVariableSymbolThenNew_" + tablenum + '_' + rowCount, "templateVariableSymbolThenNew_" + tablenum + '_' + nextRow);

    var newHtmlText9 = newHtmlText9.replace("templateVariableSymbolDataThenNew_" + tablenum + '_' + rowCount, "templateVariableSymbolDataThenNew_" + tablenum + '_' + nextRow);

    var lastRowInfo=$("#childTableLastInfo_"+tablenum).val();

    $("#customConditionNewTable_" + tablenum +'_'+lastRowInfo+" tbody:last").append(newHtmlText9);

    var nxtRl = parseInt(nextRow) + 1;
    $("#totalRulesThen_" + tablenum).val(nxtRl)

    $("#ChooseFieldThenNew_" + tablenum +'_'+ nextRow).val('');
    $("#conditionThenNew_" + tablenum +'_'+ nextRow).val('');
    $("#ruleValueThenNew_" + tablenum +'_'+ nextRow).val('');
    $(".templateVariableSymbolDataThenNew_" + tablenum +'_'+ nextRow).hide();
    if (nextRow > 0) {
        $("#removeThenNew_" + tablenum + "_" + rowCount).show();
        $("#addrulebuttonthenNew_" + tablenum + "_" + rowCount).remove();
    }else{
    $("#removeThenNew_" + tablenum + "_" + nextRow).hide();
    }

}

function removeCustomCodeThen(tablenumber) {
    if (confirm('Are you sure to remove this record')) {
        $('#tableaddRecorderThen_' + tablenumber).remove();

    }
}

function saveRule() {
    if ($("#addrule").valid()) {
        var formData = $("#addrule").serialize();
        console.log("formData serialize:", formData);
        $.ajax({
            type: "POST",
            url: "/jupiter/save-rule",
            data: formData
        }).done(function (resultRes) {
            console.log("============ ajax Response FOR SAVE==========");
            console.log(resultRes);
            $(".topMessageRow").hide();
            $(".successMsg").hide();
            $(".errorMsg").hide();
            $(".msgRow").html('');
            if (resultRes.status == 200) {
                $(".topMessageRow").show();
                $("#successMsg").show();
                $("#errorMsg").hide();
                $("#successMsg").html('Rule save with rule id:' + resultRes.result.ruleId);
                $('html, body').animate({ scrollTop: $('.navbar-expand-md').offset().top }, 'slow');
                var ruleName = $('#ruleName').val();
                window.location.href = "/jupiter/rule-version-history/" + ruleName
                return true;

            } else {
                $(".topMessageRow").show();
                $("#successMsg").hide();
                $("#errorMsg").show();
                $("#errorMsg").html(JSON.stringify(resultRes, undefined, 2));
                //$("#errorMsg").html(resultRes.message);
                $('html, body').animate({ scrollTop: $('.navbar-expand-md').offset().top }, 'slow');
                return false;
            }

        });

    }

}

function setvalueForTemplateCusOpr(tableno) {
    var templateDropValue = $('#templateDropDownCusOpr_'+tableno).val();

    if (templateDropValue == 'Variable') {
        $('.templateVariableSymbolDataCusOpr_' + tableno).show();
        //$('#ruleValue_' + tableno + '_' + rowno).val('%%');
    } else {
        $('.templateVariableSymbolDataCusOpr_' + tableno).hide();
        //$('#ruleValue_' + tableno + '_' + rowno).val('');
    }
}

function checkCustomOperationActionsChild(tableno,dataSet) {
    $('.cusOprActionValue_' + tableno).show();
    var operatorCustom = $('#cusOperation_' + tableno).val()

    allCustomActionsArray = dataSet.customKeywords.condition;
    if (allCustomActionsArray.length > 0) {
        $('#browt_customOperationsAction_' + tableno).empty();
        $('#browt_customOperationsAction_' + tableno).append("<option value=''>");
        $.each(allCustomActionsArray, function (i, item) {
            //var name = "( " + item.name + "_" + item.datatype + " )"
            var name = item.name;
            if (name == operatorCustom) {
                if (item.allowedActions != undefined) {
                    console.log('ALL ACTIONSSSS---', item.allowedActions)
                    var allowedActionArr = Object.values(item.allowedActions)
                    if (allowedActionArr.length > 0) {
                        $('.cusOprAction_' + tableno).show();
                        $.each(allowedActionArr, function (j, items) {
                            $('#browt_customOperationsAction_' + tableno).append('<option value="' + items + '">' + items + '</option>');
                        });
                    }
                } else {
                    $('.cusOprAction_' + tableno).hide();
                }
            }

        });
    }

    
    if (operatorCustom == 'itemExists' || operatorCustom == 'paymentMethodExists' || operatorCustom == 'walletExists') {
        $('.cusOprAppliedOnField_' + tableno).hide();
        $('.cusOprAction_' + tableno).hide();
        $('.cusOprActionValue_' + tableno).hide();

    }

    if (operatorCustom == 'itemCount') {
        $('.cusOprAppliedOnField_' + tableno).hide();

    }



}


function addMoreTemplateRuleDataValueCopy() {
    let rowCount = parseInt($('#totalDataRows').val());
//    alert("rowCount - "+rowCount);
    let currRow = 1;
    if (parseInt(rowCount) >= 1) {
        currRow = rowCount - 1;
    }
   // alert("currRow - "+currRow);
    prevClassName = ".rowval_" + currRow;
    var nextRow = (currRow + 1);
    var rowId = "templateRuleDataRow_" + currRow;
    var newRowId = "templateRuleDataRow_" + nextRow;
    let lastRow = $("#templatesValueTable tbody tr").last().clone();
    var newHtmlText = '<tr id="' + newRowId + '">' + lastRow.html() + '</tr>';
    newHtmlText = newHtmlText.replace('class="rmv hide"', 'class="rmv"');
    $(prevClassName).each(function () {
        newHtmlText = newHtmlText.replace('rowval_' + currRow, 'rowval_' + nextRow);
    });
    newHtmlText = newHtmlText.replace('templateRuleDataRowRemove(' + currRow + ')', 'templateRuleDataRowRemove(' + nextRow + ')');
    newHtmlText = newHtmlText.replace('serialNumber_' + currRow, 'serialNumber_' + nextRow);
    $("#templatesValueTable tbody").append(newHtmlText);
    $('#totalDataRows').val(nextRow);
    $('#serialNumber_'+nextRow).text(nextRow+1);

    var className = ".rowval_" + nextRow;
    // $(className).each(function () {
    //     $(this).val('');
    // });

    var totalDataRow = parseInt(nextRow)+1;
  //  alert("totalDataRow"+ totalDataRow);
    $('#totalDataRows').val(totalDataRow);
}



    




