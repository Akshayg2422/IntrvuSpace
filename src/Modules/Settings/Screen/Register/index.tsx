/* eslint-disable jsx-a11y/anchor-is-valid */
import { Divider, Button } from '@Components'
import React from 'react'
import { Input } from 'reactstrap'
import { LoginSideContent } from '../../Container'
import { useNavigation } from '@Hooks'
import { ROUTES } from '@Routes'

function Register() {
    const { goTo } = useNavigation()
    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <LoginSideContent />
                    <div className="col-sm-6 row align-items-center mx-auto pl-lg-8 pl-sm-0 pl-5 pt-4 ">
                        <div className="row ">
                            <div className="mb--2">
                                <h1 className="text-black mb--3"> Find a job & grow your career</h1><br></br>
                                {/* <h2 className="font-weight-normal display-4 text-black mt-0"
                                    style={{
                                        fontSize: '3vh'
                                    }}
                                >Don't have an account ? <a className="text-primary"
                                    onClick={() => {
                                        goTo(ROUTES['auth-module'].register)
                                    }}
                                    style={{
                                        fontSize: '20px'
                                    }}
                                ><b>Register</b></a></h2> */}
                            </div>
                            <div className=" col-sm-9  pr-3 ml-lg--3 px-0 ml-sm-0 ml--2 pt-4"
                                style={{
                                    // zoom:'90%'
                                    scale: '0.9'
                                }}
                            >
                                <div>
                                    <label className="h3 font-weight-bolder text-black">Full Name</label>
                                    <Input
                                        placeholder='Enter your mobile number'
                                    />
                                </div>
                                <div>
                                    <label className="h3 font-weight-bolder text-black">Email ID</label>
                                    <Input
                                        placeholder='Enter your mobile number'
                                    />
                                </div>
                                <div>
                                    <label className="h3 text-black">Password</label>
                                    <div className="input-group mb-3">
                                        <input
                                            style={{
                                                borderTopRightRadius: '0px',
                                                borderBottomRightRadius: '0px',
                                                borderRight: '0px'
                                            }}
                                            // type={showPassword ? 'text' : 'password'}
                                            className="form-control"
                                            placeholder='Enter your password'
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                            onFocus={() => {
                                                // setToggleInput(true)
                                            }}
                                            onBlur={() => {
                                                // setToggleInput(false)
                                            }}
                                        // onChange={password.onChange}
                                        />
                                        <span className="input-group-text" id="basic-addon2"
                                            style={{
                                                borderTopLeftRadius: '0px',
                                                borderBottomLeftRadius: '0px',
                                                borderLeft: '0px',
                                                // borderColor: toggleInput ? '#68d75c' : ''
                                            }}
                                            onClick={() => {
                                                // setShowPassword(!showPassword)
                                            }}
                                        >
                                            {true ? <i className="bi bi-eye-fill mt--1"
                                                style={{
                                                    fontSize: '20px',
                                                    marginBottom: '-5px'
                                                }}
                                            ></i> : <i className="bi bi-eye-slash-fill mt--1 pb-0"
                                                style={{
                                                    fontSize: '20px',
                                                    marginBottom: '-5px'
                                                }}
                                            ></i>}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label className="h3 text-black">Confirm Password</label>
                                    <div className="input-group mb-3">
                                        <input
                                            style={{
                                                borderTopRightRadius: '0px',
                                                borderBottomRightRadius: '0px',
                                                borderRight: '0px'
                                            }}
                                            // type={showPassword ? 'text' : 'password'}
                                            className="form-control"
                                            placeholder='Enter your password'
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                            onFocus={() => {
                                                // setToggleInput(true)
                                            }}
                                            onBlur={() => {
                                                // setToggleInput(false)
                                            }}
                                        // onChange={password.onChange}
                                        />
                                        <span className="input-group-text" id="basic-addon2"
                                            style={{
                                                borderTopLeftRadius: '0px',
                                                borderBottomLeftRadius: '0px',
                                                borderLeft: '0px',
                                                // borderColor: toggleInput ? '#68d75c' : ''
                                            }}
                                            onClick={() => {
                                                // setShowPassword(!showPassword)
                                            }}
                                        >
                                            {true ? <i className="bi bi-eye-fill mt--1"
                                                style={{
                                                    fontSize: '20px',
                                                    marginBottom: '-5px'
                                                }}
                                            ></i> : <i className="bi bi-eye-slash-fill mt--1 pb-0"
                                                style={{
                                                    fontSize: '20px',
                                                    marginBottom: '-5px'
                                                }}
                                            ></i>}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label className="h3 text-black">Password</label>
                                    <div className="input-group mb-3">
                                        <input
                                            style={{
                                                borderTopRightRadius: '0px',
                                                borderBottomRightRadius: '0px',
                                                borderRight: '0px'
                                            }}
                                            // type={showPassword ? 'text' : 'password'}
                                            className="form-control"
                                            placeholder='Enter your password'
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                            onFocus={() => {
                                                // setToggleInput(true)
                                            }}
                                            onBlur={() => {
                                                // setToggleInput(false)
                                            }}
                                        // onChange={password.onChange}
                                        />
                                        <span className="input-group-text" id="basic-addon2"
                                            style={{
                                                borderTopLeftRadius: '0px',
                                                borderBottomLeftRadius: '0px',
                                                borderLeft: '0px',
                                                // borderColor: toggleInput ? '#68d75c' : ''
                                            }}
                                            onClick={() => {
                                                // setShowPassword(!showPassword)
                                            }}
                                        >
                                            {true ? <i className="bi bi-eye-fill mt--1"
                                                style={{
                                                    fontSize: '20px',
                                                    marginBottom: '-5px'
                                                }}
                                            ></i> : <i className="bi bi-eye-slash-fill mt--1 pb-0"
                                                style={{
                                                    fontSize: '20px',
                                                    marginBottom: '-5px'
                                                }}
                                            ></i>}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label className="h3 text-black">Mobile Number</label>
                                    <div className="input-group mb-3">
                                        <input
                                            style={{
                                                borderTopRightRadius: '0px',
                                                borderBottomRightRadius: '0px',
                                                borderRight: '0px'
                                            }}
                                            // type={showPassword ? 'text' : 'password'}
                                            className="form-control"
                                            placeholder='Enter your password'
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                            onFocus={() => {
                                                // setToggleInput(true)
                                            }}
                                            onBlur={() => {
                                                // setToggleInput(false)
                                            }}
                                        // onChange={password.onChange}
                                        />
                                        <span className="input-group-text" id="basic-addon2"
                                            style={{
                                                borderTopLeftRadius: '0px',
                                                borderBottomLeftRadius: '0px',
                                                borderLeft: '0px',
                                                // borderColor: toggleInput ? '#68d75c' : ''
                                            }}
                                            onClick={() => {
                                                // setShowPassword(!showPassword)
                                            }}
                                        >
                                            {true ? <i className="bi bi-eye-fill mt--1"
                                                style={{
                                                    fontSize: '20px',
                                                    marginBottom: '-5px'
                                                }}
                                            ></i> : <i className="bi bi-eye-slash-fill mt--1 pb-0"
                                                style={{
                                                    fontSize: '20px',
                                                    marginBottom: '-5px'
                                                }}
                                            ></i>}
                                        </span>
                                    </div>
                                </div>


                                <div className="py-3 ">
                                    <Button
                                        style={{
                                            backgroundColor: '#f5f5f5'
                                        }}
                                        className={'text-primary  border-0 shadow-none'}
                                        // loading={loginLoader.loader}
                                        block
                                        size="lg"
                                        text={'Use Email to Login'}
                                        onClick={() => { }}
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export { Register }