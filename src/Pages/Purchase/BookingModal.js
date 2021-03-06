import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const BookingModal = (props) => {

    const {name} = props.part;
    const {quantity, price, setConfirmOrder} = props;
    // const {price} = props;
    // const {setConfirmOrder} = props;
    

    const [user] = useAuthState(auth);

    // const { partId } = useParams();
    /* const [part, setPart] = useState({});
    const { _id, name, price } = part;

    useEffect(() => {
        const url = `https://fathomless-gorge-87844.herokuapp.com/part/${partId}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setPart(data))
    }, [partId]) */

    const handleBooking = event => {
        event.preventDefault();

        const booking = {
            
            partName: name,
            price: price,
            quantity: quantity,
            
            buyer: user.email,
        }

        fetch('https://fathomless-gorge-87844.herokuapp.com/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {

                if (data.success) {
                    toast.error("Order didn't Placed");
                }
                else {
                    toast.success(`${name}, order placed`);
                }

                // to close the modal
                setConfirmOrder(null);
            })
    }


    return (
        <div>

            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">

                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2 text-white">✕</label>


                    <h3 className="font-bold text-lg text-center">Confirm Order</h3>

                    <form onSubmit={handleBooking} className='mt-5 grid grid-cols-1 gap-3 justify-items-center'>
                        <input type="text" name="name" disabled value={user?.displayName || ''} className="input input-bordered w-full max-w" />
                        <input type="email" name="email" disabled value={user.email || ''} className="input input-bordered w-full max-w" />
                        <input type="text" name="phone" placeholder="Phone No." className="input input-bordered w-full max-w" />
                        <input type="submit" value="Confirm Order" className="btn btn-accent w-full max-w" />
                    </form>

                </div>
            </div>
        </div>
    );
};

export default BookingModal;