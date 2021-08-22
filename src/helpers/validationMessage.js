exports.notEmpty = (field) => {
    return `${field} is required`;
}

exports.isEmail = (field) => {
    return `${field} must have valid email address`;
}

exports.isLength = (field, { min, max}) => {
    if(!max && min){
        return `${field} must must have minimum ${min} character`;
    }
    else if(!min && max){
        return `${field} must must have maximum ${max} character`;
    }else{
        return `${field} must have value between ${min} and ${max} character`;
    }
};