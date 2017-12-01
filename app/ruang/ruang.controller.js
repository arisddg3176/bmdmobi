app.controller('ruangController', function($scope, $mdDialog, $mdToast, ruangFactory){
 
    // read ruang
    $scope.readRuang = function(){
 
        // use ruang factory
        ruangFactory.readRuang().then(function successCallback(response){
            $scope.ruang = response.data.records;
        }, function errorCallback(response){
            $scope.showToast("Tidak dapat membaca data.");
        });
 
    }
     
    // showCreateRuangForm will be here
	// show 'create Ruang form' in dialog box
	$scope.showCreateRuangForm = function(event){
	 
		$mdDialog.show({
			controller: DialogController,
			templateUrl: './app/ruang/create_ruang.template.html',
			parent: angular.element(document.body),
			clickOutsideToClose: true,
			scope: $scope,
			preserveScope: true,
			fullscreen: true // Only for -xs, -sm breakpoints.
		});
	}
 
	// createRuang will be here
	// create new Ruang
	$scope.createRuang = function(){
	 
		ruangFactory.createRuang($scope).then(function successCallback(response){
	 
			// tell the user new Ruang was created
			$scope.showToast(response.data.message);
	 
			// refresh the list
			$scope.readRuang();
	 
			// close dialog
			$scope.cancel();
	 
			// remove form values
			$scope.clearRuangForm();
	 
		}, function errorCallback(response){
			$scope.showToast("Tidak dapat menambah data.");
		});
	}
	// clear variable / form values
	$scope.clearRuangForm = function(){
		$scope.id = "";
		$scope.nama = "";
		$scope.gedung = "";
		$scope.p = "";
		$scope.l = "";
	}
	
	// show toast message
	$scope.showToast = function(message){
		$mdToast.show(
			$mdToast.simple()
				.textContent(message)
				.hideDelay(3000)
				.position("top right")
		);
	}
	// readOneRuang will be here
	// retrieve record to fill out the form
	$scope.readOneRuang = function(id){
	 
		// get Ruang to be edited
		ruangFactory.readOneRuang(id).then(function successCallback(response){
	 
			// put the values in form
			$scope.nama = response.data.nama;
			$scope.gedung = response.data.gedung;
			$scope.p = response.data.p;
			$scope.l = response.data.l;
			$scope.luas = response.data.luas;
	 
			$mdDialog.show({
				controller: DialogController,
				templateUrl: './app/ruang/read_one_Ruang.template.html',
				parent: angular.element(document.body),
				clickOutsideToClose: true,
				scope: $scope,
				preserveScope: true,
				fullscreen: true
			}).then(
				function(){},
	 
				// user clicked 'Cancel'
				function() {
					// clear modal content
					$scope.clearRuangForm();
				}
			);
	 
		}, function errorCallback(response){
			$scope.showToast("Tidak dapat membaca data.");
		});
	 
	}
	 
	// showUpdateRuangForm will be here
	// retrieve record to fill out the form
	$scope.showUpdateRuangForm = function(id){
	 
		// get Ruang to be edited
		ruangFactory.readOneRuang(id).then(function successCallback(response){
	 
			// put the values in form
			$scope.id = response.data.id;
			$scope.nama = response.data.nama;
			$scope.gedung = response.data.gedung;
			$scope.p = response.data.p;
			$scope.l = response.data.l;
	 
			$mdDialog.show({
				controller: DialogController,
				templateUrl: './app/ruang/update_ruang.template.html',
				parent: angular.element(document.body),
				targetEvent: event,
				clickOutsideToClose: true,
				scope: $scope,
				preserveScope: true,
				fullscreen: true
			}).then(
				function(){},
	 
				// user clicked 'Cancel'
				function() {
					// clear modal content
					$scope.clearRuangForm();
				}
			);
	 
		}, function errorCallback(response){
			$scope.showToast("Tidak dapat mengambil data.");
		});
	 
	}
 
	// updateRuang will be here
	// update Ruang record / save changes
	$scope.updateRuang = function(){
	 
		ruangFactory.updateRuang($scope).then(function successCallback(response){
	 
			// tell the user Ruang record was updated
			$scope.showToast(response.data.message);
	 
			// refresh the Ruang list
			$scope.readRuang();
	 
			// close dialog
			$scope.cancel();
	 
			// clear modal content
			$scope.clearRuangForm();
	 
		},
		function errorCallback(response) {
			$scope.showToast("Tidak Dapat memperbaharui data.");
		});
	 
	}
	 
	// confirmDeleteRuang will be here
	// cofirm Ruang deletion
	$scope.confirmDeleteRuang = function(event, id){
	 
		// set id of record to delete
		$scope.id = id;
	 
		// dialog settings
		var confirm = $mdDialog.confirm()
			.title('Anda Yakin?')
			.textContent('Ruang akan dihapus.')
			.targetEvent(event)
			.ok('Ya')
			.cancel('Tidak');
	 
		// show dialog
		$mdDialog.show(confirm).then(
			// 'Yes' button
			function() {
				// if user clicked 'Yes', delete Ruang record
				$scope.deleteRuang();
			},
	 
			// 'No' button
			function() {
				// hide dialog
			}
		);
	}
	// delete Ruang
	$scope.deleteRuang = function(){
	 
		ruangFactory.deleteRuang($scope.id).then(function successCallback(response){
	 
			// tell the user Ruang was deleted
			$scope.showToast(response.data.message);
	 
			// refresh the list
			$scope.readRuang();
	 
		}, function errorCallback(response){
			$scope.showToast("Tidak dapat menghapus data.");
		});
	 
	}
 
	// searchruang will be here
	// search ruang
	$scope.searchRuang = function(){
	 
		// use ruang factory
		ruangFactory.searchRuang($scope.ruang_search_keywords).then(function successCallback(response){
			$scope.ruang = response.data.records;
		}, function errorCallback(response){
			$scope.showToast("Tidak Dapat membaca data.");
		});
	}
     
    // DialogController will be here
	// methods for dialog box
	function DialogController($scope, $mdDialog) {
		$scope.cancel = function() {
			$mdDialog.cancel();
		};
	}
});