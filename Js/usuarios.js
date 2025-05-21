document.addEventListener("DOMContentLoaded", (event)=>{ 
    function initializeTable() {
      table = new Tabulator("#tabla", {
        layout: "fitData",
        columns: [],
        pagination: "local",
        paginationSize: 25,
        paginationSizeSelector: [10, 25, 50, 100],
        ajaxURL:
          "http://localhost:3000/api/perfiles",
        ajaxContentType: "json",
        ajaxResponse: function (url, params, response) {
          console.log(response);
          var columns = [];
          var headers = response.length > 0 ? Object.keys(response[0]) : [];
          headers.forEach((header) => {
            columns.push({ title: header, field: header, headerFilter: "input" });
          });
          table.setColumns(columns);
          return response;
        },
      });
  
      table.setData();
    }
    
    initializeTable()

  })