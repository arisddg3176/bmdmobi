app.factory("ruangFactory", function($http){
 
    var factory = {};
 
    // read all products
    factory.readRuang = function(){
        return $http({
            method: 'GET',
            url: 'http://arisddg31.sman3kotasukabumi.sch.id/bmd-api/controller/ruang/read.php'
        });
    };
     
    // createProduct will be here
	// create product
	factory.createRuang = function($scope){
		return $http({
			method: 'POST',
			data: {
				'nama' : $scope.nama,
				'gedung' : $scope.gedung,
				'p' : $scope.p,
				'l' : $scope.l
			},
			url: 'http://arisddg31.sman3kotasukabumi.sch.id/bmd-api/controller/ruang/create.php'
		});
	};
 
	// readOneProduct will be here
	// read one product
	factory.readOneRuang = function(id){
		return $http({
			method: 'GET',
			url: 'http://arisddg31.sman3kotasukabumi.sch.id/bmd-api/controller/ruang/read_one.php?id=' + id
		});
	};
	 
	// updateProduct will be here
	// update product
	factory.updateRuang = function($scope){
	 
		return $http({
			method: 'POST',
			data: {
				'id' : $scope.id,
				'nama' : $scope.nama,
				'gedung' : $scope.gedung,
				'p' : $scope.p,
				'l' : $scope.l
			},
			url: 'http://arisddg31.sman3kotasukabumi.sch.id/bmd-api/controller/ruang/update.php'
		});
	};
 
	// deleteProduct will be here
	// delete product
	factory.deleteRuang = function(id){
		return $http({
			method: 'POST',
			data: { 'id' : id },
			url: 'http://arisddg31.sman3kotasukabumi.sch.id/bmd-api/controller/ruang/delete.php'
		});
	};
	 
	// searchProducts will be here
	// search all products
	factory.searchRuang = function(keywords){
		return $http({
			method: 'GET',
			url: 'http://arisddg31.sman3kotasukabumi.sch.id/bmd-api/controller/ruang/search.php?s=' + keywords
		});
	};
     
    return factory;
});