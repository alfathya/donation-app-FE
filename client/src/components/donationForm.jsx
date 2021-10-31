import React, {useState } from 'react'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Swal from 'sweetalert2'
import { useHistory } from 'react-router';
import axios from 'axios'


yup.addMethod(yup.string , "NRIC" ,function(error) {
    return this.test("test-nric", error, function(str) {
        if (str.length != 9)
            return false;

        str = str.toUpperCase();

        var i,
            icArray = [];
        for (i = 0; i < 9; i++) {
            icArray[i] = str.charAt(i);
        }

        icArray[1] = parseInt(icArray[1], 10) * 2;
        icArray[2] = parseInt(icArray[2], 10) * 7;
        icArray[3] = parseInt(icArray[3], 10) * 6;
        icArray[4] = parseInt(icArray[4], 10) * 5;
        icArray[5] = parseInt(icArray[5], 10) * 4;
        icArray[6] = parseInt(icArray[6], 10) * 3;
        icArray[7] = parseInt(icArray[7], 10) * 2;

        var weight = 0;
        for (i = 1; i < 8; i++) {
            weight += icArray[i];
        }

        var offset = (icArray[0] == "T" || icArray[0] == "G") ? 4 : 0;
        var temp = (offset + weight) % 11;

        var st = ["J", "Z", "I", "H", "G", "F", "E", "D", "C", "B", "A"];
        var fg = ["X", "W", "U", "T", "R", "Q", "P", "N", "M", "L", "K"];

        var theAlpha;
        if (icArray[0] == "S" || icArray[0] == "T") { theAlpha = st[temp]; }
        else if (icArray[0] == "F" || icArray[0] == "G") { theAlpha = fg[temp]; }

        return (icArray[8] === theAlpha);
    })
})

const schema = yup.object({
    donation: yup.number().positive().min(10,"Sorry,minimum donation $10").required(),
    email: yup.string().email().required("please enter the right email"),
    fullname: yup.string().matches(/^[a-zA-Z\s]+$/,"Name must be alphabet").required(),
    nric: yup.string().NRIC("NRIC Invalid").required(),
    address: yup.string().max(50).nullable(true),
    phone_number: yup.string().min(10).max(15).matches(/^[+]?[(]?\d{1,4}[)]?[-\s\./0-9]+$/ ,"Invalid phone number format").nullable(true)
    
})

function DonationForm() {
    const[form, setForm] = useState({})
    const [isSubmit,setIsSubmit] = useState(false)
    const history = useHistory()

    const submit = async(data) => {
        try {
            setForm(data)
            setIsSubmit(true)
            const donation = await axios({
                method:"POST",
                url: "https://care-donation.herokuapp.com/contact",
                data:data
            })
            localStorage.setItem("donate", "submitted")
            history.push('/thanks')
            Swal.fire({
                icon : 'success',
                title : 'Donate Success',
            })     
        } catch (error) {
            console.log(error)
        }
       
    }

    const { register, watch, handleSubmit,  formState: { errors }} = useForm({
        resolver: yupResolver(schema),
    })

    let input = watch()

    return (
        <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
            <div className="flex flex-col bg-white shadow-lg md:flex-row md:flex-auto lg:max-w-screen-md">
                <div className="p-4 items-center justify-center text-white bg-black md:w-80 md:flex md:flex-col md:items-center">
                    <div className="my-4 flex text-4xl font-bold text-center justify-center">
                        <h4>Humanitarian Charities</h4>
                    </div>
                    <p className="font-normal text-center text-white md:mt-0">
                    Now you can easily donate anytime and anywhere. We are ready to donate to those in need around us. 
                    </p>
                    <p className="flex flex-col mt-6 text-center">
                    Together we can, Together we love each other!
                    </p>
                </div>
                <div className="p-5 bg-white md:flex-auto">
                    <h3 className="my-4 text-2xl font-semibold text-gray-700">Donation Form</h3>
                    <form className="flex flex-col "  onSubmit={handleSubmit(submit)}>
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-semibold text-gray-500">Donation*</label>
                        <input type="number" {...register("donation")} className="px-4 py-2 border border-gray-300 rounded"/>
                        <p className="text-xs text-red-500 "> {input.donation || isSubmit ? errors.donation?.message : null} </p>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-semibold text-gray-500">Fullname*</label>
                        </div>
                            <input type="text" {...register("fullname")} className="px-4 py-2 border border-gray-300 rounded"/>
                            <p className="text-xs text-red-500 "> {input.fullname || isSubmit ? errors.fullname?.message : null} </p>
                        </div>
                        <div className="flex flex-col space-y-1">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-semibold text-gray-500">Email*</label>
                            </div>
                            <input type="email" {...register("email")} className="px-4 py-2 border border-gray-300 rounded"/>
                            <p className="text-xs text-red-500 "> {input.email || isSubmit ? errors.email?.message : null} </p>
                        </div>
                        <div className="flex flex-col space-y-1">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-semibold text-gray-500">NRIC*</label>
                            </div>
                            <input type="text" {...register("nric")} className="px-4 py-2 border border-gray-300 rounded" />
                            <p className="text-xs text-red-500 "> {input.nric || isSubmit ? errors.nric?.message : null} </p>
                        </div>
                        <div className="flex flex-col space-y-1">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-semibold text-gray-500">Address</label>
                            </div>
                            <textarea type="text" {...register("address")} className="px-4 py-2 border border-gray-300 rounded "/>
                            <p className="text-xs text-red-500 "> {input.address || isSubmit ? errors.address?.message : null} </p>
                        </div>
                        <div className="flex flex-col space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-semibold text-gray-500">Phone Number</label>
                            </div>
                            <input type="text" {...register("phone_number")} className="px-4 py-2 border border-gray-300 rounded "/>
                            <p className="text-xs text-red-500 "> {input.phone_number || isSubmit ? errors.phone_number?.message : null} </p>
                        </div>
                        <div className="w-full flex justify-center ">
                            <input onClick={() => setIsSubmit(true)} type="submit" value="Donate" className="w-1/2 py-2 text-lg font-semibold text-white bg-black rounded-md shadow hover:bg-gray-800 "/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default DonationForm
