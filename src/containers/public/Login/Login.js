import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
export default function SignUp() {
    const nameRef = useRef(null);
    const passwordRef = useRef(null);
    const btnRef = useRef(null);
    const navigate = useNavigate();
    const Invalid = {
        name: (value = nameRef.current.value.trim()) => {
            if (value?.trim().length === 0) {
                nameRef.current.nextElementSibling.innerText = 'Vui lòng nhập trường này';
                return 0;
            } else {
                return 1;
            }
        },
        password: (value = passwordRef.current.value.trim()) => {
            if (value?.trim().length === 0) {
                passwordRef.current.nextElementSibling.innerText = 'Vui lòng nhập trường này';
                return 0;
            } else {
                return 1;
            }
        },
    };
    useEffect(() => {
        const HandleData = (e) => {
            e.preventDefault();
            let isSUb = true;
            for (let err in Invalid) {
                let kq = Invalid[err]();
                if (!kq) isSUb = false;
            }
            const data = {
                name: nameRef.current.value.trim(),
                password: passwordRef.current.value.trim(),
            };

            if (isSUb) {
                fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...data }),
                })
                    .then((response) => {
                        if (response.ok) {
                            navigate('/login');
                        } else {
                            // Handle the error if needed
                        }
                    })

                    .catch((error) => {});
            }
        };
        btnRef.current.addEventListener('click', HandleData);
        return () => {
            btnRef.current?.removeEventListener('click', HandleData);
        };
    }, []);
    return (
        <AuthContent>
            <form action="" method="post" id="login">
                <h3 className="heading">Sign up</h3>

                <div className="form-group">
                    <input
                        ref={nameRef}
                        type="text"
                        id="name"
                        name="name"
                        placeholder="tiểu nhi"
                        className="form-control"
                        onBlur={(e) => {
                            Invalid.name(e.target.value);
                        }}
                        onInput={(e) => {
                            nameRef.current.nextElementSibling.innerText = '';
                        }}
                    />
                    <span className="form-message"></span>
                </div>
                <div className="form-group">
                    <input
                        ref={passwordRef}
                        type="password"
                        id="password"
                        name="password"
                        placeholder="*********"
                        className="form-control"
                        onBlur={(e) => {
                            Invalid.password(e.target.value);
                        }}
                        onInput={(e) => {
                            passwordRef.current.nextElementSibling.innerText = '';
                        }}
                    />
                    <span className="form-message"></span>
                </div>

                <button className="submit" ref={btnRef}>
                    Submit
                </button>

                <div className="footer-login">
                    <p>
                        <Link to="/signup">Sign up</Link>
                    </p>
                </div>
            </form>
        </AuthContent>
    );
}

const AuthContent = styled.div`
    width: 100%;
    height: 100vh;
    background-image: url(https://1.bp.blogspot.com/-9NR1eQNjGK4/WazvmAqnphI/AAAAAAAAMXU/_7yvyipnecYZGWJnIULT-y7dOgbur9xZwCEwYBhgL/s1600/7730f1dc01b225319269cbc655cc1998.gif);
    background-repeat: no-repeat;
    //   background-color: #ccc;
    background-position: center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;

    #login {
        padding: 20px 36px;
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 10px;
        h3 {
            font-size: 36px;
            color: red;
            margin-bottom: 20px;
        }

        .form-group {
            margin-bottom: 20px;
            display: flex;
            flex-direction: column;
            input {
                width: 400px;
                padding: 10px 20px;
                border-radius: 10px;
                border: none;
                outline: none;
                font-size: 18px;
            }

            .form-message {
                color: red;
            }
        }
        .submit {
            width: 100%;
            padding: 10px 20px;
            background-color: #663300;
            color: #fff;
            font-size: 24px;
            cursor: pointer;
            margin-bottom: 20px;
        }

        .footer-login {
            display: flex;
            justify-content: space-between;
        }
    }
`;
