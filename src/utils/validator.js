const log4 = require('log4js');
const logger = log4.getLogger('');
logger.level = 'all';

//VALIDACIONES INDIVIDUALES
const validateIsString = (stringText, fieldName) => {
    if(typeof stringText !== 'string'){
        throw new Error(`${fieldName} must be a String`);
    }
}
const validateStringNameStructure = (stringNameStructure, fieldName) => {
    if(!/^[a-zA-ZáéíóúñÑ\s]+$/i.test(stringNameStructure)){
        throw new Error(`${fieldName} must contain letters, letters with accent, ñ and Ñ`);
    }
}
const validateStringMaxLength = (stringMaxLength, fieldName) => {
    if(stringMaxLength.length > 31){
        throw new Error(`${fieldName} must contain at most 30 characters`);
    }
}
const validateStringWithNumberStructure = (stringNumberText, fieldName) => {
    if(!/^[0-9a-zA-ZáéíóúñÑ\s]+$/i.test(stringNumberText)){
        throw new Error(`${fieldName} must contain letters, letters with accent, ñ, Ñ and Numbers`);
    }
}
const validateIDStructure = (IDStructure, fieldName) => {
    if(!/^[0-9a-fA-F]{24}$/i.test(IDStructure)){
        throw new Error(`${fieldName} must contain chracters from 0-9, a-f and A-F`);
    }
}
const validatePermissonCode = (permissonCode, fieldName) => {
    if(!/^[0-1]{6}$/i.test(permissonCode)){
        throw new Error(`${fieldName} only contain characters from 0 and 1`);
    }
}
const validateDeptoCode = (deptoCode, fieldName) => {
    if(!/^[0-9]{5}$/i.test(deptoCode)){
        throw new Error(`${fieldName} only contain characters from 0 and 9 and only 5 characters`);
    }
}
const validateDeptoNomStructure = (deptoNom) => {
    if(!/^[A-Z]{3}$/i.test(deptoNom)){
        throw new Error("Depto Nom only contain 3 characters between A and Z");
    }
}
const validateIsArray = (array, fieldName) => {
    logger.warn(Array.isArray(array));
    if(Array.isArray(array) === false){
        throw new Error(`${fieldName} must be a Array`);
    }
}
const validateArrayVoid = (arrayVoid, fieldName) => {
    if(arrayVoid.length == 0){
        throw new Error(`${fieldName} mus contain at least 1 item`);
    }
}
const validateFrontPath = (frontPath, fieldName) => {
    if(!/^[a-zA-ZáéíóúñÑ/\s]+$/i.test(frontPath)){
        throw new Error(`${fieldName} must contain letters, letters with accent, /, ñ and Ñ`);
    }
}
const validateLoCodeString = (loCodeString, fieldName) => {
    if(!/^[a-zA-ZáéíóúñÑ\s]{6}$/i.test(loCodeString)){
        throw new Error(`${fieldName} must contain only 6 characters including letters, letters with accent, space, ñ and Ñ`);
    }
}
const validateISOString = (isoString, fieldName) => {
    if(!/^[a-zA-ZáéíóúñÑ-\s]{5}$/i.test(isoString)){
        throw new Error(`${fieldName} must contain only 5 characters including letters, letters with accent, space, ñ and Ñ`);
    }
}
const validateIataString = (iataString, fieldName) => {
    if(!/^[a-zA-ZáéíóúñÑ-\s]{2}$/i.test(iataString)){
        throw new Error(`${fieldName} must contain only 2 characters including letters, letters with accent, space, ñ and Ñ`);
    }
}
const validatePassword = (password) => {
    if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i.test(password)){
        throw new Error(`Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter and at least 1 special character`);
    }
}
const validateEmailStructure = (email) => {
    if(!/^\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b$/i.test(email)){
        throw new Error(`Email must contain the next structure example@domain.com/cl/net`)
    }
}
const validateTextArea = (textArea, fieldName) => {
    if(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i.test(textArea)){
        throw new Error(`${fieldName} must not contain a url`);
    }
}
const validateDate = (date, fieldName) => {
    if(!/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/i.test(date)){
        throw new Error(`${fieldName} must contain the next structure dd/mm/yyyy`);
    }
}
const validateTaxDocument = (taxDocument, fieldName) => {
    if(!/^[0-9]+$/i.test(taxDocument)){
        throw new Error(`${fieldName} must contain characters from 0-9 and .`);
    }
}
const validateRUT = (rut, fieldName) => {
    if(!/^\d\d?\.?\d{3}\.?\d{3}\-[kK\d]$/i.test(rut)){
        throw new Error(`${fieldName} must contain the next structure 11.111.111-1 or 11111111-1`);
    }
}
const validateTelephone = (telephone, fieldName) => {
    if(!/^(?:(?:\+?56)?(?:[2-9]\d)\d{7,8})$/i.test(telephone)){
        throw new Error(`${fieldName} must be a chilean number`);
    }
}
const validateNumber = (numberChar, fieldName) => {
    if(typeof numberChar !== 'number'){
        throw new Error(`${fieldName} must be a Number`);
    }
}
const validateMaxNumber = (numberLimit, fieldName) => {
    if(numberLimit > 20){
        throw new Error(`${fieldName} must be less than 20`);
    }
}

module.exports = {
    validateIsString,
    validateStringNameStructure,
    validateStringMaxLength,
    validateIDStructure,
    validatePermissonCode,
    validateDeptoCode,
    validateDeptoNomStructure,
    validateIsArray,
    validateArrayVoid,
    validateStringWithNumberStructure,
    validateFrontPath,
    validateLoCodeString,
    validateISOString,
    validateIataString,
    validatePassword,
    validateEmailStructure,
    validateTextArea,
    validateDate,
    validateTaxDocument,
    validateRUT,
    validateTelephone,
    validateNumber,
    validateMaxNumber
}