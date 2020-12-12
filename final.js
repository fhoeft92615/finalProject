$(document).ready(
    function () {
        $("button").click(guessing);
        $("#formPage").hide();
        $("#requestConfirmation").hide();
        $("#gameBoard").hide();
        $("#submittedInfo").hide();
        $("#gameBtn").click(showGame);
        $("#homeBtn").click(showHome);
        $("#userInfoBtn").click(showForm);
        $("#submit_btn").click(submitForm);

        function showHome() {
            $("#formPage").hide();
            $("#requestConfirmation").hide();
            $("#gameBoard").hide();
            $("#home").show();
        }

        function showForm() {
            $("#formPage").show();
            $("#requestConfirmation").hide();
            $("#gameBoard").hide();
            $("#home").hide();
        }

        function showGame() {
            $("#formPage").hide();
            $("#requestConfirmation").hide();
            $("#gameBoard").show();
            $("#home").hide();
        }

        //initialize game objects
        //Listed 2x for matching game
        var pests = [
            "Pegacorn",
            "Leprechaun",
            "Mermaid",
            "Dragon",
            "Yeti",
            "Pixie",
            "Gnome",
            "Troll",
            "Pegacorn",
            "Leprechaun",
            "Mermaid",
            "Dragon",
            "Yeti",
            "Pixie",
            "Gnome",
            "Troll"
        ]
        pests = randomBoard(pests);

        var correctlyGuessed = []
        var cardsFlipped = 0;
        var lastCardGuessed = -1;
        displayBoard()

        function displayBoard() {
            pests.forEach((val, index) =>{
                var id = index + 1;
                if (correctlyGuessed.includes(val) || id == lastCardGuessed) {
                    $("#" + id).attr("class", val);
                } else {
                    $("#" + id).attr("class", "card");
                }

            })
        }

        function guessing() {
            if(this.id != lastCardGuessed) {
                cardsFlipped++;
                if (cardsFlipped < 2) {
                    lastCardGuessed = this.id;
                    displayBoard();
                }
                else {
                    if (pests[this.id - 1] == pests[lastCardGuessed - 1]) {
                        correctlyGuessed.push(pests[this.id - 1]);
                    }
                    lastCardGuessed = -1;
                    cardsFlipped = 0;
                    displayBoard();
                }
            }

        }

        //Board game is 4 across, 4 down

        //Board game is random every time
        function randomBoard(boardArray) {
            var currentIndex = boardArray.length, temp, randomIndex;

            while (currentIndex > 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                temp = boardArray[currentIndex];
                boardArray[currentIndex] = boardArray[randomIndex];
                pests[randomIndex] = temp;
            }
            return boardArray;
        }

        function submitForm() {
            var customerName = $("#name").val();
            var address = $("#address").val();
            var city = $("#city").val();
            var state = $("#state").val();
            var zip = $("#zipcode").val();
            var phone = $("#number").val();
            if(customerName == ""
                || address == ""
                || city == ""
                || state == ""
                || zip == ""
                || phone == "")
            {
                $("#errorMessage").text("Please fill out this form")
            }
            else {

                var pestType = $("#pestType").serializeArray();
                $("#formPage").hide();
                $("#submittedInfo").show();
                var selectedMonsters = "";
                pestType.forEach((item, index) => {
                    if(index == 0) {
                        selectedMonsters = item.value;
                    }
                    else{
                        selectedMonsters = selectedMonsters + ", " + item.value;
                    }

                })
                var message = "You entered: " + customerName + ", " + address + ", " + city + ", " + state + " " + zip +
                    " " + phone + ". Pests selected: " + selectedMonsters;
                $("#customerDeets").text(message);
            }

        }

    });