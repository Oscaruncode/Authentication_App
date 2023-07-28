function validateToken(header){
    if(!header["authorization"]){
        console.log("No Token", header)
        throw new Error("Token not provided")
    }

    const [bearer, token] = header["authorization"].split(" ")
    if(bearer !== "Bearer"){
        console.log("Token format invalid", token)
        throw new Error("Token format invalid")
    }
    return token

}