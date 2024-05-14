var catlogProduct = (function () {
    // We keep these variables private inside this closure scope
    return {
        updateSyncWithLiveHandler: function(obj) {
          $(obj).parent().parent().parent().find('.spinner').attr("style","display:inline-flex");
          var sku = $(obj).parent().parent().attr('sku');
          $.ajax({
            method: "GET",
            url: "syncupdateprddetail/"+sku,
          }).done(function( msg ) {
              $(obj).parent().parent().parent().find('.spinner').attr("style","display:none");
              alert(msg);
          });
        },

        updateProductMetadata:function(syncurl,obj){
            $(obj).parent().parent().parent().parent().parent().find('.spinner').attr("style","display:inline-flex");
            var sku = $(obj).parent().parent().parent().parent().attr('sku');
            $.ajax({
              method: "GET",
              url: syncurl+"/"+sku,
            }).done(function( res ) {
                $(obj).parent().parent().parent().parent().parent().find('.spinner').attr("style","display:none");
                if(res.status){
                    if(typeof res.data.title != 'undefined' && res.data.title != ''){
                        $(obj).parent().parent().parent().parent().parent().find('.font-weight-medium').text(res.data.title);
                    }
                }
                alert(res.msg);
            });
        },

        testfunction:function(){

        }
    };
})();

$(document).ready(function(){
    //bind click event on sync Button
    $('.synclivebttn').click(function(){
        catlogProduct.updateSyncWithLiveHandler(this);
    });

    //bind click event on sync Button
    $('.synctagsbtn').click(function(){
        catlogProduct.updateProductMetadata('syncProductTags',this);
    });

    //bind click event on sync Button
    $('.synctitlebtn').click(function(){
        catlogProduct.updateProductMetadata('updateProductTitle',this);
    });
    
});





