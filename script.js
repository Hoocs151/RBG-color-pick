const result = document.querySelector(".result input")
const hexCode = document.querySelector(".hex-code")
const copyBtn = document.querySelector("#copy-btn")
const randomBtn = document.querySelector("#random-btn")
const sliders = document.querySelectorAll(".wrapper input[type='range']")
const rColor = document.getElementById("red")
const gColor = document.getElementById("green")
const bColor = document.getElementById("blue")

const colorPicker = document.querySelector("#color-picker")

const pickColor = () => {
    const hex = colorPicker.value
    const rgb = hexToRgb(hex)
    rColor.value = rgb.r
    gColor.value = rgb.g
    bColor.value = rgb.b
    generateColor()
}

const hexInput = document.querySelector("#hex-input")

const updateColorFromHex = () => {
    const hex = hexInput.value
    const rgb = hexToRgb(hex)
    rColor.value = rgb.r
    gColor.value = rgb.g
    bColor.value = rgb.b
    generateColor()
}

hexInput.addEventListener("input", updateColorFromHex)

const hexToRgb = (hex) => {
    const r = parseInt(hex.substring(1,3), 16)
    const g = parseInt(hex.substring(3,5), 16)
    const b = parseInt(hex.substring(5,7), 16)
    return { r, g, b }
}

colorPicker.addEventListener("change", pickColor)

const generateColor = () => {
    let rColorValue = rColor.value
    let gColorValue = gColor.value
    let bColorValue = bColor.value

    let finalColor = `rgb(${rColorValue},${gColorValue},${bColorValue})`
    result.value = finalColor;
    hexCode.textContent = rgbToHex(rColorValue, gColorValue, bColorValue)
    document.body.style.background = finalColor
}

const copyColor = () => {
    result.select()
    // document.execCommand("copy")
    navigator.clipboard.writeText(result.value)
    copyBtn.innerHTML = "Copied"
    setTimeout(() => {
        copyBtn.innerHTML = '<i class="far fa-copy"></i>Copy Color Code'
    }, 1000)
}

const randomColor = () => {
    rColor.value = Math.floor(Math.random() * 256)
    gColor.value = Math.floor(Math.random() * 256)
    bColor.value = Math.floor(Math.random() * 256)

    generateColor()
}

const rgbToHex = (r, g, b) => {
    let hex = ((r << 16) | (g << 8) | b).toString(16)
    if (hex.length < 6) {
        hex = "0" + hex
    }
    return "#" + hex
}

sliders.forEach((slide) => {
    slide.addEventListener("input", generateColor)

})

window.addEventListener("load", generateColor)

copyBtn.addEventListener("click", copyColor)

randomBtn.addEventListener("click", randomColor)