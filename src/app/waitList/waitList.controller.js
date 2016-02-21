(function () {
    'use strict';

    angular
        .module('app.waitList')
        .controller('WaitListController', WaitListController);

    WaitListController.$inject = ['$firebaseArray'];

    function WaitListController($firebaseArray) {
        var vm = this;

        //Points to data at Firebase
        var fireParties = new Firebase('https://waitandeat-alan.firebaseio.com/parties');
        var fireTextMessages = new Firebase('https://waitandeat-alan.firebaseio.com/textMessages');

        function Party() {
            this.name = '';
            this.phone = '';
            this.size = '';
            this.done = false;
            this.notified = false;

        }

        // View model methods
        vm.newParty = new Party();
        vm.parties = $firebaseArray(fireParties);
        vm.addParty = addParty;
        vm.removeParty = removeParty;
        vm.sendTextMessage = sendTextMessage;

        function addParty() {
            vm.parties.$add(vm.newParty);
            vm.newParty = new Party();
        }

        function removeParty(party) {
            vm.parties.$remove(party);
        }

        function sendTextMessage(party) {
            var newTextMessage = {
                phoneNumber: party.phone,
                size: party.size,
                name: party.name
            };
            fireTextMessages.push(newTextMessage);
            party.notified = true;
            vm.parties.$save(party);
        }
    }

})();
