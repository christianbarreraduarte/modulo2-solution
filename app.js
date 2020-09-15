(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var unaLista = this;
  console.log(unaLista);
  unaLista.items = ShoppingListCheckOffService.getItemsPorComprar();

  unaLista.marcarComoComprado = function (indice) {
    ShoppingListCheckOffService.marcarComoComprado(indice);
  };
  unaLista.hayElementos = function () {
      var cuantos = ShoppingListCheckOffService.countItemsPorComprar();
      if (cuantos > 0)
      {
        return "Nothing bought yet"
      }
      else {
        return ""
      }
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var lista = this;
  lista.items = ShoppingListCheckOffService.getItemsComprados();

  lista.hayElementos = function () {
      var cuantos = ShoppingListCheckOffService.countItemsComprados();
      if (cuantos > 0)
      {
        return "Nothing bought yet"
      }
      else {
        return ""
      }
  }
}



function ShoppingListCheckOffService() {
  var service = this;
  var maxItems = 100;
  // Lists of shopping items
  var itemsPorComprar = [
    {name: "cheeses", quantity: "5" }
  ,{name: "chickens",quantity: "3"}
  ,{name: "burguers",quantity: "9"}
  ,{name: "sandwiches",quantity: "2"}
  ,{name: "meats",quantity: "2"}
  ,{name: "fishes",quantity: "12"}
  ,{name: "cakes",quantity: "10"}
  ,{name: "rices",quantity: "9"}
  ,{name: "vegetables",quantity: "6"}
  ,{name: "pizzas",quantity: "2"}
  ,{name: "breads",quantity: "1"}
  ,{name: "chocolates",quantity: "4"}
  ];
  var itemsComprados = [];

service.marcarComoComprado = function (itemIndexListaPorComprar){
  console.log(parseInt(itemIndexListaPorComprar,0));
  var indice = parseInt(itemIndexListaPorComprar,0);
  var elItem = itemsPorComprar[indice];
  console.log(indice);
  itemsPorComprar.splice(indice, 1);
  itemsComprados.push(elItem);
};

  service.agregarItem = function (itemName, quantity) {
    var unItem = {
      name: itemName,
      quantity: quantity
    };
    if ((maxItems === undefined) ||
        (maxItems !== undefined) && (itemsComprados.length < maxItems)) {
      itemsComprados.push(unItem);
    }
    else {
      throw new Error("Max items (" + maxItems + ") reached.");
    }
  };

  service.removerItem = function (itemIndex) {
    itemsPorComprar.splice(itemIndex, 1);
  };

  service.getItemsPorComprar = function () {
    //console.log("entrar");
    return itemsPorComprar;
  };

  service.getItemsComprados = function () {
    return itemsComprados;
  };

  service.countItemsPorComprar = function () {
    return itemsPorComprar.length;
  };
  service.countItemsComprados = function () {
    return itemsComprados.length;
  };
}

})();
