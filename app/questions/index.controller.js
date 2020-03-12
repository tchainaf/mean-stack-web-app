(function () {
    'use strict';

    angular
        .module('app')
        .controller('Questions.IndexController', Controller);

    function Controller($window, QuestionService, FlashService) {
        console.log("start controller");
        var vm = this;

        vm.userId = null;
        vm.questions = null;
        vm.newQuestion = null;
        vm.saveQuestion = saveQuestion;
        vm.deleteQuestion = deleteQuestion;

        getUser();

        function getUser() {
            // get current user data in the API
            QuestionService.GetUserId().then(function (userId) {
                vm.userId = userId;
                getQuestionList();
            });
        }

        function getQuestionList() {
            QuestionService.GetAll().then(function (items) {
                console.log(items);
                vm.questions = items;
            });
        }

        function saveQuestion() {
            vm.newQuestion.userId = vm.userId;
            QuestionService.Create(vm.newQuestion)
                .then(function () {
                    FlashService.Success('Question saved');
                    getQuestionList();
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function deleteQuestion(_id) {
            QuestionService.Delete(_id)
                .then(function () {
                    FlashService.Success('Question deleted');
                    getQuestionList();
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }
})();