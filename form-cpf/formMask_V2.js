const input = document.querySelector("#cpf")
const mask = "___.___.___-__"
const char = "_"
const specialChars = [".", "-"]

input.addEventListener("focus", () => { //empty case, add mask and go to the beginning
    if(input.value == "" || input.value == mask) {
        input.value = mask
        input.setSelectionRange(0, 0) //cursor position
    }
})

input.addEventListener("keydown", e => {

    const backspace = (e.keyCode == 8)

    if(backspace) {
        const arrayCpf = input.value.split("")
        
        deleteValue(arrayCpf)
        e.preventDefault()
    }
})

input.addEventListener("keypress", e => {

    const numberKey = (!isNaN(e.key) && e.keyCode != 32) //keyCode == 32 == space key == number... yes, " " == 0

    if(numberKey) {
        const arrayCpf = input.value.split("")
        maskPattern(arrayCpf, e)
    }

    e.preventDefault()
})

input.addEventListener("paste", e => {

    const data = e.clipboardData.getData("text")

    onPasteCpf(data)

    e.preventDefault()
})

function maskPattern(arrayCpf, event) {

    let cursor = input.selectionStart
    
    for(let i=cursor; i<arrayCpf.length; i++) { //skip special chars on insert
        if(specialChars.indexOf(arrayCpf[i]) >= 0) {
            cursor++
        } else break
    }
    
    arrayCpf.splice(cursor, 1, event.key)
    
    insertValue(arrayCpf.join(""), cursor+1)
}

function insertValue(result, cursor) {
    if(result.length == mask.length) {
        input.value = result
        if(cursor >= 0) {
            input.setSelectionRange(cursor, cursor)
        }
    }
}

function deleteValue(arrayCpf) {

    const withoutSelectionRange = checkSelectionRange(arrayCpf) //true case, remove element by element... otherwise remove elements in the selection range

    if(withoutSelectionRange) {

        let cursor = input.selectionStart

        for(let i=0; i<arrayCpf.length; i++) { //skip special chars on delete
            if(specialChars.indexOf(arrayCpf[cursor-1]) >= 0) {
                cursor -= 1
            }else break
        }

        arrayCpf.splice(cursor-1, 1, char)
        insertValue(arrayCpf.join(""), cursor-1)
    }
}

function checkSelectionRange(arrayCpf) {

    if(input.selectionStart != input.selectionEnd) {

        let start = input.selectionStart
        let end = input.selectionEnd

        for(let i=start; i<end; i++) {

            let nonSpecialChar = specialChars.indexOf(arrayCpf[i]) < 0
            
            if(nonSpecialChar) {
                arrayCpf.splice(i, 1, char)
            }
        }

        insertValue(arrayCpf.join(""), start)

        return false
    }

    return true
}

function onPasteCpf(data) {
    
    const arrayCpf = mask.split("")
    const arrayInput = data.split("")
    const onlyNumbers = arrayInput.filter( value => !isNaN(value) && value != " " )
    const maskWithoutSpecialChars = arrayCpf.filter( value => value == char )
    const numberOfChars = maskWithoutSpecialChars.length

    for(let i=0; i<numberOfChars; i++) {

        let positionChar = arrayCpf.indexOf(char)
        let number = onlyNumbers[i] || char

        arrayCpf.splice(positionChar, 1, number)
    }

    input.value = ""
    insertValue(arrayCpf.join(""), arrayCpf.indexOf(char))
}