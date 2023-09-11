$(document).ready(function () {
    let aliments = [];
    
    let nomAliment = $("#nomAliment");
    let calories = $("#calories");
    let ajouterAliments = $("#ajouterAlimentBtn");
    let listeAliments = $("#listeAliments");
    let graphiqueCalories = $("#graphiqueCalories")
    

    
    ajouterAliments.on("click", function () {
        let nom = nomAliment.val();
        let calorie = parseInt(calories.val());
        var aliment = {
            nom: nom,
            calories: calorie
        };

        aliments.push(aliment);
        nomAliment.val("")
        calories.val("")      
        mettreAJourTableauAliments();
        mettreAJourGraphiqueCalorie()
    });
    
    listeAliments.on("click", ".supprimerAlimentBtn", function(){
        let index = $(this).data("index");
        aliments.splice(index, 1);
        mettreAJourTableauAliments()
        mettreAJourGraphiqueCalorie()
    })
    
    function mettreAJourTableauAliments() {
        listeAliments.empty();
        let totalCal = 0
        for (let i = 0; i < aliments.length; i++){
            let aliment = aliments[i]
            totalCal += aliment.calories 
            let tr = $("<tr>")
            tr.append("<td>"+ aliment.nom + "</td>")
            tr.append("<td>"+ aliment.calories + "</td>")
            tr.append("<td>"+ totalCal+ "</td>")
            tr.append('<td><button class="supprimerAlimentBtn" data-index="'+ i + '">Supprimer</button></td>')
            listeAliments.append(tr);
            
            
        }

    }


    function mettreAJourGraphiqueCalorie(){
        let labels = [];
        let data = [];

       
        $.each(aliments, function(index, aliment){
            labels.push(aliment.nom);
            data.push(aliment.calories);
        })

        if (typeof chart !== "undefined"){
            chart.destroy();
        }
        let ctx = graphiqueCalories[0].getContext("2d");
        chart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Calories Consommées",
                        data: data,
                        backgroundColor: "rgba(66, 133, 244, 0.6)"
                    }
                ]
            },

            options : {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }    
});
