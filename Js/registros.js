  document.addEventListener("DOMContentLoaded", (event)=>{ 
    function initializeTable() {
      table = new Tabulator("#tabla", {
        layout: "fitData",
        columns: [],
        pagination: "local",
        paginationSize: 25,
        paginationSizeSelector: [10, 25, 50, 100],
        ajaxURL:
          "http://localhost:3000/api/logs",
        ajaxConfig: {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
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

  document.getElementById("download-csv").addEventListener("click", function(){
    table.download("csv", "data.csv");
});

document.getElementById("download-xlsx").addEventListener("click", function(){
  table.download("xlsx", "data.xlsx", {sheetName:"My Data"});
});

//trigger download of data.pdf file
document.getElementById("download-pdf").addEventListener("click", function(){
  table.download("pdf", "data.pdf", {
      orientation:"portrait", //set page orientation to portrait
      title:"Registros/Usuarios", //add title to report
  });
});