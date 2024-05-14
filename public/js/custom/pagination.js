//function to generate Pagination UI.
function renderPaginationHTML(params){
    let currentPage = '';
    let queryUrl = '';
    let size = '';
    let pageCount = '';
    let originalUrl = params.originalUrl;
    if(typeof params.currentPage === 'undefined' || params.currentPage == '')
        currentPage = 1;
    else
        currentPage = parseInt(params.currentPage)

    if(typeof params.queryUrl !== 'undefined' || params.queryUrl != '')
    {
        queryUrl = params.queryUrl;
    }

    if(typeof params.size === 'undefined' || params.size == '')
        size = 1;
    else
        size = parseInt(params.size)

    if(typeof params.pageCount === 'undefined' || params.pageCount == '')
        pageCount = 1;
    else
        pageCount = parseInt(params.pageCount)

    let htmlToRender = "<span class=\"text-muted\" style='margin-left: 5px'>Total Page Count :"+ pageCount+ "</span>"
     htmlToRender += "<ul class=\"pagination float-right\" style='margin-bottom: 0px'>";
    if(currentPage > 1)
    {
        let prevPage = currentPage -1;
        htmlToRender+=" <li class=\"page-item\">\n" +
            "      <a class=\"page-link\" href="+originalUrl+"page="+prevPage+">«</a>\n" +
            "    </li>"
    }

   // let startPage = 0;
   //  let temp = 1;
   //  if(currentPage % size == 0) {
   //      startPage = currentPage
   //      temp = currentPage
   //  }
   //  if(currentPage % size > 0)
   //      startPage = temp
   //  // else if(currentPage % size > 0)
   //  //     startPage = currentPage + size
   //  let nextPageCounter = startPage+size;
   //  console.log('Start :', startPage)
   //  if((startPage+size) > pageCount)
   //  {
   //      nextPageCounter = pageCount;
   //  }
   //  console.log('nextPageCounter: ',nextPageCounter)
   //
   //  if(currentPage >= nextPageCounter -1) {
   //      startPage = nextPageCounter -1
   //      if((startPage+size) >= pageCount)
   //      {
   //          nextPageCounter = pageCount;
   //      }
   //      else
   //          nextPageCounter = startPage + size
   //  }

   let startPage = currentPage - Math.floor(size / 2);
    let endPage = (currentPage) + (Math.floor(size / 2));

    if (startPage <= 0) {
        endPage -= (startPage - 1);
        startPage = 1;
    }

    if (endPage > pageCount) {
        endPage = pageCount;
        if (endPage - size + 1 > 0) {
            startPage = endPage - size + 1;
        } else {
            startPage = 1;
        }
    }

    console.log('Start :', startPage)
    console.log('End :', endPage)
    for(let i = startPage; i<=endPage; i++)
    {
         if(i == currentPage)
            htmlToRender+=" <li class=\"page-item active\">\n" +
                "      <a class=\"page-link\" href="+originalUrl+"page="+i+">"+i+"</a>\n" +
                "    </li>"
        else if(i == endPage && i==currentPage)
             htmlToRender+=" <li class=\"page-item active\">\n" +
                 "      <a class=\"page-link\" href="+originalUrl+"page="+currentPage+">"+i+"</a>\n" +
                 "    </li>"
         else{
            htmlToRender+=" <li class=\"page-item\">\n" +
                "      <a class=\"page-link\" href="+originalUrl+"page="+i+">"+i+"</a>\n" +
                "    </li>"
        }
    }
 
    if((endPage > currentPage && pageCount>size) && endPage != pageCount)
    {
        let nextPage = 0;
        if(( currentPage + 1) < pageCount)
            nextPage = currentPage +1
        else
            nextPage = pageCount

            htmlToRender+=" <li class=\"page-item\">\n" +
                "      <a class=\"page-link\" href="+originalUrl+"page="+nextPage+">»</a>\n" +
                "    </li>"
    }

    htmlToRender+="</ul>";
    htmlToRender+="<div style='display: flex; align-items: center'><span class=\"text-muted\" style='margin: 5px'>Jump to pages: </span><input type='text' size='4' placeholder='page' id='goToText' class='form-control' style='width: 60px; text-align: center; margin-left: 5px; height: 30px; margin-top: 8px; margin-bottom: 8px'> <button class='btn btn-primary btn-sm' id='goToPage' style='height: 30px; margin-left: 5px'>GO</button></div>"
    return htmlToRender;
}

//jump on a specific page
function goToPages(params)
{
    let url = params.url;
    let page = params.page;
    url = url.replace(/&#x3D;/g,'=')
    url = url.replace(/&amp;/g,'&')
    window.location.href = url+"page="+page;
}
