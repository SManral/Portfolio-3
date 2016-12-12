angular.module('myApp')
.controller('FlashcardsController', ['$scope','$http','$state', function($scope, $http, $state){

String.prototype.isEmpty = function() {
            return (this.length === 0 || !this.trim());
        };

        function Card(front, back){
            this.front = front;
            this.back = back;

            this.display = function(side){
                if( side === 0 ){
                    return this.front;
                }else{
                    return this.back;
                }
            };
        }

        var cardfunc = { 
            cards: [],
            cIndex: 0,
            cSide: 0,
            cButton: document.getElementById("cardButton"),
            cText: document.getElementById("cardText"),
            cPosition: document.getElementById("positionIndex"),

            addC:function(back, front){
                this.cards.push( new Card(back, front) );
            },
            updateC: function(){
                var curCard = this.cards[ this.cIndex ];
                this.cText.innerHTML = curCard.display( this.cSide );
                this.cPosition.innerHTML = (this.cIndex+1)+"/"+this.cards.length;
            },
            flipC: function(){
                this.cSide = (this.cSide + 1) % 2;
            },
            moveC: function(moveBy){
                this.cIndex += moveBy;
                if( this. cIndex < 0 ){
                    this.cIndex += this.cards.length;
                }
                this.cIndex = this.cIndex % this.cards.length;

                this.cSide = 0;
                this.updateC();
            },
            tapC: function(){
                this.flipC();
                this.updateC();
            }
        };

        $scope.moveC = function(moveBy) {debugger;
            cardfunc.moveC(moveBy);
        }

        $http.get('api/cards/get')
        .success(function(cards){
            $scope.listCards = cards;
            angular.forEach(cards, function(card){
                if(typeof card === "object") {
                    for (var i = 0; i < card.length ; i++) {

                        cardfunc.addC(card[i].front, card[i].back);
                    };
                    
                }
            });
            cardfunc.updateC();
        }).error(function(err){
            console.log(err);
        })
        $scope.addingCard = function(){debugger;
            var front = document.getElementById("newFront"),
                back = document.getElementById("newBack");
                var data = {'front':front.value, 'back':back.value};

            $http.post('api/cards/flashcards',data)
                .success(function(callback){debugger;
                if(front.value.isEmpty() || back.value.isEmpty() )
                    return;
            cardfunc.addC(callback.data.front,callback.data.back);
            front.value="";
            back.value="";
            cardfunc.updateC();  
            })
            .error(function(err){
                console.log(err);
            })
        }
        cardfunc.cButton.addEventListener('click', function(){ cardfunc.tapC();} );
    }]);
