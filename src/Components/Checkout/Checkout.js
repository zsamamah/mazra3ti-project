import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import farms from '../Farms/Farms.json'
import './Checkout.css';

function Checkout() {
    const navigate = useNavigate();

    const [farmID, setFarmID] = useState(localStorage.getItem('farm_id'));
    const [farm, setFarm] = useState(farms[farmID]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('logged_in')));
    const [dates, setDates] = useState(JSON.parse(localStorage.getItem('temp')));

    const [cash, setcash] = useState('block')
    const [visa, setVisa] = useState('none')



    const total = dates.length*farm.price
    const [discount, setDiscount] = useState(0);
    const [afterDiscount, setAfterDiscount] = useState(total);
    const [enteredCoupon, setenteredCoupon] = useState("")
    const coupon = 'zaid';

    const [data, setData] = useState({
        fname:user?user.fname:"",
        lname:user?user.lname:"",
        email:user?user.email:"",
        phone:user?user.phone:"",
        dates:dates?`${dates[0]} - ${dates[dates.length-1]}`:"",

    })

    const handleData = (e)=>{
        setData({...data,[e.target.id]:e.target.value});
    }

    const handleSubmit= (e)=>{
        e.preventDefault();
        let duration = JSON.parse(localStorage.getItem("temp"));
        const checkoutInfo = {
            fname: data.fname,
            lname: data.lname,
            phone: data.phone,
            email: data.email,
            payment: cash === "block" ? "Cash" : "VISA",
            farmID: farmID,
            farmName: farm.name,
            pickup_Duration: `${duration[0]} : ${duration[duration.length - 1]}`,
            total: total-discount
          };

          let ordersArr = JSON.parse(localStorage.getItem("orders"));
          if (ordersArr) {
            ordersArr.push(checkoutInfo);
            localStorage.setItem("orders", JSON.stringify(ordersArr));
          } else {
            localStorage.setItem("orders", JSON.stringify([checkoutInfo]));
          }

        let dates = JSON.parse(localStorage.getItem(`farm${farm.id}`));
        let new_dates = JSON.parse(localStorage.getItem("temp"));
        if (!dates) {
        localStorage.setItem(`farm${farm.id}`, JSON.stringify(new_dates));
        } else {
        let new_array = [...dates, ...new_dates];
        localStorage.setItem(`farm${farm.id}`, JSON.stringify(new_array));
        }

        localStorage.removeItem("farm_id");
        localStorage.removeItem("temp");

        Swal.fire({
            icon:'success',
            title:'Successfully Reserved !'
        }).then(function(){
            navigate('/')
        })

    }

    const handleCoupon = (e)=>{
        setenteredCoupon(e.target.value)
    }

    const apply = async(e)=>{
        e.preventDefault()
        if(enteredCoupon===coupon){
            await setDiscount(total*0.2);
            Swal.fire({
                icon:'success',
                title:'Coupon Applied Successfully !'
            })
            await setAfterDiscount(total-discount);
        }
    }

    const to_login= ()=>{
        navigate('/login')
    }

    const showVisa = ()=>{
        setVisa('block')
        setcash('none')
    }
    const showCash = ()=>{
        setVisa('none')
        setcash('block')
    }

    if(user&&farmID)
    return (
        <div>
            <h1 style={{textAlign:"center"}}>{farm.name}</h1>
            <form onSubmit={handleSubmit} id="checkout_form">
                <div>
                <div>
                <div><label htmlFor='fname'>First Name : </label></div>
                <div><input type='text' id='fname' value={user.fname} onChange={handleData} required/></div>
                </div>
                <div>
                    <div><label htmlFor='lname'>Last Name : </label></div>
                    <div><input type='text' id='lname' value={user.lname} onChange={handleData} required/></div>
                </div>
                <div>
                    <div><label htmlFor='email'>Email : </label></div>
                    <div><input type='email' id='email' value={user.email} disabled/></div>
                </div>
                <div>
                    <div><label htmlFor='phone'>Phone : </label></div>
                    <div><input type='tel' id="phone" value={user.phone} onChange={handleData} required /></div>
                </div>
                <div>
                    <div><label htmlFor='from'>From : </label></div>
                    <div><input type='date' id='from' value={dates[0]} disabled/></div>
                </div>
                <div>
                    <div><label htmlFor='to'>To : </label></div>
                    <div><input type='date' id='to' value={dates[dates.length-1]} disabled/></div>
                </div>
                <div>
                    <div><label htmlFor='persons'>Persons : </label></div>
                    <div><input type='number' id='persons' max='15' min='0' onChange={handleData} required /></div>
                </div>
                </div>
                <div>
                <div className="payment_details">
                    <table>
                        <tbody>
                        <tr>
                            <td>Total</td>
                            <td>{total} JD</td>
                        </tr>
                        <tr>
                            <td>Discount</td>
                            <td>{discount} JD</td>
                        </tr>
                        <tr>
                            <td>Final Total</td>
                            <td>{discount?total-discount:total} JD</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <div><label htmlFor='coupon'>Coupon Code : </label>
                    <input type='text' id='coupon' onChange={handleCoupon}/></div>
                    <div><button type='button' id='submit_coupon' onClick={apply}>Apply</button></div>
                </div>
                <div id="payment">
                    <div><label htmlFor='payment'>Payment Method : </label></div>
                    <div><input type='radio' id='cash' name='payment' value='cash' onClick={showCash} defaultChecked/>
                    <label htmlFor='cash'>Cash</label></div>
                    <div><input type='radio' id='visa' name='payment' value='visa' onClick={showVisa}/>
                    <label htmlFor='visa'>Visa</label></div>
                </div>
                <div style={{display:cash}}>
                </div>
                <div style={{display:visa}}>
                    <div>
                    <label htmlFor='card_num'>Card number : </label>
                    <input type='number' id='card_num' min='0' minLength='16' maxLength='16' placeholder='xxxx-xxxx-xxxx-xxxx' />
                    </div>
                    <div>
                        <label htmlFor='exp_date'>Exp Date : </label>
                        <input type='month' id='exp_date'/>
                    </div>
                    <div>
                        <label htmlFor='password'>Exp Date : </label>
                        <input type='password' minLength='3' maxLength='3' />
                    </div>
                </div>
                {/* time / how many persons / payment method /  */}
                <button type='submit' id='submit_checkout'>Reserve Now</button>
                </div>
            </form>
        </div>
    )
    else if(farm && !user){
        return(
            <div id='please_login'>
                <div><h1>Please Login</h1></div>
                <div>
                    <button type='button' onClick={to_login}>Login Now!</button>
                </div>
            </div>
        )
    }
    else{
        return(
            <div>
                <h1>Select a farm pleaaase!!!</h1>
            </div>
        )
    }
}

export default Checkout
