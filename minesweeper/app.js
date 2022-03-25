document.addEventListener('DOMContentLoaded', () => {

const grid = document.querySelector('.grid')
let width = 10
let bombAmount = 20
let isGameOver = false

//create board
function createBoard(){
    // game array with random bombs
    let count = 1
    let gameArray = []
    let squares=[]
    for (let i =0;i<10; i++){
        gameArray[i]=[]
        
        for(let j= 0; j < 10; j++){
            gameArray[i][j]='valid'
           
        }
    }
    
    while (count<=20){
        row = Math.floor(Math.random() * 10)
        //console.log(row)
        col = Math.floor(Math.random() * 10)
        //console.log(col)
        //console.log(gameArray[row][col])
        if (gameArray[row][col]== 'valid'){
            gameArray[row][col]='bomb'
            
            count+=1
           
        }
    }
    //console.log(gameArray)
   

    for(let i= 0; i<10; i++){
        squares[i]=[]
        for(let j = 0; j<10; j++){
            squares[i][j] = document.createElement('div')
            adr = i.toString() + j.toString()
            squares[i][j].setAttribute('id',parseInt(adr))
            squares[i][j].setAttribute('row',parseInt(i))
            squares[i][j].setAttribute('col',parseInt(j))
            squares[i][j].classList.add(gameArray[i][j])
            grid.appendChild(squares[i][j])
            //console.log(squares[i][j])
            squares[i][j].addEventListener('click', function(e){
                click(squares[i][j])
            })
            squares[i][j].addEventListener('contextmenu', function(e){
                rightclick(squares[i][j])
            })
        }
        
    }
    console.log(squares)
    for(let i= 0; i<10; i++){
        for(let j = 0; j<10; j++){
            let total = 0 
            console.log(squares[i][j])
            if (squares[i][j].classList.contains('valid')){
                if(i-1>=0 && i-1<=9  ){
                    if(squares[i-1][j].classList.contains('bomb')){
                        total+=1
                    }
                }
                if(j-1>=0 && j-1<=9 && i-1>=0 && i-1<=9 ){
                    if(squares[i-1][j-1].classList.contains('bomb')){
                        total+=1
                    }
                }
                if(j-1>=0 && j-1<=9 ){
                    if(squares[i][j-1].classList.contains('bomb')){
                        total+=1
                    }
                }
                if(j-1>=0 && j-1<=9 && i+1>=0 && i+1<=9){
                    if(squares[i+1][j-1].classList.contains('bomb')){
                        total+=1
                    }
                }
                if(i+1>=0 && i+1<=9 ){
                    if(squares[i+1][j].classList.contains('bomb')){
                        total+=1
                    }
                }
                if(i+1>=0 && i+1<=9 && j+1>=0 && j+1<=9 ){
                    if(squares[i+1][j+1].classList.contains('bomb')){
                        total+=1
                    }
                }
                if(j+1>=0 && j+1<=9 ){
                    if(squares[i][j+1].classList.contains('bomb')){
                        total+=1
                    }
                }
                if(j+1>=0 && j+1<=9 && i-1>=0 && i-1<=9 ){
                    if(squares[i-1][j+1].classList.contains('bomb')){
                        total+=1
                    }
                }
                
                squares[i][j].setAttribute('data',parseInt(total))

            }
            
        }
    }
    


//add numbers


}
createBoard()

function click(square){
    if (isGameOver) return
    if( square.classList.contains('checked') || square.classList.contains('flag')) return
    if(square.classList.contains('bomb')){
        alert('Game Over')
    }
    else
    {
        let total = square.getAttribute('data')
        if (total != 0){
            square.classList.add('checked')
            square.innerHTML = total
            return
        }
        else{
            square.classList.add('checked')
            let i  = parseInt(square.getAttribute('row'))
            let j  = parseInt(square.getAttribute('col'))
            let adr
            setTimeout (() => {
                if(i-1>=0 && i-1<=9  ){
                    adr = (i-1).toString() + j.toString()
                    click(document.getElementById(parseInt(adr)))
                }
                if(j-1>=0 && j-1<=9 && i-1>=0 && i-1<=9 ){
                    adr = (i-1).toString() + (j-1).toString()
                    click(document.getElementById(parseInt(adr)))
                }
                if(j-1>=0 && j-1<=9 ){
                    adr = i.toString() + (j-1).toString()
                    click(document.getElementById(parseInt(adr)))
                }
                if(j-1>=0 && j-1<=9 && i+1>=0 && i+1<=9){
                    adr = (i+1).toString() + (j-1).toString()
                    click(document.getElementById(parseInt(adr)))
                }
                if(i+1>=0 && i+1<=9 ){
                    adr = (i+1).toString() + j.toString()
                    click(document.getElementById(parseInt(adr)))
                }
                if(i+1>=0 && i+1<=9 && j+1>=0 && j+1<=9 ){
                    adr = (i+1).toString() + (j+1).toString()
                    click(document.getElementById(parseInt(adr)))
                }
                if(j+1>=0 && j+1<=9 ){
                    adr = i.toString() + (j+1).toString()
                    click(document.getElementById(parseInt(adr)))
                }
                if(j+1>=0 && j+1<=9 && i-1>=0 && i-1<=9 ){
                    adr = (i-1).toString() + (j+1).toString()
                    click(document.getElementById(parseInt(adr)))
                }
            },50)
        }
            
        
    }

}
function rightclick(square){
    if (isGameOver) return
    if( square.classList.contains('checked')){
        return
    }
    if(square.classList.contains('flag')){
        square.classList.remove('flag')
    }
    else{
        square.classList.add('flag')
    }

}





})