module.exports.signUpErrors = (err) => {
    let errors = { pseudo: '', email: '', password: ''};

    // Si err contient un message avec pseudo alors retourne le message d'erreur suivant
    if (err.message.includes("pseudo")) 
    errors.pseudo = "Pseudo incorrect ou déjà pris";

    // Idem + email
    if (err.message.includes("email"))
    errors.email = "Email invalide";

    // Idem + password
    if (err.message.includes("password"))
    errors.email = "Le mot de passe doit faire 4 caractères minimum"

    // Si err contient un code d'une valeur 11000 + une keyValue contenant email à l'intérieur retourne le message d'erreur suivant
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Adresse email déjà existante"

    return errors
};
