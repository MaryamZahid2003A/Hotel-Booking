import jwt from 'jsonwebtoken'


const generateToken= ((res,UserId)=>{

    const token=jwt.sign({UserId},'MARYAM123',{expiresIn : '30d'})
    res.cookie('jwt',token,{
        httpOnly:true,
        Secure :'development' === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 *60 *1000
    })

})

export default generateToken;