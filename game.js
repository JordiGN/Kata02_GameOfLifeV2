
class celula {

    constructor(life, neighbors) {
        this.life = life;
        this.neighbors = neighbors;
      }
    // CONDICIONES PARA LA CELULA
    // 1 = VIVO    0 = MUERTO

    getLife() {
        return this.life;
    }

    setLife(life){
        this.life=life;
    }

    setNeighbors(Neighbors) {
        this.neighbors = Neighbors;
    }

    getNumCell() {
        if (this.life == 0) {
            return '.';
        } else {
            return '*';
        }
    }

    getNeighbors() {
        return this.neighbors;
    }

}
var numX = 0, numY = 0;
var resultBoard = '';
var cell;
let arrayCells;
let loopControler=0;

play();
function play(){
    initGame();
}
//setTimeout(iteration(array),1000);

function initGame(){
    //let arrayCells;
    resultBoard = '';
    numX = parseInt(prompt('Ingrese el numero de filas: '));
    numY = parseInt(prompt('Ingrese el numero de columnas: '));
    arrayCells = new Array(numX);
    for (i = 0; i < arrayCells.length; i++) {
        arrayCells[i] = new Array(numY);
    }

    for (let x = 0; x < numX; x++) {
        for (let y = 0; y < numY; y++) {
            var randomvar = Math.random();
            if (randomvar >= 0.5) {
                cell = new celula(0, 0);
                arrayCells[x][y] = cell;
            } else {
                cell = new celula(1, 0);
                arrayCells[x][y] = cell;
            }
            resultBoard+= arrayCells[x][y].getNumCell();
        }
        resultBoard += '\n';
    }
    newArray=arrayCells;
    console.log(resultBoard);
    iteration(arrayCells);
}

function iteration(ParamarrayCells){
    console.log('Generacion '+loopControler+' :');
    for (var x = 0; x < ParamarrayCells.length; x++) {
        for (var y = 0; y < ParamarrayCells[x].length; y++) {
            let neighbors = 0;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    try {
                        
                        if (ParamarrayCells[x + i][y + j].getLife() == 1) {
                            if(ParamarrayCells[x][y].getLife() == 1 && i==0 && j==0){
                                //console.log('se conto solo');
                            }else{
                                neighbors++;
                            }
                            
                        }
                    } catch (e) {
                        
                    }
                }
            }
            ParamarrayCells[x][y].setNeighbors(neighbors);
            rulesLife(ParamarrayCells[x][y],x,y);
        }
    }
    loopControler++;
    showResult(newArray);
    if(loopControler<5){
        iteration(newArray);
    }
}

function rulesLife(cell,x,y) {
    
    //console.log("vecinos=" + neighbors + "   fila" + x + "  columna=" + y)
    if ((cell.getLife() == 1) && (cell.getNeighbors() < 2)) {
        newArray[x][y].setLife(0);         // Soledad
    } else if ((cell.getLife() == 1) && (cell.getNeighbors() > 3)) {
        newArray[x][y].setLife(0);         // Sobrepoblación
    } else if ((cell.getLife() == 0) && (cell.getNeighbors() == 3)) {
        newArray[x][y].setLife(1);         // Reproducción
    } else {
        newArray[x][y] = cell;
    }
}

function showResult(array){
    resultBoard = '';
    for (let x = 0; x < array.length; x++) {
        for (let y = 0; y < array[x].length; y++) {
            resultBoard += arrayCells[x][y].getNumCell();
        }
        resultBoard += '\n';
    }
    console.log(resultBoard);
}