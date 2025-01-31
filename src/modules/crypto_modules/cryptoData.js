import CryptoJS from "crypto-js"

const SECRET_KEY =  process.env.LOGIN_ENCRIPTION_KEY || "fallback-secret-key"

export const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString()
}

export const decryptData = (cipherText) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY)
    try {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    } catch(err) {
        console.error("Decription Failed", err)
        return null
    }
}