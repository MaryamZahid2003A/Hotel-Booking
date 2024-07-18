import jwt from 'jsonwebtoken'


const generateToken= ((res,UserId)=>{

    const token=jwt.sign({UserId},process.env.SECRET_KEY,{expiresIn : '30d'})
    res.cookie('Auth hello',token,{
        httpOnly:true,
        Secure :process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 *60 *1000
    })

})

export default generateToken;