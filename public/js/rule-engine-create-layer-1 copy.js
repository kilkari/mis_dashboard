
    function getallowedActions(tablenum, obj) {
        //alert(obj)
        //obj=1;
        var tableno = tablenum//parseInt($("#indexValue").val()-1);
        var chooseField = $('#ChooseField_' + tableno + '_' + obj).val();
       // alert(tableno);
        //alert(chooseField)
        var fieldFor = '';
        //fieldFor=$('#nameSpaceCustomObjects').val();
        fieldFor = $('#fieldFor_' + tableno + '_' + obj).val()
        /*if(fieldFor==''){
          fieldFor=$('#namespaceField').val();  
        }*/
        $('#fieldFor_' + tableno + '_' + obj).val(fieldFor);
        //alert('Field For on 1')
        
        var nameSpace = $('#customObjects').val();
        if (chooseField != '') {
            if (fieldFor == 'Field Call') {

                var loopingOnActions = Object.values(PClevel.jupiterMetaData.result.field[chooseField].allowedActions)

                $('#browt_condition_' + tableno + '_' + obj).empty();

                $('#browt_condition_' + tableno + '_' + obj).append("<option value=''>");
                $.each(loopingOnActions, function (i, item) {

                    $('#browt_condition_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');

                });
                var dataType=PClevel.jupiterMetaData.result.field[chooseField].datatype;
                $('#dataTypeOfField_' + tableno + '_' + obj).val(dataType);

            } else {
                $.ajax({
                    method: "GET",
                    url: '/jupiter/get-jupiter-allowedActions?field=' + chooseField + '&fieldFor=' + fieldFor + '&nameSpace=' + nameSpace,
                }).done(function (res) {
                    console.log("============ ajax Response ==========");
                    console.log(res)
                    console.log(res.allowedActionArr)
                    var j = 0

                    $('#dataTypeOfField_' + tableno + '_' + obj).val(res.dataType);

                    $('#browt_condition_' + tableno + '_' + obj).empty();

                    $('#browt_condition_' + tableno + '_' + obj).append("<option value=''>");
                    $.each(res.allowedActionArr, function (i, item) {
                        if (item != '') {
                            $('#browt_condition_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
                        }
                    });

                });
            }

        } else {
            //for function operators
            //$('#condition_' + tableno + '_' + obj).hide();      
            var choosenFun = $('#allFunctions_' + tableno + '_' + obj).val();
            var loopingOn = PClevel.jupiterMetaData.result.methods;
            $('#browt_condition_' + tableno + '_' + obj).empty();
            //alert(choosenFun+ "==="+ fieldFor)
            $.each(loopingOn, function (i, item) {
                if (item.name == choosenFun) {
                    if (item.allowedActions != undefined) {
                        //$('#browt_condition_'+tableno+'_'+obj).show();
                        $('#condition_' + tableno + '_' + obj).show();
                        $('#browt_condition_' + tableno + '_' + obj).append("<option value=''>");
                        $.each(item.allowedActions, function (j, items) {
                            $('#browt_condition_' + tableno + '_' + obj).append('<option value="' + items + '">' + items + '</option>');
                        });
                    } else {
                        //$('#browt_condition_' + tableno + '_' + obj).hide();
                        $('#condition_' + tableno + '_' + obj).show();
                        $('#browt_condition_' + tableno + '_' + obj).append('<option value="">NA</option>');
                    }
                }else {
                    //$('#browt_condition_' + tableno + '_' + obj).hide();
                    $('#condition_' + tableno + '_' + obj).show();
                    $('#browt_condition_' + tableno + '_' + obj).append('<option value="">NA</option>');
                }
            });

        }


    }





    $(".up,.down").click(function () {
        //alert('in function');
        var row = $(this).parents("tr:first");
        //alert(row);
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
        //alert('HERERRER')
        //alert(tableno);
        let rowCount = parseInt($('#totalRules_' + tableno).val());
        //alert(rowCount);
        if (rowCount > 0) {
            rowCount = rowCount - 1;
        }

        if($('#operator_'+tableno+'_'+rowCount).val() == ''){
            alert("Please select an operator");
            $('#operator_'+tableno+'_'+rowCount).focus();
            $('#operator_'+tableno+'_'+rowCount).addClass("err");
            return false;
        }else{
                $('#operator_'+tableno+'_'+rowCount).removeClass("err");
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

        //let lastRow = $('tbody tr:last', rowfyable).clone();
        //alert(rowCount)
        //alert('Table No:')
        //alert(tableno)
        //alert('ROW No:')
        //alert(rowCount)
        //alert('NEXT ROW NO:')
        //alert(nextRow)
        var rowId = "tableRow_" + tableno + "_" + rowCount;
        //let lastRow = $("#tableaddRecorder_" + tableno + " tbody tr").last().clone()//.append('<td class="remove"><svg width="24" height="24" fill="#aa1818" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m3.707-11.707a.999.999 0 0 0-1.414 0L10 8.586 7.707 6.293a.999.999 0 1 0-1.414 1.414L8.586 10l-2.293 2.293a.999.999 0 1 0 1.414 1.414L10 11.414l2.293 2.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l2.293-2.293a.999.999 0 0 0 0-1.414"></path></svg></td>');
         //.closest('.tr_clone')
        let lastRow = $("#"+rowId).clone();
        console.log('lastRow=====',lastRow);
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
        var newHtmlText28 = newHtmlText27.replace("dataTypeOfField_" + tableno + "_" + rowCount, "dataTypeOfField_" + tableno + "_" + nextRow);




        var newHtmlText29 = newHtmlText28.replace("display: none;", "");
        var newHtmlText30 = newHtmlText29.replace("getallowedActions(" + tableno + "," + rowCount + ")", "getallowedActions(" + tableno + "," + nextRow + ")");
         var newHtmlText31 = newHtmlText30.replace("setvalueForTemplate(" + tableno + "," + rowCount + ")", "setvalueForTemplate(" + tableno + "," + nextRow + ")");
        $("#tableaddRecorder_" + tableno).append(newHtmlText31);
        //$("#tableaddRecorder_"+tableno).parents('table tr:last').after(newHtmlText27);


        document.getElementById("totalRules_" + tableno).value = nextRow + 1;

        //$("#StatementCart_" + nextRow).val(''); 
        $("#ChooseField_" + tableno + "_" + nextRow).val('');
        $("#ruleValue_" + tableno + "_" + nextRow).val('');
        $("#condition_" + tableno + "_" + nextRow).val('');
        $("#operator_" + tableno + "_" + nextRow).val('');
        $(".FunctionClsDrop_" + tableno + "_" + nextRow).hide();
        $(".ChooseFieldCls_" + tableno + "_" + nextRow).show();


        //$("#remove_1_0").hide();

        $("#remove_"+tableno+"_"+nextRow).show();

        //alert(document.getElementById("rowcount").value)
        //$('#ChooseField_'+rowCount).select2();
        //$("#condition_" + rowCount).select2();
        //$('#ChooseField_'+nextRow).select2();
        //$('#condition_'+nextRow).select2();


        //alert(nextRow);

        //getJupiterMetaData(nextRow);
        changeCustomObjectFieldaddMore(nextRow, tableno);




        //$('select').select2();
    }




    function changeposition() {
        //alert('in function');
        var row = $(this).parents("tr:first");
        //alert(row);
        console.log('row here', row);
        if ($(this).is(".up")) {
            row.insertBefore(row.prev());
        } else {
            row.insertAfter(row.next());
        }
    }



    function addnewtable() {
        //alert('Hererre');
        var totalSep = $("#indexValue").val();
        var tableno = parseInt(totalSep);
        var newRow = parseInt(totalSep);
        var idCount = 0;
        var sepHtml = '';

       
        sepHtml += '<table class="table table-vcenter table-mobile-md card-table" id="tableaddRecorder_' + tableno + '" style="border: 1px solid #c2c2c2;margin-top:20px;">';
        sepHtml += '<thead>';
        sepHtml += '<tr class="tableHead_' + tableno + '">';
        sepHtml += '<th id="tableHeadRow_' + tableno + '" colspan="8">'; 
        sepHtml += '<input type="hidden" id="whenTableIds_'+tableno+'" name="whenTableIds[]" value="'+tableno+'"/>'
        sepHtml += '<input type="hidden" id="fieldForWhenRule_'+tableno+'" name="fieldForWhenRule[]" value=""/>'      

        sepHtml += '<span class="FieldsHeading_' + tableno + ' hide">';
        sepHtml += '<b>Fields</b>';
        sepHtml += '</span>';

        sepHtml += '<span class="FunctionsHeading_' + tableno + ' hide">';
        sepHtml += '<b>Functions</b>';
        sepHtml += '</span>';

        sepHtml += '<span id="thheadSecondary_'+tableno+'_0" data-bs-toggle="modal" data-bs-target="#modal-ForFieldsLevel" class="btn--primary links" type="button" onclick="fieldModelPopUpInbetween('+tableno+');"></span>';
        sepHtml += '</th>';
        sepHtml += '<th id="" width="5%"><span id="remove_1" onclick="removeRuleTable('+tableno+')"><svg width="24" height="24" fill="#aa1818" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m3.707-11.707a.999.999 0 0 0-1.414 0L10 8.586 7.707 6.293a.999.999 0 1 0-1.414 1.414L8.586 10l-2.293 2.293a.999.999 0 1 0 1.414 1.414L10 11.414l2.293 2.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l2.293-2.293a.999.999 0 0 0 0-1.414"> </path></svg></span></th>';

        sepHtml += '</tr>';
        sepHtml += '</thead>';
        sepHtml += '<tbody>';

        sepHtml += '<tr class="cusOpr_' + tableno + ' hide">';
        sepHtml += '<td colspan="9">';
        sepHtml += '<div class="row">';
        sepHtml += '<div class="col-lg-2">';
        sepHtml += '<label align="center" for="" style="margin-top: 10px;">';
        sepHtml += '<b>Custom Operation</b></label>';
        sepHtml += '</div>';
        sepHtml += '<div class="col-lg-2" style="margin-bottom:10px;">';
        sepHtml += '<input readonly type="text" class="form-control" id="cusOperation_' + tableno + '" name="customOperation_'+tableno+'[]">';
         
        sepHtml += '</div>';
        sepHtml += '</td>';

        sepHtml += '<tr class="cusOprAppliedOnField_' + tableno + ' hide">';
        sepHtml += '<td colspan="9">';
        sepHtml += '<label align="center" for="" style="margin:5px 0px;color:#e16b08">';
        sepHtml += '<b>On Field:</b></label>';
        sepHtml += '<div class="row">';
        sepHtml += '<div class="col-lg-2">';
        sepHtml += '<label align="center" for="" style="margin-top: 10px;">';
        sepHtml += '<b>Field Name</b></label>';
        sepHtml += '</div>';

        sepHtml += '<div class="col-lg-4">';
        sepHtml += '<input style="width:250px;" list="browt_customOprFieldName_' + tableno + '" id="cusOperationAppliedOnField_' + tableno + '" name="cusOperationAppliedOnField[]" class="form-control required">';
        sepHtml += '<datalist id="browt_customOprFieldName_' + tableno + '">';
        sepHtml += '</datalist>';
        sepHtml += '</div>';
        sepHtml += '</div>';
        sepHtml += '</td>';
        sepHtml += '</tr>';

        sepHtml += '<tr class="cusOpr_' + tableno + ' hide">';
        sepHtml += '<td colspan="9" style="background: #eee;">';
        sepHtml += '<label align="center" for="" style="margin:10px 0px; ">';
        sepHtml += '<b>Condition</b>';
        sepHtml += '</label>';
        sepHtml += '</td>'
        sepHtml += '</tr>'

        sepHtml += '<input type="hidden" id="totalRules_' + tableno + '" name="totalRules" value="0"/>';
        sepHtml += '<tr class="ParentTbl" id="tableRow_' + tableno + '_' + idCount + '">';
        
        sepHtml += '<td>';
        sepHtml += '<select name="OpeningBrackets_'+tableno+'[]" id="OpeningBrackets_' + tableno + '_' + idCount + '" class="form-control form-select">';
        sepHtml += '<option value=""> Opening Bracket </option>';
        sepHtml += '<option value="Yes">(</option>';
        sepHtml += '</select>';
        sepHtml += '</td>';

        sepHtml += '<td class="ChooseFieldCls_' + tableno + '_' + idCount + '">';
        sepHtml += '<input list="browt_ChooseField_' + tableno + '_' + idCount + '" name="ChooseField_'+tableno+'[]" id="ChooseField_' + tableno + '_' + idCount + '" class="form-control required" onchange="getallowedActions(' + tableno + ',' + idCount + ')" placeholder="Field">';
        sepHtml += '<datalist id="browt_ChooseField_' + tableno + '_' + idCount + '">';
        sepHtml += '</datalist>';
        sepHtml += '<input type="hidden" id="fieldFor_' + tableno + '_' + idCount + '" name="fieldFor_' + idCount + '" value=""/>';
         sepHtml +='<input type="hidden" id="dataTypeOfField_' + tableno + '_' + idCount + '" name="dataTypeOfField_' +tableno+'[]" value="" /> ';

        sepHtml += '</td>';

        sepHtml += '<td class="FunctionClsDrop_' + tableno + '_' + idCount + ' hide">';
        sepHtml += '<input list="browt_AllFunction_' + tableno + '_' + idCount + '" name="allFunctions_'+tableno+'[]" id="allFunctions_' + tableno + '_' + idCount + '" class="form-control required" onchange="getallowedActions(' + tableno + ',' + idCount + ')" placeholder="Function">';
        sepHtml += '<datalist id="browt_AllFunction_' + tableno + '_' + idCount + '">'
        sepHtml += '</datalist>'
        sepHtml += '</td>'


        sepHtml += '<td class="FunctionClsDrop_' + tableno + '_' + idCount + ' hide">';
        sepHtml += '<input type="text" class="form-control" name="functionParameter_'+tableno+'[]" placeholder="Parameter" value="" id="functionParameter_' + tableno + '_' + idCount + '">';
        sepHtml += '</td> ';


        sepHtml += '<td>';

        sepHtml += '<input list="browt_condition_' + tableno + '_' + idCount + '" name="condition_'+tableno+'[]" id="condition_' + tableno + '_' + idCount + '" class="form-control required" placeholder="Condition">';
        sepHtml += '<datalist id="browt_condition_' + tableno + '_' + idCount + '">';
        sepHtml += '</datalist>';

        sepHtml += '</td>';

        sepHtml += '<td class="templateTypeOption hide">';
        sepHtml += '<select name="templateDropDown_'+tableno+'[]" id="templateDropDown_' + tableno + '_' + idCount + '" class="form-control form-select" onchange="setvalueForTemplate('+tableno+','+idCount+');">';
        sepHtml += '<option value="Value">Value</option>';
        sepHtml += '<option value="Variable">Variable</option>';
        sepHtml += '</select>';
        sepHtml += '<td>';


        sepHtml += '<td>';
        sepHtml += '<input type="text" class="form-control" name="rulevalue_'+tableno+'[]" placeholder="Value" value="" id="ruleValue_' + tableno + '_' + idCount + '">';
        sepHtml += '</td> ';

        sepHtml += '<td>';
        sepHtml += '<select name="ClosingBrackets_'+tableno+'[]" id="ClosingBrackets_' + tableno + '_' + idCount + '" class="form-control form-select">';
        sepHtml += '<option value=""> Closing Bracket </option>';
        sepHtml += '<option value="Yes">)</option>';
        sepHtml += '</select>';
        sepHtml += '</td>';

        sepHtml += '<td>';
        sepHtml += '<select name="Operator_'+tableno+'[]"';
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
        sepHtml += '<td id="tableBottomRow_'+tableno+'" colspan="8"></td>';
        sepHtml += '<td>';
        sepHtml += '<div class="exchangeorderbtnWhenAdd">';
        sepHtml += '<span id="addrulebutton_'+tableno+'" value="" class="btn--primary" data-bs-toggle="modal" data-bs-target="#modal-AddFunOrField" type="button" onclick="addMoreRuleForTableNum('+tableno+')">';
        sepHtml += '<svg fill="#206bc4" width="24" height="24" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true">';
        sepHtml += '<path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M8.996 8.996V7.008c.001-.043 0-.054.004-.097.044-.449.423-.845.879-.9.094-.011.115-.007.145-.007.043.002.054.002.097.007.448.054.834.442.879.9.004.043.003.054.004.097v1.988h1.992l.048.001c.49.035.918.441.954.93.039.545-.424 1.063-1.002 1.077h-1.992V13a1.04 1.04 0 0 1-.648.939c-.584.221-1.327-.217-1.359-.891L8.996 13v-1.996H7.004c-.511-.012-.966-.435-1.002-.931-.038-.53.396-1.049.954-1.076l.048-.001h1.992z"></path>';
        sepHtml += '</svg>';
        sepHtml += '</span>';
        sepHtml += '<input type="hidden" id="tableType_'+tableno+'" name="tableType[]" value="" />';
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
            sepHtml += '<input list="browt_customOperationsAction_' + tableno + '" id="cusOperationAction_' + tableno + '" name="customOperationAction_'+tableno+'[]" class="form-control required" style="margin-bottom:20px;">';
            sepHtml += '<datalist id="browt_customOperationsAction_' + tableno + '">';
            sepHtml += '</datalist>';
            sepHtml += '</div>';
            sepHtml += '</div>';
            sepHtml += '<div class="cusOprActionValue_' + tableno + ' col-md-2 hide" style="margin-bottom:10px;margin-left:10px;">';
            sepHtml += '<label align="center" class="form-label no-padding-right" >';
            sepHtml += '<b>Custom Operation Value</b></label>';
            sepHtml += '<div class="input-group input-group-flat">';
            sepHtml += '<input type="text" class="form-control" id="cusOperationActionValue_' + tableno + '" name="customOperationActionValue_'+tableno+'[]" value="" style="margin-bottom:20px;">';
            sepHtml += '</div>';
            sepHtml += '</div>';
            sepHtml += '</div>';
            sepHtml += '</td>';
        sepHtml += '</tr>';    
        sepHtml += '<tr class="customCodeForFieldLevel_' + tableno + ' col-md-4 hide" >';
        sepHtml += '<td colspan="7">';
        sepHtml += '<h5>Custom Code</h5>';
        sepHtml += '<textarea  style="width:100%; height:50px" class="form-control" id="customCodeFieldLevel_' + tableno + '" name="customCodeFieldLevel_'+tableno+'" value=""></textarea>';
        sepHtml += '</td>';
        sepHtml += '</tr>';
        sepHtml += '<tr class="hide" id="customObjectChildTable_'+tableno+'">';
        sepHtml += '<td id="customObjectSubTable_'+tableno+'" colspan="7">';
        sepHtml += '<input type="hidden" id="fieldForWhenRuleChild_'+tableno+'" name="fieldForWhenRuleChild[]" value=""/>'
        sepHtml += '<input type="hidden" id="ChildTableNumOfMasterTableNo_'+tableno+'" name="ChildTableNumOfMasterTableNo[]" value="0"/>'
        sepHtml += '</td>';
        sepHtml += '</tr>';
        sepHtml += '</tfoot>';

        sepHtml += '</table>';

      


        

        



        //addnew row
        console.log('HERER SEP HTML', sepHtml);
        $("#sep_addWhenNew").append(sepHtml);

        $("#remove_"+tableno+"_0").hide();
        //$("#indexValue").val(newRow);

    }

    function changeCustomObjectField() {
        //alert('function called==');
        $('#thhead_' + tableno + '_' + obj).hide();
        $('#thheadThen_' + tableno + '_' + obj).hide()
        $(".col").show();
        $('.addnamespacefirstpage').hide();
        $('.toptitle').show();
        $('.whenallpart').show();
        $('.thenallpart').show();
        $('.validdraft').show();

        $('.exchangeorderbtnWhen').hide();
        $('.exchangeorderbtnThen').hide();
        $('.btn-close').click();
        var obj = parseInt($("#indexValue").val() - 1);
        var tableno = parseInt($("#indexValue").val());
        //alert(obj);
        if (parseInt($("#indexValue").val()) > 1) {
            // alert('Gone inside')
            addnewtable();
        }

        var fieldJson = $('#customObjects').val()
        $('#ruleNamespace').val(fieldJson);
        $('.rulenamespace').show();
        $('#browt_selectcountry').empty();

        $('#browt_selectcountry').append("<option value=''>");
        $.each(metaDataGlobal.allowedCountries[fieldJson], function (i, item) {
            $('#browt_selectcountry').append('<option value="' + item + '">' + item + '</option>');
        });
        $('#ruleType').empty();

        $('#ruleType').append("<option value=''>--Select Rule Type--</option>");
        $.each(metaDataGlobal.ruleType, function (i, item) {
            $('#ruleType').append('<option value="' + item + '">' + item + '</option>');
        });

        $('.selectcountrytitle').show();
        
        
        $.ajax({
            method: "GET",
            url: '/jupiter/get-jupiter-metadata?nameSpace=' + fieldJson,
        })
        .done(function (res) {
            PClevel = res;
            console.log('Global variable:', PClevel)
            $('#fieldFor_' + tableno + '_' + obj).val(fieldJson);
            var allChooseFilelds;
            if (fieldJson == 'The following exists' || fieldJson == 'The following does not exist' || fieldJson == 'Any of the following are true' || fieldJson == 'CART' || fieldJson == 'PAYMENT') {
                if (fieldJson == 'CART' || fieldJson == 'PAYMENT') {
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
            } else if (PClevel.jupiterMetaData.result.field) {
                console.log('All Data:', PClevel.jupiterMetaData.result.field)
                console.log(Object.keys(PClevel.jupiterMetaData.result.field))
                allChooseFilelds = Object.keys(PClevel.jupiterMetaData.result.field)
            }
            if (allChooseFilelds) {

        

                if (fieldJson == 'The following exists' || fieldJson == 'The following does not exist' || fieldJson == 'Any of the following are true' || fieldJson == 'CART' || fieldJson == 'PAYMENT') {
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
                //   $('#condition_').addClass('fixedWidth');
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
            
            if (text == 'The following exists' || text == 'The following does not exist' || text == 'Any of the following are true') {
                $('#thhead_' + tableno + '_' + obj).html(text + ':');
            } else {
                $('#thhead_' + tableno + '_' + obj).html('There is a <font color="#800000">' + text + '</font> with');
                $('#thheadThen_' + tableno + '_' + obj).html('Set the value in <font color="#800000">' + text +'</font>');

            }
            $('#thhead_' + tableno + '_' + obj).show();
            $('#thheadThen_' + tableno + '_' + obj).show()
            $(".col").hide();
            //getallowedActions('0')
            //alert(parseInt($("#indexValue").val()))

            // var countRow=parseInt($("#indexValue").val())+1;
            //$("#indexValue").val(countRow);
            //$('.modal').hide();

        });

    }

    function changeCustomObjectFieldaddMore(obj, tablenumber) {
       // alert('GOING HERERERRE')
        var tableno;
        if (tablenumber != '') {
            tableno = parseInt(tablenumber);
        } else {
            tableno = parseInt($("#indexValue").val() - 1);
        }
        console.log('Global variable:', PClevel)
        var fieldJson = $('#fieldFor_' + tableno + '_' + obj).val();
        //$('#fieldFor_'+tableno+'_'+obj).val(fieldJson);
       // alert(fieldJson);
        if (fieldJson == 'Field Call' || fieldJson == 'Function Call') {
            return true;
        }
        var allChooseFilelds;
        if (fieldJson == 'The following exists' || fieldJson == 'The following does not exist' || fieldJson == 'Any of the following are true' || fieldJson == 'CART' || fieldJson == 'PAYMENT') {
            if (fieldJson == 'CART' || fieldJson == 'PAYMENT') {
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
            console.log('INSIDE ALL', allChooseFilelds)
            /*$.each(allChooseFilelds, function (i, item) {
                                  console.log('item-----',item)
                                  if(item!=''){
                                  $('#ChooseField_'+obj).append($('<option>', { 
                                      value: item,
                                      text : item 
                                  }));
                                  
                                  }
                              });*/
            //alert(obj);
            if (fieldJson == 'The following exists' || fieldJson == 'The following does not exist' || fieldJson == 'Any of the following are true' || fieldJson == 'CART' || fieldJson == 'PAYMENT') {
                //alert('HERRERERERER NOW TEST')
                //alert('table no');
                //alert(tableno);
                //alert(obj)

                $('#CartAndStatement_' + tableno + '_' + obj).show();
                $('#browt_Conditions_' + tableno + '_' + obj).empty();
                $('#browt_Conditions_' + tableno + '_' + obj).append("<option value=''>");
                $.each(allChooseFilelds, function (i, item) {
                    //  var name = "( " + item.id + "_" + item.frameType + " )"
                    $('#browt_Conditions_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');
                });

            } else {
                $('#browt_ChooseField_' + tableno + '_' + obj).empty();
                $('#browt_ChooseField_' + tableno + '_' + obj).append("<option value=''>");
                $.each(allChooseFilelds, function (i, item) {
                    //  var name = "( " + item.id + "_" + item.frameType + " )"
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
    
    function appendCustomCodeTable(tableno){
        var sepHtml = '';
        sepHtml += '<table class="table table-vcenter table-mobile-md card-table cusCode hide" id="tableaddRecorder_'+tableno+'" style="border: 1px solid #c2c2c2; margin-top:20px;">';
        sepHtml +='<thead>';
        sepHtml += '<tr class="tableHead_'+tableno+'">';
        sepHtml +='<th id="tableHeadRow_'+tableno+'" width="95%">';
        sepHtml += '<input type="hidden" id="whenTableIds_'+tableno+'" name="whenTableIds[]" value="'+tableno+'"/>'
        sepHtml += '<input type="hidden" id="fieldForWhenRule_'+tableno+'" name="fieldForWhenRule[]" value="Custom Code"/>'  
        sepHtml +='<span  class="FieldsHeading_'+tableno+'"><b>Custom Code</b></span>';
        sepHtml +='</th>';
        sepHtml +='<th width="5%">';
        sepHtml +='<span  id="removeCustomeCode" onclick="removeCustomCode('+tableno+')"><svg width="24" height="24" fill="#aa1818" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m3.707-11.707a.999.999 0 0 0-1.414 0L10 8.586 7.707 6.293a.999.999 0 1 0-1.414 1.414L8.586 10l-2.293 2.293a.999.999 0 1 0 1.414 1.414L10 11.414l2.293 2.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l2.293-2.293a.999.999 0 0 0 0-1.414"> </path></svg></span>';

        sepHtml +='</th>';
                                                            
        sepHtml +='</tr>';
        sepHtml +='</thead>';
        sepHtml +='<tbody>';
        sepHtml +='<tr>';
        sepHtml +='<td colspan="2">';
        sepHtml +='<textarea id="cusCodesUpperLevel_'+tableno+'" name="cusCodesWhen_'+tableno+'" value="" style="width: 100%;"></textarea>';
        sepHtml +='</td>'
        sepHtml +='</tr>';
        sepHtml +='</tbody>';
        sepHtml +='</table>';
        //console.log('sepHtml=====',sepHtml)
        $("#sep_addWhenNew").append(sepHtml);
    }

    function changeCartStatementObjectField(obj) {
        
        var obj = 0//parseInt($("#indexValue").val()-1);
        var tableno = parseInt($("#indexValue").val());
        var nxtTblNum = tableno+1;
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
            var indexTable=parseInt($("#indexValue").val());
            $("#indexValue").val(indexTable+1);
            return true;

        }else{
            $('#tableaddRecorder_1').show();
            $('.exchangeorderbtnWhenAdd').show();
            //if (parseInt($("#indexValue").val()) > 1) {
                addnewtable();
            //}
            $("#tableType_"+tableno).val(functionCallOncart);
            var obj = parseInt(obj);

            if (functionCallOncart == 'Function Call') {
                $("#whenCurrTableType").val('function');
                $("#tableHeadRow_"+tableno).attr('colspan',8);
                $("#tableBottomRow_"+tableno).attr('colspan',8);
                //$('#thheadSecondary_'+tableno+'_'+obj).text('There is a Function Call with');
                //$('.tableHead_' + tableno).remove();
                $('.tableHeadForField_' + tableno).show();
                $('.FunctionsHeading_' + tableno).show();
                $('#fieldFor_' + tableno + '_0').val('Function Call');
                //alert('CALLL');
                $('#fieldForWhenRule_'+tableno).val('Function Call');
                $('#cusOperation_'+tableno).val('');
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
                var ruleTypeTaken=$('#ruleType').val();
                if(ruleTypeTaken=='TEMPLATE'){
                    $(".templateTypeOption").show();
                    
                }else{
                    $(".templateTypeOption").hide();
                }
                $("#whenCurrTableType").val('field');
                $("#tableHeadRow_"+tableno).attr('colspan',8);
                $("#tableBottomRow_"+tableno).attr('colspan',8);
                //$('.tableHead_' + tableno).remove();
                $('.tableHeadForField_' + tableno).show();
                $('.FieldsHeading_' + tableno).show();
                $('#fieldFor_' + tableno + '_0').val('Field Call');
                //alert('CALLL');
                $('#fieldForWhenRule_'+tableno).val('Field Call');
                $('#cusOperation_'+tableno).val('');

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
            if(functionCallOncart == 'Custom Objects'){
                var ruleTypeTaken=$('#ruleType').val();
                if(ruleTypeTaken=='TEMPLATE'){
                    $(".templateTypeOption").show();
                    
                }else{
                    $(".templateTypeOption").hide();
                }
                if (fieldJson == '') {
                    fieldJson = $('#namespaceField').val();
                    $("#errmsg").text("Please select at least one Custom Objects");
                    $("#nameSpaceCustomObjects").focus();
                    return false;
                }else{
                    $("#errmsg").text("");
                }
                $('#fieldForWhenRule_'+tableno).val(fieldJson);
            }
            

            //alert(newFieldJson);
            //alert(fieldJson);
            $('#thheadSecondary_' + tableno + '_' + obj).text('There is ' + fieldJson + ' with');
            $('#fieldFor_' + tableno + '_' + obj).val(fieldJson);
            //alert('CALLL');
            //$('#fieldForWhenRule_'+tableno).val(fieldJson);

            var allChooseFilelds;
            if (fieldJson == 'CART' || fieldJson == 'PAYMENT') {
                if (fieldJson == 'CART' || fieldJson == 'PAYMENT') {
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
                
            
                if (fieldJson == 'The following exists' || fieldJson == 'The following does not exist' || fieldJson == 'Any of the following are true' || fieldJson == 'CART' || fieldJson == 'PAYMENT') {
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




    function checkValidation() {
        //alert('INSIDE VALIDATION')
        if($("#addrule").valid()){
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
                $("#errorMsg").html(resultRes.message);
                $('html, body').animate({ scrollTop: $('.navbar-expand-md').offset().top }, 'slow');
                return false;
            }

        });

        //});
        }






    }





    function draftSaveRule() {
        //alert('INSIDE DRAFT SAVE')
        var formData = $("#addrule").serialize();
        console.log("formData serialize:", formData);
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
                $("#errorMsg").html(resultRes.result);
                $('html, body').animate({ scrollTop: $('.navbar-expand-md').offset().top }, 'slow');
                return false;
            }

        });






    }




    function changeCartStatementObjectFieldThen(obj) {

        var obj = parseInt(obj);
        //alert(obj);
        console.log('Global variable:', PClevel)
        var fieldJson = $('#StatementCart_then_' + obj).val()
        //alert(fieldJson);
        $('#fieldFor_then_' + obj).val(fieldJson);
        var allChooseFilelds;
        if (fieldJson == 'The following exists' || fieldJson == 'The following does not exist' || fieldJson == 'Any of the following are true' || fieldJson == 'CART' || fieldJson == 'PAYMENT') {
            if (fieldJson == 'CART' || fieldJson == 'PAYMENT') {
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
            $('#ChooseField_then_' + obj).show();
            //$('#ChooseField_'+obj).empty();
            /* $.each(allChooseFilelds, function (i, item) {
                                   console.log('item-----',item)
                                   if(item!=''){
                                   $('#ChooseField_'+obj).append($('<option>', { 
                                       value: item,
                                       text : item 
                                   }));
                                   
                                   }
                               }); */
            if (fieldJson == 'The following exists' || fieldJson == 'The following does not exist' || fieldJson == 'Any of the following are true' || fieldJson == 'CART' || fieldJson == 'PAYMENT') {
                $('#CartAndStatement_then_' + obj).show();
                $('#browt_Conditions_' + obj).append("<option value=''>");
                $.each(allChooseFilelds, function (i, item) {
                    //  var name = "( " + item.id + "_" + item.frameType + " )"
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
            //alert('coutry');
            var allOperators = Object.values(PClevel.jupiterMetaData.result.field[fieldJson].allowedActions)
            $('#condition_then_' + obj).empty();
            $('#ChooseField_then_' + obj).hide();
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
            $('#browt_condition_then_' + obj).empty();
            $('#browt_condition_then_' + obj).append("<option value=''>");
            $.each(allOperators, function (i, item) {
                //  var name = "( " + item.id + "_" + item.frameType + " )"
                $('#browt_condition_then_' + obj).append('<option value="' + item + '">' + item + '</option>');
            });
        }


    }



    function getallowedActionsThen(obj) {
        //alert(obj)
        var chooseField = $('#ChooseField_then_' + obj).val();
        //alert(chooseField)
        var fieldFor = '';
        fieldFor = $('#fieldFor_then_' + obj).val();
        var nameSpace = $('#customObjects').val();

        $.ajax({
            method: "GET",
            url: '/jupiter/get-jupiter-allowedActions?field=' + chooseField + '&fieldFor=' + fieldFor + '&nameSpace=' + nameSpace,
        }).done(function (res) {
            console.log("============ ajax Response ==========");
            console.log(res)
            console.log(res.allowedActionArr)
            var j = 0

            // $('#condition_'+obj).empty();
            //   $('#condition_').addClass('fixedWidth');
            /*$.each(res.allowedActionArr, function (i, item) {
                console.log('item-----',item)
                if(item!=''){
                $('#condition_'+obj).append($('<option>', { 
                    value: item,
                    text : item 
                }));
                j++
                }
            }); */
            $('#browt_condition_then_' + obj).empty();

            $('#browt_condition_then_' + obj).append("<option value=''>");
            $.each(res.allowedActionArr, function (i, item) {
                if (item != '') {
                    $('#browt_condition_then_' + obj).append('<option value="' + item + '">' + item + '</option>');
                }
            });

        });


    }




    function changeCustomObjectFieldaddMoreThen(obj) {
        console.log('Global variable:', PClevel)
        var fieldJson = $('#customObjects').val()
        $('#fieldFor_then_' + obj).val(fieldJson);
        var allChooseFilelds;
        if (fieldJson == 'CART' || fieldJson == 'PAYMENT') {
            if (fieldJson == 'CART' || fieldJson == 'PAYMENT') {
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
            /*$.each(allChooseFilelds, function (i, item) {
                                  console.log('item-----',item)
                                  if(item!=''){
                                  $('#ChooseField_'+obj).append($('<option>', { 
                                      value: item,
                                      text : item 
                                  }));
                                  
                                  }
                              });*/
            //alert(obj);
            if (fieldJson == 'The following exists' || fieldJson == 'The following does not exist' || fieldJson == 'Any of the following are true' || fieldJson == 'CART' || fieldJson == 'PAYMENT') {
                $('#CartAndStatement_then_' + obj).show();
                $('#browt_Conditions_then_' + obj).append("<option value=''>");
                $.each(allChooseFilelds, function (i, item) {
                    //  var name = "( " + item.id + "_" + item.frameType + " )"
                    $('#browt_Conditions_then_' + obj).append('<option value="' + item + '">' + item + '</option>');
                });

            } else {
                $('#browt_ChooseField_then_' + obj).append("<option value=''>");
                $.each(allChooseFilelds, function (i, item) {
                    //  var name = "( " + item.id + "_" + item.frameType + " )"
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
                //  var name = "( " + item.id + "_" + item.frameType + " )"
                $('#browt_condition_then_' + obj).append('<option value="' + item + '">' + item + '</option>');
            });
        }

        //$('.modal').hide();



    }



    function addMoreRulethen(tablenum) {

        let rowCount = parseInt($('#totalRulesThen_' + tablenum).val());
        //alert("R0W COUNT WHEN ADD")
        //alert(rowCount);
        if (rowCount > 0) {
            rowCount = rowCount - 1;
        }

        var nextRow = (rowCount + 1)
        alert(nextRow);
        var rowId = "nonCustmOprFieldForThen_" + tablenum + "_" + rowCount;
        let rowfyable = $('#tableaddRecorderThen_' + tablenum).closest('table');
        let lastRow = $("#tableaddRecorderThen_" + tablenum + " tbody tr").last().clone();
        var newHtmlText1 = '<tr id="' + rowId + '">' + lastRow.html().replace("ChoosenFieldThen_" + tablenum + '_' + rowCount, "ChoosenFieldThen_" + tablenum + '_' + nextRow) + '</tr>';
        var newHtmlText2 = newHtmlText1.replace("thheadSecondaryThen_" + tablenum + '_' + rowCount, "thheadSecondaryThen_" + tablenum + '_' + nextRow);
        var newHtmlText3 = newHtmlText2.replace("browt_ChooseFieldThen_" + tablenum + '_' + rowCount, "browt_ChooseFieldThen_" + tablenum + '_' + nextRow);
       // var newHtmlText4 = newHtmlText3.replace("fieldForThen_" + tablenum + '_' + rowCount, "fieldForThen_" + tablenum + '_' + nextRow);
        var newHtmlText4 = newHtmlText3.replace("removeThen_"+ tablenum+ '_'+rowCount, "removeThen_"+tablenum +'_'+nextRow);
        var newHtmlText5 = newHtmlText4.replace("browt_ChooseFieldThen_" + tablenum + '_' + rowCount, "browt_ChooseFieldThen_" + tablenum + '_' + nextRow);
        var newHtmlText6 = newHtmlText5.replace("ruleValueThen_" + tablenum + '_' + rowCount, "ruleValueThen_" + tablenum + '_' + nextRow);
        var newHtmlText7 = newHtmlText6.replace("fieldForThenn_" + tablenum + '_' + rowCount, "fieldForThenn_" + tablenum + '_' + nextRow);
        var newHtmlText8 = newHtmlText7.replace("dataTypeOfFieldThen_" + tablenum + '_' + rowCount, "dataTypeOfFieldThen_" + tablenum + '_' + nextRow);
        var newHtmlText9 = newHtmlText8.replace("getDataTypeThen(" + tablenum + "," + rowCount + ")", "getDataTypeThen(" + tablenum + "," + nextRow + ")");

        var newHtmlText10 = newHtmlText9.replace("display: none;", "");

        $("#tableaddRecorderThen_" + tablenum + " tbody").append(newHtmlText10);
        var nxtRl = parseInt(nextRow) + 1;
        $("#totalRulesThen_" + tablenum).val(nxtRl)
        $("#ChoosenFieldThen_" + tablenum + nextRow).val('');

        $("#removeThen_"+tablenum+"_"+nextRow).show();
        
    }

    function addMoreRulethenNew(tablenum) {

        let rowCount = parseInt($('#totalRulesThenNew_' + tablenum).val());
        //alert("R0W COUNT WHEN ADD")
        //alert(rowCount);
        if (rowCount > 0) {
            rowCount = rowCount - 1;
        }
        var nextRow = (rowCount + 1)
        let rowfyable = $('#tableaddRecorderThenNew_' + tablenum).closest('table');

        //let lastRow = $('tbody tr:last', rowfyable).clone();
        //alert(rowCount)
        let lastRow = $("#tableaddRecorderThenNew_" + tablenum + " tbody tr").last().clone()//.append('<td class="remove"><svg width="24" height="24" fill="#aa1818" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m3.707-11.707a.999.999 0 0 0-1.414 0L10 8.586 7.707 6.293a.999.999 0 1 0-1.414 1.414L8.586 10l-2.293 2.293a.999.999 0 1 0 1.414 1.414L10 11.414l2.293 2.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l2.293-2.293a.999.999 0 0 0 0-1.414"></path></svg></td>');


        var newHtmlText1 = '<tr>' + lastRow.html().replace("ChoosenFieldThenNew_" + tablenum + '_' + rowCount, "ChoosenFieldThenNew_" + tablenum + '_' + nextRow) + '</tr>';
        var newHtmlText2 = newHtmlText1.replace("thheadSecondaryThenNew_" + tablenum + '_' + rowCount, "thheadSecondaryThenNew_" + tablenum + '_' + nextRow);
        var newHtmlText3 = newHtmlText2.replace("browt_ChooseFieldThenNew_" + tablenum + '_' + rowCount, "browt_ChooseFieldThenNew_" + tablenum + '_' + nextRow);
        var newHtmlText4 = newHtmlText3.replace("fieldForThenNew_" + tablenum + '_' + rowCount, "fieldForThenNew_" + tablenum + '_' + nextRow);
        var newHtmlText5 = newHtmlText4.replace("remove_thenNew_" + rowCount, "remove_thenNew_" + nextRow);
        var newHtmlText6 = newHtmlText5.replace("browt_ChooseFieldThenNew_" + tablenum + '_' + rowCount, "browt_ChooseFieldThenNew_" + tablenum + '_' + nextRow);
        var newHtmlText7 = newHtmlText6.replace("ruleValueThenNew_" + tablenum + '_' + rowCount, "ruleValueThenNew_" + tablenum + '_' + nextRow);
        var newHtmlText8 = newHtmlText7.replace("fieldForThennNew_" + tablenum + '_' + rowCount, "fieldForThennNew_" + tablenum + '_' + nextRow);


        var newHtmlText9 = newHtmlText8.replace("display: none;", "");

        $("#tableaddRecorderThenNew_" + tablenum + " tbody").append(newHtmlText9);

        var nxtRl = parseInt(nextRow) + 1;
        $("#totalRulesThenNew_" + tablenum).val(nxtRl)
        
        $("#ChoosenFieldThenNew_" + tablenum + nextRow).val('');
        
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
        var fieldfor = $('#fieldFor_' + tableno + '_0').val()
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
                //alert(name)

            });
        }

        if (operatorCustom == 'itemExists') {
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
        var thenAddMorTableType = $('#thenTableType_'+tablenumber).val();
        
        if(thenAddMorTableType == 'Fields')
            thenCurrTableType='field';
        else if(thenAddMorTableType == 'Function Call')
            thenCurrTableType='function';
        else
            thenCurrTableType=thenAddMorTableType;
            
        //alert(thenCurrTableType);
        $('#addfieldfunctionThen').val(thenCurrTableType);

        if(thenCurrTableType =='field' || thenCurrTableType=='function'){
            addFieldOrFunctionThen();
        }
    }

    function addMoreRuleForTableNum(tablenumber) {
        $('#tableNumberForAdd').val(tablenumber);
        var whenAddMorTableType = $('#tableType_'+tablenumber).val();
        
        if(whenAddMorTableType == 'Fields')
            whenCurrTableType='field';
        else if(whenAddMorTableType == 'Function Call')
            whenCurrTableType='function';
        else
            whenCurrTableType=whenAddMorTableType;
            
        //alert(whenCurrTableType);
        $('#addfieldfunction').val(whenCurrTableType);

        if(whenCurrTableType =='field' || whenCurrTableType=='function'){
            addFieldOrFunction();
        }
    }




    function addFieldOrFunction() {
        $('.modalbtnFieldOrFun').click();
        var tablenum = parseInt($('#tableNumberForAdd').val());
        //alert(tablenum);
        var optionSelected = $('#addfieldfunction').val()
       // alert(optionSelected)
        var isItFunction = $('#fieldFor_' + tablenum + '_0').val();
        if (optionSelected == 'field') {
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
        //alert(tablenum);
        var optionSelected = $('#addfieldfunctionThen').val()
       // alert(optionSelected)
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



    function addMoreRuleForFunction(tablnum) {
        var tableno = ''
        if (tablnum != '') {
            tableno = parseInt(tablnum);
        } else {
            tableno = parseInt($('#indexValue').val() - 1)
        }
        //alert('HERERRER')
        //alert(tableno);
        let rowCount = parseInt($('#totalRules_' + tableno).val());
        //alert(rowCount);
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

        var rowId = "tableRow_" + tableno + "_" + rowCount;

        //let lastRow = $('tbody tr:last', rowfyable).clone();
        //alert(rowCount)
        //alert('Table No:')
        //alert(tableno)
        //alert('ROW No:')
        //alert(rowCount)
        //alert('NEXT ROW NO:')
        //alert(nextRow)
        let lastRow = $("#tableaddRecorder_" + tableno + " tbody tr").last().clone()//.append('<td class="remove"><svg width="24" height="24" fill="#aa1818" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m3.707-11.707a.999.999 0 0 0-1.414 0L10 8.586 7.707 6.293a.999.999 0 1 0-1.414 1.414L8.586 10l-2.293 2.293a.999.999 0 1 0 1.414 1.414L10 11.414l2.293 2.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l2.293-2.293a.999.999 0 0 0 0-1.414"></path></svg></td>');

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
        var newHtmlText24 = newHtmlText23.replace("functionParameter_" + tableno + "_" + rowCount, "functionParameter_" + tableno + "_" + nextRow);
        //var newHtmlText24= newHtmlText23.replace("getallowedActions("+rowCount+")","getallowedActions("+nextRow+")");

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
        //getJupiterMetaData(nextRow);
        changeCustomObjectFieldaddMore(nextRow, tableno);
        //$('select').select2();
    }



    function appenCustomCodeForThen(tableno){
       var sepHtml='';
            sepHtml +='<div class="cusCodeThen hide" style="margin-top:20px;margin-bottom:20px;">';
            
            sepHtml +='<table class="table table-vcenter table-mobile-md card-table" id="tableaddRecorderThen_'+tableno+'" style="border:1px solid #c2c2c2;">';
            sepHtml +='<thead>';
            sepHtml +='<tr>';
            sepHtml +='<th width="95%">';
            sepHtml += '<input type="hidden" name="fieldForThen_0[]" value="Custom Code"/>'; 
            sepHtml += '<input type="hidden" id="thenTableIds_'+tableno+'" name="thenTableIds[]" value="'+tableno+'"/>'   
            sepHtml +='<span class="cart"><b>Custom Code</b></span>';                               
            sepHtml +='</th>';
            sepHtml +='<th width="5%">';
            sepHtml +='<span id="removeCustomeCodeThen_'+tableno+'" onclick="removeCustomCodeThen('+tableno+')"><svg width="24" height="24" fill="#aa1818" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m3.707-11.707a.999.999 0 0 0-1.414 0L10 8.586 7.707 6.293a.999.999 0 1 0-1.414 1.414L8.586 10l-2.293 2.293a.999.999 0 1 0 1.414 1.414L10 11.414l2.293 2.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l2.293-2.293a.999.999 0 0 0 0-1.414"> </path></svg></span>';

            sepHtml +='</th>';
            sepHtml +='</tr>';
            sepHtml +='</thead>';
            sepHtml +='<tbody>';
            sepHtml +='<tr>';
            sepHtml +='<td colspan="2">';
            sepHtml +='<textarea id="cusCodesUpperLevelThen" name="cusCodesThen_'+tableno+'" value="" style="width: 100%;"></textarea>';
            
            //sepHtml +='<input type="hidden" id="overallCustomOprThen" name="overallCustomOprThen" value="" />';
            //sepHtml +='<input type="hidden" id="overallCustomCodeThen" name="overallCustomCodeThen" value="" />';
                                                                
            sepHtml +='</td>';
            sepHtml +='</tr>';
            sepHtml +='</tbody>';
            sepHtml +='</table>';
            sepHtml +='</div>';

            $("#sep_addThenNew").append(sepHtml);
    }
    function changeCartStatementObjectFieldThenNew(obj) {
        $('.modalbtn').click();
         var selectedOptionThenmodel = $('#selectOptnThen').val()
        var obj = 0//parseInt($("#indexValue").val()-1);
        var tableno = parseInt($("#indexValueThen").val());
        var nextTblNum = tableno+1;
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
        

        $("#thenTableType_"+tableno).val(selectedOptionThenmodel);

        var obj = parseInt(obj);
        var fieldJson = '';
        //alert(selectedOptionThenmodel);
        if (selectedOptionThenmodel == 'Custom Objects') {
            fieldJson = $('#nameSpaceCustomObjectsThen').val();
        }
        //alert(selectedOptionThenmodel);
        if (fieldJson == '' && selectedOptionThenmodel == 'Fields') {
            $('#tableaddRecorderThen_' + tableno).show();
            $('.exchangeorderbtnThenAdd_'+tableno).show();
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
        }else if (fieldJson == '' && selectedOptionThenmodel == 'Function Call') {
            $('#tableaddRecorderThen_' + tableno).show();
            $('.exchangeorderbtnThenAdd_'+tableno).show();
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
            $('#fieldForThen_' + tableno ).val('Function Call');
            $('#ChoosenFieldThen_' + tableno + '_' + obj).attr('placeholder', 'Function');
            //return true;              
        }else if (fieldJson != '') {
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
                console.log('Getting cus opr for then==customOperationsResult==',customOperationsResult);
                if (customOperationsResult.length > 0) {
                    //For model pop on field levelcustomoperation dropdown 
                    $('#browt_customOperationsFieldLevelThen').empty();
                    $('#browt_customOperationsFieldLevelThen').append("<option value=''>");
                    $.each(customOperationsResult, function (i, item) {
                        console.log('=====',item.name)
                        $('#browt_customOperationsFieldLevelThen').append('<option value="' + item.name + '">' + item.name + '</option>');
                    });
                } else {
                    $("#selectOptnFieldLevelThen option[value='Custom Operations']").remove();
                }
            } 
        }
        ($("#indexValueThen").val(tableno + 1));
    }



    function addnewtableThen(tableno) {
        //alert('Hererre caliinnggdg');
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
        sepHtml += '<th colspan="6" width="95%">';
        sepHtml += '<input type="hidden" id="fieldForThen_' +tableno+'" name="fieldForThen_0[]" value=""/>';
        sepHtml += '<input type="hidden" id="thenTableIds_'+tableno+'" name="thenTableIds[]" value="'+tableno+'"/>'    
        sepHtml += '<span class="cart fieldStyle FieldsHeadingThen_' + tableno + ' hide">';
        sepHtml += '<b style="margin-left:15px;">Fields</b>';
        sepHtml += '</span>';
        sepHtml += '<span class="cart fieldStyle FunctionsHeadingThen_' + tableno + ' hide">';
        sepHtml += '<b style="margin-left:15px;">Functions</b>';
        sepHtml += '</span>';
        sepHtml += '<span id="CustomObjHeadingThen_' + tableno + '" data-bs-toggle="modal" data-bs-target="#modal-ForFieldsLevelThen" class="cart fieldStyle links hide" onclick="fieldModelPopUpInbetweenThenNew(' + tableno + ');"></span>';    
        sepHtml += '</th>';
        sepHtml += '<th id="" width="5%"><span id="removeThen_1" onclick="removeRuleTableThen('+ tableno +')"><svg width="24" height="24" fill="#aa1818" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m3.707-11.707a.999.999 0 0 0-1.414 0L10 8.586 7.707 6.293a.999.999 0 1 0-1.414 1.414L8.586 10l-2.293 2.293a.999.999 0 1 0 1.414 1.414L10 11.414l2.293 2.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l2.293-2.293a.999.999 0 0 0 0-1.414"></path></svg></span></th>';

        sepHtml += '</tr>';
        sepHtml += '</thead>';
        sepHtml += '<tbody>';

        sepHtml += '<tr class="cusOprThenNew_' + tableno + ' hide">';
        sepHtml += '<td colspan="7">';
            sepHtml += '<div class="row">';
                sepHtml += '<div class="col-lg-2">';
                    sepHtml += '<h5 style="padding:10px 0px;">Custom Operation</h5>';
                sepHtml += '</div>';
                sepHtml += '<div class="col-lg-2" style="margin-bottom:10px;">';
                    sepHtml += '<input readonly type="text" class="form-control" id="cusOperationThen_' + tableno + '" name="customOperationThen_'+tableno+'[]" style="margin-left:-60px;">';
                sepHtml += '</div>';
            sepHtml += '</div>';
        sepHtml += '</td>';
        sepHtml += '</tr>';

        sepHtml += '<tr class="cusOprThenNew_' + tableno + ' hide">';
        sepHtml += '<td colspan="7" style="background: #eee;padding-top: 15px;">';
        sepHtml += '<h5>Condition</h5>';
        sepHtml += '</td>';
        sepHtml += '</tr>';


        sepHtml += '<tr class="conditionThenForCustomOperation_' + tableno + ' hide">';
        sepHtml += '<td>';
        sepHtml += '<select name="OpeningBracketsThenNew_'+tableno+'[]" id="OpeningBracketsThenNew_' + tableno + '_' + idCount + '" class="form-control form-select"><option value="">Select Bracket</option><option value="Yes">(</option></select>';
        sepHtml += '</td>';

        sepHtml += '<td class="ChooseFieldClsThenNew_' + tableno + '_' + idCount + '">';
        sepHtml += '<input list="browt_ChooseFieldThenNew_' + tableno + '_' + idCount + '" name="ChooseFieldThenNew_'+tableno+'[]" id="ChooseFieldThenNew_' + tableno + '_' + idCount + '" class="form-control required" onchange="getallowedActionsThen(' + tableno + ',' + idCount + ')">';
        sepHtml += '<datalist id="browt_ChooseFieldThenNew_' + tableno + '_' + idCount + '">';
        sepHtml += '</datalist>';
        
        sepHtml +='<input type="hidden" id="dataTypeOfFieldThenNew_' + tableno + '_' + idCount + '" name="dataTypeOfFieldThenNew_'+tableno+'[]" value="" />';
        sepHtml += '</td>';

        sepHtml += '<td class="FunctionClsDropThenNew_' + tableno + '_' + idCount + ' hide">';
        sepHtml += '<input list="browt_AllFunctionThenNew_' + tableno + '_' + idCount + '" name="allFunctionsThen_'+tableno+'[]" id="allFunctionsThen_' + tableno + '_' + idCount + '" class="form-control required" onchange="getallowedActions(' + tableno + ',' + idCount + ')" placeholder="Function">';
        sepHtml += '<datalist id="browt_AllFunctionThenNew_' + tableno + '_' + idCount + '">';
        sepHtml += '</datalist>';
        sepHtml += '</td>';


        sepHtml += '<td>';
        sepHtml += '<input list="browt_conditionThenNew_' + tableno + '_' + idCount + '" name="conditionThenNew_'+tableno+'[]" id="conditionThenNew_' + tableno + '_' + idCount + '" class="form-control required">';
        sepHtml += '<datalist id="browt_conditionThenNew_' + tableno + '_' + idCount + '">';
        sepHtml += '</datalist>';
        sepHtml += '</td>';

        sepHtml += '<td>';
        sepHtml += '<input type="text" class="form-control" name="rulevalueThenNew_'+tableno+'[]" placeholder="Value" value="" id="ruleValueThenNew_' + tableno + '_' + idCount + '">';
        sepHtml += '</td>';

        sepHtml += '<td>';
        sepHtml += '<select name="ClosingBracketsThenNew'+tableno+'[]" id="ClosingBracketsThenNew_' + tableno + '_' + idCount + '" class="form-control form-select"><option value="">Select Bracket</option><option value="Yes">)</option></select> ';
        sepHtml += '</td>';

        sepHtml += '<td>';
        sepHtml += '<select name="OperatorThenNew'+tableno+'[]" id="operatorThenNew_' + tableno + '_' + idCount + '" class="form-control form-select"><option value="">--Select Operator--</option><option value="&&">AND</option><option value="||">OR</option><option value="&& !">AND NOT</option><option value="|| !">OR NOT</option></select>';
        sepHtml += '</td>';

        sepHtml += '<td class="remove">';
        sepHtml += '<span id="remove_' + tableno + '_' + idCount + '">';
        sepHtml += '<svg width="24" height="24" fill="#aa1818" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m3.707-11.707a.999.999 0 0 0-1.414 0L10 8.586 7.707 6.293a.999.999 0 1 0-1.414 1.414L8.586 10l-2.293 2.293a.999.999 0 1 0 1.414 1.414L10 11.414l2.293 2.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l2.293-2.293a.999.999 0 0 0 0-1.414"></path></svg>';
        sepHtml += '</span>';
        sepHtml += '</td>';
        sepHtml += '</tr>';

        sepHtml += '<tr class="nonCustmOprFieldForThen_'+tableno+'">';
        sepHtml += '<td colspan="3" width="45%">';
        sepHtml += '<input type="hidden" id="totalRulesThen_' + tableno + '" name="totalRules" value="0"/>';
        sepHtml += '<input type="text" list="browt_ChooseFieldThen_' + tableno + '_' + idCount + '" name="choose_field_then_'+tableno+'[]" id="ChoosenFieldThen_' + tableno + '_' + idCount + '"  onchange="getDataTypeThen(' + tableno + ',' + idCount + ')" class="form-control required">';
        sepHtml += '<datalist id="browt_ChooseFieldThen_' + tableno + '_' + idCount + '">';
        sepHtml += '</datalist>';
        sepHtml += '<input type="hidden" id="fieldForThenn_' + tableno + '_' + idCount + '" name="fieldForThenn_0[]" value="FieldsThen"/>';
        sepHtml +='<input type="hidden" id="dataTypeOfFieldThen_' + tableno + '_' + idCount + '" name="dataTypeOfFieldThen_'+tableno+'[]" value="" />';
        sepHtml += '</td>';
        sepHtml += '<td colspan="3" width="50%">';
        sepHtml += '<input type="text" class="form-control" name="rulevalue_then_'+tableno+'[]" placeholder="Value" value="" id="ruleValueThen_' + tableno + '_' + idCount + '">';
        sepHtml += '</td> ';
        sepHtml += '<td id="removeThen_' + tableno + '_' + idCount + '" class="remove removeThen" width="5%">';
        sepHtml += '<span onclick="removeRuleRowThen('+tableno+','+idCount+')">';
        sepHtml += '<svg width="24" height="24" fill="#aa1818" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m3.707-11.707a.999.999 0 0 0-1.414 0L10 8.586 7.707 6.293a.999.999 0 1 0-1.414 1.414L8.586 10l-2.293 2.293a.999.999 0 1 0 1.414 1.414L10 11.414l2.293 2.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l2.293-2.293a.999.999 0 0 0 0-1.414"></path></svg>';
        sepHtml += '</span>';
        sepHtml += '</td>';
        sepHtml += '</tr>';
        sepHtml += '</tbody>';

        sepHtml += '<tfoot>'; 
        sepHtml += '<tr><td colspan="6">&nbsp;</td><td>';
        sepHtml += '<div class="exchangeorderbtnThen exchangeorderbtnThenAdd_' + tableno + '">';
        sepHtml += '<span id="addrulebuttonthen" value="" class="btn--primary" type="button" onclick="addMoreRulethen(' + tableno + ')"><svg fill="#206bc4" width="24" height="24" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M8.996 8.996V7.008c.001-.043 0-.054.004-.097.044-.449.423-.845.879-.9.094-.011.115-.007.145-.007.043.002.054.002.097.007.448.054.834.442.879.9.004.043.003.054.004.097v1.988h1.992l.048.001c.49.035.918.441.954.93.039.545-.424 1.063-1.002 1.077h-1.992V13a1.04 1.04 0 0 1-.648.939c-.584.221-1.327-.217-1.359-.891L8.996 13v-1.996H7.004c-.511-.012-.966-.435-1.002-.931-.038-.53.396-1.049.954-1.076l.048-.001h1.992z"></path></svg></span>';
        sepHtml += '</div>';   
        sepHtml += '<input type="hidden" name="thenTableType[]" id="thenTableType_' + tableno + '" value="" />';     
        sepHtml += '</td></tr>';
        sepHtml += '<tr class="customCodeForFieldLevelThen_'+tableno+' hide">';
        sepHtml += '<td colspan="7"><h5>Custom Code</h5> <textarea  style="width:100%; height:100px;" class="form-control" id="customCodeFieldLevelThen_'+tableno+'" name="customCodeFieldLevelThen_'+tableno+'[]" value=""></textarea></td>';
        sepHtml += '</tr>';
        sepHtml +=  '</tfoot>';

        sepHtml += '</table>';

        

        $("#sep_addThenNew").append(sepHtml);
        $("#removeThen_"+tableno+"_0").hide();
        //$("#indexValue").val(newRow);
    };




    function changeFieldLevelsOptions() {
        var valueSelected = $("#selectOptnFieldLevel").val();
        alert(valueSelected);
        if (valueSelected == 'Function Call' || valueSelected == 'Fields') {
            addFieldOrFunctionFormFieldLevel();
        }
        if (valueSelected == 'Custom Operations') {
            addFieldOrFunctionFormFieldLevel();
        }
        if (valueSelected == 'Custom Code') {
            addFieldOrFunctionFormFieldLevel();
        }

        if (valueSelected == 'Custom Objects') {
            addFieldOrFunctionFormFieldLevel();
        }

        var tableno = $('#currentTableNo').val();
        //alert(tableno);
        if (valueSelected == 'Function Call'){
            $("#tableHeadRow_"+tableno).attr('colspan',8);
            $("#tableBottomRow_"+tableno).attr('colspan',8);
        }else{
            $("#tableHeadRow_"+tableno).attr('colspan',8);
            $("#tableBottomRow_"+tableno).attr('colspan',8);
        }
        
    }



    function addFieldOrFunctionFormFieldLevel() {
        $('.modalbtnFieldLevel').click();
        //var tablenum=parseInt($('#indexValue').val()-1)
        var tablenum = parseInt($('#currentTableNo').val())
        //alert(tablenum);
        var optionSelected = $('#selectOptnFieldLevel').val()
        if (optionSelected == 'Fields') {
            addMoreRuleFieldLevel(tablenum);
        }
        if (optionSelected == 'Function Call') {
            addMoreRuleForFunctionFieldLevel(tablenum);
        }
        if (optionSelected == 'Custom Operations') {
            addMoreRuleForCustomOperationsFieldLevel(tablenum);
        }
        if (optionSelected == 'Custom Code') {
            openCustomCodeFieldLevel(tablenum);
        }
        if (optionSelected == 'Custom Objects') {
             alert('call function for custom objects');
             alert($('#cusObjectsModelFieldPopup').val());
             var FieldModalPopUpValue=$('#cusObjectsModelFieldPopup').val();
             var tableDataHtml=createInnertableCustomObject(tablenum);
             console.log('tableDataHtml========',tableDataHtml)
             appendNewTableForCustomObject(tablenum,tableDataHtml,FieldModalPopUpValue);
            //openCustomCodeFieldLevel(tablenum);
        }

        $('#selectOptnFieldLevel').val('');
        $('.CustomOperationForSpecificField').hide();
        $('.CustomObjectForSpecificField').hide();
        
    }




    function addMoreRuleForFunctionFieldLevel(tablnum) {
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


        $(".FunctionClsDrop_" + tableno + "_" + rowCount).show();
        $(".ChooseFieldCls_" + tableno + "_" + rowCount).hide();


        changeCustomObjectFieldaddMore(rowCount, tableno);

    }




    function addMoreRuleFieldLevel(tablnum) {
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




    function addMoreRuleForCustomOperationsFieldLevel(tableno) {
        var obj = 0//parseInt($("#indexValue").val()-1);
        var tableno = parseInt(tableno);
        //alert(tableno);





        var obj = parseInt(obj);

        //console.log('Global variable:', PClevel)
        var selectedCustomOperationFromModel = $('#cusOperationModelFieldPopup').val();
        $('#cusOperation_' + tableno).val(selectedCustomOperationFromModel)
        var fieldJson = '';
        fieldJson = $('#fieldFor_' + tableno + '_0').val()
        //alert(fieldJson);

        var customOperationsResult = PClevel.jupiterMetaData.result.field[fieldJson].customKeywords.condition;
        if (customOperationsResult.length > 0) {
            //New Table Then part


            //New Table Then part 
            $('.cusOpr_' + tableno).show();
            $('.cusOprAppliedOnField_' + tableno).show();
            // $('.cusOprActionValue_'tableno).show();
            checkCustomOperationActions(tableno);


        } else {
            alert('Custom Operation Not Applicable')
        }

    }



    function openCustomCodeFieldLevel(tablenum) {
        // alert('herrerererere====');
        $('.customCodeForFieldLevel_' + tablenum).show();
    }



    function removeRuleRow(tablenumber, rownumber) {
        if (confirm('Are you sure to remove this record')) {
            $('#tableRow_' + tablenumber + '_' + rownumber).remove();

        }
    }



    function removeRuleTable(tablenumber) {
        if (confirm('Are you sure to remove this record')) {
            $('#tableaddRecorder_'+tablenumber).remove();
           /*
            var IndexValue=parseInt($('#indexValue').val());
            if(IndexValue>1){
            IndexValue=IndexValue-1;
            $('#indexValue').val(IndexValue)
            }else{
            $('#indexValue').val(1) 
            } */
        }
    }



    function removeCustomCode(tablenumber) {
        if (confirm('Are you sure to remove this record')) {
            $('#tableaddRecorder_'+tablenumber).remove();
        }
    }



    function setCheckSelectedValues() {
        var selectedOptn = $('#selectOptnFieldLevel').val();
        if (selectedOptn == 'Fields' || selectedOptn == 'Function Call' || selectedOptn == 'Custom Code') {
            $('.CustomOperationForSpecificField').hide();
            $('.CustomObjectForSpecificField').hide();
            $('#cusOperationModelFieldPopup').val();
            $('#cusObjectsModelFieldPopup').val();
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
        // alert('CHECKING setCheckSelectedValuesThen==')
        //alert(selectedOptn)
        if (selectedOptn == 'Fields' || selectedOptn == 'Function Call' || selectedOptn == 'Custom Code') {
            $('.CustomOperationForSpecificFieldThen').hide();
            $('.CustomCodeForSpecificField').show();
            $('#cusOperationModelFieldPopup').val();
            $('#cusObjectModelFieldPopup').val();

        }
        if (selectedOptn == 'Custom Operations') {
            $('.CustomOperationForSpecificFieldThen').show();
        }

        if (selectedOptn == 'Custom Objects') {
            $('.CustomCodeForSpecificField').show();
        }
        


    }



    function changeFieldLevelsOptionsThen() {
        var valueSelected = $("#selectOptnFieldLevelThen").val();
        // alert('THE SELECTED VALUE IS')
        //alert(valueSelected);
        if (valueSelected == 'Function Call' || valueSelected == 'Fields') {
            addFieldOrFunctionFormFieldLevel();
        }
        if (valueSelected == 'Custom Operations') {
            // alert('going to call custom opr')
            addFieldOrFunctionFormFieldLevelThen();
        }
        if (valueSelected == 'Custom Code') {
            addFieldOrFunctionFormFieldLevelThen();
        }
        $('#selectOptnFieldLevelThen').val('');
    }





    function fieldModelPopUpInbetween(tableNumber) {
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
        //alert(functionCallOncart)
        if (functionCallOncart == 'Function Call') {
            $("#tableHeadRow_"+tableno).attr('colspan',8);
            $("#tableBottomRow_"+tableno).attr('colspan',8);
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
            $("#tableHeadRow_"+tableno).attr('colspan',8);
            $("#tableBottomRow_"+tableno).attr('colspan',8);
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
        if (fieldJson == 'The following exists' || fieldJson == 'The following does not exist' || fieldJson == 'Any of the following are true' || fieldJson == 'CART' || fieldJson == 'PAYMENT') {
            if (fieldJson == 'CART' || fieldJson == 'PAYMENT') {
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

            if (fieldJson == 'The following exists' || fieldJson == 'The following does not exist' || fieldJson == 'Any of the following are true' || fieldJson == 'CART' || fieldJson == 'PAYMENT') {
                $('#CartAndStatement_' + tableno + '_' + obj).show();
                $('#browt_Conditions_' + tableno + '_' + obj).append("<option value=''>");
                $.each(allChooseFilelds, function (i, item) {
                    //  var name = "( " + item.id + "_" + item.frameType + " )"
                    $('#browt_Conditions_' + obj).append('<option value="' + item + '">' + item + '</option>');
                });

            } else {
                var customOperationsResult = PClevel.jupiterMetaData.result.field[fieldJson].customKeywords.condition;
                var customObjectInnerResult = PClevel.jupiterMetaData.result.field[fieldJson].customObjects;
                console.log('customObjectInnerResult=======',customObjectInnerResult)
                if (customOperationsResult.length > 0) {
                    

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
            //alert('country');
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

    }




    function selectOtherOptionsThen() {
        var optionSelected = $('#selectOptnThen').val();
        // alert('IN FUNCTION ONCHANGE:')
        //alert(optionSelected)
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
        //alert('hererrerer---');
        if (($("#selectOptnFieldLevelThen option[value='Custom Operations']").length > 0)) {

        } else {
            // alert('here to append')
            var option = $("<option/>", {
                value: 'Custom Operations',
                text: 'Custom Operations'
            });
            $("#selectOptnFieldLevelThen").append(option);
        }


        //alert(tableNumber);
        $('.modalbtn').click();
        var obj = 0//parseInt($("#indexValue").val()-1);
        var tableno = parseInt(tableNumber);
        var tbno = $('#currentTableNoThen').val(tableno)
        //alert('CURRENT TABLE NUMBER');
        //alert(tbno)
        var nameCustomCode = '';
        nameCustomCode = $('#namespaceCustomCodeThen').val();
       // alert('GOING FOR EMPTY==')
       // $('#browt_customOperationsFieldLevelThen').empty();
        $('#cusOperationModelFieldPopupThen').val('');
        if (nameCustomCode != '') {
            $('#cusCodesUpperLevelThen').text(nameCustomCode);
            $('.cusCodeThen').show();
            $('#overallCustomCodeThen').val(nameOperations);
            $('#namespaceCustomCodeThen').val('');
            return true;
        }
        //$('#tableaddRecorderThen_1').show();
        //$('.exchangeorderbtnThenAdd').show();

        var functionCallOncart = $('#selectOptnThen').val();


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

                    $('.FieldsHeadingThen_' + tableno).show();
                    $('.FunctionsHeadingThen_' + tableno).hide();
                    $('#fieldForThen_' + tableno).val('FieldsThen');
                    $('#fieldForThenn_' + tableno + '_' + obj).val('FieldsThen');
                }
            }
            return true;
        }


        var fieldJson = '';
        fieldJson = $('#fieldForThen_'+tableno).val();
        //alert(fieldJson);

        //$('#tableaddRecorderThenNew_'+tableno).show();
        //$('#thheadSecondaryThenNew_'+tableno+'_'+obj).text('Set the value in ' + fieldJson + ' with');
        $('#fieldForThen_'+tableno).val(fieldJson);
        var allChooseFilelds;
        if (PClevel.jupiterMetaData.result.field[fieldJson].field) {
            //$('#tableaddRecorderThen_' + tableno).show();
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
            alert('HERRER IN THEN==');
            if (customOperationsResult.length > 0) {
                alert('INSIDE CUS THEN===')
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
        
        $('#selectOptnThen').val('');

    }




    function addFieldOrFunctionFormFieldLevelThen() {
        $('.modalbtnFieldLevel').click();
        //var tablenum=parseInt($('#indexValue').val()-1)
        var tablenum = parseInt($('#currentTableNoThen').val())
        //alert(tablenum);
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



    function addMoreRuleForCustomOperationsFieldLevelThen(tableno) {
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




    function getallowedActionsThen(tablenum, obj) {
          
        //obj=1;
        var tableno = tablenum//parseInt($("#indexValue").val()-1);
        //alert($('#ChooseFieldThenNew_'+tableno+'_'+obj).val());
        //console.log('check data',)
        var chooseField = $('#ChooseFieldThenNew_'+ tableno+'_'+ obj).val();
        //alert(tableno);
        var fieldFor = '';
        //fieldFor=$('#nameSpaceCustomObjects').val();
        fieldFor = $('#fieldForThen_' + tableno).val()
        /*if(fieldFor==''){
          fieldFor=$('#namespaceField').val();  
        }*/
        $('#fieldForThen_' + tableno).val(fieldFor);
        //alert('Field For on 1')
        var nameSpace = $('#customObjects').val();
        if (chooseField != '') {
            if (fieldFor == 'Field Call') {

                var loopingOnActions = Object.values(PClevel.jupiterMetaData.result.field[chooseField].allowedActions)

                $('#browt_condition_' + tableno + '_' + obj).empty();

                $('#browt_condition_' + tableno + '_' + obj).append("<option value=''>");
                $.each(loopingOnActions, function (i, item) {

                    $('#browt_condition_' + tableno + '_' + obj).append('<option value="' + item + '">' + item + '</option>');

                });

                var dataType=PClevel.jupiterMetaData.result.field[chooseField].datatype;
                alert(dataType);
                $('#dataTypeOfFieldThenNew_' + tableno + '_' + obj).val(dataType);

            } else {
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

        } else {
            //for function operators

            var choosenFun = $('#allFunctions_' + tableno + '_' + obj).val();
            var loopingOn = PClevel.jupiterMetaData.result.methods;
            $('#browt_conditionThenNew_' + tableno + '_' + obj).empty();

            $('#browt_conditionThenNew_' + tableno + '_' + obj).append("<option value=''>");
            $.each(loopingOn, function (i, item) {
                if (item.name == choosenFun) {
                    if (item.allowedActions != undefined) {
                        //$('#browt_conditionThenNew_'+tableno+'_'+obj).show();
                        $('#condition_' + tableno + '_' + obj).show();
                        $.each(item.allowedActions, function (j, items) {
                            $('#browt_conditionThenNew_' + tableno + '_' + obj).append('<option value="' + items + '">' + items + '</option>');
                        });
                    } else {
                        $('#browt_conditionThenNew_' + tableno + '_' + obj).hide();
                        $('#condition_' + tableno + '_' + obj).hide();
                    }
                }
            });

        }


    }




    function openCustomCodeFieldLevelThen(tablenum) {
        //  alert('herrerererere====');
        $('.customCodeForFieldLevelThen_' + tablenum).show();
        //alert('AT end====')
    }




    function saveRule() {
        //alert('INSIDE VALIDATION')
        if($("#addrule").valid()){
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
                $("#successMsg").html('Rule save with rule id:'+resultRes.result.ruleId);
                $('html, body').animate({ scrollTop: $('.navbar-expand-md').offset().top }, 'slow');
                var ruleName=$('#ruleName').val();
                window.location.href="/jupiter/rule-version-history/"+ruleName
                return true;

            } else {
                $(".topMessageRow").show();
                $("#successMsg").hide();
                $("#errorMsg").show();
                $("#errorMsg").html(resultRes.message);
                $('html, body').animate({ scrollTop: $('.navbar-expand-md').offset().top }, 'slow');
                return false;
            }

        });

        }






    }




    function removeRuleRowThen(tablenumber, rownumber) {
        if (confirm('Are you sure to remove this record')) {
            $('#nonCustmOprFieldForThen_' + tablenumber + '_' + rownumber).remove();

        }
    }



    function removeRuleTableThen(tablenumber) {
        if (confirm('Are you sure to remove this record')) {
            $('#tableaddRecorderThen_'+tablenumber).remove();

        }
    }




    function removeCustomCodeThen(tablenumber) {
        if (confirm('Are you sure to remove this record')) {
            $('#tableaddRecorderThen_'+tablenumber).remove();

        }
    }



    function getruleType(){
        var ruleTypeSelected=$('#ruleType').val();
        if(ruleTypeSelected=='NORMAL'){
          $('.templateTypeOption').hide();
        }
        if(ruleTypeSelected=='TEMPLATE'){
        $('.templateTypeOption').show();
        }
        
    }



    function setvalueForTemplate(tableno,rowno){
        var templateDropValue=$('#templateDropDown_'+tableno+'_'+rowno).val();
        if(templateDropValue=='Variable'){
            $('#ruleValue_'+tableno+'_'+rowno).val('%%');
        }else{
            $('#ruleValue_'+tableno+'_'+rowno).val('');
        }
    }




    function getDataTypeThen(tablenum, obj) {
        var tableno = tablenum//parseInt($("#indexValue").val()-1);
        var chooseField = $('#ChoosenFieldThen_'+ tableno+'_'+ obj).val();
        var fieldFor = '';
        fieldFor = $('#fieldForThen_' + tableno).val()
        $('#fieldForThen_' + tableno).val(fieldFor);
        var nameSpace = $('#customObjects').val();
        if (chooseField != '') {
            if(fieldFor!='FieldsThen' && fieldFor!='Function Call'){
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

            }else{
                var dataType=PClevel.jupiterMetaData.result.field[chooseField].datatype;
                $('#dataTypeOfFieldThen_' + tableno + '_' + obj).val(dataType);
            }

             

        } 


    }




    function createInnertableCustomObject(tablenum){
      

       var totalSep = $("#indexValue").val();
        var tableno = parseInt(totalSep)-1;
        //var prevTableNo= tableno-1
        var newRow = parseInt(totalSep);
        var idCount = 0;
        var sepHtml = '';
        var childTableNo=$('#ChildTableNumOfMasterTableNo_'+tableno).val()
          childTableNo=parseInt(childTableNo)+1;
        

        
        sepHtml += '<table class="table table-vcenter table-mobile-md card-table" id="tableaddRecorderChild_'+tableno+'_'+childTableNo+'" style="border: 1px solid #c2c2c2;margin-top:20px;">';
        sepHtml += '<thead>';
        sepHtml += '<tr class="tableHead_' + tableno + '_'+childTableNo+'">';
        sepHtml += '<th id="tableHeadRow_' + tableno + '_'+childTableNo+'" colspan="8">';   

        sepHtml += '<span class="FieldsHeading_' + tableno + '_'+childTableNo+' hide">';
        sepHtml += '<b>Fields</b>';
        sepHtml += '</span>';

        sepHtml += '<span class="FunctionsHeading_' + tableno + '_'+childTableNo+' hide">';
        sepHtml += '<b>Functions</b>';
        sepHtml += '</span>';

        sepHtml += '<span id="thheadSecondary_'+tableno+'_'+childTableNo+'_0" data-bs-toggle="modal" data-bs-target="#modal-ForFieldsLevel" class="btn--primary links" type="button" onclick="fieldModelPopUpInbetween('+tableno+');"></span>';
        sepHtml += '</th>';
        sepHtml += '<th id="" width="5%"><span id="remove_1" onclick="removeRuleTable('+tableno+')"><svg width="24" height="24" fill="#aa1818" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m3.707-11.707a.999.999 0 0 0-1.414 0L10 8.586 7.707 6.293a.999.999 0 1 0-1.414 1.414L8.586 10l-2.293 2.293a.999.999 0 1 0 1.414 1.414L10 11.414l2.293 2.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l2.293-2.293a.999.999 0 0 0 0-1.414"> </path></svg></span></th>';

        sepHtml += '</tr>';
        sepHtml += '</thead>';
        sepHtml += '<tbody>';

        sepHtml += '<tr class="cusOpr_' + tableno + '_'+childTableNo+' hide">';
        sepHtml += '<td colspan="7">';
        sepHtml += '<div class="row">';
        sepHtml += '<div class="col-lg-2">';
        sepHtml += '<label align="center" for="" style="margin-top: 10px;">';
        sepHtml += '<b>Custom Operation</b></label>';
        sepHtml += '</div>';
        sepHtml += '<div class="col-lg-2" style="margin-bottom:10px;">';
        sepHtml += '<input readonly type="text" class="form-control" id="cusOperation_' + tableno + '_'+childTableNo+'" name="customOperation_'+tableno+'_'+childTableNo+'[]">';
         
        sepHtml += '</div>';
        sepHtml += '</td>';

        sepHtml += '<tr class="cusOprAppliedOnField_' + tableno + '_'+childTableNo+' hide">';
        sepHtml += '<td colspan="7">';
        sepHtml += '<label align="center" for="" style="margin:5px 0px;color:#e16b08">';
        sepHtml += '<b>On Field:</b></label>';
        sepHtml += '<div class="row">';
        sepHtml += '<div class="col-lg-2">';
        sepHtml += '<label align="center" for="" style="margin-top: 10px;">';
        sepHtml += '<b>Field Name</b></label>';
        sepHtml += '</div>';

        sepHtml += '<div class="col-lg-4">';
        sepHtml += '<input style="width:250px;" list="browt_customOprFieldName_' + tableno + '_'+childTableNo+'" id="cusOperationAppliedOnField_' + tableno + '_'+childTableNo+'" name="cusOperationAppliedOnFieldChild[]" class="form-control required">';
        sepHtml += '<datalist id="browt_customOprFieldName_' + tableno + '_'+childTableNo+'">';
        sepHtml += '</datalist>';
        sepHtml += '</div>';
        sepHtml += '</div>';
        sepHtml += '</td>';
        sepHtml += '</tr>';

        sepHtml += '<tr class="cusOpr_' + tableno + '_'+childTableNo+' hide">';
        sepHtml += '<td colspan="7" style="background: #eee;">';
        sepHtml += '<label align="center" for="" style="margin:10px 0px; ">';
        sepHtml += '<b>Condition</b>';
        sepHtml += '</label>';
        sepHtml += '</td>'
        sepHtml += '</tr>'

        sepHtml += '<input type="hidden" id="totalRules_' + tableno + '_'+childTableNo+'" name="totalRules" value="0"/>';
        sepHtml += '<tr id="tableRowChild_' + tableno +'_'+childTableNo+'_'+idCount+'">';
        
        sepHtml += '<td>';
        sepHtml += '<select name="OpeningBrackets_'+tableno+'_'+childTableNo+'[]" id="OpeningBrackets_' + tableno + '_'+childTableNo+'_' + idCount + '" class="form-control form-select">';
        sepHtml += '<option value=""> Opening Bracket </option>';
        sepHtml += '<option value="Yes">(</option>';
        sepHtml += '</select>';
        sepHtml += '</td>';

        sepHtml += '<td class="ChooseFieldCls_' + tableno + '_'+childTableNo+'_' + idCount + '">';
        sepHtml += '<input list="browt_ChooseField_' + tableno + '_'+childTableNo+'_' + idCount + '" name="ChooseField_'+tableno+'_'+childTableNo+'[]" id="ChooseField_' + tableno + '_'+childTableNo+'_' + idCount + '" class="form-control required" onchange="getallowedActions(' + tableno + ',' + idCount + ')" placeholder="Field">';
        sepHtml += '<datalist id="browt_ChooseField_' + tableno + '_'+childTableNo+'_' + idCount + '">';
        sepHtml += '</datalist>';
        sepHtml += '<input type="hidden" id="fieldFor_' + tableno + '_'+childTableNo+'_' + idCount + '" name="fieldForChild_' + idCount + '" value=""/>';
         sepHtml +='<input type="hidden" id="dataTypeOfField_' + tableno + '_'+childTableNo+'_' + idCount + '" name="dataTypeOfFieldChild_' +tableno+'_'+childTableNo+'[]" value="" /> ';

        sepHtml += '</td>';

        sepHtml += '<td class="FunctionClsDrop_' + tableno + '_'+childTableNo+'_' + idCount + ' hide">';
        sepHtml += '<input list="browt_AllFunction_' + tableno + '_'+childTableNo+'_' + idCount + '" name="allFunctionsChild_'+tableno+'_'+childTableNo+'[]" id="allFunctions_' + tableno + '_'+childTableNo+'_' + idCount + '" class="form-control required" onchange="getallowedActions(' + tableno + ',' + idCount + ')" placeholder="Function">';
        sepHtml += '<datalist id="browt_AllFunction_' + tableno + '_'+childTableNo+'_' + idCount + '">'
        sepHtml += '</datalist>'
        sepHtml += '</td>'


        sepHtml += '<td class="FunctionClsDrop_' + tableno + '_'+childTableNo+'_' + idCount + ' hide">';
        sepHtml += '<input type="text" class="form-control" name="functionParameter_'+tableno+'_'+childTableNo+'[]" placeholder="Parameter" value="" id="functionParameter_' + tableno + '_'+childTableNo+'_' + idCount + '">';
        sepHtml += '</td> ';


        sepHtml += '<td>';

        sepHtml += '<input list="browt_condition_' + tableno + '_'+childTableNo+'_' + idCount + '" name="condition_'+tableno+'_'+childTableNo+'[]" id="condition_' + tableno + '_'+childTableNo+'_' + idCount + '" class="form-control required" placeholder="Condition">';
        sepHtml += '<datalist id="browt_condition_' + tableno + '_'+childTableNo+'_' + idCount + '">';
        sepHtml += '</datalist>';

        sepHtml += '</td>';

        sepHtml += '<td class="templateTypeOption hide">';
        sepHtml += '<select name="templateDropDown_'+tableno+'_'+childTableNo+'[]" id="templateDropDown_' + tableno + '_'+childTableNo+'_' + idCount + '" class="form-control form-select" onchange="setvalueForTemplate('+tableno+','+idCount+');">';
        sepHtml += '<option value="Value">Value</option>';
        sepHtml += '<option value="Variable">Variable</option>';
        sepHtml += '</select>';
        sepHtml += '<td>';


        sepHtml += '<td>';
        sepHtml += '<input type="text" class="form-control" name="rulevalue_'+tableno+'_'+childTableNo+'[]" placeholder="Value" value="" id="ruleValue_' + tableno + '_' + idCount + '">';
        sepHtml += '</td> ';

        sepHtml += '<td>';
        sepHtml += '<select name="ClosingBrackets_'+tableno+'_'+childTableNo+'[]" id="ClosingBrackets_' + tableno + '_'+childTableNo+'_' + idCount + '" class="form-control form-select">';
        sepHtml += '<option value=""> Closing Bracket </option>';
        sepHtml += '<option value="Yes">)</option>';
        sepHtml += '</select>';
        sepHtml += '</td>';

        sepHtml += '<td>';
        sepHtml += '<select name="Operator_'+tableno+'_'+childTableNo+'[]"';
        sepHtml += 'id="operator_' +tableno+'_'+childTableNo+'_' + idCount + '" class="form-control form-select">';
        sepHtml += '<option value=""> Operator </option>';
        sepHtml += '<option value="&&">AND</option>';
        sepHtml += '<option value="||">OR</option>';
        sepHtml += '<option value="&& !">AND NOT</option>';
        sepHtml += '<option value="|| !">OR NOT</option>';
        sepHtml += '</select>';
        sepHtml += '</td>';



        sepHtml += '<td class="remove">';
        sepHtml += '<span id="remove_' + tableno + '_'+childTableNo+'_' + idCount + '" onclick="removeRuleRow(' + tableno + ',' + idCount + ')">';
        sepHtml += '<svg width="24" height="24" fill="#aa1818" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m3.707-11.707a.999.999 0 0 0-1.414 0L10 8.586 7.707 6.293a.999.999 0 1 0-1.414 1.414L8.586 10l-2.293 2.293a.999.999 0 1 0 1.414 1.414L10 11.414l2.293 2.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l2.293-2.293a.999.999 0 0 0 0-1.414"></path></svg>';
        sepHtml += '</span>';
        sepHtml += '</td>';
        sepHtml += '</tr>';

        sepHtml += '</tbody>';

        sepHtml += '<tfoot>';
        sepHtml += '<tr>';
        sepHtml += '<td id="tableBottomRow_'+tableno+'_'+childTableNo+'" colspan="8"></td>';
        sepHtml += '<td>';
        sepHtml += '<div class="exchangeorderbtnWhenAdd">';
        sepHtml += '<span id="addrulebutton_'+tableno+'_'+childTableNo+'" value="" class="btn--primary" data-bs-toggle="modal" data-bs-target="#modal-AddFunOrField" type="button" onclick="addMoreRuleForTableNumChild('+tableno+')">';
        sepHtml += '<svg fill="#206bc4" width="24" height="24" viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true">';
        sepHtml += '<path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M8.996 8.996V7.008c.001-.043 0-.054.004-.097.044-.449.423-.845.879-.9.094-.011.115-.007.145-.007.043.002.054.002.097.007.448.054.834.442.879.9.004.043.003.054.004.097v1.988h1.992l.048.001c.49.035.918.441.954.93.039.545-.424 1.063-1.002 1.077h-1.992V13a1.04 1.04 0 0 1-.648.939c-.584.221-1.327-.217-1.359-.891L8.996 13v-1.996H7.004c-.511-.012-.966-.435-1.002-.931-.038-.53.396-1.049.954-1.076l.048-.001h1.992z"></path>';
        sepHtml += '</svg>';
        sepHtml += '</span>';
        sepHtml += '<input type="hidden" id="tableType_'+tableno+'_'+childTableNo+'" name="tableType[]" value="" />';
        sepHtml += '</div>';
        sepHtml += '</td>';
        sepHtml += '</tr>';


        sepHtml += '<tr class="cusOprAction_' + tableno + '_'+childTableNo+' hide">'
            sepHtml += '<td colspan="7">';
            sepHtml += '<div class="col-md-2" style="margin:5px 0px; color:#e16b08">';
            sepHtml += '<label align="left" class="form-label no-padding-right" >';
            sepHtml += '<b>Logic:</b>';
            sepHtml += '</label>';
            sepHtml += '</div>';
            sepHtml += '<div class="row">';
            sepHtml += '<div class="cusOprAction_' + tableno + '_'+childTableNo+' col-md-2 hide" style="margin-bottom:10px;margin-left:10px;">';
            sepHtml += '<label align="center" class="form-label no-padding-right" >';
            sepHtml += '<b>Custom Operators</b></label>';
            sepHtml += '<div class="input-group input-group-flat">';
            sepHtml += '<input list="browt_customOperationsAction_' + tableno + '_'+childTableNo+'" id="cusOperationAction_' + tableno + '_'+childTableNo+'" name="customOperationAction_'+tableno+'_'+childTableNo+'[]" class="form-control required" style="margin-bottom:20px;">';
            sepHtml += '<datalist id="browt_customOperationsAction_' + tableno + '">';
            sepHtml += '</datalist>';
            sepHtml += '</div>';
            sepHtml += '</div>';
            sepHtml += '<div class="cusOprActionValue_' + tableno + '_'+childTableNo+' col-md-2 hide" style="margin-bottom:10px;margin-left:10px;">';
            sepHtml += '<label align="center" class="form-label no-padding-right" >';
            sepHtml += '<b>Custom Operation Value</b></label>';
            sepHtml += '<div class="input-group input-group-flat">';
            sepHtml += '<input type="text" class="form-control" id="cusOperationActionValue_' + tableno + '_'+childTableNo+'" name="customOperationActionValue_'+tableno+'_'+childTableNo+'[]" value="" style="margin-bottom:20px;">';
            sepHtml += '</div>';
            sepHtml += '</div>';
            sepHtml += '</div>';
            sepHtml += '</td>';
        sepHtml += '</tr>';    
        sepHtml += '<tr class="customCodeForFieldLevel_' + tableno + '_'+childTableNo+' col-md-4 hide" >';
        sepHtml += '<td colspan="7">';
        sepHtml += '<h5>Custom Code</h5>';
        sepHtml += '<textarea  style="width:100%; height:50px" class="form-control" id="customCodeFieldLevel_' + tableno + '_'+childTableNo+'" name="customCodeFieldLevel_'+tableno+'_'+childTableNo+'" value=""></textarea>';
        sepHtml += '</td>';
        sepHtml += '</tr>';
        sepHtml += '</tfoot>';

        sepHtml += '</table>';

      
        
        return(sepHtml);
        

        


         
        //addnew row
       // console.log('HERER SEP HTML', sepHtml);
        //$("#sep_addWhenNew").append(sepHtml);

       // $("#remove_"+tableno+"_0").hide();
    }




    function appendNewTableForCustomObject(tablenum,tableDataHtml,fieldModelPopUpHeading){
        //here append table with row;
        //alert('TABLE NO=='+tablenum);
        $("#customObjectSubTable_"+tablenum).append(tableDataHtml);

       
        var childTablenum=parseInt($("#ChildTableNumOfMasterTableNo_"+tablenum).val());
        var heading='THERE IS '+fieldModelPopUpHeading+' WITH';
        //alert('tableNO is'+tablenum)
        //alert('childTablenum is'+childTablenum);
        var childTablenumForHeading=childTablenum+1
        $('#thheadSecondary_'+tablenum+'_'+childTablenumForHeading+'_0').text(heading);
        
        $('#ChildTableNumOfMasterTableNo_'+tablenum).val(childTablenum+1)
        

        $("#customObjectChildTable_"+tablenum).show();

    }


