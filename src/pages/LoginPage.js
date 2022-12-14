import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import logo from "../assets/images/logo.png"
import AppContext from "../context/AppContext"
import { ThreeDots } from 'react-loader-spinner'
import BASE_URL from "../constants/urls"




export default function LoginPage() {
    const { setUser } = useContext(AppContext)
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [disabled, setDisabled] = useState(false)

    //BÔNUS DE LOGIN AUTOMÁTICO

    useEffect(() => {

        if (localStorage.getItem("user")) {
            const user = localStorage.getItem("user")
            const userJSON = JSON.parse(user)
            setUser(userJSON)
            navigate("/hoje")
           
        }


        // eslint-disable-next-line react-hooks/exhaustive-deps     
    }, [])



    function login(e) {
        e.preventDefault()
        setDisabled(true)

        const body = {
            email,
            password
        }

        axios.post(`${BASE_URL}/auth/login`, body)
            .then((res) => {
                console.log(res.data)
                setUser({
                    image: res.data.image,
                    token: res.data.token
                })
                setDisabled(false)
                navigate("/hoje")
                //todayHabits(res.data.token)

            })
            .catch((err) => {
                alert(err.response.data.message)
                window.location.reload()
            })

    } 


    return (
        <LoginContainer>
            <Login>
                <img src={logo} alt="trackItLogo" />
                <div>
                    <form disabled={disabled} onSubmit={login}>
                        <input data-test="email-input" disabled={disabled} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" />
                        <input data-test="password-input" disabled={disabled} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="senha" />
                        <button data-test="login-btn" disabled={disabled} type="submit">{!disabled ? 'Entrar' :
                            <ThreeDots
                                color="#FFFFFF"
                                height="60"
                                width="60"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperClassName=""
                                visible={true}
                            />}</button>
                    </form>
                </div>
                <Link data-test="signup-link" to={"/cadastro"}>
                    <p data-test="signup-link" >Não tem conta? Cadastre-se</p>
                </Link>
            </Login>
        </LoginContainer>

    )
}

const LoginContainer = styled.div`
    margin: auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;  
        img {
            width: 180px;
            height: 178px;
        }
        form {
            display: flex;
            flex-direction: column;
            input {
                margin-bottom: 5px;
                width: 303px;
                height: 45px;
                border: 1px solid #D5D5D5;
                border-radius: 5px;
                padding: 7px;
                font-size: 16px;
                &::placeholder {
                    font-style: normal;
                    font-weight: 400;
                    font-size: 20px;
                    color: #DBDBDB;
                }
                &:disabled {
                    background-color: #CFCFCF;;
                }
            }
        }
        button {
            width: 303px;
            height: 45px;
            background: #52B6FF;
            border-radius: 5px;
            border-style: none;
            cursor: pointer;
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 20.976px;
            margin-bottom: 20px;
            color: #FFFFFF;          
            display: flex;
            justify-content: center;
            align-items: center;
             &:active {
                box-shadow: rgba(50, 50, 93, 0.25) 0px 10px 30px -12px inset, rgba(0, 0, 0, 0.3) 0px 10px 30px -18px inset;
             }

        }
        p {
           margin-top: 10px;
           font-weight: 400;
            font-size: 14px;
            text-decoration-line: underline;
            color: #52B6FF;
            cursor: pointer;
        }
`

const Login = styled.div`
     width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`


