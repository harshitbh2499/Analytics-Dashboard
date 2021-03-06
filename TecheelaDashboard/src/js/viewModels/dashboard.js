/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['accUtils',
  'knockout',
  'ojs/ojbootstrap',
  'ojs/ojarraydataprovider', 
  'text!../data/basicData.json',
  'text!../quarterData/quarterData.json',
  'ojs/ojknockout',
  'ojs/ojnavigationlist',
  'ojs/ojswitcher',
  'ojs/ojradioset', 
  'ojs/ojlabel',
  'ojs/ojbutton', 
  'ojs/ojtoolbar', 
  'ojs/ojchart'],
 function(accUtils, ko, Bootstrap,ArrayDataProvider,data,quarterData) {

    function DashboardViewModel() {
      var self = this;
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */
      //line area chart JS begins here
          /* toggle button variables */
          self.stackValue = ko.observable('off');
          self.orientationValue = ko.observable('vertical');
          self.bardataProvider = new ArrayDataProvider(JSON.parse(data), {keyAttributes: 'id'});

          /*Js for the chart with animation for charts tab */
          /* toggle button variables */
          this.stackValue = ko.observable('off');
          this.orientationValue = ko.observable('vertical');
          this.dataProvider = new ArrayDataProvider(JSON.parse(data), {keyAttributes: 'id'});
          this.hiddenCategories = ko.observableArray(['Data Analytics']);
          this.categoryInfo = ko.pureComputed(function() {
            var categories = this.hiddenCategories();
            return categories.length > 0 ? categories.join(', ') : 'none';
          }.bind(this));

          //line chart JS file begin here
          /* toggle button variables */
         self.orientationValue = ko.observable('vertical');
         self.dataProvider = new ArrayDataProvider(JSON.parse(quarterData),{ keyAttributes: 'id'});



      self.selectedItem = ko.observable("home");
      self.currentEdge = ko.observable("top");
      self.valueChangedHandler = function (event) {
        var value = event.detail.value,
            previousValue = event.detail.previousValue,
            demoContianer = document.getElementById('demo-container');
        demoContianer.className = demoContianer.className.replace('demo-edge-' + previousValue, 'demo-edge-' + value);
      }
      // Populate some content
      var tabContentNodes = document.querySelectorAll('.demo-tab-content');
      var textNode = document.createElement('p');
      textNode.appendChild(document.createTextNode('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, risus ac interdum sollicitudin, sem erat ultrices ipsum, eget vehicula nibh augue sollicitudin ligula. Sed ullamcorper cursus feugiat. Mauris tristique aliquam dictum. Nulla facilisi. Nulla ut sapien sapien. Phasellus tristique arcu id ipsum mattis id aliquam risus sollicitudin.'));
      Array.prototype.forEach.call(tabContentNodes, function(tabContent) {
          for (var i = 0; i < 7; i++) {
            tabContent.appendChild(textNode.cloneNode(true));
          }
      });

      self.connected = function() {
        accUtils.announce('Incidents page loaded.', 'assertive');
        document.title = "Experience Center";
        // Implement further logic if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function() {
        // Implement if needed
      };



      function download()
  {
      var headers = {
      id: 'Id'.replace(/,/g, ''), // remove commas to avoid errors
      series: "Series",
      group: "Group",
      value: "Value"
  };

  var jsonObj = JSON.parse(data);
  itemsNotFormatted  = jsonObj;
  //alert(itemsNotFormatted);
  var itemsFormatted = [];
  //alert(itemsNotFormatted);

  //format the data
  itemsNotFormatted.forEach((item) => {
   // alert(item);
      itemsFormatted.push({
          id: item.id/*.replace(/,/g, '')*/, // remove commas to avoid errors,
          series: item.series,
          group: item.group,
          value: item.value
      });
  });


  var fileTitle = 'orders'; // or 'my-unique-title'
    // exportCSVFile(headers, itemsFormatted, fileTitle);
    exportCSVFile(headers, itemsFormatted, fileTitle);
      }

     function exportCSVFile(headers, items, fileTitle) {
      //alert("IT is Export to CSV");
    if (headers) {
        items.unshift(headers);
    }

    // Convert Object to JSON
    var jsonObject = JSON.stringify(items);

    var csv = convertToCSV(jsonObject);

    var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

}

  function convertToCSV(objArray) {
    alert("It is CSV");
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

      //Custom javascript code begins here
      self.clickedButton = ko.observable("(None clicked yet)");
      self.buttonClick = function(event){
      download();
      }.bind(self);

    }
    return DashboardViewModel;
  }
);
