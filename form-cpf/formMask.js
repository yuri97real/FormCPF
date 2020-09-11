const cpf = document.querySelector("#cpf")

cpf.addEventListener("keyup", event => {
    let start = cpf.selectionStart //initial cursor position
    let end = cpf.selectionEnd //final cursor position
    //if the start and end positions of the cursor are the same, it means that there is no selection range
    if(start == end) { //this conditional prevents the function call when the user makes a selection range in the input EX:. keys (Ctrl + A)
        formMask("___.___.___-__", "_", event, start);
    }
})

function formMask(mask, char, event, cursor) {
    
    const vetMask = mask.split("") //transform mask into vector to use specific functions, like filter()
    const onlyNumbers = cpf.value.split("").filter(value => !isNaN(value) && value != " ")
    const key = event.keyCode || event.which
    const backspaceAndArrowKeys = [8, 37, 38, 39, 40] //code backspace and arrow keys
    const clickedOnTheBackspaceOrArrowsKeys = backspaceAndArrowKeys.indexOf(key) >= 0
    const charNoMod = [".", "-"] //characters that do not change
    const cursorIsCloseToCharNoMod = charNoMod.indexOf(vetMask[cursor]) >= 0

    onlyNumbers.forEach( (value) => vetMask.splice(vetMask.indexOf(char), 1, value)) //change '#' to numbers

    cpf.value = vetMask.join("")

    if(!clickedOnTheBackspaceOrArrowsKeys && cursorIsCloseToCharNoMod) { //increment the cursor if it is close to characters that do not change
        cpf.setSelectionRange(cursor+1, cursor+1)
    } else {
        cpf.setSelectionRange(cursor, cursor)
    }

    //i used google translate, sorry :D
}
